import { useApolloClient } from '@apollo/client';
import { Button, Checkbox, Form, Input } from 'antd';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Apple, FacebookIcon, GoggleIcon, LogoIcon } from '../../assets/icon';
import { ResponseMessage } from '../../components/response-message';
import { REGEX_EMAIL, REGEX_PHONE } from '../../constants/regex';
import { AppRoutes } from '../../helpers';
import { errorLogin } from '../../helpers/validate-messages/login';
import { MeUserDocument, MeUserQueryResponse } from '../../graphql/queries/meUser.generated';
import { useUserLoginMutation } from '../../graphql/mutations/userLogin.generated';
import { useAuth } from '../../contexts';
import { UserEntity } from '../../graphql/type.interface';

import { ForgetPassword } from './components/forget-password';
import './style.less';

interface FormLogin {
  credential: string;
  password: string;
  remember: boolean;
}

export default function Login() {
  const client = useApolloClient();
  const { login } = useAuth();

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [openForgetPassword, setOpenForgetPassword] = useState<boolean>(false);

  const [form] = Form.useForm();

  const navigate = useNavigate();

  const [loginAsync, { loading }] = useUserLoginMutation({
    onError: (error) => {
      setSuccessMessage('');
      setErrorMessage(error.message);
    },
    onCompleted: (res) => {
      client.writeQuery<MeUserQueryResponse>({
        query: MeUserDocument,
        data: {
          meUser: res.userLogin.user,
        },
      });
      login(res?.userLogin?.user as UserEntity);
      navigate(AppRoutes.home);
    },
  });

  const onFinish = useCallback(
    (values: FormLogin) => {
      const isPhone = REGEX_PHONE.test(values.credential);
      loginAsync({
        variables: {
          input: {
            phone: isPhone ? values.credential : undefined,
            email: isPhone ? undefined : values.credential,
            password: values.password,
          },
        },
      });
    },
    [loginAsync],
  );

  const onClickRegister = () => {
    return navigate(AppRoutes.auth.register);
  };
  const onClickForgetPassword = () => {
    setOpenForgetPassword(true);
  };
  return (
    <div className="w-full h-full relative flex-center">
      <div className="absolute top-[24px] w-full px-[80px] flex flex-row justify-between items-center">
        <LogoIcon />

        <div className="flex-center">
          <div className="cursor-pointer text-14px mr-16px text-dim-gray">Bạn chưa có tài khoản?</div>
          <Button
            onClick={onClickRegister}
            size="small"
            className="w-[87px] !h-[30px] !text-[12px] !font-medium leading-[16px]">
            Đăng ký
          </Button>
        </div>
      </div>
      <div className="mx-[150px]">
        <div className="flex flex-col">
          <div className="text-28px font-semibold text-yankees-blue">Đăng nhập</div>
          <div className="mt-8px text-yankees-blue">Dành cho Khách hàng</div>
          <Form
            name="login"
            style={{ width: 580 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            form={form}
            autoComplete="off">
            {errorMessage ? (
              <div className="mt-[32px]">
                <ResponseMessage error>{errorMessage}</ResponseMessage>
              </div>
            ) : (
              ''
            )}
            {successMessage ? (
              <div className="mt-[32px]">
                <ResponseMessage success>{successMessage}</ResponseMessage>
              </div>
            ) : (
              ''
            )}
            <div className="mt-32px" />
            <div className="mb-[8px] font-medium text-14px text-yankees-blue">Email hoặc số điện thoại</div>
            <Form.Item
              name="credential"
              rules={[
                { required: true, message: errorLogin.required },
                {
                  validator(_, value) {
                    if (!value) return Promise.resolve();
                    if (value.startsWith('0') && !value.includes('@')) {
                      const validation = REGEX_PHONE.test(value);
                      return validation ? Promise.resolve() : Promise.reject(new Error(errorLogin.invalidFormatPhone));
                    } else {
                      const validation = REGEX_EMAIL.test(value);
                      return validation ? Promise.resolve() : Promise.reject(new Error(errorLogin.invalidFormatEmail));
                    }
                  },
                },
              ]}>
              <Input placeholder="Nhập số điện thoại hoặc email" />
            </Form.Item>

            <div className="mt-[24px] mb-[8px] flex flex-row items-center justify-between">
              <div className="font-medium text-14px text-yankees-blue">Mật khẩu</div>
              <div className="text-14px text-yankees-blue underline cursor-pointer" onClick={onClickForgetPassword}>
                Quên mật khẩu?
              </div>
            </div>
            <Form.Item name="password" rules={[{ required: true, message: errorLogin.required }]}>
              <Input.Password placeholder="Nhập mật khẩu" />
            </Form.Item>

            <Form.Item className="mt-[32px]">
              <Button type="primary" htmlType="submit" disabled={loading} loading={loading} block>
                Đăng nhập
              </Button>
            </Form.Item>
            <div className="flex items-center justify-center mt-[32px] mb-[16px]">
              <div className="basis-1/3 w-full h-[1px] bg-[#EEEEEE]"></div>
              <div className="basis-1/3 text-center">
                <span className="text-grayscale-light text-[13px]">Hoặc đăng nhập bằng</span>
              </div>
              <div className="basis-1/3 w-full h-[1px] bg-[#EEEEEE]"></div>
            </div>
            <div className="flex justify-center items-center">
              <GoggleIcon className="hover:cursor-pointer" />
              <FacebookIcon className="mx-[12px] hover:cursor-pointer" />
              <Apple className="hover:cursor-pointer" />
            </div>
          </Form>
        </div>
      </div>

      <ForgetPassword
        open={openForgetPassword}
        setOpen={setOpenForgetPassword}
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
}
