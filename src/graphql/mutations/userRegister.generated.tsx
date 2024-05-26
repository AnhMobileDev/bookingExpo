import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserRegisterMutationVariables = Types.Exact<{
  input: Types.RegisterInput;
}>;

export type UserRegisterMutationResponse = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'userRegister'>;

export const UserRegisterDocument = gql`
  mutation userRegister($input: RegisterInput!) {
    userRegister(input: $input)
  }
`;
export function useUserRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<UserRegisterMutationResponse, UserRegisterMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UserRegisterMutationResponse, UserRegisterMutationVariables>(UserRegisterDocument, options);
}
export type UserRegisterMutationHookResult = ReturnType<typeof useUserRegisterMutation>;
export type UserRegisterMutationResult = Apollo.MutationResult<UserRegisterMutationResponse>;
export type UserRegisterMutationOptions = Apollo.BaseMutationOptions<
  UserRegisterMutationResponse,
  UserRegisterMutationVariables
>;
