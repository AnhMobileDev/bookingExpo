import { Button, Form, notification } from 'antd';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { SubHeaderDetail } from '../../components/subheader-detail';
import { AppRoutes, showGraphQLErrorMessage } from '../../helpers';
import { useVehicleQuery } from '../../graphql/queries/vehicle.generated';
import { useUploadImageMutation } from '../../services';
import { useUpdateVehicleMutation } from '../../graphql/mutations/updateVehicle.generated';
import { ModalCustomize } from '../../components/modal-customize';
import { useRemoveVehicleMutation } from '../../graphql/mutations/removeVehicle.generated';
import { FullscreenLoading } from '../../components';

import { InformationForm } from './component/information-form';

import { InformationFormData } from '.';

export type Address = { latitude: number; longitude: number; mapAddress: string; addressName: string };
const VehicleDetail = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm<InformationFormData>();

  const param = useParams();

  const id = param.slug;

  const [searchParams, setSearchParams] = useSearchParams();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const [image, setImage] = useState<File>();

  const [view, setView] = useState<string>();

  const { data } = useVehicleQuery({ variables: { id: id as string } });

  const vehicle = data?.vehicle;

  useEffect(() => {
    const res = searchParams.get('view');
    switch (res) {
      case 'detail':
      default:
        setView('detail');
        break;
      case 'edit':
        setView('edit');
        break;
    }
  }, [searchParams]);

  useEffect(() => {
    if (vehicle) {
      form.setFieldsValue({
        modelId: `${vehicle?.model?.name}`,
        manufacturerId: `${vehicle?.manufacturer?.name}`,
        vehicleTypeId: `${vehicle?.vehicleType?.name}`,
        originId: `${vehicle?.origin?.name}`,
        ...(vehicle as any),
      });
    }
  }, [form, vehicle]);

  const [userUpdateVehicle, { loading: loadingUpdateVehicle }] = useUpdateVehicleMutation({
    onCompleted: () => {
      notification.success({ message: 'Sửa thông tin máy thành công' });
      navigate(AppRoutes.vehicle);
    },
    onError: showGraphQLErrorMessage,
  });

  const { mutateAsync } = useUploadImageMutation({
    onError(error) {
      notification.error({ message: 'Tải ảnh lên thất bại.', description: error?.message });
    },
  });

  const [userRemoveVehicle, { loading: loadingRemoveVehicle }] = useRemoveVehicleMutation({
    onCompleted: () => {
      notification.success({ message: 'Xóa thành công' });
      form.resetFields();
      navigate(AppRoutes.vehicle);
    },
    onError: showGraphQLErrorMessage,
  });

  const onSubmitUpdateVehicle = async (values: InformationFormData) => {
    let avatarId = vehicle?.avatar?.id;
    form
      .validateFields()
      .then(async () => {
        if (image != null) {
          const formData = new FormData();
          formData.append('file', image);
          avatarId = (await mutateAsync(formData)).id;
        }
        await userUpdateVehicle({
          variables: {
            input: {
              avatarId: avatarId ? avatarId : vehicle?.avatarId,
              latitude: values ? values?.addresses.latitude : (vehicle?.latitude as number),
              longitude: values ? values?.addresses.longitude : (vehicle?.longitude as number),
              manufacturerId:
                values.manufacturerId == vehicle?.manufacturer?.name
                  ? vehicle.manufacturer.id
                  : (values.manufacturerId as string),
              mapAddress: values ? values?.addresses.mapAddress : (vehicle?.mapAddress as string),
              modelId: values.modelId == vehicle?.model?.name ? vehicle?.model?.id : (values.modelId as string),
              name: values.name ? values.name : (vehicle?.name as string),
              operatingNumber: 0,
              addressMoreInfo: values.addressMoreInfo ? values.addressMoreInfo : (vehicle?.addressMoreInfo as string),
              originId: values.originId == vehicle?.origin?.name ? vehicle?.origin?.id : (values.originId as string),
              vehicleTypeId:
                values.vehicleTypeId == vehicle?.vehicleType?.name
                  ? vehicle?.vehicleType?.id
                  : (values.vehicleTypeId as string),
              vinNumber: values.vinNumber ? values.vinNumber : (vehicle?.vinNumber as string),
              yearOfManufacture: values.yearOfManufacture ? values.yearOfManufacture : 0,
              detail: values.detail ? values.detail : (vehicle?.detail as string),
              serialNumber: values.serialNumber ? values.serialNumber : (vehicle?.serialNumber as string),
              vehicleRegistrationPlate: values.vehicleRegistrationPlate
                ? values.vehicleRegistrationPlate
                : (vehicle?.vehicleRegistrationPlate as string) ?? null,
              id: vehicle?.id ?? '',
            },
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancelEditVehicle = () => {
    setSearchParams((params) => {
      params.set('view', 'detail');
      return params;
    });
    form.setFieldsValue({
      modelId: `${vehicle?.model?.name}`,
      manufacturerId: `${vehicle?.manufacturer?.name}`,
      vehicleTypeId: `${vehicle?.vehicleType?.name}`,
      originId: `${vehicle?.origin?.name}`,
      ...(vehicle as any),
    });
  };

  const handleEditVehicle = () => {
    setSearchParams((params) => {
      params.set('view', 'edit');
      return params;
    });
  };

  const handleOkModal = async () => {
    await userRemoveVehicle({ variables: { id: vehicle?.id as string } });
  };

  if (!vehicle) return <FullscreenLoading />;

  return (
    <div>
      <Form disabled={view === 'detail' ? true : false} form={form} onFinish={onSubmitUpdateVehicle} autoComplete="off">
        <SubHeaderDetail
          items={[
            { title: 'Trang chủ', to: AppRoutes.home, id: null },
            { title: 'Xe của tôi', to: AppRoutes.vehicle, id: null },
            { title: 'Thông tin máy', to: null, id: 'Thông tin máy' },
          ]}>
          <div className="flex gap-8 items-center ">
            {view === 'detail' && (
              <div className="flex gap-3">
                <Button className=" text-black" disabled={false}>
                  Ẩn
                </Button>
                <Button className=" bg-[#D63120] text-white" disabled={false} onClick={() => setIsOpenModal(true)}>
                  Xóa
                </Button>

                <Button type="primary" className=" text-black" disabled={false} onClick={handleEditVehicle}>
                  Chỉnh sửa
                </Button>
              </div>
            )}
            {view === 'edit' && (
              <div className="flex gap-3">
                <Button className=" bg-[#D63120] text-white" disabled={false} onClick={handleCancelEditVehicle}>
                  Hủy
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className=" text-black"
                  loading={loadingUpdateVehicle}
                  disabled={loadingUpdateVehicle}>
                  Hoàn tất
                </Button>
              </div>
            )}
          </div>
        </SubHeaderDetail>
        <ModalCustomize
          onOk={handleOkModal}
          open={isOpenModal}
          title={`Xóa "${vehicle?.name}"`}
          onCancel={() => setIsOpenModal(false)}
          footer={
            <div className="flex justify-end shadow-md p-3 rounded-md">
              <Button disabled={false} onClick={() => setIsOpenModal(false)}>
                Hủy
              </Button>
              <Button
                disabled={false}
                type="primary"
                htmlType="submit"
                onClick={handleOkModal}
                loading={loadingRemoveVehicle}>
                Xóa
              </Button>
            </div>
          }>
          <div className="text-[#676E72] font-normal text-lg">
            Bạn chắc chắn muốn xóa xe này khỏi danh sách xe của bạn?
          </div>
        </ModalCustomize>
        <div className="flex-center mt-5 ">
          <InformationForm image={image} setImage={setImage} vehicle={vehicle}></InformationForm>
        </div>
      </Form>
    </div>
  );
};

export default VehicleDetail;
