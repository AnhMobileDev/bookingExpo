import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerCheckEmailOrPasswordIsUsedQueryVariables = Types.Exact<{
  input: Types.PartnerCheckEmailOrPasswordIsUsedInput;
}>;

export type PartnerCheckEmailOrPasswordIsUsedQueryResponse = { __typename?: 'Query' } & Pick<
  Types.Query,
  'partnerCheckEmailOrPasswordIsUsed'
>;

export const PartnerCheckEmailOrPasswordIsUsedDocument = gql`
  query partnerCheckEmailOrPasswordIsUsed($input: PartnerCheckEmailOrPasswordIsUsedInput!) {
    partnerCheckEmailOrPasswordIsUsed(input: $input)
  }
`;
export function usePartnerCheckEmailOrPasswordIsUsedQuery(
  baseOptions: Apollo.QueryHookOptions<
    PartnerCheckEmailOrPasswordIsUsedQueryResponse,
    PartnerCheckEmailOrPasswordIsUsedQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    PartnerCheckEmailOrPasswordIsUsedQueryResponse,
    PartnerCheckEmailOrPasswordIsUsedQueryVariables
  >(PartnerCheckEmailOrPasswordIsUsedDocument, options);
}
export function usePartnerCheckEmailOrPasswordIsUsedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PartnerCheckEmailOrPasswordIsUsedQueryResponse,
    PartnerCheckEmailOrPasswordIsUsedQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PartnerCheckEmailOrPasswordIsUsedQueryResponse,
    PartnerCheckEmailOrPasswordIsUsedQueryVariables
  >(PartnerCheckEmailOrPasswordIsUsedDocument, options);
}
export type PartnerCheckEmailOrPasswordIsUsedQueryHookResult = ReturnType<
  typeof usePartnerCheckEmailOrPasswordIsUsedQuery
>;
export type PartnerCheckEmailOrPasswordIsUsedLazyQueryHookResult = ReturnType<
  typeof usePartnerCheckEmailOrPasswordIsUsedLazyQuery
>;
export type PartnerCheckEmailOrPasswordIsUsedQueryResult = Apollo.QueryResult<
  PartnerCheckEmailOrPasswordIsUsedQueryResponse,
  PartnerCheckEmailOrPasswordIsUsedQueryVariables
>;
