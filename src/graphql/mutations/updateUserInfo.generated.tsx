import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UpdateUserInfoMutationVariables = Types.Exact<{
  input: Types.UpdateUserInput;
}>;

export type UpdateUserInfoMutationResponse = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'updateUserInfo'>;

export const UpdateUserInfoDocument = gql`
  mutation updateUserInfo($input: UpdateUserInput!) {
    updateUserInfo(input: $input)
  }
`;
export function useUpdateUserInfoMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateUserInfoMutationResponse, UpdateUserInfoMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUserInfoMutationResponse, UpdateUserInfoMutationVariables>(
    UpdateUserInfoDocument,
    options,
  );
}
export type UpdateUserInfoMutationHookResult = ReturnType<typeof useUpdateUserInfoMutation>;
export type UpdateUserInfoMutationResult = Apollo.MutationResult<UpdateUserInfoMutationResponse>;
export type UpdateUserInfoMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserInfoMutationResponse,
  UpdateUserInfoMutationVariables
>;
