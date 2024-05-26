import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import React from 'react';

export type FormProductQuotationFilter = {
  productQuotationCode: string;
};

type Props = {
  onFinish: (values: FormProductQuotationFilter) => void;
};

export const FormFilter = ({ onFinish }: Props) => {
  return (
    <div className="mb-12px">
      <Form onFinish={onFinish}>
        <Row gutter={12}>
          <Col span={8}>
            <Form.Item name="productQuotationCode" normalize={(e) => e.trimStart()}>
              <Input placeholder="Tìm kiếm theo mã yêu cầu" addonBefore={<SearchOutlined />} />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Áp dụng
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
