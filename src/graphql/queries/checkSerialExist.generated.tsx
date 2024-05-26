import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type CheckSerialExistQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['String']>;
  serialNumber: Types.Scalars['String'];
}>;

export type CheckSerialExistQueryResponse = { __typename?: 'Query' } & Pick<Types.Query, 'checkSerialExist'>;

export const CheckSerialExistDocument = gql`
  query checkSerialExist($id: String, $serialNumber: String!) {
    checkSerialExist(id: $id, serialNumber: $serialNumber)
  }
`;
export function useCheckSerialExistQuery(
  baseOptions: Apollo.QueryHookOptions<CheckSerialExistQueryResponse, CheckSerialExistQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CheckSerialExistQueryResponse, CheckSerialExistQueryVariables>(
    CheckSerialExistDocument,
    options,
  );
}
export function useCheckSerialExistLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CheckSerialExistQueryResponse, CheckSerialExistQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CheckSerialExistQueryResponse, CheckSerialExistQueryVariables>(
    CheckSerialExistDocument,
    options,
  );
}
export type CheckSerialExistQueryHookResult = ReturnType<typeof useCheckSerialExistQuery>;
export type CheckSerialExistLazyQueryHookResult = ReturnType<typeof useCheckSerialExistLazyQuery>;
export type CheckSerialExistQueryResult = Apollo.QueryResult<
  CheckSerialExistQueryResponse,
  CheckSerialExistQueryVariables
>;
