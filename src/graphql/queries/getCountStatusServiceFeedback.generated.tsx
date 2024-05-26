import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type GetCountStatusServiceFeedbackQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetCountStatusServiceFeedbackQueryResponse = { __typename?: 'Query' } & {
  getCountStatusServiceFeedback: Array<
    { __typename?: 'ServiceFeedbackStatusAndItemCount' } & Pick<
      Types.ServiceFeedbackStatusAndItemCount,
      'quantity' | 'status'
    >
  >;
};

export const GetCountStatusServiceFeedbackDocument = gql`
  query getCountStatusServiceFeedback {
    getCountStatusServiceFeedback {
      quantity
      status
    }
  }
`;
export function useGetCountStatusServiceFeedbackQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCountStatusServiceFeedbackQueryResponse,
    GetCountStatusServiceFeedbackQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCountStatusServiceFeedbackQueryResponse, GetCountStatusServiceFeedbackQueryVariables>(
    GetCountStatusServiceFeedbackDocument,
    options,
  );
}
export function useGetCountStatusServiceFeedbackLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCountStatusServiceFeedbackQueryResponse,
    GetCountStatusServiceFeedbackQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCountStatusServiceFeedbackQueryResponse, GetCountStatusServiceFeedbackQueryVariables>(
    GetCountStatusServiceFeedbackDocument,
    options,
  );
}
export type GetCountStatusServiceFeedbackQueryHookResult = ReturnType<typeof useGetCountStatusServiceFeedbackQuery>;
export type GetCountStatusServiceFeedbackLazyQueryHookResult = ReturnType<
  typeof useGetCountStatusServiceFeedbackLazyQuery
>;
export type GetCountStatusServiceFeedbackQueryResult = Apollo.QueryResult<
  GetCountStatusServiceFeedbackQueryResponse,
  GetCountStatusServiceFeedbackQueryVariables
>;
