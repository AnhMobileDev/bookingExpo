import { ReactNode, useCallback } from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ExpandableConfig } from 'antd/es/table/interface';

import { DefaultPagination } from '../../constants';

type Props<T> = {
  columns: ColumnsType<T>;
  data: T[];
  filter?: any;
  total?: number;
  loading?: boolean;
  setFilter?: (filter: any) => void;
  bordered?: boolean;
  title?: string | ReactNode;
  expandable?: ExpandableConfig<any>;
  emptyImage?: ReactNode;
  emptyText?: string;
  rowSelection?: any;
};

export function MasterTable<T = any>({
  title = '',
  columns,
  data,
  setFilter,
  filter,
  rowSelection,
  total,
  emptyImage,
  emptyText = 'Không có dữ liệu',
  ...props
}: Props<T>) {
  const onChangePage = useCallback(
    (newPage: number) => {
      setFilter?.({ ...filter, page: newPage });
    },
    [filter, setFilter],
  );

  const renderTitle = () => {
    if (title && typeof title !== 'string') {
      return title;
    }
    return <h2 className="text-16px font-semibold leading-24px mb-20px">{title}</h2>;
  };

  if (emptyImage && (!data || (data && data?.length === 0))) {
    return (
      <div>
        {renderTitle()}
        <div className="w-full text-center">
          {emptyImage}
          <p className="text-14px text-grayscale-gray leading-20px font-normal">{emptyText}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {renderTitle()}
      <Table
        size="small"
        columns={columns}
        dataSource={data}
        tableLayout="fixed"
        rowSelection={rowSelection}
        pagination={{
          ...DefaultPagination,
          onChange: onChangePage,
          current: Number(filter?.page) || undefined,
          total: total || data?.length,
        }}
        bordered={true}
        scroll={{ y: 'calc(100vh - 320px)' }}
        rowKey={'id'}
        {...props}
      />
    </div>
  );
}
