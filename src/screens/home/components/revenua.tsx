import { memo, useState } from 'react';
import { Col, Row } from 'antd';

import { MenuShoppingIcon, SupportIcon, WalletIcon } from '../../../assets/icon';

const buttonOption = [
  {
    label: 'Tuần',
    value: 'week',
    radius: 'rounded-l-lg',
  },
  {
    label: 'Tháng',
    value: 'moth',
  },
  {
    label: 'Năm',
    value: 'yeah',
    radius: 'rounded-r-lg',
  },
];

export const RevenuaHome = memo(() => {
  const [active, setActive] = useState<string>('week');
  return (
    <div className="p-[20px] bg-white text-grayscale-black rounded">
      <div className="flex justify-between items-center">
        <h2 className="text-[16px] font-semibold">Doanh thu</h2>
      </div>
      <div className="flex flex-wrap justify-center items-center mt-[12px] mb-[14px]">
        {buttonOption.map((item) => (
          <button
            key={item.value}
            onClick={() => setActive(item.value)}
            className={`${item.value === active ? 'active-revenua-home' : ''} ${
              item?.radius
            } bg-white min-w-[88px] cursor-pointer outline-none h-[26px] border border-solid border-[#EEEEEE]`}>
            {item.label}
          </button>
        ))}
      </div>
      <div>
        <Row gutter={18}>
          <Col span={4}>
            <WalletIcon />
          </Col>
          <Col span={20}>
            <p className="text-grayscale-gray text-[13px] pb-[6px]">Tổng doanh thu</p>
            <p className="text-grayscale-black text-[20px] font-bold">1.500.000.000 đ</p>
            <span className="block w-full h-[1px] bg-[#EEEEEE] my-[16px]"></span>
          </Col>
        </Row>
        <Row gutter={18}>
          <Col span={4}>
            <MenuShoppingIcon />
          </Col>
          <Col span={20}>
            <p className="text-grayscale-gray text-[13px] pb-[6px]">Gian hàng</p>
            <p className="text-grayscale-black text-[14] font-medium">1.500.000.000 đ</p>
            <span className="block w-full h-[1px] bg-[#EEEEEE] my-[16px]"></span>
          </Col>
        </Row>
        <Row gutter={18}>
          <Col span={4}>
            <SupportIcon />
          </Col>
          <Col span={20}>
            <p className="text-grayscale-gray text-[13px] pb-[6px]">Dịch vụ</p>
            <p className="text-grayscale-black text-[14] font-medium">1.500.000.000 đ</p>
            <span className="block w-full h-[1px] bg-[#EEEEEE] mt-[16px]"></span>
          </Col>
        </Row>
      </div>
    </div>
  );
});
