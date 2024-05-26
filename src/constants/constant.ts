import type { TablePaginationConfig } from 'antd';

export const APP_NAME = 'Call Me';

export const FORMAT_DATE = 'DD/MM/YYYY';
export const FORMAT_TIME = 'DD/MM/YYYY HH:mm';
export const PASSWORD_MIN_LENGTH = 6;

export const STORAGE_KEYS = {
  historySearchProduct: 'historySearchProduct',
  historySearchAddresses: 'historySearchAddresses',
};

export const DefaultPagination: TablePaginationConfig = {
  position: ['bottomRight'],
  size: 'small',
  locale: { items_per_page: ' / trang' },
  defaultPageSize: 10,
  showQuickJumper: true,
  showTotal: (total, range) => {
    return `${range[0]}-${range[1]} của ${total}`;
  },
};
