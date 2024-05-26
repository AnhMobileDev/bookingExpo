import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type LogoutMutationVariables = Types.Exact<{
  deviceId?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type LogoutMutationResponse = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'logout'>;

export const LogoutDocument = gql`
  mutation logout($deviceId: String) {
    logout(deviceId: $deviceId)
  }
`;
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<LogoutMutationResponse, LogoutMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutationResponse, LogoutMutationVariables>(LogoutDocument, options);
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutationResponse>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutationResponse, LogoutMutationVariables>;
