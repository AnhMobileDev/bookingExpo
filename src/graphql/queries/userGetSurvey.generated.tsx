import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserGetSurveyQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type UserGetSurveyQueryResponse = { __typename?: 'Query' } & {
  userGetSurvey: { __typename?: 'SurveyEntity' } & Pick<
    Types.SurveyEntity,
    'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'updatedAt' | 'userIsSubmitSurvey'
  > & {
      questions: Array<
        { __typename?: 'QuestionEntity' } & Pick<
          Types.QuestionEntity,
          | 'answerType'
          | 'answers'
          | 'createdAt'
          | 'deletedAt'
          | 'id'
          | 'isRequired'
          | 'question'
          | 'surveyId'
          | 'updatedAt'
        >
      >;
      userResultSurvey?: Types.Maybe<
        { __typename?: 'SurveyHistoryEntity' } & Pick<
          Types.SurveyHistoryEntity,
          'createdAt' | 'deletedAt' | 'id' | 'surveyId' | 'type' | 'updatedAt' | 'userId'
        > & { results: Array<{ __typename?: 'SurveyResult' } & Pick<Types.SurveyResult, 'answer' | 'questionId'>> }
      >;
    };
};

export const UserGetSurveyDocument = gql`
  query userGetSurvey($id: String!) {
    userGetSurvey(id: $id) {
      createdAt
      deletedAt
      id
      isActive
      name
      questions {
        answerType
        answers
        createdAt
        deletedAt
        id
        isRequired
        question
        surveyId
        updatedAt
      }
      updatedAt
      userIsSubmitSurvey
      userResultSurvey {
        createdAt
        deletedAt
        id
        results {
          answer
          questionId
        }
        surveyId
        type
        updatedAt
        userId
      }
    }
  }
`;
export function useUserGetSurveyQuery(
  baseOptions: Apollo.QueryHookOptions<UserGetSurveyQueryResponse, UserGetSurveyQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserGetSurveyQueryResponse, UserGetSurveyQueryVariables>(UserGetSurveyDocument, options);
}
export function useUserGetSurveyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserGetSurveyQueryResponse, UserGetSurveyQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserGetSurveyQueryResponse, UserGetSurveyQueryVariables>(UserGetSurveyDocument, options);
}
export type UserGetSurveyQueryHookResult = ReturnType<typeof useUserGetSurveyQuery>;
export type UserGetSurveyLazyQueryHookResult = ReturnType<typeof useUserGetSurveyLazyQuery>;
export type UserGetSurveyQueryResult = Apollo.QueryResult<UserGetSurveyQueryResponse, UserGetSurveyQueryVariables>;
