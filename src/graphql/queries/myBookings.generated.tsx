import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type MyBookingsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
  statuses?: Types.InputMaybe<Array<Types.BookingStatusEnum> | Types.BookingStatusEnum>;
}>;

export type MyBookingsQueryResponse = { __typename?: 'Query' } & {
  myBookings: { __typename?: 'BookingConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'BookingEntity' } & Pick<
          Types.BookingEntity,
          | 'addressMoreInfo'
          | 'code'
          | 'createdAt'
          | 'deletedAt'
          | 'description'
          | 'id'
          | 'latitude'
          | 'longitude'
          | 'mapAddress'
          | 'partnerId'
          | 'problemTexts'
          | 'status'
          | 'transportDistance'
          | 'transportDuration'
          | 'transportFee'
          | 'updatedAt'
          | 'userId'
        > & {
            partner: { __typename?: 'PartnerEntity' } & Pick<Types.PartnerEntity, 'fullname' | 'hotline' | 'id'> & {
                avatar?: Types.Maybe<{ __typename?: 'Media' } & Pick<Types.Media, 'fullThumbUrl'>>;
              };
            problems?: Types.Maybe<
              Array<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'name'>>
            >;
            technician?: Types.Maybe<
              { __typename?: 'PartnerEntity' } & Pick<Types.PartnerEntity, 'fullname' | 'hotline' | 'id'> & {
                  avatar?: Types.Maybe<{ __typename?: 'Media' } & Pick<Types.Media, 'fullThumbUrl'>>;
                }
            >;
            vehicle: { __typename?: 'VehicleEntity' } & Pick<Types.VehicleEntity, 'avatarId' | 'name' | 'id'> & {
                avatar?: Types.Maybe<{ __typename?: 'Media' } & Pick<Types.Media, 'fullThumbUrl'>>;
              };
            settlementAccepted?: Types.Maybe<
              { __typename?: 'SettlementEntity' } & Pick<Types.SettlementEntity, 'id' | 'total'>
            >;
          }
      >
    >;
    meta: { __typename?: 'BasePaginationMeta' } & Pick<
      Types.BasePaginationMeta,
      'currentPage' | 'itemCount' | 'itemsPerPage' | 'totalItems' | 'totalPages'
    >;
  };
};

export const MyBookingsDocument = gql`
  query myBookings(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $limit: Int
    $page: Int
    $search: String
    $sort: SortInput
    $statuses: [BookingStatusEnum!]
  ) {
    myBookings(
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      limit: $limit
      page: $page
      search: $search
      sort: $sort
      statuses: $statuses
    ) {
      items {
        addressMoreInfo
        code
        createdAt
        deletedAt
        description
        id
        latitude
        longitude
        mapAddress
        partner {
          fullname
          hotline
          id
          avatar {
            fullThumbUrl
          }
        }
        partnerId
        problemTexts
        problems {
          id
          name
        }
        status
        technician {
          fullname
          hotline
          id
          avatar {
            fullThumbUrl
          }
        }
        transportDistance
        transportDuration
        transportFee
        updatedAt
        userId
        vehicle {
          avatarId
          avatar {
            fullThumbUrl
          }
          name
          id
        }
        settlementAccepted {
          id
          total
        }
      }
      meta {
        currentPage
        itemCount
        itemsPerPage
        totalItems
        totalPages
      }
    }
  }
`;
export function useMyBookingsQuery(
  baseOptions?: Apollo.QueryHookOptions<MyBookingsQueryResponse, MyBookingsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MyBookingsQueryResponse, MyBookingsQueryVariables>(MyBookingsDocument, options);
}
export function useMyBookingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MyBookingsQueryResponse, MyBookingsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MyBookingsQueryResponse, MyBookingsQueryVariables>(MyBookingsDocument, options);
}
export type MyBookingsQueryHookResult = ReturnType<typeof useMyBookingsQuery>;
export type MyBookingsLazyQueryHookResult = ReturnType<typeof useMyBookingsLazyQuery>;
export type MyBookingsQueryResult = Apollo.QueryResult<MyBookingsQueryResponse, MyBookingsQueryVariables>;
