import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type SeenNotificationMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type SeenNotificationMutationResponse = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'seenNotification'>;

export const SeenNotificationDocument = gql`
  mutation seenNotification($id: String!) {
    seenNotification(id: $id)
  }
`;
export function useSeenNotificationMutation(
  baseOptions?: Apollo.MutationHookOptions<SeenNotificationMutationResponse, SeenNotificationMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SeenNotificationMutationResponse, SeenNotificationMutationVariables>(
    SeenNotificationDocument,
    options,
  );
}
export type SeenNotificationMutationHookResult = ReturnType<typeof useSeenNotificationMutation>;
export type SeenNotificationMutationResult = Apollo.MutationResult<SeenNotificationMutationResponse>;
export type SeenNotificationMutationOptions = Apollo.BaseMutationOptions<
  SeenNotificationMutationResponse,
  SeenNotificationMutationVariables
>;
