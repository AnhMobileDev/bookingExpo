import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserCreateReviewMutationVariables = Types.Exact<{
  input: Types.CreateReviewInput;
}>;

export type UserCreateReviewMutationResponse = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'userCreateReview'>;

export const UserCreateReviewDocument = gql`
  mutation userCreateReview($input: CreateReviewInput!) {
    userCreateReview(input: $input)
  }
`;
export function useUserCreateReviewMutation(
  baseOptions?: Apollo.MutationHookOptions<UserCreateReviewMutationResponse, UserCreateReviewMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UserCreateReviewMutationResponse, UserCreateReviewMutationVariables>(
    UserCreateReviewDocument,
    options,
  );
}
export type UserCreateReviewMutationHookResult = ReturnType<typeof useUserCreateReviewMutation>;
export type UserCreateReviewMutationResult = Apollo.MutationResult<UserCreateReviewMutationResponse>;
export type UserCreateReviewMutationOptions = Apollo.BaseMutationOptions<
  UserCreateReviewMutationResponse,
  UserCreateReviewMutationVariables
>;
