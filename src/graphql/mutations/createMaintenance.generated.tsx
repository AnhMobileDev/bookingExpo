import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type CreateMaintenanceMutationVariables = Types.Exact<{
  input: Types.CreateMaintenanceInput;
}>;

export type CreateMaintenanceMutationResponse = { __typename?: 'Mutation' } & {
  createMaintenance: { __typename?: 'MaintenanceEntity' } & Pick<Types.MaintenanceEntity, 'id'>;
};

export const CreateMaintenanceDocument = gql`
  mutation createMaintenance($input: CreateMaintenanceInput!) {
    createMaintenance(input: $input) {
      id
    }
  }
`;
export function useCreateMaintenanceMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateMaintenanceMutationResponse, CreateMaintenanceMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateMaintenanceMutationResponse, CreateMaintenanceMutationVariables>(
    CreateMaintenanceDocument,
    options,
  );
}
export type CreateMaintenanceMutationHookResult = ReturnType<typeof useCreateMaintenanceMutation>;
export type CreateMaintenanceMutationResult = Apollo.MutationResult<CreateMaintenanceMutationResponse>;
export type CreateMaintenanceMutationOptions = Apollo.BaseMutationOptions<
  CreateMaintenanceMutationResponse,
  CreateMaintenanceMutationVariables
>;
