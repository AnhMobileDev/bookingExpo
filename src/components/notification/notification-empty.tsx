import { memo } from 'react';

import { NotificationEmptyIcon } from '../../assets/icon';

export const NotificationEmpty = memo(() => {
  return (
    <div>
      <div className="text-center">
        <NotificationEmptyIcon className="block mx-auto" />
        <span className="text-grayscale-gray font-normal text-xs  block pb-20">Chưa có thông báo nào</span>
      </div>
    </div>
  );
});
