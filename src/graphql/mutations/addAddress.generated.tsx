import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type AddAddressMutationVariables = Types.Exact<{
  input: Types.CreateAddressInput;
}>;

export type AddAddressMutationResponse = { __typename?: 'Mutation' } & {
  addAddress: { __typename?: 'AddressEntity' } & Pick<
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

export const AddAddressDocument = gql`
  mutation addAddress($input: CreateAddressInput!) {
    addAddress(input: $input) {
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
export function useAddAddressMutation(
  baseOptions?: Apollo.MutationHookOptions<AddAddressMutationResponse, AddAddressMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddAddressMutationResponse, AddAddressMutationVariables>(AddAddressDocument, options);
}
export type AddAddressMutationHookResult = ReturnType<typeof useAddAddressMutation>;
export type AddAddressMutationResult = Apollo.MutationResult<AddAddressMutationResponse>;
export type AddAddressMutationOptions = Apollo.BaseMutationOptions<
  AddAddressMutationResponse,
  AddAddressMutationVariables
>;
