import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type CountOrderItemForEachStatusQueryVariables = Types.Exact<{ [key: string]: never }>;

export type CountOrderItemForEachStatusQueryResponse = { __typename?: 'Query' } & {
  countOrderItemForEachStatus: Array<
    { __typename?: 'OrderStatusAndItemCount' } & Pick<Types.OrderStatusAndItemCount, 'status' | 'totalItem'>
  >;
};

export const CountOrderItemForEachStatusDocument = gql`
  query countOrderItemForEachStatus {
    countOrderItemForEachStatus {
      status
      totalItem
    }
  }
`;
export function useCountOrderItemForEachStatusQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CountOrderItemForEachStatusQueryResponse,
    CountOrderItemForEachStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CountOrderItemForEachStatusQueryResponse, CountOrderItemForEachStatusQueryVariables>(
    CountOrderItemForEachStatusDocument,
    options,
  );
}
export function useCountOrderItemForEachStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CountOrderItemForEachStatusQueryResponse,
    CountOrderItemForEachStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CountOrderItemForEachStatusQueryResponse, CountOrderItemForEachStatusQueryVariables>(
    CountOrderItemForEachStatusDocument,
    options,
  );
}
export type CountOrderItemForEachStatusQueryHookResult = ReturnType<typeof useCountOrderItemForEachStatusQuery>;
export type CountOrderItemForEachStatusLazyQueryHookResult = ReturnType<typeof useCountOrderItemForEachStatusLazyQuery>;
export type CountOrderItemForEachStatusQueryResult = Apollo.QueryResult<
  CountOrderItemForEachStatusQueryResponse,
  CountOrderItemForEachStatusQueryVariables
>;
