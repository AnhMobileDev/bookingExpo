import { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useUserProductsQuery } from '../../../../../graphql/queries/userProducts.generated';
import { ProductEntity, SortDirectionEnum, StatusEnum } from '../../../../../graphql/type.interface';
import { ProductsByCategory } from '../../products-by-category';
import { AppRoutes } from '../../../../../helpers';
import { categoriesValue } from '../../../ecommer-category';

const LIMIT_ITEMS = 6;

export const StoreHome = memo(() => {
  const { id = '' } = useParams();

  const stateNavigate = useMemo(
    () => ({
      state: {
        partnerId: id,
      },
    }),
    [id],
  );

  const { data: productReview } = useUserProductsQuery({
    variables: {
      partnerId: id,
      isActive: StatusEnum.ACTIVE,
      limit: LIMIT_ITEMS,
      sort: {
        field: 'star',
        direction: SortDirectionEnum.DESC,
      },
    },
  });

  const { data: productNew } = useUserProductsQuery({
    variables: {
      partnerId: id,
      isActive: StatusEnum.ACTIVE,
      isNew: true,
      limit: LIMIT_ITEMS,
    },
  });
  const { data: productSold } = useUserProductsQuery({
    variables: {
      partnerId: id,
      isActive: StatusEnum.ACTIVE,
      limit: LIMIT_ITEMS,
      sort: {
        field: 'numberSold',
        direction: SortDirectionEnum.DESC,
      },
    },
  });

  return (
    <div>
      <div className="mb-20px">
        <ProductsByCategory
          title="Xếp hạng hàng đầu"
          products={productReview?.userProducts?.items as ProductEntity[]}
          to={AppRoutes.shopping.category.detaiCategory(categoriesValue.storeReview)}
          stateNavigate={stateNavigate}
        />
      </div>
      <div className="mb-20px">
        <ProductsByCategory
          title="Mới về"
          products={productNew?.userProducts?.items as ProductEntity[]}
          to={AppRoutes.shopping.category.detaiCategory(categoriesValue.storeNew)}
          stateNavigate={stateNavigate}
        />
      </div>
      <div className="mb-20px">
        <ProductsByCategory
          title="Bán chạy"
          products={productSold?.userProducts?.items as ProductEntity[]}
          to={AppRoutes.shopping.category.detaiCategory(categoriesValue.storeSelling)}
          stateNavigate={stateNavigate}
        />
      </div>
    </div>
  );
});
