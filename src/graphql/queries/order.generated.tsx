import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type OrderQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type OrderQueryResponse = { __typename?: 'Query' } & {
  order: { __typename?: 'OrderEntity' } & Pick<
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
      address?: Types.Maybe<
        { __typename?: 'OrderAddressEntity' } & Pick<
          Types.OrderAddressEntity,
          'id' | 'mapAddress' | 'addressName' | 'contactPhone'
        >
      >;
      partner?: Types.Maybe<
        { __typename?: 'OrderPartner' } & Pick<Types.OrderPartner, 'id' | 'fullname' | 'phone'> & {
            avatar?: Types.Maybe<
              { __typename?: 'Media' } & Pick<Types.Media, 'fullOriginalUrl' | 'fullThumbUrl' | 'id'>
            >;
            storeReviewSummary?: Types.Maybe<
              { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'starAverage' | 'total' | 'percent'>
            >;
          }
      >;
      product: Array<
        { __typename?: 'OrderProductEntity' } & Pick<
          Types.OrderProductEntity,
          'productId' | 'id' | 'name' | 'quantity' | 'total' | 'type' | 'unitPrice'
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
        > & {
            reasons?: Types.Maybe<
              Array<
                { __typename?: 'OrderStatusCategoryEntity' } & Pick<
                  Types.OrderStatusCategoryEntity,
                  'id' | 'name' | 'orderStatusId' | 'type'
                >
              >
            >;
          }
      >;
      user: { __typename?: 'UserEntity' } & Pick<Types.UserEntity, 'id' | 'fullname' | 'phone'> & {
          userAddress?: Types.Maybe<{ __typename?: 'AddressEntity' } & Pick<Types.AddressEntity, 'mapAddress'>>;
        };
    };
};

export const OrderDocument = gql`
  query order($id: String!) {
    order(id: $id) {
      address {
        id
        mapAddress
        addressName
        contactPhone
      }
      code
      createdAt
      deletedAt
      discount
      id
      note
      partner {
        id
        fullname
        phone
        avatar {
          fullOriginalUrl
          fullThumbUrl
          id
        }
        storeReviewSummary {
          starAverage
          total
          percent
        }
      }
      partnerId
      product {
        avatar {
          fullOriginalUrl
          fullThumbUrl
          id
        }
        productId
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
        reasons {
          id
          name
          orderStatusId
          type
        }
        status
        userId
      }
      total
      updatedAt
      user {
        id
        fullname
        phone
        userAddress {
          mapAddress
        }
      }
      userCanReview
      userId
    }
  }
`;
export function useOrderQuery(baseOptions: Apollo.QueryHookOptions<OrderQueryResponse, OrderQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<OrderQueryResponse, OrderQueryVariables>(OrderDocument, options);
}
export function useOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderQueryResponse, OrderQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<OrderQueryResponse, OrderQueryVariables>(OrderDocument, options);
}
export type OrderQueryHookResult = ReturnType<typeof useOrderQuery>;
export type OrderLazyQueryHookResult = ReturnType<typeof useOrderLazyQuery>;
export type OrderQueryResult = Apollo.QueryResult<OrderQueryResponse, OrderQueryVariables>;
