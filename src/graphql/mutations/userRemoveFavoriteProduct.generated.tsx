import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserRemoveFavoriteProductMutationVariables = Types.Exact<{
  productId: Types.Scalars['String'];
}>;

export type UserRemoveFavoriteProductMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'userRemoveFavoriteProduct'
>;

export const UserRemoveFavoriteProductDocument = gql`
  mutation userRemoveFavoriteProduct($productId: String!) {
    userRemoveFavoriteProduct(productId: $productId)
  }
`;
export function useUserRemoveFavoriteProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UserRemoveFavoriteProductMutationResponse,
    UserRemoveFavoriteProductMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UserRemoveFavoriteProductMutationResponse, UserRemoveFavoriteProductMutationVariables>(
    UserRemoveFavoriteProductDocument,
    options,
  );
}
export type UserRemoveFavoriteProductMutationHookResult = ReturnType<typeof useUserRemoveFavoriteProductMutation>;
export type UserRemoveFavoriteProductMutationResult = Apollo.MutationResult<UserRemoveFavoriteProductMutationResponse>;
export type UserRemoveFavoriteProductMutationOptions = Apollo.BaseMutationOptions<
  UserRemoveFavoriteProductMutationResponse,
  UserRemoveFavoriteProductMutationVariables
>;
