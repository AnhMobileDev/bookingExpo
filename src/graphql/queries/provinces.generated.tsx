import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type ProvincesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type ProvincesQueryResponse = { __typename?: 'Query' } & {
  provinces?: Types.Maybe<
    Array<{ __typename?: 'ProvinceOutput' } & Pick<Types.ProvinceOutput, 'code' | 'codename' | 'divisionType' | 'name'>>
  >;
};

export const ProvincesDocument = gql`
  query provinces {
    provinces {
      code
      codename
      divisionType
      name
    }
  }
`;
export function useProvincesQuery(
  baseOptions?: Apollo.QueryHookOptions<ProvincesQueryResponse, ProvincesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProvincesQueryResponse, ProvincesQueryVariables>(ProvincesDocument, options);
}
export function useProvincesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProvincesQueryResponse, ProvincesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProvincesQueryResponse, ProvincesQueryVariables>(ProvincesDocument, options);
}
export type ProvincesQueryHookResult = ReturnType<typeof useProvincesQuery>;
export type ProvincesLazyQueryHookResult = ReturnType<typeof useProvincesLazyQuery>;
export type ProvincesQueryResult = Apollo.QueryResult<ProvincesQueryResponse, ProvincesQueryVariables>;
