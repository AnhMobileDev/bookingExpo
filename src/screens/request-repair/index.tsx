import { Button, Tabs, TabsProps } from 'antd';
import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { SubHeader } from '../../components';
import { useMyBookingsQuery } from '../../graphql/queries/myBookings.generated';
import './style.less';
import { AdminUserPaginationInput, BookingEntity, BookingStatusEnum } from '../../graphql/type.interface';
import { AppRoutes } from '../../helpers';
import { useUserCountItemForEachStatusQuery } from '../../graphql/queries/userCountItemForEachStatus.generated';

import { RequestRepairTable } from './components';

export const tabsKey = {
  waiting: 'waiting',
  on_going: 'on_going',
  quotes_settlement: 'quotes_settlement',
  completed: 'completed',
  cancel: 'cancel',
};

const statuses = {
  waiting: [BookingStatusEnum.WAIT_FOR_CONFIRM, BookingStatusEnum.ASSIGNED_TECHNICIAN],
  on_going: [
    BookingStatusEnum.TECHNICIAN_ARRIVING,
    BookingStatusEnum.TECHNICIAN_ARRIVED,
    BookingStatusEnum.RESCHEDULED,
  ],
  quotes_settlement: [
    BookingStatusEnum.QUOTATION_ACCEPTED,
    BookingStatusEnum.QUOTATION_REJECTED,
    BookingStatusEnum.QUOTATION_REQUESTED,
    BookingStatusEnum.SETTLEMENT_ACCEPTED,
    BookingStatusEnum.SETTLEMENT_REJECTED,
    BookingStatusEnum.SETTLEMENT_REQUESTED,
  ],
  completed: [BookingStatusEnum.COMPLETE],
  cancel: [BookingStatusEnum.CANCEL],
};

const RequestRepair = memo(() => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [status, setStatus] = useState<BookingStatusEnum[]>(statuses.waiting);
  const [activeTab, setActiveTab] = useState(tabsKey.waiting);

  const [filter, setFilter] = useState<AdminUserPaginationInput>({
    page: 1,
    limit: 10,
    search: '',
    filters: null,
    isActive: null,
    isApproved: null,
  });
  const { data, loading, refetch } = useMyBookingsQuery({
    variables: { ...filter, statuses: status },
    fetchPolicy: 'cache-and-network',
  });

  const bookings = useMemo(() => data?.myBookings?.items ?? [], [data]);
  const totalItems = useMemo(() => data?.myBookings.meta.totalItems, [data]);

  const onChangeTab = useCallback(
    (key: string) => {
      setActiveTab(key);
      setSearchParams((params) => {
        params.set('status', key);
        return params;
      });
    },
    [setSearchParams],
  );

  const handleChangePage = useCallback(
    (newPage: any) => {
      setFilter({ ...filter, page: newPage });
    },
    [filter],
  );

  const { data: dataQuantity, refetch: refetchCount } = useUserCountItemForEachStatusQuery();
  const quantity = useMemo(() => dataQuantity?.userCountItemForEachStatus, [dataQuantity]);

  useEffect(() => {
    const res = searchParams.get('status');
    if (res) {
      setActiveTab(res);
      switch (res) {
        case tabsKey.waiting:
          setStatus(statuses.waiting);
          break;
        case tabsKey.cancel:
          setStatus(statuses.cancel);
          break;
        case tabsKey.on_going:
          setStatus(statuses.on_going);
          break;
        case tabsKey.completed:
          setStatus(statuses.completed);
          break;
        case tabsKey.quotes_settlement:
          setStatus(statuses.quotes_settlement);
          break;
      }
      return;
    }
  }, [searchParams]);

  const getQuantityByStatuses = useCallback(
    (statuses: BookingStatusEnum[]) => {
      if (!quantity) return 0;
      return quantity.reduce((total, it) => {
        if (statuses.includes(it?.status)) {
          return (total += it?.totalitems);
        }
        return total;
      }, 0);
    },
    [quantity],
  );

  const items: TabsProps['items'] = useMemo(
    () => [
      {
        key: tabsKey.waiting,
        label: `Chờ xác nhận (${getQuantityByStatuses(statuses.waiting)})`,
      },
      {
        key: tabsKey.on_going,
        label: `Đang đến (${getQuantityByStatuses(statuses.on_going)})`,
      },
      {
        key: tabsKey.quotes_settlement,
        label: `Chẩn đoán - Báo giá (${getQuantityByStatuses(statuses.quotes_settlement)})`,
      },
      {
        key: tabsKey.completed,
        label: `Hoàn thành (${getQuantityByStatuses(statuses.completed)})`,
      },
      {
        key: tabsKey.cancel,
        label: `Đã hủy (${getQuantityByStatuses(statuses.cancel)})`,
      },
    ],
    [getQuantityByStatuses],
  );
  return (
    <div className="resquest">
      <SubHeader
        items={[
          { title: 'Trang chủ', to: AppRoutes.home },
          { title: AppRoutes.requestRepair.list.lable, to: AppRoutes.requestRepair.list.value },
        ]}
        rightContent={
          <Button type="primary" onClick={() => navigate(AppRoutes.requestRepair.create.value)}>
            Tạo yêu cầu sửa chữa
          </Button>
        }
      />
      <div className="resquest">
        <Tabs items={items} onChange={onChangeTab} activeKey={activeTab} />
      </div>
      <div className="bg-white m-20px p-20px">
        <RequestRepairTable
          refetch={refetch}
          refetchCount={refetchCount}
          activeTab={activeTab}
          bookings={bookings as BookingEntity[]}
          loading={loading}
          page={filter?.page as number}
          totalItems={totalItems}
          onChangePage={handleChangePage}
        />
      </div>
    </div>
  );
});

export default RequestRepair;
