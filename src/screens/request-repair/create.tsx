import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Row, Select, SelectProps, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

import { SubHeader, UploadImage, UploadImageRef } from '../../components';
import { AppRoutes, getGraphQLErrorMessage, validationMessages } from '../../helpers';
import { SearchAddress } from '../../components/search-address';
import { FormLabel } from '../../components/form-label';
import { useCreateBookingMutation } from '../../graphql/mutations/createBooking.generated';
import { showNotification } from '../../utils';
import { useDialog } from '../../contexts';
import { SentSuccess } from '../../assets/icon';

import { ChooseProblems, ChooseReparier, ChooseVehicle } from './components';
import { FormChooseProblems, FormChooseRepairer, FormChooseVehicle } from './type';

const validateField = async (value: any) => {
  if (value == null || !value || (value && value.length === 0)) {
    return Promise.reject(validationMessages.required);
  }
  return Promise.resolve();
};

const RequestRepairCreate = memo(() => {
  const navigate = useNavigate();
  const { openDialog, resetDiaLog } = useDialog();
  const [form] = Form.useForm();
  const [dataCreate, setDataCreate] = useState<any>();

  const ref = useRef<UploadImageRef>(null);

  const [openChooseVehicle, setOpenChooseVehicle] = useState(false);
  const [vehicleOption, setVehicleOption] = useState<SelectProps['options']>([]);

  const handleChooseVehicle = useCallback(
    (values: FormChooseVehicle) => {
      setVehicleOption([
        {
          label: values?.vehicle?.name,
          value: values?.vehicle?.id,
        },
      ]);
      form.setFieldValue('vehicleId', values?.id);
      setOpenChooseVehicle(false);
    },
    [form],
  );

  const [openChooseProblems, setOpenChooseProblems] = useState(false);
  const [problemOptions, setProblemOptions] = useState<SelectProps['options']>([]);

  const problems = Form.useWatch('problems', form);

  const handleChooseProblems = useCallback(
    (values: FormChooseProblems) => {
      setProblemOptions((values?.problems ?? []).map((i) => ({ label: i?.name, value: i?.id })));
      form.setFieldValue('problems', values?.ids);
      setOpenChooseProblems(false);
    },
    [form],
  );

  const [createBookingMutation, { loading: creating }] = useCreateBookingMutation({
    onError(error) {
      showNotification('error', 'Tạo yêu cầu sửa chữa thất bại', getGraphQLErrorMessage(error));
    },
    onCompleted() {
      openDialog({
        type: 'CONFIRM',
        title: ' ',
        message: (
          <div className="text-center">
            <SentSuccess />
            <p className="text-24px font-semibold mt-8px mb-[38px]">Tạo yêu cầu sửa chữa thành công</p>
            <Button
              type="primary"
              onClick={() => {
                navigate(AppRoutes.requestRepair.list.value);
                resetDiaLog();
              }}>
              Về trang Danh sách sửa chữa
            </Button>
          </div>
        ),
        hiddenFooter: true,
      });
    },
  });

  const [openRepairer, setOpenRepairer] = useState(false);
  const [partnerId, setPartnerId] = useState<string>();

  const handleChoosePartner = useCallback(
    async (values: FormChooseRepairer) => {
      const { id, ...withoutValues } = values;
      setPartnerId(id);
      const mediaIds = await ref.current?.uploads();
      createBookingMutation({
        variables: {
          input: {
            ...dataCreate,
            partnerId: id,
            mediaIds,
            ...withoutValues,
          },
        },
      });
    },
    [createBookingMutation, dataCreate],
  );

  useEffect(() => {
    if (problems && problems.length > 0) {
      form.setFieldValue('unknowProblem', false);
    }
  }, [form, problems]);

  const unknowProblem = Form.useWatch('unknowProblem', form);

  useEffect(() => {
    if (unknowProblem) {
      form.setFieldValue('problems', []);
      setProblemOptions([]);
    }
  }, [form, unknowProblem]);

  const handleCreate = useCallback((values: any) => {
    const { addresses, medias: _, unknowProblem: __, problems, ...withoutValues } = values;
    const { addressName: _addressName, ...withoutAddress } = addresses;
    setDataCreate({ ...withoutAddress, ...withoutValues, problems: problems ? problems : [] });
    setOpenRepairer(true);
  }, []);

  return (
    <Spin spinning={creating}>
      <div>
        <SubHeader
          items={[
            { title: 'Trang chủ', to: AppRoutes.home },
            { title: AppRoutes.requestRepair.list.lable, to: AppRoutes.requestRepair.list.value },
            { title: 'Thêm yêu cầu sửa chữa' },
          ]}
        />
        <Form
          form={form}
          name="create-ycsc"
          id="create-ycsc"
          onFinish={handleCreate}
          layout="vertical"
          className="max-w-[868px] mt-20px mb-[74px] p-20px mx-auto bg-white">
          <h4 className="mb-16px">
            <span className="text-[17px] leading-22px font-semibold">Xe gặp sự cố</span>
          </h4>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={
                  <span>
                    <span className="text-error">* </span>Tên xe
                  </span>
                }
                name="vehicleId"
                rules={[
                  {
                    validator: (_rule, value) => validateField(value),
                  },
                ]}>
                <Select
                  placeholder="Nhập tên xe hoặc chọn xe "
                  options={vehicleOption}
                  onClick={() => setOpenChooseVehicle(true)}
                  open={false}
                  popupClassName={'hidden'}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <div className="h-[30px] flex items-center">
                <FormLabel required>Vị trí xe</FormLabel>
              </div>
              <Form.Item
                name="addresses"
                rules={[
                  {
                    validator: (_rule, value) => validateField(value),
                  },
                ]}>
                <SearchAddress />
              </Form.Item>
              <Form.Item
                name="addressMoreInfo"
                className="mt-12px"
                rules={[
                  {
                    validator: (_rule, value) => validateField(value),
                  },
                ]}>
                <Input placeholder="Tên đường, Tên công trình, Tòa nhà, Số nhà" />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                label={
                  <div className="w-full flex justify-between items-center">
                    <span className="text-[17px] leading-22px font-semibold">Hiện tượng hư hỏng</span>
                  </div>
                }
                name="problems"
                className="my-20px">
                <Select
                  placeholder="Chọn Hiện tượng hư hỏng"
                  options={problemOptions}
                  mode="multiple"
                  onClick={() => setOpenChooseProblems(true)}
                  open={false}
                  popupClassName="hidden"
                />
              </Form.Item>
              <Form.Item name="unknowProblem" valuePropName="checked">
                <Checkbox className="border border-solid border-grayscale-border px-16px py-14px rounded w-full">
                  Chưa rõ nguyên nhân
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="medias" label="Ảnh/ Video">
            <UploadImage multiple maxImages={5} ref={ref} />
          </Form.Item>
          <span className="text-14px text-grayscale-light mb-20px inline-block">
            Tối đa 5 ảnh, kích cỡ mỗi ảnh tối đa 5MB. Định dạng PNG, JPG, JPEG,...
          </span>
          <Form.Item label="Mô tả" name="description">
            <Input.TextArea showCount maxLength={1000} rows={4} placeholder="Nhập mô tả..." />
          </Form.Item>
        </Form>
        <div className="fixed left-0 bottom-0 right-0 bg-white py-12px px-24px flex justify-end">
          <Button type="primary" htmlType="submit" form="create-ycsc">
            Tìm đơn vị sửa chữa
          </Button>
        </div>

        {openChooseVehicle && (
          <ChooseVehicle
            open={openChooseVehicle}
            onClose={() => setOpenChooseVehicle(false)}
            onFinish={handleChooseVehicle}
            vehicleId={(vehicleOption?.[0]?.value as string) ?? undefined}
          />
        )}
        {openChooseProblems && (
          <ChooseProblems
            open={openChooseProblems}
            setOpen={setOpenChooseProblems}
            onFinish={handleChooseProblems}
            problems={problemOptions}
          />
        )}

        {openRepairer && (
          <ChooseReparier
            open={openRepairer}
            setOpen={setOpenRepairer}
            latitude={dataCreate?.latitude}
            longitude={dataCreate?.longitude}
            onFinish={handleChoosePartner}
            partnerId={partnerId}
            loading={creating}
          />
        )}
      </div>
    </Spin>
  );
});

export default RequestRepairCreate;
