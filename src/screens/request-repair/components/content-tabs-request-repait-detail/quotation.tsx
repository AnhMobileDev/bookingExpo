import { Button, Col, Descriptions, Row, Spin } from 'antd';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';

import {
  BookingStatusEnum,
  CategoryTypeEnum,
  OperatingUnitEnum,
  QuotationStatusEnum,
} from '../../../../graphql/type.interface';
import { SortTimeByField, convertBookingStatus, numberWithDots, showNotification } from '../../../../utils';
import { FORMAT_DATE, FORMAT_TIME } from '../../../../constants';
import { DetailExpense } from '../expense';
import { useUserQuotationQuery } from '../../../../graphql/queries/userQuotation.generated';
import { useUserBookingQuotationsQuery } from '../../../../graphql/queries/userBookingQuotations.generated';
import { CancelReasonsByType, FormValueReject, ResponseMessage } from '../../../../components';
import { useUserRejectQuotationMutation } from '../../../../graphql/mutations/userRejectQuotation.generated';
import { useDialog } from '../../../../contexts';
import { SentSuccess } from '../../../../assets/icon';
import { useUserAcceptQuotationMutation } from '../../../../graphql/mutations/userAcceptQuotation.generated';
import { StatusHistoriesRequestRepair } from '../status-histories-request-repair';
import { SectionWrapper } from '../section-wrapper';

type Props = {
  bookingId: string;
};

export const Quotation = memo(({ bookingId }: Props) => {
  const { openDialog, resetDiaLog } = useDialog();

  const [openHistoryStatus, setOpenHistoryStatus] = useState(false);

  const { data: dataQuotations, loading: getting } = useUserBookingQuotationsQuery({
    variables: { bookingId },
    skip: !bookingId,
    fetchPolicy: 'cache-and-network',
  });
  const quotations = useMemo(
    () => SortTimeByField(dataQuotations?.userBookingQuotations ?? [], 'createdAt'),
    [dataQuotations],
  );

  const [quotationId, setQuotationId] = useState<string | null>();
  const {
    data: res,
    loading,
    refetch,
  } = useUserQuotationQuery({
    variables: { quotationId: quotationId as string },
    skip: !quotationId,
  });
  const quotation = useMemo(() => res?.userQuotation, [res]);

  const [openReject, setOpenReject] = useState(false);

  const [rejectMutation, { loading: rejecting }] = useUserRejectQuotationMutation({
    onCompleted() {
      openDialog({
        type: 'ALERT',
        title: ' ',
        message: (
          <div className="text-center">
            <SentSuccess />
            <p className="text-24px font-semibold mt-32px mb-16px">Yêu cầu báo giá lại thành công</p>
            <p className="text-grayscale-gray">{dayjs().format(FORMAT_TIME)}</p>
            <Button
              className="w-full flex justify-center text-center mt-30px"
              type="primary"
              onClick={() => {
                resetDiaLog();
                refetch();
                setOpenReject(false);
              }}>
              Đóng
            </Button>
          </div>
        ),
        hiddenFooter: true,
      });
    },
    onError(error) {
      showNotification('error', 'Yêu cầu báo giá lại thất bại', error?.message);
    },
  });

  const handleReject = useCallback(
    (values: FormValueReject) => {
      if (!quotationId) return;
      rejectMutation({
        variables: { input: { ...values, quotationId: quotationId } },
      });
    },
    [quotationId, rejectMutation],
  );

  const [acceptMutation, { loading: accepting }] = useUserAcceptQuotationMutation({
    onCompleted() {
      openDialog({
        type: 'ALERT',
        title: ' ',
        message: (
          <div className="text-center">
            <SentSuccess />
            <p className="text-24px font-semibold mt-32px mb-16px">Chấp thuận báo giá thành công</p>
            <p className="text-grayscale-gray">{dayjs().format(FORMAT_TIME)}</p>
            <Button
              className="w-full flex justify-center text-center mt-30px"
              type="primary"
              onClick={() => {
                resetDiaLog();
                refetch();
                setOpenReject(false);
              }}>
              Đóng
            </Button>
          </div>
        ),
        hiddenFooter: true,
      });
    },
    onError(error) {
      showNotification('error', 'Chấp thuận báo giá thất bại', error?.message);
    },
  });
  const handleAccept = useCallback(() => {
    if (!quotationId) return;

    openDialog({
      type: 'CONFIRM',
      title: 'Đồng ý với yêu cầu báo giá này ?',
      message: 'Đồng ý báo giá sẽ ký hợp đồng sửa chữa với kỹ thuật viên và không thể hủy yêu cầu sửa chữa',
      cancelButtonProps: { children: 'Đóng', type: 'primary' },
      confirmButtonProps: { title: 'Đồng ý' },
      onConfirmFinish: () =>
        acceptMutation({
          variables: { quotationId: quotationId },
        }),
    });
  }, [quotationId, openDialog, acceptMutation]);

  const renderNotification = useCallback(() => {
    switch (quotation?.status) {
      case QuotationStatusEnum.REJECTED:
        return (
          <ResponseMessage error>
            {convertBookingStatus(BookingStatusEnum.QUOTATION_REJECTED) + ' này. '}
            <span
              className="text-14px font-semibold leading-20px underline hover:cursor-pointer"
              onClick={() => setOpenHistoryStatus(true)}>
              Xem lịch sử trang thái
            </span>
          </ResponseMessage>
        );
      case QuotationStatusEnum.ACCEPTED:
        return (
          <ResponseMessage success className="!bg-[#1BB045]">
            <span className="text-white">{convertBookingStatus(BookingStatusEnum.QUOTATION_ACCEPTED) + ' này. '}</span>
            <span
              className="text-14px text-white font-semibold leading-20px underline hover:cursor-pointer"
              onClick={() => setOpenHistoryStatus(true)}>
              Xem lịch sử trang thái
            </span>
          </ResponseMessage>
        );
      default:
        return null;
    }
  }, [quotation?.status]);

  useEffect(() => {
    if (quotations && quotations.length > 0 && !quotationId) {
      setQuotationId(quotations?.[0].id);
    }
  }, [quotationId, quotations]);

  return (
    <Spin spinning={loading || getting || accepting}>
      <div>
        <div className="bg-white px-24px py-12px flex items-center flex-wrap">
          {(quotations || []).map((i) => (
            <Button
              className="!rounded-full mr-8px"
              type={i.id === quotationId ? 'primary' : 'dashed'}
              key={i.id}
              onClick={() => setQuotationId(i.id)}>
              {dayjs(i.createdAt).format(FORMAT_TIME)}
            </Button>
          ))}
        </div>
        <div className="m-20px">
          <Row gutter={20}>
            <Col span={16}>
              {!quotations && <div className="text-center p-20px bg-white">Chưa có quyết toán</div>}
              {quotation && quotationId && (
                <div className="mb-50px">
                  <SectionWrapper title="I. Chẩn đoán">
                    <div className="w-full flex items-center space-x-20px">
                      <Descriptions className="w-full" bordered column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
                        <Descriptions.Item
                          label="Đã vận hành"
                          labelStyle={{ width: '50%' }}
                          contentStyle={{ color: '#202C38' }}>
                          {quotation?.operatingNumber +
                            (quotation?.operatingUnit === OperatingUnitEnum.HOURS ? ' giờ' : quotation?.operatingUnit)}
                        </Descriptions.Item>
                        {(quotation?.diagnostics || []).map((diagnostic) => (
                          <Descriptions.Item
                            key={diagnostic?.id}
                            label={diagnostic?.diagnosticCode}
                            labelStyle={{ width: '50%' }}
                            contentStyle={{ color: '#202C38' }}>
                            {numberWithDots(diagnostic?.expense)} đ
                          </Descriptions.Item>
                        ))}
                        <Descriptions.Item
                          label="Ghi chú"
                          labelStyle={{ width: '50%' }}
                          contentStyle={{ color: '#202C38' }}>
                          {quotation?.diagnosisNote}
                        </Descriptions.Item>
                        <Descriptions.Item
                          label="Dự kiến thời gian hoàn thành"
                          labelStyle={{ width: '50%' }}
                          contentStyle={{ color: '#202C38' }}>
                          {dayjs(quotation?.estimatedCompleteAt).format(FORMAT_DATE)}
                        </Descriptions.Item>
                      </Descriptions>
                    </div>
                  </SectionWrapper>
                  <SectionWrapper title="II. Báo giá sửa chữa">
                    <div className="text-[14px] font-semibold text-yankees-blue leading-[20px]">1. Vật tư phụ tùng</div>
                    <div className="w-full flex items-center space-x-20px">
                      <Descriptions className="w-full" bordered column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
                        {(quotation?.accessories || []).map((e: any) => (
                          <Descriptions.Item
                            key={e.id}
                            label={e.name}
                            labelStyle={{ width: '50%' }}
                            contentStyle={{ width: '50%', color: '#202C38', textAlign: 'right' }}>
                            <div>
                              <div>{numberWithDots(e.unitPrice)} đ</div>
                              <div>x{e.quantity + ' (' + e.unit + ')'}</div>
                            </div>
                          </Descriptions.Item>
                        ))}
                      </Descriptions>
                    </div>
                    <div className="text-[14px] font-semibold text-yankees-blue leading-[20px]">
                      2. Chi phí công dịch vụ
                    </div>
                    <div className="w-full flex items-center space-x-20px">
                      <Descriptions className="w-full" bordered column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
                        <Descriptions.Item
                          label="Phí di chuyển"
                          labelStyle={{ width: '50%' }}
                          contentStyle={{ width: '50%', color: '#202C38', textAlign: 'right' }}>
                          {numberWithDots(quotation?.transportFee)} đ
                        </Descriptions.Item>
                        <Descriptions.Item
                          label="Phí chẩn đoán"
                          labelStyle={{ width: '50%' }}
                          contentStyle={{ width: '50%', color: '#202C38', textAlign: 'right' }}>
                          {numberWithDots(quotation?.diagnosisFee)} đ
                        </Descriptions.Item>
                        <Descriptions.Item
                          label="Phí sửa chữa, thay thế"
                          labelStyle={{ width: '50%' }}
                          contentStyle={{ width: '50%', color: '#202C38', textAlign: 'right' }}>
                          {numberWithDots(quotation?.repairFee)} đ
                        </Descriptions.Item>
                      </Descriptions>
                    </div>
                    <div className="text-[14px] font-semibold text-yankees-blue leading-[20px]">
                      3. Chi phí phát sinh
                    </div>
                    <div className="w-full flex items-center space-x-20px">
                      <Descriptions className="w-full" bordered column={1}>
                        {(quotation?.additionalFees || []).map((e: any) => (
                          <Descriptions.Item
                            span={8}
                            key={e.name}
                            label={e.name}
                            labelStyle={{ width: '50%' }}
                            contentStyle={{ width: '50%', color: '#202C38', textAlign: 'right' }}>
                            {numberWithDots(e.amount)} đ
                          </Descriptions.Item>
                        ))}
                      </Descriptions>
                    </div>
                  </SectionWrapper>
                </div>
              )}
              {!quotations ||
                (quotations && quotations?.length === 0 && (
                  <div className="text-center p-20px bg-white">Chưa có lịch sử báo giá</div>
                ))}
              {!quotationId && quotations && quotations?.length > 0 && (
                <div className="text-center p-20px bg-white">Chọn báo giá để xem</div>
              )}
              {quotationId && !quotation && <div className="text-center p-20px bg-white">Đã có lỗi xảy ra</div>}
            </Col>
            <Col span={8}>
              {renderNotification()}
              <DetailExpense
                expenses={[
                  {
                    label: 'Chẩn đoán',
                    value: (quotation?.diagnostics ?? []).reduce((rs: any, item: any) => rs + item.expense, 0),
                  },
                  {
                    label: 'Vật tư phụ tùng',
                    value: (quotation?.accessories || []).reduce(
                      (rs: any, item: any) => rs + item.quantity * item.unitPrice,
                      0,
                    ),
                  },
                  {
                    label: 'Công dịch vụ',
                    value: ((((quotation?.diagnosisFee ?? 0) + (quotation?.repairFee ?? 0)) as number) +
                      (quotation?.transportFee ?? 0)) as number,
                  },
                  {
                    label: 'Phát sinh Công dịch vụ',
                    value: (quotation?.additionalFees || []).reduce((rs: any, item: any) => rs + item.amount, 0),
                  },
                ]}
                total={quotation?.total}
              />
            </Col>
          </Row>
        </div>
      </div>
      <div>
        {quotation?.status === QuotationStatusEnum.PENDING && (
          <div className="bg-white flex justify-end items-center px-24px py-12px fixed bottom-0 left-0 right-0">
            <Button onClick={() => setOpenReject(true)}>Yêu cầu báo giá lại</Button>
            <Button type="primary" className="ml-16px" onClick={handleAccept}>
              Đồng ý
            </Button>
          </div>
        )}
      </div>
      {openReject && (
        <CancelReasonsByType
          title="Lý do yêu cầu báo giá lại"
          loading={rejecting}
          type={CategoryTypeEnum.CANCEL_QUOTATION_REASON}
          onFinish={handleReject}
          open={openReject}
          setOpen={setOpenReject}
        />
      )}
      {openHistoryStatus && bookingId && (
        <StatusHistoriesRequestRepair open={openHistoryStatus} setOpen={setOpenHistoryStatus} bookingId={bookingId} />
      )}
    </Spin>
  );
});
