import { gql } from '@apollo/client';

import type * as Types from '../type.interface';

export type UserFragmentFragment = { __typename?: 'UserEntity' } & Pick<
  Types.UserEntity,
  'address' | 'birthday' | 'certificate' | 'email' | 'fullname' | 'id' | 'isActive' | 'phone' | 'updatedAt'
> & { avatar?: Types.Maybe<{ __typename?: 'Media' } & Pick<Types.Media, 'id' | 'fullOriginalUrl' | 'fullThumbUrl'>> };

export const UserFragmentFragmentDoc = gql`
  fragment UserFragment on UserEntity {
    address
    avatar {
      id
      fullOriginalUrl
      fullThumbUrl
    }
    birthday
    certificate
    email
    fullname
    id
    isActive
    phone
    updatedAt
  }
`;
