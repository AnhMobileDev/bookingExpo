import { Spin } from 'antd';
import { memo } from 'react';

export const CenteredSpinning = memo(() => {
  return (
    <div className="pt-20px flex justify-center">
      <Spin spinning />
    </div>
  );
});
