import { Fragment, memo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AppRoutes } from '../../helpers';
import { useAuth } from '../../contexts';

type Props = {
  isPrivate?: boolean;
  layout?: any;
  isAuthRoute?: boolean;
};

export const PrivateRoute = memo(({ isPrivate, layout: Layout = Fragment, isAuthRoute }: Props) => {
  const { isLoggedIn } = useAuth();

  if (isAuthRoute && isLoggedIn) {
    return <Navigate to={AppRoutes.dashboard} replace />;
  }

  if (isPrivate && !isLoggedIn) {
    return <Navigate to={AppRoutes.auth.login} replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
});
