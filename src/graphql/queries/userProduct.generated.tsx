import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserProductQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type UserProductQueryResponse = { __typename?: 'Query' } & {
  userProduct: { __typename?: 'ProductEntity' } & Pick<
    Types.ProductEntity,
    | 'avatarId'
    | 'createdAt'
    | 'deletedAt'
    | 'descriptionImageIds'
    | 'detail'
    | 'id'
    | 'isActive'
    | 'isFavorite'
    | 'isFixedCost'
    | 'isNew'
    | 'name'
    | 'numberOrder'
    | 'numberSold'
    | 'operatingNumber'
    | 'operatingUnit'
    | 'ordinalNumber'
    | 'partNumber'
    | 'partnerId'
    | 'quantity'
    | 'serialNumber'
    | 'star'
    | 'type'
    | 'unitPrice'
    | 'updatedAt'
    | 'vehicleRegistrationPlate'
    | 'vinNumber'
    | 'yearOfManufacture'
  > & {
      avatar?: Types.Maybe<{ __typename?: 'Media' } & Pick<Types.Media, 'fullOriginalUrl' | 'fullThumbUrl' | 'id'>>;
      descriptionImages: Array<
        { __typename?: 'Media' } & Pick<Types.Media, 'fullOriginalUrl' | 'fullThumbUrl' | 'id' | 'type'>
      >;
      manufacturer?: Types.Maybe<
        { __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'isActive' | 'name' | 'type'>
      >;
      model?: Types.Maybe<
        { __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'isActive' | 'name' | 'type'>
      >;
      origin?: Types.Maybe<
        { __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'isActive' | 'name' | 'type'>
      >;
      partOfProduct?: Types.Maybe<
        { __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'isActive' | 'name' | 'type'>
      >;
      productType?: Types.Maybe<
        { __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'isActive' | 'name' | 'type'>
      >;
      productUnit?: Types.Maybe<
        { __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'isActive' | 'name' | 'type'>
      >;
      reviewSummary?: Types.Maybe<
        { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'percent' | 'starAverage' | 'total'>
      >;
      starInfo?: Types.Maybe<Array<{ __typename?: 'StarInfo' } & Pick<Types.StarInfo, 'star' | 'total'>>>;
    };
};

export const UserProductDocument = gql`
  query userProduct($id: String!) {
    userProduct(id: $id) {
      avatar {
        fullOriginalUrl
        fullThumbUrl
        id
      }
      avatarId
      createdAt
      deletedAt
      descriptionImageIds
      descriptionImages {
        fullOriginalUrl
        fullThumbUrl
        id
        type
      }
      detail
      id
      isActive
      isFavorite
      isFixedCost
      isNew
      manufacturer {
        id
        isActive
        name
        type
      }
      model {
        id
        isActive
        name
        type
      }
      name
      numberOrder
      numberSold
      operatingNumber
      operatingUnit
      ordinalNumber
      origin {
        id
        isActive
        name
        type
      }
      partNumber
      partOfProduct {
        id
        isActive
        name
        type
      }
      partnerId
      productType {
        id
        isActive
        name
        type
      }
      productUnit {
        id
        isActive
        name
        type
      }
      quantity
      reviewSummary {
        percent
        starAverage
        total
      }
      serialNumber
      star
      starInfo {
        star
        total
      }
      type
      unitPrice
      updatedAt
      vehicleRegistrationPlate
      vinNumber
      yearOfManufacture
    }
  }
`;
export function useUserProductQuery(
  baseOptions: Apollo.QueryHookOptions<UserProductQueryResponse, UserProductQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserProductQueryResponse, UserProductQueryVariables>(UserProductDocument, options);
}
export function useUserProductLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserProductQueryResponse, UserProductQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserProductQueryResponse, UserProductQueryVariables>(UserProductDocument, options);
}
export type UserProductQueryHookResult = ReturnType<typeof useUserProductQuery>;
export type UserProductLazyQueryHookResult = ReturnType<typeof useUserProductLazyQuery>;
export type UserProductQueryResult = Apollo.QueryResult<UserProductQueryResponse, UserProductQueryVariables>;
