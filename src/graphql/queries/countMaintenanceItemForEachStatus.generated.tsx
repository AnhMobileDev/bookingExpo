import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type CountMaintenanceItemForEachStatusQueryVariables = Types.Exact<{ [key: string]: never }>;

export type CountMaintenanceItemForEachStatusQueryResponse = { __typename?: 'Query' } & {
  countMaintenanceItemForEachStatus: Array<
    { __typename?: 'MaintenanceStatusAndItemCount' } & Pick<Types.MaintenanceStatusAndItemCount, 'status' | 'totalItem'>
  >;
};

export const CountMaintenanceItemForEachStatusDocument = gql`
  query countMaintenanceItemForEachStatus {
    countMaintenanceItemForEachStatus {
      status
      totalItem
    }
  }
`;
export function useCountMaintenanceItemForEachStatusQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CountMaintenanceItemForEachStatusQueryResponse,
    CountMaintenanceItemForEachStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    CountMaintenanceItemForEachStatusQueryResponse,
    CountMaintenanceItemForEachStatusQueryVariables
  >(CountMaintenanceItemForEachStatusDocument, options);
}
export function useCountMaintenanceItemForEachStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CountMaintenanceItemForEachStatusQueryResponse,
    CountMaintenanceItemForEachStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    CountMaintenanceItemForEachStatusQueryResponse,
    CountMaintenanceItemForEachStatusQueryVariables
  >(CountMaintenanceItemForEachStatusDocument, options);
}
export type CountMaintenanceItemForEachStatusQueryHookResult = ReturnType<
  typeof useCountMaintenanceItemForEachStatusQuery
>;
export type CountMaintenanceItemForEachStatusLazyQueryHookResult = ReturnType<
  typeof useCountMaintenanceItemForEachStatusLazyQuery
>;
export type CountMaintenanceItemForEachStatusQueryResult = Apollo.QueryResult<
  CountMaintenanceItemForEachStatusQueryResponse,
  CountMaintenanceItemForEachStatusQueryVariables
>;
