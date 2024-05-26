import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type MyOrdersQueryVariables = Types.Exact<{
  endDate?: Types.InputMaybe<Types.Scalars['String']>;
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
  startDate?: Types.InputMaybe<Types.Scalars['String']>;
  statuses?: Types.InputMaybe<Array<Types.OrderStatusEnum> | Types.OrderStatusEnum>;
}>;

export type MyOrdersQueryResponse = { __typename?: 'Query' } & {
  myOrders: { __typename?: 'OrderConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'OrderEntity' } & Pick<
          Types.OrderEntity,
          | 'code'
          | 'createdAt'
          | 'deletedAt'
          | 'discount'
          | 'id'
          | 'note'
          | 'partnerId'
          | 'shippingFee'
          | 'status'
          | 'total'
          | 'updatedAt'
          | 'userCanReview'
          | 'userId'
        > & {
            product: Array<
              { __typename?: 'OrderProductEntity' } & Pick<
                Types.OrderProductEntity,
                'id' | 'name' | 'quantity' | 'total' | 'type' | 'unitPrice'
              > & {
                  avatar?: Types.Maybe<
                    { __typename?: 'Media' } & Pick<Types.Media, 'fullOriginalUrl' | 'fullThumbUrl' | 'id'>
                  >;
                }
            >;
            statusDetail?: Types.Maybe<
              { __typename?: 'OrderStatusEntity' } & Pick<
                Types.OrderStatusEntity,
                'createdAt' | 'id' | 'note' | 'orderId' | 'partnerId' | 'status' | 'userId'
              >
            >;
          }
      >
    >;
    meta: { __typename?: 'BasePaginationMeta' } & Pick<
      Types.BasePaginationMeta,
      'currentPage' | 'itemCount' | 'itemsPerPage' | 'totalItems' | 'totalPages'
    >;
  };
};

export const MyOrdersDocument = gql`
  query myOrders(
    $endDate: String
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $limit: Int
    $page: Int
    $search: String
    $sort: SortInput
    $startDate: String
    $statuses: [OrderStatusEnum!]
  ) {
    myOrders(
      endDate: $endDate
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      limit: $limit
      page: $page
      search: $search
      sort: $sort
      startDate: $startDate
      statuses: $statuses
    ) {
      items {
        code
        createdAt
        deletedAt
        discount
        id
        note
        partnerId
        product {
          avatar {
            fullOriginalUrl
            fullThumbUrl
            id
          }
          id
          name
          quantity
          total
          type
          unitPrice
        }
        shippingFee
        status
        statusDetail {
          createdAt
          id
          note
          orderId
          partnerId
          status
          userId
        }
        total
        updatedAt
        userCanReview
        userId
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
export function useMyOrdersQuery(baseOptions?: Apollo.QueryHookOptions<MyOrdersQueryResponse, MyOrdersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MyOrdersQueryResponse, MyOrdersQueryVariables>(MyOrdersDocument, options);
}
export function useMyOrdersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MyOrdersQueryResponse, MyOrdersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MyOrdersQueryResponse, MyOrdersQueryVariables>(MyOrdersDocument, options);
}
export type MyOrdersQueryHookResult = ReturnType<typeof useMyOrdersQuery>;
export type MyOrdersLazyQueryHookResult = ReturnType<typeof useMyOrdersLazyQuery>;
export type MyOrdersQueryResult = Apollo.QueryResult<MyOrdersQueryResponse, MyOrdersQueryVariables>;
