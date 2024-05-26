import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserRejectQuotationMutationVariables = Types.Exact<{
  input: Types.RejectQuotationInput;
}>;

export type UserRejectQuotationMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'userRejectQuotation'
>;

export const UserRejectQuotationDocument = gql`
  mutation userRejectQuotation($input: RejectQuotationInput!) {
    userRejectQuotation(input: $input)
  }
`;
export function useUserRejectQuotationMutation(
  baseOptions?: Apollo.MutationHookOptions<UserRejectQuotationMutationResponse, UserRejectQuotationMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UserRejectQuotationMutationResponse, UserRejectQuotationMutationVariables>(
    UserRejectQuotationDocument,
    options,
  );
}
export type UserRejectQuotationMutationHookResult = ReturnType<typeof useUserRejectQuotationMutation>;
export type UserRejectQuotationMutationResult = Apollo.MutationResult<UserRejectQuotationMutationResponse>;
export type UserRejectQuotationMutationOptions = Apollo.BaseMutationOptions<
  UserRejectQuotationMutationResponse,
  UserRejectQuotationMutationVariables
>;
