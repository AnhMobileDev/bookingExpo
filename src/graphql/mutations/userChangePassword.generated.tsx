import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserChangePasswordMutationVariables = Types.Exact<{
  input: Types.UserChangePasswordInput;
}>;

export type UserChangePasswordMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'userChangePassword'
>;

export const UserChangePasswordDocument = gql`
  mutation userChangePassword($input: UserChangePasswordInput!) {
    userChangePassword(input: $input)
  }
`;
export function useUserChangePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<UserChangePasswordMutationResponse, UserChangePasswordMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UserChangePasswordMutationResponse, UserChangePasswordMutationVariables>(
    UserChangePasswordDocument,
    options,
  );
}
export type UserChangePasswordMutationHookResult = ReturnType<typeof useUserChangePasswordMutation>;
export type UserChangePasswordMutationResult = Apollo.MutationResult<UserChangePasswordMutationResponse>;
export type UserChangePasswordMutationOptions = Apollo.BaseMutationOptions<
  UserChangePasswordMutationResponse,
  UserChangePasswordMutationVariables
>;
