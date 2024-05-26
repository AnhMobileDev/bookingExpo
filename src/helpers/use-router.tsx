import { createBrowserRouter } from 'react-router-dom';

import {
  Cart,
  Dashboard,
  Ecommerce,
  EcommerceCategory,
  EcommerceProductDetail,
  EcommerceStoreDetail,
  DetailMaintenance,
  Feedback,
  Home,
  Login,
  MaintenanceForm,
  Maintenances,
  MyVehicle,
  Payment,
  ProductQuotation,
  ProductQuotationDetail,
  Order,
  OrderDetail,
  Profile,
  References,
  Register,
  RequestRepairCreate,
  Setting,
  Survey,
  UIComponent,
  NoteBook,
} from '../screens';
import { PrivateRoute } from '../components';
import { MainLayout } from '../layouts';
import { AuthLayout } from '../layouts/auth-layout';
import RequestRepair from '../screens/request-repair';
import { RepairDetail } from '../screens/request-repair/detail';
import VehicleDetail from '../screens/vehicle/vehicle-detail';

import { AppRoutes } from './app-routes';

export const useRouter = () => {
  return createBrowserRouter([
    {
      path: AppRoutes.auth.index,
      element: <PrivateRoute isAuthRoute layout={AuthLayout} />,
      children: [
        {
          path: AppRoutes.auth.login,
          element: <Login />,
        },
        {
          path: AppRoutes.auth.register,
          element: <Register />,
        },
      ],
    },
    {
      path: AppRoutes.home,
      element: <PrivateRoute layout={MainLayout} isPrivate />,
      children: [
        {
          path: AppRoutes.dashboard,
          element: <Home />,
        },
        {
          path: AppRoutes.home,
          element: <UIComponent />,
        },
        {
          path: AppRoutes.requestRepair.list.value,
          element: <RequestRepair />,
        },
        {
          path: AppRoutes.requestRepair.detail.index,
          element: <RepairDetail />,
        },
        {
          path: AppRoutes.requestRepair.create.value,
          element: <RequestRepairCreate />,
        },
        {
          path: AppRoutes.setting,
          element: <Setting />,
        },
        {
          path: AppRoutes.references,
          element: <References />,
        },
        {
          path: AppRoutes.survey,
          element: <Survey />,
        },
        {
          path: AppRoutes.vehicle,
          element: <MyVehicle />,
        },
        {
          path: AppRoutes.vehicle + '/:slug',
          element: <VehicleDetail />,
        },
        {
          path: AppRoutes.profile,
          element: <Profile />,
        },
        {
          path: AppRoutes.feedback.index,
          element: <Feedback />,
        },
        {
          path: AppRoutes.shopping.list.value,
          element: <Ecommerce />,
        },
        {
          path: AppRoutes.shopping.category.detai,
          element: <EcommerceCategory />,
        },
        {
          path: AppRoutes.shopping.product.detai,
          element: <EcommerceProductDetail />,
        },
        {
          path: AppRoutes.shopping.store.detai,
          element: <EcommerceStoreDetail />,
        },
        {
          path: AppRoutes.maintenances.index,
          element: <Maintenances />,
        },
        {
          path: AppRoutes.maintenances.create.value,
          element: <MaintenanceForm />,
        },
        {
          path: AppRoutes.cart.value,
          element: <Cart />,
        },
        {
          path: AppRoutes.shopping.payment.value,
          element: <Payment />,
        },
        {
          path: AppRoutes.note.index,
          element: <NoteBook />,
        },
        {
          path: AppRoutes.maintenances.detail.value,
          element: <DetailMaintenance />,
        },
        {
          path: AppRoutes.quotations.list.value,
          element: <ProductQuotation />,
        },
        {
          path: AppRoutes.quotations.detail.value,
          element: <ProductQuotationDetail />,
        },
        {
          path: AppRoutes.orders.list.value,
          element: <Order />,
        },
        {
          path: AppRoutes.orders.detail.value,
          element: <OrderDetail />,
        },
      ],
    },
    {
      path: '/ui-components',
      element: <UIComponent />,
    },
  ]);
};
