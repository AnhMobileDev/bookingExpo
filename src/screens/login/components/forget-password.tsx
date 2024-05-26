import { Button, Input, Modal } from 'antd';
import { useState } from 'react';

import { REGEX_EMAIL, REGEX_PHONE } from '../../../constants/regex';
import { useUserForgotPasswordMutation } from '../../../graphql/mutations/userForgotPassword.generated';
import { errorLogin } from '../../../helpers/validate-messages/login';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  setSuccessMessage: (msg: string) => void;
  setErrorMessage: (msg: string) => void;
}
export const ForgetPassword = (props: Props) => {
  const { open, setOpen, setSuccessMessage, setErrorMessage } = props;
  const [credential, setCredential] = useState<string>('');
  const [errorMessageValidate, setErrorMessageValidate] = useState<string>('');

  const [forgotPWAsync, { loading }] = useUserForgotPasswordMutation({
    onError: (error) => {
      setErrorMessage(error.message);
      onClose(false);
    },
    onCompleted: () => {
      const message = credential.includes('@')
        ? 'Mật khẩu đã được gửi về email của bạn. Vui lòng kiểm tra trong Hộp thư đến hoặc mục Spam'
        : 'Mật khẩu đã được gửi về tin nhắn của bạn. Vui lòng kiểm tra trong Hộp thư';
      setSuccessMessage(message);
      onClose(true);
    },
  });

  const onClose = (status = false) => {
    setCredential('');
    setOpen(false);
    if (status) {
      setErrorMessage('');
      return;
    }
    setSuccessMessage('');
  };

  const resetPassword = () => {
    forgotPWAsync({
      variables: {
        input: { emailOrPhone: credential },
      },
    });
  };

  const handleChangeCredential = (e: any) => {
    const value = e.target.value;
    setCredential(e.target.value);
    let errMessage = '';
    if (!value) return (errMessage = errorLogin.required);
    if (value.startsWith('0') && !value.includes('@')) {
      const validation = REGEX_PHONE.test(value);
      errMessage = validation ? '' : errorLogin.invalidFormatPhone;
    } else {
      const validation = REGEX_EMAIL.test(value);
      errMessage = validation ? '' : errorLogin.invalidFormatEmail;
    }
    setErrorMessageValidate(errMessage);
  };

  return (
    <Modal centered open={open} footer={null} closable={false}>
      <div className="text-[20px] font-semibold leading-[28px]">Quên mật khẩu</div>
      <div className="mt-[32px] mb-[8px] text-[14px] font-medium leading-[20px] text-yankees-blue">
        Email hoặc số điện thoại
      </div>

      <Input placeholder="Nhập số điện thoại hoặc email" onChange={handleChangeCredential} value={credential} />
      {errorMessageValidate && <span className="text-red text-xs">{errorMessageValidate}</span>}

      <div className="mt-[32px] flex flex-row items-center justify-end">
        <Button
          onClick={() => setOpen(false)}
          type="ghost"
          className="!text-[13px] !leading-[18px] font-semibold !text-yankees-blue mr-[12px]">
          Hủy
        </Button>
        <Button
          onClick={resetPassword}
          type="primary"
          className="!h-[40px] !text-[13px] !leading-[18px] font-semibold !text-yankees-blue"
          disabled={!credential || !!errorMessageValidate}
          loading={loading}>
          Đặt lại mật khẩu
        </Button>
      </div>
    </Modal>
  );
};
