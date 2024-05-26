import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserSubmitSurveyMutationVariables = Types.Exact<{
  input: Types.CreateSurveyHistoryInput;
}>;

export type UserSubmitSurveyMutationResponse = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'userSubmitSurvey'>;

export const UserSubmitSurveyDocument = gql`
  mutation userSubmitSurvey($input: CreateSurveyHistoryInput!) {
    userSubmitSurvey(input: $input)
  }
`;
export function useUserSubmitSurveyMutation(
  baseOptions?: Apollo.MutationHookOptions<UserSubmitSurveyMutationResponse, UserSubmitSurveyMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UserSubmitSurveyMutationResponse, UserSubmitSurveyMutationVariables>(
    UserSubmitSurveyDocument,
    options,
  );
}
export type UserSubmitSurveyMutationHookResult = ReturnType<typeof useUserSubmitSurveyMutation>;
export type UserSubmitSurveyMutationResult = Apollo.MutationResult<UserSubmitSurveyMutationResponse>;
export type UserSubmitSurveyMutationOptions = Apollo.BaseMutationOptions<
  UserSubmitSurveyMutationResponse,
  UserSubmitSurveyMutationVariables
>;
