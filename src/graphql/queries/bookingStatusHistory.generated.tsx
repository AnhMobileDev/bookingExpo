import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type BookingStatusHistoryQueryVariables = Types.Exact<{
  bookingId: Types.Scalars['String'];
}>;

export type BookingStatusHistoryQueryResponse = { __typename?: 'Query' } & {
  bookingStatusHistory: Array<
    { __typename?: 'BookingStatusEntity' } & Pick<
      Types.BookingStatusEntity,
      'bookingId' | 'createdAt' | 'id' | 'note' | 'partnerId' | 'status' | 'userId'
    >
  >;
};

export const BookingStatusHistoryDocument = gql`
  query bookingStatusHistory($bookingId: String!) {
    bookingStatusHistory(bookingId: $bookingId) {
      bookingId
      createdAt
      id
      note
      partnerId
      status
      userId
    }
  }
`;
export function useBookingStatusHistoryQuery(
  baseOptions: Apollo.QueryHookOptions<BookingStatusHistoryQueryResponse, BookingStatusHistoryQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BookingStatusHistoryQueryResponse, BookingStatusHistoryQueryVariables>(
    BookingStatusHistoryDocument,
    options,
  );
}
export function useBookingStatusHistoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BookingStatusHistoryQueryResponse, BookingStatusHistoryQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BookingStatusHistoryQueryResponse, BookingStatusHistoryQueryVariables>(
    BookingStatusHistoryDocument,
    options,
  );
}
export type BookingStatusHistoryQueryHookResult = ReturnType<typeof useBookingStatusHistoryQuery>;
export type BookingStatusHistoryLazyQueryHookResult = ReturnType<typeof useBookingStatusHistoryLazyQuery>;
export type BookingStatusHistoryQueryResult = Apollo.QueryResult<
  BookingStatusHistoryQueryResponse,
  BookingStatusHistoryQueryVariables
>;
