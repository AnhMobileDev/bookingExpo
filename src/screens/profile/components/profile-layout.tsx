import { Row } from 'antd';

import { UserEntity } from '../../../graphql/type.interface';

import TabsLeftProfile from './tabs-left-profile';
interface Props {
  user: UserEntity;
  children: any;
}

const ProfileLayout = ({ children, user }: Props) => {
  return (
    <Row gutter={20} className="my-5 w-full flex-nowrap">
      <TabsLeftProfile user={user} />
      {children}
    </Row>
  );
};

export default ProfileLayout;
