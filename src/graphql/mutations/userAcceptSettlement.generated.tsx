import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserAcceptSettlementMutationVariables = Types.Exact<{
  settlementId: Types.Scalars['String'];
}>;

export type UserAcceptSettlementMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'userAcceptSettlement'
>;

export const UserAcceptSettlementDocument = gql`
  mutation userAcceptSettlement($settlementId: String!) {
    userAcceptSettlement(settlementId: $settlementId)
  }
`;
export function useUserAcceptSettlementMutation(
  baseOptions?: Apollo.MutationHookOptions<UserAcceptSettlementMutationResponse, UserAcceptSettlementMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UserAcceptSettlementMutationResponse, UserAcceptSettlementMutationVariables>(
    UserAcceptSettlementDocument,
    options,
  );
}
export type UserAcceptSettlementMutationHookResult = ReturnType<typeof useUserAcceptSettlementMutation>;
export type UserAcceptSettlementMutationResult = Apollo.MutationResult<UserAcceptSettlementMutationResponse>;
export type UserAcceptSettlementMutationOptions = Apollo.BaseMutationOptions<
  UserAcceptSettlementMutationResponse,
  UserAcceptSettlementMutationVariables
>;
