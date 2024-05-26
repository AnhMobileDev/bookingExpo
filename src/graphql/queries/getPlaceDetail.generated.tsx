import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type GetPlaceDetailQueryVariables = Types.Exact<{
  place_id: Types.Scalars['String'];
}>;

export type GetPlaceDetailQueryResponse = { __typename?: 'Query' } & {
  getPlaceDetail: { __typename?: 'PlaceDetailOutput' } & Pick<
    Types.PlaceDetailOutput,
    'address' | 'lat' | 'lng' | 'name' | 'place_id'
  >;
};

export const GetPlaceDetailDocument = gql`
  query getPlaceDetail($place_id: String!) {
    getPlaceDetail(place_id: $place_id) {
      address
      lat
      lng
      name
      place_id
    }
  }
`;
export function useGetPlaceDetailQuery(
  baseOptions: Apollo.QueryHookOptions<GetPlaceDetailQueryResponse, GetPlaceDetailQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPlaceDetailQueryResponse, GetPlaceDetailQueryVariables>(GetPlaceDetailDocument, options);
}
export function useGetPlaceDetailLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPlaceDetailQueryResponse, GetPlaceDetailQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPlaceDetailQueryResponse, GetPlaceDetailQueryVariables>(
    GetPlaceDetailDocument,
    options,
  );
}
export type GetPlaceDetailQueryHookResult = ReturnType<typeof useGetPlaceDetailQuery>;
export type GetPlaceDetailLazyQueryHookResult = ReturnType<typeof useGetPlaceDetailLazyQuery>;
export type GetPlaceDetailQueryResult = Apollo.QueryResult<GetPlaceDetailQueryResponse, GetPlaceDetailQueryVariables>;
