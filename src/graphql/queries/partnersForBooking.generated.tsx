import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnersForBookingQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isAgency?: Types.InputMaybe<Types.Scalars['Boolean']>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  isTechnician?: Types.InputMaybe<Types.Scalars['Boolean']>;
  latitude: Types.Scalars['Float'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  longitude: Types.Scalars['Float'];
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
  sortBy?: Types.InputMaybe<Types.PartnersForBookingSortBy>;
}>;

export type PartnersForBookingQueryResponse = { __typename?: 'Query' } & {
  partnersForBooking?: Types.Maybe<
    { __typename?: 'PartnerConnection' } & {
      items?: Types.Maybe<
        Array<
          { __typename?: 'PartnerEntity' } & Pick<
            Types.PartnerEntity,
            | 'addressMoreInfo'
            | 'fullname'
            | 'hotline'
            | 'id'
            | 'isActive'
            | 'isApproved'
            | 'latitude'
            | 'longitude'
            | 'mapAddress'
            | 'phone'
            | 'star'
            | 'suggestionPoint'
            | 'type'
          > & {
              avatar?: Types.Maybe<
                { __typename?: 'Media' } & Pick<Types.Media, 'fullOriginalUrl' | 'fullThumbUrl' | 'id'>
              >;
              expenseInfo?: Types.Maybe<{ __typename?: 'Expense' } & Pick<Types.Expense, 'cost' | 'distance' | 'time'>>;
              qualifications?: Types.Maybe<
                Array<
                  { __typename?: 'CategoryEntity' } & Pick<
                    Types.CategoryEntity,
                    'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
                  >
                >
              >;
              reviewSummary?: Types.Maybe<
                { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'percent' | 'starAverage' | 'total'>
              >;
              starInfo: Array<{ __typename?: 'StarInfo' } & Pick<Types.StarInfo, 'star' | 'total'>>;
              storeStarInfo?: Types.Maybe<Array<{ __typename?: 'StarInfo' } & Pick<Types.StarInfo, 'star' | 'total'>>>;
            }
        >
      >;
      meta: { __typename?: 'BasePaginationMeta' } & Pick<
        Types.BasePaginationMeta,
        'currentPage' | 'itemCount' | 'itemsPerPage' | 'totalItems' | 'totalPages'
      >;
    }
  >;
};

export const PartnersForBookingDocument = gql`
  query partnersForBooking(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isAgency: Boolean
    $isApproved: Boolean
    $isTechnician: Boolean
    $latitude: Float!
    $limit: Int
    $longitude: Float!
    $page: Int
    $search: String
    $sort: SortInput
    $sortBy: PartnersForBookingSortBy
  ) {
    partnersForBooking(
      filters: $filters
      isActive: $isActive
      isAgency: $isAgency
      isApproved: $isApproved
      isTechnician: $isTechnician
      latitude: $latitude
      limit: $limit
      longitude: $longitude
      page: $page
      search: $search
      sort: $sort
      sortBy: $sortBy
    ) {
      items {
        addressMoreInfo
        avatar {
          fullOriginalUrl
          fullThumbUrl
          id
        }
        expenseInfo {
          cost
          distance
          time
        }
        fullname
        hotline
        id
        isActive
        isApproved
        latitude
        longitude
        mapAddress
        phone
        qualifications {
          id
          isActive
          name
          type
          updatedAt
        }
        reviewSummary {
          percent
          starAverage
          total
        }
        star
        starInfo {
          star
          total
        }
        storeStarInfo {
          star
          total
        }
        suggestionPoint
        type
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
export function usePartnersForBookingQuery(
  baseOptions: Apollo.QueryHookOptions<PartnersForBookingQueryResponse, PartnersForBookingQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PartnersForBookingQueryResponse, PartnersForBookingQueryVariables>(
    PartnersForBookingDocument,
    options,
  );
}
export function usePartnersForBookingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PartnersForBookingQueryResponse, PartnersForBookingQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PartnersForBookingQueryResponse, PartnersForBookingQueryVariables>(
    PartnersForBookingDocument,
    options,
  );
}
export type PartnersForBookingQueryHookResult = ReturnType<typeof usePartnersForBookingQuery>;
export type PartnersForBookingLazyQueryHookResult = ReturnType<typeof usePartnersForBookingLazyQuery>;
export type PartnersForBookingQueryResult = Apollo.QueryResult<
  PartnersForBookingQueryResponse,
  PartnersForBookingQueryVariables
>;
