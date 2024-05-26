import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type StoreDetailQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type StoreDetailQueryResponse = { __typename?: 'Query' } & {
  storeDetail: { __typename?: 'PartnerEntity' } & Pick<
    Types.PartnerEntity,
    | 'addressMoreInfo'
    | 'avatarId'
    | 'bank'
    | 'birthday'
    | 'cardNumber'
    | 'citizenId'
    | 'countProduct'
    | 'countTechnician'
    | 'createdAt'
    | 'deletedAt'
    | 'description'
    | 'email'
    | 'fullname'
    | 'hotline'
    | 'id'
    | 'isActive'
    | 'isAdmin'
    | 'isApproved'
    | 'latitude'
    | 'longitude'
    | 'mapAddress'
    | 'menus'
    | 'parentId'
    | 'phone'
    | 'star'
    | 'storeStar'
    | 'suggestionPoint'
    | 'type'
    | 'updatedAt'
  > & {
      avatar?: Types.Maybe<{ __typename?: 'Media' } & Pick<Types.Media, 'fullOriginalUrl' | 'fullThumbUrl' | 'id'>>;
      education?: Types.Maybe<
        { __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'isActive' | 'name' | 'type'>
      >;
      expenseInfo?: Types.Maybe<{ __typename?: 'Expense' } & Pick<Types.Expense, 'cost' | 'distance' | 'time'>>;
      qualifications?: Types.Maybe<
        Array<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'isActive' | 'name' | 'type'>>
      >;
      reviewSummary?: Types.Maybe<
        { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'percent' | 'starAverage' | 'total'>
      >;
      starInfo: Array<{ __typename?: 'StarInfo' } & Pick<Types.StarInfo, 'star' | 'total'>>;
      storeReviewSummary?: Types.Maybe<
        { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'percent' | 'starAverage' | 'total'>
      >;
      storeStarInfo?: Types.Maybe<Array<{ __typename?: 'StarInfo' } & Pick<Types.StarInfo, 'star' | 'total'>>>;
    };
};

export const StoreDetailDocument = gql`
  query storeDetail($id: String!) {
    storeDetail(id: $id) {
      addressMoreInfo
      avatar {
        fullOriginalUrl
        fullThumbUrl
        id
      }
      avatarId
      bank
      birthday
      cardNumber
      citizenId
      countProduct
      countTechnician
      createdAt
      deletedAt
      description
      education {
        id
        isActive
        name
        type
      }
      email
      expenseInfo {
        cost
        distance
        time
      }
      fullname
      hotline
      id
      isActive
      isAdmin
      isApproved
      latitude
      longitude
      mapAddress
      menus
      parentId
      phone
      qualifications {
        id
        isActive
        name
        type
      }
      reviewSummary {
        percent
        starAverage
        total
      }
      star
      starInfo {
        star
        total
      }
      storeReviewSummary {
        percent
        starAverage
        total
      }
      storeStar
      storeStarInfo {
        star
        total
      }
      suggestionPoint
      type
      updatedAt
    }
  }
`;
export function useStoreDetailQuery(
  baseOptions: Apollo.QueryHookOptions<StoreDetailQueryResponse, StoreDetailQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<StoreDetailQueryResponse, StoreDetailQueryVariables>(StoreDetailDocument, options);
}
export function useStoreDetailLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<StoreDetailQueryResponse, StoreDetailQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<StoreDetailQueryResponse, StoreDetailQueryVariables>(StoreDetailDocument, options);
}
export type StoreDetailQueryHookResult = ReturnType<typeof useStoreDetailQuery>;
export type StoreDetailLazyQueryHookResult = ReturnType<typeof useStoreDetailLazyQuery>;
export type StoreDetailQueryResult = Apollo.QueryResult<StoreDetailQueryResponse, StoreDetailQueryVariables>;
