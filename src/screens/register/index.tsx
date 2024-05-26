import { Button, Form, Input, Modal, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthCode from 'react-auth-code-input';

import { LogoIcon, RadioInput } from '../../assets/icon';
// import './style.less';
import { AppRoutes, showGraphQLErrorMessage, validationMessages } from '../../helpers';
import { REGEX_EMAIL, REGEX_PASSWORD, REGEX_PHONE } from '../../constants/regex';
import { PASSWORD_MIN_LENGTH } from '../../constants/constant';
import { useUserCheckEmailOrPhoneIsUsedLazyQuery } from '../../graphql/queries/userCheckEmailOrPhoneIsUsed.generated';
import { ActiveCodeEnum, CreatePasswordRegisterInput, RegisterInput } from '../../graphql/type.interface';
import { useVerifyOtpMutation } from '../../graphql/mutations/verifyOtp.generated';
import { useUserRegisterMutation } from '../../graphql/mutations/userRegister.generated';
import { useCreatePasswordNewUserMutation } from '../../graphql/mutations/createPasswordNewUser.generated';
import { FullscreenLoading } from '../../components';

export default function Register() {
  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get('step');

  const navigate = useNavigate();

  const [password, setPassword] = useState<string>('');

  const [phone, setPhone] = useState<string>('');

  const [errorVerifyOtp, setErrorVerifyOtp] = useState<boolean>(false);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [checkEmailOrPhoneIsUsed] = useUserCheckEmailOrPhoneIsUsedLazyQuery();

  const [userCreatePasswordNew, { loading }] = useCreatePasswordNewUserMutation({
    onCompleted: () => {
      notification.success({
        message: 'Tạo tài khoản thành công',
      });
      navigate(AppRoutes.auth.login);
    },
    onError: showGraphQLErrorMessage,
  });

  const [UserRegister, { loading: loadingUserRegister }] = useUserRegisterMutation({
    onError: showGraphQLErrorMessage,
  });

  const [checkVerifyOtp, { loading: loadingCheckVerifyOtp }] = useVerifyOtpMutation({
    onCompleted: () => {
      setOpenModal(false);
      setSearchParams((params) => {
        params.set('step', '3');
        return params;
      });
    },
    onError: () => {
      setErrorVerifyOtp(true);
    },
  });

  useEffect(() => {
    setSearchParams((params) => {
      params.set('step', '1');
      return params;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (step != '2') {
      setOpenModal(false);
    }
  }, [step]);

  const handleOnChangeCodeModal = async (res: string) => {
    if (res.length == 6) {
      await checkVerifyOtp({
        variables: {
          input: {
            phone: phone,
            otpCode: res,
            type: ActiveCodeEnum.ACTIVATE,
          },
        },
      });
    }
  };

  const validatePasswordLength = () => {
    return password.length >= PASSWORD_MIN_LENGTH;
  };

  const validatePasswordRegex = () => {
    return REGEX_PASSWORD.test(password);
  };

  const validatePasswordHasNoSpace = () => {
    return password && !password.includes(' ');
  };

  const validatePassword = () => {
    return validatePasswordHasNoSpace() && validatePasswordLength() && validatePasswordRegex();
  };

  const onFinishUserRegister = async (values: RegisterInput) => {
    await UserRegister({
      variables: {
        input: {
          phone: values.phone,
          email: values.email ? values.email : undefined,
        },
      },
    });
    setOpenModal(true);
    setSearchParams((params) => {
      params.set('step', '2');
      return params;
    });
  };

  const onFinishUserCreatePassword = async (values: CreatePasswordRegisterInput) => {
    await userCreatePasswordNew({
      variables: {
        input: {
          phone: phone,
          password: values.password,
        },
      },
    });
  };

  const onClickLogin = () => {
    return navigate(AppRoutes.auth.login);
  };

  if (loadingCheckVerifyOtp) {
    return <FullscreenLoading />;
  }
  return (
    <div className="w-full h-full relative flex-center">
      <div className="absolute top-[24px] w-full px-[80px] flex flex-row justify-between items-center">
        <LogoIcon />

        <div className="flex-center">
          <div className="cursor-pointer text-14px mr-16px text-dim-gray">Bạn có tài khoản?</div>
          <Button
            onClick={onClickLogin}
            size="small"
            className="w-[87px] !h-[30px] !text-[12px] !font-medium leading-[16px]">
            Đăng nhập
          </Button>
        </div>
      </div>
      <div className="mx-[150px]">
        <Form
          name="register"
          style={{ width: 580 }}
          form={form}
          layout="vertical"
          initialValues={form}
          onFinish={onFinishUserRegister}
          autoComplete="off">
          <div className={`flex flex-col ${step == '3' ? 'hidden' : 'flex'}`}>
            <div className="text-28px font-semibold text-yankees-blue">Đăng ký</div>
            <div className="mt-8px text-yankees-blue">Dành cho Khách hàng</div>

            <div className="mt-32px" />
            <Form.Item
              name="phone"
              label="Số điện thoại"
              className="mb-6"
              rules={[
                { required: true, message: validationMessages.required },
                {
                  async validator(_, value) {
                    if (!value) return Promise.resolve();
                    const isPhoneExisted = (
                      await checkEmailOrPhoneIsUsed({ variables: { input: { phone: value.trim() } } })
                    ).data?.userCheckEmailOrPhoneIsUsed;

                    if (isPhoneExisted) {
                      throw new Error(validationMessages.phoneNumber.used);
                    }

                    const isPhoneValid = REGEX_PHONE.test(value);
                    return isPhoneValid
                      ? Promise.resolve()
                      : Promise.reject(new Error(validationMessages.phoneNumber.notValid));
                  },
                },
              ]}>
              <Input onChange={(e) => setPhone(e.target.value)} placeholder="Nhập số điện thoại" maxLength={10} />
            </Form.Item>
            <div className="mb-[8px] font-medium text-14px text-yankees-blue">Email</div>
            <Form.Item
              name="email"
              label=""
              rules={[
                {
                  async validator(_, value) {
                    if (!value) return Promise.resolve();
                    const isEmailExisted = (
                      await checkEmailOrPhoneIsUsed({ variables: { input: { email: value.trim() } } })
                    ).data?.userCheckEmailOrPhoneIsUsed;
                    if (isEmailExisted) {
                      throw new Error(validationMessages.email.used);
                    }

                    const validation = REGEX_EMAIL.test(value);
                    return validation
                      ? Promise.resolve()
                      : Promise.reject(new Error(validationMessages.email.notValid));
                  },
                },
              ]}>
              <Input placeholder="Nhập email" />
            </Form.Item>

            <Button className="mt-[32px]" type="primary" htmlType="submit" disabled={loadingUserRegister} block>
              Tiếp theo
            </Button>
          </div>
          <Modal open={openModal} centered footer={null} closable={false} style={{ width: 640 }}>
            <div className="mb-8">
              <div className=" text-2xl font-semibold leading-[28px]">Nhập mã xác nhận</div>
              <span>Mã xác nhận gồm 6 chữ số đã được gửi tới số điện thoại {phone}</span>
            </div>

            <div className="input-modal flex flex-col gap-1 w-full h-16 mb-16">
              <AuthCode onChange={handleOnChangeCodeModal} />
              {errorVerifyOtp && (
                <span className="text-sm font-normal text-[#D63120]">Mã xác nhận không chính xác</span>
              )}
            </div>

            <div className="modal">
              <Button type="link">
                <span className="text-base font-semibold underline"> Gửi lại mã</span>
              </Button>
            </div>
          </Modal>
        </Form>
        <Form name="create-password" onFinish={onFinishUserCreatePassword} autoComplete="off">
          <div className={`w-[580px] space-y-8 ${step == '3' ? 'flex ' : 'hidden'} flex-col`}>
            <div>
              <div className="text-28px font-semibold text-yankees-blue">Tạo mật khẩu</div>
              <span className=" text-base font-normal">Tạo mật khẩu đăng nhập cho số điện thoại {phone} </span>
            </div>
            <div className="flex flex-col gap-1">
              <Form.Item name="password" label="">
                <Input.Password onChange={(e) => setPassword(e.target.value)} />
              </Form.Item>

              <h2 className="mt-2">Mật khẩu được tạo hợp lệ bao gồm</h2>
              <div className="space-x-1">
                <RadioInput className="translate-y-1 " fill={`${validatePasswordLength() ? '#1BB045' : '#A4A4AE'}`} />
                <span>Tối thiểu 6 kí tự</span>
              </div>
              <div className="space-x-1">
                <RadioInput className="translate-y-1" fill={`${validatePasswordRegex() ? '#1BB045' : '#A4A4AE'}`} />
                <span>Bao gồm chữ cái và số</span>
              </div>
              <div className="space-x-1">
                <RadioInput
                  className="translate-y-1"
                  fill={`${validatePasswordHasNoSpace() ? '#1BB045' : '#A4A4AE'}`}
                />
                <span>Không chứa khoảng trắng</span>
              </div>
            </div>
            <Button type="primary" htmlType="submit" disabled={!validatePassword() || loading} block loading={loading}>
              Xác nhận
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
