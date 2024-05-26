import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type CreatePasswordNewUserMutationVariables = Types.Exact<{
  input: Types.CreatePasswordRegisterInput;
}>;

export type CreatePasswordNewUserMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'createPasswordNewUser'
>;

export const CreatePasswordNewUserDocument = gql`
  mutation createPasswordNewUser($input: CreatePasswordRegisterInput!) {
    createPasswordNewUser(input: $input)
  }
`;
export function useCreatePasswordNewUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePasswordNewUserMutationResponse,
    CreatePasswordNewUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreatePasswordNewUserMutationResponse, CreatePasswordNewUserMutationVariables>(
    CreatePasswordNewUserDocument,
    options,
  );
}
export type CreatePasswordNewUserMutationHookResult = ReturnType<typeof useCreatePasswordNewUserMutation>;
export type CreatePasswordNewUserMutationResult = Apollo.MutationResult<CreatePasswordNewUserMutationResponse>;
export type CreatePasswordNewUserMutationOptions = Apollo.BaseMutationOptions<
  CreatePasswordNewUserMutationResponse,
  CreatePasswordNewUserMutationVariables
>;
