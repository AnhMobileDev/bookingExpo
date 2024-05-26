import { AppRoutes } from '../../helpers';
import {
  MenuCourseIcon,
  MenuFeedbackIcon,
  MenuHomeIcon,
  MenuMaintenacesIcon,
  MenuNewsIcon,
  MenuOrderIcon,
  MenuProfileIcon,
  MenuQuoteIcon,
  MenuRequestRepairIcon,
  MenuSettingIcon,
  MenuShoppingIcon,
  MenuSurveyIcon,
  MenuVehicleIcon,
} from '../../assets/icon';

export const tabRouters = {
  route: {
    routes: [
      {
        path: AppRoutes.dashboard,
        name: 'Trang chủ',
        icon: <MenuHomeIcon />,
      },
      {
        path: AppRoutes.requestRepair.list.value,
        name: AppRoutes.requestRepair.list.lable,
        icon: <MenuRequestRepairIcon />,
      },
      {
        path: AppRoutes.maintenances.index,
        name: AppRoutes.maintenances.list.label,
        icon: <MenuMaintenacesIcon />,
      },
      {
        path: AppRoutes.orders.list.value,
        name: AppRoutes.orders.list.label,
        icon: <MenuOrderIcon />,
      },
      {
        path: AppRoutes.quotations.list.value,
        name: AppRoutes.quotations.list.label,
        icon: <MenuQuoteIcon />,
      },
      {
        path: AppRoutes.shopping.index,
        name: AppRoutes.shopping.list.label,
        icon: <MenuShoppingIcon />,
      },
      {
        path: AppRoutes.feedback.index,
        name: AppRoutes.feedback.list.label,
        icon: <MenuFeedbackIcon />,
      },
      {
        path: AppRoutes.note.index,
        name: AppRoutes.note.list.label,
        icon: <MenuCourseIcon />,
      },
      // {
      //   path: AppRoutes.news.index,
      //   name: AppRoutes.news.list.label,
      //   icon: <MenuNewsIcon />,
      // },
      // {
      //   path: AppRoutes.setting,
      //   name: 'Thiết lập hồ sơ',
      //   icon: <MenuSettingIcon />,
      // },
      {
        path: AppRoutes.survey,
        name: 'Khảo sát',
        icon: <MenuSurveyIcon />,
      },
      {
        path: AppRoutes.vehicle,
        name: 'Xe của tôi',
        icon: <MenuVehicleIcon />,
      },
      {
        path: AppRoutes.profile,
        name: 'Tài khoản',
        icon: <MenuProfileIcon />,
      },
    ],
  },
};
