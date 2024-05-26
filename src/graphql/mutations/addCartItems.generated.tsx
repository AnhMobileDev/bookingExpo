import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type AddCartItemsMutationVariables = Types.Exact<{
  input: Types.CreateCartInput;
}>;

export type AddCartItemsMutationResponse = { __typename?: 'Mutation' } & {
  addCartItems: { __typename?: 'CartEntity' } & Pick<
    Types.CartEntity,
    'createdAt' | 'deletedAt' | 'id' | 'total' | 'updatedAt' | 'userId'
  > & {
      items: Array<
        { __typename?: 'CartItemEntity' } & Pick<
          Types.CartItemEntity,
          'cartId' | 'createdAt' | 'deletedAt' | 'id' | 'productId' | 'quantity' | 'total' | 'updatedAt'
        >
      >;
    };
};

export const AddCartItemsDocument = gql`
  mutation addCartItems($input: CreateCartInput!) {
    addCartItems(input: $input) {
      createdAt
      deletedAt
      id
      items {
        cartId
        createdAt
        deletedAt
        id
        productId
        quantity
        total
        updatedAt
      }
      total
      updatedAt
      userId
    }
  }
`;
export function useAddCartItemsMutation(
  baseOptions?: Apollo.MutationHookOptions<AddCartItemsMutationResponse, AddCartItemsMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddCartItemsMutationResponse, AddCartItemsMutationVariables>(AddCartItemsDocument, options);
}
export type AddCartItemsMutationHookResult = ReturnType<typeof useAddCartItemsMutation>;
export type AddCartItemsMutationResult = Apollo.MutationResult<AddCartItemsMutationResponse>;
export type AddCartItemsMutationOptions = Apollo.BaseMutationOptions<
  AddCartItemsMutationResponse,
  AddCartItemsMutationVariables
>;
