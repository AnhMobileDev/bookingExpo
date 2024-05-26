import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
import { UserFragmentFragmentDoc } from '../fragments/user.fragment.generated';

const defaultOptions = {} as const;
export type MeUserQueryVariables = Types.Exact<{ [key: string]: never }>;

export type MeUserQueryResponse = { __typename?: 'Query' } & {
  meUser: { __typename?: 'UserEntity' } & Pick<
    Types.UserEntity,
    'address' | 'birthday' | 'certificate' | 'email' | 'fullname' | 'id' | 'isActive' | 'phone' | 'updatedAt'
  > & { avatar?: Types.Maybe<{ __typename?: 'Media' } & Pick<Types.Media, 'id' | 'fullOriginalUrl' | 'fullThumbUrl'>> };
};

export const MeUserDocument = gql`
  query meUser {
    meUser {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;
export function useMeUserQuery(baseOptions?: Apollo.QueryHookOptions<MeUserQueryResponse, MeUserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeUserQueryResponse, MeUserQueryVariables>(MeUserDocument, options);
}
export function useMeUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeUserQueryResponse, MeUserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeUserQueryResponse, MeUserQueryVariables>(MeUserDocument, options);
}
export type MeUserQueryHookResult = ReturnType<typeof useMeUserQuery>;
export type MeUserLazyQueryHookResult = ReturnType<typeof useMeUserLazyQuery>;
export type MeUserQueryResult = Apollo.QueryResult<MeUserQueryResponse, MeUserQueryVariables>;
