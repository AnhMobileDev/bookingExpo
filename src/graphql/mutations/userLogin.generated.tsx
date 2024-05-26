import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { UserFragmentFragmentDoc } from '../fragments/user.fragment.generated';

const defaultOptions = {} as const;
export type UserLoginMutationVariables = Types.Exact<{
  input: Types.UserLoginInput;
}>;

export type UserLoginMutationResponse = { __typename?: 'Mutation' } & {
  userLogin: { __typename?: 'AuthConnection' } & Pick<Types.AuthConnection, 'accessToken' | 'refreshToken'> & {
      user: { __typename?: 'UserEntity' } & Pick<
        Types.UserEntity,
        'address' | 'birthday' | 'certificate' | 'email' | 'fullname' | 'id' | 'isActive' | 'phone' | 'updatedAt'
      > & {
          avatar?: Types.Maybe<{ __typename?: 'Media' } & Pick<Types.Media, 'id' | 'fullOriginalUrl' | 'fullThumbUrl'>>;
        };
    };
};

export const UserLoginDocument = gql`
  mutation userLogin($input: UserLoginInput!) {
    userLogin(input: $input) {
      accessToken
      refreshToken
      user {
        ...UserFragment
      }
    }
  }
  ${UserFragmentFragmentDoc}
`;
export function useUserLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<UserLoginMutationResponse, UserLoginMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UserLoginMutationResponse, UserLoginMutationVariables>(UserLoginDocument, options);
}
export type UserLoginMutationHookResult = ReturnType<typeof useUserLoginMutation>;
export type UserLoginMutationResult = Apollo.MutationResult<UserLoginMutationResponse>;
export type UserLoginMutationOptions = Apollo.BaseMutationOptions<
  UserLoginMutationResponse,
  UserLoginMutationVariables
>;
