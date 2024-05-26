import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserAddFavoriteProductMutationVariables = Types.Exact<{
  productId: Types.Scalars['String'];
}>;

export type UserAddFavoriteProductMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'userAddFavoriteProduct'
>;

export const UserAddFavoriteProductDocument = gql`
  mutation userAddFavoriteProduct($productId: String!) {
    userAddFavoriteProduct(productId: $productId)
  }
`;
export function useUserAddFavoriteProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UserAddFavoriteProductMutationResponse,
    UserAddFavoriteProductMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UserAddFavoriteProductMutationResponse, UserAddFavoriteProductMutationVariables>(
    UserAddFavoriteProductDocument,
    options,
  );
}
export type UserAddFavoriteProductMutationHookResult = ReturnType<typeof useUserAddFavoriteProductMutation>;
export type UserAddFavoriteProductMutationResult = Apollo.MutationResult<UserAddFavoriteProductMutationResponse>;
export type UserAddFavoriteProductMutationOptions = Apollo.BaseMutationOptions<
  UserAddFavoriteProductMutationResponse,
  UserAddFavoriteProductMutationVariables
>;
