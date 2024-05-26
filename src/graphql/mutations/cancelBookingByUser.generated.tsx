import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type CancelBookingByUserMutationVariables = Types.Exact<{
  input: Types.CancelBookingInput;
}>;

export type CancelBookingByUserMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'cancelBookingByUser'
>;

export const CancelBookingByUserDocument = gql`
  mutation cancelBookingByUser($input: CancelBookingInput!) {
    cancelBookingByUser(input: $input)
  }
`;
export function useCancelBookingByUserMutation(
  baseOptions?: Apollo.MutationHookOptions<CancelBookingByUserMutationResponse, CancelBookingByUserMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CancelBookingByUserMutationResponse, CancelBookingByUserMutationVariables>(
    CancelBookingByUserDocument,
    options,
  );
}
export type CancelBookingByUserMutationHookResult = ReturnType<typeof useCancelBookingByUserMutation>;
export type CancelBookingByUserMutationResult = Apollo.MutationResult<CancelBookingByUserMutationResponse>;
export type CancelBookingByUserMutationOptions = Apollo.BaseMutationOptions<
  CancelBookingByUserMutationResponse,
  CancelBookingByUserMutationVariables
>;
