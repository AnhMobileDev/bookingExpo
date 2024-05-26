import dayjs from 'dayjs';

import {
  MaintenanceEntity,
  MaintenanceLevelEnum,
  ServiceFeedbackTypeEnum,
  ServiceFeedbacksStatusEnum,
} from '../graphql/type.interface';

export const Messages = {
  required: (field: string) => `${field} là trường bắt buộc.`,
  create: {
    success: (field: string) => `Thêm mới ${field} thành công!`,
    fail: (field: string) => `Thêm mới ${field} thất bại!`,
  },
  upload: {
    fail: (field: string) => `Tải ${field} lên thất bại!`,
  },
};

export const feedbackStatusText = (value: ServiceFeedbacksStatusEnum): string => {
  switch (value) {
    case ServiceFeedbacksStatusEnum.WAITING:
      return 'Chờ xử lý';
    case ServiceFeedbacksStatusEnum.IN_PROGRESS:
      return 'Đang xử lý';
    case ServiceFeedbacksStatusEnum.DONE:
      return 'Đã xử lý';
    default: {
      const exhaustiveCheck: never = value;
      throw new Error(`FeedbacksStatusEnum. not supported value: ${exhaustiveCheck}`);
    }
  }
};

export const feedbackTypeText = (value: ServiceFeedbackTypeEnum): string => {
  switch (value) {
    case ServiceFeedbackTypeEnum.COMPLAIN:
      return 'Phàn nàn';
    case ServiceFeedbackTypeEnum.QUESTION:
      return 'Thắc mắc';
    case ServiceFeedbackTypeEnum.SUPPORT:
      return 'Yêu cầu hỗ trợ';
    default: {
      const exhaustiveCheck: never = value;
      throw new Error(`FeedbackTypeEnum. not supported value: ${exhaustiveCheck}`);
    }
  }
};

export const maintenanceText = (type: MaintenanceLevelEnum, value: MaintenanceEntity['routineLevel']): string =>
  type === MaintenanceLevelEnum.INCURRED ? 'Phát sinh' : `Định kỳ lần ${value ?? 0}`;

export function getTimeAgo(dateString?: string): string {
  if (!dateString) {
    return '';
  }
  const currentDate = dayjs();
  const targetDate = dayjs(dateString);

  const diffInMilliseconds = currentDate.diff(targetDate);
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} giây`;
  } else if (diffInSeconds < 3600) {
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    return `${diffInMinutes} phút`;
  } else if (diffInSeconds < 86400) {
    const diffInHours = Math.floor(diffInSeconds / 3600);
    return `${diffInHours} giờ`;
  } else if (diffInSeconds < 604800) {
    const diffInDays = Math.floor(diffInSeconds / 86400);
    return `${diffInDays} ngày`;
  } else if (diffInSeconds < 2592000) {
    const diffInWeeks = Math.floor(diffInSeconds / 604800);
    return `${diffInWeeks} tuần`;
  } else if (diffInSeconds < 31536000) {
    const diffInMonths = Math.floor(diffInSeconds / 2592000);
    return `${diffInMonths} tháng`;
  } else {
    const diffInYears = Math.floor(diffInSeconds / 31536000);
    const diffInMonths = Math.floor((diffInSeconds % 31536000) / 2592000);
    return `${diffInYears} năm ${diffInMonths} tháng`;
  }
}
