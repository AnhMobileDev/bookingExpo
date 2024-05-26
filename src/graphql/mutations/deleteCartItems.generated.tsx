import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type DeleteCartItemsMutationVariables = Types.Exact<{
  input: Types.DeleteCartItemsInput;
}>;

export type DeleteCartItemsMutationResponse = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'deleteCartItems'>;

export const DeleteCartItemsDocument = gql`
  mutation deleteCartItems($input: DeleteCartItemsInput!) {
    deleteCartItems(input: $input)
  }
`;
export function useDeleteCartItemsMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteCartItemsMutationResponse, DeleteCartItemsMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteCartItemsMutationResponse, DeleteCartItemsMutationVariables>(
    DeleteCartItemsDocument,
    options,
  );
}
export type DeleteCartItemsMutationHookResult = ReturnType<typeof useDeleteCartItemsMutation>;
export type DeleteCartItemsMutationResult = Apollo.MutationResult<DeleteCartItemsMutationResponse>;
export type DeleteCartItemsMutationOptions = Apollo.BaseMutationOptions<
  DeleteCartItemsMutationResponse,
  DeleteCartItemsMutationVariables
>;
