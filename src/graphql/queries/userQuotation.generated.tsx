import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserQuotationQueryVariables = Types.Exact<{
  quotationId: Types.Scalars['String'];
}>;

export type UserQuotationQueryResponse = { __typename?: 'Query' } & {
  userQuotation: { __typename?: 'QuotationEntity' } & Pick<
    Types.QuotationEntity,
    | 'createdAt'
    | 'deletedAt'
    | 'diagnosisFee'
    | 'diagnosisNote'
    | 'estimatedCompleteAt'
    | 'id'
    | 'operatingNumber'
    | 'operatingUnit'
    | 'rejectReasons'
    | 'repairFee'
    | 'status'
    | 'total'
    | 'transportFee'
    | 'updatedAt'
  > & {
      accessories: Array<
        { __typename?: 'QuotationAccessoryEntity' } & Pick<
          Types.QuotationAccessoryEntity,
          'available' | 'id' | 'name' | 'quantity' | 'quotationId' | 'unit' | 'unitPrice'
        >
      >;
      additionalFees: Array<
        { __typename?: 'QuotationAdditionalFeeEntity' } & Pick<
          Types.QuotationAdditionalFeeEntity,
          'amount' | 'id' | 'name'
        >
      >;
      diagnostics: Array<
        { __typename?: 'QuotationDiagnosticEntity' } & Pick<
          Types.QuotationDiagnosticEntity,
          'description' | 'diagnosticCode' | 'expense' | 'id' | 'quotationId' | 'quotationPriceListId' | 'workingHour'
        >
      >;
    };
};

export const UserQuotationDocument = gql`
  query userQuotation($quotationId: String!) {
    userQuotation(quotationId: $quotationId) {
      accessories {
        available
        id
        name
        quantity
        quotationId
        unit
        unitPrice
      }
      additionalFees {
        amount
        id
        name
      }
      createdAt
      deletedAt
      diagnosisFee
      diagnosisNote
      diagnostics {
        description
        diagnosticCode
        expense
        id
        quotationId
        quotationPriceListId
        workingHour
      }
      estimatedCompleteAt
      id
      operatingNumber
      operatingUnit
      rejectReasons
      repairFee
      status
      total
      transportFee
      updatedAt
    }
  }
`;
export function useUserQuotationQuery(
  baseOptions: Apollo.QueryHookOptions<UserQuotationQueryResponse, UserQuotationQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserQuotationQueryResponse, UserQuotationQueryVariables>(UserQuotationDocument, options);
}
export function useUserQuotationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserQuotationQueryResponse, UserQuotationQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserQuotationQueryResponse, UserQuotationQueryVariables>(UserQuotationDocument, options);
}
export type UserQuotationQueryHookResult = ReturnType<typeof useUserQuotationQuery>;
export type UserQuotationLazyQueryHookResult = ReturnType<typeof useUserQuotationLazyQuery>;
export type UserQuotationQueryResult = Apollo.QueryResult<UserQuotationQueryResponse, UserQuotationQueryVariables>;
