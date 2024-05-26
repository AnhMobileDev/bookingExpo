import React, { memo, useCallback, useMemo } from 'react';
import { Button, Col, DatePicker, Divider, Form, Input, Radio, Row, Select, notification } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { RightOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form/Form';
import dayjs from 'dayjs';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate } from 'react-router-dom';

import { SubHeader } from '../../components';
import { AppRoutes } from '../../helpers';
import { Messages } from '../../utils/messages';
import {
  AddressEntity,
  MaintenanceAccessory,
  MaintenanceAccessoryInput,
  MaintenanceLevelEnum,
} from '../../graphql/type.interface';
import { DATE_FORMAT } from '../../constants/format';
import { ChooseVehicle } from '../request-repair/components';
import { FormChooseVehicle } from '../request-repair/type';
import { useCurrentRoutineLevelQuery } from '../../graphql/queries/currentRoutineLevel.generated';
import { arrayRange } from '../../utils';
import { useCreateMaintenanceMutation } from '../../graphql/mutations/createMaintenance.generated';

import { ModalProvider, useModal } from './form-modals/modal-context';
import LocationModal from './form-modals/location-modal';
import SuppliesModal from './form-modals/supplies-modal';
import { ModalType } from './form-modals/modal-reducer';

import './styles.less';

const MaintenanceContent = memo(({ form, onFinish }: { form: FormInstance<any>; onFinish: (values: any) => void }) => {
  const { modal, dispatch } = useModal();
  const vehicleId = Form.useWatch('vehicleId', form);

  const { data: currentRoutineData, loading: currentRoutineLoading } = useCurrentRoutineLevelQuery({
    skip: !vehicleId,
    variables: { vehicleId: vehicleId?.value },
  });
  const listRoutineLevel = useMemo(
    () => arrayRange((currentRoutineData?.currentRoutineLevel ?? 0) + 1, 20),
    [currentRoutineData?.currentRoutineLevel],
  );

  const handleChooseVehicle = useCallback(
    (value: FormChooseVehicle) => {
      form.setFieldValue('vehicleId', { label: value.vehicle.name, value: value.id });
      modal.vehicle.onClose();
      form.setFieldValue('supplies', undefined);
    },
    [form, modal.vehicle],
  );

  const handleChooseLocation = useCallback(
    (address: AddressEntity) => {
      form.setFieldValue('location', {
        id: address.id,
        mapAddress: address.mapAddress,
        addressMoreInfo: address.addressName,
        latitude: address.latitude,
        longitude: address.longitude,
      });
    },
    [form],
  );

  const handleChooseSupplies = useCallback(
    (accessories: Array<MaintenanceAccessoryInput & MaintenanceAccessory>) => {
      form.setFieldValue(
        'accessories',
        accessories.map((accessory) => ({
          id: accessory.id,
          isAvailable: accessory.isAvailable,
        })),
      );
    },
    [form],
  );

  return (
    <Content className="flex justify-center items-center mt-4">
      <div className="bg-white p-6 rounded shadow-md w-2/3">
        <h1 className="text-xl font-semibold mb-4">
          <span style={{ color: 'red' }}>*</span> Xe gặp sự cố
        </h1>
        <Form form={form} name="basic" layout="vertical" onFinish={onFinish}>
          <Form.Item name="accessories" hidden />
          <Row gutter={[16, 16]} className="mb-6">
            <Col span={12}>
              <Form.Item
                required={false}
                label="Tên xe"
                name="vehicleId"
                rules={[{ required: true, message: Messages.required('Tên xe') }]}>
                <Select
                  open={false}
                  placeholder="Nhập tên xe hoặc chọn xe"
                  onClick={() =>
                    dispatch({
                      type: ModalType.VEHICLE,
                      payload: { ...modal.vehicle, open: true },
                    })
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                required={false}
                label="Vị trí xe"
                name="location"
                rules={[{ required: true, message: Messages.required('Vị trí xe') }]}>
                <Input.Group compact>
                  <Form.Item name={['location', 'mapAddress']} noStyle>
                    <Select
                      open={false}
                      className="w-full"
                      suffixIcon={<RightOutlined />}
                      placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
                      onClick={() =>
                        dispatch({
                          type: ModalType.LOCATION,
                          payload: {
                            ...modal.location,
                            open: true,
                          },
                        })
                      }
                    />
                  </Form.Item>
                  <Form.Item name={['location', 'addressMoreInfo']} noStyle>
                    <Select
                      open={false}
                      className="w-full mt-3 slc-none-icon"
                      placeholder="Tên đường, Tên công trình, Tòa nhà, Số nhà"
                      onClick={() =>
                        dispatch({
                          type: ModalType.LOCATION,
                          payload: { ...modal.location, open: true },
                        })
                      }
                    />
                  </Form.Item>
                </Input.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="mb-6">
            <Col span={12}>
              <Form.Item noStyle shouldUpdate={(prev, cur) => prev.vehicleId !== cur.vehicleId}>
                {({ getFieldValue, setFieldsValue }) => {
                  const handleSuppliesLevelChange = (value: number) => {
                    if (value) {
                      setFieldsValue({
                        supplies: {
                          maintenanceLevel: MaintenanceLevelEnum.ROUTINE,
                        },
                      });
                    }
                  };
                  const handleSuppliesTypeChange = (value: string) => {
                    if (value !== MaintenanceLevelEnum.ROUTINE) {
                      setFieldsValue({
                        supplies: {
                          routineLevel: undefined,
                        },
                      });
                      setFieldsValue({
                        accessories: undefined,
                      });
                    }
                  };
                  return (
                    <Form.Item
                      required={false}
                      label="Chọn mốc bảo dưỡng"
                      name={['supplies', 'maintenanceLevel']}
                      rules={[{ required: true, message: Messages.required('Mốc bảo dưỡng') }]}>
                      <Radio.Group
                        className="flex flex-col"
                        disabled={!getFieldValue('vehicleId')}
                        onChange={(e) => handleSuppliesTypeChange(e.target.value)}>
                        <div className="border border-solid border-grayscale-border rounded-lg p-4 mb-3">
                          <Radio className="custom-radio font-medium" value={MaintenanceLevelEnum.ROUTINE}>
                            Bảo dưỡng định kỳ
                          </Radio>
                          {getFieldValue('vehicleId') && !currentRoutineLoading && (
                            <>
                              <Divider className="my-3" />
                              <Form.Item
                                name={['supplies', 'routineLevel']}
                                rules={[
                                  {
                                    validator: (_, value, callback) => {
                                      const maintenanceLevel = getFieldValue(['supplies', 'maintenanceLevel']);
                                      if (maintenanceLevel === MaintenanceLevelEnum.ROUTINE && !value) {
                                        callback(Messages.required('Mốc bảo dưỡng'));
                                      } else {
                                        callback();
                                      }
                                    },
                                  },
                                ]}>
                                <Radio.Group
                                  className="flex flex-col space-y-3 overflow-auto max-h-[30vh]"
                                  onChange={(e) => handleSuppliesLevelChange(e.target.value)}>
                                  {listRoutineLevel.map((el, i) => (
                                    <Radio
                                      key={el}
                                      className="custom-radio bg-[#F9F9F9] p-3"
                                      value={el}
                                      onClick={() =>
                                        dispatch({
                                          type: ModalType.SUPPLIES,
                                          payload: { ...modal.supplies, open: true, routineLevel: el },
                                        })
                                      }>
                                      <div>
                                        Bảo dưỡng lần {el}
                                        {i === 0 && <p className="text-sm text-grayscale-gray">Kỳ hiện tại</p>}
                                      </div>
                                      <RightOutlined />
                                    </Radio>
                                  ))}
                                </Radio.Group>
                              </Form.Item>
                            </>
                          )}
                        </div>
                        <div className="border border-solid border-grayscale-border rounded-lg p-4">
                          <Radio className="custom-radio font-medium" value={MaintenanceLevelEnum.INCURRED}>
                            Bảo dưỡng phát sinh
                          </Radio>
                        </div>
                      </Radio.Group>
                    </Form.Item>
                  );
                }}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                required={false}
                label="Khoảng thời gian đặt lịch"
                name="date"
                rules={[{ required: true, message: Messages.required('Thời gian đặt lịch') }]}>
                <DatePicker.RangePicker
                  className="w-full"
                  format={DATE_FORMAT}
                  disabledDate={(current) => current && current.isBefore(dayjs(), 'day')}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="Mô tả" name="note">
                <TextArea placeholder="Nhập mô tả..." autoSize={{ minRows: 4 }} showCount maxLength={1000} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <ChooseVehicle {...modal.vehicle} onFinish={handleChooseVehicle} />
      <LocationModal {...modal.location} onFinish={handleChooseLocation} />
      <SuppliesModal {...modal.supplies} onFinish={handleChooseSupplies} />
    </Content>
  );
});

const MaintenanceForm: React.FC = memo(() => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [createMaintenance, { loading: creating }] = useCreateMaintenanceMutation({
    onCompleted: () => {
      notification.success({ message: Messages.create.success('yêu cầu bảo dưỡng') });
      navigate(AppRoutes.maintenances.index);
    },
    onError: (err) =>
      notification.error({ message: Messages.create.fail('yêu cầu bảo dưỡng'), description: err?.message }),
  });

  const onFinish = useCallback(
    (values: any) => {
      const input = {
        accessories: values?.accessories,
        addressMoreInfo: values.location?.addressMoreInfo,
        endDate: values.date[1],
        isActive: true,
        latitude: values.location.latitude,
        longitude: values.location.longitude,
        maintenanceLevel: values.supplies.maintenanceLevel,
        mapAddress: values.location.mapAddress,
        note: values.note,
        routineLevel: values.supplies.routineLevel,
        startDate: values.date[0],
        vehicleId: values.vehicleId.value,
      };
      createMaintenance({ variables: { input } });
    },
    [createMaintenance],
  );

  return (
    <div>
      <SubHeader
        items={[
          { title: 'Trang chủ', to: AppRoutes.home },
          { title: 'Đặt lịch bảo dưỡng', to: AppRoutes.maintenances.index },
        ]}
        rightContent={
          <Button type="primary" onClick={() => form.submit()} loading={creating}>
            Xác nhận
          </Button>
        }
      />
      <ModalProvider>
        <MaintenanceContent form={form} onFinish={onFinish} />
      </ModalProvider>
    </div>
  );
});
export default MaintenanceForm;
