import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserFavoriteProductsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
}>;

export type UserFavoriteProductsQueryResponse = { __typename?: 'Query' } & {
  userFavoriteProducts: { __typename?: 'ProductConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'ProductEntity' } & Pick<
          Types.ProductEntity,
          | 'avatarId'
          | 'createdAt'
          | 'deletedAt'
          | 'descriptionImageIds'
          | 'detail'
          | 'id'
          | 'isActive'
          | 'isFixedCost'
          | 'isNew'
          | 'name'
          | 'operatingNumber'
          | 'operatingUnit'
          | 'ordinalNumber'
          | 'partNumber'
          | 'partnerId'
          | 'quantity'
          | 'serialNumber'
          | 'type'
          | 'unitPrice'
          | 'updatedAt'
          | 'vehicleRegistrationPlate'
          | 'vinNumber'
          | 'yearOfManufacture'
        > & {
            avatar?: Types.Maybe<
              { __typename?: 'Media' } & Pick<
                Types.Media,
                | 'createdAt'
                | 'fileSize'
                | 'fullOriginalUrl'
                | 'fullThumbUrl'
                | 'id'
                | 'isDeleted'
                | 'mimeType'
                | 'name'
                | 'originalUrl'
                | 'ownerId'
                | 'thumbUrl'
                | 'type'
                | 'updatedAt'
                | 'videoUrl'
              >
            >;
            descriptionImages: Array<
              { __typename?: 'Media' } & Pick<
                Types.Media,
                | 'createdAt'
                | 'fileSize'
                | 'fullOriginalUrl'
                | 'fullThumbUrl'
                | 'id'
                | 'isDeleted'
                | 'mimeType'
                | 'name'
                | 'originalUrl'
                | 'ownerId'
                | 'thumbUrl'
                | 'type'
                | 'updatedAt'
                | 'videoUrl'
              >
            >;
            manufacturer?: Types.Maybe<
              { __typename?: 'CategoryEntity' } & Pick<
                Types.CategoryEntity,
                'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
              >
            >;
            model?: Types.Maybe<
              { __typename?: 'CategoryEntity' } & Pick<
                Types.CategoryEntity,
                'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
              >
            >;
            origin?: Types.Maybe<
              { __typename?: 'CategoryEntity' } & Pick<
                Types.CategoryEntity,
                'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
              >
            >;
            partOfProduct?: Types.Maybe<
              { __typename?: 'CategoryEntity' } & Pick<
                Types.CategoryEntity,
                'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
              >
            >;
            partner?: Types.Maybe<
              { __typename?: 'PartnerEntity' } & Pick<
                Types.PartnerEntity,
                | 'addressMoreInfo'
                | 'avatarId'
                | 'bank'
                | 'birthday'
                | 'cardNumber'
                | 'citizenId'
                | 'countProduct'
                | 'countTechnician'
                | 'createdAt'
                | 'deletedAt'
                | 'description'
                | 'email'
                | 'fullname'
                | 'hotline'
                | 'id'
                | 'isActive'
                | 'isApproved'
                | 'latitude'
                | 'longitude'
                | 'mapAddress'
                | 'parentId'
                | 'phone'
                | 'star'
                | 'suggestionPoint'
                | 'type'
                | 'updatedAt'
              >
            >;
            productType?: Types.Maybe<
              { __typename?: 'CategoryEntity' } & Pick<
                Types.CategoryEntity,
                'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
              >
            >;
            productUnit?: Types.Maybe<
              { __typename?: 'CategoryEntity' } & Pick<
                Types.CategoryEntity,
                'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
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

export const UserFavoriteProductsDocument = gql`
  query userFavoriteProducts(
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $limit: Int
    $page: Int
    $search: String
    $sort: SortInput
  ) {
    userFavoriteProducts(
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      limit: $limit
      page: $page
      search: $search
      sort: $sort
    ) {
      items {
        avatar {
          createdAt
          fileSize
          fullOriginalUrl
          fullThumbUrl
          id
          isDeleted
          mimeType
          name
          originalUrl
          ownerId
          thumbUrl
          type
          updatedAt
          videoUrl
        }
        avatarId
        createdAt
        deletedAt
        descriptionImageIds
        descriptionImages {
          createdAt
          fileSize
          fullOriginalUrl
          fullThumbUrl
          id
          isDeleted
          mimeType
          name
          originalUrl
          ownerId
          thumbUrl
          type
          updatedAt
          videoUrl
        }
        detail
        id
        isActive
        isFixedCost
        isNew
        manufacturer {
          createdAt
          deletedAt
          id
          isActive
          name
          type
          updatedAt
        }
        model {
          createdAt
          deletedAt
          id
          isActive
          name
          type
          updatedAt
        }
        name
        operatingNumber
        operatingUnit
        ordinalNumber
        origin {
          createdAt
          deletedAt
          id
          isActive
          name
          type
          updatedAt
        }
        partNumber
        partOfProduct {
          createdAt
          deletedAt
          id
          isActive
          name
          type
          updatedAt
        }
        partner {
          addressMoreInfo
          avatarId
          bank
          birthday
          cardNumber
          citizenId
          countProduct
          countTechnician
          createdAt
          deletedAt
          description
          email
          fullname
          hotline
          id
          isActive
          isApproved
          latitude
          longitude
          mapAddress
          parentId
          phone
          star
          suggestionPoint
          type
          updatedAt
        }
        partnerId
        productType {
          createdAt
          deletedAt
          id
          isActive
          name
          type
          updatedAt
        }
        productUnit {
          createdAt
          deletedAt
          id
          isActive
          name
          type
          updatedAt
        }
        quantity
        serialNumber
        type
        unitPrice
        updatedAt
        vehicleRegistrationPlate
        vinNumber
        yearOfManufacture
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
export function useUserFavoriteProductsQuery(
  baseOptions?: Apollo.QueryHookOptions<UserFavoriteProductsQueryResponse, UserFavoriteProductsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserFavoriteProductsQueryResponse, UserFavoriteProductsQueryVariables>(
    UserFavoriteProductsDocument,
    options,
  );
}
export function useUserFavoriteProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserFavoriteProductsQueryResponse, UserFavoriteProductsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserFavoriteProductsQueryResponse, UserFavoriteProductsQueryVariables>(
    UserFavoriteProductsDocument,
    options,
  );
}
export type UserFavoriteProductsQueryHookResult = ReturnType<typeof useUserFavoriteProductsQuery>;
export type UserFavoriteProductsLazyQueryHookResult = ReturnType<typeof useUserFavoriteProductsLazyQuery>;
export type UserFavoriteProductsQueryResult = Apollo.QueryResult<
  UserFavoriteProductsQueryResponse,
  UserFavoriteProductsQueryVariables
>;
