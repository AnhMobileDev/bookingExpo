import { Button, Col, DatePicker, Form, Row } from 'antd';
import Search from 'antd/es/transfer/search';

import { FORMAT_DATE } from '../../../constants';

const { RangePicker } = DatePicker;

export type FormDataFilter = {
  search?: string;
  time: [string, string];
};

type Props = {
  onFilter: (values: FormDataFilter) => void;
};

const OrderFormFilter = ({ onFilter }: Props) => {
  return (
    <div>
      <Form size="middle" onFinish={onFilter} className="mb-20px">
        <Row gutter={{ xs: 8, sm: 12 }} wrap align={'middle'} justify={'space-between'}>
          <Col xl={16} lg={6} md={24} sm={12}>
            <Row gutter={{ xs: 8, sm: 12 }} wrap align={'middle'}>
              <Col xl={10} lg={4} md={10} sm={12}>
                <Form.Item name="search">
                  <Search placeholder="Tìm kiếm theo Mã đơn hàng, Sản phẩm" />
                </Form.Item>
              </Col>
              <Col xl={10} lg={4} md={10} sm={12}>
                <Form.Item label="Thời gian đặt" name="time">
                  <RangePicker placeholder={['Từ ngày', 'Đến ngày']} format={[FORMAT_DATE, FORMAT_DATE]} />
                </Form.Item>
              </Col>
              <Col lg={2} md={2} sm={12}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Áp dụng
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default OrderFormFilter;
