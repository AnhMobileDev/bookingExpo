import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type RemoveAddressMutationVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['ID']>;
}>;

export type RemoveAddressMutationResponse = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'removeAddress'>;

export const RemoveAddressDocument = gql`
  mutation removeAddress($id: ID) {
    removeAddress(id: $id)
  }
`;
export function useRemoveAddressMutation(
  baseOptions?: Apollo.MutationHookOptions<RemoveAddressMutationResponse, RemoveAddressMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveAddressMutationResponse, RemoveAddressMutationVariables>(
    RemoveAddressDocument,
    options,
  );
}
export type RemoveAddressMutationHookResult = ReturnType<typeof useRemoveAddressMutation>;
export type RemoveAddressMutationResult = Apollo.MutationResult<RemoveAddressMutationResponse>;
export type RemoveAddressMutationOptions = Apollo.BaseMutationOptions<
  RemoveAddressMutationResponse,
  RemoveAddressMutationVariables
>;
