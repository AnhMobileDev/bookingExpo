import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type RecreateOrderMutationVariables = Types.Exact<{
  input: Types.ReCreateOrderInput;
}>;

export type RecreateOrderMutationResponse = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'recreateOrder'>;

export const RecreateOrderDocument = gql`
  mutation recreateOrder($input: ReCreateOrderInput!) {
    recreateOrder(input: $input)
  }
`;
export function useRecreateOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<RecreateOrderMutationResponse, RecreateOrderMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RecreateOrderMutationResponse, RecreateOrderMutationVariables>(
    RecreateOrderDocument,
    options,
  );
}
export type RecreateOrderMutationHookResult = ReturnType<typeof useRecreateOrderMutation>;
export type RecreateOrderMutationResult = Apollo.MutationResult<RecreateOrderMutationResponse>;
export type RecreateOrderMutationOptions = Apollo.BaseMutationOptions<
  RecreateOrderMutationResponse,
  RecreateOrderMutationVariables
>;
