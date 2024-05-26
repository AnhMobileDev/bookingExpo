import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserCountProductQuotationForEachStatusQueryVariables = Types.Exact<{ [key: string]: never }>;

export type UserCountProductQuotationForEachStatusQueryResponse = { __typename?: 'Query' } & {
  userCountProductQuotationForEachStatus: Array<
    { __typename?: 'ProductQuotationStatusAndItemCount' } & Pick<
      Types.ProductQuotationStatusAndItemCount,
      'status' | 'totalItem'
    >
  >;
};

export const UserCountProductQuotationForEachStatusDocument = gql`
  query userCountProductQuotationForEachStatus {
    userCountProductQuotationForEachStatus {
      status
      totalItem
    }
  }
`;
export function useUserCountProductQuotationForEachStatusQuery(
  baseOptions?: Apollo.QueryHookOptions<
    UserCountProductQuotationForEachStatusQueryResponse,
    UserCountProductQuotationForEachStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    UserCountProductQuotationForEachStatusQueryResponse,
    UserCountProductQuotationForEachStatusQueryVariables
  >(UserCountProductQuotationForEachStatusDocument, options);
}
export function useUserCountProductQuotationForEachStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserCountProductQuotationForEachStatusQueryResponse,
    UserCountProductQuotationForEachStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    UserCountProductQuotationForEachStatusQueryResponse,
    UserCountProductQuotationForEachStatusQueryVariables
  >(UserCountProductQuotationForEachStatusDocument, options);
}
export type UserCountProductQuotationForEachStatusQueryHookResult = ReturnType<
  typeof useUserCountProductQuotationForEachStatusQuery
>;
export type UserCountProductQuotationForEachStatusLazyQueryHookResult = ReturnType<
  typeof useUserCountProductQuotationForEachStatusLazyQuery
>;
export type UserCountProductQuotationForEachStatusQueryResult = Apollo.QueryResult<
  UserCountProductQuotationForEachStatusQueryResponse,
  UserCountProductQuotationForEachStatusQueryVariables
>;
