import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserForgotPasswordMutationVariables = Types.Exact<{
  input: Types.UserForgotPasswordInput;
}>;

export type UserForgotPasswordMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'userForgotPassword'
>;

export const UserForgotPasswordDocument = gql`
  mutation userForgotPassword($input: UserForgotPasswordInput!) {
    userForgotPassword(input: $input)
  }
`;
export function useUserForgotPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<UserForgotPasswordMutationResponse, UserForgotPasswordMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UserForgotPasswordMutationResponse, UserForgotPasswordMutationVariables>(
    UserForgotPasswordDocument,
    options,
  );
}
export type UserForgotPasswordMutationHookResult = ReturnType<typeof useUserForgotPasswordMutation>;
export type UserForgotPasswordMutationResult = Apollo.MutationResult<UserForgotPasswordMutationResponse>;
export type UserForgotPasswordMutationOptions = Apollo.BaseMutationOptions<
  UserForgotPasswordMutationResponse,
  UserForgotPasswordMutationVariables
>;
