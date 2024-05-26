import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserSummaryQueryVariables = Types.Exact<{
  input: Types.UserSummaryInput;
}>;

export type UserSummaryQueryResponse = { __typename?: 'Query' } & {
  userSummary: { __typename?: 'UserSummary' } & Pick<Types.UserSummary, 'activeBooking' | 'activeMaintenance'>;
};

export const UserSummaryDocument = gql`
  query userSummary($input: UserSummaryInput!) {
    userSummary(input: $input) {
      activeBooking
      activeMaintenance
    }
  }
`;
export function useUserSummaryQuery(
  baseOptions: Apollo.QueryHookOptions<UserSummaryQueryResponse, UserSummaryQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserSummaryQueryResponse, UserSummaryQueryVariables>(UserSummaryDocument, options);
}
export function useUserSummaryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserSummaryQueryResponse, UserSummaryQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserSummaryQueryResponse, UserSummaryQueryVariables>(UserSummaryDocument, options);
}
export type UserSummaryQueryHookResult = ReturnType<typeof useUserSummaryQuery>;
export type UserSummaryLazyQueryHookResult = ReturnType<typeof useUserSummaryLazyQuery>;
export type UserSummaryQueryResult = Apollo.QueryResult<UserSummaryQueryResponse, UserSummaryQueryVariables>;
