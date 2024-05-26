import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserCreateOrderReviewMutationVariables = Types.Exact<{
  input: Types.CreateOrderReviewInput;
}>;

export type UserCreateOrderReviewMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'userCreateOrderReview'
>;

export const UserCreateOrderReviewDocument = gql`
  mutation userCreateOrderReview($input: CreateOrderReviewInput!) {
    userCreateOrderReview(input: $input)
  }
`;
export function useUserCreateOrderReviewMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UserCreateOrderReviewMutationResponse,
    UserCreateOrderReviewMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UserCreateOrderReviewMutationResponse, UserCreateOrderReviewMutationVariables>(
    UserCreateOrderReviewDocument,
    options,
  );
}
export type UserCreateOrderReviewMutationHookResult = ReturnType<typeof useUserCreateOrderReviewMutation>;
export type UserCreateOrderReviewMutationResult = Apollo.MutationResult<UserCreateOrderReviewMutationResponse>;
export type UserCreateOrderReviewMutationOptions = Apollo.BaseMutationOptions<
  UserCreateOrderReviewMutationResponse,
  UserCreateOrderReviewMutationVariables
>;
