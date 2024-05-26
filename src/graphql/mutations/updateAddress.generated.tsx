import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UpdateAddressMutationVariables = Types.Exact<{
  input: Types.UpdateAddressInput;
}>;

export type UpdateAddressMutationResponse = { __typename?: 'Mutation' } & {
  updateAddress: { __typename?: 'AddressEntity' } & Pick<
    Types.AddressEntity,
    | 'addressDetail'
    | 'addressName'
    | 'contactName'
    | 'contactPhone'
    | 'createdAt'
    | 'deletedAt'
    | 'id'
    | 'isDefault'
    | 'latitude'
    | 'longitude'
    | 'mapAddress'
    | 'updatedAt'
    | 'userId'
  >;
};

export const UpdateAddressDocument = gql`
  mutation updateAddress($input: UpdateAddressInput!) {
    updateAddress(input: $input) {
      addressDetail
      addressName
      contactName
      contactPhone
      createdAt
      deletedAt
      id
      isDefault
      latitude
      longitude
      mapAddress
      updatedAt
      userId
    }
  }
`;
export function useUpdateAddressMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateAddressMutationResponse, UpdateAddressMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateAddressMutationResponse, UpdateAddressMutationVariables>(
    UpdateAddressDocument,
    options,
  );
}
export type UpdateAddressMutationHookResult = ReturnType<typeof useUpdateAddressMutation>;
export type UpdateAddressMutationResult = Apollo.MutationResult<UpdateAddressMutationResponse>;
export type UpdateAddressMutationOptions = Apollo.BaseMutationOptions<
  UpdateAddressMutationResponse,
  UpdateAddressMutationVariables
>;
