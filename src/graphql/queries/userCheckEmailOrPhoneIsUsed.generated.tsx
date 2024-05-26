import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserCheckEmailOrPhoneIsUsedQueryVariables = Types.Exact<{
  input: Types.UserCheckEmailOrPhoneIsUsed;
}>;

export type UserCheckEmailOrPhoneIsUsedQueryResponse = { __typename?: 'Query' } & Pick<
  Types.Query,
  'userCheckEmailOrPhoneIsUsed'
>;

export const UserCheckEmailOrPhoneIsUsedDocument = gql`
  query userCheckEmailOrPhoneIsUsed($input: UserCheckEmailOrPhoneIsUsed!) {
    userCheckEmailOrPhoneIsUsed(input: $input)
  }
`;
export function useUserCheckEmailOrPhoneIsUsedQuery(
  baseOptions: Apollo.QueryHookOptions<
    UserCheckEmailOrPhoneIsUsedQueryResponse,
    UserCheckEmailOrPhoneIsUsedQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserCheckEmailOrPhoneIsUsedQueryResponse, UserCheckEmailOrPhoneIsUsedQueryVariables>(
    UserCheckEmailOrPhoneIsUsedDocument,
    options,
  );
}
export function useUserCheckEmailOrPhoneIsUsedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserCheckEmailOrPhoneIsUsedQueryResponse,
    UserCheckEmailOrPhoneIsUsedQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserCheckEmailOrPhoneIsUsedQueryResponse, UserCheckEmailOrPhoneIsUsedQueryVariables>(
    UserCheckEmailOrPhoneIsUsedDocument,
    options,
  );
}
export type UserCheckEmailOrPhoneIsUsedQueryHookResult = ReturnType<typeof useUserCheckEmailOrPhoneIsUsedQuery>;
export type UserCheckEmailOrPhoneIsUsedLazyQueryHookResult = ReturnType<typeof useUserCheckEmailOrPhoneIsUsedLazyQuery>;
export type UserCheckEmailOrPhoneIsUsedQueryResult = Apollo.QueryResult<
  UserCheckEmailOrPhoneIsUsedQueryResponse,
  UserCheckEmailOrPhoneIsUsedQueryVariables
>;
