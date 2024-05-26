import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type * as Types from '../type.interface';
const defaultOptions = {} as const;
export type PartnerLoginMutationVariables = Types.Exact<{
  input: Types.PartnerLoginInput;
}>;

export type PartnerLoginMutationResponse = { __typename?: 'Mutation' } & {
  partnerLogin: { __typename?: 'PartnerAuthConnection' } & Pick<
    Types.PartnerAuthConnection,
    'accessToken' | 'refreshToken'
  > & {
      partner: { __typename?: 'PartnerEntity' } & Pick<
        Types.PartnerEntity,
        | 'addressMoreInfo'
        | 'avatarId'
        | 'bank'
        | 'birthday'
        | 'cardNumber'
        | 'citizenId'
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
        | 'parentId'
        | 'phone'
        | 'suggestionPoint'
        | 'type'
        | 'updatedAt'
      > & {
          avatar?: Types.Maybe<
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
          education?: Types.Maybe<
            { __typename?: 'CategoryEntity' } & Pick<
              Types.CategoryEntity,
              'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
            >
          >;
          expenseInfo?: Types.Maybe<{ __typename?: 'Expense' } & Pick<Types.Expense, 'cost' | 'distance' | 'time'>>;
          level?: Types.Maybe<
            { __typename?: 'CategoryEntity' } & Pick<
              Types.CategoryEntity,
              'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
            >
          >;
          parentInfo?: Types.Maybe<
            { __typename?: 'PartnerEntity' } & Pick<
              Types.PartnerEntity,
              | 'addressMoreInfo'
              | 'avatarId'
              | 'bank'
              | 'birthday'
              | 'cardNumber'
              | 'citizenId'
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
              | 'parentId'
              | 'phone'
              | 'suggestionPoint'
              | 'type'
              | 'updatedAt'
            >
          >;
          qualifications?: Types.Maybe<
            Array<
              { __typename?: 'CategoryEntity' } & Pick<
                Types.CategoryEntity,
                'createdAt' | 'deletedAt' | 'id' | 'isActive' | 'name' | 'type' | 'updatedAt'
              >
            >
          >;
          reviewSummary?: Types.Maybe<
            { __typename?: 'ReviewSummary' } & Pick<Types.ReviewSummary, 'percent' | 'starAverage' | 'total'>
          >;
          starInfo: Array<{ __typename?: 'StarInfo' } & Pick<Types.StarInfo, 'star' | 'total'>>;
        };
    };
};

export const PartnerLoginDocument = gql`
  mutation partnerLogin($input: PartnerLoginInput!) {
    partnerLogin(input: $input) {
      accessToken
      partner {
        addressMoreInfo
        avatar {
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
        avatarId
        bank
        birthday
        cardNumber
        citizenId
        createdAt
        deletedAt
        description
        education {
          createdAt
          deletedAt
          id
          isActive
          name
          type
          updatedAt
        }
        email
        expenseInfo {
          cost
          distance
          time
        }
        fullname
        hotline
        id
        isActive
        isApproved
        latitude
        level {
          createdAt
          deletedAt
          id
          isActive
          name
          type
          updatedAt
        }
        longitude
        mapAddress
        parentId
        parentInfo {
          addressMoreInfo
          avatarId
          bank
          birthday
          cardNumber
          citizenId
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
          parentId
          phone
          suggestionPoint
          type
          updatedAt
        }
        phone
        qualifications {
          createdAt
          deletedAt
          id
          isActive
          name
          type
          updatedAt
        }
        reviewSummary {
          percent
          starAverage
          total
        }
        starInfo {
          star
          total
        }
        suggestionPoint
        type
        updatedAt
      }
      refreshToken
    }
  }
`;
export function usePartnerLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<PartnerLoginMutationResponse, PartnerLoginMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PartnerLoginMutationResponse, PartnerLoginMutationVariables>(PartnerLoginDocument, options);
}
export type PartnerLoginMutationHookResult = ReturnType<typeof usePartnerLoginMutation>;
export type PartnerLoginMutationResult = Apollo.MutationResult<PartnerLoginMutationResponse>;
export type PartnerLoginMutationOptions = Apollo.BaseMutationOptions<
  PartnerLoginMutationResponse,
  PartnerLoginMutationVariables
>;
