import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type CheckVinExistQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['String']>;
  serialNumber: Types.Scalars['String'];
}>;

export type CheckVinExistQueryResponse = { __typename?: 'Query' } & Pick<Types.Query, 'checkVinExist'>;

export const CheckVinExistDocument = gql`
  query checkVinExist($id: String, $serialNumber: String!) {
    checkVinExist(id: $id, serialNumber: $serialNumber)
  }
`;
export function useCheckVinExistQuery(
  baseOptions: Apollo.QueryHookOptions<CheckVinExistQueryResponse, CheckVinExistQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CheckVinExistQueryResponse, CheckVinExistQueryVariables>(CheckVinExistDocument, options);
}
export function useCheckVinExistLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CheckVinExistQueryResponse, CheckVinExistQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CheckVinExistQueryResponse, CheckVinExistQueryVariables>(CheckVinExistDocument, options);
}
export type CheckVinExistQueryHookResult = ReturnType<typeof useCheckVinExistQuery>;
export type CheckVinExistLazyQueryHookResult = ReturnType<typeof useCheckVinExistLazyQuery>;
export type CheckVinExistQueryResult = Apollo.QueryResult<CheckVinExistQueryResponse, CheckVinExistQueryVariables>;
