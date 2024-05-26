import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';
import { memo } from 'react';

export const Footer = memo(() => (
  <DefaultFooter
    copyright="2019 by Ant Financial Experience Technology Department"
    links={[
      {
        key: 'Ant Design Pro',
        title: 'Ant Design Pro',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/ant-design/ant-design-pro',
        blankTarget: true,
      },
      {
        key: 'Ant Design',
        title: 'Ant Design',
        href: 'https://ant.design',
        blankTarget: true,
      },
    ]}
  />
));
