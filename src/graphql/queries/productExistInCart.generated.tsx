import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type ProductExistInCartQueryVariables = Types.Exact<{
  productId: Types.Scalars['String'];
}>;

export type ProductExistInCartQueryResponse = { __typename?: 'Query' } & {
  productExistInCart: { __typename?: 'ProductExistInCart' } & Pick<Types.ProductExistInCart, 'exist'>;
};

export const ProductExistInCartDocument = gql`
  query productExistInCart($productId: String!) {
    productExistInCart(productId: $productId) {
      exist
    }
  }
`;
export function useProductExistInCartQuery(
  baseOptions: Apollo.QueryHookOptions<ProductExistInCartQueryResponse, ProductExistInCartQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProductExistInCartQueryResponse, ProductExistInCartQueryVariables>(
    ProductExistInCartDocument,
    options,
  );
}
export function useProductExistInCartLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProductExistInCartQueryResponse, ProductExistInCartQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProductExistInCartQueryResponse, ProductExistInCartQueryVariables>(
    ProductExistInCartDocument,
    options,
  );
}
export type ProductExistInCartQueryHookResult = ReturnType<typeof useProductExistInCartQuery>;
export type ProductExistInCartLazyQueryHookResult = ReturnType<typeof useProductExistInCartLazyQuery>;
export type ProductExistInCartQueryResult = Apollo.QueryResult<
  ProductExistInCartQueryResponse,
  ProductExistInCartQueryVariables
>;
