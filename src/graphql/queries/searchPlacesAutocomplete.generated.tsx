import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type SearchPlacesAutocompleteQueryVariables = Types.Exact<{
  input: Types.SearchPlacesArgs;
}>;

export type SearchPlacesAutocompleteQueryResponse = { __typename?: 'Query' } & {
  searchPlacesAutocomplete: Array<
    { __typename?: 'SearchPlace' } & Pick<Types.SearchPlace, 'address' | 'name' | 'place_id'>
  >;
};

export const SearchPlacesAutocompleteDocument = gql`
  query searchPlacesAutocomplete($input: SearchPlacesArgs!) {
    searchPlacesAutocomplete(input: $input) {
      address
      name
      place_id
    }
  }
`;
export function useSearchPlacesAutocompleteQuery(
  baseOptions: Apollo.QueryHookOptions<SearchPlacesAutocompleteQueryResponse, SearchPlacesAutocompleteQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SearchPlacesAutocompleteQueryResponse, SearchPlacesAutocompleteQueryVariables>(
    SearchPlacesAutocompleteDocument,
    options,
  );
}
export function useSearchPlacesAutocompleteLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SearchPlacesAutocompleteQueryResponse,
    SearchPlacesAutocompleteQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SearchPlacesAutocompleteQueryResponse, SearchPlacesAutocompleteQueryVariables>(
    SearchPlacesAutocompleteDocument,
    options,
  );
}
export type SearchPlacesAutocompleteQueryHookResult = ReturnType<typeof useSearchPlacesAutocompleteQuery>;
export type SearchPlacesAutocompleteLazyQueryHookResult = ReturnType<typeof useSearchPlacesAutocompleteLazyQuery>;
export type SearchPlacesAutocompleteQueryResult = Apollo.QueryResult<
  SearchPlacesAutocompleteQueryResponse,
  SearchPlacesAutocompleteQueryVariables
>;
