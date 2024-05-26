import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Divider, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

import { BookingEntity, BookingStatusEnum } from '../../../graphql/type.interface';
import { DefaultPagination } from '../../../utils/pagination';
import { convertBookingStatus, numberWithDots, serialColumnTable } from '../../../utils';
import { AppRoutes } from '../../../helpers';
import { ArrowDown, ArrowUp } from '../../../assets/icon';
import { tabsKey } from '..';
import { ProblemTexts, TransportDistance, User, Vehicle } from '../../../components/colums-table';

import { CancelRepair } from './modal/cancel-request-repair';

type Props = {
  refetch: any;
  refetchCount: any;
  activeTab: string;
  bookings?: BookingEntity[];
  loading?: boolean;
  page?: number;
  totalItems?: number;
  onChangePage: (newPage: number) => void;
};

export const RequestRepairTable = memo(
  ({ activeTab, bookings, loading, page, totalItems, onChangePage, refetch, refetchCount }: Props) => {
    const [openModalCancel, setOpenModalCancel] = useState(false);
    const [bookingId, setBookingId] = useState<string | null>();

    const ActionCancel = useCallback((id: string) => {
      return (
        <span
          className="text-[#D63120] text-base font-normal hover:cursor-pointer"
          onClick={() => {
            setBookingId(id);
            setOpenModalCancel(true);
          }}>
          Hủy
        </span>
      );
    }, []);

    const ActionDetail = useCallback((id: string) => {
      return (
        <Link to={AppRoutes.requestRepair.detail.id(id)}>
          <span className="text-primary">Xem chi tiết</span>
        </Link>
      );
    }, []);

    const columnDefault: ColumnsType<any> = useMemo(
      () => [
        {
          title: 'STT',
          key: 'index',
          dataIndex: 'index',
          align: 'center',
          render: (_, __, index) => serialColumnTable(page as number, index),
          width: '5%',
        },
        {
          title: 'Mã yêu cầu',
          dataIndex: 'code',
          width: '10%',
          key: 'code',
          render: (code, item) => {
            return (
              <div>
                <Link to={AppRoutes.requestRepair.detail.id(item?.id)}>{code}</Link>
              </div>
            );
          },
        },
        {
          title: 'Thiết bị gặp sự cố',
          dataIndex: 'vehicle',
          key: 'vehicle',
          width: '15%',
          render: (vehicle) => <Vehicle vehicle={vehicle} />,
        },
        {
          title: `Hiện tượng hư hỏng`,
          dataIndex: 'problemTexts',
          key: 'problemTexts',
          render: (problemTexts) => <ProblemTexts problemTexts={problemTexts} />,
          width: '10%',
        },
        {
          title: `Kỹ thuật viên`,
          dataIndex: 'partner',
          key: 'partner',
          render: (user) => <User user={user} />,
          width: '15%',
        },
        {
          title: (
            <div className="flex gap-4">
              <span>Phí di chuyển</span>
              <div className="flex flex-col gap-1 translate-y-1.5">
                <ArrowUp className=" cursor-pointer" />
                <ArrowDown className=" cursor-pointer" />
              </div>
            </div>
          ),
          dataIndex: 'transportDistance',
          width: '10%',
          key: 'transportDistance',
          render: (_, record) => <TransportDistance record={record} />,
        },
        {
          title: `Tùy chọn`,
          dataIndex: 'id',
          width: '8%',
          render: (id, record) => {
            if (record?.status === BookingStatusEnum.CANCEL) {
              return ActionDetail(id);
            }
            return (
              <div className="flex items-center">
                {ActionCancel(id)}
                <Divider type="vertical" />
                {ActionDetail(id)}
              </div>
            );
          },
        },
      ],
      [ActionCancel, ActionDetail, page],
    );

    const columnHandle: ColumnsType<any> = useMemo(
      () => [
        {
          title: 'STT',
          key: 'index',
          dataIndex: 'index',
          align: 'center',
          render: (_, __, index) => serialColumnTable(page as number, index),
          width: '5%',
        },
        {
          title: 'Mã yêu cầu',
          dataIndex: 'code',
          width: '10%',
          key: 'code',
          render: (code, item) => {
            return (
              <div>
                <Link to={AppRoutes.requestRepair.detail.id(item?.id)}>{code}</Link>
              </div>
            );
          },
        },
        {
          title: 'Thiết bị gặp sự cố',
          dataIndex: 'vehicle',
          key: 'vehicle',
          width: '15%',
          render: (vehicle) => <Vehicle vehicle={vehicle} />,
        },
        {
          title: `Hiện tượng hư hỏng`,
          dataIndex: 'problemTexts',
          key: 'problemTexts',
          render: (problemTexts) => <ProblemTexts problemTexts={problemTexts} />,
          width: '10%',
        },
        {
          title: `Kỹ thuật viên`,
          dataIndex: 'partner',
          key: 'partner',
          render: (user) => <User user={user} />,
          width: '15%',
        },
        {
          title: (
            <div className="flex gap-4">
              <span>Phí di chuyển</span>
              <div className="flex flex-col gap-1 translate-y-1.5">
                <ArrowUp className=" cursor-pointer" />
                <ArrowDown className=" cursor-pointer" />
              </div>
            </div>
          ),
          dataIndex: 'transportDistance',
          width: '10%',
          key: 'transportDistance',
          render: (_, record) => <TransportDistance record={record} />,
        },
        {
          title: `Trạng thái`,
          dataIndex: 'status',
          key: 'status',
          render: (status) => convertBookingStatus(status),
          width: '10%',
        },
        {
          title: `Tùy chọn`,
          dataIndex: 'id',
          width: '8%',
          render: (id) => {
            return (
              <div className="flex items-center">
                {ActionCancel(id)}
                <Divider type="vertical" />
                {ActionDetail(id)}
              </div>
            );
          },
        },
      ],
      [ActionCancel, ActionDetail, page],
    );

    const columnCompleted: ColumnsType<any> = useMemo(
      () => [
        {
          title: 'STT',
          key: 'index',
          dataIndex: 'index',
          align: 'center',
          render: (_, __, index) => serialColumnTable(page as number, index),
          width: '5%',
        },
        {
          title: 'Mã yêu cầu',
          dataIndex: 'code',
          width: '10%',
          key: 'code',
          render: (code, item) => {
            return (
              <div>
                <Link to={AppRoutes.requestRepair.detail.id(item?.id)}>{code}</Link>
              </div>
            );
          },
        },
        {
          title: 'Thiết bị gặp sự cố',
          dataIndex: 'vehicle',
          key: 'vehicle',
          width: '15%',
          render: (vehicle) => <Vehicle vehicle={vehicle} />,
        },
        {
          title: `Hiện tượng hư hỏng`,
          dataIndex: 'problemTexts',
          key: 'problemTexts',
          render: (problemTexts) => <ProblemTexts problemTexts={problemTexts} />,
          width: '10%',
        },
        {
          title: `Kỹ thuật viên`,
          dataIndex: 'partner',
          key: 'partner',
          render: (user) => <User user={user} />,
          width: '15%',
        },
        {
          title: (
            <div className="flex gap-4">
              <span>Phí di chuyển</span>
              <div className="flex flex-col gap-1 translate-y-1.5">
                <ArrowUp className=" cursor-pointer" />
                <ArrowDown className=" cursor-pointer" />
              </div>
            </div>
          ),
          dataIndex: 'transportDistance',
          width: '10%',
          key: 'transportDistance',
          render: (_, record) => <TransportDistance record={record} />,
        },
        {
          title: `Tổng chi phí`,
          dataIndex: 'settlementAccepted',
          key: 'settlementAccepted',
          render: (settlementAccepted) => (
            <span className="font-semibold">{numberWithDots(settlementAccepted?.total) + ' đ'}</span>
          ),
          width: '10%',
        },
        {
          title: `Tùy chọn`,
          dataIndex: 'id',
          width: '8%',
          render: (id) => {
            return ActionDetail(id);
          },
        },
      ],
      [ActionDetail, page],
    );

    const [columns, setColumns] = useState(columnDefault);

    useEffect(() => {
      switch (activeTab) {
        case tabsKey.quotes_settlement:
          setColumns(columnHandle);
          break;
        case tabsKey.completed:
          setColumns(columnCompleted);
          break;
        default:
          setColumns(columnDefault);
          break;
      }
    }, [activeTab, columnCompleted, columnDefault, columnHandle]);

    return (
      <>
        <Table
          size="small"
          loading={loading}
          bordered
          columns={columns}
          dataSource={bookings}
          pagination={{
            ...DefaultPagination,
            onChange: onChangePage,
            current: Number(page),
            total: totalItems,
          }}
          scroll={{ y: 'calc(100vh - 320px)' }}
          rowKey={'id'}
        />
        {openModalCancel && bookingId && (
          <CancelRepair
            refetch={refetch}
            refetchCount={refetchCount}
            setIsModalCancel={setOpenModalCancel}
            bookingId={bookingId}
            open={openModalCancel}
          />
        )}
      </>
    );
  },
);
