import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Divider, Tabs } from 'antd';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

import { AppRoutes, getGraphQLErrorMessage } from '../../helpers';
import { CancelReasonsByType, FormValueReject, MasterTable, SubHeader } from '../../components';
import { MyOrdersQueryVariables, useMyOrdersQuery } from '../../graphql/queries/myOrders.generated';
import { CategoryTypeEnum, OrderEntity, OrderStatusEnum } from '../../graphql/type.interface';
import { numberWithDots, showNotification } from '../../utils';
import { FORMAT_TIME } from '../../constants';
import { useCancelOrderMutation } from '../../graphql/mutations/cancelOrder.generated';
import { useUserUpdateOrderStatusMutation } from '../../graphql/mutations/userUpdateOrderStatus.generated';
import { useCountOrderItemForEachStatusQuery } from '../../graphql/queries/countOrderItemForEachStatus.generated';

import OrderFormFilter, { FormDataFilter } from './components/form-filter';

const Order = memo(() => {
  const navigator = useNavigate();
  const location = useLocation();
  const [_, setParams] = useSearchParams();
  const [tabActive, setTabActive] = useState(OrderStatusEnum.WAIT_FOR_CONFIRM);

  const [filter, setFilter] = useState<MyOrdersQueryVariables>({
    limit: 10,
    page: 1,
    search: null,
    statuses: [tabActive],
  });
  const { data, loading, refetch } = useMyOrdersQuery({
    variables: filter,
    fetchPolicy: 'cache-and-network',
  });
  const orders = useMemo(() => data?.myOrders?.items ?? [], [data]);

  const { data: dataOrderCout, refetch: refetchCount } = useCountOrderItemForEachStatusQuery();
  const orderCount = useMemo(
    () => dataOrderCout?.countOrderItemForEachStatus,
    [dataOrderCout?.countOrderItemForEachStatus],
  );

  const tabs = useMemo(
    () => [
      {
        key: OrderStatusEnum.WAIT_FOR_CONFIRM,
        label: `Chờ xác nhận (${
          orderCount?.find((i) => i.status === OrderStatusEnum.WAIT_FOR_CONFIRM)?.totalItem ?? 0
        })`,
      },
      {
        key: OrderStatusEnum.SHIPPING,
        label: `Đang giao (${orderCount?.find((i) => i.status === OrderStatusEnum.SHIPPING)?.totalItem ?? 0})`,
      },
      {
        key: OrderStatusEnum.DELIVERED,
        label: `Đã giao (${orderCount?.find((i) => i.status === OrderStatusEnum.DELIVERED)?.totalItem ?? 0})`,
      },
      {
        key: OrderStatusEnum.COMPLETE,
        label: `Hoàn thành (${orderCount?.find((i) => i.status === OrderStatusEnum.COMPLETE)?.totalItem ?? 0})`,
      },
      {
        key: OrderStatusEnum.CANCEL,
        label: `Đơn huỷ (${orderCount?.find((i) => i.status === OrderStatusEnum.CANCEL)?.totalItem ?? 0})`,
      },
    ],
    [orderCount],
  );

  const handleSearch = useCallback(
    ({ time, search }: FormDataFilter) => {
      setFilter({ ...filter, search, startDate: time?.[0], endDate: time?.[1], page: 1 });
    },
    [filter],
  );

  const [openCancel, setOpenCancel] = useState(false);
  const [orderIdSelected, setOrderIdSelected] = useState<string | null>();

  const [cancelOrder, { loading: canceling }] = useCancelOrderMutation({
    onCompleted() {
      refetch();
      refetchCount();
      showNotification('success', 'Hủy đơn hàng thành công');
      setOpenCancel(false);
      setOrderIdSelected(null);
    },
    onError(error) {
      showNotification('error', 'Hủy đơn hàng thất bại', getGraphQLErrorMessage(error));
    },
  });

  const handleCancelOrder = useCallback((id: string) => {
    setOpenCancel(true);
    setOrderIdSelected(id);
  }, []);

  const [changeStatusMutation, { loading: updating }] = useUserUpdateOrderStatusMutation({
    onCompleted() {
      refetchCount();
      refetch();
      showNotification('success', 'Chuyển trạng thái đơn hàng thành công');
    },
    onError(error) {
      showNotification('error', 'Chuyển trạng thái đơn hàng thất bại', getGraphQLErrorMessage(error));
    },
  });

  const handleChangeStatus = useCallback(
    (newStatus: OrderStatusEnum, id: string) => {
      changeStatusMutation({
        variables: {
          input: {
            orderId: id,
            status: newStatus,
          },
        },
      });
    },
    [changeStatusMutation],
  );

  const renderActionsByStatus = useCallback(
    (status: OrderStatusEnum, _record: OrderEntity) => {
      switch (status) {
        case OrderStatusEnum.WAIT_FOR_CONFIRM:
          return (
            <div>
              <span className="text-error hover:cursor-pointer" onClick={() => handleCancelOrder(_record?.id)}>
                Hủy
              </span>
              <Divider type="vertical" />
              <span
                className="text-primary hover:cursor-pointer"
                onClick={() => navigator(AppRoutes.orders.detail.id(_record?.id))}>
                Xem chi tiết
              </span>
            </div>
          );
        case OrderStatusEnum.SHIPPING:
          return (
            <div>
              <span
                className="text-blue hover:cursor-pointer"
                onClick={() => handleChangeStatus(OrderStatusEnum.COMPLETE, _record?.id)}>
                Đã nhận hàng
              </span>
              <Divider type="vertical" />
              <p
                className="text-primary hover:cursor-pointer"
                onClick={() => navigator(AppRoutes.orders.detail.id(_record?.id))}>
                Xem chi tiết
              </p>
            </div>
          );
        case OrderStatusEnum.DELIVERED:
          return (
            <div>
              <span
                className="text-blue hover:cursor-pointer"
                onClick={() => handleChangeStatus(OrderStatusEnum.COMPLETE, _record?.id)}>
                Hoàn thành
              </span>
              <Divider type="vertical" />
              <p
                className="text-primary hover:cursor-pointer"
                onClick={() => navigator(AppRoutes.orders.detail.id(_record?.id))}>
                Xem chi tiết
              </p>
            </div>
          );
        default:
          return (
            <p
              className="text-primary hover:cursor-pointer"
              onClick={() => navigator(AppRoutes.orders.detail.id(_record?.id))}>
              Xem chi tiết
            </p>
          );
      }
    },
    [handleCancelOrder, handleChangeStatus, navigator],
  );

  const defaultColumns: ColumnsType<any> = useMemo(
    () => [
      {
        title: 'Mã đơn hàng',
        key: 'code',
        dataIndex: 'code',
        render: (code, r) => <Link to={AppRoutes.orders.detail.id(r?.id)}>{code}</Link>,
        width: '10%',
      },
      {
        title: 'Sản phẩm',
        key: 'product',
        dataIndex: 'product',
        width: '30%',
        render: (products) => {
          return (products ?? []).map((it: any, idx: number) => (
            <div className="flex mb-8px" key={idx}>
              <img className="w-[30px] h-[30px] rounded object-cover" src={it?.avatar?.fullThumbUrl} />
              <span className="pl-12px text-14px font-medium leading-20px line-clamp-1">{it.name}</span>
            </div>
          ));
        },
      },
      {
        title: 'Số lượng',
        key: 'quantity',
        dataIndex: 'product',
        align: 'right',
        width: '10%',
        render: (products) => {
          return (products ?? []).map((it: any) => (
            <div className="h-[30px] mb-8px" key={'quantity' + it?.id}>
              {'x' + it?.quantity}
            </div>
          ));
        },
      },
      {
        title: 'Đơn giá',
        key: 'unitPrice',
        dataIndex: 'product',
        align: 'right',
        width: '15%',
        render: (products) => {
          return (products ?? []).map((it: any) => (
            <div className="h-[30px] mb-8px" key={'unitPrice' + it?.id}>
              {numberWithDots(it?.unitPrice) + 'đ'}
            </div>
          ));
        },
      },
      {
        title: 'Tổng cộng',
        key: 'total',
        dataIndex: 'total',
        align: 'right',
        width: '15%',
        render: (total) => <span className="font-semibold">{numberWithDots(total) + 'đ'}</span>,
      },
      {
        title: 'Thời gian đặt',
        key: 'createdAt',
        dataIndex: 'createdAt',
        align: 'center',
        width: '10%',
        render: (_createdAt) => dayjs(_createdAt).format(FORMAT_TIME),
      },
      {
        title: 'Tùy chọn',
        dataIndex: 'status',
        key: 'action',
        align: 'right',
        width: '10%',
        render: (status, _record) => renderActionsByStatus(status, _record),
      },
    ],
    [renderActionsByStatus],
  );
  const orderCompletedColumn: ColumnsType<any> = useMemo(
    () => [
      {
        title: 'Mã đơn hàng',
        key: 'code',
        dataIndex: 'code',
        render: (code, r) => <Link to={AppRoutes.orders.detail.id(r?.id)}>{code}</Link>,
        width: '10%',
      },
      {
        title: 'Sản phẩm',
        key: 'product',
        dataIndex: 'product',
        width: '30%',
        render: (products) => {
          return (products ?? []).map((it: any, idx: number) => (
            <div className="flex mb-8px" key={idx}>
              <img className="w-[30px] h-[30px] rounded object-cover" src={it?.avatar?.fullThumbUrl} />
              <span className="pl-12px text-14px font-medium leading-20px line-clamp-1">{it.name}</span>
            </div>
          ));
        },
      },
      {
        title: 'Số lượng',
        key: 'quantity',
        dataIndex: 'product',
        align: 'right',
        width: '10%',
        render: (products) => {
          return (products ?? []).map((it: any) => (
            <div className="h-[30px] mb-8px" key={'quantity' + it?.id}>
              {'x' + it?.quantity}
            </div>
          ));
        },
      },
      {
        title: 'Đơn giá',
        key: 'unitPrice',
        dataIndex: 'product',
        align: 'right',
        width: '15%',
        render: (products) => {
          return (products ?? []).map((it: any) => (
            <div className="h-[30px] mb-8px" key={'unitPrice' + it?.id}>
              {numberWithDots(it?.unitPrice) + 'đ'}
            </div>
          ));
        },
      },
      {
        title: 'Tổng cộng',
        key: 'total',
        dataIndex: 'total',
        align: 'right',
        width: '15%',
        render: (total) => <span className="font-semibold">{numberWithDots(total) + 'đ'}</span>,
      },
      {
        title: 'Thời gian đặt',
        key: 'createdAt',
        dataIndex: 'createdAt',
        align: 'center',
        width: '10%',
        render: (_createdAt) => dayjs(_createdAt).format(FORMAT_TIME),
      },
      {
        title: 'Thời gian hoàn thành',
        key: 'statusDetail',
        dataIndex: 'statusDetail',
        align: 'center',
        width: '10%',
        render: (statusDetail) => dayjs(statusDetail?.createdAt).format(FORMAT_TIME),
      },
      {
        title: 'Tùy chọn',
        dataIndex: 'status',
        key: 'action',
        align: 'right',
        width: '10%',
        render: (status, _record) => renderActionsByStatus(status, _record),
      },
    ],
    [renderActionsByStatus],
  );
  const orderCancelColumn: ColumnsType<any> = useMemo(
    () => [
      {
        title: 'Mã đơn hàng',
        key: 'code',
        dataIndex: 'code',
        render: (code, r) => <Link to={AppRoutes.orders.detail.id(r?.id)}>{code}</Link>,
        width: '10%',
      },
      {
        title: 'Sản phẩm',
        key: 'product',
        dataIndex: 'product',
        width: '30%',
        render: (products) => {
          return (products ?? []).map((it: any, idx: number) => (
            <div className="flex mb-8px" key={idx}>
              <img className="w-[30px] h-[30px] rounded object-cover" src={it?.avatar?.fullThumbUrl} />
              <span className="pl-12px text-14px font-medium leading-20px line-clamp-1">{it.name}</span>
            </div>
          ));
        },
      },
      {
        title: 'Số lượng',
        key: 'quantity',
        dataIndex: 'product',
        align: 'right',
        width: '10%',
        render: (products) => {
          return (products ?? []).map((it: any) => (
            <div className="h-[30px] mb-8px" key={'quantity' + it?.id}>
              {'x' + it?.quantity}
            </div>
          ));
        },
      },
      {
        title: 'Đơn giá',
        key: 'unitPrice',
        dataIndex: 'product',
        align: 'right',
        width: '15%',
        render: (products) => {
          return (products ?? []).map((it: any) => (
            <div className="h-[30px] mb-8px" key={'unitPrice' + it?.id}>
              {numberWithDots(it?.unitPrice) + 'đ'}
            </div>
          ));
        },
      },
      {
        title: 'Tổng cộng',
        key: 'total',
        dataIndex: 'total',
        align: 'right',
        width: '15%',
        render: (total) => <span className="font-semibold">{numberWithDots(total) + 'đ'}</span>,
      },
      {
        title: 'Thời gian đặt',
        key: 'createdAt',
        dataIndex: 'createdAt',
        align: 'center',
        width: '10%',
        render: (_createdAt) => dayjs(_createdAt).format(FORMAT_TIME),
      },
      {
        title: 'Thời gian hủy',
        key: 'statusDetail',
        dataIndex: 'statusDetail',
        align: 'center',
        width: '10%',
        render: (statusDetail) => dayjs(statusDetail?.createdAt).format(FORMAT_TIME),
      },
      {
        title: 'Tùy chọn',
        dataIndex: 'status',
        key: 'action',
        align: 'right',
        width: '10%',
        render: (status, _record) => renderActionsByStatus(status, _record),
      },
    ],
    [renderActionsByStatus],
  );

  const [columns, setColumns] = useState(defaultColumns);

  const handleChangeTab = useCallback(
    (key: string) => {
      const newStatus = key as OrderStatusEnum;
      setParams((p) => {
        p.set('status', newStatus);
        return p;
      });
      setTabActive(newStatus);
      refetch({
        ...filter,
        page: 1,
        statuses: [newStatus],
      });
      switch (newStatus) {
        case OrderStatusEnum.COMPLETE:
          setColumns(orderCompletedColumn);
          break;
        case OrderStatusEnum.CANCEL:
          setColumns(orderCancelColumn);
          break;
        default:
          setColumns(defaultColumns);
      }
    },
    [defaultColumns, filter, orderCancelColumn, orderCompletedColumn, refetch, setParams],
  );

  useEffect(() => {
    const status = location?.search.slice(8);
    if (status) {
      const newStatus = status as OrderStatusEnum;
      const orderStatusEnumArray = Object.values(OrderStatusEnum);
      const isExist = orderStatusEnumArray.includes(newStatus);
      if (isExist) {
        setTabActive(newStatus),
          refetch({
            ...filter,
            page: 1,
            statuses: [newStatus],
          });
      }
    }
  }, [filter, location, refetch]);

  return (
    <div>
      <div>
        <SubHeader
          items={[
            { title: 'Trang chủ', to: AppRoutes.home },
            { title: AppRoutes.orders.list.label, to: AppRoutes.orders.list.value },
          ]}
        />
        <Tabs items={tabs} activeKey={tabActive} onChange={handleChangeTab} />
      </div>
      <div className="mx-20px">
        <OrderFormFilter onFilter={handleSearch} />
      </div>
      <div className="bg-white m-20px p-20px">
        <MasterTable
          title={(data?.myOrders?.meta?.totalItems ?? 0) + ' đơn hàng'}
          filter={filter}
          setFilter={setFilter}
          data={orders ?? []}
          columns={columns}
          loading={loading || updating}
          total={data?.myOrders?.meta?.totalItems}
          expandable={{
            defaultExpandAllRows: true,
            showExpandColumn: true,
            columnWidth: '3%',
            expandedRowRender: (record) => (
              <div className="mb-20px">
                <span className="text-grayscale-gray text-14px leading-20px">Ghi chú: </span>
                <span className="text-grayscale-black text-14px leading-20px">{record?.note}</span>
              </div>
            ),
          }}
          emptyText="Chưa có Đơn hàng nào"
        />
      </div>
      {openCancel && orderIdSelected && (
        <CancelReasonsByType
          title="Xác nhận lý do hủy đơn hàng"
          open={openCancel}
          setOpen={setOpenCancel}
          type={CategoryTypeEnum.CANCEL_ORDER_REASON_BY_USER}
          loading={canceling}
          onFinish={(values: FormValueReject) =>
            cancelOrder({
              variables: {
                input: {
                  orderId: orderIdSelected,
                  ...values,
                },
              },
            })
          }
        />
      )}
    </div>
  );
});

export default Order;
