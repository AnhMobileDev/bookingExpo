import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import { CategoryEntity, PartnerEntity } from '../../../../graphql/type.interface';
import { getNameCategoriesEntity } from '../../../../utils';
import { StarYellowIcon } from '../../../../assets/icon';
import { AppRoutes } from '../../../../helpers';

type Props = {
  store: PartnerEntity;
  key?: string;
};

export const StoreItem = ({ store }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      key={'store' + store?.id}
      className="rounded p-20px mb-20px shadow bg-white hover:cursor-pointer"
      onClick={() => navigate(AppRoutes.shopping.store.detailId(store?.id))}>
      <div className="flex justify-between">
        <div className="flex items-center gap-x-12px">
          <img
            src={store?.avatar?.fullThumbUrl ?? ''}
            className="h-[56px] w-[56px] rounded object-cover"
            alt="Avatar gian hàng"
          />
          <div className="">
            <p className=" font-semibold leading-24px line-clamp-1">{store?.fullname}</p>
            <div className="flex items-center text-12px">
              <StarYellowIcon />
              <p className="text-12px px-[4px]">{(store?.storeReviewSummary?.starAverage ?? 0).toFixed(1)}</p>
              <span className="text-grayscale-gray text-12px inline">
                {'(' + (store?.storeReviewSummary?.total ?? 0) + ' đánh giá)'}
              </span>
            </div>
            <p className="text-[11px] leading-14px mt-[4px]">
              {getNameCategoriesEntity(store?.qualifications as CategoryEntity[])}
            </p>
          </div>
        </div>
        <div>
          <Button
            className="border border-solid border-primary text-primary bg-transparent rounded-full"
            onClick={() => navigate(AppRoutes.shopping.store.detailId(store?.id))}>
            <span className="font-normal">Ghé thăm</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
