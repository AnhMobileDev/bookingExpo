import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type BookingQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type BookingQueryResponse = { __typename?: 'Query' } & {
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
  > & {
      medias: Array<
        { __typename?: 'Media' } & Pick<
          Types.Media,
          | 'createdAt'
          | 'fileSize'
          | 'fullOriginalUrl'
          | 'fullThumbUrl'
          | 'id'
          | 'isDeleted'
          | 'mimeType'
          | 'name'
          | 'originalUrl'
          | 'ownerId'
          | 'thumbUrl'
          | 'type'
          | 'updatedAt'
          | 'videoUrl'
        >
      >;
      problems?: Types.Maybe<
        Array<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'isActive' | 'name' | 'type'>>
      >;
      technician?: Types.Maybe<
        { __typename?: 'PartnerEntity' } & Pick<Types.PartnerEntity, 'fullname' | 'hotline' | 'id'> & {
            qualifications?: Types.Maybe<Array<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'name'>>>;
            reviewSummary?: Types.Maybe<
              { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'starAverage' | 'total' | 'percent'>
            >;
            avatar?: Types.Maybe<{ __typename?: 'Media' } & Pick<Types.Media, 'fullThumbUrl'>>;
          }
      >;
      partner: { __typename?: 'PartnerEntity' } & Pick<Types.PartnerEntity, 'fullname' | 'hotline' | 'id'> & {
          qualifications?: Types.Maybe<Array<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'name'>>>;
          reviewSummary?: Types.Maybe<
            { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'starAverage' | 'total' | 'percent'>
          >;
          avatar?: Types.Maybe<{ __typename?: 'Media' } & Pick<Types.Media, 'fullThumbUrl'>>;
        };
      statusDetail?: Types.Maybe<
        { __typename?: 'BookingStatusEntity' } & Pick<
          Types.BookingStatusEntity,
          'bookingId' | 'createdAt' | 'id' | 'note' | 'partnerId'
        > & {
            reasons?: Types.Maybe<
              Array<{ __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'isActive' | 'name' | 'type'>>
            >;
          }
      >;
      vehicle: { __typename?: 'VehicleEntity' } & Pick<
        Types.VehicleEntity,
        | 'addressMoreInfo'
        | 'avatarId'
        | 'createdAt'
        | 'deletedAt'
        | 'detail'
        | 'hidden'
        | 'id'
        | 'latitude'
        | 'longitude'
        | 'mapAddress'
        | 'name'
        | 'operatingNumber'
        | 'operatingUnit'
        | 'ordinalNumber'
        | 'serialNumber'
        | 'updatedAt'
        | 'userId'
        | 'vehicleRegistrationPlate'
        | 'vinNumber'
        | 'yearOfManufacture'
      > & {
          avatar?: Types.Maybe<{ __typename?: 'Media' } & Pick<Types.Media, 'fullOriginalUrl' | 'fullThumbUrl' | 'id'>>;
          manufacturer?: Types.Maybe<
            { __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'isActive' | 'name' | 'type'>
          >;
          model?: Types.Maybe<
            { __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'isActive' | 'name' | 'type'>
          >;
          origin?: Types.Maybe<
            { __typename?: 'CategoryEntity' } & Pick<Types.CategoryEntity, 'id' | 'isActive' | 'name' | 'type'>
          >;
        };
      settlementAccepted?: Types.Maybe<{ __typename?: 'SettlementEntity' } & Pick<Types.SettlementEntity, 'id'>>;
    };
};

export const BookingDocument = gql`
  query booking($id: String!) {
    booking(id: $id) {
      addressMoreInfo
      code
      createdAt
      deletedAt
      description
      id
      latitude
      longitude
      mapAddress
      medias {
        createdAt
        fileSize
        fullOriginalUrl
        fullThumbUrl
        id
        isDeleted
        mimeType
        name
        originalUrl
        ownerId
        thumbUrl
        type
        updatedAt
        videoUrl
      }
      partnerId
      problemTexts
      problems {
        id
        isActive
        name
        type
      }
      status
      technician {
        fullname
        qualifications {
          name
        }
        reviewSummary {
          starAverage
          total
          percent
        }
        hotline
        id
        avatar {
          fullThumbUrl
        }
      }
      partner {
        fullname
        qualifications {
          name
        }
        reviewSummary {
          starAverage
          total
          percent
        }
        hotline
        id
        avatar {
          fullThumbUrl
        }
      }
      statusDetail {
        bookingId
        createdAt
        id
        note
        partnerId
        reasons {
          id
          isActive
          name
          type
        }
      }
      technicianCanReviewUser
      technicianId
      transportDistance
      transportDuration
      transportFee
      updatedAt
      userCanReviewAgency
      userCanReviewTechnician
      userId
      vehicle {
        addressMoreInfo
        avatar {
          fullOriginalUrl
          fullThumbUrl
          id
        }
        avatarId
        createdAt
        deletedAt
        detail
        hidden
        id
        latitude
        longitude
        manufacturer {
          id
          isActive
          name
          type
        }
        mapAddress
        model {
          id
          isActive
          name
          type
        }
        name
        operatingNumber
        operatingUnit
        ordinalNumber
        origin {
          id
          isActive
          name
          type
        }
        serialNumber
        updatedAt
        userId
        vehicleRegistrationPlate
        vinNumber
        yearOfManufacture
      }
      vehicleId
      settlementAccepted {
        id
      }
    }
  }
`;
export function useBookingQuery(baseOptions: Apollo.QueryHookOptions<BookingQueryResponse, BookingQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BookingQueryResponse, BookingQueryVariables>(BookingDocument, options);
}
export function useBookingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BookingQueryResponse, BookingQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BookingQueryResponse, BookingQueryVariables>(BookingDocument, options);
}
export type BookingQueryHookResult = ReturnType<typeof useBookingQuery>;
export type BookingLazyQueryHookResult = ReturnType<typeof useBookingLazyQuery>;
export type BookingQueryResult = Apollo.QueryResult<BookingQueryResponse, BookingQueryVariables>;
