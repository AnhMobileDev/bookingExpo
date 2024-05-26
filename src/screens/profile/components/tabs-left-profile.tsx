import { Col, Menu } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState, useCallback, memo } from 'react';

import { AccountInfo, Address, AskIcon, Star, Wishlist } from '../../../assets/icon';
import { UserEntity } from '../../../graphql/type.interface';
import { normalizeUUid } from '../../../utils/normalizeUUid';

const menus = [
  {
    url: 'account',
    icon: <AccountInfo />,
    title: 'Thông tin tài khoản',
  },
  {
    url: 'address',
    icon: <Address />,
    title: 'Địa chỉ',
  },
  {
    url: 'favourite-product',
    icon: <Wishlist />,
    title: 'Danh sách yêu thích',
  },
];

interface Props {
  user: UserEntity;
}

const TabsLeftProfile = memo(({ user }: Props) => {
  const [activeKey, setActiveKey] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const res = searchParams.get('info');
    res == null ? setActiveKey('account') : setActiveKey(res as string);
  }, [searchParams]);

  const handleChangeTab = useCallback(
    (e: any) => {
      setActiveKey(e.key);
      setSearchParams((params) => {
        params.set('info', e.key);
        return params;
      });
    },
    [setSearchParams],
  );

  return (
    <Col className="w-[300px] flex-shrink-0">
      <div className="bg-white ml-7  ">
        <div className="p-4 flex flex-col gap-5 mb-4">
          <div className="flex gap-4">
            <div className="w-14 h-14">
              <img className="w-full h-full rounded-full object-cover" src={user?.avatar?.fullThumbUrl || ''} alt="" />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold">{user?.fullname}</h2>
              <span>ID: {normalizeUUid(user.id)}</span>
            </div>
          </div>
          <div className="rounded-full bg-[#FFF4D9] h-11 flex items-center justify-center gap-2">
            <Star></Star>
            <span>
              Điểm uy tín: <span className=" text-xl font-semibold">4.8/5</span>
            </span>
            <AskIcon />
          </div>
        </div>
        <div>
          <Menu
            defaultSelectedKeys={['account']}
            selectedKeys={[activeKey]}
            onClick={(e) => handleChangeTab(e)}
            items={menus.map((item) => {
              const key = item.url;
              return {
                key,
                label: (
                  <div className={`flex h-12 items-center  hover:bg-r-[#f5b102] gap-3 px-5 py-3 `}>
                    <span className=" translate-y-1"> {item.icon}</span>
                    <div className=" text-grayscale-black">{item.title}</div>
                  </div>
                ),
              };
            })}
          />
        </div>
      </div>
    </Col>
  );
});

export default TabsLeftProfile;
