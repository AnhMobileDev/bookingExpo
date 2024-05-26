import { Button, Spin, Tabs } from 'antd';
import './style.less';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useBookingQuery } from '../../graphql/queries/booking.generated';
import { BookingEntity, BookingStatusEnum, PartnerEntity } from '../../graphql/type.interface';
import { AppRoutes } from '../../helpers';
import { FormDataReviewPartner, ResponseMessage, ReviewPartner, SubHeader } from '../../components';
import { convertBookingStatus, showNotification } from '../../utils';
import { useUserCreateReviewMutation } from '../../graphql/mutations/userCreateReview.generated';
import { useDialog } from '../../contexts';
import { SentSuccess } from '../../assets/icon';
import { useCompleteBookingByUserMutation } from '../../graphql/mutations/completeBookingByUser copy.generated';
import { useUserGetInvoiceLazyQuery } from '../../graphql/queries/userGetInvoice.generated';

import { Infomation, Quotation, Settlement } from './components';
import { CancelRepair } from './components/modal/cancel-request-repair';

const tabsKeyDetail = {
  infomation: 'infomation',
  quotation: 'quotation',
  settlement: 'settlement',
};

const tabs = [
  {
    key: tabsKeyDetail.infomation,
    label: 'Thông tin chi tiết',
  },
  {
    key: tabsKeyDetail.quotation,
    label: 'Lịch sử báo giá',
  },
  {
    key: tabsKeyDetail.settlement,
    label: 'Quyết toán',
  },
];

export const RepairDetail = () => {
  const { openDialog } = useDialog();
  const { id = '' } = useParams();

  const [openModalCancel, setOpenModalCancel] = useState(false);
  const [openModalReviewTechnician, setOpenModalReviewTechnician] = useState(false);
  const [openModalReviewPartner, setOpenModalReviewPartner] = useState(false);

  const [tabActive, setTabActive] = useState(tabsKeyDetail.infomation);

  const { data, loading, refetch } = useBookingQuery({ variables: { id }, skip: !id });

  const booking = useMemo(() => data?.booking, [data]);

  const [getInvoiceMutation, { data: bill, loading: gettingBill }] = useUserGetInvoiceLazyQuery({
    onError(error) {
      showNotification('error', 'Xem hóa đơn thất bại', error?.message);
    },
  });

  useEffect(() => {
    if (bill?.userGetInvoice?.fullOriginalUrl) {
      const link = document.createElement('a');
      link.download = bill?.userGetInvoice?.name;

      link.href = bill?.userGetInvoice?.fullOriginalUrl;

      link.click();
    }
  }, [bill]);

  const handleLoadBill = useCallback(() => {
    getInvoiceMutation({
      variables: {
        settlementId: booking?.settlementAccepted?.id as string,
      },
    });
  }, [booking?.settlementAccepted?.id, getInvoiceMutation]);

  const handleChangeTab = useCallback((key: string) => {
    setTabActive(key);
  }, []);

  const [createReviewMutation, { loading: creatingReview }] = useUserCreateReviewMutation({
    onCompleted() {
      openDialog({
        type: 'ALERT',
        title: ' ',
        message: (
          <div className="text-center">
            <SentSuccess />
            <p className="text-24px font-semibold mt-32px mb-16px">Gửi đánh giá thành công</p>
            <p className="text-grayscale-gray">
              Cảm ơn bạn đã đánh giá{' '}
              {openModalReviewTechnician
                ? `kỹ thuật viên ${booking?.technician?.fullname}`
                : `đại lý ${booking?.partner?.fullname}`}
            </p>
          </div>
        ),
        cancelButtonProps: { children: 'Đóng', type: 'primary' },
      });
      refetch();
      setOpenModalReviewTechnician(false);
      setOpenModalReviewPartner(false);
    },
    onError(error) {
      showNotification('error', 'Gửi đánh giá thất bại', error?.message);
    },
  });

  const handleReviewTechnician = useCallback(
    (values: FormDataReviewPartner) => {
      if (!booking) return;
      createReviewMutation({
        variables: {
          input: {
            ...values,
            bookingId: booking?.id as string,
            personEvaluatedId: booking?.partner?.id || booking?.technician?.id,
          },
        },
      });
    },
    [booking, createReviewMutation],
  );

  const handleReviewPartner = useCallback(
    (values: FormDataReviewPartner) => {
      if (!booking) return;
      createReviewMutation({
        variables: {
          input: {
            ...values,
            bookingId: booking?.id as string,
            personEvaluatedId: booking?.partner?.id as string,
          },
        },
      });
    },
    [booking, createReviewMutation],
  );

  const [paymentMutaion, { loading: paymenting }] = useCompleteBookingByUserMutation({
    onCompleted() {
      openDialog({
        type: 'ALERT',
        title: ' ',
        message: (
          <div className="text-center">
            <SentSuccess />
            <p className="text-24px font-semibold mt-32px mb-16px">Thanh toán thành công!</p>
          </div>
        ),
        cancelButtonProps: { children: 'Đóng', type: 'primary' },
        onConfirmFinish: async () => await refetch(),
      });
    },
    onError(error) {
      showNotification('error', 'Thanh toán thất bại', error?.message);
    },
  });

  const handlePayment = useCallback(() => {
    paymentMutaion({
      variables: {
        input: {
          bookingId: booking?.id as string,
        },
      },
    });
  }, [booking?.id, paymentMutaion]);

  const renderNotification = useCallback(() => {
    switch (booking?.status) {
      case BookingStatusEnum.ASSIGNED_TECHNICIAN:
      case BookingStatusEnum.TECHNICIAN_ARRIVING:
      case BookingStatusEnum.TECHNICIAN_ARRIVED:
      case BookingStatusEnum.RESCHEDULED:
        return <ResponseMessage warning>{convertBookingStatus(booking?.status)}</ResponseMessage>;
      case BookingStatusEnum.QUOTATION_REQUESTED:
        return (
          <ResponseMessage warning>
            {convertBookingStatus(booking?.status) + '.  '}
            <span
              className="underline font-semibold hover:cursor-pointer"
              onClick={() => handleChangeTab(tabsKeyDetail.quotation)}>
              Xem chi tiết
            </span>
          </ResponseMessage>
        );
      case BookingStatusEnum.SETTLEMENT_REQUESTED:
        return (
          <ResponseMessage warning>
            {convertBookingStatus(booking?.status) + '.  '}
            <span
              className="underline font-semibold hover:cursor-pointer"
              onClick={() => handleChangeTab(tabsKeyDetail.settlement)}>
              Xem chi tiết
            </span>
          </ResponseMessage>
        );

      case BookingStatusEnum.SETTLEMENT_REJECTED:
      case BookingStatusEnum.QUOTATION_REJECTED:
      case BookingStatusEnum.CANCEL:
        return <ResponseMessage error>{convertBookingStatus(booking?.status)}</ResponseMessage>;
      case BookingStatusEnum.SETTLEMENT_ACCEPTED:
      case BookingStatusEnum.QUOTATION_ACCEPTED:
        return <ResponseMessage success>{convertBookingStatus(booking?.status)}</ResponseMessage>;
      default:
        return null;
    }
  }, [booking?.status, handleChangeTab]);

  const renderAction = useCallback(() => {
    if (booking?.status === BookingStatusEnum.SETTLEMENT_ACCEPTED) {
      return (
        <Button type="default" className="border border-solid border-primary text-primary" onClick={handlePayment}>
          Thanh toán
        </Button>
      );
    }
    if (booking?.status === BookingStatusEnum.COMPLETE) {
      return (
        <div>
          {booking?.partner.id !== booking?.technician?.id ? (
            <>
              {booking?.userCanReviewAgency && (
                <Button
                  type="default"
                  className="mr-20px"
                  onClick={() => {
                    setOpenModalReviewPartner(true);
                  }}>
                  Đánh giá đại lý
                </Button>
              )}
              {booking?.userCanReviewTechnician && (
                <Button
                  type="default"
                  className="mr-20px"
                  onClick={() => {
                    setOpenModalReviewTechnician(true);
                  }}>
                  Đánh giá kĩ thuật viên
                </Button>
              )}
            </>
          ) : (
            <Button
              type="default"
              className="mr-20px"
              onClick={() => {
                booking?.technician as PartnerEntity;
                setOpenModalReviewTechnician(true);
              }}>
              Đánh giá
            </Button>
          )}
          {booking?.settlementAccepted?.id && (
            <Button type="primary" onClick={handleLoadBill}>
              Xem hóa đơn
            </Button>
          )}
        </div>
      );
    }
    if (
      [
        BookingStatusEnum.QUOTATION_ACCEPTED,
        BookingStatusEnum.SETTLEMENT_REJECTED,
        BookingStatusEnum.SETTLEMENT_REQUESTED,
      ].includes(booking?.status as BookingStatusEnum)
    ) {
      return null;
    }
    return (
      <Button
        type="default"
        className="border border-solid border-primary text-primary"
        onClick={() => setOpenModalCancel(true)}>
        Hủy yêu cầu
      </Button>
    );
  }, [
    booking?.partner.id,
    booking?.settlementAccepted?.id,
    booking?.status,
    booking?.technician,
    booking?.userCanReviewAgency,
    booking?.userCanReviewTechnician,
    handleLoadBill,
    handlePayment,
  ]);

  if (!booking) return null;
  return (
    <Spin spinning={loading || paymenting || gettingBill}>
      <SubHeader
        items={[
          { title: 'Trang chủ', to: AppRoutes.home },
          { title: AppRoutes.requestRepair.list.lable, to: AppRoutes.requestRepair.list.value },
          { title: 'Chi tiết yêu cầu sửa chữa' },
        ]}
        title={booking?.code}
        rightContent={renderAction()}
      />
      <Tabs items={tabs} activeKey={tabActive} onChange={handleChangeTab} />
      {tabActive === tabsKeyDetail.infomation && renderNotification()}
      {tabActive === tabsKeyDetail.infomation && <Infomation booking={booking as BookingEntity} />}
      {tabActive === tabsKeyDetail.quotation && <Quotation bookingId={booking?.id as string} />}
      {tabActive === tabsKeyDetail.settlement && (
        <Settlement bookingId={booking?.id as string} booking={booking as BookingEntity} />
      )}
      {openModalCancel && (
        <CancelRepair
          refetch={refetch}
          setIsModalCancel={setOpenModalCancel}
          bookingId={booking?.id}
          open={openModalCancel}
        />
      )}
      {openModalReviewTechnician && (
        <ReviewPartner
          open={openModalReviewTechnician}
          onFinish={handleReviewTechnician}
          setOpen={setOpenModalReviewTechnician}
          loading={creatingReview}
          partner={booking?.technician as PartnerEntity}
        />
      )}
      {openModalReviewPartner && (
        <ReviewPartner
          open={openModalReviewPartner}
          onFinish={handleReviewPartner}
          setOpen={setOpenModalReviewPartner}
          loading={creatingReview}
          partner={booking?.partner as PartnerEntity}
        />
      )}
    </Spin>
  );
};
