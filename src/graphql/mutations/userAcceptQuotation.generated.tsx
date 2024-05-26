import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserAcceptQuotationMutationVariables = Types.Exact<{
  quotationId: Types.Scalars['String'];
}>;

export type UserAcceptQuotationMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'userAcceptQuotation'
>;

export const UserAcceptQuotationDocument = gql`
  mutation userAcceptQuotation($quotationId: String!) {
    userAcceptQuotation(quotationId: $quotationId)
  }
`;
export function useUserAcceptQuotationMutation(
  baseOptions?: Apollo.MutationHookOptions<UserAcceptQuotationMutationResponse, UserAcceptQuotationMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UserAcceptQuotationMutationResponse, UserAcceptQuotationMutationVariables>(
    UserAcceptQuotationDocument,
    options,
  );
}
export type UserAcceptQuotationMutationHookResult = ReturnType<typeof useUserAcceptQuotationMutation>;
export type UserAcceptQuotationMutationResult = Apollo.MutationResult<UserAcceptQuotationMutationResponse>;
export type UserAcceptQuotationMutationOptions = Apollo.BaseMutationOptions<
  UserAcceptQuotationMutationResponse,
  UserAcceptQuotationMutationVariables
>;
