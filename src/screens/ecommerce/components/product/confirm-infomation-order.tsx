import { memo, useCallback, useMemo } from 'react';
import { Avatar, Button, Col, Descriptions, Divider, Radio, Row } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import {
  AddressEntity,
  CartItemEntity,
  DiscountCodeEntity,
  DiscountCodeUnitEnum,
  ProductEntity,
} from '../../../../graphql/type.interface';
import { useCreateOrdersMutation } from '../../../../graphql/mutations/createOrders.generated';
import { numberWithDots, showNotification } from '../../../../utils';
import { AppRoutes, getGraphQLErrorMessage } from '../../../../helpers';
import { useAddCartItemsMutation } from '../../../../graphql/mutations/addCartItems.generated';
import { QuantityByProduct } from '../../../cart';
import { SubHeader } from '../../../../components';
import { useDialog } from '../../../../contexts';
import { SentSuccess } from '../../../../assets/icon';
import { MyOrdersDocument } from '../../../../graphql/queries/myOrders.generated';
import { CountOrderItemForEachStatusDocument } from '../../../../graphql/queries/countOrderItemForEachStatus.generated';

type Props = {
  discount?: DiscountCodeEntity;
  products: ProductEntity[];
  productsBuy: QuantityByProduct[];
  address: AddressEntity;
  isCart?: boolean;
  onReChooseAddress: () => void;
  onReChooseVoucher: () => void;
  carts: CartItemEntity[];
};

export const ConfirmInfomationOrder = memo(
  ({ discount, products, productsBuy, address, isCart, onReChooseAddress, onReChooseVoucher, carts = [] }: Props) => {
    const { openDialog, resetDiaLog } = useDialog();
    const navigate = useNavigate();
    const [addProductToCart, { loading: addingToCart }] = useAddCartItemsMutation({
      onCompleted(res) {
        const item = res?.addCartItems?.items?.find((it) => it?.productId === productsBuy[0]?.productId);
        onSubmit(
          [
            {
              ...item,
              product: products[0],
            },
          ] as CartItemEntity[],
          productsBuy[0].note,
        );
      },
      onError(e) {
        showNotification('error', 'Thêm sản phẩm vào giỏ hàng thất bại', getGraphQLErrorMessage(e));
      },
    });

    const [createOrdeMutation, { loading: creating }] = useCreateOrdersMutation({
      onCompleted() {
        openDialog({
          type: 'CONFIRM',
          title: ' ',
          message: (
            <div className="text-center">
              <SentSuccess />
              <p className="text-24px font-semibold mt-8px mb-[38px]">Thanh toán thành công</p>
              <Button
                type="primary"
                onClick={() => {
                  navigate(AppRoutes.orders.list.value);
                  resetDiaLog();
                }}>
                Về trang Danh sách đơn hàng
              </Button>
            </div>
          ),
          hiddenFooter: true,
        });
      },
      onError(error) {
        showNotification('error', 'Thanh toán thất bại', getGraphQLErrorMessage(error));
      },
    });

    const loading = useMemo(() => addingToCart || creating, [addingToCart, creating]);

    const totalPayment = useMemo(() => {
      const { products: productsDiscount, isAssignAllProduct, unit, value = 0 } = discount || {};
      const isPercent = unit === DiscountCodeUnitEnum.PERCENTAGE;
      let total = 0;

      productsBuy?.forEach?.((it) => {
        const product = products?.find((p) => p?.id === it?.productId);
        const val = (product?.unitPrice ?? 1) * it?.quantity;
        total += val;
        const code = productsDiscount?.find((product) => product?.id === it?.productId);
        if (code || isAssignAllProduct) {
          if (isPercent) {
            total -= (val * value) / 100;
          } else {
            total -= value;
          }
        }
      });

      const totalPayment = Math.floor(total);
      return totalPayment;
    }, [discount, products, productsBuy]);

    const onSubmit = useCallback(
      (carts: CartItemEntity[], note?: string) => {
        const { products, isAssignAllProduct, unit, value = 0 } = discount || {};
        const isPercent = unit === DiscountCodeUnitEnum.PERCENTAGE;

        const groupCart: CartItemEntity[][] = Object.values(
          carts?.reduce?.((acc: any, item) => {
            const storeId = item?.store?.id || '';
            if (!acc[storeId]) {
              acc[storeId] = [];
            }
            acc[storeId].push(item);
            return acc;
          }, []),
        );

        const input = {
          totalPayment: totalPayment,
          addressId: address?.id as string,
          orders: groupCart?.map?.((its: CartItemEntity[]) => {
            let total = 0,
              payment = 0;

            its?.forEach?.((it: CartItemEntity) => {
              const codeAvailabel =
                !!products?.find?.((product) => product?.id === it?.product?.id) || isAssignAllProduct;
              const val = it?.product?.unitPrice * it?.quantity;
              total += val;
              payment += codeAvailabel ? (isPercent ? Math.floor((val * (100 - value)) / 100) : val - value) : val;
            });

            return {
              shippingFee: 0,
              cartItemIds: its?.map?.((it: CartItemEntity) => it?.id),
              total,
              totalPayment: payment,
              discountCodeId: total !== totalPayment ? discount?.id : '',
              note,
            };
          }),
        };

        createOrdeMutation({
          variables: {
            input,
          },
          refetchQueries: [MyOrdersDocument, CountOrderItemForEachStatusDocument],
        });
      },
      [address?.id, createOrdeMutation, discount, totalPayment],
    );

    const handleCreateOrder = useCallback(() => {
      if (isCart) {
        onSubmit(carts);
      } else {
        addProductToCart({
          variables: {
            input: {
              cartItems: [{ productId: productsBuy[0]?.productId, quantity: productsBuy[0]?.quantity }],
            },
          },
        });
      }
    }, [addProductToCart, carts, isCart, onSubmit, productsBuy]);

    return (
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
              title: AppRoutes.shopping.payment.label,
            },
          ]}
        />
        <div className="bg-ghost-white p-20px">
          <Row gutter={20}>
            <Col span={16}>
              <div className="bg-white mb-16px p-20px">
                <h2 className="uppercase">Địa chỉ nhận hàng</h2>
                <Divider className="my-12px" />
                <div className="flex justify-between items-center">
                  <div className="text-[13px] font-semibold leading-18px line-clamp-1">
                    {address?.contactName}
                    {address?.isDefault && (
                      <span className="text-[13px] text-primary inline pl-8px">(Địa chỉ mặc định)</span>
                    )}
                  </div>
                  <span
                    className="hover:cursor-pointer font-semibold text-[13px] text-primary"
                    onClick={() => onReChooseAddress()}>
                    Thay đổi
                  </span>
                </div>
                <p className="text-[13px] text-grayscale-gray leading-18px">{address?.contactPhone}</p>
                <p className="text-[13px] text-grayscale-gray leading-18px">{address?.mapAddress}</p>
              </div>
              <div className="bg-white p-20px">
                <Descriptions className="w-full " bordered column={{ xl: 2, lg: 2, md: 2 }}>
                  <Descriptions.Item
                    label="Sản phẩm"
                    labelStyle={{ backgroundColor: '#fff', textAlign: 'center' }}
                    contentStyle={{ textAlign: 'center' }}>
                    Số lượng
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Đơn giá"
                    labelStyle={{ backgroundColor: '#fff', textAlign: 'center' }}
                    contentStyle={{ textAlign: 'center' }}>
                    Số lượng
                  </Descriptions.Item>
                  {productsBuy.map((p) => {
                    const product = products.find((it) => it?.id === p?.productId);
                    return (
                      <>
                        <Descriptions.Item
                          label={
                            <div className="flex" key={product?.id}>
                              {product?.avatar?.fullThumbUrl && (
                                <Avatar shape="square" src={product?.avatar?.fullThumbUrl} />
                              )}
                              <span className="pl-12px text-14px font-medium leading-20px line-clamp-1">
                                {product?.name}
                              </span>
                            </div>
                          }
                          labelStyle={{
                            backgroundColor: '#fff',
                            color: 'rgba(19, 19, 19, 1)',
                            fontWeight: 600,
                            textAlign: 'center',
                          }}
                          contentStyle={{
                            backgroundColor: '#fff',
                            color: 'rgba(19, 19, 19, 1)',
                            fontWeight: 600,
                            textAlign: 'center',
                          }}>
                          {p?.quantity}
                        </Descriptions.Item>
                        <Descriptions.Item
                          label={numberWithDots(product?.unitPrice) + 'đ '}
                          labelStyle={{
                            backgroundColor: '#fff',
                            color: 'rgba(19, 19, 19, 1)',
                            fontWeight: 600,
                            textAlign: 'center',
                          }}
                          contentStyle={{
                            backgroundColor: '#fff',
                            color: 'rgba(19, 19, 19, 1)',
                            fontWeight: 600,
                            textAlign: 'center',
                          }}>
                          {numberWithDots(p?.quantity * (product?.unitPrice ?? 1)) + 'đ '}
                        </Descriptions.Item>
                      </>
                    );
                  })}
                </Descriptions>
              </div>
            </Col>
            <Col span={8}>
              <div className="bg-white mb-16px p-20px">
                <h2 className="uppercase mb-20px">Mã giảm giá</h2>
                <div
                  className="hover:cursor-pointer px-16px py-[10px] flex items-center justify-between border border-solid border-grayscale-border rounded"
                  onClick={() => onReChooseVoucher()}>
                  <div className="border border-solid border-primary rounded-lg text-primary px-8px py-[4px]">
                    {discount
                      ? `Mã giảm  ${discount?.value} ${
                          discount?.unit === DiscountCodeUnitEnum.PERCENTAGE ? ' %' : ' đ'
                        }`
                      : 'Chọn mã giảm giá'}
                  </div>
                  {discount ? <span className="text-primary">Thay đổi</span> : <RightOutlined />}
                </div>
              </div>
              <div className="bg-white mb-16px p-20px">
                <h2 className="uppercase mb-20px">Phương thức thanh toán</h2>
                <div className="px-16px py-[10px] flex items-center justify-between">
                  <span className="text-14px leading-20px ">Thanh toán khi nhận hàng</span>
                  <Radio checked disabled />
                </div>
              </div>
              <div className="bg-white mb-16px p-20px">
                <div className="px-16px py-[10px] flex items-center justify-between">
                  <span className="text-14px leading-20px ">Tổng thanh toán </span>
                  <span className="font-semibold text-18px">{numberWithDots(totalPayment) + ' đ'}</span>
                </div>
              </div>
            </Col>
          </Row>
          <div
            className="fixed left-[240px] right-0 bottom-0
         bg-white px-24px py-8px flex justify-end">
            <Button
              type="primary"
              onClick={handleCreateOrder}
              disabled={
                loading ||
                !address ||
                !productsBuy ||
                (productsBuy && !productsBuy.every((it) => !!it.productId && !!it?.quantity))
              }
              loading={loading}>
              Đặt mua
            </Button>
          </div>
        </div>
      </div>
    );
  },
);
