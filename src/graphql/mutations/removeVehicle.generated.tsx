import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type RemoveVehicleMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type RemoveVehicleMutationResponse = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'removeVehicle'>;

export const RemoveVehicleDocument = gql`
  mutation removeVehicle($id: String!) {
    removeVehicle(id: $id)
  }
`;
export function useRemoveVehicleMutation(
  baseOptions?: Apollo.MutationHookOptions<RemoveVehicleMutationResponse, RemoveVehicleMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveVehicleMutationResponse, RemoveVehicleMutationVariables>(
    RemoveVehicleDocument,
    options,
  );
}
export type RemoveVehicleMutationHookResult = ReturnType<typeof useRemoveVehicleMutation>;
export type RemoveVehicleMutationResult = Apollo.MutationResult<RemoveVehicleMutationResponse>;
export type RemoveVehicleMutationOptions = Apollo.BaseMutationOptions<
  RemoveVehicleMutationResponse,
  RemoveVehicleMutationVariables
>;
