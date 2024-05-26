import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type DeleteMaintenanceMutationVariables = Types.Exact<{
  input: Types.DeleteMaintenanceInput;
}>;

export type DeleteMaintenanceMutationResponse = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'deleteMaintenance'>;

export const DeleteMaintenanceDocument = gql`
  mutation deleteMaintenance($input: DeleteMaintenanceInput!) {
    deleteMaintenance(input: $input)
  }
`;
export function useDeleteMaintenanceMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteMaintenanceMutationResponse, DeleteMaintenanceMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteMaintenanceMutationResponse, DeleteMaintenanceMutationVariables>(
    DeleteMaintenanceDocument,
    options,
  );
}
export type DeleteMaintenanceMutationHookResult = ReturnType<typeof useDeleteMaintenanceMutation>;
export type DeleteMaintenanceMutationResult = Apollo.MutationResult<DeleteMaintenanceMutationResponse>;
export type DeleteMaintenanceMutationOptions = Apollo.BaseMutationOptions<
  DeleteMaintenanceMutationResponse,
  DeleteMaintenanceMutationVariables
>;
