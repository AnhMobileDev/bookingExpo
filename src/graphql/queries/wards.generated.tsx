import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type WardsQueryVariables = Types.Exact<{
  districtCodeName: Types.Scalars['String'];
  provinceCodeName: Types.Scalars['String'];
}>;

export type WardsQueryResponse = { __typename?: 'Query' } & {
  wards?: Types.Maybe<
    Array<
      { __typename?: 'WardOutput' } & Pick<
        Types.WardOutput,
        'code' | 'codename' | 'divisionType' | 'name' | 'shortCodename'
      >
    >
  >;
};

export const WardsDocument = gql`
  query wards($districtCodeName: String!, $provinceCodeName: String!) {
    wards(districtCodeName: $districtCodeName, provinceCodeName: $provinceCodeName) {
      code
      codename
      divisionType
      name
      shortCodename
    }
  }
`;
export function useWardsQuery(baseOptions: Apollo.QueryHookOptions<WardsQueryResponse, WardsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<WardsQueryResponse, WardsQueryVariables>(WardsDocument, options);
}
export function useWardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WardsQueryResponse, WardsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<WardsQueryResponse, WardsQueryVariables>(WardsDocument, options);
}
export type WardsQueryHookResult = ReturnType<typeof useWardsQuery>;
export type WardsLazyQueryHookResult = ReturnType<typeof useWardsLazyQuery>;
export type WardsQueryResult = Apollo.QueryResult<WardsQueryResponse, WardsQueryVariables>;
