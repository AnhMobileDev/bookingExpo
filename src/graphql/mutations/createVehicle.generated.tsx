import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type CreateVehicleMutationVariables = Types.Exact<{
  input: Types.CreateVehicleInput;
}>;

export type CreateVehicleMutationResponse = { __typename?: 'Mutation' } & {
  createVehicle: { __typename?: 'VehicleEntity' } & Pick<
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

export const CreateVehicleDocument = gql`
  mutation createVehicle($input: CreateVehicleInput!) {
    createVehicle(input: $input) {
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
export function useCreateVehicleMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateVehicleMutationResponse, CreateVehicleMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateVehicleMutationResponse, CreateVehicleMutationVariables>(
    CreateVehicleDocument,
    options,
  );
}
export type CreateVehicleMutationHookResult = ReturnType<typeof useCreateVehicleMutation>;
export type CreateVehicleMutationResult = Apollo.MutationResult<CreateVehicleMutationResponse>;
export type CreateVehicleMutationOptions = Apollo.BaseMutationOptions<
  CreateVehicleMutationResponse,
  CreateVehicleMutationVariables
>;
