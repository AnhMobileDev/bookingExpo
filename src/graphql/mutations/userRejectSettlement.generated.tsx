import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserRejectSettlementMutationVariables = Types.Exact<{
  input: Types.RejectSettlementInput;
}>;

export type UserRejectSettlementMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'userRejectSettlement'
>;

export const UserRejectSettlementDocument = gql`
  mutation userRejectSettlement($input: RejectSettlementInput!) {
    userRejectSettlement(input: $input)
  }
`;
export function useUserRejectSettlementMutation(
  baseOptions?: Apollo.MutationHookOptions<UserRejectSettlementMutationResponse, UserRejectSettlementMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UserRejectSettlementMutationResponse, UserRejectSettlementMutationVariables>(
    UserRejectSettlementDocument,
    options,
  );
}
export type UserRejectSettlementMutationHookResult = ReturnType<typeof useUserRejectSettlementMutation>;
export type UserRejectSettlementMutationResult = Apollo.MutationResult<UserRejectSettlementMutationResponse>;
export type UserRejectSettlementMutationOptions = Apollo.BaseMutationOptions<
  UserRejectSettlementMutationResponse,
  UserRejectSettlementMutationVariables
>;
