import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserCountFavoriteProductsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type UserCountFavoriteProductsQueryResponse = { __typename?: 'Query' } & Pick<
  Types.Query,
  'userCountFavoriteProducts'
>;

export const UserCountFavoriteProductsDocument = gql`
  query userCountFavoriteProducts {
    userCountFavoriteProducts
  }
`;
export function useUserCountFavoriteProductsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    UserCountFavoriteProductsQueryResponse,
    UserCountFavoriteProductsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserCountFavoriteProductsQueryResponse, UserCountFavoriteProductsQueryVariables>(
    UserCountFavoriteProductsDocument,
    options,
  );
}
export function useUserCountFavoriteProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserCountFavoriteProductsQueryResponse,
    UserCountFavoriteProductsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserCountFavoriteProductsQueryResponse, UserCountFavoriteProductsQueryVariables>(
    UserCountFavoriteProductsDocument,
    options,
  );
}
export type UserCountFavoriteProductsQueryHookResult = ReturnType<typeof useUserCountFavoriteProductsQuery>;
export type UserCountFavoriteProductsLazyQueryHookResult = ReturnType<typeof useUserCountFavoriteProductsLazyQuery>;
export type UserCountFavoriteProductsQueryResult = Apollo.QueryResult<
  UserCountFavoriteProductsQueryResponse,
  UserCountFavoriteProductsQueryVariables
>;
