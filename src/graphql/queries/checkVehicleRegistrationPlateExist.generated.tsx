import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type CheckVehicleRegistrationPlateExistQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['String']>;
  vehicleRegistrationPlate: Types.Scalars['String'];
}>;

export type CheckVehicleRegistrationPlateExistQueryResponse = { __typename?: 'Query' } & Pick<
  Types.Query,
  'checkVehicleRegistrationPlateExist'
>;

export const CheckVehicleRegistrationPlateExistDocument = gql`
  query checkVehicleRegistrationPlateExist($id: String, $vehicleRegistrationPlate: String!) {
    checkVehicleRegistrationPlateExist(id: $id, vehicleRegistrationPlate: $vehicleRegistrationPlate)
  }
`;
export function useCheckVehicleRegistrationPlateExistQuery(
  baseOptions: Apollo.QueryHookOptions<
    CheckVehicleRegistrationPlateExistQueryResponse,
    CheckVehicleRegistrationPlateExistQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    CheckVehicleRegistrationPlateExistQueryResponse,
    CheckVehicleRegistrationPlateExistQueryVariables
  >(CheckVehicleRegistrationPlateExistDocument, options);
}
export function useCheckVehicleRegistrationPlateExistLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CheckVehicleRegistrationPlateExistQueryResponse,
    CheckVehicleRegistrationPlateExistQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    CheckVehicleRegistrationPlateExistQueryResponse,
    CheckVehicleRegistrationPlateExistQueryVariables
  >(CheckVehicleRegistrationPlateExistDocument, options);
}
export type CheckVehicleRegistrationPlateExistQueryHookResult = ReturnType<
  typeof useCheckVehicleRegistrationPlateExistQuery
>;
export type CheckVehicleRegistrationPlateExistLazyQueryHookResult = ReturnType<
  typeof useCheckVehicleRegistrationPlateExistLazyQuery
>;
export type CheckVehicleRegistrationPlateExistQueryResult = Apollo.QueryResult<
  CheckVehicleRegistrationPlateExistQueryResponse,
  CheckVehicleRegistrationPlateExistQueryVariables
>;
