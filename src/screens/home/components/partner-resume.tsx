import { memo } from 'react';
import { Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../../contexts';
import { AppRoutes } from '../../../helpers';
import { SettingIcon } from '../../../assets/icon';

export const PartnerResume = memo(() => {
  const navigation = useNavigate();
  const { user } = useAuth();

  return (
    <div className="p-[20px] bg-home text-white rounded h-[149px]">
      <div className="flex items-center justify-between mt-30px">
        <div className="flex gap-5">
          <Avatar className="w-16 h-16" size={'default'} src={<img src={user?.avatar?.fullThumbUrl as string} />} />

          <div className="self-center">
            <p className="text-xs line-clamp-1">Xin chào!</p>
            <p className="font-semibold text-sm pt-[4px] line-clamp-1">{user?.fullname}</p>
          </div>
        </div>
        <button
          className="rounded-2xl border border-white border-solid w-[48px] h-[28px] bg-transparent hover:cursor-pointer"
          onClick={() => navigation(AppRoutes.profile)}>
          <SettingIcon className="block m-auto" />
        </button>
      </div>
    </div>
  );
});
