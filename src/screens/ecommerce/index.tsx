import { Col, Row, Spin } from 'antd';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SubHeader } from '../../components';
import { STORAGE_KEYS } from '../../constants';
import { UserProductsQueryVariables, useUserProductsQuery } from '../../graphql/queries/userProducts.generated';
import { PartnerEntity, ProductEntity, ProductTypeEnum, StatusEnum } from '../../graphql/type.interface';
import { AppRoutes } from '../../helpers';
import { SearchStoreQueryVariables, useSearchStoreQuery } from '../../graphql/queries/searchStore.generated';

import {
  ActionHeader,
  FilterOptions,
  FormFilter,
  ProductsByCategory,
  ProductsHome,
  Search,
  SortEnum,
  StoreList,
} from './components';

import './style.css';

const PARAM_KEY = 'search';

const Ecommerce = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(() => searchParams.get(PARAM_KEY), [searchParams]);

  const [valueFilter, setValueFilter] = useState(FilterOptions.all);

  const [filter, setFilter] = useState<UserProductsQueryVariables>({
    limit: 6,
    isNew: false,
    type: null,
    isActive: StatusEnum.ACTIVE,
    page: 1,
    search: null,
    sort: null,
  });

  const { data, loading: loadingProduct } = useUserProductsQuery({
    variables: filter,
  });
  const productBySearch = useMemo(() => data?.userProducts?.items ?? [], [data]);

  const [filterStore, setFilterStore] = useState<SearchStoreQueryVariables>({
    limit: 6,
    page: 1,
    search: search ?? '',
  });

  const { data: dataStore, loading: loadingStore } = useSearchStoreQuery({
    variables: filterStore,
    skip: valueFilter !== FilterOptions.store,
  });

  const stores = useMemo(() => dataStore?.searchStore?.items ?? [], [dataStore]);

  const loading = useMemo(() => loadingProduct || loadingStore, [loadingStore, loadingProduct]);
  const handleFilter = useCallback(
    (value: FilterOptions) => {
      setValueFilter(value);
      switch (value) {
        case FilterOptions.all:
          setFilter({
            ...filter,
            page: 1,
            type: null,
            isNew: null,
          });
          break;
        case FilterOptions.new:
          setFilter({
            ...filter,
            page: 1,
            isNew: true,
            type: ProductTypeEnum.VEHICLE,
          });
          break;
        case FilterOptions.used:
          setFilter({
            ...filter,
            page: 1,
            isNew: false,
            type: ProductTypeEnum.VEHICLE,
          });
          break;
        case FilterOptions.accessary:
          setFilter({
            ...filter,
            page: 1,
            isNew: null,
            type: ProductTypeEnum.ACCESSARY,
          });
          break;
        case FilterOptions.store:
          setFilterStore({
            ...filterStore,
            search: search ?? '',
            page: 1,
          });
          break;

        default:
          break;
      }
    },
    [filter, filterStore, search],
  );

  const handleSort = useCallback(
    (value: SortEnum) => {
      setFilter({
        ...filter,
        page: 1,
        sort: {
          field: value,
        },
      });
    },
    [filter],
  );

  const handleChangePage = useCallback(
    (newPage: number) => {
      setFilterStore({
        ...filterStore,
        page: newPage,
      });
    },
    [filterStore],
  );

  const handleChangePageProduct = useCallback(
    (newPage: number) => {
      setFilter({
        ...filter,
        page: newPage,
      });
    },
    [filter],
  );

  const loadProducts = useCallback(
    (value: string) => {
      if (valueFilter !== FilterOptions.store) {
        setFilter({
          ...filter,
          page: 1,
          search: value,
        });
      } else {
        setFilterStore({
          ...filterStore,
          search: value,
          page: 1,
        });
      }
      // save to local
      const history = localStorage.getItem(STORAGE_KEYS.historySearchProduct);
      const parse = history && history.length > 0 ? JSON.parse(history) : [];
      const existHistory = parse.includes(value);
      if (existHistory) return;
      const newHistory = JSON.stringify([value, ...parse]);
      localStorage.setItem(STORAGE_KEYS.historySearchProduct, newHistory);
    },
    [filter, filterStore, valueFilter],
  );

  const handleSearch = useCallback(
    (value: string) => {
      if (!value || (value && value === searchParams.get('search'))) return;
      setSearchParams((param) => {
        param.set('search', value);
        return param;
      });
      loadProducts(value);
    },
    [loadProducts, searchParams, setSearchParams],
  );

  useEffect(() => {
    if (search) {
      loadProducts(search);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Spin spinning={loading}>
      <div className="ecommerce-content">
        <SubHeader
          items={[
            {
              title: 'Trang chủ',
              to: AppRoutes.home,
            },
            {
              title: AppRoutes.shopping.list.label,
            },
          ]}
          centerContent={<Search search={search as string} onSearch={handleSearch} />}
          rightContent={<ActionHeader />}
        />
        <div className="m-20px">
          {!search ? (
            <ProductsHome />
          ) : (
            <Row gutter={20}>
              <Col span={4}>
                <div className="bg-white py-20px px-16px">
                  <FormFilter onFinish={handleFilter} />
                </div>
              </Col>
              <Col span={20}>
                {valueFilter === FilterOptions?.store ? (
                  <StoreList
                    page={filterStore?.page ?? 1}
                    pageSize={filterStore?.limit ?? 10}
                    total={dataStore?.searchStore?.meta?.totalItems}
                    onChangePage={handleChangePage}
                    stores={stores as PartnerEntity[]}
                  />
                ) : (
                  <ProductsByCategory
                    sort={true}
                    products={productBySearch as ProductEntity[]}
                    page={filter?.page ?? 1}
                    pageSize={filter?.limit ?? 10}
                    total={data?.userProducts?.meta?.totalItems}
                    onChangePage={handleChangePageProduct}
                    onFinish={handleSort}
                  />
                )}
              </Col>
            </Row>
          )}
        </div>
      </div>
    </Spin>
  );
});

export default Ecommerce;
