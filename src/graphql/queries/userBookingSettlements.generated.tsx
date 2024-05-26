import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserBookingSettlementsQueryVariables = Types.Exact<{
  bookingId: Types.Scalars['String'];
}>;

export type UserBookingSettlementsQueryResponse = { __typename?: 'Query' } & {
  userBookingSettlements: Array<
    { __typename?: 'SettlementEntity' } & Pick<Types.SettlementEntity, 'bookingId' | 'createdAt' | 'id'>
  >;
};

export const UserBookingSettlementsDocument = gql`
  query userBookingSettlements($bookingId: String!) {
    userBookingSettlements(bookingId: $bookingId) {
      bookingId
      createdAt
      id
    }
  }
`;
export function useUserBookingSettlementsQuery(
  baseOptions: Apollo.QueryHookOptions<UserBookingSettlementsQueryResponse, UserBookingSettlementsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserBookingSettlementsQueryResponse, UserBookingSettlementsQueryVariables>(
    UserBookingSettlementsDocument,
    options,
  );
}
export function useUserBookingSettlementsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserBookingSettlementsQueryResponse, UserBookingSettlementsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserBookingSettlementsQueryResponse, UserBookingSettlementsQueryVariables>(
    UserBookingSettlementsDocument,
    options,
  );
}
export type UserBookingSettlementsQueryHookResult = ReturnType<typeof useUserBookingSettlementsQuery>;
export type UserBookingSettlementsLazyQueryHookResult = ReturnType<typeof useUserBookingSettlementsLazyQuery>;
export type UserBookingSettlementsQueryResult = Apollo.QueryResult<
  UserBookingSettlementsQueryResponse,
  UserBookingSettlementsQueryVariables
>;
