import { memo, useCallback, useMemo, useState } from 'react';
import { Pagination, PaginationProps, Rate, Spin, Tabs, TabsProps } from 'antd';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import { ReviewTypeEnum, StarInfo } from '../../../../../graphql/type.interface';
import { useReviewsOfPartnerQuery } from '../../../../../graphql/queries/reviewsOfPartner.generated';
import { ReviewEmpty } from '../../../../../assets/icon';
import { TIME_FORMAT } from '../../../../../constants/format';

export const tabStar = {
  all: '0',
  five: '5',
  four: '4',
  three: '3',
  two: '2',
  one: '1',
};

export const RenderEmptyReview = () => (
  <div className="bg-white p-20px flex flex-col justify-center items-center">
    <ReviewEmpty />
    <div className="text-14px text-grayscale-gray leading-20px">Chưa có Đánh giá nào</div>
  </div>
);

type Props = {
  starInfo: StarInfo[];
  starSummary: any;
};

export const StoreReview = memo(({ starInfo, starSummary }: Props) => {
  const { id = '' } = useParams();
  const [tabStarActive, setTabStarActive] = useState<string>(tabStar.all);

  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
    star: +tabStarActive,
    partnerId: id,
    type: ReviewTypeEnum.CLIENT_STORE,
  });

  const { data, loading } = useReviewsOfPartnerQuery({
    variables: filter,
  });

  const reviews = useMemo(() => data?.reviewsOfPartner?.items, [data]);

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
                  <span className="hover:cursor-pointer text-[13px]">
                    {dayjs(review?.createdAt).format(TIME_FORMAT)}
                  </span>
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
              current={filter?.page}
              onChange={handleChangePage}
              total={data?.reviewsOfPartner.meta?.totalItems}
              pageSize={filter?.limit}
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
                {starSummary?.total} đánh giá, {starSummary?.percent.toFixed(1)}% hài lòng
              </span>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
});
