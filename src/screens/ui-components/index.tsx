import { Navigate } from 'react-router-dom';

import { AppRoutes } from '../../helpers';

export default function UIComponent() {
  return <Navigate to={AppRoutes.dashboard} />;
  // return (
  //   <div>
  //     <Button type="primary">Đăng nhập</Button>
  //     <Button type="primary" disabled>
  //       Đăng nhập
  //     </Button>
  //     <Button type="dashed">Đăng nhập</Button>
  //     <Button type="ghost">Đăng nhập</Button>
  //     <Button type="default">Đăng nhập</Button>

  //     <Input placeholder="Write some thing..." />

  //     <Checkbox>Ghi nhớ</Checkbox>
  //   </div>
  // );
}
