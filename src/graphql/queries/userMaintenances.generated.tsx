import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserMaintenancesQueryVariables = Types.Exact<{
  endDate?: Types.InputMaybe<Types.Scalars['String']>;
  filters?: Types.InputMaybe<Array<Types.Scalars['JSONObject']> | Types.Scalars['JSONObject']>;
  isActive?: Types.InputMaybe<Types.StatusEnum>;
  isApproved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Types.SortInput>;
  startDate?: Types.InputMaybe<Types.Scalars['String']>;
  statuses?: Types.InputMaybe<Array<Types.MaintenanceStatusEnum> | Types.MaintenanceStatusEnum>;
}>;

export type UserMaintenancesQueryResponse = { __typename?: 'Query' } & {
  userMaintenances: { __typename?: 'MaintenanceConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'MaintenanceEntity' } & Pick<
          Types.MaintenanceEntity,
          'code' | 'id' | 'maintenanceLevel' | 'routineLevel' | 'status' | 'userId' | 'vehicleId'
        > & {
            user?: Types.Maybe<
              { __typename?: 'UserEntity' } & Pick<Types.UserEntity, 'fullname'> & {
                  avatar?: Types.Maybe<
                    { __typename?: 'Media' } & Pick<Types.Media, 'fullThumbUrl' | 'id' | 'thumbUrl'>
                  >;
                }
            >;
            vehicle?: Types.Maybe<
              { __typename?: 'VehicleEntity' } & Pick<Types.VehicleEntity, 'name' | 'mapAddress'> & {
                  avatar?: Types.Maybe<
                    { __typename?: 'Media' } & Pick<Types.Media, 'fullThumbUrl' | 'id' | 'thumbUrl'>
                  >;
                }
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

export const UserMaintenancesDocument = gql`
  query userMaintenances(
    $endDate: String
    $filters: [JSONObject!]
    $isActive: StatusEnum
    $isApproved: Boolean
    $limit: Int
    $page: Int
    $search: String
    $sort: SortInput
    $startDate: String
    $statuses: [MaintenanceStatusEnum!]
  ) {
    userMaintenances(
      endDate: $endDate
      filters: $filters
      isActive: $isActive
      isApproved: $isApproved
      limit: $limit
      page: $page
      search: $search
      sort: $sort
      startDate: $startDate
      statuses: $statuses
    ) {
      items {
        code
        id
        maintenanceLevel
        routineLevel
        status
        user {
          avatar {
            fullThumbUrl
            id
            thumbUrl
          }
          fullname
        }
        userId
        vehicle {
          name
          avatar {
            fullThumbUrl
            id
            thumbUrl
          }
          mapAddress
        }
        vehicleId
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
export function useUserMaintenancesQuery(
  baseOptions?: Apollo.QueryHookOptions<UserMaintenancesQueryResponse, UserMaintenancesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserMaintenancesQueryResponse, UserMaintenancesQueryVariables>(
    UserMaintenancesDocument,
    options,
  );
}
export function useUserMaintenancesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserMaintenancesQueryResponse, UserMaintenancesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserMaintenancesQueryResponse, UserMaintenancesQueryVariables>(
    UserMaintenancesDocument,
    options,
  );
}
export type UserMaintenancesQueryHookResult = ReturnType<typeof useUserMaintenancesQuery>;
export type UserMaintenancesLazyQueryHookResult = ReturnType<typeof useUserMaintenancesLazyQuery>;
export type UserMaintenancesQueryResult = Apollo.QueryResult<
  UserMaintenancesQueryResponse,
  UserMaintenancesQueryVariables
>;
