import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserGetGuidesQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
}>;

export type UserGetGuidesQueryResponse = { __typename?: 'Query' } & {
  userGetGuides: { __typename?: 'GuideConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'GuideEntity' } & Pick<
          Types.GuideEntity,
          'createdAt' | 'deletedAt' | 'description' | 'id' | 'isActive' | 'name' | 'updatedAt'
        > & {
            instructions?: Types.Maybe<
              Array<
                { __typename?: 'InstructionEntity' } & Pick<
                  Types.InstructionEntity,
                  'createdAt' | 'deletedAt' | 'description' | 'guideId' | 'id' | 'isActive' | 'name' | 'updatedAt'
                >
              >
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

export const UserGetGuidesDocument = gql`
  query userGetGuides(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $limit: Int
    $page: Int
    $search: String
    $sort: SortInput
  ) {
    userGetGuides(
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      limit: $limit
      page: $page
      search: $search
      sort: $sort
    ) {
      items {
        createdAt
        deletedAt
        description
        id
        instructions {
          createdAt
          deletedAt
          description
          guideId
          id
          isActive
          name
          updatedAt
        }
        isActive
        name
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
export function useUserGetGuidesQuery(
  baseOptions?: Apollo.QueryHookOptions<UserGetGuidesQueryResponse, UserGetGuidesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserGetGuidesQueryResponse, UserGetGuidesQueryVariables>(UserGetGuidesDocument, options);
}
export function useUserGetGuidesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserGetGuidesQueryResponse, UserGetGuidesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserGetGuidesQueryResponse, UserGetGuidesQueryVariables>(UserGetGuidesDocument, options);
}
export type UserGetGuidesQueryHookResult = ReturnType<typeof useUserGetGuidesQuery>;
export type UserGetGuidesLazyQueryHookResult = ReturnType<typeof useUserGetGuidesLazyQuery>;
export type UserGetGuidesQueryResult = Apollo.QueryResult<UserGetGuidesQueryResponse, UserGetGuidesQueryVariables>;
