import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type CreateBookingMutationVariables = Types.Exact<{
  input: Types.CreateBookingInput;
}>;

export type CreateBookingMutationResponse = { __typename?: 'Mutation' } & {
  createBooking: { __typename?: 'BookingEntity' } & Pick<Types.BookingEntity, 'id'>;
};

export const CreateBookingDocument = gql`
  mutation createBooking($input: CreateBookingInput!) {
    createBooking(input: $input) {
      id
    }
  }
`;
export function useCreateBookingMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateBookingMutationResponse, CreateBookingMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateBookingMutationResponse, CreateBookingMutationVariables>(
    CreateBookingDocument,
    options,
  );
}
export type CreateBookingMutationHookResult = ReturnType<typeof useCreateBookingMutation>;
export type CreateBookingMutationResult = Apollo.MutationResult<CreateBookingMutationResponse>;
export type CreateBookingMutationOptions = Apollo.BaseMutationOptions<
  CreateBookingMutationResponse,
  CreateBookingMutationVariables
>;
