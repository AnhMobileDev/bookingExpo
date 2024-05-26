import { Form, Input, notification } from 'antd';
import { useState, Dispatch, SetStateAction } from 'react';

import { useUserChangePasswordMutation } from '../../../graphql/mutations/userChangePassword.generated';
import { showGraphQLErrorMessage, validationMessages } from '../../../helpers';
import { PASSWORD_MIN_LENGTH } from '../../../constants';
import { REGEX_PASSWORD } from '../../../constants/regex';
import { UserChangePasswordInput } from '../../../graphql/type.interface';
import { useAuth } from '../../../contexts';
import { ModalCustomize } from '../../../components/modal-customize';
import { RadioInput } from '../../../assets/icon';
interface Props {
  isOpenModal: boolean | undefined;
  setIsModalResetPasswordOpen: Dispatch<SetStateAction<boolean>>;
}

const ResetPassword = ({ isOpenModal, setIsModalResetPasswordOpen }: Props) => {
  const { logout } = useAuth();

  const [formPassword] = Form.useForm<UserChangePasswordInput>();

  const [password, setPassword] = useState<string>('');

  const [userChangePassword, { loading: changePasswordLoading }] = useUserChangePasswordMutation({
    onCompleted: () => {
      notification.success({
        message: 'Thay đổi mật khẩu thành công',
      });
      setIsModalResetPasswordOpen(false);
      logout();
    },
    onError: showGraphQLErrorMessage,
  });

  const validatePasswordLength = () => {
    return password.length >= PASSWORD_MIN_LENGTH;
  };

  const validatePasswordRegex = () => {
    return REGEX_PASSWORD.test(password);
  };

  const validatePasswordHasNoSpace = () => {
    return password && !password.includes(' ');
  };

  const validateFieldPassword = async (rule: any, value: string, fieldName: keyof UserChangePasswordInput) => {
    if (value == null) {
      throw new Error(validationMessages.required);
    }
    if (fieldName === 'newPassword' && value != password) {
      throw new Error(validationMessages.password.notValid);
    }
  };

  const handleResetPassword = () => {
    formPassword.validateFields().then(async () => {
      const values = formPassword.getFieldsValue();
      await userChangePassword({
        variables: {
          input: {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
          },
        },
      });
    });
  };

  const handleCancelModal = () => {
    formPassword.resetFields();
    setPassword('');
    setIsModalResetPasswordOpen(false);
  };

  return (
    <ModalCustomize
      width={580}
      open={isOpenModal}
      title="Đổi mật khẩu"
      onCancel={handleCancelModal}
      onOk={handleResetPassword}
      okButtonProps={{
        disabled: changePasswordLoading,
        loading: changePasswordLoading,
        htmlType: 'submit',
      }}
      okText="Lưu">
      <Form
        form={formPassword}
        name="control-hooks"
        onFinish={handleResetPassword}
        style={{ maxWidth: 600 }}
        layout="vertical">
        <Form.Item
          label="Mật khẩu hiện tại"
          name="currentPassword"
          className="mb-6px"
          rules={[
            {
              validator: (rule, value) => validateFieldPassword(rule, value, 'currentPassword'),
            },
          ]}>
          <Input.Password placeholder="Nhập mật khẩu hiện tại" />
        </Form.Item>
        <div className="flex flex-col gap-1">
          <Form.Item
            name="password"
            label="Mật khẩu mới"
            rules={[
              {
                validator: (rule, value) => validateFieldPassword(rule, value, 'currentPassword'),
              },
            ]}>
            <Input.Password onChange={(e) => setPassword(e.target.value)} placeholder="Nhập mật khẩu mới" />
          </Form.Item>

          <h2 className="mt-2 font-medium text-base">Mật khẩu được tạo hợp lệ bao gồm</h2>
          <div className="space-x-1">
            <RadioInput className="translate-y-1 " fill={`${validatePasswordLength() ? '#1BB045' : '#A4A4AE'}`} />
            <span>Tối thiểu 6 kí tự</span>
          </div>
          <div className="space-x-1">
            <RadioInput className="translate-y-1" fill={`${validatePasswordRegex() ? '#1BB045' : '#A4A4AE'}`} />
            <span>Bao gồm chữ cái và số</span>
          </div>
          <div className="space-x-1">
            <RadioInput className="translate-y-1" fill={`${validatePasswordHasNoSpace() ? '#1BB045' : '#A4A4AE'}`} />
            <span>Không chứa khoảng trắng</span>
          </div>
        </div>
        <Form.Item
          className="mb-6px"
          name="newPassword"
          label="Xác nhận mật khẩu"
          rules={[
            {
              validator: (rule, value) => validateFieldPassword(rule, value, 'newPassword'),
            },
          ]}>
          <Input.Password placeholder="Xác nhận mật khẩu mới" />
        </Form.Item>
      </Form>
    </ModalCustomize>
  );
};

export default ResetPassword;
