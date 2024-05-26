import ProLayout from '@ant-design/pro-layout';
import { memo, ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './style.less';

import { Header } from './header';
import { tabRouters } from './tab-routers';
import { MenuFooter } from './menu-footer';

interface LayoutProps {
  children: ReactNode;
  collapsible?: boolean;
}

export const MainLayout = memo(({ children, collapsible = true }: LayoutProps) => {
  const [collapsed, setCollapsed] = useState(collapsible ? false : true);

  return (
    <ProLayout
      {...tabRouters}
      layout="mix"
      location={useLocation()}
      fixedHeader={true}
      fixSiderbar={true}
      collapsed={collapsed}
      onCollapse={(collapsed) => collapsible && setCollapsed(collapsed)}
      menuHeaderRender={false}
      menuItemRender={(item: any, dom: any) => <Link to={item.path!}>{dom}</Link>}
      menuFooterRender={() => <MenuFooter />}
      navTheme="light"
      headerRender={() => <Header />}
      siderWidth={240}
      hasSiderMenu={false}
      contentStyle={{ margin: collapsible ? undefined : 0 }}
      collapsedButtonRender={collapsible ? undefined : false}>
      <div className="flex-grow">{children}</div>
    </ProLayout>
  );
});
