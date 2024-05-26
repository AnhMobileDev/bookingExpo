import type { TablePaginationConfig } from 'antd';

export const DefaultPagination: TablePaginationConfig = {
  size: 'small',
  defaultPageSize: 10,
  showQuickJumper: false,
  showSizeChanger: false,
  showTotal: (total, range) => {
    return `${range[0]}-${range[1]} của ${total}`;
  },
};
