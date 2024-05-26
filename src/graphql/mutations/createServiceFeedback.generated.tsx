import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type CreateServiceFeedbackMutationVariables = Types.Exact<{
  input: Types.CreateServiceFeedbackInput;
}>;

export type CreateServiceFeedbackMutationResponse = { __typename?: 'Mutation' } & {
  createServiceFeedback: { __typename?: 'ServiceFeedbackEntity' } & Pick<Types.ServiceFeedbackEntity, 'id'>;
};

export const CreateServiceFeedbackDocument = gql`
  mutation createServiceFeedback($input: CreateServiceFeedbackInput!) {
    createServiceFeedback(input: $input) {
      id
    }
  }
`;
export function useCreateServiceFeedbackMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateServiceFeedbackMutationResponse,
    CreateServiceFeedbackMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateServiceFeedbackMutationResponse, CreateServiceFeedbackMutationVariables>(
    CreateServiceFeedbackDocument,
    options,
  );
}
export type CreateServiceFeedbackMutationHookResult = ReturnType<typeof useCreateServiceFeedbackMutation>;
export type CreateServiceFeedbackMutationResult = Apollo.MutationResult<CreateServiceFeedbackMutationResponse>;
export type CreateServiceFeedbackMutationOptions = Apollo.BaseMutationOptions<
  CreateServiceFeedbackMutationResponse,
  CreateServiceFeedbackMutationVariables
>;
