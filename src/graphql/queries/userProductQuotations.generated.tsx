import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserProductQuotationsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isAdmin?: Types.InputMaybe<Types.Scalars['Boolean']>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  partnerId?: Types.InputMaybe<Types.Scalars['String']>;
  productId?: Types.InputMaybe<Types.Scalars['String']>;
  productQuotationCode?: Types.InputMaybe<Types.Scalars['String']>;
  productQuotationId?: Types.InputMaybe<Types.Scalars['String']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
  status?: Types.InputMaybe<Types.ProductQuotationStatusEnum>;
  userId?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type UserProductQuotationsQueryResponse = { __typename?: 'Query' } & {
  userProductQuotations: { __typename?: 'ProductQuotationConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'ProductQuotationEntity' } & Pick<
          Types.ProductQuotationEntity,
          | 'code'
          | 'createdAt'
          | 'deletedAt'
          | 'detail'
          | 'id'
          | 'productId'
          | 'quantity'
          | 'response'
          | 'status'
          | 'updatedAt'
        > & {
            medias: Array<{ __typename?: 'Media' } & Pick<Types.Media, 'fullOriginalUrl' | 'fullThumbUrl' | 'id'>>;
            partner: { __typename?: 'PartnerEntity' } & Pick<Types.PartnerEntity, 'fullname'>;
            product: { __typename?: 'ProductEntity' } & Pick<Types.ProductEntity, 'id' | 'name'> & {
                avatar?: Types.Maybe<
                  { __typename?: 'Media' } & Pick<Types.Media, 'fullOriginalUrl' | 'fullThumbUrl' | 'id'>
                >;
              };
          }
      >
    >;
    meta: { __typename?: 'BasePaginationMeta' } & Pick<
      Types.BasePaginationMeta,
      'currentPage' | 'itemCount' | 'itemsPerPage' | 'totalItems' | 'totalPages'
    >;
  };
};

export const UserProductQuotationsDocument = gql`
  query userProductQuotations(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isAdmin: Boolean
    $isApproved: Boolean
    $limit: Int
    $page: Int
    $partnerId: String
    $productId: String
    $productQuotationCode: String
    $productQuotationId: String
    $search: String
    $sort: SortInput
    $status: ProductQuotationStatusEnum
    $userId: String
  ) {
    userProductQuotations(
      filters: $filters
      isActive: $isActive
      isAdmin: $isAdmin
      isApproved: $isApproved
      limit: $limit
      page: $page
      partnerId: $partnerId
      productId: $productId
      productQuotationCode: $productQuotationCode
      productQuotationId: $productQuotationId
      search: $search
      sort: $sort
      status: $status
      userId: $userId
    ) {
      items {
        code
        createdAt
        deletedAt
        detail
        id
        medias {
          fullOriginalUrl
          fullThumbUrl
          id
        }
        partner {
          fullname
        }
        product {
          avatar {
            fullOriginalUrl
            fullThumbUrl
            id
          }
          id
          name
        }
        productId
        quantity
        response
        status
        updatedAt
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
export function useUserProductQuotationsQuery(
  baseOptions?: Apollo.QueryHookOptions<UserProductQuotationsQueryResponse, UserProductQuotationsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserProductQuotationsQueryResponse, UserProductQuotationsQueryVariables>(
    UserProductQuotationsDocument,
    options,
  );
}
export function useUserProductQuotationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserProductQuotationsQueryResponse, UserProductQuotationsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserProductQuotationsQueryResponse, UserProductQuotationsQueryVariables>(
    UserProductQuotationsDocument,
    options,
  );
}
export type UserProductQuotationsQueryHookResult = ReturnType<typeof useUserProductQuotationsQuery>;
export type UserProductQuotationsLazyQueryHookResult = ReturnType<typeof useUserProductQuotationsLazyQuery>;
export type UserProductQuotationsQueryResult = Apollo.QueryResult<
  UserProductQuotationsQueryResponse,
  UserProductQuotationsQueryVariables
>;
