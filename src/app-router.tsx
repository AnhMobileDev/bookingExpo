import { RouterProvider } from 'react-router-dom';
import { memo } from 'react';

import { FullscreenLoading } from './components';
import { useRouter } from './helpers';
import { useMeUserQuery } from './graphql/queries/meUser.generated';

export const AppRouter = memo(() => {
  const { loading } = useMeUserQuery({
    errorPolicy: 'ignore',
  });

  const router = useRouter();

  if (loading) {
    return <FullscreenLoading />;
  }

  return <RouterProvider router={router} />;
});
