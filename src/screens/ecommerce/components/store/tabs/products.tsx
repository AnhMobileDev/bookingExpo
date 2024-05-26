import React, { memo, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';

import { ProductEntity, StatusEnum } from '../../../../../graphql/type.interface';
import { useUserProductsQuery } from '../../../../../graphql/queries/userProducts.generated';
import { ProductsByCategory } from '../../products-by-category';

export const ProductsByStore = memo(() => {
  const { id = '' } = useParams();
  const [filter, setFilter] = useState({
    partnerId: id,
    isActive: StatusEnum.ACTIVE,
    limit: 18,
    page: 1,
  });

  const { data, loading } = useUserProductsQuery({
    variables: filter,
  });
  const handleChangePage = useCallback(
    (newPage: number) => {
      setFilter({
        ...filter,
        page: newPage,
      });
    },
    [filter],
  );

  return (
    <Spin spinning={loading}>
      <div>
        <ProductsByCategory
          products={data?.userProducts?.items as ProductEntity[]}
          page={filter?.page}
          total={data?.userProducts?.meta?.totalItems}
          pageSize={filter?.limit}
          onChangePage={handleChangePage}
        />
      </div>
    </Spin>
  );
});
