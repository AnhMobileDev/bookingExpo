import { Badge, Button, Col, Input, Row, Spin } from 'antd';
import { memo, useMemo, useState, useCallback, useEffect } from 'react';

import {
  NotificationIcon,
  NotificationNotActive,
  ReceiptIcon,
  ReceiptNotActiveIcon,
  RepairIcon,
  RepairNotActiveIcon,
  SearchNormal,
} from '../../assets/icon';
import { NotificationEntity, NotificationTypeEnum } from '../../graphql/type.interface';
import { useSeenNotificationMutation } from '../../graphql/mutations/seenNotification.generated';
import { useUserNotificationsQuery } from '../../graphql/queries/userNotifications.generated';
import { useDebouceValue } from '../../hooks';
import { UserNotificationTypeUnSeenCountQueryResponse } from '../../graphql/queries/userNotificationTypeUnSeenCount.generated';

import { NotificationOther } from './notification-other';
import { NotificationRepair } from './notification-repair';
import { NotificationOrder } from './notification-order';

export type PropsNotificationChildren = {
  items?: NotificationEntity[];
  handleLoadmore: (e: React.UIEvent<HTMLDivElement>) => void;
  onSeenNotification: (id: string) => void;
};

const DEFAULT_FILTER = {
  limit: 5,
  page: 1,
  search: '',
  type: NotificationTypeEnum.ORDER,
};

export const Notification = memo(
  ({
    hide,
    onSeenNotification,
    countNotification,
  }: {
    hide: () => void;
    onSeenNotification: () => void;
    countNotification: UserNotificationTypeUnSeenCountQueryResponse;
  }) => {
    const [active, setActive] = useState<NotificationTypeEnum>(NotificationTypeEnum.ORDER);
    const [textSearch, setTextSearch] = useState('');
    const [filter, setFilter] = useState<any>({
      ...DEFAULT_FILTER,
    });
    const [items, setItems] = useState<NotificationEntity[]>([]);

    const { data, loading } = useUserNotificationsQuery({
      variables: filter,
      fetchPolicy: 'cache-and-network',
      onCompleted(data) {
        setItems([...items, ...((data?.userNotifications?.items as NotificationEntity[]) ?? [])]);
      },
    });

    const countNotifications = useMemo(() => countNotification?.userNotificationTypeUnSeenCount, [countNotification]);

    const [seenNotifationMutation, { loading: updating }] = useSeenNotificationMutation({
      onCompleted() {
        onSeenNotification();
        hide();
        setItems([]);
        setFilter({ ...DEFAULT_FILTER });
        setActive(NotificationTypeEnum.ORDER);
      },
    });

    const tab = useMemo(
      () => [
        {
          iconNotActive: ReceiptNotActiveIcon,
          iconActive: ReceiptIcon,
          label: 'Đơn hàng',
          type: NotificationTypeEnum.ORDER,
        },
        {
          iconNotActive: RepairNotActiveIcon,
          iconActive: RepairIcon,
          label: 'Yêu cầu sửa chữa',
          type: NotificationTypeEnum.BOOKING,
        },
        {
          iconNotActive: NotificationNotActive,
          iconActive: NotificationIcon,
          label: 'Khác',
          type: NotificationTypeEnum.OTHER,
        },
      ],
      [],
    );

    const hanldeChangeTab = useCallback(
      (type: NotificationTypeEnum) => {
        setActive(type);
        setItems([]);
        const { isSeen: _, ...withoutFilter } = filter;
        let newFilter = {
          ...withoutFilter,
          page: 1,
          type,
        };
        switch (type) {
          case NotificationTypeEnum.ORDER:
            newFilter = {
              ...newFilter,
            };
            break;
          case NotificationTypeEnum.BOOKING:
            newFilter = {
              ...newFilter,
            };
            break;
          case NotificationTypeEnum.OTHER:
            newFilter = {
              ...newFilter,
            };
            break;
          default:
            break;
        }
        setFilter({
          ...newFilter,
        });
      },
      [filter],
    );

    const search = useDebouceValue({
      defaultValue: textSearch,
      debouceTime: 400,
    });
    useEffect(() => {
      if (search !== filter?.search) {
        setFilter({
          ...filter,
          search: search,
          page: 1,
        });
      }
    }, [filter, search]);

    const handleLoadmore = useCallback(
      (e: React.UIEvent<HTMLDivElement>) => {
        const target = e?.target as HTMLInputElement;
        const bottom = +(target?.scrollHeight - target?.scrollTop).toFixed() <= +target?.clientHeight + 1;

        if (bottom && data && data?.userNotifications?.meta?.totalPages > filter?.page && !loading && !updating) {
          const newFilter = {
            ...filter,
            page: filter?.page + 1,
          };
          setFilter(newFilter);
        }
      },
      [data, filter, loading, updating],
    );

    const handleSeenNotification = useCallback(
      (id: string) => {
        seenNotifationMutation({ variables: { id } });
      },
      [seenNotifationMutation],
    );

    const handleLoadNotifiNotSeen = () => {
      setItems([]);
      if (filter.isSeen === false) {
        const { isSeen: _, ...withoutFilter } = filter;
        setFilter({
          ...withoutFilter,
          page: 1,
        });

        return;
      }
      setFilter({
        ...filter,
        page: 1,
        isSeen: false,
      });
    };

    const renderContentByTypeNotification = useCallback(() => {
      switch (active) {
        case NotificationTypeEnum.ORDER:
          return (
            <NotificationOrder
              items={items as NotificationEntity[]}
              handleLoadmore={handleLoadmore}
              onSeenNotification={handleSeenNotification}
            />
          );
        case NotificationTypeEnum.BOOKING:
          return (
            <NotificationRepair
              items={items as NotificationEntity[]}
              handleLoadmore={handleLoadmore}
              onSeenNotification={handleSeenNotification}
            />
          );
        default:
          return (
            <NotificationOther
              items={items as NotificationEntity[]}
              handleLoadmore={handleLoadmore}
              onSeenNotification={handleSeenNotification}
            />
          );
      }
    }, [active, handleLoadmore, handleSeenNotification, items]);

    return (
      <Spin spinning={loading || updating}>
        <div className="w-[376px] p-6px pb-[24px]">
          <h2 className="text-grayscale-black font-semibold mb-10px text-16px leading-24px">Thông báo</h2>
          <Row>
            {tab.map(({ iconActive: IconActive, iconNotActive: IconNotActive, label, type }) => (
              <Col
                span={24 / tab.length}
                key={type}
                className="flex flex-col justify-center items-center hover:cursor-pointer"
                onClick={() => hanldeChangeTab(type as NotificationTypeEnum)}>
                <Badge
                  className=""
                  count={(countNotifications ?? []).find((noti) => noti.type === type)?.count ?? 0}
                  showZero
                  offset={[14, -2]}>
                  <div className="text-center h-[24px] w-[24px]">
                    {active === type ? <IconActive /> : <IconNotActive />}
                  </div>
                </Badge>
                <span
                  className={`${
                    active === type ? 'text-grayscale-black' : 'text-grayscale-light'
                  } block font-normal text-[11px]`}>
                  {label}
                </span>
              </Col>
            ))}
          </Row>
          <div className="my-5 relative">
            <Input
              className="!pl-[34px] bg-ghost-white text-grayscale-light rounded-full border-none outline-none"
              placeholder={`Tìm trong thông báo ${tab?.find((i) => i?.type === active)?.label}`}
              onChange={(e) => setTextSearch(e?.target?.value)}
            />
            <SearchNormal className="absolute left-6 top-1/2 bottom-1/2 translate-x-[-50%] translate-y-[-50%]" />
          </div>
          <Button
            shape="round"
            onClick={handleLoadNotifiNotSeen}
            size="small"
            className="mb-20px"
            type={filter?.isSeen === false ? 'primary' : 'default'}>
            Chưa đọc
          </Button>
          {renderContentByTypeNotification()}
        </div>
      </Spin>
    );
  },
);
