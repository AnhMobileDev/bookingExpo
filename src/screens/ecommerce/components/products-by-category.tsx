import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Pagination, Row } from 'antd';

import { RightIcon } from '../../../assets/icon';
import { numberWithDots } from '../../../utils';
import { ProductEntity } from '../../../graphql/type.interface';
import { AppRoutes } from '../../../helpers';

export enum SortEnum {
  count = 'quantity',
  price = 'unitPrice',
}

const buttonsSort = [
  {
    label: 'Số lượng đơn',
    value: SortEnum.count,
  },
  {
    label: 'Giá',
    value: SortEnum.price,
  },
];

type Props = {
  title?: string;
  to?: string;
  stateNavigate?: any;
  sort?: boolean;
  products?: ProductEntity[];
  onFinish?: (value: SortEnum) => void;
  onLoadMore?: () => void;
  page?: number;
  total?: number;
  pageSize?: number;
  onChangePage?: (page: number) => void;
};

export const ProductsByCategory = memo(
  ({
    title,
    to,
    sort,
    products = [],
    page = 1,
    total,
    pageSize = 10,
    onFinish,
    onChangePage,
    stateNavigate,
  }: Props) => {
    const navigate = useNavigate();
    const [sortActive, setSortActive] = useState<SortEnum | null>();

    return (
      <div className="p-20px bg-white">
        <div className="flex justify-between items-center">
          <h2 className="text-[19px] font-semibold leading-24px">{title}</h2>
          {to && (
            <div className="flex items-center hover:cursor-pointer" onClick={() => navigate(to, stateNavigate)}>
              <span className="text-14px leading-20px text-primary">Xem thêm</span>
              <div className="h-20px w-20px rounded-full bg-primarys-light flex justify-center items-center ml-6px">
                <RightIcon />
              </div>
            </div>
          )}
        </div>
        {sort && (
          <div className="bg-ghost-white py-8px px-12px flex items-center">
            <span className="text-[13px] leading-18px pr-16px">Sắp xếp theo</span>
            {buttonsSort.map((it) => (
              <Button
                key={it?.value}
                className={`border border-solid rounded mr-12px ${
                  it?.value === sortActive ? 'border-primary' : 'border-grayscale-border'
                }`}
                onClick={() => {
                  onFinish?.(it?.value);
                  setSortActive(it?.value);
                }}>
                <span
                  className={`hover:cursor-pointer ${
                    it?.value === sortActive ? 'text-primary' : 'text-grayscale-black'
                  }`}>
                  {it?.label}
                </span>
              </Button>
            ))}
          </div>
        )}
        <Row gutter={20}>
          {products && products.length > 0 ? (
            (products ?? []).map((it, idx) => (
              <Col
                xs={12}
                md={6}
                lg={6}
                xl={4}
                className="hover:cursor-pointer w-full mt-20px"
                key={idx}
                onClick={() => navigate(AppRoutes.shopping.product.detailId(it?.id))}>
                <div className="bg-white border border-solid border-grayscale-border rounded">
                  <div className="w-full h-[198px] relative">
                    <img
                      src={it?.avatar?.fullThumbUrl ?? ''}
                      alt=" Ảnh sản phẩm"
                      className="object-fill w-full h-[198px] pb-16px"
                    />
                    <span
                      className={`px-[6px] py-[2px] absolute top-[4px] left-[4px] text-[9px] text-white rounded-full ${
                        it?.isNew ? ' bg-blue' : 'bg-grayscale-gray'
                      }`}>
                      {it?.isNew ? 'Mới' : 'Qua sử dụng'}
                    </span>
                  </div>
                  <div className="px-8px pb-16px">
                    <h4 className="text-14px font-normal leading-20px line-clamp-2">{it?.name}</h4>
                    <p className="text-primary pt-[20px]">
                      {it?.unitPrice ? numberWithDots(it?.unitPrice) + ' đ' : 'Thương lượng'}
                    </p>
                  </div>
                </div>
              </Col>
            ))
          ) : (
            <div className="mt-30px flex-1 flex justify-center">Không tìm thấy sản phẩm phù hợp</div>
          )}
        </Row>
        {page && total && pageSize ? (
          <div className="flex justify-center mt-20px">
            <Pagination current={page} total={total} pageSize={pageSize} onChange={onChangePage} />
          </div>
        ) : null}
      </div>
    );
  },
);
