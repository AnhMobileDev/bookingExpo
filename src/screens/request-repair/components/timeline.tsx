import { memo } from 'react';
import dayjs from 'dayjs';

import { BookingEntity, BookingStatusEnum, CategoryEntity } from '../../../graphql/type.interface';
import { FORMAT_TIME } from '../../../constants';
import { getNameCategoriesEntity } from '../../../utils';

type Props = {
  booking?: BookingEntity;
};

export const Timeline = memo(({ booking }: Props) => {
  return (
    <div className="bg-white p-20px">
      <div className="mb-8px flex justify-between">
        <h2 className="font-normal text-14px leading-20px text-[#676E72] ">Mã yêu cầu</h2>
        <div>{booking?.code}</div>
      </div>
      <div className="mb-8px flex justify-between">
        <h2 className="font-normal text-14px leading-20px text-[#676E72] ">Thời gian đặt</h2>
        <div>{dayjs(booking?.createdAt).format(FORMAT_TIME)}</div>
      </div>
      {booking?.status === BookingStatusEnum.COMPLETE && (
        <div className="mb-8px flex justify-between">
          <h2 className="font-normal text-14px leading-20px text-[#676E72] ">Thời gian hoàn thành</h2>
          <div>{dayjs(booking?.statusDetail?.createdAt).format(FORMAT_TIME)}</div>
        </div>
      )}
      {booking?.status === BookingStatusEnum.CANCEL && (
        <>
          <div className="mb-8px flex justify-between">
            <h2 className="font-normal text-14px leading-20px text-[#676E72] ">Thời gian hủy</h2>
            <div>{dayjs(booking?.statusDetail?.createdAt).format(FORMAT_TIME)}</div>
          </div>
          <div className="mb-8px flex justify-between">
            <h2 className="font-normal text-14px leading-20px text-[#676E72] ">Lý do hủy</h2>
            <div>{getNameCategoriesEntity(booking?.statusDetail?.reasons as CategoryEntity[])}</div>
          </div>
          <div className="mb-8px flex justify-between">
            <h2 className="font-normal text-14px leading-20px text-[#676E72] ">Lý do khác</h2>
            <div>{booking?.statusDetail?.note}</div>
          </div>
        </>
      )}
    </div>
  );
});
