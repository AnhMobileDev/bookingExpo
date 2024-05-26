import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type VehicleQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type VehicleQueryResponse = { __typename?: 'Query' } & {
  vehicle: { __typename?: 'VehicleEntity' } & Pick<
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
    };
};

export const VehicleDocument = gql`
  query vehicle($id: String!) {
    vehicle(id: $id) {
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
  }
`;
export function useVehicleQuery(baseOptions: Apollo.QueryHookOptions<VehicleQueryResponse, VehicleQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<VehicleQueryResponse, VehicleQueryVariables>(VehicleDocument, options);
}
export function useVehicleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<VehicleQueryResponse, VehicleQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<VehicleQueryResponse, VehicleQueryVariables>(VehicleDocument, options);
}
export type VehicleQueryHookResult = ReturnType<typeof useVehicleQuery>;
export type VehicleLazyQueryHookResult = ReturnType<typeof useVehicleLazyQuery>;
export type VehicleQueryResult = Apollo.QueryResult<VehicleQueryResponse, VehicleQueryVariables>;
