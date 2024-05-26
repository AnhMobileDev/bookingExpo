import React, { memo, useMemo } from 'react';
import { Button, Spin, Timeline } from 'antd';
import dayjs from 'dayjs';

import { ModalCustomize } from '../../../components/modal-customize';
import { useBookingStatusHistoryQuery } from '../../../graphql/queries/bookingStatusHistory.generated';
import { DotTimeLineIcon, DotTimeLineProgessIcon } from '../../../assets/icon';
import { FORMAT_TIME } from '../../../constants';
import { convertBookingStatus } from '../../../utils';

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  bookingId: string;
};

export const StatusHistoriesRequestRepair = memo(({ bookingId, setOpen, ...props }: Props) => {
  const { data, loading } = useBookingStatusHistoryQuery({
    variables: { bookingId },
  });
  const histories = useMemo(
    () =>
      (data?.bookingStatusHistory ?? []).map((it, idx) => ({
        color: 'gray',
        dot: !idx ? <DotTimeLineProgessIcon /> : <DotTimeLineIcon />,
        children: (
          <div className={`p-16px rounded border border-solid ${!idx ? 'border-blue' : 'border-grayscale-border'}`}>
            <p className={`text-13px font-medium leading-18px ${!idx ? 'text-blue' : ''}`}>
              {convertBookingStatus(it?.status)}
            </p>
            <p>
              <span className="text-grayscale-gray text-13px leading-18px">Thời gian: </span>
              <span className="text-13px leading-18px">{dayjs(it?.createdAt).format(FORMAT_TIME)}</span>
            </p>
          </div>
        ),
      })),
    [data],
  );

  return (
    <ModalCustomize title="Trạng thái yêu cầu sửa chữa" footer={null} onCancel={() => setOpen(false)} {...props}>
      <Spin spinning={loading}>
        <div className="relative my-[40px] ">
          <div className="h-[400px] overflow-y-auto">
            <Timeline items={histories} className="mt-20px" />
          </div>
          <div className="absolute bottom-0 w-full">
            <Button type="default" onClick={() => setOpen(false)} className="w-full">
              Đóng
            </Button>
          </div>
        </div>
      </Spin>
    </ModalCustomize>
  );
});
