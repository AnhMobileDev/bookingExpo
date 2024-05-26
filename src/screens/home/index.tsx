import { memo, useCallback, useMemo, useReducer, useState } from 'react';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import Table, { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

import { ArrowRight, NoRequestRepairIcon } from '../../assets/icon';
import { AppRoutes } from '../../helpers';
import {
  MaintenanceEntity,
  MaintenanceLevelEnum,
  MaintenanceStatusEnum,
  Maybe,
  UserEntity,
  VehicleEntity,
} from '../../graphql/type.interface';
import { maintenanceText } from '../../utils/messages';
import { ActionsTable } from '../maintenances/tab-maintenance-comp';
import { CancelMaintenance } from '../maintenances/form-modals/cancel-modal';
import {
  UserMaintenancesQueryVariables,
  useUserMaintenancesQuery,
} from '../../graphql/queries/userMaintenances.generated';
import { FullscreenLoading } from '../../components';
import { serialColumnTable } from '../../utils';
import { DefaultPagination } from '../../constants';

import { PartnerResume, Statistic } from './components';
import './style.less';

enum TABLE_TYPE {
  THIS_WEEK = 'THIS_WEEK',
  NEXT_WEEK = 'NEXT_WEEK',
}
interface ParamsAction {
  type: TABLE_TYPE;
  payload: UserMaintenancesQueryVariables;
}

type ParamsState = {
  [key in TABLE_TYPE]: UserMaintenancesQueryVariables;
};

function paramsReducer(state: ParamsState, action: ParamsAction) {
  const { type, payload } = action;
  return { ...state, [type]: { ...state[type], ...payload } };
}

const Home = memo(() => {
  const [idCancel, setIdCancel] = useState<string>();
  const [listParams, dispatchListParams] = useReducer(paramsReducer, {
    [TABLE_TYPE.THIS_WEEK]: {
      page: 1,
      limit: 5,
      statuses: [],
      startDate: dayjs().startOf('week').toISOString(),
      endDate: dayjs().endOf('week').toISOString(),
    },
    [TABLE_TYPE.NEXT_WEEK]: {
      page: 1,
      limit: 5,
      statuses: [],
      startDate: dayjs().add(1, 'week').startOf('week').toISOString(),
      endDate: dayjs().add(1, 'week').endOf('week').toISOString(),
    },
  });

  const handleChangePage = useCallback(
    (newPage: number, pageSize: number, type: TABLE_TYPE) =>
      dispatchListParams({ type, payload: { page: newPage, limit: pageSize } }),
    [],
  );

  const columns: ColumnsType<any> = useMemo(
    () => [
      { title: 'STT', dataIndex: 'index', width: 90, align: 'center' },
      { title: 'Mã yêu cầu', dataIndex: 'code', width: 160 },
      {
        title: 'Thiết bị cần bảo dưỡng',
        dataIndex: 'vehicle',
        key: 'vehicle-name',
        render: (v: Maybe<VehicleEntity>) => (
          <div className="flex flex-row items-center">
            <img
              src={v?.avatar && v.avatar.fullThumbUrl ? v.avatar.fullThumbUrl : ''}
              width={32}
              height={32}
              className="rounded"
            />
            <div className="ml-[12px]">
              <div className="font-medium text-[14px] leading-[20px] text-yankees-blue text-ellipsis overflow-hidden">
                {v?.name}
              </div>
              <div className="text-[13px] leading-[18px] text-grayscale-gray">{v?.mapAddress}</div>
            </div>
          </div>
        ),
      },
      {
        title: 'Loại bảo dưỡng',
        dataIndex: 'maintenanceLevel',
        render: (v: MaintenanceLevelEnum, rec: MaintenanceEntity) => maintenanceText(v, rec.routineLevel),
      },
      {
        title: 'Đơn vị bảo dưỡng',
        dataIndex: 'user',
        key: 'user-name',
        ellipsis: true,
        render: (v: Maybe<UserEntity>) => (
          <div className="flex flex-row items-center break-words">
            <img
              src={v?.avatar && v.avatar.fullThumbUrl ? v.avatar.fullThumbUrl : ''}
              width={32}
              height={32}
              className="rounded"
            />
            <div className="ml-[12px]">
              <div className="font-medium text-[14px] leading-[20px] text-yankees-blue">{v?.fullname}</div>
            </div>
          </div>
        ),
      },
      {
        title: 'Tùy chọn',
        dataIndex: 'id',
        width: 150,
        align: 'center',
        render: (id: string, rec: MaintenanceEntity) => (
          <ActionsTable
            detailUrl={AppRoutes.maintenances.detail.id(id)}
            cancelProps={
              rec.status !== MaintenanceStatusEnum.DENY && rec.status !== MaintenanceStatusEnum.CANCEL
                ? { onClick: () => setIdCancel(id) }
                : undefined
            }
          />
        ),
      },
    ],
    [],
  );

  const { data: thisWeekMaintenancesData, loading: thisWeekMaintenancesLoading } = useUserMaintenancesQuery({
    variables: listParams.THIS_WEEK,
    fetchPolicy: 'cache-and-network',
  });

  const { data: nextWeekMaintenancesData, loading: nextWeekMaintenancesLoading } = useUserMaintenancesQuery({
    variables: listParams.NEXT_WEEK,
    fetchPolicy: 'cache-and-network',
  });

  if (!thisWeekMaintenancesData || !nextWeekMaintenancesData) return <FullscreenLoading />;

  return (
    <div className="p-5">
      <Row gutter={20}>
        <Col span={8}>
          <PartnerResume />
        </Col>
        <Col span={8}>
          <Statistic
            link={AppRoutes.requestRepair.index}
            title="Yêu cầu sửa chữa"
            values={[
              { label: 'Chờ nhận', value: '01' },
              { label: 'Đã hủy', value: '01' },
              { label: 'Đang đến', value: '01' },
              { label: 'Hoàn thành', value: '01' },
            ]}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="Yêu cầu bảo dưỡng"
            values={[
              { label: 'Chờ nhận', value: '01' },
              { label: 'Phê duyệt', value: '01' },
              { label: 'Từ chối', value: '01' },
            ]}
          />
        </Col>
      </Row>
      <div className="mt-[20px] p-[20px] bg-white">
        <h2 className="flex items-center font-semibold text-xl">
          Lịch bảo dưỡng tuần này
          <Link to={AppRoutes.maintenances.index} className="pl-2 pt-1">
            <ArrowRight width={18} height={18} className="cursor-pointer" />
          </Link>
        </h2>
        {thisWeekMaintenancesData.userMaintenances.meta.totalItems === 0 ? (
          <div className="mt-[20px] mb-[80px] w-full flex flex-col items-center justify-center">
            <NoRequestRepairIcon />
            <div>Chưa có Yêu cầu sửa chữa nào chờ nhận</div>
          </div>
        ) : (
          <Table
            loading={thisWeekMaintenancesLoading}
            size="small"
            bordered
            columns={columns}
            dataSource={
              thisWeekMaintenancesData.userMaintenances.items?.map((el, i) => ({
                ...el,
                key: el.id,
                index: serialColumnTable(listParams.THIS_WEEK.page ?? 1, i),
              })) ?? []
            }
            pagination={{
              ...DefaultPagination,
              onChange: (page, size) => handleChangePage(page, size, TABLE_TYPE.THIS_WEEK),
              current: Number(listParams.THIS_WEEK.page),
              total: thisWeekMaintenancesData.userMaintenances.meta.totalItems,
            }}
            rowKey="id"
          />
        )}
      </div>
      <div className="mt-[20px] p-[20px] bg-white">
        <h2 className="flex items-center font-semibold text-xl">
          Lịch bảo dưỡng tuần tới
          <Link to={AppRoutes.requestRepair.index} className="pl-2 pt-1">
            <ArrowRight width={18} height={18} className="cursor-pointer" />
          </Link>
        </h2>
        {nextWeekMaintenancesData.userMaintenances.meta.totalItems === 0 ? (
          <div className="mt-[20px] mb-[80px] w-full flex flex-col items-center justify-center">
            <NoRequestRepairIcon />
            <div>Chưa có Yêu cầu sửa chữa nào đang nhận</div>
          </div>
        ) : (
          <Table
            loading={nextWeekMaintenancesLoading}
            size="small"
            bordered
            columns={columns}
            dataSource={
              nextWeekMaintenancesData.userMaintenances.items?.map((el, i) => ({
                ...el,
                key: el.id,
                index: serialColumnTable(listParams.NEXT_WEEK.page ?? 1, i),
              })) ?? []
            }
            pagination={{
              ...DefaultPagination,
              onChange: (page, size) => handleChangePage(page, size, TABLE_TYPE.NEXT_WEEK),
              current: Number(listParams.NEXT_WEEK.page),
              total: nextWeekMaintenancesData.userMaintenances.meta.totalItems,
            }}
            rowKey="id"
          />
        )}
      </div>
      {idCancel && <CancelMaintenance id={idCancel} open={!!idCancel} onClose={() => setIdCancel(undefined)} />}
    </div>
  );
});
export default Home;
