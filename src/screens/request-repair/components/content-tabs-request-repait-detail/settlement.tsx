import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { Button, Col, Descriptions, Row, Spin } from 'antd';

import { useUserBookingSettlementsQuery } from '../../../../graphql/queries/userBookingSettlements.generated';
import { FORMAT_DATE, FORMAT_TIME } from '../../../../constants';
import { CancelReasonsByType, FormValueReject, ResponseMessage } from '../../../../components';
import { useUserSettlementQuery } from '../../../../graphql/queries/userSettlement.generated';
import {
  BookingEntity,
  BookingStatusEnum,
  CategoryTypeEnum,
  OperatingUnitEnum,
  SettlementStatusEnum,
} from '../../../../graphql/type.interface';
import { SortTimeByField, convertBookingStatus, numberWithDots, showNotification } from '../../../../utils';
import { ChevronDownIcon, SentSuccess } from '../../../../assets/icon';
import { DetailExpense } from '../expense';
import { useUserAcceptSettlementMutation } from '../../../../graphql/mutations/userAcceptSettlement.generated';
import { useUserRejectSettlementMutation } from '../../../../graphql/mutations/userRejectSettlement.generated';
import { useDialog } from '../../../../contexts';
import { StatusHistoriesRequestRepair } from '../status-histories-request-repair';
import { SectionWrapper } from '../section-wrapper';

type Props = {
  bookingId: string;
  booking?: BookingEntity;
};

export const Settlement = memo(({ bookingId, booking }: Props) => {
  const { openDialog, resetDiaLog } = useDialog();

  const [isCollapseGeneral, setIsCollapseGeneral] = useState<boolean>(false);
  const [openHistoryStatus, setOpenHistoryStatus] = useState<boolean>(false);

  const toggleCollapseGeneral = () => {
    setIsCollapseGeneral(!isCollapseGeneral);
  };

  const [settlementId, setSettlementId] = useState<string | null>();
  const { data: dataQuotations, loading: getting } = useUserBookingSettlementsQuery({
    variables: { bookingId },
    skip: !bookingId,
    fetchPolicy: 'cache-and-network',
  });
  const settlements = useMemo(
    () => SortTimeByField(dataQuotations?.userBookingSettlements ?? [], 'createdAt'),
    [dataQuotations],
  );

  useEffect(() => {
    if (settlements && settlements?.length > 0 && !settlementId) {
      setSettlementId(settlements[0].id);
    }
  }, [settlementId, settlements]);

  const {
    data: res,
    loading,
    refetch,
  } = useUserSettlementQuery({
    variables: { settlementId: settlementId as string },
    skip: !settlementId,
  });

  const settlement: any = useMemo(() => res?.userSettlement, [res]);

  const quotation = useMemo(() => settlement?.quotation, [settlement?.quotation]);

  const additionalFeesSettlement = useMemo(() => settlement?.additionalFees, [settlement?.additionalFees]);

  const [openReject, setOpenReject] = useState(false);

  const [rejectMutation, { loading: rejecting }] = useUserRejectSettlementMutation({
    onCompleted() {
      openDialog({
        type: 'ALERT',
        title: ' ',
        message: (
          <div className="text-center">
            <SentSuccess />
            <p className="text-24px font-semibold mt-32px mb-16px">Yêu cầu quyết toán lại thành công</p>
            <p className="text-grayscale-gray">{dayjs().format(FORMAT_TIME)}</p>
            <Button
              className="w-full flex justify-center text-center mt-30px"
              type="primary"
              onClick={() => {
                resetDiaLog();
                refetch();
              }}>
              Đóng
            </Button>
          </div>
        ),
        hiddenFooter: true,
      });
      refetch();
      setOpenReject(false);
    },
    onError(error) {
      showNotification('error', 'Yêu cầu quyết toán lại thất bại', error?.message);
    },
  });

  const handleReject = useCallback(
    (values: FormValueReject) => {
      if (!settlementId) return;
      const { note } = values;
      rejectMutation({
        variables: { input: { reason: note, settlementId: settlementId } },
      });
    },
    [settlementId, rejectMutation],
  );

  const [acceptMutation, { loading: accepting }] = useUserAcceptSettlementMutation({
    onCompleted() {
      openDialog({
        type: 'ALERT',
        title: ' ',
        message: (
          <div className="text-center">
            <SentSuccess />
            <p className="text-24px font-semibold mt-32px mb-16px">Chấp thuận quyết toán thành công</p>
            <p className="text-grayscale-gray">{dayjs().format(FORMAT_TIME)}</p>
            <Button
              className="w-full flex justify-center text-center mt-30px"
              type="primary"
              onClick={() => {
                resetDiaLog();
                refetch();
              }}>
              Đóng
            </Button>
          </div>
        ),
        hiddenFooter: true,
      });
    },
    onError(error) {
      showNotification('error', 'Chấp thuận quyết toán thất bại', error?.message);
    },
  });

  const handleAcceptSettlement = useCallback(() => {
    if (!settlementId) return;
    acceptMutation({
      variables: {
        settlementId: settlementId,
      },
    });
  }, [acceptMutation, settlementId]);

  const renderNotification = useCallback(() => {
    switch (settlement?.status) {
      case SettlementStatusEnum.REJECTED:
        return (
          <ResponseMessage error>
            {convertBookingStatus(BookingStatusEnum.SETTLEMENT_REJECTED) + ' này. '}
            <span
              className="text-14px font-semibold leading-20px underline hover:cursor-pointer"
              onClick={() => setOpenHistoryStatus(true)}>
              Xem lịch sử trang thái
            </span>
          </ResponseMessage>
        );
      case SettlementStatusEnum.ACCEPTED:
        return (
          <ResponseMessage success className="!bg-[#1BB045]">
            {convertBookingStatus(BookingStatusEnum.SETTLEMENT_ACCEPTED) + ' này. '}
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
  }, [settlement?.status]);

  return (
    <Spin spinning={getting || loading || accepting}>
      <div>
        <div className="bg-white px-24px py-12px flex items-center flex-wrap">
          {(settlements || []).map((i) => (
            <Button
              className="!rounded-full mr-8px"
              type={i.id === settlementId ? 'primary' : 'dashed'}
              key={i.id}
              onClick={() => setSettlementId(i.id)}>
              {dayjs(i.createdAt).format(FORMAT_TIME)}
            </Button>
          ))}
        </div>
        <div className="m-20px">
          <Row gutter={20}>
            <Col span={16}>
              {!settlements && <div className="text-center p-20px bg-white">Chưa có quyết toán</div>}
              {settlement && (
                <div className="flex flex-col space-y-8px mb-[60px]">
                  <div className="h-fit p-20px bg-white">
                    <div className="flex flex-row items-center justify-between">
                      <h3 className="text-16px font-semibold uppercase mb-20px">I. Thông tin chung</h3>
                      <div
                        className={`${isCollapseGeneral ? 'rotate-180' : 'rotate-0'} cursor-pointer`}
                        onClick={() => toggleCollapseGeneral()}>
                        <ChevronDownIcon />
                      </div>
                    </div>
                    <div className={`${isCollapseGeneral ? 'hidden' : 'flex'} w-full flex-col space-y-20px`}>
                      <div className="text-[14px] font-semibold text-yankees-blue leading-[20px]">
                        1. Thông tin khách hàng
                      </div>
                      <div className="w-full flex items-center space-x-20px">
                        <Descriptions
                          className="w-full"
                          bordered
                          column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
                          <Descriptions.Item
                            label="Họ và tên"
                            labelStyle={{ width: '50%' }}
                            contentStyle={{ color: '#202C38' }}>
                            {booking?.user?.fullname}
                          </Descriptions.Item>
                          <Descriptions.Item
                            label="Số điện thoại"
                            labelStyle={{ width: '50%' }}
                            contentStyle={{ color: '#202C38' }}>
                            {booking?.user?.phone}
                          </Descriptions.Item>
                        </Descriptions>
                      </div>
                      <div className="text-[14px] font-semibold text-yankees-blue leading-[20px]">
                        2. Thông tin xe gặp sự cố
                      </div>
                      <div className="w-full flex items-center space-x-20px">
                        <Descriptions
                          className="w-full"
                          bordered
                          column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
                          <Descriptions.Item
                            label="Tên xe"
                            labelStyle={{ width: '50%' }}
                            contentStyle={{ color: '#202C38' }}>
                            {booking?.vehicle?.name}
                          </Descriptions.Item>
                          <Descriptions.Item
                            label="Biển kiểm soát"
                            labelStyle={{ width: '50%' }}
                            contentStyle={{ color: '#202C38' }}>
                            {booking?.vehicle?.vehicleRegistrationPlate}
                          </Descriptions.Item>
                          <Descriptions.Item
                            label="Vị trí xe"
                            labelStyle={{ width: '50%' }}
                            contentStyle={{ color: '#202C38' }}>
                            {booking?.mapAddress}
                          </Descriptions.Item>
                        </Descriptions>
                      </div>
                      <div className="text-[14px] font-semibold text-yankees-blue leading-[20px]">3. Chẩn đoán</div>
                      <div className="w-full flex items-center space-x-20px">
                        <Descriptions
                          className="w-full"
                          bordered
                          column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
                          <Descriptions.Item
                            label="Đã vận hành"
                            labelStyle={{ width: '50%' }}
                            contentStyle={{ color: '#202C38' }}>
                            {quotation?.operatingNumber +
                              (quotation?.operatingUnit === OperatingUnitEnum.HOURS
                                ? ' giờ'
                                : quotation?.operatingUnit)}
                          </Descriptions.Item>
                          {(quotation?.diagnostics || []).map((diagnostic: any) => (
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
                    </div>
                  </div>
                  <SectionWrapper title="II. Thông tin chi phí ">
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
                        {([...(quotation?.additionalFees || []), ...additionalFeesSettlement] || []).map((e: any) => (
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
              {!settlements ||
                (settlements && settlements?.length === 0 && (
                  <div className="text-center p-20px bg-white">Chưa có lịch sử quyết toán</div>
                ))}
              {!settlementId && settlements && settlements?.length > 0 && (
                <div className="text-center p-20px bg-white">Chọn quyết toán để xem</div>
              )}
              {settlementId && !settlement && <div className="text-center p-20px bg-white">Đã có lỗi xảy ra</div>}
            </Col>
            <Col span={8}>
              {renderNotification()}
              <DetailExpense
                expenses={[
                  {
                    label: 'Chẩn đoán',
                    value: (settlement?.quotation?.diagnostics ?? []).reduce(
                      (rs: any, item: any) => rs + item.expense,
                      0,
                    ),
                  },
                  {
                    label: 'Vật tư phụ tùng',
                    value: (settlement?.quotation.accessories || []).reduce(
                      (rs: any, item: any) => rs + item.quantity * item.unitPrice,
                      0,
                    ),
                  },
                  {
                    label: 'Công dịch vụ',
                    value:
                      settlement?.quotation.diagnosisFee +
                      settlement?.quotation.repairFee +
                      settlement?.quotation.transportFee,
                  },
                  {
                    label: 'Phát sinh Công dịch vụ',
                    value: [
                      ...(settlement?.quotation.additionalFees ?? []),
                      ...(settlement?.additionalFees ?? []),
                    ].reduce((rs: any, item: any) => rs + item.amount, 0),
                  },
                ]}
              />
            </Col>
          </Row>
        </div>
        <div>
          {settlement?.status === SettlementStatusEnum.PENDING && (
            <div className="bg-white flex justify-end items-center px-24px py-12px fixed bottom-0 left-0 right-0">
              <Button onClick={() => setOpenReject(true)}>Yêu cầu quyết toán lại</Button>
              <Button type="primary" className="ml-16px" onClick={handleAcceptSettlement}>
                Chấp thuận quyết toán
              </Button>
            </div>
          )}
        </div>
        {openReject && (
          <CancelReasonsByType
            title="Lý do yêu cầu quyết toán lại"
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
      </div>
    </Spin>
  );
});
