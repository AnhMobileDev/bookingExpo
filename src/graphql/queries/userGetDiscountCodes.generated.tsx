import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserGetDiscountCodesQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  isAvailable?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  productIds: Array<Types.Scalars['String']> | Types.Scalars['String'];
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
}>;

export type UserGetDiscountCodesQueryResponse = { __typename?: 'Query' } & {
  userGetDiscountCodes: { __typename?: 'DiscountCodeConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'DiscountCodeEntity' } & Pick<
          Types.DiscountCodeEntity,
          | 'adminId'
          | 'createdAt'
          | 'deletedAt'
          | 'endDate'
          | 'id'
          | 'isActive'
          | 'isAssignAllProduct'
          | 'limit'
          | 'limitPerAccount'
          | 'minOrderValue'
          | 'name'
          | 'partnerId'
          | 'startDate'
          | 'unit'
          | 'updatedAt'
          | 'usedCount'
          | 'value'
        > & { products?: Types.Maybe<Array<{ __typename?: 'ProductEntity' } & Pick<Types.ProductEntity, 'id'>>> }
      >
    >;
    meta: { __typename?: 'BasePaginationMeta' } & Pick<
      Types.BasePaginationMeta,
      'currentPage' | 'itemCount' | 'itemsPerPage' | 'totalItems' | 'totalPages'
    >;
  };
};

export const UserGetDiscountCodesDocument = gql`
  query userGetDiscountCodes(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $isAvailable: Boolean
    $limit: Int
    $page: Int
    $productIds: [String!]!
    $search: String
    $sort: SortInput
  ) {
    userGetDiscountCodes(
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      isAvailable: $isAvailable
      limit: $limit
      page: $page
      productIds: $productIds
      search: $search
      sort: $sort
    ) {
      items {
        adminId
        createdAt
        deletedAt
        endDate
        id
        isActive
        isAssignAllProduct
        limit
        limitPerAccount
        minOrderValue
        name
        partnerId
        products {
          id
        }
        startDate
        unit
        updatedAt
        usedCount
        value
      }
      meta {
        currentPage
        itemCount
        itemsPerPage
        totalItems
        totalPages
      }
    }
  }
`;
export function useUserGetDiscountCodesQuery(
  baseOptions: Apollo.QueryHookOptions<UserGetDiscountCodesQueryResponse, UserGetDiscountCodesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserGetDiscountCodesQueryResponse, UserGetDiscountCodesQueryVariables>(
    UserGetDiscountCodesDocument,
    options,
  );
}
export function useUserGetDiscountCodesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserGetDiscountCodesQueryResponse, UserGetDiscountCodesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserGetDiscountCodesQueryResponse, UserGetDiscountCodesQueryVariables>(
    UserGetDiscountCodesDocument,
    options,
  );
}
export type UserGetDiscountCodesQueryHookResult = ReturnType<typeof useUserGetDiscountCodesQuery>;
export type UserGetDiscountCodesLazyQueryHookResult = ReturnType<typeof useUserGetDiscountCodesLazyQuery>;
export type UserGetDiscountCodesQueryResult = Apollo.QueryResult<
  UserGetDiscountCodesQueryResponse,
  UserGetDiscountCodesQueryVariables
>;
