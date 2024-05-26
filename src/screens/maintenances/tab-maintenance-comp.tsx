import { memo, useState, useCallback, useMemo } from 'react';
import { Button, Divider, Result, ResultProps, Table } from 'antd';
import { Link } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import { Maybe } from 'graphql/jsutils/Maybe';

import {
  MaintenanceEntity,
  MaintenanceLevelEnum,
  MaintenanceStatusEnum,
  VehicleEntity,
} from '../../graphql/type.interface';
import { useUserMaintenancesQuery } from '../../graphql/queries/userMaintenances.generated';
import { LIST_PARAMS } from '../../constants/params';
import { AppRoutes } from '../../helpers';
import { CenteredSpinning } from '../../components';
import { DefaultPagination } from '../../utils/pagination';
import { serialColumnTable } from '../../utils';
import { maintenanceText } from '../../utils/messages';

import MaintenanceEmptyIcon from './maintenance-empty-icon';
import { CancelMaintenance } from './form-modals/cancel-modal';

export const ActionsTable = memo(
  ({ detailUrl, cancelProps }: { detailUrl: string; cancelProps?: React.HTMLProps<HTMLSpanElement> }) => (
    <div className="flex-center">
      {cancelProps && (
        <>
          <span className="text-error text-base font-normal hover:cursor-pointer" {...cancelProps}>
            Hủy
          </span>
          <Divider type="vertical" />
        </>
      )}
      <Link to={detailUrl}>
        <span className="text-primary">Xem chi tiết</span>
      </Link>
    </div>
  ),
);

export const TabMaintenanceComp = memo(
  ({ statuses }: { statuses: MaintenanceStatusEnum[]; refetchStatus: () => void }) => {
    const [params, setParams] = useState({ ...LIST_PARAMS, statuses });
    const [idCancel, setIdCancel] = useState<string>();
    const { data, loading } = useUserMaintenancesQuery({
      variables: params,
      fetchPolicy: 'cache-and-network',
    });

    const columns: ColumnsType<any> = useMemo(
      () => [
        { title: 'STT', dataIndex: 'index', width: 90, align: 'center' },
        { title: 'Mã yêu cầu', dataIndex: 'code', width: 160 },
        {
          title: 'Thiết bị cần bảo dưỡng',
          dataIndex: 'vehicle',
          key: 'vehicle-name',
          render: (v: Maybe<VehicleEntity>) => (
            <div className="flex items-center gap-x-12px">
              <img
                src={v?.avatar && v.avatar.fullThumbUrl ? v.avatar.fullThumbUrl : ''}
                width={32}
                height={32}
                className="rounded"
              />
              <div>
                <div className="font-medium text-[14px] leading-[20px] text-yankees-blue text-ellipsis overflow-hidden">
                  {v?.name}
                </div>
                <div className="text-[13px] leading-[18px] text-grayscale-gray line-clamp-1">{v?.mapAddress}</div>
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
          render: () => 'Call me',
        },
        {
          title: 'Tùy chọn',
          dataIndex: 'id',
          width: 150,
          align: 'center',
          render: (id: string, rec: MaintenanceEntity) => (
            <ActionsTable
              detailUrl={AppRoutes.maintenances.detail.id(id)}
              cancelProps={rec.status === MaintenanceStatusEnum.NEW ? { onClick: () => setIdCancel(id) } : undefined}
            />
          ),
        },
      ],
      [],
    );

    const onChangePage = useCallback(
      (newPage: number, pageSize: number) => {
        setParams({ ...params, page: newPage, limit: pageSize });
      },
      [params],
    );

    const emptyProps = (status: MaintenanceStatusEnum): ResultProps => {
      switch (status) {
        case MaintenanceStatusEnum.NEW:
          return {
            subTitle: 'Chưa có yêu cầu bảo dưỡng nào',
            extra: (
              <Link to={AppRoutes.maintenances.create.value}>
                <Button type="primary">Tạo yêu cầu bảo dưỡng</Button>
              </Link>
            ),
          };
        case MaintenanceStatusEnum.ACCEPTED:
          return { subTitle: 'Chưa có yêu cầu bảo dưỡng nào được phê duyệt' };
        case MaintenanceStatusEnum.DENY:
          return { subTitle: 'Chưa có yêu cầu bảo dưỡng nào bị từ chối' };
        default:
          return {};
      }
    };

    if (!data || loading) return <CenteredSpinning />;

    if (data.userMaintenances.meta.totalItems === 0)
      return <Result icon={<MaintenanceEmptyIcon id={statuses[0]} />} {...emptyProps(statuses[0])} />;

    return (
      <>
        <Table
          size="small"
          bordered
          columns={columns}
          dataSource={
            data.userMaintenances.items?.map((el, i) => ({
              ...el,
              key: el.id,
              index: serialColumnTable(params.page, i),
            })) ?? []
          }
          pagination={{
            ...DefaultPagination,
            onChange: onChangePage,
            current: Number(params.page),
            total: data.userMaintenances.meta.totalItems,
          }}
          scroll={{ y: 'calc(100vh - 320px)' }}
          rowKey="id"
        />
        {idCancel && <CancelMaintenance id={idCancel} open={!!idCancel} onClose={() => setIdCancel(undefined)} />}
      </>
    );
  },
);
