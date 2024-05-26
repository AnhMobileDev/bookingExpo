import React, { memo, useMemo } from 'react';
import { Button, Tabs } from 'antd';
import { Link, useLocation } from 'react-router-dom';

import { CenteredSpinning, SubHeader } from '../../components';
import { AppRoutes } from '../../helpers';
import { useCountMaintenanceItemForEachStatusQuery } from '../../graphql/queries/countMaintenanceItemForEachStatus.generated';
import { MaintenanceStatusAndItemCount, MaintenanceStatusEnum } from '../../graphql/type.interface';

import { TabMaintenanceComp } from './tab-maintenance-comp';

const findTotal = (arr: MaintenanceStatusAndItemCount[], status: MaintenanceStatusEnum) =>
  arr.find((el) => el.status === status)?.totalItem ?? 0;

const Maintenances: React.FC = memo(() => {
  const { state } = useLocation();
  const {
    data: countStatusData,
    loading,
    refetch,
  } = useCountMaintenanceItemForEachStatusQuery({
    variables: {},
    fetchPolicy: 'cache-and-network',
  });

  const countStatus = useMemo(
    () =>
      countStatusData && {
        new: findTotal(countStatusData.countMaintenanceItemForEachStatus, MaintenanceStatusEnum.NEW),
        accepted: findTotal(countStatusData.countMaintenanceItemForEachStatus, MaintenanceStatusEnum.ACCEPTED),
        deny:
          findTotal(countStatusData.countMaintenanceItemForEachStatus, MaintenanceStatusEnum.DENY) +
          findTotal(countStatusData.countMaintenanceItemForEachStatus, MaintenanceStatusEnum.CANCEL),
      },
    [countStatusData],
  );

  if (!countStatus || loading) return <CenteredSpinning />;

  return (
    <div>
      <SubHeader
        items={[
          { title: 'Trang chủ', to: AppRoutes.home },
          { title: AppRoutes.maintenances.list.label, to: AppRoutes.maintenances.index },
        ]}
        rightContent={
          <Link to={AppRoutes.maintenances.create.value}>
            <Button type="primary">Tạo yêu cầu bảo dưỡng</Button>
          </Link>
        }
      />
      <Tabs
        defaultActiveKey={state && state.activeTab}
        items={[
          {
            label: `Chờ xác nhận (${countStatus.new})`,
            key: MaintenanceStatusEnum.NEW,
            children: <TabMaintenanceComp statuses={[MaintenanceStatusEnum.NEW]} refetchStatus={refetch} />,
          },
          {
            label: `Phê duyệt (${countStatus.accepted})`,
            key: MaintenanceStatusEnum.ACCEPTED,
            children: <TabMaintenanceComp statuses={[MaintenanceStatusEnum.ACCEPTED]} refetchStatus={refetch} />,
          },
          {
            label: `Từ chối (${countStatus.deny})`,
            key: MaintenanceStatusEnum.DENY,
            children: (
              <TabMaintenanceComp
                statuses={[MaintenanceStatusEnum.DENY, MaintenanceStatusEnum.CANCEL]}
                refetchStatus={refetch}
              />
            ),
          },
        ]}
      />
    </div>
  );
});
export default Maintenances;
