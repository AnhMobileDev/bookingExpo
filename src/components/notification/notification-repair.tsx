import { memo } from 'react';
import { Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
require('dayjs/locale/vi');

import { RepairIcon } from '../../assets/icon';
import { BookingStatusEnum } from '../../graphql/type.interface';
import { AppRoutes } from '../../helpers';
import { convertBookingStatus } from '../../utils';

import { NotificationEmpty } from './notification-empty';
import { PropsNotificationChildren } from './notification';

dayjs.locale('vi');
dayjs.extend(relativeTime);

export const NotificationRepair = memo(({ items, handleLoadmore, onSeenNotification }: PropsNotificationChildren) => {
  const navigation = useNavigate();
  return items && items.length > 0 ? (
    <div className="overflow-y-auto overflow-x-hidden max-h-[380px]" onScroll={handleLoadmore}>
      {(items ?? []).map((item, idx) => {
        return (
          <Row
            key={idx}
            gutter={18}
            className="hover:cursor-pointer"
            onClick={() => {
              if (!item?.seen) {
                onSeenNotification(item?.id);
              }
              navigation(AppRoutes.requestRepair.detail.id(item?.booking?.id as string));
            }}>
            <Col span="2" className="relative pt-2">
              <RepairIcon stroke="#202C38" width={20} height={20} />
            </Col>
            <Col span="22">
              <Row gutter={18} justify="space-between">
                <Col span={20}>
                  <span
                    className={`block font-medium leading-20px text-xs ${
                      item?.seen ? 'text-grayscale-light' : 'text-grayscale-black'
                    }`}>
                    {item?.body}
                  </span>
                  <span
                    className={`block font-normal  text-12px pt-2 leading-16px ${
                      item?.seen ? 'text-grayscale-light' : 'text-grayscale-gray'
                    }`}>
                    {item?.booking?.code} {item?.booking?.vehicle?.name}{' '}
                    {convertBookingStatus(item?.booking?.status as BookingStatusEnum)}
                  </span>
                </Col>
                <Col span={4}>
                  <span className="text-grayscale-light text-[10px] font-normal">
                    {dayjs(item?.createdAt).fromNow()}
                  </span>
                </Col>
              </Row>
              {idx !== items.length - 1 ? (
                <div className="bg-[#EEEEEE] my-5 h-[1px] border-b" />
              ) : (
                <div className="bg-white my-10" />
              )}
            </Col>
          </Row>
        );
      })}
    </div>
  ) : (
    <NotificationEmpty />
  );
});
