import { memo, useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Image, Row, Spin } from 'antd';
import dayjs from 'dayjs';
import { ColumnsType } from 'antd/es/table';

import {
  CancelReasonsByType,
  FormValueReject,
  MasterTable,
  ResponseMessage,
  RowItem,
  SubHeader,
} from '../../components';
import { AppRoutes, getGraphQLErrorMessage } from '../../helpers';
import { useOrderQuery } from '../../graphql/queries/order.generated';
import { TIME_FORMAT } from '../../constants/format';
import {
  CategoryTypeEnum,
  OrderProductEntity,
  OrderStatusCategoryEntity,
  OrderStatusEnum,
  PartnerEntity,
} from '../../graphql/type.interface';
import { ReceiptIcon } from '../../assets/icon';
import { getNameCategoriesEntity, numberWithDots, showNotification } from '../../utils';
import { useCancelOrderMutation } from '../../graphql/mutations/cancelOrder.generated';
import { useUserUpdateOrderStatusMutation } from '../../graphql/mutations/userUpdateOrderStatus.generated';
import { useRecreateOrderMutation } from '../../graphql/mutations/recreateOrder.generated';
import { useUserCreateOrderReviewMutation } from '../../graphql/mutations/userCreateOrderReview.generated';
import { StoreItem } from '../ecommerce/components';

import { FormDataReviewOrder, ReviewOrder } from './components';

const convertStatusOrder = (status: OrderStatusEnum) => {
  switch (status) {
    case OrderStatusEnum.WAIT_FOR_CONFIRM:
      return 'Chờ xác nhận';
    case OrderStatusEnum.SHIPPING:
      return 'Đang giao';
    case OrderStatusEnum.DELIVERED:
      return 'Đã giao';
    case OrderStatusEnum.COMPLETE:
      return 'Hoàn thành';
    default:
      return 'Đã hủy';
  }
};

const column: ColumnsType<any> = [
  {
    title: 'Sản phẩm',
    key: 'product',
    dataIndex: 'product',
    width: '30%',
    render: (_, it) => {
      return (
        <div className="flex">
          <div className="w-[42px] h-[42px]">
            <Image
              className="w-[42px] h-[42px] rounded object-cover"
              src={it?.avatar?.fullThumbUrl}
              preview={{
                src: it?.avatar?.fullOriginalUrl,
              }}
            />
          </div>
          <span className="pl-12px text-14px font-medium leading-20px">{it.name}</span>
        </div>
      );
    },
  },
  {
    title: 'Số lượng',
    key: 'quantity',
    dataIndex: 'quantity',
    align: 'right',
    width: '10%',
    render: (quantity) => {
      return <span>{'x' + quantity}</span>;
    },
  },
  {
    title: 'Đơn giá',
    key: 'unitPrice',
    dataIndex: 'unitPrice',
    align: 'right',
    width: '15%',
    render: (unitPrice) => {
      return <span>{numberWithDots(unitPrice) + ' đ'}</span>;
    },
  },
  {
    title: 'Tổng cộng',
    key: 'total',
    dataIndex: 'total',
    align: 'right',
    width: '15%',
    render: (_, r) => <span className="font-semibold">{numberWithDots(r?.quantity * r?.unitPrice) + ' đ'}</span>,
  },
];

const OrderDetail = memo(() => {
  const navigate = useNavigate();
  const { id = '' } = useParams();

  const { data, loading, refetch } = useOrderQuery({
    variables: { id },
    skip: !id,
  });

  const order = useMemo(() => data?.order, [data]);

  const [openCancel, setOpenCancel] = useState(false);
  const [openReview, setOpenReview] = useState(false);

  const [cancelOrder, { loading: canceling }] = useCancelOrderMutation({
    onCompleted() {
      refetch();
      showNotification('success', 'Hủy đơn hàng thành công');
      setOpenCancel(false);
    },
    onError(error) {
      showNotification('error', 'Hủy đơn hàng thất bại', getGraphQLErrorMessage(error));
    },
  });

  const handleCancelOrder = useCallback(() => {
    setOpenCancel(true);
  }, []);

  const [reCreateOrder, { loading: recreating }] = useRecreateOrderMutation({
    onCompleted() {
      showNotification('success', 'Mua lại đơn hàng thành công');
      //navtgate to cart
      navigate(AppRoutes.cart.value);
    },
    onError(error) {
      showNotification('error', 'Mua lại đơn hàng thất bại', getGraphQLErrorMessage(error));
    },
  });

  const handleReCreateOrder = useCallback(() => {
    reCreateOrder({
      variables: {
        input: {
          orderId: order?.id as string,
        },
      },
    });
  }, [order?.id, reCreateOrder]);

  const [changeStatusMutation, { loading: updating }] = useUserUpdateOrderStatusMutation({
    onCompleted() {
      refetch();
      showNotification('success', 'Chuyển trạng thái đơn hàng thành công');
    },
    onError(error) {
      showNotification('error', 'Chuyển trạng thái đơn hàng thất bại', getGraphQLErrorMessage(error));
    },
  });

  const handleChangeStatus = useCallback(
    (newStatus: OrderStatusEnum) => {
      changeStatusMutation({
        variables: {
          input: {
            orderId: order?.id as string,
            status: newStatus,
          },
        },
      });
    },
    [changeStatusMutation, order?.id],
  );

  const [createReviewOrder, { loading: reviewing }] = useUserCreateOrderReviewMutation({
    onCompleted() {
      refetch();
      setOpenReview(false);
      showNotification('success', 'Gửi đánh giá thành công');
    },
    onError(error) {
      showNotification('error', 'Gửi đánh giá thất bại', getGraphQLErrorMessage(error));
    },
  });

  const renderActions = useCallback(() => {
    switch (order?.status) {
      case OrderStatusEnum.CANCEL:
        return (
          <div className="flex items-center gap-x-12px">
            <Button type="primary" onClick={handleReCreateOrder}>
              Mua lại
            </Button>
          </div>
        );
      case OrderStatusEnum.WAIT_FOR_CONFIRM:
        return (
          <div className="flex items-center gap-x-12px">
            <Button type="primary" onClick={handleCancelOrder}>
              Hủy đơn hàng
            </Button>
          </div>
        );
      case OrderStatusEnum.SHIPPING:
        return (
          <div className="flex items-center gap-x-12px ">
            <Button type="primary" onClick={() => handleChangeStatus(OrderStatusEnum.COMPLETE)}>
              Đã nhận hàng
            </Button>
          </div>
        );
      case OrderStatusEnum.DELIVERED:
        return (
          <div className="flex items-center gap-x-12px">
            <Button type="primary" onClick={() => handleChangeStatus(OrderStatusEnum.COMPLETE)}>
              Hoàn thành
            </Button>
          </div>
        );
      case OrderStatusEnum.COMPLETE:
        return (
          order?.userCanReview && (
            <div className="flex items-center gap-x-12px">
              <Button type="primary" onClick={() => setOpenReview(true)}>
                Đánh giá
              </Button>
            </div>
          )
        );

      default:
        break;
    }
  }, [handleCancelOrder, handleChangeStatus, handleReCreateOrder, order?.status, order?.userCanReview]);

  const renderMessageByStatus = useCallback(() => {
    switch (order?.status) {
      case OrderStatusEnum.CANCEL:
        return (
          <ResponseMessage gray className="text-white bg-grayscale-gray" icon={<ReceiptIcon fill="#fff" />}>
            Đơn hàng đã bị hủy
          </ResponseMessage>
        );
      case OrderStatusEnum.WAIT_FOR_CONFIRM:
        return (
          <ResponseMessage info className="text-white " icon={<ReceiptIcon fill="#fff" />}>
            Đơn hàng đang chờ xác nhận từ người bán
          </ResponseMessage>
        );
      case OrderStatusEnum.SHIPPING:
        return (
          <ResponseMessage warning className="text-white bg-[#FFC42C]" icon={<ReceiptIcon fill="#fff" />}>
            Đơn hàng đang giao đến bạn
          </ResponseMessage>
        );
      case OrderStatusEnum.DELIVERED:
        return (
          <ResponseMessage success className="text-white bg-[#1BB045]" icon={<ReceiptIcon fill="#fff" />}>
            Đơn hàng đã giao đến bạn
          </ResponseMessage>
        );
      case OrderStatusEnum.COMPLETE:
        return (
          <ResponseMessage success className="text-white bg-[#1BB045]" icon={<ReceiptIcon fill="#fff" />}>
            Đơn hàng đã hoàn thành
          </ResponseMessage>
        );
      default:
        break;
    }
  }, [order?.status]);

  if (!order) return null;
  return (
    <Spin spinning={loading || updating || recreating}>
      <div>
        <div>
          <SubHeader
            items={[
              { title: 'Trang chủ', to: AppRoutes.home },
              { title: AppRoutes.orders.list.label, to: AppRoutes.orders.list.value },
              {
                title: 'Thông tin chi tiết đơn hàng',
              },
            ]}
            title={order?.code}
            rightContent={renderActions()}
          />
          {renderMessageByStatus()}
        </div>
        <div className="m-20px">
          <Row gutter={20}>
            <Col span={16}>
              <div className="bg-white p-20px">
                <h2 className="uppercase text-16px leading-24px font-semibold border-b border-t-0 border-l-0 border-r-0 border-solid border-grayscale-border mb-12px pb-[12px]">
                  Địa chỉ nhận hàng
                </h2>
                <p>{order?.address?.addressName}</p>
                <p className="text-[13px] text-grayscale-gray mt-12px mb-6px">{order?.address?.contactPhone}</p>
                <p className="text-[13px] text-grayscale-gray">{order?.address?.mapAddress}</p>
              </div>
              <div className="mt-20px">
                <StoreItem store={order?.partner as PartnerEntity} />
              </div>
              <div className="bg-white p-20px mt-20px">
                <MasterTable
                  data={order?.product ?? []}
                  columns={column}
                  total={order?.product?.length ?? 0}
                  bordered
                  expandable={{
                    defaultExpandAllRows: true,
                    showExpandColumn: true,
                    columnWidth: '3%',
                    expandedRowRender: (record) => (
                      <div className="mb-20px">
                        <span className="text-grayscale-gray text-14px leading-20px">Ghi chú: </span>
                        <span className="text-grayscale-black text-14px leading-20px">{record?.note}</span>
                      </div>
                    ),
                  }}
                />
                <div className="flex justify-end mr-20px">
                  <h3 className="text-18px">Khuyến mại: {numberWithDots(order?.discount) + ' đ'}</h3>
                </div>
                <div className="flex justify-end mr-20px">
                  <h2 className="text-18px">Tổng tiền: {numberWithDots(order?.total) + ' đ'}</h2>
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className="bg-white p-20px">
                <h2 className="uppercase text-16px leading-24px font-semibold">thông tin đơn hàng</h2>
                <RowItem wrapperStyle="py-16px" label="Mã đơn hàng" value={order?.code} />
                <RowItem wrapperStyle="pb-16px" label="Trạng thái" value={convertStatusOrder(order?.status)} />
                <RowItem
                  wrapperStyle="pb-16px"
                  label="Thời gian đặt"
                  value={dayjs(order?.createdAt).format(TIME_FORMAT)}
                />
                {order?.status === OrderStatusEnum.DELIVERED && (
                  <RowItem
                    wrapperStyle="pb-16px"
                    label="Thời gian nhận"
                    value={dayjs(order?.statusDetail?.createdAt).format(TIME_FORMAT)}
                  />
                )}
                {order?.status === OrderStatusEnum.CANCEL && (
                  <RowItem
                    wrapperStyle="pb-16px"
                    label="Thời gian hủy"
                    value={dayjs(order?.statusDetail?.createdAt).format(TIME_FORMAT)}
                  />
                )}
                {order?.status === OrderStatusEnum.CANCEL && (
                  <RowItem
                    wrapperStyle="pb-16px"
                    label="Người hủy"
                    value={order?.statusDetail?.userId ? 'Người mua' : 'Người bán'}
                  />
                )}
                {order?.status === OrderStatusEnum.CANCEL && (
                  <>
                    <RowItem wrapperStyle="pb-6px" label="Lý do hủy" />
                    <div>{getNameCategoriesEntity(order?.statusDetail?.reasons as OrderStatusCategoryEntity[])}</div>
                  </>
                )}
                {order?.status === OrderStatusEnum.CANCEL && (
                  <RowItem wrapperStyle="py-16px" label="Lý do khác" value={order?.statusDetail?.note} />
                )}
              </div>
            </Col>
          </Row>
        </div>
      </div>
      {openCancel && (
        <CancelReasonsByType
          title="Xác nhận lý do hủy đơn hàng"
          open={openCancel}
          setOpen={setOpenCancel}
          type={CategoryTypeEnum.CANCEL_ORDER_REASON_BY_USER}
          loading={canceling}
          onFinish={(values: FormValueReject) =>
            cancelOrder({
              variables: {
                input: {
                  orderId: order?.id,
                  ...values,
                },
              },
            })
          }
        />
      )}
      {openReview && (
        <ReviewOrder
          loading={reviewing}
          open={openReview}
          setOpen={setOpenReview}
          products={order?.product as OrderProductEntity[]}
          partner={order?.partner as PartnerEntity}
          onFinish={(values: FormDataReviewOrder) => {
            createReviewOrder({
              variables: {
                input: {
                  orderId: order?.id,
                  partnerReview: {
                    partnerId: order?.partner?.id ?? (order?.partnerId as string),
                    comment: values?.commentPartner,
                    star: values?.starPartner,
                  },
                  productReviews: values?.products,
                },
              },
            });
          }}
        />
      )}
    </Spin>
  );
});

export default OrderDetail;
