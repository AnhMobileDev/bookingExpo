import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserBookingQuotationsQueryVariables = Types.Exact<{
  bookingId: Types.Scalars['String'];
}>;

export type UserBookingQuotationsQueryResponse = { __typename?: 'Query' } & {
  userBookingQuotations: Array<{ __typename?: 'QuotationEntity' } & Pick<Types.QuotationEntity, 'id' | 'createdAt'>>;
};

export const UserBookingQuotationsDocument = gql`
  query userBookingQuotations($bookingId: String!) {
    userBookingQuotations(bookingId: $bookingId) {
      id
      createdAt
    }
  }
`;
export function useUserBookingQuotationsQuery(
  baseOptions: Apollo.QueryHookOptions<UserBookingQuotationsQueryResponse, UserBookingQuotationsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserBookingQuotationsQueryResponse, UserBookingQuotationsQueryVariables>(
    UserBookingQuotationsDocument,
    options,
  );
}
export function useUserBookingQuotationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserBookingQuotationsQueryResponse, UserBookingQuotationsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserBookingQuotationsQueryResponse, UserBookingQuotationsQueryVariables>(
    UserBookingQuotationsDocument,
    options,
  );
}
export type UserBookingQuotationsQueryHookResult = ReturnType<typeof useUserBookingQuotationsQuery>;
export type UserBookingQuotationsLazyQueryHookResult = ReturnType<typeof useUserBookingQuotationsLazyQuery>;
export type UserBookingQuotationsQueryResult = Apollo.QueryResult<
  UserBookingQuotationsQueryResponse,
  UserBookingQuotationsQueryVariables
>;
