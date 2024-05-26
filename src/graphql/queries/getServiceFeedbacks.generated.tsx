import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type GetServiceFeedbacksQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
  status?: Types.InputMaybe<Types.ServiceFeedbacksStatusEnum>;
  type?: Types.InputMaybe<Types.ServiceFeedbackTypeEnum>;
}>;

export type GetServiceFeedbacksQueryResponse = { __typename?: 'Query' } & {
  getServiceFeedbacks: { __typename?: 'ServiceFeedbackConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'ServiceFeedbackEntity' } & Pick<
          Types.ServiceFeedbackEntity,
          | 'answer'
          | 'content'
          | 'createAt'
          | 'id'
          | 'imagesAnswerIds'
          | 'imagesIds'
          | 'partnerId'
          | 'status'
          | 'type'
          | 'updateAt'
          | 'userId'
        > & {
            images: Array<
              { __typename?: 'Media' } & Pick<
                Types.Media,
                'fullOriginalUrl' | 'fullThumbUrl' | 'id' | 'name' | 'originalUrl'
              >
            >;
            imagesAnswer: Array<
              { __typename?: 'Media' } & Pick<
                Types.Media,
                'fullOriginalUrl' | 'fullThumbUrl' | 'id' | 'name' | 'originalUrl' | 'videoUrl'
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

export const GetServiceFeedbacksDocument = gql`
  query getServiceFeedbacks(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $limit: Int
    $page: Int
    $search: String
    $sort: SortInput
    $status: ServiceFeedbacksStatusEnum
    $type: ServiceFeedbackTypeEnum
  ) {
    getServiceFeedbacks(
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      limit: $limit
      page: $page
      search: $search
      sort: $sort
      status: $status
      type: $type
    ) {
      items {
        answer
        content
        createAt
        id
        images {
          fullOriginalUrl
          fullThumbUrl
          id
          name
          originalUrl
        }
        imagesAnswer {
          fullOriginalUrl
          fullThumbUrl
          id
          name
          originalUrl
          videoUrl
        }
        imagesAnswerIds
        imagesIds
        partnerId
        status
        type
        updateAt
        userId
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
export function useGetServiceFeedbacksQuery(
  baseOptions?: Apollo.QueryHookOptions<GetServiceFeedbacksQueryResponse, GetServiceFeedbacksQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetServiceFeedbacksQueryResponse, GetServiceFeedbacksQueryVariables>(
    GetServiceFeedbacksDocument,
    options,
  );
}
export function useGetServiceFeedbacksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetServiceFeedbacksQueryResponse, GetServiceFeedbacksQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetServiceFeedbacksQueryResponse, GetServiceFeedbacksQueryVariables>(
    GetServiceFeedbacksDocument,
    options,
  );
}
export type GetServiceFeedbacksQueryHookResult = ReturnType<typeof useGetServiceFeedbacksQuery>;
export type GetServiceFeedbacksLazyQueryHookResult = ReturnType<typeof useGetServiceFeedbacksLazyQuery>;
export type GetServiceFeedbacksQueryResult = Apollo.QueryResult<
  GetServiceFeedbacksQueryResponse,
  GetServiceFeedbacksQueryVariables
>;
