import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type DistrictsQueryVariables = Types.Exact<{
  provinceCodeName: Types.Scalars['String'];
}>;

export type DistrictsQueryResponse = { __typename?: 'Query' } & {
  districts?: Types.Maybe<
    Array<
      { __typename?: 'DistrictOutput' } & Pick<
        Types.DistrictOutput,
        'code' | 'codename' | 'divisionType' | 'name' | 'shortCodename'
      >
    >
  >;
};

export const DistrictsDocument = gql`
  query districts($provinceCodeName: String!) {
    districts(provinceCodeName: $provinceCodeName) {
      code
      codename
      divisionType
      name
      shortCodename
    }
  }
`;
export function useDistrictsQuery(
  baseOptions: Apollo.QueryHookOptions<DistrictsQueryResponse, DistrictsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DistrictsQueryResponse, DistrictsQueryVariables>(DistrictsDocument, options);
}
export function useDistrictsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DistrictsQueryResponse, DistrictsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DistrictsQueryResponse, DistrictsQueryVariables>(DistrictsDocument, options);
}
export type DistrictsQueryHookResult = ReturnType<typeof useDistrictsQuery>;
export type DistrictsLazyQueryHookResult = ReturnType<typeof useDistrictsLazyQuery>;
export type DistrictsQueryResult = Apollo.QueryResult<DistrictsQueryResponse, DistrictsQueryVariables>;
