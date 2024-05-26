import { memo } from 'react';
import { Pagination } from 'antd';

import { PartnerEntity } from '../../../../graphql/type.interface';

import { StoreItem } from './store-item';

type Props = {
  stores?: PartnerEntity[];
  onChangePage: (page: number) => void;
  page?: number;
  total?: number;
  pageSize?: number;
};

export const StoreList = memo(({ stores = [], onChangePage, page = 1, total, pageSize = 10 }: Props) => {
  return (
    <div>
      {stores && stores.length > 0 ? (
        stores.map((store) => <StoreItem store={store as PartnerEntity} key={'store' + store?.id} />)
      ) : (
        <div className="bg-white p-20px text-center">Không tìm thấy dữ liệu</div>
      )}
      <div className="flex justify-center">
        <Pagination current={page} total={total} pageSize={pageSize} onChange={onChangePage} />
      </div>
    </div>
  );
});
