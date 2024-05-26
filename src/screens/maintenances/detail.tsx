import { useMemo, memo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Button, Col, Collapse, Image, Row, Spin } from 'antd';
import dayjs from 'dayjs';

import { useMaintenanceQuery } from '../../graphql/queries/maintenance.generated';
import { SubHeader } from '../../components';
import { AppRoutes } from '../../helpers';
import { LocationIcon } from '../../assets/icon';
import { maintenanceText } from '../../utils/messages';
import { DATE_FORMAT, TIME_FORMAT } from '../../constants/format';
import { MaintenanceLevelEnum, MaintenanceStatusEnum } from '../../graphql/type.interface';

import { CancelMaintenance } from './form-modals/cancel-modal';
import './styles.less';

const Section = memo(({ title, text, textClass }: { title: string; text: React.ReactNode; textClass?: string }) => (
  <>
    <p className="font-semibold text-base mb-4">{title}</p>
    <div className={`px-4 py-2.5 border border-solid border-grayscale-border ${textClass ?? ''}`}>{text}</div>
  </>
));

const DetailMaintenance = memo(() => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const [modalCancel, setModalCancel] = useState(false);
  const { data, loading } = useMaintenanceQuery({ variables: { id } });

  const maintenance = useMemo(() => data?.maintenance, [data?.maintenance]);

  const [waitForConfirm, refuse] = useMemo(
    () => [maintenance?.status === MaintenanceStatusEnum.NEW, maintenance?.status === MaintenanceStatusEnum.CANCEL],
    [maintenance?.status],
  );

  return (
    <Spin spinning={loading}>
      <SubHeader
        items={[
          { title: 'Trang chủ', to: AppRoutes.home },
          { title: 'Danh sách bảo dưỡng', to: AppRoutes.maintenances.index },
          { title: 'Chi tiết bảo dưỡng', to: AppRoutes.maintenances.detail.id(id) },
        ]}
        rightContent={
          <Button onClick={() => (!waitForConfirm ? navigate(AppRoutes.maintenances.index) : setModalCancel(true))}>
            {!waitForConfirm ? 'Đóng' : 'Hủy yêu cầu'}
          </Button>
        }
        title={maintenance?.code}
      />
      {!refuse && (
        <Alert
          type={waitForConfirm ? 'warning' : 'success'}
          message={waitForConfirm ? 'Đang chờ Call Me phê duyệt' : 'Yêu cầu bảo dưỡng đã được phê duyệt.'}
          banner
        />
      )}
      <div className="m-20px">
        <Row gutter={20}>
          <Col span={18}>
            <div className="mb-20px p-20px bg-white">
              <p className="text-lg font-semibold mb-6">XE CẦN BẢO DƯỠNG</p>
              <div className="flex gap-5 items-center w-full">
                <Image src={maintenance?.vehicle?.avatar?.fullThumbUrl ?? ''} width={64} height={64} />
                <div className="flex flex-col gap-2 w-full">
                  <p className="text-base font-semibold">{maintenance?.vehicle?.name}</p>
                  <p>
                    {/* TODO: Update text */}
                    {maintenance?.vehicle?.vehicleType?.name} • {maintenance?.vehicle?.yearOfManufacture} • LW500FN
                  </p>
                  <div className="bg-ghost-white py-2 px-3 flex items-center rounded">
                    <LocationIcon />{' '}
                    <span className="ml-3">
                      {`${maintenance?.addressMoreInfo ?? ''} `}
                      {maintenance?.mapAddress}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-20px p-20px bg-white flex gap-x-20px">
              <div className="w-full">
                <Section
                  title="MỐC BẢO DƯỠNG"
                  text={
                    maintenance?.maintenanceLevel &&
                    maintenanceText(maintenance.maintenanceLevel, maintenance?.routineLevel)
                  }
                />
              </div>
              <div className="w-full">
                <Section
                  title="THỜI GIAN ĐẶT LỊCH"
                  text={`${maintenance?.startDate ? dayjs(maintenance.startDate).format(DATE_FORMAT) : 'Không rõ'} - ${
                    maintenance?.endDate ? dayjs(maintenance.endDate).format(DATE_FORMAT) : 'Không rõ'
                  }`}
                  textClass="text-center"
                />
              </div>
            </div>
            <div className="mb-20px p-20px bg-white">
              <Section title="MÔ TẢ" text={maintenance?.note ? maintenance?.note : 'Không có mô tả'} />
            </div>
          </Col>
          <Col span={6}>
            {maintenance?.maintenanceLevel === MaintenanceLevelEnum.ROUTINE && (
              <Collapse className="border-none bg-white mb-2" expandIconPosition="end">
                <Collapse.Panel
                  className="max-height-panel"
                  header={`VẬT TƯ BẢO DƯỠNG ĐỊNH KỲ LẦN ${maintenance.routineLevel}`}
                  key="supplies">
                  <div className="p-2 space-y-4">
                    {maintenance.accessories?.map((el, i) => (
                      <div key={el.id} className="border-accessory">
                        <p className="font-medium bg-ghost-white py-3 px-4">
                          {i + 1}. {el.name}
                          <span className="float-right">
                            x{el.quantity} {el.unit}
                          </span>
                        </p>
                        <p className="py-4 text-center">{el.isAvailable ? 'Có sẵn' : 'Không có sẵn'}</p>
                      </div>
                    ))}
                  </div>
                </Collapse.Panel>
              </Collapse>
            )}
            <div className="my-20px bg-white p-20px">
              <Section
                title="ĐƠN VỊ BẢO DƯỠNG"
                text={
                  <>
                    <Image src={maintenance?.user?.avatar?.fullThumbUrl ?? ''} width={38} height={38} />
                    <span className="ml-3 font-medium">{maintenance?.user?.fullname}</span>
                  </>
                }
              />
            </div>
            {refuse && (
              <div className="bg-white p-20px mb-20px">
                <Section
                  title="LÝ DO TỪ CHỐI"
                  text={
                    maintenance?.statusDetail?.reasons && maintenance.statusDetail.reasons.length !== 0
                      ? maintenance.statusDetail.reasons.map((reason) => <p key={reason.id}>- {reason.name}</p>)
                      : 'Không có lý do'
                  }
                />
              </div>
            )}
            {maintenance?.statusDetail?.note && (
              <div className="bg-white p-20px">
                <Section title="Lý do khác" text={maintenance.statusDetail.note} />
              </div>
            )}
            <div className="bg-white p-20px">
              <Row>
                <Col className="grow text-grayscale-gray">Mã yêu cầu</Col>
                <Col>{maintenance?.code}</Col>
              </Row>
              <Row>
                <Col className="grow text-grayscale-gray">Thời gian đặt</Col>
                <Col>{maintenance?.createdAt && dayjs(maintenance.createdAt).format(TIME_FORMAT)}</Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
      <CancelMaintenance id={id} open={modalCancel} onClose={() => setModalCancel(false)} />
    </Spin>
  );
});

export default DetailMaintenance;
