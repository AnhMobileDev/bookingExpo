import _ from 'lodash';
import { notification } from 'antd';

import {
  BookingStatusEntity,
  BookingStatusEnum,
  CategoryEntity,
  OrderStatusCategoryEntity,
} from '../graphql/type.interface';

export function numberWithDots(num?: number | string) {
  if (!num) return 0;
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export const serialColumnTable = (page: number, index: number) => {
  return page === 1 ? index + 1 : (page - 1) * 10 + (index + 1);
};

export const arrayRange = (start: number, stop: number, step = 1) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, index) => start + index * step);

export const getPersonCancelRequestRepair = (
  statusDetail?: BookingStatusEntity,
  partnerId?: string,
  technicianId?: string,
) => {
  // cancel by agency
  if (statusDetail?.partnerId && statusDetail?.partnerId === partnerId) return 'Đại lý';

  // cancel by technician
  if (statusDetail?.partnerId && statusDetail?.partnerId === technicianId) return 'Kỹ thuật viên';

  if (statusDetail?.userId) return 'Khách hàng';
  return '';
};

export const getNameCategoriesEntity = (categories?: CategoryEntity[] | OrderStatusCategoryEntity[]) => {
  if (!categories || (categories && categories?.length === 0)) return '';
  return categories
    ?.map((qualification, idx: number) => {
      if (idx + 1 === categories.length) return qualification.name;
      return (qualification?.name as string) + ', ';
    })
    .join(' ');
};

export const SortTimeByField = (array: any = [], field: string) => {
  const newArray = _.sortBy(array, function (dateObj) {
    return new Date(dateObj[field]).getTime();
  });
  return newArray.reverse();
};

type NotificationType = 'success' | 'info' | 'warning' | 'error';
export const showNotification = (type: NotificationType = 'info', message = '', description = '') => {
  notification[type]({
    message,
    description,
  });
};

export const convertBookingStatus = (status: BookingStatusEnum, isAgency = false) => {
  switch (status) {
    case BookingStatusEnum.ASSIGNED_TECHNICIAN:
      return 'Chờ KTV nhận yêu cầu ';
    case BookingStatusEnum.CANCEL:
      return 'YCSC đã bị hủy';
    case BookingStatusEnum.QUOTATION_REJECTED:
      return 'Đã từ chối báo giá';
    case BookingStatusEnum.QUOTATION_ACCEPTED:
      return 'Đã chấp nhận báo giá';
    case BookingStatusEnum.COMPLETE:
      return 'YCSC đã hoàn thành';
    case BookingStatusEnum.QUOTATION_REQUESTED:
      return 'KTV đã gửi báo giá';
    case BookingStatusEnum.RESCHEDULED:
      return 'KTV đã hẹn lại ngày đến';
    case BookingStatusEnum.SETTLEMENT_ACCEPTED:
      return 'Đã chấp nhận quyết toán';
    case BookingStatusEnum.SETTLEMENT_REJECTED:
      return 'Đã từ chối quyết toán';
    case BookingStatusEnum.SETTLEMENT_REQUESTED:
      return 'KTV đã gửi quyết toán';
    case BookingStatusEnum.TECHNICIAN_ARRIVED:
      return 'KTV đã đến vị trí gặp sự cố';
    case BookingStatusEnum.TECHNICIAN_ARRIVING:
      return 'KTV đang di chuyển vị trí gặp sự cố';
    case BookingStatusEnum.WAIT_FOR_CONFIRM:
      return 'Chờ xác nhận YCSC';
    default:
      return '';
  }
};
