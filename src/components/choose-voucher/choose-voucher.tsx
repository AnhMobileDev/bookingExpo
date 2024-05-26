import { memo, useCallback, useMemo, useState, useEffect } from 'react';
import { Button, Form, Input, Pagination, Radio, Spin } from 'antd';
import dayjs from 'dayjs';

import { useUserGetDiscountCodesQuery } from '../../graphql/queries/userGetDiscountCodes.generated';
import { DiscountCodeEntity, DiscountCodeUnitEnum, StatusEnum } from '../../graphql/type.interface';
import { ModalCustomize } from '../modal-customize';
import { numberWithDots } from '../../utils';

type Props = {
  productIds: string[];
  open: boolean;
  setOpen?: (value: boolean) => void;
  onCancel: () => void;
  onFinish: (value: DiscountCodeEntity) => void;
  priceOfOrder?: number;
  defaultVoucher?: DiscountCodeEntity;
};

export const ChooseVoucher = memo(({ productIds, onFinish, priceOfOrder = 0, defaultVoucher, ...props }: Props) => {
  const [filter, setFilter] = useState({
    productIds: productIds,
    limit: 10,
    page: 1,
    isActive: StatusEnum.ACTIVE,
    search: null,
  });

  const { data, loading } = useUserGetDiscountCodesQuery({
    variables: filter,
  });

  const vouchers = useMemo(() => data?.userGetDiscountCodes?.items, [data?.userGetDiscountCodes?.items]);

  const [voucherSelected, setVoucherSelected] = useState<DiscountCodeEntity>();

  const handleFilter = useCallback(
    ({ search }: any) => {
      setFilter({ ...filter, page: 1, search });
    },
    [filter],
  );

  useEffect(() => {
    setVoucherSelected(defaultVoucher);
  }, [defaultVoucher]);

  return (
    <Spin spinning={loading}>
      <ModalCustomize
        title="Chọn hoặc nhập mã giảm giá"
        okButtonProps={{
          disabled: !voucherSelected,
        }}
        {...props}
        onOk={() => onFinish(voucherSelected as DiscountCodeEntity)}>
        <div className="h-[490px] overflow-y-auto">
          <Form onFinish={handleFilter}>
            <div className="flex items-center justify-between gap-x-16px mb-20px">
              <Form.Item name="search" normalize={(e) => e.trimStart()} className="flex-1">
                <Input placeholder="Nhập mã giảm giá" className="w-full" />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Áp dụng
              </Button>
            </div>
          </Form>
          {vouchers?.map((v) => {
            if (v?.endDate && dayjs().isBefore(dayjs(v?.endDate))) {
              return null;
            }
            return (
              <div
                className={`flex gap-x-12px mb-16px ${
                  priceOfOrder < v?.minOrderValue ? 'hover:cursor-no-drop opacity-50' : 'hover:cursor-pointer'
                }`}
                key={v?.id}
                onClick={() => {
                  if (priceOfOrder < v?.minOrderValue) return;
                  setVoucherSelected(v as DiscountCodeEntity);
                }}>
                <img src="/img/image-voucher.png" alt="" className="w-[90px] h-[90px]" />
                <div className="flex-1">
                  <h4 className="line-clamp-2"> {v?.name}</h4>
                  <p>Đơn tối thiểu {numberWithDots(v?.minOrderValue) + ' đ'}</p>
                  <p>
                    Giá trị giảm {numberWithDots(v?.value)}
                    {v?.unit === DiscountCodeUnitEnum.PERCENTAGE ? '%' : ' đ'}
                  </p>
                </div>
                <Radio checked={voucherSelected?.id === v?.id} />
              </div>
            );
          })}
          <div className="float-right my-20px">
            <Pagination
              current={filter?.page}
              total={data?.userGetDiscountCodes?.meta?.totalItems}
              pageSize={filter?.limit}
              onChange={(newPage: number) => setFilter({ ...filter, page: newPage })}
            />
          </div>
        </div>
      </ModalCustomize>
    </Spin>
  );
});
