import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type CategoriesQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
  type: Types.CategoryTypeEnum;
}>;

export type CategoriesQueryResponse = { __typename?: 'Query' } & {
  categories: { __typename?: 'CategoryConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'CategoryEntity' } & Pick<
          Types.CategoryEntity,
          'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
        >
      >
    >;
    meta: { __typename?: 'BasePaginationMeta' } & Pick<
      Types.BasePaginationMeta,
      'currentPage' | 'itemCount' | 'itemsPerPage' | 'totalItems' | 'totalPages'
    >;
  };
};

export const CategoriesDocument = gql`
  query categories(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $limit: Int
    $page: Int
    $search: String
    $sort: SortInput
    $type: CategoryTypeEnum!
  ) {
    categories(
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      limit: $limit
      page: $page
      search: $search
      sort: $sort
      type: $type
    ) {
      items {
        createdAt
        deletedAt
        id
        isActive
        name
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
export function useCategoriesQuery(
  baseOptions: Apollo.QueryHookOptions<CategoriesQueryResponse, CategoriesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CategoriesQueryResponse, CategoriesQueryVariables>(CategoriesDocument, options);
}
export function useCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQueryResponse, CategoriesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CategoriesQueryResponse, CategoriesQueryVariables>(CategoriesDocument, options);
}
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQueryResponse, CategoriesQueryVariables>;
