import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserSearchSuggestionsQueryVariables = Types.Exact<{
  search?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type UserSearchSuggestionsQueryResponse = { __typename?: 'Query' } & Pick<Types.Query, 'userSearchSuggestions'>;

export const UserSearchSuggestionsDocument = gql`
  query userSearchSuggestions($search: String) {
    userSearchSuggestions(search: $search)
  }
`;
export function useUserSearchSuggestionsQuery(
  baseOptions?: Apollo.QueryHookOptions<UserSearchSuggestionsQueryResponse, UserSearchSuggestionsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserSearchSuggestionsQueryResponse, UserSearchSuggestionsQueryVariables>(
    UserSearchSuggestionsDocument,
    options,
  );
}
export function useUserSearchSuggestionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserSearchSuggestionsQueryResponse, UserSearchSuggestionsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserSearchSuggestionsQueryResponse, UserSearchSuggestionsQueryVariables>(
    UserSearchSuggestionsDocument,
    options,
  );
}
export type UserSearchSuggestionsQueryHookResult = ReturnType<typeof useUserSearchSuggestionsQuery>;
export type UserSearchSuggestionsLazyQueryHookResult = ReturnType<typeof useUserSearchSuggestionsLazyQuery>;
export type UserSearchSuggestionsQueryResult = Apollo.QueryResult<
  UserSearchSuggestionsQueryResponse,
  UserSearchSuggestionsQueryVariables
>;
