import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UpdateVehicleMutationVariables = Types.Exact<{
  input: Types.UpdateVehicleInput;
}>;

export type UpdateVehicleMutationResponse = { __typename?: 'Mutation' } & {
  updateVehicle: { __typename?: 'VehicleEntity' } & Pick<
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

export const UpdateVehicleDocument = gql`
  mutation updateVehicle($input: UpdateVehicleInput!) {
    updateVehicle(input: $input) {
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
export function useUpdateVehicleMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateVehicleMutationResponse, UpdateVehicleMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateVehicleMutationResponse, UpdateVehicleMutationVariables>(
    UpdateVehicleDocument,
    options,
  );
}
export type UpdateVehicleMutationHookResult = ReturnType<typeof useUpdateVehicleMutation>;
export type UpdateVehicleMutationResult = Apollo.MutationResult<UpdateVehicleMutationResponse>;
export type UpdateVehicleMutationOptions = Apollo.BaseMutationOptions<
  UpdateVehicleMutationResponse,
  UpdateVehicleMutationVariables
>;
