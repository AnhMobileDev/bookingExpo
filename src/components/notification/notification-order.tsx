import { memo } from 'react';
import { Col, Row } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { OrderNotiIcon } from '../../assets/icon';
import { AppRoutes } from '../../helpers';

import { PropsNotificationChildren } from './notification';
import { NotificationEmpty } from './notification-empty';

export const NotificationOrder = memo(({ items, handleLoadmore, onSeenNotification }: PropsNotificationChildren) => {
  const navigator = useNavigate();

  return items && items.length > 0 ? (
    <div className="overflow-y-auto overflow-x-hidden max-h-[380px]" onScroll={handleLoadmore}>
      {items.map((item, idx) => {
        return (
          <Row
            key={idx}
            gutter={12}
            className="hover:cursor-pointer"
            onClick={() => {
              if (!item?.seen) {
                onSeenNotification(item?.id);
              }
              navigator(AppRoutes?.orders?.detail.id(item?.objectId as string));
            }}>
            <Col span="2" className="relative pt-2">
              <OrderNotiIcon stroke="#202C38" width={20} height={20} />
            </Col>
            <Col span="22">
              <Row gutter={12} justify="space-between">
                <Col span={20}>
                  <span className="block font-medium text-grayscale-black text-sm leading-5">{item?.title}</span>
                  <span className="block font-normal text-grayscale-gray text-xs pt-2 leading-5">{item?.body}</span>
                </Col>
                <Col span={4}>
                  <span className="text-grayscale-light text-[10px] font-normal">
                    {dayjs(item?.createdAt).fromNow()}
                  </span>
                </Col>
              </Row>
              {idx !== items.length - 1 ? (
                <div className="bg-bright-gray my-5 h-[1px] border-b" />
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
