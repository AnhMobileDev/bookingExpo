import Table, { ColumnsType } from 'antd/es/table';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DeleteOutlined, EditOutlined, EyeOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Form, Popconfirm, Tag, Tooltip, notification } from 'antd';
import './style.less';

import { Vehicle } from '../../components/colums-table';
import { AppRoutes, showGraphQLErrorMessage } from '../../helpers';
import { AdminUserPaginationInput, OperatingUnitEnum } from '../../graphql/type.interface';
import { useVehiclesQuery } from '../../graphql/queries/vehicles.generated';
import { DefaultPagination } from '../../utils/pagination';
import { SubHeaderDetail } from '../../components/subheader-detail';
import { Add } from '../../assets/icon';
import { useRemoveVehicleMutation } from '../../graphql/mutations/removeVehicle.generated';
import { useCreateVehicleMutation } from '../../graphql/mutations/createVehicle.generated';
import { useUploadImageMutation } from '../../services';

import { InformationForm } from './component/information-form';

export type Addresses = {
  latitude: number;
  longitude: number;
  mapAddress: string;
};

export type InformationFormData = {
  addressMoreInfo?: string;
  avatarId?: string;
  detail?: string;
  manufacturerId: string;
  modelId: string;
  addresses: Addresses;
  name: string;
  operatingNumber: number;
  operatingUnit?: OperatingUnitEnum;
  ordinalNumber?: any;
  originId: string;
  serialNumber?: string;
  vehicleRegistrationPlate?: string;
  vehicleTypeId: string;
  vinNumber: string;
  yearOfManufacture: number;
};

const MyVehicle = () => {
  const [form] = Form.useForm<InformationFormData>();

  const navigate = useNavigate();

  const [paramAddVehicle, setParamAddVehicle] = useState<string>();

  const [searchParams] = useSearchParams();

  const [image, setImage] = useState<File>();

  const [filter, setFilter] = useState<AdminUserPaginationInput>({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    const res = searchParams.get('status');
    switch (res) {
      case 'list-vehicle':
      default:
        setParamAddVehicle('list-vehicle');
        break;
      case 'add-vehicle':
        setParamAddVehicle('add-vehicle');
        break;
    }
  }, [searchParams]);

  const { data, loading, refetch } = useVehiclesQuery({ variables: { ...filter } });

  const listVehicle = data?.vehicles?.items
    ? data?.vehicles?.items.map((item, index) => ({ ...item, key: item.id, index: ++index }))
    : [];

  const totalItems = data?.vehicles.meta.totalItems;

  const [userCreateVehicle, { loading: loadingCreateVehicle }] = useCreateVehicleMutation({
    onCompleted: () => {
      notification.success({ message: 'Thêm mới thành công' });
      form.resetFields();
      navigate(AppRoutes.vehicle + '?status=list-vehicle');
      refetch();
    },
    onError: showGraphQLErrorMessage,
  });

  const { mutateAsync } = useUploadImageMutation({
    onError(error) {
      notification.error({ message: 'Tải ảnh lên thất bại.', description: error?.message });
    },
  });

  const [userRemoveVehicle] = useRemoveVehicleMutation({
    onCompleted: () => {
      notification.success({ message: 'Xóa thành công' });
      refetch();
    },
    onError: showGraphQLErrorMessage,
  });

  const handleCreateVehicle = async (values: InformationFormData) => {
    let avatarId;
    if (image != null) {
      const formData = new FormData();
      formData.append('file', image);
      avatarId = (await mutateAsync(formData)).id;
    }

    await userCreateVehicle({
      variables: {
        input: {
          avatarId: avatarId,
          latitude: values.addresses.latitude,
          longitude: values.addresses.longitude,
          manufacturerId: values.manufacturerId,
          mapAddress: values.addresses.mapAddress,
          modelId: values.modelId,
          name: values.name,
          operatingNumber: 0,
          addressMoreInfo: values.addressMoreInfo ? values.addressMoreInfo : '',
          originId: values.originId ? values.originId : '',
          vehicleTypeId: values.vehicleTypeId,
          vinNumber: values.vinNumber,
          yearOfManufacture: values.yearOfManufacture,
          detail: values.detail,
          serialNumber: values.serialNumber ? values.serialNumber : '',
          vehicleRegistrationPlate: values.vehicleRegistrationPlate ? values.vehicleRegistrationPlate : undefined,
        },
      },
    });
  };

  const handleCancelCreateVehicle = () => {
    form.resetFields();
    navigate(AppRoutes.vehicle + '?status=list-vehicle');
  };

  const handleOkModalRemoveVehicle = async (id: string) => {
    await userRemoveVehicle({ variables: { id: id as string } });
  };

  const onChangePage = (newPage: any) => {
    setFilter({ ...filter, page: newPage });
  };

  const columns: ColumnsType<any> = [
    {
      title: 'STT',
      key: 'index',
      dataIndex: 'index',
      align: 'center',
      render: (text: any, item: any, index: number) => {
        if (filter && filter?.page) {
          return filter?.page === 1 ? index + 1 : (filter?.page - 1) * 10 + (index + 1);
        }
      },
      width: '3%',
    },
    {
      title: 'Biển số',
      dataIndex: 'vehicleRegistrationPlate',
      width: '10%',
      align: 'center',
      key: 'vehicleRegistrationPlate',
      render: (vehicleRegistrationPlate) => {
        return <div>{vehicleRegistrationPlate}</div>;
      },
    },
    {
      title: 'Tên xe',
      dataIndex: '',
      key: '',
      render: (item) => <Vehicle vehicle={item} />,
    },
    {
      title: `Chủng loại`,
      dataIndex: 'vehicleType',
      align: 'center',
      key: 'vehicleType',
      render: (vehicleType) => <div>{vehicleType?.name}</div>,
      width: '15%',
    },
    {
      title: `Năm sản xuất`,
      dataIndex: 'yearOfManufacture',
      align: 'center',
      key: 'yearOfManufacture',
      render: (yearOfManufacture) => <div>{yearOfManufacture}</div>,
      width: '8%',
    },

    {
      title: `Tùy chọn`,
      dataIndex: 'id',
      width: '12%',
      align: 'center',
      key: 'id',
      render: (id) => {
        return (
          <div className="flex gap-2 justify-end">
            <Tooltip title="Sửa">
              <Tag
                className="hover:cursor-pointer"
                color="blue"
                onClick={() => navigate(AppRoutes.vehicle + `/${id}` + '?view=edit')}>
                <EditOutlined />
              </Tag>
            </Tooltip>
            <span className="translate-y-0.5 text-grayscale-border">|</span>
            <Popconfirm
              title="Xóa xe"
              onConfirm={() => handleOkModalRemoveVehicle(id)}
              description="Bạn có chắc chắn xóa xe này?"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
              <Tooltip title="Xóa">
                <Tag className="hover:cursor-pointer" color="#f50">
                  <DeleteOutlined />
                </Tag>
              </Tooltip>
            </Popconfirm>
            <span className="translate-y-0.5 text-grayscale-border">|</span>
            <Tooltip title="Xem chi tiết">
              <Tag
                className="hover:cursor-pointer"
                color="gold"
                onClick={() => navigate(AppRoutes.vehicle + `/${id}` + '?view=detail')}>
                <EyeOutlined />
              </Tag>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <>
      {paramAddVehicle != 'add-vehicle' ? (
        <div>
          <SubHeaderDetail
            items={[
              { title: 'Trang chủ', to: AppRoutes.home, id: null },
              { title: 'Xe của tôi', to: AppRoutes.vehicle, id: null },
            ]}>
            <div className="flex gap-8 items-center ">
              <div className="flex gap-3">
                <Button
                  type="primary"
                  className=" text-black mr-5"
                  onClick={() => navigate(AppRoutes.vehicle + '?status=add-vehicle')}>
                  <Add className="translate-y-1 mr-1" />
                  Thêm mới thiết bị
                </Button>
              </div>
            </div>
          </SubHeaderDetail>
          <div className="bg-white mx-5 mt-5">
            <h2 className="text-lg font-semibold p-5">{totalItems} xe tất cả</h2>
            <Table
              size="small"
              loading={loading}
              bordered
              columns={columns}
              dataSource={listVehicle}
              pagination={{
                ...DefaultPagination,
                onChange: onChangePage,
                current: Number(filter?.page),
                total: data?.vehicles?.meta.totalItems,
              }}
              scroll={{ y: 'calc(100vh - 320px)' }}
            />
          </div>
        </div>
      ) : (
        <div>
          <Form form={form} onFinish={handleCreateVehicle} autoComplete="off">
            <SubHeaderDetail
              items={[
                { title: 'Trang chủ', to: AppRoutes.home, id: null },
                { title: 'Xe của tôi', to: AppRoutes.vehicle, id: null },
                { title: 'Thêm mới thiết bị', to: null, id: 'Thêm mới thiết bị' },
              ]}>
              <div className="flex gap-8 items-center ">
                <div className="flex gap-3">
                  <Button className=" bg-[#D63120] text-white" onClick={handleCancelCreateVehicle}>
                    Hủy
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className=" text-black"
                    loading={loadingCreateVehicle}
                    disabled={loadingCreateVehicle}>
                    Hoàn tất
                  </Button>
                </div>
              </div>
            </SubHeaderDetail>
            <div className="flex-center mt-5 ">
              <InformationForm image={image} setImage={setImage}></InformationForm>
            </div>
          </Form>
        </div>
      )}
    </>
  );
};

export default MyVehicle;
