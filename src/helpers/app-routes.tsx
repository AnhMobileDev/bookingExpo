export const AppRoutes = {
  home: '/',
  dashboard: '/dashboard',
  quotes: '/quotes',
  products: '/products',
  promotions: '/promotions',
  requestRepair: {
    index: '/request-repair',
    list: {
      lable: 'Danh sách sửa chữa ',
      value: '/request-repair',
    },
    detail: {
      index: '/request-repair/:id',
      id: (id: string) => `/request-repair/${id}`,
      label: 'Chi tiết sửa chữa',
    },
    create: {
      label: 'Them',
      value: '/request-repair/create',
    },
  },
  maintenances: {
    index: '/maintenances',
    list: {
      label: 'Danh sách bảo dưỡng',
      value: '/maintenances',
    },
    create: {
      label: 'Thêm mới bảo dưỡng',
      value: '/maintenances/create',
    },
    detail: {
      value: '/maintenances/:id',
      id: (id: string) => `/maintenances/${id}`,
      label: 'Chi tiết bảo dưỡng',
    },
  },
  orders: {
    index: '/orders',
    list: {
      label: 'Đơn hàng của tôi',
      value: '/orders',
    },
    detail: {
      value: '/orders/:id',
      id: (id: string) => `/orders/${id}`,
      label: 'Chi tiết đơn hàng',
    },
  },
  quotations: {
    index: '/quotations',
    list: {
      label: 'Danh sách yêu cầu báo giá',
      value: '/quotations',
    },
    detail: {
      value: '/quotations/:id',
      id: (id: string) => `/quotations/${id}`,
      label: 'Chi tiết báo giá',
    },
  },
  shopping: {
    index: '/shopping',
    list: {
      label: 'Mua sắm',
      value: '/shopping',
    },
    category: {
      detai: '/shopping/category/:category',
      detaiCategory: (category: string) => `/shopping/category/${category}`,
    },
    product: {
      detai: '/shopping/product/:id',
      detailId: (id: string) => `/shopping/product/${id}`,
    },
    store: {
      detai: '/shopping/store/:id',
      detailId: (id: string) => `/shopping/store/${id}`,
    },
    payment: {
      label: 'Thanh toán',
      value: '/shopping/payment',
    },
  },
  feedback: {
    index: '/feedback',
    list: {
      label: 'Phản hồi về chất lượng ...',
      value: '/feedback',
    },
  },
  note: {
    index: '/note-book',
    list: {
      label: 'Sổ tay',
      value: '/note-book',
    },
  },
  news: {
    index: '/news',
    list: {
      label: 'Tin tức',
      value: '/news',
    },
  },
  review: '/review',
  cart: {
    label: 'Giỏ hàng',
    value: '/cart',
  },
  technician: '/technician',
  courses: '/courses',
  revenue: '/revenue',
  references: '/references',
  setting: '/setting',
  vehicle: '/vehicle',
  survey: '/survey',
  profile: '/profile',
  404: '/404',
  auth: {
    index: '/auth',
    login: '/auth/login',
    register: '/auth/register',
  },
};
