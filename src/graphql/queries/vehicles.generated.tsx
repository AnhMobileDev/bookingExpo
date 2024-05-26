import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type VehiclesQueryVariables = Types.Exact<{
  excludeActiveBooking?: Types.InputMaybe<Types.Scalars['Boolean']>;
  excludeActiveMaintenance?: Types.InputMaybe<Types.Scalars['Boolean']>;
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
}>;

export type VehiclesQueryResponse = { __typename?: 'Query' } & {
  vehicles: { __typename?: 'VehicleConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'VehicleEntity' } & Pick<
          Types.VehicleEntity,
          | 'addressMoreInfo'
          | 'avatarId'
          | 'createdAt'
          | 'deletedAt'
          | 'detail'
          | 'hidden'
          | 'id'
          | 'latitude'
          | 'longitude'
          | 'mapAddress'
          | 'name'
          | 'operatingNumber'
          | 'operatingUnit'
          | 'ordinalNumber'
          | 'serialNumber'
          | 'updatedAt'
          | 'userId'
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
            vehicleType?: Types.Maybe<
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

export const VehiclesDocument = gql`
  query vehicles(
    $excludeActiveBooking: Boolean
    $excludeActiveMaintenance: Boolean
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $limit: Int
    $page: Int
    $search: String
    $sort: SortInput
  ) {
    vehicles(
      excludeActiveBooking: $excludeActiveBooking
      excludeActiveMaintenance: $excludeActiveMaintenance
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      limit: $limit
      page: $page
      search: $search
      sort: $sort
    ) {
      items {
        addressMoreInfo
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
        detail
        hidden
        id
        latitude
        longitude
        manufacturer {
          createdAt
          deletedAt
          id
          isActive
          name
          type
          updatedAt
        }
        mapAddress
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
        serialNumber
        updatedAt
        userId
        vehicleRegistrationPlate
        vehicleType {
          createdAt
          deletedAt
          id
          isActive
          name
          type
          updatedAt
        }
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
export function useVehiclesQuery(baseOptions?: Apollo.QueryHookOptions<VehiclesQueryResponse, VehiclesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<VehiclesQueryResponse, VehiclesQueryVariables>(VehiclesDocument, options);
}
export function useVehiclesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<VehiclesQueryResponse, VehiclesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<VehiclesQueryResponse, VehiclesQueryVariables>(VehiclesDocument, options);
}
export type VehiclesQueryHookResult = ReturnType<typeof useVehiclesQuery>;
export type VehiclesLazyQueryHookResult = ReturnType<typeof useVehiclesLazyQuery>;
export type VehiclesQueryResult = Apollo.QueryResult<VehiclesQueryResponse, VehiclesQueryVariables>;
