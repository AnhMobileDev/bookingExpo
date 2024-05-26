import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type AddressesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type AddressesQueryResponse = { __typename?: 'Query' } & {
  addresses?: Types.Maybe<
    Array<
      { __typename?: 'AddressEntity' } & Pick<
        Types.AddressEntity,
        | 'addressDetail'
        | 'addressName'
        | 'contactName'
        | 'contactPhone'
        | 'createdAt'
        | 'deletedAt'
        | 'id'
        | 'isDefault'
        | 'latitude'
        | 'longitude'
        | 'mapAddress'
        | 'updatedAt'
        | 'userId'
      >
    >
  >;
};

export const AddressesDocument = gql`
  query addresses {
    addresses {
      addressDetail
      addressName
      contactName
      contactPhone
      createdAt
      deletedAt
      id
      isDefault
      latitude
      longitude
      mapAddress
      updatedAt
      userId
    }
  }
`;
export function useAddressesQuery(
  baseOptions?: Apollo.QueryHookOptions<AddressesQueryResponse, AddressesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AddressesQueryResponse, AddressesQueryVariables>(AddressesDocument, options);
}
export function useAddressesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AddressesQueryResponse, AddressesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AddressesQueryResponse, AddressesQueryVariables>(AddressesDocument, options);
}
export type AddressesQueryHookResult = ReturnType<typeof useAddressesQuery>;
export type AddressesLazyQueryHookResult = ReturnType<typeof useAddressesLazyQuery>;
export type AddressesQueryResult = Apollo.QueryResult<AddressesQueryResponse, AddressesQueryVariables>;
