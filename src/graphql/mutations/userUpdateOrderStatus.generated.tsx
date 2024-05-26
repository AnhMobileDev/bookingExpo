import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserUpdateOrderStatusMutationVariables = Types.Exact<{
  input: Types.UpdateOrderInput;
}>;

export type UserUpdateOrderStatusMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'userUpdateOrderStatus'
>;

export const UserUpdateOrderStatusDocument = gql`
  mutation userUpdateOrderStatus($input: UpdateOrderInput!) {
    userUpdateOrderStatus(input: $input)
  }
`;
export function useUserUpdateOrderStatusMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UserUpdateOrderStatusMutationResponse,
    UserUpdateOrderStatusMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UserUpdateOrderStatusMutationResponse, UserUpdateOrderStatusMutationVariables>(
    UserUpdateOrderStatusDocument,
    options,
  );
}
export type UserUpdateOrderStatusMutationHookResult = ReturnType<typeof useUserUpdateOrderStatusMutation>;
export type UserUpdateOrderStatusMutationResult = Apollo.MutationResult<UserUpdateOrderStatusMutationResponse>;
export type UserUpdateOrderStatusMutationOptions = Apollo.BaseMutationOptions<
  UserUpdateOrderStatusMutationResponse,
  UserUpdateOrderStatusMutationVariables
>;
