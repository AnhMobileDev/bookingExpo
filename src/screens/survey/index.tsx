import { memo, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Checkbox, Col, Form, Radio, Row, Spin, Tabs, notification } from 'antd';
import './style.less';
import TextArea from 'antd/es/input/TextArea';

import { validationMessages } from '../../helpers';
import { useUserGetSurveyLazyQuery } from '../../graphql/queries/userGetSurvey.generated';
import { useUserGetSurveysQuery } from '../../graphql/queries/userGetSurveys.generated';
import { ModalCustomize } from '../../components/modal-customize';
import { useUserSubmitSurveyMutation } from '../../graphql/mutations/userSubmitSurvey.generated';
import { AnswerType, StatusEnum } from '../../graphql/type.interface';
import { ArrowRight, FolderIcon, NoSurveySelectedIcon } from '../../assets/icon';
import { SubHeader } from '../../components';

const CheckboxGroup = Checkbox.Group;

const Survey = memo(() => {
  const [form] = Form.useForm();

  const [searchParams, setSearchParams] = useSearchParams();

  const [formDataSurvey, setFormDataSurvey] = useState({});

  const [activeKey, setActiveKey] = useState<string>('');

  const [isModalSubmitSurveyOpen, setIsModalSubmitSurveyOpen] = useState<boolean>(false);

  const {
    data,
    loading: getSurveysLoading,
    refetch,
  } = useUserGetSurveysQuery({ variables: { limit: 1000, page: 1, isActive: StatusEnum.ACTIVE } });
  const listSurvey = data?.userGetSurveys.items;

  const [getSurvey, { data: surveyData, loading: getSurveyLoading }] = useUserGetSurveyLazyQuery();

  const survey = surveyData?.userGetSurvey;

  // Fields Value
  useEffect(() => {
    if (survey?.userIsSubmitSurvey == true) {
      const results = survey.userResultSurvey?.results;
      const resultObjectSurvey: { [key: string]: string | string[] } = {};

      results?.forEach((item) => {
        const questionId = item.questionId;
        const answer: string | string[] = item.answer;
        resultObjectSurvey[questionId] = answer;
      });

      const initialValues: { [key: string]: string | string[] } = {};
      for (const key in resultObjectSurvey) {
        const answer = resultObjectSurvey[key];
        if (Array.isArray(answer) && answer.length === 1) {
          initialValues[key] = answer[0];
        } else {
          initialValues[key] = answer;
        }
      }
      form.setFieldsValue(initialValues);
    }
  }, [form, survey?.userIsSubmitSurvey, survey?.userResultSurvey?.results]);

  useEffect(() => {
    const res = searchParams.get('id');
    if (res !== null) {
      setActiveKey(res as string);
      getSurvey({ variables: { id: res as string } });
    } else {
      return;
    }
  }, [getSurvey, listSurvey, searchParams]);

  const [submitSurvey, { loading: submitSurveyLoading }] = useUserSubmitSurveyMutation({
    onError(error) {
      notification.error({
        description: error?.message,
        message: 'Gửi khảo sát thất bại',
      });
    },
    onCompleted() {
      notification.success({
        message: 'Gửi khảo sát thành công',
      });
      setIsModalSubmitSurveyOpen(false);
      refetch();
    },
  });

  const onChangeSurvey = useCallback(
    (id: string) => {
      setSearchParams((params) => {
        params.set('id', id);
        return params;
      });
    },
    [setSearchParams],
  );

  const onFinishForm = useCallback((values: any) => {
    Object.keys(values).forEach((questionId, i) => {
      const answer = Object.values(values)[i];
      setFormDataSurvey((prevData) => ({
        ...prevData,
        [questionId]: { questionId, answer },
      }));
    });
    setIsModalSubmitSurveyOpen(true);
  }, []);

  const handleSubmitSurvey = useCallback(async () => {
    const resultSurvey: { questionId: string; answer: any }[] = Object.values(formDataSurvey);
    const arrAnswer = resultSurvey.filter((item) => item.answer !== undefined);

    await submitSurvey({
      variables: {
        input: {
          results: arrAnswer,
          surveyId: survey?.id as string,
        },
      },
    });
  }, [formDataSurvey, submitSurvey, survey?.id]);

  const handleCancelModal = useCallback(() => {
    setIsModalSubmitSurveyOpen(false);
  }, []);

  return (
    <>
      <SubHeader
        items={[
          { title: 'Trang chủ', to: '/' },
          { title: 'Khảo sát', to: null },
        ]}
      />
      <div className="mx-[24px] my-[20px] survey">
        <Row gutter={20}>
          <Col span={8}>
            <Spin spinning={getSurveysLoading}>
              <div className="bg-white w-full ">
                <h2 className="p-5 text-base font-semibold">Danh sách khảo sát</h2>
                <Tabs
                  className="overflow-y-scroll h-screen "
                  onChange={onChangeSurvey}
                  activeKey={activeKey}
                  tabPosition="left"
                  items={listSurvey?.map((survey) => {
                    return {
                      label: (
                        <div className="flex justify-between items-center h-16 gap-3 pl-5">
                          <div className="flex gap-1 w-full">
                            <FolderIcon className="mr-[16px] w-[24px] h-[24px] fixed" />
                            <div className="flex flex-col w-full">
                              <div className="text-grayscale-black text-ellipsis font-medium text-start text-[14px] overflow-hidden w-[80%] ml-10 ">
                                {survey?.name}
                              </div>
                              {survey.userIsSubmitSurvey == true && (
                                <span className="text-[#ffc42c] px-10 text-sm text-start ">Đã hoàn thành</span>
                              )}
                            </div>
                          </div>
                          <ArrowRight className="fixed right-3" />
                        </div>
                      ),
                      key: survey.id,
                    };
                  })}
                />
              </div>
            </Spin>
          </Col>
          <Col span={16}>
            <Spin spinning={getSurveyLoading}>
              <Form form={form} onFinish={onFinishForm} disabled={survey?.userIsSubmitSurvey}>
                <div className="flex flex-col gap-5 relative ">
                  <div className={`bg-white py-3 px-5 text-base font-semibold ${survey ? 'block' : 'hidden'}`}>
                    {survey?.name}
                  </div>
                  <div className="bg-white py-5 px-4 mb-[52px]">
                    {survey?.questions.map((question, index) => {
                      const rules = [{ required: question?.isRequired == true, message: validationMessages.required }];
                      return (
                        <div key={question.id} className="space-y-3">
                          <h2 className="mt-3 text-[#202C38] font-semibold text-base">
                            {index + 1}. {question.question}
                            {question?.isRequired ? <span className="text-error">*</span> : ''} :
                          </h2>

                          {question.answerType == AnswerType.SHORT_ANSWER && (
                            <div>
                              <Form.Item name={question.id} rules={rules}>
                                <TextArea rows={3} placeholder="Nhập câu trả lời của bạn" maxLength={255} />
                              </Form.Item>
                            </div>
                          )}

                          {question.answerType == AnswerType.MULTIPLE_CHOICE && (
                            <Form.Item name={question.id} rules={rules}>
                              <CheckboxGroup className="w-full flex flex-col gap-3 items-center">
                                {question?.answers?.map((ans, i) => (
                                  <Checkbox
                                    key={i}
                                    id={`${ans}-${i}`}
                                    value={ans}
                                    className={`text-grayscale-gray  rounded font-normal text-base w-full mb-1`}>
                                    {ans}
                                  </Checkbox>
                                ))}
                              </CheckboxGroup>
                            </Form.Item>
                          )}

                          {question.answerType == AnswerType.CHECKBOX && (
                            <Form.Item name={question.id} rules={rules}>
                              <Radio.Group className="w-full flex flex-col gap-3">
                                {question?.answers?.map((ans, i) => (
                                  <Radio
                                    id={`${ans}-${i}`}
                                    key={i}
                                    value={ans}
                                    className={`text-grayscale-gray p-3 rounded font-normal text-base w-full mb-1`}>
                                    {ans}
                                  </Radio>
                                ))}
                              </Radio.Group>
                            </Form.Item>
                          )}
                        </div>
                      );
                    })}
                    {survey ? (
                      <div className=" w-full">
                        <Button
                          htmlType="submit"
                          type="primary"
                          className={`bottom-[20px] right-[22px] fixed
                           ${survey.userIsSubmitSurvey == true ? 'hidden' : 'block'}
                          `}>
                          Gửi kết quả
                        </Button>
                      </div>
                    ) : (
                      <div className="flex-center bg-white flex-col py-10">
                        <NoSurveySelectedIcon />
                        <h2 className="font-normal text-base text-grayscale-gray">Vui lòng chọn khảo sát</h2>
                      </div>
                    )}
                    <ModalCustomize
                      width={450}
                      open={isModalSubmitSurveyOpen}
                      title="Gửi kết quả khảo sát"
                      onCancel={handleCancelModal}
                      onOk={handleSubmitSurvey}
                      footer={
                        <div className="flex p-3 justify-end rounded-md">
                          <Button disabled={false} style={{ border: ' 1px solid #ccc' }} onClick={handleCancelModal}>
                            Hủy
                          </Button>
                          <Button
                            disabled={submitSurveyLoading}
                            loading={submitSurveyLoading}
                            type="primary"
                            htmlType="submit"
                            onClick={handleSubmitSurvey}>
                            Gửi
                          </Button>
                        </div>
                      }>
                      <div className="text-base text-[#676E72] font-normal">
                        Bạn sẽ không thể sửa câu trả lời sau khi xác nhận gửi.
                      </div>
                    </ModalCustomize>
                  </div>
                </div>
              </Form>
            </Spin>
          </Col>
        </Row>
      </div>
    </>
  );
});

export default Survey;
