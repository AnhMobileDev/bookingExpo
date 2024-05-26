import { useLayoutEffect } from 'react';
import nprogress from 'nprogress';

import 'nprogress/nprogress.css';

export const ProgressLoading = () => {
  useLayoutEffect(() => {
    nprogress.start();

    return () => {
      nprogress.done();
    };
  }, []);
  return null;
};
