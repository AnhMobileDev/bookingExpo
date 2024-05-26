import { useSearchParams } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';

import { FullscreenLoading, SubHeader } from '../../components';
import { useMeUserQuery } from '../../graphql/queries/meUser.generated';
import { UserEntity } from '../../graphql/type.interface';

import Account from './components/account';
import AddressProfile from './components/address';
import FavouriteProduct from './components/favorite-product';

const Profile = () => {
  const [searchParams] = useSearchParams();

  const [image, setImage] = useState<File>();

  const [tabs, setTabs] = useState<string>('');

  const { data: rs, refetch } = useMeUserQuery();

  const user = useMemo(() => rs?.meUser, [rs]);

  useEffect(() => {
    const res = searchParams.get('info');
    switch (res) {
      case 'account':
      default:
        setTabs('account');
        break;
      case 'address':
        setTabs('address');
        break;
      case 'favourite-product':
        setTabs('favourite-product');
        break;
    }
  }, [searchParams]);

  if (user == null) return <FullscreenLoading />;

  return (
    <div>
      <SubHeader
        items={[
          { title: 'Trang chủ', to: null },
          { title: 'Tài khoản', to: null },
        ]}
      />
      {tabs === 'account' && (
        <Account refetch={refetch} image={image as File} setImage={setImage} user={user as UserEntity} />
      )}
      {tabs === 'address' && <AddressProfile user={user as UserEntity} />}
      {tabs === 'favourite-product' && <FavouriteProduct user={user as UserEntity} />}
    </div>
  );
};

export default Profile;
