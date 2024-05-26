import { memo, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Spin } from 'antd';

import { SubHeader } from '../../components';
import { AppRoutes } from '../../helpers';
import { UserProductsQueryVariables, useUserProductsQuery } from '../../graphql/queries/userProducts.generated';
import { ProductEntity, ProductTypeEnum, SortDirectionEnum, StatusEnum } from '../../graphql/type.interface';

import { ProductsByCategory } from './components';

export const categoriesValue = {
  new: 'may-moi',
  used: 'da-qua-su-dung',
  accessary: 'phu-tung',
  storeReview: 'xep-hang-hang-dau',
  storeNew: 'moi-ve',
  storeSelling: 'ban-chay',
};

export const categoriesLabel = {
  new: 'Máy mới',
  used: 'Đã qua sử dụng',
  accessary: 'Phụ tùng',
  storeReview: 'Xếp hạng hàng đầu',
  storeNew: 'Mới về',
  storeSelling: 'Bán chạy',
};

export const categories = [
  {
    label: categoriesLabel.new,
    value: categoriesValue.new,
  },
  {
    label: categoriesLabel.used,
    value: categoriesValue.used,
  },
  {
    label: categoriesLabel.accessary,
    value: categoriesValue.accessary,
  },
  {
    label: categoriesLabel.storeNew,
    value: categoriesValue.storeNew,
  },
  {
    label: categoriesLabel.storeReview,
    value: categoriesValue.storeReview,
  },
  {
    label: categoriesLabel.storeSelling,
    value: categoriesValue.storeSelling,
  },
];

const EcommerceCategory = memo(() => {
  const location = useLocation();
  const { state } = location;
  const [categoryName, setCategoryName] = useState<string>('');

  const [filter, setFilter] = useState<UserProductsQueryVariables>({
    limit: 18,
    page: 1,
    type: ProductTypeEnum.VEHICLE,
    isActive: StatusEnum.ACTIVE,
    isNew: false,
    partnerId: state?.partnerId,
  });

  const { data, loading } = useUserProductsQuery({
    variables: filter,
  });
  const products = useMemo(() => data?.userProducts?.items ?? [], [data]);

  useEffect(() => {
    const category = location?.pathname.slice(19);
    const existCategory = categories.find((it) => it?.value === category);
    if (existCategory && categoryName !== existCategory?.value) {
      const cateValue = existCategory?.value;
      setCategoryName(cateValue);
      switch (cateValue) {
        case categoriesValue.new:
          setFilter({
            ...filter,
            partnerId: null,
            page: 1,
            isNew: true,
            sort: null,
            type: ProductTypeEnum.VEHICLE,
          });
          break;
        case categoriesValue.used:
          setFilter({
            ...filter,
            partnerId: null,
            page: 1,
            isNew: false,
            sort: null,
            type: ProductTypeEnum.VEHICLE,
          });
          break;
        case categoriesValue.accessary:
          setFilter({
            ...filter,
            partnerId: null,
            page: 1,
            isNew: null,
            sort: null,
            type: ProductTypeEnum.ACCESSARY,
          });
          break;
        case categoriesValue.storeReview:
          setFilter({
            ...filter,
            page: 1,
            isNew: null,
            type: null,
            sort: {
              field: 'star',
              direction: SortDirectionEnum.DESC,
            },
          });
          break;
        case categoriesValue.storeNew:
          setFilter({
            ...filter,
            page: 1,
            isNew: true,
            type: null,
            sort: null,
          });
          break;
        case categoriesValue.storeSelling:
          setFilter({
            ...filter,
            page: 1,
            isNew: null,
            type: null,
            sort: {
              field: 'numberSold',
              direction: SortDirectionEnum.DESC,
            },
          });
          break;

        default:
          break;
      }
    }
  }, [categoryName, filter, location]);

  return (
    <Spin spinning={loading}>
      <SubHeader
        items={[
          {
            title: 'Trang chủ',
            to: AppRoutes.home,
          },
          {
            title: AppRoutes.shopping.list.label,
            to: AppRoutes.shopping.list.value,
          },
          {
            title: categories.find((it) => it?.value === location?.pathname.slice(19))?.label ?? ' ',
          },
        ]}
      />
      <div className="m-20px">
        <ProductsByCategory
          products={products as ProductEntity[]}
          page={filter?.page as number}
          total={data?.userProducts?.meta?.totalItems}
          pageSize={filter?.limit as number}
        />
      </div>
    </Spin>
  );
});

export default EcommerceCategory;
