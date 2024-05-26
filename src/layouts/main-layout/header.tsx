import { Badge, Button, Popover } from 'antd';
import { memo, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartHeaderIcon, ChevronDownIcon, LogoIcon, NotificationIcon } from '../../assets/icon';
import { Notification } from '../../components';
import { useAuth } from '../../contexts';
import { AppRoutes } from '../../helpers';
import { useMyCartQuery } from '../../graphql/queries/myCart.generated';
import {
  UserNotificationTypeUnSeenCountQueryResponse,
  useUserNotificationTypeUnSeenCountQuery,
} from '../../graphql/queries/userNotificationTypeUnSeenCount.generated';

export const Header = memo(() => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = useCallback(() => {
    logout();
    navigate(AppRoutes.auth.login);
  }, [logout, navigate]);

  const { data: countNoti, refetch: refetchNotification } = useUserNotificationTypeUnSeenCountQuery({});
  const totalNotification = useMemo(
    () => (countNoti?.userNotificationTypeUnSeenCount ?? []).reduce((total, it) => total + Number(it?.count), 0),
    [countNoti],
  );

  const [open, setOpen] = useState(false);
  const handleOpenChange = useCallback((newOpen: boolean) => {
    setOpen(newOpen);
  }, []);

  const hide = useCallback(() => {
    setOpen(false);
  }, []);

  const { data } = useMyCartQuery();

  return (
    <div className="h-full w-full leading-normal">
      <div className="px-24px py-10px flex justify-between items-center h-full">
        <LogoIcon />
        <div className="flex justify-between items-center">
          <Popover
            content={
              <div>
                <div className="hover:bg-[#f9f9f9]">
                  <Button onClick={handleLogout}>
                    <span className="text-grayscale-black">Đăng xuất</span>
                  </Button>
                </div>
              </div>
            }
            placement="bottom">
            <div className="flex items-center cursor-pointer group">
              <div className="w-24px h-24px border-1 rounded-full border-blue-8 shadow">
                {user?.avatar?.fullThumbUrl && (
                  <img className="w-full h-full rounded-full" src={user?.avatar?.fullThumbUrl} alt="user-avatar" />
                )}
              </div>
              <div className="flex flex-rows items-center">
                <p className="mx-12px text-inherit truncate p-0 m-0">{user?.fullname}</p>
                <ChevronDownIcon />
              </div>
            </div>
          </Popover>
          <Popover
            className="hover:cursor-pointer"
            content={
              <Notification
                hide={hide}
                onSeenNotification={refetchNotification}
                countNotification={countNoti as UserNotificationTypeUnSeenCountQueryResponse}
              />
            }
            placement="bottom"
            arrow={false}
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}>
            <div className="mx-32px">
              <Badge count={totalNotification} style={{ backgroundColor: '#D63120' }}>
                <NotificationIcon />
              </Badge>
            </div>
          </Popover>
          <div className="hover:cursor-pointer" onClick={() => navigate(AppRoutes.cart.value)}>
            <Badge count={data?.myCart?.items.length ?? 0} style={{ backgroundColor: '#03A1FA' }}>
              <CartHeaderIcon />
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
});
