import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type ReviewsOfProductQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  productId: Types.Scalars['String'];
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
  star?: Types.InputMaybe<Types.Scalars['Float']>;
  type: Types.ReviewTypeEnum;
}>;

export type ReviewsOfProductQueryResponse = { __typename?: 'Query' } & {
  reviewsOfProduct: { __typename?: 'ReviewConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'ReviewEntity' } & Pick<
          Types.ReviewEntity,
          | 'assessorId'
          | 'bookingId'
          | 'comment'
          | 'createdAt'
          | 'deletedAt'
          | 'id'
          | 'orderId'
          | 'personEvaluatedId'
          | 'productId'
          | 'star'
          | 'type'
          | 'updatedAt'
        > & {
            userAssessor?: Types.Maybe<
              { __typename?: 'UserEntity' } & Pick<
                Types.UserEntity,
                'email' | 'fullname' | 'id' | 'phone' | 'isActive'
              > & { avatar?: Types.Maybe<{ __typename?: 'Media' } & Pick<Types.Media, 'fullThumbUrl'>> }
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

export const ReviewsOfProductDocument = gql`
  query reviewsOfProduct(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $limit: Int
    $page: Int
    $productId: String!
    $search: String
    $sort: SortInput
    $star: Float
    $type: ReviewTypeEnum!
  ) {
    reviewsOfProduct(
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      limit: $limit
      page: $page
      productId: $productId
      search: $search
      sort: $sort
      star: $star
      type: $type
    ) {
      items {
        assessorId
        bookingId
        comment
        createdAt
        deletedAt
        id
        orderId
        personEvaluatedId
        productId
        star
        type
        updatedAt
        userAssessor {
          email
          fullname
          id
          phone
          isActive
          avatar {
            fullThumbUrl
          }
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
export function useReviewsOfProductQuery(
  baseOptions: Apollo.QueryHookOptions<ReviewsOfProductQueryResponse, ReviewsOfProductQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ReviewsOfProductQueryResponse, ReviewsOfProductQueryVariables>(
    ReviewsOfProductDocument,
    options,
  );
}
export function useReviewsOfProductLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ReviewsOfProductQueryResponse, ReviewsOfProductQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ReviewsOfProductQueryResponse, ReviewsOfProductQueryVariables>(
    ReviewsOfProductDocument,
    options,
  );
}
export type ReviewsOfProductQueryHookResult = ReturnType<typeof useReviewsOfProductQuery>;
export type ReviewsOfProductLazyQueryHookResult = ReturnType<typeof useReviewsOfProductLazyQuery>;
export type ReviewsOfProductQueryResult = Apollo.QueryResult<
  ReviewsOfProductQueryResponse,
  ReviewsOfProductQueryVariables
>;
