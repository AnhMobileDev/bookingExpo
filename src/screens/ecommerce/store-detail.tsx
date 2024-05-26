import { memo, useMemo, useState } from 'react';
import { Spin, Tabs } from 'antd';
import { useParams } from 'react-router-dom';

import { SubHeader } from '../../components';
import { AppRoutes } from '../../helpers';
import { useStoreDetailQuery } from '../../graphql/queries/storeDetail.generated';
import { StarYellowIcon } from '../../assets/icon';
import { getNameCategoriesEntity } from '../../utils';
import { CategoryEntity, StarInfo } from '../../graphql/type.interface';

import { ActionHeader, ProductsByStore, StoreHome, StoreReview } from './components';
import './style.css';

export enum tabKeys {
  home = 'home',
  productAll = 'productAll',
  review = 'review',
}

const tabs = [
  {
    label: 'Trang chủ',
    key: tabKeys.home,
  },
  {
    label: 'Tất cả sản phẩm',
    key: tabKeys.productAll,
  },
  {
    label: 'Nhận xét & đánh giá',
    key: tabKeys.review,
  },
];

const EcommerceStoreDetail = memo(() => {
  const { id = '' } = useParams();
  const { data, loading } = useStoreDetailQuery({ variables: { id }, skip: !id });

  const store = useMemo(() => data?.storeDetail, [data]);

  const [tabActive, setTabActive] = useState(tabKeys.home);

  return (
    <Spin spinning={loading}>
      <div className="ecommerce-detai-store">
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
              title: 'Gian hàng',
            },
          ]}
          title={store?.fullname ?? ''}
          rightContent={<ActionHeader />}
        />
        <div className="p-20px bg-white text-white">
          <div className="rounded p-20px shadow bg-store-ecommerce">
            <div className="flex gap-x-12px">
              <img
                src={store?.avatar?.fullThumbUrl ?? ''}
                className="h-[56px] w-[56px] rounded-full"
                alt="Avatar gian hàng"
              />
              <div className="">
                <p className="font-semibold leading-24px line-clamp-1">{store?.fullname}</p>
                <div className="flex items-center text-12px">
                  <StarYellowIcon />
                  <p className="text-12px px-[4px]">{store?.storeReviewSummary?.starAverage.toFixed(1) ?? 0}</p>
                  <span className="text-12px inline">
                    {'(' + (store?.storeReviewSummary?.total ?? 0) + ' đánh giá)'}
                  </span>
                </div>
                <p className="text-[11px] leading-14px mt-[4px]">
                  {getNameCategoriesEntity(store?.qualifications as CategoryEntity[])}
                </p>
                <p className="text-[11px] leading-14px mt-[4px]">{store?.description}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-[26px]">
              <div>
                <Tabs
                  className="bg-transparent"
                  activeKey={tabActive}
                  items={tabs}
                  onChange={(key: string) => setTabActive(key as tabKeys)}
                />
              </div>
              {/* <div>
                <Input
                  suffix={<SearchNormal />}
                  className="min-w-[400px]"
                  placeholder="Tìm sản phẩm tại cửa hàng"
                  onPressEnter={(e) => e?.currentTarget?.value.trim() && setSearch(e?.currentTarget?.value.trim())}
                  onChange={(e) => e?.currentTarget?.value.trim() && setSearch(e?.currentTarget?.value.trim())}
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="m-20px">
        {tabActive === tabKeys.home && <StoreHome />}
        {tabActive === tabKeys.productAll && <ProductsByStore />}
        {tabActive === tabKeys.review && (
          <StoreReview
            starInfo={data?.storeDetail?.storeStarInfo as StarInfo[]}
            starSummary={data?.storeDetail?.storeReviewSummary}
          />
        )}
      </div>
    </Spin>
  );
});

export default EcommerceStoreDetail;
