import { memo, useMemo, useState, useCallback } from 'react';
import { Image } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import { MasterTable, SubHeader } from '../../components';
import { AppRoutes } from '../../helpers';
import {
  UserProductQuotationsQueryVariables,
  useUserProductQuotationsQuery,
} from '../../graphql/queries/userProductQuotations.generated';
import { FORMAT_TIME } from '../../constants';
import { ProductQuotationStatusEnum } from '../../graphql/type.interface';
import { serialColumnTable } from '../../utils';

import { FormFilter, FormProductQuotationFilter } from './components';

const ProductQuotation = memo(() => {
  const [filter, setFilter] = useState<UserProductQuotationsQueryVariables>({
    limit: 10,
    page: 1,
  });
  const { data, loading } = useUserProductQuotationsQuery({
    variables: filter,
  });
  const quotations = useMemo(() => data?.userProductQuotations?.items ?? [], [data]);

  const handleFilter = useCallback(
    (values: FormProductQuotationFilter) => {
      setFilter({
        ...filter,
        ...values,
        page: 1,
      });
    },
    [filter],
  );

  const column: ColumnsType<any> = useMemo(
    () => [
      {
        title: 'STT',
        key: 'index',
        dataIndex: 'index',
        align: 'center',
        width: '5%',
        render: (_, __, index) => serialColumnTable(filter.page as number, index),
      },
      {
        title: 'Mã yêu cầu',
        key: 'code',
        dataIndex: 'code',
        align: 'center',
        width: '8%',
        render: (value, r) => <Link to={AppRoutes.quotations.detail.id(r?.id)}>{value}</Link>,
      },
      {
        title: 'Sản phẩm',
        key: 'product',
        dataIndex: 'product',
        render: (it) => {
          return (
            <div className="flex items-center">
              <Image
                src={it?.avatar?.fullThumbUrl}
                width={40}
                height={40}
                preview={{
                  src: it?.avatar?.fullOriginalUrl,
                }}
                className="rounded"
              />
              <span className="pl-12px text-14px font-medium leading-20px line-clamp-1">{it.name}</span>
            </div>
          );
        },
      },
      {
        title: 'Số lượng',
        key: 'quantity',
        dataIndex: 'quantity',
        align: 'center',
        width: '5%',
        render: (quantity) => quantity,
      },
      {
        title: 'Gian hàng',
        key: 'partner',
        dataIndex: 'partner',
        align: 'center',
        width: '15%',
        render: (partner) => partner?.fullname,
      },
      {
        title: 'Thời gian gửi báo giá',
        key: 'createdAt',
        dataIndex: 'createdAt',
        align: 'center',
        width: '12%',
        render(value) {
          return dayjs(value).format(FORMAT_TIME);
        },
      },
      {
        title: 'Trạng thái',
        key: 'status',
        dataIndex: 'status',
        align: 'center',
        width: '10%',
        render(status) {
          if (status === ProductQuotationStatusEnum.RESPONDED) {
            return <span className="text-[#1BB045]">Đã phản hồi</span>;
          }
          return <span className="text-blue">Chưa phản hồi</span>;
        },
      },
      {
        title: 'Tùy chọn',
        key: 'id',
        dataIndex: 'id',
        align: 'center',
        width: '10%',
        render(id) {
          return (
            <Link to={AppRoutes.quotations.detail.id(id)}>
              <span className="hover:cursor-pointer text-primary">Xem chi tiết</span>
            </Link>
          );
        },
      },
    ],
    [filter.page],
  );

  return (
    <div>
      <SubHeader
        items={[
          { title: 'Trang chủ', to: AppRoutes.home },
          { title: AppRoutes.quotations.list.label, to: AppRoutes.quotations.list.value },
        ]}
      />
      <div className="m-20px p-20px bg-white">
        <FormFilter onFinish={handleFilter} />
        <MasterTable
          title={data?.userProductQuotations?.meta?.totalItems + ' báo giá'}
          columns={column}
          data={quotations}
          loading={loading}
          bordered
          total={data?.userProductQuotations?.meta?.totalItems}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
    </div>
  );
});

export default ProductQuotation;
