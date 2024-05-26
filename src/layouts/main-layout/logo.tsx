import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { LogoIcon } from '../../assets/icon';
import { AppRoutes } from '../../helpers';

export interface LogoProps {
  collapsed: boolean;
}

export const Logo = memo(() => {
  return (
    <div className="text-center w-full">
      <Link to={AppRoutes.home}>
        <LogoIcon />
      </Link>
    </div>
  );
});
