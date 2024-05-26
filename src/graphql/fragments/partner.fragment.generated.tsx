import { gql } from '@apollo/client';

import type * as Types from '../type.interface';

export type PartnerFragmentFragment = { __typename?: 'PartnerEntity' } & Pick<
  Types.PartnerEntity,
  | 'addressMoreInfo'
  | 'avatarId'
  | 'birthday'
  | 'createdAt'
  | 'deletedAt'
  | 'email'
  | 'fullname'
  | 'hotline'
  | 'id'
  | 'isActive'
  | 'phone'
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
      >
    >;
  };

export const PartnerFragmentFragmentDoc = gql`
  fragment PartnerFragment on PartnerEntity {
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
    }
    avatarId
    birthday
    createdAt
    deletedAt
    email
    fullname
    hotline
    id
    isActive
    phone
    type
    updatedAt
  }
`;
