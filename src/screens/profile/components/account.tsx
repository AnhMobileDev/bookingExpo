import { Button, Col, Form, Input, Row, Upload, UploadProps, message, notification } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useState } from 'react';
import { ApolloQueryResult } from '@apollo/client';

import { ArrowRight, Edit, Password } from '../../../assets/icon';
import { LabelRegister } from '../../register/components/label';
import { showGraphQLErrorMessage, validationMessages } from '../../../helpers';
import { Exact, UpdateUserInput, UserEntity } from '../../../graphql/type.interface';
import { REGEX_EMAIL, REGEX_PHONE } from '../../../constants/regex';
import { useUserCheckEmailOrPhoneIsUsedLazyQuery } from '../../../graphql/queries/userCheckEmailOrPhoneIsUsed.generated';
import { useUpdateUserInfoMutation } from '../../../graphql/mutations/updateUserInfo.generated';
import { MeUserQueryResponse } from '../../../graphql/queries/meUser.generated';
import { useUploadImageMutation } from '../../../services';

import ProfileLayout from './profile-layout';
import ResetPassword from './reset-passwod';

interface Props {
  setImage: (x: any) => void;
  image: File;
  user: UserEntity;
  refetch: (
    variables?:
      | Partial<
          Exact<{
            [key: string]: never;
          }>
        >
      | undefined,
  ) => Promise<ApolloQueryResult<MeUserQueryResponse>>;
}

const Account = ({ user, image, setImage, refetch }: Props) => {
  const [form] = Form.useForm<UpdateUserInput>();
  const [disabled, setDisabled] = useState(false);

  const [isModalResetPasswordOpen, setIsModalResetPasswordOpen] = useState<boolean>(false);

  const [checkEmailOrPhoneIsUsed] = useUserCheckEmailOrPhoneIsUsedLazyQuery();

  const [updateUserInfo, { loading: updating }] = useUpdateUserInfoMutation({
    onCompleted: () => {
      notification.success({
        message: 'Thay đổi thông tin thành công',
      });
      setDisabled(false);
      refetch();
    },
    onError: showGraphQLErrorMessage,
  });

  const { mutateAsync, isLoading } = useUploadImageMutation({
    onError(error) {
      notification.error({ message: 'Tải ảnh lên thất bại.', description: error?.message });
    },
  });

  const onFinish = async (values: UpdateUserInput) => {
    let avatarId = user?.avatar?.id;

    if (image != null) {
      const formData = new FormData();
      formData.append('file', image);
      avatarId = (await mutateAsync(formData)).id;
    }

    await updateUserInfo({
      variables: {
        input: {
          avatarId: avatarId,
          email: values.email,
          phone: values.phone,
          fullname: values.fullname,
        },
      },
    });
  };

  const onCancelEditInfor = () => {
    setImage(undefined);
    form.setFieldsValue({ fullname: user?.fullname, email: user?.email });
    setDisabled(false);
  };

  const validateField = async (rule: any, value: string, fieldName: keyof UpdateUserInput) => {
    if (value == null) {
      throw new Error(validationMessages.required);
    }

    if (fieldName === 'email') {
      if (!REGEX_EMAIL.test(value)) {
        throw new Error(validationMessages.email.notValid);
      }

      if (value === user?.email) {
        return Promise.resolve();
      }

      const isEmailExisted = (await checkEmailOrPhoneIsUsed({ variables: { input: { email: value.trim() } } })).data
        ?.userCheckEmailOrPhoneIsUsed;

      if (isEmailExisted) {
        throw new Error('Email đã tồn tại');
      }
      return Promise.resolve();
    }

    if (fieldName === 'phone' && !REGEX_PHONE.test(value)) {
      throw new Error(validationMessages.phoneNumber.notValid);
    }
  };

  const handleUploadFile: UploadProps['onChange'] = ({ file }) => {
    setImage(file as any);
  };

  const props: UploadProps = {
    listType: 'picture',
    onChange: handleUploadFile,
    onRemove: () => {
      return Promise.resolve(false);
    },
    beforeUpload: (file: RcFile) => {
      const maxSizeInMB = 10;
      const isAllowedSize = file.size / 1024 / 1024 < maxSizeInMB;
      if (!isAllowedSize) {
        message.error(`Dung lượng ảnh tối đa là ${maxSizeInMB} MB`);
        return false;
      }
      return false;
    },
  };

  return (
    <>
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        disabled={!disabled}
        initialValues={{
          email: user?.email ?? undefined,
          phone: user?.phone ?? undefined,
          fullname: user?.fullname ?? undefined,
        }}>
        <ProfileLayout user={user}>
          <Col className="flex-grow space-y-2">
            <div className="bg-white p-5 mr-5">
              <Form.Item name="name" label="">
                <div className="flex gap-3 h-20  mb-5">
                  <div className="w-20 h-20">
                    <img
                      className="w-full h-full rounded-full object-cover"
                      src={image ? URL.createObjectURL(image) : user?.avatar?.fullThumbUrl ?? ''}
                      alt=""
                    />
                  </div>
                  <div className=" w-full flex justify-between">
                    <div className="flex flex-col gap-1 p-4 ">
                      <h2 className=" text-base font-semibold ">Hình đại diện</h2>
                      <Upload listType="picture" accept="image/png, image/gif, image/jpeg" {...props}>
                        <Button type="link">
                          Thay đổi
                          <Edit fill={!disabled ? '#5c6164' : '#03A1FA'} className="ml-2 translate-y-1"></Edit>
                        </Button>
                      </Upload>
                    </div>
                    {!disabled && (
                      <div>
                        <Button onClick={() => setDisabled(true)} type="primary" htmlType="button" disabled={false}>
                          <Edit className="translate-y-0.5 mr-1" fill="currentColor"></Edit>
                          Sửa thông tin
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Form.Item>
              <Row className="gap-4">
                <Col span={7}>
                  <LabelRegister required> Họ và Tên</LabelRegister>
                  <Form.Item
                    name="fullname"
                    label=""
                    rules={[
                      {
                        validator: (rule, value) => validateField(rule, value, 'fullname'),
                      },
                    ]}>
                    <Input placeholder="Nhập họ tên" />
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <LabelRegister required> Số điện thoại</LabelRegister>
                  <Form.Item name="phone">
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <LabelRegister required> Email</LabelRegister>
                  <Form.Item
                    name="email"
                    label=""
                    rules={[
                      {
                        validator: (rule, value) => validateField(rule, value, 'email'),
                      },
                    ]}>
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div className="reset-password bg-white py-3 px-5 mr-5">
              <Button
                disabled={false}
                onClick={() => setIsModalResetPasswordOpen(true)}
                type="default"
                className="w-[300px] flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <Password /> <span className="text-base font-normal">Đổi mật khẩu</span>
                </div>
                <ArrowRight />
              </Button>
            </div>
          </Col>
        </ProfileLayout>

        {disabled && (
          <Form.Item>
            <div className="flex items-center gap-5 justify-end py-2 h-[56px] absolute bottom-0 right-0 left-0 border-t px-6">
              <Button
                type="dashed"
                className="w-[72px] h-[40px] text-center p-0"
                htmlType="button"
                onClick={onCancelEditInfor}>
                Hủy
              </Button>
              <Button
                type="primary"
                className="w-[72px] h-[40px] p-0"
                htmlType="submit"
                loading={updating || isLoading}
                disabled={updating || isLoading}>
                Lưu
              </Button>
            </div>
          </Form.Item>
        )}
      </Form>
      <ResetPassword isOpenModal={isModalResetPasswordOpen} setIsModalResetPasswordOpen={setIsModalResetPasswordOpen} />
    </>
  );
};

export default Account;
