import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type VerifyOtpMutationVariables = Types.Exact<{
  input: Types.VerifyOtpInput;
}>;

export type VerifyOtpMutationResponse = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'verifyOtp'>;

export const VerifyOtpDocument = gql`
  mutation verifyOtp($input: VerifyOtpInput!) {
    verifyOtp(input: $input)
  }
`;
export function useVerifyOtpMutation(
  baseOptions?: Apollo.MutationHookOptions<VerifyOtpMutationResponse, VerifyOtpMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<VerifyOtpMutationResponse, VerifyOtpMutationVariables>(VerifyOtpDocument, options);
}
export type VerifyOtpMutationHookResult = ReturnType<typeof useVerifyOtpMutation>;
export type VerifyOtpMutationResult = Apollo.MutationResult<VerifyOtpMutationResponse>;
export type VerifyOtpMutationOptions = Apollo.BaseMutationOptions<
  VerifyOtpMutationResponse,
  VerifyOtpMutationVariables
>;
