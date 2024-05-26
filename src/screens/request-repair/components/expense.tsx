import { memo } from 'react';
import { Descriptions } from 'antd';

import { numberWithDots } from '../../../utils';

type Props = {
  title?: string;
  expenses: { label: string; value: string | number }[];
  total?: number;
};

export const DetailExpense = memo(({ title = 'Tổng chi phí', expenses = [], total }: Props) => {
  if (!expenses || (expenses && expenses?.length === 0)) return null;
  return (
    <div className="bg-white p-5 flex gap-5 flex-col">
      <div className="flex flex-row items-center justify-between">
        <div className="font-semibold leading-[24px] text-yankees-blue uppercase">{title}</div>
        <div className="text-[14px] leading-[20px] text-grayscale-gray">{expenses.length} hạng mục</div>
      </div>
      <Descriptions className="expense-wrapper" bordered column={1}>
        {expenses.map((e) => (
          <Descriptions.Item
            key={e.label}
            label={e.label}
            labelStyle={{ width: '50%' }}
            contentStyle={{ color: '#202C38', textAlign: 'right' }}>
            {numberWithDots(e.value)} đ
          </Descriptions.Item>
        ))}
        <Descriptions.Item
          label="Tổng số tiền"
          labelStyle={{ width: '50%', backgroundColor: '#EEEEEE' }}
          contentStyle={{ width: '50%', fontWeight: 600, fontSize: '20px', color: '#202C38', textAlign: 'right' }}>
          {total ? numberWithDots(total) : numberWithDots(expenses.reduce((rs, item) => rs + Number(item.value), 0))} đ
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
});
