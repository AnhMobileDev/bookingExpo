import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserProductQuotationQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type UserProductQuotationQueryResponse = { __typename?: 'Query' } & {
  userProductQuotation: { __typename?: 'ProductQuotationEntity' } & Pick<
    Types.ProductQuotationEntity,
    | 'createdAt'
    | 'deletedAt'
    | 'detail'
    | 'id'
    | 'partnerId'
    | 'productId'
    | 'quantity'
    | 'response'
    | 'status'
    | 'updatedAt'
  > & {
      medias: Array<{ __typename?: 'Media' } & Pick<Types.Media, 'fullOriginalUrl' | 'name' | 'id'>>;
      partner: { __typename?: 'PartnerEntity' } & Pick<
        Types.PartnerEntity,
        'fullname' | 'id' | 'isActive' | 'mapAddress' | 'menus' | 'phone'
      >;
      product: { __typename?: 'ProductEntity' } & Pick<Types.ProductEntity, 'detail' | 'id' | 'name'> & {
          avatar?: Types.Maybe<{ __typename?: 'Media' } & Pick<Types.Media, 'fullOriginalUrl' | 'fullThumbUrl' | 'id'>>;
        };
    };
};

export const UserProductQuotationDocument = gql`
  query userProductQuotation($id: String!) {
    userProductQuotation(id: $id) {
      createdAt
      deletedAt
      detail
      id
      medias {
        fullOriginalUrl
        name
        id
      }
      partner {
        fullname
        id
        isActive
        mapAddress
        menus
        phone
      }
      partnerId
      product {
        avatar {
          fullOriginalUrl
          fullThumbUrl
          id
        }
        detail
        id
        name
      }
      productId
      quantity
      response
      status
      updatedAt
    }
  }
`;
export function useUserProductQuotationQuery(
  baseOptions: Apollo.QueryHookOptions<UserProductQuotationQueryResponse, UserProductQuotationQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserProductQuotationQueryResponse, UserProductQuotationQueryVariables>(
    UserProductQuotationDocument,
    options,
  );
}
export function useUserProductQuotationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserProductQuotationQueryResponse, UserProductQuotationQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserProductQuotationQueryResponse, UserProductQuotationQueryVariables>(
    UserProductQuotationDocument,
    options,
  );
}
export type UserProductQuotationQueryHookResult = ReturnType<typeof useUserProductQuotationQuery>;
export type UserProductQuotationLazyQueryHookResult = ReturnType<typeof useUserProductQuotationLazyQuery>;
export type UserProductQuotationQueryResult = Apollo.QueryResult<
  UserProductQuotationQueryResponse,
  UserProductQuotationQueryVariables
>;
