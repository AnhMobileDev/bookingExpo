import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserNotificationTypeUnSeenCountQueryVariables = Types.Exact<{ [key: string]: never }>;

export type UserNotificationTypeUnSeenCountQueryResponse = { __typename?: 'Query' } & {
  userNotificationTypeUnSeenCount: Array<
    { __typename?: 'NotificationTypeUnSeenCount' } & Pick<Types.NotificationTypeUnSeenCount, 'count' | 'type'>
  >;
};

export const UserNotificationTypeUnSeenCountDocument = gql`
  query userNotificationTypeUnSeenCount {
    userNotificationTypeUnSeenCount {
      count
      type
    }
  }
`;
export function useUserNotificationTypeUnSeenCountQuery(
  baseOptions?: Apollo.QueryHookOptions<
    UserNotificationTypeUnSeenCountQueryResponse,
    UserNotificationTypeUnSeenCountQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserNotificationTypeUnSeenCountQueryResponse, UserNotificationTypeUnSeenCountQueryVariables>(
    UserNotificationTypeUnSeenCountDocument,
    options,
  );
}
export function useUserNotificationTypeUnSeenCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserNotificationTypeUnSeenCountQueryResponse,
    UserNotificationTypeUnSeenCountQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    UserNotificationTypeUnSeenCountQueryResponse,
    UserNotificationTypeUnSeenCountQueryVariables
  >(UserNotificationTypeUnSeenCountDocument, options);
}
export type UserNotificationTypeUnSeenCountQueryHookResult = ReturnType<typeof useUserNotificationTypeUnSeenCountQuery>;
export type UserNotificationTypeUnSeenCountLazyQueryHookResult = ReturnType<
  typeof useUserNotificationTypeUnSeenCountLazyQuery
>;
export type UserNotificationTypeUnSeenCountQueryResult = Apollo.QueryResult<
  UserNotificationTypeUnSeenCountQueryResponse,
  UserNotificationTypeUnSeenCountQueryVariables
>;
