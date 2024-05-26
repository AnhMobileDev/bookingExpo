import React, { memo, useMemo } from 'react';
import { Spin } from 'antd';

import { useUserProductsQuery } from '../../../graphql/queries/userProducts.generated';
import { ProductEntity, ProductTypeEnum, StatusEnum } from '../../../graphql/type.interface';
import { categoriesLabel, categoriesValue } from '../ecommer-category';
import { AppRoutes } from '../../../helpers';

import { ProductsByCategory } from './products-by-category';

const LIMIT_ITEMS = 6;
export const ProductsHome = memo(() => {
  const { data: dataNew, loading: loadingNew } = useUserProductsQuery({
    variables: { limit: LIMIT_ITEMS, isNew: true, type: ProductTypeEnum.VEHICLE, isActive: StatusEnum.ACTIVE },
  });
  const productNews = useMemo(() => dataNew?.userProducts?.items ?? [], [dataNew]);

  const { data: dataUsed, loading: loadingUsed } = useUserProductsQuery({
    variables: { limit: LIMIT_ITEMS, isNew: false, type: ProductTypeEnum.VEHICLE, isActive: StatusEnum.ACTIVE },
  });
  const productUsed = useMemo(() => dataUsed?.userProducts?.items ?? [], [dataUsed]);

  const { data: accessories, loading: loadingAccessory } = useUserProductsQuery({
    variables: { limit: LIMIT_ITEMS, type: ProductTypeEnum.ACCESSARY, isActive: StatusEnum.ACTIVE },
  });
  const productAccessaries = useMemo(() => accessories?.userProducts?.items ?? [], [accessories]);

  const loading = useMemo(
    () => loadingNew || loadingUsed || loadingAccessory,
    [loadingNew, loadingUsed, loadingAccessory],
  );

  return (
    <Spin spinning={loading}>
      <ProductsByCategory
        title={categoriesLabel.new}
        products={productNews as ProductEntity[]}
        to={AppRoutes.shopping.category.detaiCategory(categoriesValue.new)}
      />
      <div className="mt-20px">
        <ProductsByCategory
          title={categoriesLabel.used}
          products={productUsed as ProductEntity[]}
          to={AppRoutes.shopping.category.detaiCategory(categoriesValue.used)}
        />
      </div>
      <div className="mt-20px">
        <ProductsByCategory
          title={categoriesLabel.accessary}
          products={productAccessaries as ProductEntity[]}
          to={AppRoutes.shopping.category.detaiCategory(categoriesValue.accessary)}
        />
      </div>
    </Spin>
  );
});
