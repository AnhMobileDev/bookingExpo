import { ThemeConfig } from 'antd';

import { Colors } from '../constants';

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: Colors.primary,
    colorError: Colors.error,
    controlHeight: 40,
    fontSize: 14,
    fontFamily: 'Inter',
    borderRadius: 4,
  },
};
