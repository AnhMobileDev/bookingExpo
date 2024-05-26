import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type CancelMaintenanceMutationVariables = Types.Exact<{
  input: Types.CancelMaintenanceInput;
}>;

export type CancelMaintenanceMutationResponse = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'cancelMaintenance'>;

export const CancelMaintenanceDocument = gql`
  mutation cancelMaintenance($input: CancelMaintenanceInput!) {
    cancelMaintenance(input: $input)
  }
`;
export function useCancelMaintenanceMutation(
  baseOptions?: Apollo.MutationHookOptions<CancelMaintenanceMutationResponse, CancelMaintenanceMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CancelMaintenanceMutationResponse, CancelMaintenanceMutationVariables>(
    CancelMaintenanceDocument,
    options,
  );
}
export type CancelMaintenanceMutationHookResult = ReturnType<typeof useCancelMaintenanceMutation>;
export type CancelMaintenanceMutationResult = Apollo.MutationResult<CancelMaintenanceMutationResponse>;
export type CancelMaintenanceMutationOptions = Apollo.BaseMutationOptions<
  CancelMaintenanceMutationResponse,
  CancelMaintenanceMutationVariables
>;
