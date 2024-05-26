import React, { useState, useMemo, memo, useRef, useCallback } from 'react';
import { Button, Tabs } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ServiceFeedbacksStatusEnum } from '../../graphql/type.interface';
import { CenteredSpinning, SubHeader } from '../../components';
import { AppRoutes } from '../../helpers';
import { useGetCountStatusServiceFeedbackQuery } from '../../graphql/queries/getCountStatusServiceFeedback.generated';

import { TabFeedbackComp } from './tab-feedback-component';
import { ModalCreateFeedback } from './modal-create-feedback';

import './styles.less';

export const TABS = {
  ALL: 'ALL',
  ...ServiceFeedbacksStatusEnum,
};

const Feedback: React.FC = memo(() => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const tabCompRef = useRef(null);
  const [searchParams] = useSearchParams();

  const tab = useMemo(() => searchParams.get('status') ?? TABS.ALL, [searchParams]);

  const { data: countStatusData, loading, refetch } = useGetCountStatusServiceFeedbackQuery({ variables: {} });

  const handleRefetch = () => {
    if (tabCompRef.current) {
      refetch();
      (tabCompRef.current as any).refetch();
    }
  };

  const countStatus = useMemo(
    () =>
      countStatusData && {
        all: countStatusData.getCountStatusServiceFeedback.reduce(
          (accumulator, currentValue) => accumulator + Number(currentValue.quantity),
          0,
        ),
        waiting:
          countStatusData.getCountStatusServiceFeedback.find((el) => el.status === ServiceFeedbacksStatusEnum.WAITING)
            ?.quantity ?? 0,
        inProgress:
          countStatusData.getCountStatusServiceFeedback.find(
            (el) => el.status === ServiceFeedbacksStatusEnum.IN_PROGRESS,
          )?.quantity ?? 0,
        done:
          countStatusData.getCountStatusServiceFeedback.find((el) => el.status === ServiceFeedbacksStatusEnum.DONE)
            ?.quantity ?? 0,
      },
    [countStatusData],
  );

  const handleChangeTab = useCallback(
    (key: string) => {
      navigate({ search: `status=${key}` });
    },
    [navigate],
  );

  if (!countStatus || loading) return <CenteredSpinning />;

  return (
    <div>
      <SubHeader
        items={[
          { title: 'Trang chủ', to: AppRoutes.home },
          { title: 'Phản hồi về chất lượng sản phẩm và dịch vụ', to: AppRoutes.feedback.index },
        ]}
        // TODO: Custom button with plus icon
        rightContent={
          <Button type="primary" onClick={() => setOpenModal(true)}>
            Tạo mới
          </Button>
        }
        title="Danh sách Phản hồi về chất lượng sản phẩm và dịch vụ"
      />
      <Tabs
        items={[
          {
            label: `Tất cả (${countStatus.all})`,
            key: TABS.ALL,
            children: <TabFeedbackComp ref={tabCompRef} />,
          },
          {
            label: `Chờ xử lý (${countStatus.waiting})`,
            key: TABS.WAITING,
            children: <TabFeedbackComp ref={tabCompRef} status={ServiceFeedbacksStatusEnum.WAITING} />,
          },
          {
            label: `Đang xử lý (${countStatus.inProgress})`,
            key: TABS.IN_PROGRESS,
            children: <TabFeedbackComp ref={tabCompRef} status={ServiceFeedbacksStatusEnum.IN_PROGRESS} />,
          },
          {
            label: `Đã xử lý (${countStatus.done})`,
            key: TABS.DONE,
            children: <TabFeedbackComp ref={tabCompRef} status={ServiceFeedbacksStatusEnum.DONE} />,
          },
        ]}
        onChange={handleChangeTab}
        activeKey={tab as string}
      />
      <ModalCreateFeedback open={openModal} onClose={() => setOpenModal(false)} handleRefetch={handleRefetch} />
    </div>
  );
});
export default Feedback;
