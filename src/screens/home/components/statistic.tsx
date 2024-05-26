import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { ArrowRight } from '../../../assets/icon';

type Props = {
  title: string;
  values: { label?: string; value?: number | string }[];
  link?: string;
  loading?: boolean;
};

export const Statistic = memo(({ title, values, link = '/', loading = false }: Props) => {
  return (
    <div className="p-[20px] bg-white text-grayscale-black rounded">
      <div className="flex justify-between items-center">
        <h2 className="text-[16px] font-semibold">{title}</h2>
        <Link to={link}>
          <ArrowRight />
        </Link>
      </div>
      <span className="block w-full h-[1px] bg-[#EEEEEE] mt-[12px] mb-[16px]"></span>
      <Row>
        {values.map(({ label, value }, index) => {
          return (
            <Col
              span={24 / values.length}
              key={index}
              className="text-center hover:cursor-pointer  hover:bg-[#F9F9F9] hover:rounded">
              <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} spinning={loading}>
                <p className="font-semibold text-[16px] p-[8px]">{value ?? 0}</p>
                <p className="text-[13px] font-normal pb-[8px]">{label}</p>
              </Spin>
            </Col>
          );
        })}
      </Row>
    </div>
  );
});
