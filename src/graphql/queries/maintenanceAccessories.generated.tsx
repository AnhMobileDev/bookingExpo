import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type MaintenanceAccessoriesQueryVariables = Types.Exact<{
  routineLevel: Types.Scalars['Float'];
}>;

export type MaintenanceAccessoriesQueryResponse = { __typename?: 'Query' } & {
  maintenanceAccessories: Array<
    { __typename?: 'MaintenanceAccessory' } & Pick<Types.MaintenanceAccessory, 'id' | 'name' | 'quantity' | 'unit'>
  >;
};

export const MaintenanceAccessoriesDocument = gql`
  query maintenanceAccessories($routineLevel: Float!) {
    maintenanceAccessories(routineLevel: $routineLevel) {
      id
      name
      quantity
      unit
    }
  }
`;
export function useMaintenanceAccessoriesQuery(
  baseOptions: Apollo.QueryHookOptions<MaintenanceAccessoriesQueryResponse, MaintenanceAccessoriesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MaintenanceAccessoriesQueryResponse, MaintenanceAccessoriesQueryVariables>(
    MaintenanceAccessoriesDocument,
    options,
  );
}
export function useMaintenanceAccessoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MaintenanceAccessoriesQueryResponse, MaintenanceAccessoriesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MaintenanceAccessoriesQueryResponse, MaintenanceAccessoriesQueryVariables>(
    MaintenanceAccessoriesDocument,
    options,
  );
}
export type MaintenanceAccessoriesQueryHookResult = ReturnType<typeof useMaintenanceAccessoriesQuery>;
export type MaintenanceAccessoriesLazyQueryHookResult = ReturnType<typeof useMaintenanceAccessoriesLazyQuery>;
export type MaintenanceAccessoriesQueryResult = Apollo.QueryResult<
  MaintenanceAccessoriesQueryResponse,
  MaintenanceAccessoriesQueryVariables
>;
