import { Suspense, lazy } from 'react';

import { ProgressLoading } from '../components';

const LazyLayout = (importStatement: () => Promise<any>) => {
  const Component = lazy(importStatement);

  return (
    <Suspense fallback={<ProgressLoading />}>
      <Component />
    </Suspense>
  );
};

export const Home = () => LazyLayout(() => import('./home'));
export const Login = () => LazyLayout(() => import('./login'));
export const Register = () => LazyLayout(() => import('./register'));
export const UIComponent = () => LazyLayout(() => import('./ui-components'));
export const Dashboard = () => LazyLayout(() => import('./dashboard'));
export const Setting = () => LazyLayout(() => import('./setting'));
export const References = () => LazyLayout(() => import('./references'));
export const Profile = () => LazyLayout(() => import('./profile'));
export const RequestRepair = () => LazyLayout(() => import('./request-repair'));
export const RequestRepairCreate = () => LazyLayout(() => import('./request-repair/create'));
export const MyVehicle = () => LazyLayout(() => import('./vehicle'));
export const Survey = () => LazyLayout(() => import('./survey'));
export const Feedback = () => LazyLayout(() => import('./feedback'));
export const Ecommerce = () => LazyLayout(() => import('./ecommerce/index'));
export const EcommerceCategory = () => LazyLayout(() => import('./ecommerce/ecommer-category'));
export const EcommerceProductDetail = () => LazyLayout(() => import('./ecommerce/product-detail'));
export const EcommerceStoreDetail = () => LazyLayout(() => import('./ecommerce/store-detail'));
export const Maintenances = () => LazyLayout(() => import('./maintenances'));
export const MaintenanceForm = () => LazyLayout(() => import('./maintenances/form'));
export const Cart = () => LazyLayout(() => import('./cart/index'));
export const Payment = () => LazyLayout(() => import('./ecommerce/payment'));
export const NoteBook = () => LazyLayout(() => import('./note-book/index'));
export const DetailMaintenance = () => LazyLayout(() => import('./maintenances/detail'));
export const ProductQuotation = () => LazyLayout(() => import('./product-quotation/index'));
export const ProductQuotationDetail = () => LazyLayout(() => import('./product-quotation/detail'));
export const Order = () => LazyLayout(() => import('./order/index'));
export const OrderDetail = () => LazyLayout(() => import('./order/detail'));
