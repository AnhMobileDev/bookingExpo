import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserCountItemForEachStatusQueryVariables = Types.Exact<{ [key: string]: never }>;

export type UserCountItemForEachStatusQueryResponse = { __typename?: 'Query' } & {
  userCountItemForEachStatus: Array<
    { __typename?: 'StatusAndItemCount' } & Pick<Types.StatusAndItemCount, 'status' | 'totalitems'>
  >;
};

export const UserCountItemForEachStatusDocument = gql`
  query userCountItemForEachStatus {
    userCountItemForEachStatus {
      status
      totalitems
    }
  }
`;
export function useUserCountItemForEachStatusQuery(
  baseOptions?: Apollo.QueryHookOptions<
    UserCountItemForEachStatusQueryResponse,
    UserCountItemForEachStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserCountItemForEachStatusQueryResponse, UserCountItemForEachStatusQueryVariables>(
    UserCountItemForEachStatusDocument,
    options,
  );
}
export function useUserCountItemForEachStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserCountItemForEachStatusQueryResponse,
    UserCountItemForEachStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserCountItemForEachStatusQueryResponse, UserCountItemForEachStatusQueryVariables>(
    UserCountItemForEachStatusDocument,
    options,
  );
}
export type UserCountItemForEachStatusQueryHookResult = ReturnType<typeof useUserCountItemForEachStatusQuery>;
export type UserCountItemForEachStatusLazyQueryHookResult = ReturnType<typeof useUserCountItemForEachStatusLazyQuery>;
export type UserCountItemForEachStatusQueryResult = Apollo.QueryResult<
  UserCountItemForEachStatusQueryResponse,
  UserCountItemForEachStatusQueryVariables
>;
