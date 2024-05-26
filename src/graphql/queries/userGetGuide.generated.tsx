import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserGetGuideQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type UserGetGuideQueryResponse = { __typename?: 'Query' } & {
  userGetGuide: { __typename?: 'GuideEntity' } & Pick<
    Types.GuideEntity,
    'createdAt' | 'deletedAt' | 'description' | 'id' | 'isActive' | 'name' | 'updatedAt'
  > & {
      instructions?: Types.Maybe<
        Array<
          { __typename?: 'InstructionEntity' } & Pick<
            Types.InstructionEntity,
            'createdAt' | 'deletedAt' | 'description' | 'guideId' | 'id' | 'isActive' | 'name' | 'updatedAt'
          > & {
              guide: { __typename?: 'GuideEntity' } & Pick<
                Types.GuideEntity,
                'createdAt' | 'deletedAt' | 'description' | 'id' | 'isActive' | 'name' | 'updatedAt'
              >;
            }
        >
      >;
    };
};

export const UserGetGuideDocument = gql`
  query userGetGuide($id: String!) {
    userGetGuide(id: $id) {
      createdAt
      deletedAt
      description
      id
      instructions {
        createdAt
        deletedAt
        description
        guide {
          createdAt
          deletedAt
          description
          id
          isActive
          name
          updatedAt
        }
        guideId
        id
        isActive
        name
        updatedAt
      }
      isActive
      name
      updatedAt
    }
  }
`;
export function useUserGetGuideQuery(
  baseOptions: Apollo.QueryHookOptions<UserGetGuideQueryResponse, UserGetGuideQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserGetGuideQueryResponse, UserGetGuideQueryVariables>(UserGetGuideDocument, options);
}
export function useUserGetGuideLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserGetGuideQueryResponse, UserGetGuideQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserGetGuideQueryResponse, UserGetGuideQueryVariables>(UserGetGuideDocument, options);
}
export type UserGetGuideQueryHookResult = ReturnType<typeof useUserGetGuideQuery>;
export type UserGetGuideLazyQueryHookResult = ReturnType<typeof useUserGetGuideLazyQuery>;
export type UserGetGuideQueryResult = Apollo.QueryResult<UserGetGuideQueryResponse, UserGetGuideQueryVariables>;
