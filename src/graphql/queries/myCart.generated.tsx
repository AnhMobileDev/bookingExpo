import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type MyCartQueryVariables = Types.Exact<{ [key: string]: never }>;

export type MyCartQueryResponse = { __typename?: 'Query' } & {
  myCart: { __typename?: 'CartEntity' } & Pick<
    Types.CartEntity,
    'createdAt' | 'deletedAt' | 'id' | 'total' | 'updatedAt' | 'userId'
  > & {
      items: Array<
        { __typename?: 'CartItemEntity' } & Pick<
          Types.CartItemEntity,
          'cartId' | 'createdAt' | 'deletedAt' | 'id' | 'productId' | 'quantity' | 'total' | 'updatedAt'
        > & {
            product: { __typename?: 'ProductEntity' } & Pick<
              Types.ProductEntity,
              'id' | 'name' | 'unitPrice' | 'quantity'
            > & { avatar?: Types.Maybe<{ __typename?: 'Media' } & Pick<Types.Media, 'fullThumbUrl'>> };
            store?: Types.Maybe<
              { __typename?: 'PartnerEntity' } & Pick<Types.PartnerEntity, 'fullname' | 'id'> & {
                  avatar?: Types.Maybe<{ __typename?: 'Media' } & Pick<Types.Media, 'fullThumbUrl'>>;
                  qualifications?: Types.Maybe<
                    Array<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'name'>>
                  >;
                  storeReviewSummary?: Types.Maybe<
                    { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'percent' | 'starAverage' | 'total'>
                  >;
                }
            >;
          }
      >;
    };
};

export const MyCartDocument = gql`
  query myCart {
    myCart {
      createdAt
      deletedAt
      id
      items {
        cartId
        createdAt
        deletedAt
        id
        product {
          avatar {
            fullThumbUrl
          }
          id
          name
          unitPrice
          quantity
        }
        productId
        quantity
        store {
          avatar {
            fullThumbUrl
          }
          fullname
          id
          qualifications {
            name
          }
          storeReviewSummary {
            percent
            starAverage
            total
          }
        }
        total
        updatedAt
      }
      total
      updatedAt
      userId
    }
  }
`;
export function useMyCartQuery(baseOptions?: Apollo.QueryHookOptions<MyCartQueryResponse, MyCartQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MyCartQueryResponse, MyCartQueryVariables>(MyCartDocument, options);
}
export function useMyCartLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MyCartQueryResponse, MyCartQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MyCartQueryResponse, MyCartQueryVariables>(MyCartDocument, options);
}
export type MyCartQueryHookResult = ReturnType<typeof useMyCartQuery>;
export type MyCartLazyQueryHookResult = ReturnType<typeof useMyCartLazyQuery>;
export type MyCartQueryResult = Apollo.QueryResult<MyCartQueryResponse, MyCartQueryVariables>;
