import { memo, useCallback, useMemo, useState } from 'react';
import { Pagination, PaginationProps, Rate, Spin, Tabs, TabsProps } from 'antd';
import { useParams } from 'react-router-dom';

import { ReviewTypeEnum, StarInfo } from '../../../../graphql/type.interface';
import { RenderEmptyReview, tabStar } from '../store';
import {
  ReviewsOfProductQueryVariables,
  useReviewsOfProductQuery,
} from '../../../../graphql/queries/reviewsOfProduct.generated';

type Props = {
  starInfo: StarInfo[];
  starSummary: any;
};

export const ProductReview = memo(({ starInfo, starSummary }: Props) => {
  const { id = '' } = useParams();
  const [tabStarActive, setTabStarActive] = useState<string>(tabStar.all);

  const [filter, setFilter] = useState<ReviewsOfProductQueryVariables>({
    limit: 4,
    page: 1,
    star: +tabStarActive,
    productId: id,
    type: ReviewTypeEnum.CLIENT_PRODUCT,
  });

  const { data, loading } = useReviewsOfProductQuery({
    variables: filter,
  });

  const reviews = useMemo(() => data?.reviewsOfProduct?.items, [data]);

  const handleChangeTabStar = useCallback(
    (key: string) => {
      setTabStarActive(key);
      setFilter({ ...filter, page: 1, star: +key });
    },
    [filter],
  );

  const handleChangePage: PaginationProps['onChange'] = useCallback(
    (newPage: number) => {
      setFilter({ ...filter, page: newPage });
    },
    [filter],
  );

  const itemsStar: TabsProps['items'] = useMemo(
    () => [
      {
        key: '0',
        label: <div className="rounded-full py-2 px-4">Tất cả</div>,
      },
      {
        key: '5',
        label: (
          <div className="rounded-full  py-2 px-4">5 sao ({starInfo?.find((it) => it?.star === 5)?.total ?? 0})</div>
        ),
      },
      {
        key: '4',
        label: (
          <div className="rounded-full  py-2 px-4">4 sao ({starInfo?.find((it) => it?.star === 4)?.total ?? 0})</div>
        ),
      },
      {
        key: '3',
        label: (
          <div className="rounded-full  py-2 px-4">3 sao ({starInfo?.find((it) => it?.star === 3)?.total ?? 0})</div>
        ),
      },
      {
        key: '2',
        label: (
          <div className="rounded-full  py-2 px-4">2 sao ({starInfo?.find((it) => it?.star === 2)?.total ?? 0})</div>
        ),
      },
      {
        key: '1',
        label: (
          <div className="rounded-full  py-2 px-4">1 sao ({starInfo?.find((it) => it?.star === 1)?.total ?? 0})</div>
        ),
      },
    ],
    [starInfo],
  );

  return (
    <Spin spinning={loading}>
      <div className="mb-20px">
        <Tabs
          activeKey={tabStarActive}
          animated={{ inkBar: false, tabPane: false }}
          items={itemsStar}
          onChange={handleChangeTabStar}
        />
      </div>

      <div className="grid grid-cols-6 grid-rows-3 gap-5 ">
        <div className="col-span-4 row-span-3 gap-2 space-y-5">
          {reviews && reviews.length > 0 ? (
            (reviews ?? []).map((review) => (
              <div className="p-5 flex flex-col gap-4 bg-white" key={review?.id}>
                <div className="flex justify-between items-center">
                  <div className="flex flex-row items-center break-words">
                    <img
                      src={review?.userAssessor?.avatar?.fullThumbUrl ?? ''}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div className="ml-[12px]" style={{ maxWidth: 'calc(100% - 32px - 12px)' }}>
                      <div className="font-medium text-[14px] leading-[20px] text-yankees-blue whitespace-nowrap text-ellipsis overflow-hidden">
                        {review?.userAssessor?.fullname}
                      </div>
                      <div className="mt-[4px] text-[13px] leading-[18px] text-dim-gray whitespace-nowrap text-ellipsis overflow-hidden">
                        {review?.userAssessor?.phone}
                      </div>
                    </div>
                  </div>
                  <span className="hover:cursor-pointer">{review?.bookingId}</span>
                </div>
                <div style={{ borderLeft: '1px solid #EEEEEE' }} className="pl-4  flex flex-col gap-2 ">
                  <span>
                    <Rate disabled value={review?.star} />
                  </span>
                  <span>{review?.comment}</span>
                </div>
              </div>
            ))
          ) : (
            <RenderEmptyReview />
          )}
          <div className="flex justify-end custome-pagination">
            <Pagination
              current={filter?.page as number}
              onChange={handleChangePage}
              total={data?.reviewsOfProduct.meta?.totalItems}
              pageSize={filter?.limit as number}
            />
          </div>
        </div>
        <div className="col-span-2 col-start-5 flex flex-col gap-5 bg-white p-5">
          <div className="flex gap-10">
            <span className="text-36px font-semibold relative">
              {(starSummary?.starAverage ?? 0).toFixed(1)}
              <span className="absolute top-1">/{(starSummary?.starAverage ?? 0).toFixed(0)}</span>
            </span>

            <div className="flex flex-col">
              <span>
                <Rate disabled value={starSummary?.starAverage} />
              </span>
              <span className="text-[#676E72] font-normal text-sm">
                {starSummary?.total} đánh giá, {starSummary?.percent}% hài lòng
              </span>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
});
