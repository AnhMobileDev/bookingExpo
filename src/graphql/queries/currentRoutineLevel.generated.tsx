import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type CurrentRoutineLevelQueryVariables = Types.Exact<{
  vehicleId: Types.Scalars['String'];
}>;

export type CurrentRoutineLevelQueryResponse = { __typename?: 'Query' } & Pick<Types.Query, 'currentRoutineLevel'>;

export const CurrentRoutineLevelDocument = gql`
  query currentRoutineLevel($vehicleId: String!) {
    currentRoutineLevel(vehicleId: $vehicleId)
  }
`;
export function useCurrentRoutineLevelQuery(
  baseOptions: Apollo.QueryHookOptions<CurrentRoutineLevelQueryResponse, CurrentRoutineLevelQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CurrentRoutineLevelQueryResponse, CurrentRoutineLevelQueryVariables>(
    CurrentRoutineLevelDocument,
    options,
  );
}
export function useCurrentRoutineLevelLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CurrentRoutineLevelQueryResponse, CurrentRoutineLevelQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CurrentRoutineLevelQueryResponse, CurrentRoutineLevelQueryVariables>(
    CurrentRoutineLevelDocument,
    options,
  );
}
export type CurrentRoutineLevelQueryHookResult = ReturnType<typeof useCurrentRoutineLevelQuery>;
export type CurrentRoutineLevelLazyQueryHookResult = ReturnType<typeof useCurrentRoutineLevelLazyQuery>;
export type CurrentRoutineLevelQueryResult = Apollo.QueryResult<
  CurrentRoutineLevelQueryResponse,
  CurrentRoutineLevelQueryVariables
>;
