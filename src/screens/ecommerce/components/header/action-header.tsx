import { memo, useMemo } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import { HeartIcon, ReceipItemIcon, USDCoinIcon } from '../../../../assets/icon';
import { useUserCountProductQuotationForEachStatusQuery } from '../../../../graphql/queries/userCountProductQuotationForEachStatus.generated';
import { AppRoutes } from '../../../../helpers';
import { useCountOrderItemForEachStatusQuery } from '../../../../graphql/queries/countOrderItemForEachStatus.generated';
import { useUserCountFavoriteProductsQuery } from '../../../../graphql/queries/userCountFavoriteProducts.generated';

export const ActionHeader = memo(() => {
  const navigate = useNavigate();
  const { data: dataProductQuotation, loading: loadingProductQuotation } =
    useUserCountProductQuotationForEachStatusQuery();
  const productQuotation = useMemo(
    () => dataProductQuotation?.userCountProductQuotationForEachStatus,
    [dataProductQuotation],
  );

  const { data: dataOrder, loading: loadingOrder } = useCountOrderItemForEachStatusQuery();
  const orders = useMemo(() => dataOrder?.countOrderItemForEachStatus, [dataOrder]);

  const { data: dataProductsFavorite, loading: loadingProductsFavorite } = useUserCountFavoriteProductsQuery();
  const productsFavorite = useMemo(() => dataProductsFavorite?.userCountFavoriteProducts, [dataProductsFavorite]);

  const loading = useMemo(
    () => loadingProductQuotation || loadingOrder || loadingProductsFavorite,
    [loadingOrder, loadingProductQuotation, loadingProductsFavorite],
  );

  const buttons = useMemo(
    () => [
      {
        icon: <ReceipItemIcon />,
        label: `Đơn hàng (${loading ? 0 : orders?.reduce((total, it) => total + it?.totalItem, 0)})`,
        value: '0',
        to: AppRoutes.orders.list.value,
      },
      {
        icon: <USDCoinIcon />,
        label: `Báo giá (${loading ? 0 : productQuotation?.reduce((total, it) => total + it?.totalItem, 0)})`,
        value: '1',
        to: AppRoutes.quotations.list.value,
      },
      {
        icon: <HeartIcon />,
        label: `Yêu thích (${loading ? 0 : productsFavorite})`,
        value: '2',
        to: '/profile?info=favourite-product',
      },
    ],
    [loading, orders, productQuotation, productsFavorite],
  );

  return (
    <div className="flex items-center gap-x-[12px]">
      {buttons.map(({ icon: Icon, label, value, to }) => (
        <Button key={'button' + value} onClick={() => navigate(to)}>
          <div className="flex items-center gap-x-[8px]">
            {Icon}
            <span className="text-14px font-normal leading-16px">{label}</span>
          </div>
        </Button>
      ))}
    </div>
  );
});
