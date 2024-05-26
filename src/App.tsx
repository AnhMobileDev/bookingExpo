import { ApolloProvider } from '@apollo/client';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import { ToastContainer } from 'react-toastify';
import locale from 'antd/locale/vi_VN';
import { QueryClient, QueryClientProvider } from 'react-query';

import './styles/index.less';
import 'react-toastify/dist/ReactToastify.min.css';

import { client as apolloClient } from './apollo';
import { AppRouter } from './app-router';
import { ProgressLoading } from './components';
import { useInit } from './init';
import { antdTheme } from './themes';
import { AuthProvider, DialogProvider } from './contexts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const App = () => {
  const initResult = useInit();

  if (!initResult) return <ProgressLoading />;

  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <AntdConfigProvider theme={antdTheme} locale={locale}>
          <DialogProvider>
            <AuthProvider>
              <AppRouter />
            </AuthProvider>
          </DialogProvider>
          <ToastContainer />
        </AntdConfigProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
};
