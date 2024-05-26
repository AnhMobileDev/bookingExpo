import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserGetInvoiceQueryVariables = Types.Exact<{
  settlementId: Types.Scalars['String'];
}>;

export type UserGetInvoiceQueryResponse = { __typename?: 'Query' } & {
  userGetInvoice: { __typename?: 'Media' } & Pick<Types.Media, 'fullOriginalUrl' | 'id' | 'name'>;
};

export const UserGetInvoiceDocument = gql`
  query userGetInvoice($settlementId: String!) {
    userGetInvoice(settlementId: $settlementId) {
      fullOriginalUrl
      id
      name
    }
  }
`;
export function useUserGetInvoiceQuery(
  baseOptions: Apollo.QueryHookOptions<UserGetInvoiceQueryResponse, UserGetInvoiceQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserGetInvoiceQueryResponse, UserGetInvoiceQueryVariables>(UserGetInvoiceDocument, options);
}
export function useUserGetInvoiceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserGetInvoiceQueryResponse, UserGetInvoiceQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserGetInvoiceQueryResponse, UserGetInvoiceQueryVariables>(
    UserGetInvoiceDocument,
    options,
  );
}
export type UserGetInvoiceQueryHookResult = ReturnType<typeof useUserGetInvoiceQuery>;
export type UserGetInvoiceLazyQueryHookResult = ReturnType<typeof useUserGetInvoiceLazyQuery>;
export type UserGetInvoiceQueryResult = Apollo.QueryResult<UserGetInvoiceQueryResponse, UserGetInvoiceQueryVariables>;
