import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type CompleteBookingByUserMutationVariables = Types.Exact<{
  input: Types.UpdateBookingStatusInput;
}>;

export type CompleteBookingByUserMutationResponse = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'completeBookingByUser'
>;

export const CompleteBookingByUserDocument = gql`
  mutation completeBookingByUser($input: UpdateBookingStatusInput!) {
    completeBookingByUser(input: $input)
  }
`;
export function useCompleteBookingByUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CompleteBookingByUserMutationResponse,
    CompleteBookingByUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CompleteBookingByUserMutationResponse, CompleteBookingByUserMutationVariables>(
    CompleteBookingByUserDocument,
    options,
  );
}
export type CompleteBookingByUserMutationHookResult = ReturnType<typeof useCompleteBookingByUserMutation>;
export type CompleteBookingByUserMutationResult = Apollo.MutationResult<CompleteBookingByUserMutationResponse>;
export type CompleteBookingByUserMutationOptions = Apollo.BaseMutationOptions<
  CompleteBookingByUserMutationResponse,
  CompleteBookingByUserMutationVariables
>;
