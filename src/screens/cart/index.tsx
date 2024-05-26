import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { Avatar, Button, Divider, InputNumber, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useMyCartQuery } from '../../graphql/queries/myCart.generated';
import { SubHeader } from '../../components';
import { AppRoutes, getGraphQLErrorMessage } from '../../helpers';
import { MasterTable } from '../../components/master-table';
import { numberWithDots, showNotification } from '../../utils';
import { StoreItem } from '../ecommerce/components';
import { CartItemEntity, ProductEntity } from '../../graphql/type.interface';
import { useDeleteCartItemsMutation } from '../../graphql/mutations/deleteCartItems.generated';

import './style.css';

export type QuantityByProduct = {
  productId: string;
  quantity: number;
  note?: string;
};

const minQuantity = 1;

const Cart = memo(() => {
  const navigate = useNavigate();
  const { data, loading: getting, refetch } = useMyCartQuery({ fetchPolicy: 'cache-and-network' });
  const [productsBuy, setProductsBuy] = useState<CartItemEntity[]>([]);
  const [quantityByProduct, setQuantityByProduct] = useState<QuantityByProduct[]>([]);

  const rowSelection = {
    onChange: (_: React.Key[], selectedRows: CartItemEntity[]) => {
      setProductsBuy(selectedRows);
    },
  };

  const [removeProductCart, { loading: removing }] = useDeleteCartItemsMutation({
    onCompleted() {
      refetch();
    },
    onError(error) {
      showNotification('error', getGraphQLErrorMessage(error));
    },
  });

  const loading = useMemo(() => removing || getting, [getting, removing]);

  const handleRemoveProduct = useCallback(
    (id: string) => {
      removeProductCart({
        variables: {
          input: {
            cartItems: [id],
          },
        },
      });
    },
    [removeProductCart],
  );

  useEffect(() => {
    if (data?.myCart?.items && data?.myCart?.items.length > 0) {
      setQuantityByProduct(
        data?.myCart?.items.map((it) => ({
          productId: it?.productId,
          quantity: it?.quantity,
        })),
      );
    }
  }, [data?.myCart?.items]);

  const handleChangeQuantity = useCallback(
    (quantity = 1, product: ProductEntity, isIncrease = false) => {
      let newQuantity = 0;
      if (isIncrease) {
        newQuantity = quantity + 1 > (product?.quantity ?? 1) ? product?.quantity ?? 1 : quantity + 1;
      } else {
        newQuantity = quantity - 1 < minQuantity ? minQuantity : quantity - 1;
      }

      setQuantityByProduct(
        quantityByProduct.map((it) => {
          if (it?.productId === product?.id) return { ...it, quantity: newQuantity };
          return it;
        }),
      );
    },
    [quantityByProduct],
  );

  const totalPayment = useMemo(() => {
    return productsBuy.reduce((total, it) => {
      const quantity = quantityByProduct?.find((q) => q?.productId === it?.productId)?.quantity ?? 1;
      const unitPrice: number = data?.myCart.items.find((v) => v?.productId === it?.productId)?.product.unitPrice ?? 1;
      return total + unitPrice * quantity;
    }, 0);
  }, [data?.myCart.items, productsBuy, quantityByProduct]);

  const columnDefault: ColumnsType<any> = useMemo(
    () => [
      {
        title: 'Sản phẩm',
        key: 'product',
        dataIndex: 'product',
        width: '25%',
        render: (it) => {
          return (
            <div className="flex" key={it?.id}>
              {it?.avatar?.fullThumbUrl && <Avatar shape="square" src={it?.avatar?.fullThumbUrl} />}
              <span className="pl-12px text-14px font-medium leading-20px line-clamp-1">{it.name}</span>
            </div>
          );
        },
      },
      {
        title: 'Số lượng',
        key: 'quantity',
        dataIndex: 'quantity',
        align: 'center',
        width: '15%',
        render: (quantity, record) => {
          const value = quantityByProduct.find((it) => it?.productId === record?.productId)?.quantity;
          return (
            <InputNumber
              id="quantity-cart"
              className="w-[140px] text-center"
              addonBefore={
                <span
                  className={`px-6px py-[6px] hover:cursor-pointer`}
                  onClick={() => handleChangeQuantity(value, record?.product)}>
                  -
                </span>
              }
              addonAfter={
                <span
                  className={`px-6px py-[8px] hover:cursor-pointer`}
                  onClick={() => handleChangeQuantity(value, record?.product, true)}>
                  +
                </span>
              }
              value={value}
              min={1}
              max={record?.product?.quantity}
            />
          );
        },
      },
      {
        title: 'Đơn giá',
        key: 'unitPrice',
        dataIndex: 'product',
        align: 'right',
        width: '10%',
        render: (product) => numberWithDots(product?.unitPrice) + 'đ',
      },
      {
        title: 'Tổng cộng',
        key: 'total',
        dataIndex: 'total',
        align: 'right',
        width: '10%',
        render: (total) => numberWithDots(total) + 'đ',
      },
      {
        title: 'Tùy chọn',
        key: 'total',
        dataIndex: 'product',
        align: 'center',
        width: '10%',
        render: (product, record) => (
          <div className="flex justify-center items-center gap-x-12px">
            <span className="hover:cursor-pointer text-error" onClick={() => handleRemoveProduct(record?.id)}>
              Xóa
            </span>
            <Divider type="vertical" />
            <span
              className="hover:cursor-pointer text-primary"
              onClick={() => navigate(AppRoutes.shopping.product.detailId(product?.id))}>
              Xem chi tiết
            </span>
          </div>
        ),
      },
    ],
    [handleChangeQuantity, handleRemoveProduct, navigate, quantityByProduct],
  );

  return (
    <Spin spinning={loading}>
      <div>
        <SubHeader
          items={[
            {
              title: 'Trang chủ',
              to: AppRoutes.home,
            },
            {
              title: AppRoutes.shopping.list.label,
              to: AppRoutes.shopping.list.value,
            },
            {
              title: AppRoutes.cart.label,
            },
          ]}
        />
        <div className="m-20px p-20px bg-white">
          <MasterTable
            data={data?.myCart?.items ?? []}
            columns={columnDefault}
            rowSelection={{
              type: 'checkbox',
              columnWidth: '3%',
              ...rowSelection,
            }}
            bordered
            expandable={{
              defaultExpandAllRows: true,
              showExpandColumn: true,
              columnWidth: '3%',
              expandedRowRender: (record) => <StoreItem store={record?.store} />,
            }}
          />
        </div>
        <div className="fixed left-[240px] right-0 bottom-0 bg-white px-24px py-12px flex items-center justify-between">
          <div></div>
          <div className="flex items-center gap-x-12px">
            <span className="text-14px leading-20px">Tổng thanh toán ({productsBuy.length ?? 0} sản phẩm):</span>
            <span className="text-14px font-semibold leading-20px">{numberWithDots(totalPayment) + ' đ'}</span>
            <Button
              type="primary"
              disabled={!productsBuy || (productsBuy && productsBuy.length === 0)}
              onClick={() =>
                navigate(AppRoutes.shopping.payment.value, {
                  state: {
                    products: productsBuy.map((it) => it?.product),
                    carts: productsBuy,
                    quantityByProduct: quantityByProduct.filter(
                      (it) => !!productsBuy.find((i) => i?.productId === it?.productId),
                    ),
                    isCart: true,
                    totalPayment,
                  },
                })
              }>
              Đặt mua
            </Button>
          </div>
        </div>
      </div>
    </Spin>
  );
});

export default Cart;
