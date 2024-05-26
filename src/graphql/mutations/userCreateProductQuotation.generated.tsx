import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserCreateProductQuotationMutationVariables = Types.Exact<{
  input: Types.ProductQuotationInput;
}>;

export type UserCreateProductQuotationMutationResponse = { __typename?: 'Mutation' } & {
  userCreateProductQuotation: { __typename?: 'ProductQuotationEntity' } & Pick<Types.ProductQuotationEntity, 'id'>;
};

export const UserCreateProductQuotationDocument = gql`
  mutation userCreateProductQuotation($input: ProductQuotationInput!) {
    userCreateProductQuotation(input: $input) {
      id
    }
  }
`;
export function useUserCreateProductQuotationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UserCreateProductQuotationMutationResponse,
    UserCreateProductQuotationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UserCreateProductQuotationMutationResponse, UserCreateProductQuotationMutationVariables>(
    UserCreateProductQuotationDocument,
    options,
  );
}
export type UserCreateProductQuotationMutationHookResult = ReturnType<typeof useUserCreateProductQuotationMutation>;
export type UserCreateProductQuotationMutationResult =
  Apollo.MutationResult<UserCreateProductQuotationMutationResponse>;
export type UserCreateProductQuotationMutationOptions = Apollo.BaseMutationOptions<
  UserCreateProductQuotationMutationResponse,
  UserCreateProductQuotationMutationVariables
>;
