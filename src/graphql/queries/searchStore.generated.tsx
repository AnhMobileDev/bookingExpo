import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type SearchStoreQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  isNew?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  partnerId?: Types.InputMaybe<Types.Scalars['String']>;
  search: Types.Scalars['String'];
  sort?: Types.InputMaybe<Types.SortInput>;
  type?: Types.InputMaybe<Types.ProductTypeEnum>;
}>;

export type SearchStoreQueryResponse = { __typename?: 'Query' } & {
  searchStore: { __typename?: 'PartnerConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'PartnerEntity' } & Pick<
          Types.PartnerEntity,
          'addressMoreInfo' | 'fullname' | 'id' | 'isAdmin' | 'phone' | 'suggestionPoint' | 'type' | 'updatedAt'
        > & {
            avatar?: Types.Maybe<{ __typename?: 'Media' } & Pick<Types.Media, 'fullThumbUrl' | 'id'>>;
            qualifications?: Types.Maybe<
              Array<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'name'>>
            >;
            storeReviewSummary?: Types.Maybe<
              { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'percent' | 'starAverage' | 'total'>
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

export const SearchStoreDocument = gql`
  query searchStore(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $isNew: Boolean
    $limit: Int
    $page: Int
    $partnerId: String
    $search: String!
    $sort: SortInput
    $type: ProductTypeEnum
  ) {
    searchStore(
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      isNew: $isNew
      limit: $limit
      page: $page
      partnerId: $partnerId
      search: $search
      sort: $sort
      type: $type
    ) {
      items {
        addressMoreInfo
        avatar {
          fullThumbUrl
          id
        }
        fullname
        id
        isAdmin
        phone
        qualifications {
          id
          name
        }
        storeReviewSummary {
          percent
          starAverage
          total
        }
        suggestionPoint
        type
        updatedAt
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
export function useSearchStoreQuery(
  baseOptions: Apollo.QueryHookOptions<SearchStoreQueryResponse, SearchStoreQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SearchStoreQueryResponse, SearchStoreQueryVariables>(SearchStoreDocument, options);
}
export function useSearchStoreLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SearchStoreQueryResponse, SearchStoreQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SearchStoreQueryResponse, SearchStoreQueryVariables>(SearchStoreDocument, options);
}
export type SearchStoreQueryHookResult = ReturnType<typeof useSearchStoreQuery>;
export type SearchStoreLazyQueryHookResult = ReturnType<typeof useSearchStoreLazyQuery>;
export type SearchStoreQueryResult = Apollo.QueryResult<SearchStoreQueryResponse, SearchStoreQueryVariables>;
