import TextArea from 'antd/es/input/TextArea';
import { Button, Form, Input, Select, Upload, UploadProps, message } from 'antd';
import { memo, useMemo, Dispatch, SetStateAction } from 'react';
import { RcFile } from 'antd/es/upload';
import dayjs from 'dayjs';

import { CategoryTypeEnum, StatusEnum, VehicleEntity } from '../../../graphql/type.interface';
import { useCategoriesQuery } from '../../../graphql/queries/categories.generated';
import { FormLabel } from '../../../components/form-label';
import { CheckedIcon, Edit } from '../../../assets/icon';
import { validationMessages } from '../../../helpers';
import { FullscreenLoading } from '../../../components';
import { SearchAddress } from '../../../components/search-address';
import { useCheckVehicleRegistrationPlateExistLazyQuery } from '../../../graphql/queries/checkVehicleRegistrationPlateExist.generated';
import { useCheckVinExistLazyQuery } from '../../../graphql/queries/checkVinExist.generated';
import { useCheckSerialExistLazyQuery } from '../../../graphql/queries/checkSerialExist.generated';

export type Addresses = {
  latitude: number;
  longitude: number;
  mapAddress: string;
};

type Props = {
  image: File | undefined;
  setImage: Dispatch<SetStateAction<File | undefined>>;
  vehicle?: VehicleEntity;
};

const filter = {
  limit: 1000,
  isActive: StatusEnum.ACTIVE,
};

export const InformationForm = memo(({ image, setImage, vehicle }: Props) => {
  const [checkVehicleRegistration] = useCheckVehicleRegistrationPlateExistLazyQuery();
  const [checkVinExist] = useCheckVinExistLazyQuery();
  const [checkSerialExist] = useCheckSerialExistLazyQuery();

  const { loading: gettingModel, data: modelData } = useCategoriesQuery({
    variables: {
      type: CategoryTypeEnum.MODEL,
      ...filter,
    },
  });

  const modelOptions = useMemo(
    () =>
      modelData?.categories.items?.map((it) => ({
        label: it.name,
        value: it.id,
      })),
    [modelData?.categories.items],
  );

  const { loading: gettingManufacturer, data: manufacturerData } = useCategoriesQuery({
    variables: {
      type: CategoryTypeEnum.MANUFACTURER,
      ...filter,
    },
  });

  const manufacturerOptions = useMemo(
    () =>
      manufacturerData?.categories.items?.map((it) => ({
        label: it.name,
        value: it.id,
      })),
    [manufacturerData?.categories.items],
  );

  const { loading: gettingVehicleType, data: vehicleTypeData } = useCategoriesQuery({
    variables: {
      type: CategoryTypeEnum.VEHICLE_TYPE,
      ...filter,
    },
  });

  const vehicleTypeOptions = useMemo(
    () =>
      vehicleTypeData?.categories.items?.map((it) => ({
        label: it.name,
        value: it.id,
      })),
    [vehicleTypeData?.categories.items],
  );

  const { loading: gettingOrigin, data: originData } = useCategoriesQuery({
    variables: {
      type: CategoryTypeEnum.ORIGIN,
      ...filter,
    },
  });

  const originOptions = useMemo(
    () =>
      originData?.categories.items?.map((it) => ({
        label: it.name,
        value: it.id,
      })),
    [originData?.categories.items],
  );

  const nowDate = dayjs().year();
  const yearData: number[] = [];
  for (let i = 0; i < 50; i++) {
    yearData.push(nowDate - i);
  }

  const yearOptions = yearData?.map((year) => ({
    label: year,
    value: year,
  }));

  const handleUploadFile: UploadProps['onChange'] = ({ file }) => {
    setImage(file as any);
  };

  const props: UploadProps = {
    listType: 'picture',
    onChange: handleUploadFile,
    onRemove: () => {
      return Promise.resolve(false);
    },
    beforeUpload: (file: RcFile) => {
      const maxSizeInMB = 10;
      const isAllowedSize = file.size / 1024 / 1024 < maxSizeInMB;
      if (!isAllowedSize) {
        message.error(`Dung lượng ảnh tối đa là ${maxSizeInMB} MB`);
        return false;
      }
      return false;
    },
  };

  const validateField = async (rule: any, value: string) => {
    if (!value) {
      throw new Error(validationMessages.required);
    }
  };

  if (gettingManufacturer || gettingVehicleType || gettingOrigin || gettingModel) {
    return <FullscreenLoading />;
  }

  return (
    <div className="space-y-2 bg-white p-5 w-full pb-20 max-w-[900px] information-form-vehicle">
      <div className="flex gap-5 mb-7">
        <img
          className="w-20 h-20 rounded object-cover"
          src={image ? URL.createObjectURL(image) : `${vehicle?.avatar?.fullThumbUrl}`}
          alt=""
        />

        <div className="flex flex-col">
          <FormLabel required>Ảnh đại diện</FormLabel>
          <Form.Item
            name="avatarId"
            rules={[
              {
                validator: (rule, value) => validateField(rule, value),
              },
            ]}>
            <Upload listType="picture" accept="image/png, image/gif, image/jpeg" {...props}>
              <Button type="link">
                Thay đổi
                <Edit className="ml-2 translate-y-1"></Edit>
              </Button>
            </Upload>
          </Form.Item>
        </div>
      </div>
      <div className="mt-[24px] grid grid-cols-2 gap-x-[30px] gap-y-5">
        <div className="col-span-3">
          <div className="grid grid-cols-2 gap-x-[30px] gap-y-5">
            <div>
              <FormLabel required>Tên máy</FormLabel>
              <Form.Item
                name="name"
                label=""
                rules={[
                  {
                    validator: (rule, value) => validateField(rule, value),
                  },
                ]}>
                <Input maxLength={255} placeholder="Nhập tên máy" />
              </Form.Item>
            </div>
            <div>
              <FormLabel required>Biển số</FormLabel>
              <Form.Item
                name="vehicleRegistrationPlate"
                rules={[
                  {
                    validator: async (rule, value) => {
                      if (value) {
                        const vehicleExisted = (
                          await checkVehicleRegistration({ variables: { vehicleRegistrationPlate: value } })
                        ).data?.checkVehicleRegistrationPlateExist;
                        if (vehicleExisted) {
                          throw new Error('Biển số đã tồn tại');
                        }
                      }
                    },
                  },
                ]}>
                <Input placeholder="Nhập biển số" />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="grid grid-cols-2 gap-x-[30px] gap-y-5">
            <div>
              <FormLabel>Số thứ tự</FormLabel>
              <Form.Item name="">
                <Input placeholder="Nhập số thứ tự" />
              </Form.Item>
            </div>
            <div>
              <FormLabel required>Chủng loại máy</FormLabel>
              <Form.Item
                name="vehicleTypeId"
                rules={[
                  {
                    validator: (rule, value) => validateField(rule, value),
                  },
                ]}>
                <Select
                  options={vehicleTypeOptions}
                  placeholder="Chọn chủng loại máy"
                  menuItemSelectedIcon={<CheckedIcon />}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="grid grid-cols-2 gap-x-[30px] gap-y-5">
            <div>
              <FormLabel required>Hãng sản xuất</FormLabel>
              <Form.Item
                name="manufacturerId"
                label=""
                rules={[
                  {
                    validator: (rule, value) => validateField(rule, value),
                  },
                ]}>
                <Select
                  options={manufacturerOptions}
                  placeholder="Chọn hãng sản xuất"
                  menuItemSelectedIcon={<CheckedIcon />}
                />
              </Form.Item>
            </div>
            <div>
              <FormLabel required>Model</FormLabel>
              <Form.Item
                name="modelId"
                rules={[
                  {
                    validator: (rule, value) => validateField(rule, value),
                  },
                ]}>
                <Select options={modelOptions} placeholder="Chọn model" menuItemSelectedIcon={<CheckedIcon />} />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="grid grid-cols-2 gap-x-[30px] gap-y-5">
            <div>
              <FormLabel>Số serial</FormLabel>
              <Form.Item
                name="serialNumber"
                rules={[
                  {
                    validator: async (rule, value) => {
                      if (value) {
                        const serialExisted = (await checkSerialExist({ variables: { serialNumber: value } })).data
                          ?.checkSerialExist;
                        if (serialExisted) {
                          throw new Error('Số serial đã tồn tại');
                        }
                      }
                    },
                  },
                ]}>
                <Input placeholder="Nhập số serial" />
              </Form.Item>
            </div>
            <div>
              <FormLabel required>Số VIN</FormLabel>
              <Form.Item
                name="vinNumber"
                label=""
                rules={[
                  {
                    validator: async (rule, value) => {
                      if (value) {
                        const vinNumberExisted = (await checkVinExist({ variables: { serialNumber: value } })).data
                          ?.checkVinExist;
                        if (vinNumberExisted) {
                          throw new Error('Số Vin đã tồn tại');
                        }
                      }

                      if (!value) {
                        throw new Error(validationMessages.required);
                      }
                    },
                  },
                ]}>
                <Input placeholder="Nhập số vin" />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="grid grid-cols-2 gap-x-[30px] gap-y-5">
            <div>
              <FormLabel required>Xuất xứ</FormLabel>
              <Form.Item
                name="originId"
                rules={[
                  {
                    validator: (rule, value) => validateField(rule, value),
                  },
                ]}>
                <Select options={originOptions} placeholder="Chọn quốc gia" menuItemSelectedIcon={<CheckedIcon />} />
              </Form.Item>
            </div>
            <div>
              <FormLabel required>Năm sản xuất</FormLabel>
              <Form.Item
                name="yearOfManufacture"
                label=""
                rules={[
                  {
                    validator: (rule, value) => validateField(rule, value),
                  },
                ]}>
                <Select options={yearOptions} placeholder="Chọn năm sản xuất" menuItemSelectedIcon={<CheckedIcon />} />
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="col-span-3">
          <div className="grid grid-cols-2 gap-x-[30px] gap-y-5">
            <div className="flex flex-col">
              <FormLabel required>Địa điểm đặt máy</FormLabel>
              <Form.Item
                name="addresses"
                label=""
                rules={[
                  {
                    validator: (rule, value) => validateField(rule, value),
                  },
                ]}>
                <SearchAddress
                  defaultValues={
                    vehicle
                      ? {
                          mapAddress: vehicle?.mapAddress as string,
                          latitude: vehicle?.latitude as number,
                          longitude: vehicle?.longitude as number,
                          addressName: vehicle?.mapAddress as string,
                        }
                      : undefined
                  }></SearchAddress>
              </Form.Item>
            </div>
            <div className="flex flex-col">
              <FormLabel required>Chi tiết địa chỉ</FormLabel>
              <Form.Item
                name="addressMoreInfo"
                label=""
                rules={[
                  {
                    validator: (rule, value) => validateField(rule, value),
                  },
                ]}>
                <Input maxLength={255} placeholder="Tên đường, Tên công trình, Tòa nhà, Số nhà" />
              </Form.Item>
            </div>
          </div>
        </div>
      </div>
      <div>
        <FormLabel required>Chi tiết</FormLabel>
        <Form.Item
          name="detail"
          label=""
          rules={[
            {
              validator: (rule, value) => validateField(rule, value),
            },
          ]}>
          <TextArea maxLength={1000} showCount placeholder="Nhập chi tiết" autoSize={{ minRows: 3, maxRows: 5 }} />
        </Form.Item>
      </div>
    </div>
  );
});
