import { Spin } from 'antd';
import { memo } from 'react';

export const FullscreenLoading = memo(() => {
  return (
    <div className="flex-center mt-346px">
      <Spin />
    </div>
  );
});
