import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type CreateOrdersMutationVariables = Types.Exact<{
  input: Types.CreateOrdersInput;
}>;

export type CreateOrdersMutationResponse = { __typename?: 'Mutation' } & {
  createOrders: Array<{ __typename?: 'OrderEntity' } & Pick<Types.OrderEntity, 'id'>>;
};

export const CreateOrdersDocument = gql`
  mutation createOrders($input: CreateOrdersInput!) {
    createOrders(input: $input) {
      id
    }
  }
`;
export function useCreateOrdersMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateOrdersMutationResponse, CreateOrdersMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateOrdersMutationResponse, CreateOrdersMutationVariables>(CreateOrdersDocument, options);
}
export type CreateOrdersMutationHookResult = ReturnType<typeof useCreateOrdersMutation>;
export type CreateOrdersMutationResult = Apollo.MutationResult<CreateOrdersMutationResponse>;
export type CreateOrdersMutationOptions = Apollo.BaseMutationOptions<
  CreateOrdersMutationResponse,
  CreateOrdersMutationVariables
>;
