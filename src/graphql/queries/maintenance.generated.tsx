import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type MaintenanceQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type MaintenanceQueryResponse = { __typename?: 'Query' } & {
  maintenance: { __typename?: 'MaintenanceEntity' } & Pick<
    Types.MaintenanceEntity,
    | 'addressMoreInfo'
    | 'code'
    | 'createdAt'
    | 'endDate'
    | 'id'
    | 'isActive'
    | 'maintenanceLevel'
    | 'mapAddress'
    | 'note'
    | 'routineLevel'
    | 'startDate'
    | 'status'
    | 'vehicleId'
  > & {
      accessories?: Types.Maybe<
        Array<
          { __typename?: 'MaintenanceAccessoryEntity' } & Pick<
            Types.MaintenanceAccessoryEntity,
            'id' | 'isAvailable' | 'name' | 'quantity' | 'unit'
          >
        >
      >;
      statusDetail?: Types.Maybe<
        { __typename?: 'MaintenanceStatusEntity' } & Pick<Types.MaintenanceStatusEntity, 'id' | 'note'> & {
            reasons?: Types.Maybe<
              Array<
                { __typename?: 'MaintenanceStatusCategoryEntity' } & Pick<
                  Types.MaintenanceStatusCategoryEntity,
                  'id' | 'name' | 'type'
                >
              >
            >;
          }
      >;
      user?: Types.Maybe<
        { __typename?: 'UserEntity' } & Pick<Types.UserEntity, 'fullname' | 'id'> & {
            avatar?: Types.Maybe<{ __typename?: 'Media' } & Pick<Types.Media, 'fullThumbUrl' | 'id' | 'thumbUrl'>>;
          }
      >;
      vehicle?: Types.Maybe<
        { __typename?: 'VehicleEntity' } & Pick<
          Types.VehicleEntity,
          | 'id'
          | 'name'
          | 'operatingNumber'
          | 'operatingUnit'
          | 'ordinalNumber'
          | 'serialNumber'
          | 'updatedAt'
          | 'vehicleRegistrationPlate'
          | 'vinNumber'
          | 'yearOfManufacture'
        > & {
            avatar?: Types.Maybe<{ __typename?: 'Media' } & Pick<Types.Media, 'fullThumbUrl' | 'id' | 'thumbUrl'>>;
            manufacturer?: Types.Maybe<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'name'>>;
            model?: Types.Maybe<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'name'>>;
            origin?: Types.Maybe<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'name'>>;
            vehicleType?: Types.Maybe<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'name'>>;
          }
      >;
    };
};

export const MaintenanceDocument = gql`
  query maintenance($id: String!) {
    maintenance(id: $id) {
      accessories {
        id
        isAvailable
        name
        quantity
        unit
      }
      addressMoreInfo
      code
      createdAt
      endDate
      id
      isActive
      maintenanceLevel
      mapAddress
      note
      routineLevel
      startDate
      status
      statusDetail {
        id
        note
        reasons {
          id
          name
          type
        }
      }
      user {
        avatar {
          fullThumbUrl
          id
          thumbUrl
        }
        fullname
        id
      }
      vehicle {
        avatar {
          fullThumbUrl
          id
          thumbUrl
        }
        id
        manufacturer {
          id
          name
        }
        model {
          id
          name
        }
        name
        operatingNumber
        operatingUnit
        ordinalNumber
        origin {
          id
          name
        }
        serialNumber
        updatedAt
        vehicleRegistrationPlate
        vehicleType {
          id
          name
        }
        vinNumber
        yearOfManufacture
      }
      vehicleId
    }
  }
`;
export function useMaintenanceQuery(
  baseOptions: Apollo.QueryHookOptions<MaintenanceQueryResponse, MaintenanceQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MaintenanceQueryResponse, MaintenanceQueryVariables>(MaintenanceDocument, options);
}
export function useMaintenanceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MaintenanceQueryResponse, MaintenanceQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MaintenanceQueryResponse, MaintenanceQueryVariables>(MaintenanceDocument, options);
}
export type MaintenanceQueryHookResult = ReturnType<typeof useMaintenanceQuery>;
export type MaintenanceLazyQueryHookResult = ReturnType<typeof useMaintenanceLazyQuery>;
export type MaintenanceQueryResult = Apollo.QueryResult<MaintenanceQueryResponse, MaintenanceQueryVariables>;
