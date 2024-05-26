import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type UserSettlementQueryVariables = Types.Exact<{
  settlementId: Types.Scalars['String'];
}>;

export type UserSettlementQueryResponse = { __typename?: 'Query' } & {
  userSettlement: { __typename?: 'SettlementEntity' } & Pick<
    Types.SettlementEntity,
    | 'bookingId'
    | 'createdAt'
    | 'deletedAt'
    | 'discount'
    | 'id'
    | 'invoiceId'
    | 'quotationId'
    | 'status'
    | 'technicianId'
    | 'total'
    | 'updatedAt'
    | 'userId'
    | 'vatTax'
  > & {
      additionalFees: Array<
        { __typename?: 'SettlementAdditionalFeeEntity' } & Pick<
          Types.SettlementAdditionalFeeEntity,
          'amount' | 'createdAt' | 'deletedAt' | 'id' | 'name' | 'settlementId' | 'updatedAt'
        >
      >;
      quotation: { __typename?: 'QuotationEntity' } & Pick<
        Types.QuotationEntity,
        | 'bookingId'
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
        | 'technicianId'
        | 'total'
        | 'transportFee'
        | 'updatedAt'
        | 'userId'
      > & {
          accessories: Array<
            { __typename?: 'QuotationAccessoryEntity' } & Pick<
              Types.QuotationAccessoryEntity,
              | 'available'
              | 'createdAt'
              | 'deletedAt'
              | 'id'
              | 'name'
              | 'quantity'
              | 'quotationId'
              | 'unit'
              | 'unitPrice'
              | 'updatedAt'
            >
          >;
          additionalFees: Array<
            { __typename?: 'QuotationAdditionalFeeEntity' } & Pick<
              Types.QuotationAdditionalFeeEntity,
              'amount' | 'createdAt' | 'deletedAt' | 'id' | 'name' | 'quotationId' | 'updatedAt'
            >
          >;
          booking: { __typename?: 'BookingEntity' } & Pick<
            Types.BookingEntity,
            | 'addressMoreInfo'
            | 'code'
            | 'createdAt'
            | 'deletedAt'
            | 'description'
            | 'id'
            | 'latitude'
            | 'longitude'
            | 'mapAddress'
            | 'partnerId'
            | 'problemTexts'
            | 'scheduleReason'
            | 'scheduleTime'
            | 'status'
            | 'technicianCanReviewUser'
            | 'technicianId'
            | 'transportDistance'
            | 'transportDuration'
            | 'transportFee'
            | 'updatedAt'
            | 'userCanReviewAgency'
            | 'userCanReviewTechnician'
            | 'userId'
            | 'vehicleId'
          >;
          diagnostics: Array<
            { __typename?: 'QuotationDiagnosticEntity' } & Pick<
              Types.QuotationDiagnosticEntity,
              | 'createdAt'
              | 'deletedAt'
              | 'description'
              | 'diagnosticCode'
              | 'expense'
              | 'id'
              | 'quotationId'
              | 'quotationPriceListId'
              | 'updatedAt'
              | 'workingHour'
            >
          >;
          reasons?: Types.Maybe<
            Array<
              { __typename?: 'CategoryEntity' } & Pick<
                Types.CategoryEntity,
                'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
              >
            >
          >;
          technician: { __typename?: 'PartnerEntity' } & Pick<
            Types.PartnerEntity,
            | 'addressMoreInfo'
            | 'avatarId'
            | 'bank'
            | 'birthday'
            | 'cardNumber'
            | 'citizenId'
            | 'countProduct'
            | 'countTechnician'
            | 'createdAt'
            | 'deletedAt'
            | 'description'
            | 'email'
            | 'fullname'
            | 'hotline'
            | 'id'
            | 'isActive'
            | 'isApproved'
            | 'latitude'
            | 'longitude'
            | 'mapAddress'
            | 'menus'
            | 'parentId'
            | 'phone'
            | 'star'
            | 'storeStar'
            | 'suggestionPoint'
            | 'type'
            | 'updatedAt'
          >;
          user: { __typename?: 'UserEntity' } & Pick<
            Types.UserEntity,
            | 'address'
            | 'avatarId'
            | 'birthday'
            | 'certificate'
            | 'createdAt'
            | 'deletedAt'
            | 'email'
            | 'fullname'
            | 'id'
            | 'isActive'
            | 'numberBooking'
            | 'numberMaintenance'
            | 'numberOrder'
            | 'phone'
            | 'star'
            | 'totalBookings'
            | 'totalMaintenanceRequests'
            | 'totalOrders'
            | 'totalPayment'
            | 'totalSpending'
            | 'updatedAt'
          >;
        };
    };
};

export const UserSettlementDocument = gql`
  query userSettlement($settlementId: String!) {
    userSettlement(settlementId: $settlementId) {
      additionalFees {
        amount
        createdAt
        deletedAt
        id
        name
        settlementId
        updatedAt
      }
      bookingId
      createdAt
      deletedAt
      discount
      id
      invoiceId
      quotation {
        accessories {
          available
          createdAt
          deletedAt
          id
          name
          quantity
          quotationId
          unit
          unitPrice
          updatedAt
        }
        additionalFees {
          amount
          createdAt
          deletedAt
          id
          name
          quotationId
          updatedAt
        }
        booking {
          addressMoreInfo
          code
          createdAt
          deletedAt
          description
          id
          latitude
          longitude
          mapAddress
          partnerId
          problemTexts
          scheduleReason
          scheduleTime
          status
          technicianCanReviewUser
          technicianId
          transportDistance
          transportDuration
          transportFee
          updatedAt
          userCanReviewAgency
          userCanReviewTechnician
          userId
          vehicleId
        }
        bookingId
        createdAt
        deletedAt
        diagnosisFee
        diagnosisNote
        diagnostics {
          createdAt
          deletedAt
          description
          diagnosticCode
          expense
          id
          quotationId
          quotationPriceListId
          updatedAt
          workingHour
        }
        estimatedCompleteAt
        id
        operatingNumber
        operatingUnit
        reasons {
          createdAt
          deletedAt
          id
          isActive
          name
          type
          updatedAt
        }
        rejectReasons
        repairFee
        status
        technician {
          addressMoreInfo
          avatarId
          bank
          birthday
          cardNumber
          citizenId
          countProduct
          countTechnician
          createdAt
          deletedAt
          description
          email
          fullname
          hotline
          id
          isActive
          isApproved
          latitude
          longitude
          mapAddress
          menus
          parentId
          phone
          star
          storeStar
          suggestionPoint
          type
          updatedAt
        }
        technicianId
        total
        transportFee
        updatedAt
        user {
          address
          avatarId
          birthday
          certificate
          createdAt
          deletedAt
          email
          fullname
          id
          isActive
          numberBooking
          numberMaintenance
          numberOrder
          phone
          star
          totalBookings
          totalMaintenanceRequests
          totalOrders
          totalPayment
          totalSpending
          updatedAt
        }
        userId
      }
      quotationId
      status
      technicianId
      total
      updatedAt
      userId
      vatTax
    }
  }
`;
export function useUserSettlementQuery(
  baseOptions: Apollo.QueryHookOptions<UserSettlementQueryResponse, UserSettlementQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserSettlementQueryResponse, UserSettlementQueryVariables>(UserSettlementDocument, options);
}
export function useUserSettlementLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserSettlementQueryResponse, UserSettlementQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserSettlementQueryResponse, UserSettlementQueryVariables>(
    UserSettlementDocument,
    options,
  );
}
export type UserSettlementQueryHookResult = ReturnType<typeof useUserSettlementQuery>;
export type UserSettlementLazyQueryHookResult = ReturnType<typeof useUserSettlementLazyQuery>;
export type UserSettlementQueryResult = Apollo.QueryResult<UserSettlementQueryResponse, UserSettlementQueryVariables>;
