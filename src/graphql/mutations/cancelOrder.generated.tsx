import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type CancelOrderMutationVariables = Types.Exact<{
  input: Types.CancelOrderInput;
}>;

export type CancelOrderMutationResponse = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'cancelOrder'>;

export const CancelOrderDocument = gql`
  mutation cancelOrder($input: CancelOrderInput!) {
    cancelOrder(input: $input)
  }
`;
export function useCancelOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<CancelOrderMutationResponse, CancelOrderMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CancelOrderMutationResponse, CancelOrderMutationVariables>(CancelOrderDocument, options);
}
export type CancelOrderMutationHookResult = ReturnType<typeof useCancelOrderMutation>;
export type CancelOrderMutationResult = Apollo.MutationResult<CancelOrderMutationResponse>;
export type CancelOrderMutationOptions = Apollo.BaseMutationOptions<
  CancelOrderMutationResponse,
  CancelOrderMutationVariables
>;
