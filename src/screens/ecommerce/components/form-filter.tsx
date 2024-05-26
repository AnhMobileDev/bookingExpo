import { Button, Radio } from 'antd';
import { useState } from 'react';

type Props = {
  onFinish: (value: FilterOptions) => void;
};

export enum FilterOptions {
  all = 'all',
  store = 'store',
  new = 'new',
  used = 'used',
  accessary = 'accessary',
}

export const filterOptions = [
  {
    label: 'Tất cả',
    value: FilterOptions.all,
  },
  {
    label: 'Gian hàng',
    value: FilterOptions.store,
  },
  {
    label: 'Máy mới',
    value: FilterOptions.new,
  },
  {
    label: 'Đã qua sử dụng',
    value: FilterOptions.used,
  },
  {
    label: 'Phụ tùng',
    value: FilterOptions.accessary,
  },
];

export const FormFilter = ({ onFinish }: Props) => {
  const [valueFilter, setValueFilter] = useState(FilterOptions.all);

  return (
    <div>
      {filterOptions.map((it) => (
        <Radio
          value={it?.value}
          className="leading-[32px] w-full"
          key={'radio' + it?.value}
          checked={it?.value === valueFilter}
          onChange={() => setValueFilter(it?.value)}>
          <span className="text-14px leading-20px">{it?.label}</span>
        </Radio>
      ))}
      <Button
        className="border border-grayscale-border w-full mt-[30px] text-grborder-grayscale-border"
        onClick={() => onFinish(valueFilter)}>
        Lọc
      </Button>
    </div>
  );
};
