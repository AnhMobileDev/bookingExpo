import { useState } from 'react';
import { Button, Col, Form, Input, Row, notification } from 'antd';

import { Edit, VietNamLogo } from '../../assets/icon';
import { SubHeader } from '../../components';
const { TextArea } = Input;

const rules = [
  {
    required: true,
    message: 'Vui lòng không để trống trường này!',
  },
];

const Setting = () => {
  const [disable, setDisable] = useState(true);

  const onFinish = () => {
    notification.success({
      message: 'Thay đổi thông tin thành công',
      description: '09:41:00',
    });
    notification.error({
      message: '09:41:00',
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center bg-white pr-6 h-[84px]">
        <SubHeader
          items={[
            { title: 'Trang chủ', to: '' },
            { title: 'Thiết lập hồ sơ', to: '' },
          ]}
        />
        {disable && (
          <div>
            <button
              className="bg-[#FFC42C] px-5 py-3 text-[#202C38] border-none outline-none rounded font-semibold hover:cursor-pointer"
              onClick={() => setDisable(!disable)}>
              Sửa thông tin
            </button>
          </div>
        )}
      </div>
      <div>
        <Form
          disabled={disable}
          className="max-w-[868px] p-5 mt-5 bg-white mx-auto"
          layout="vertical"
          name="basic"
          onFinish={onFinish}>
          <Form.Item label="" name="name">
            <div className="flex items-center">
              <img src="https://picsum.photos/200/300" alt="" className="w-20 h-20 bg-cover rounded-full " />
              <div className="pl-3">
                <span className="font-semibold text-sm ">Hình đại diện</span>
                <br />
                <span className="flex items-center">
                  <span className="text-[#03A1FA] text-sm pr-2">Thay đổi</span>
                  <Edit />
                </span>
              </div>
            </div>
          </Form.Item>
          <Form.Item label="Họ và tên" name="name" rules={rules} className="mt-3">
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>

          <Form.Item label="Mô tả chuyên môn" name="desc" rules={rules} className="mt-3">
            <TextArea rows={4} showCount placeholder="Nhập mô tả chuyên môn" maxLength={500} />
          </Form.Item>

          <Row gutter={12} className="mt-3">
            <Col span={12}>
              <Form.Item label="Số điện thoại" name="phone" rules={rules}>
                <Input
                  addonBefore={
                    <div className="flex justify-center items-center">
                      <VietNamLogo />
                      <span className="pl-2">+84</span>
                    </div>
                  }
                  placeholder="Nhập số điện thoại"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email" name="email" rules={rules}>
                <Input placeholder="Nhập email" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="mt-3">
            <div className="flex flex-row-reverse">
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
              <Button type="dashed" className="mr-4" onClick={() => setDisable(true)}>
                Hủy
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Setting;
