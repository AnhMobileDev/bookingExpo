import { Dispatch, SetStateAction, useState } from 'react';
import { Form, Input, Select, SelectProps, Switch } from 'antd';

import { useSearchPlacesAutocompleteLazyQuery } from '../../../graphql/queries/searchPlacesAutocomplete.generated';
import { useGetPlaceDetailLazyQuery } from '../../../graphql/queries/getPlaceDetail.generated';
import { CreateAddressInput } from '../../../graphql/type.interface';
import { validationMessages } from '../../../helpers';
import { REGEX_PHONE } from '../../../constants/regex';

import '../style.less';

type Address = { latitude: number; longitude: number; mapAddress: string; addressName: string };

interface Props {
  setAddressMapInfo: Dispatch<SetStateAction<Address | undefined>>;
}

export const BodyModalAddress = ({ setAddressMapInfo }: Props) => {
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const [value, setValue] = useState<any>(undefined);

  const [searchAsync, { loading: searching }] = useSearchPlacesAutocompleteLazyQuery({});

  const [getPlaceAsync, { loading: gettingPlace }] = useGetPlaceDetailLazyQuery({});

  //   select address
  const handleChange = async (place_id: string, options: any) => {
    setValue(options?.lable);
    const data = await getPlaceAsync({ variables: { place_id } });
    const place = data?.data?.getPlaceDetail;
    if (!place) return;
    const { lat, lng, address, name } = place;
    setAddressMapInfo({ longitude: lng, latitude: lat, mapAddress: address, addressName: name });
  };

  //  search address
  const handleSearch = (keyword: string) => {
    if (!keyword) return;

    setTimeout(async () => {
      const rs = await searchAsync({ variables: { input: { keyword } } });
      const data = rs?.data?.searchPlacesAutocomplete;
      setOptions(data?.map((item) => ({ label: item.address, value: item.place_id })));
    }, 800);
  };

  //   validateForm
  const validateField = async (rule: any, value: string, fieldName: keyof CreateAddressInput) => {
    if (value === '' || value === undefined) {
      throw new Error(validationMessages.required);
    }
    if (value == null) {
      throw new Error(validationMessages.required);
    }

    if (fieldName === 'contactPhone') {
      if (!REGEX_PHONE.test(value)) {
        throw new Error(validationMessages.phoneNumber.notValid);
      }
      return Promise.resolve();
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-8">
      <div className="space-y-2">
        <h2 className="text-sm font-medium space-x-2">
          <span className="text-[#D63120]">* </span> Địa chỉ
        </h2>
        <Form.Item
          name="addressName"
          label=""
          rules={[
            {
              validator: (rule, value) => validateField(rule, value, 'addressName'),
            },
          ]}>
          <Select
            className="w-full"
            showSearch
            loading={searching || gettingPlace}
            placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
            maxLength={255}
            value={value}
            defaultActiveFirstOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            filterOption={false}
            options={options}
          />
        </Form.Item>
      </div>
      <div className="space-y-2">
        <h2 className="text-sm font-medium space-x-2">
          <span className="text-[#D63120]">* </span>Chi tiết địa chỉ
        </h2>
        <Form.Item
          name="addressDetail"
          label=""
          rules={[
            {
              validator: (rule, value) => validateField(rule, value, 'addressDetail'),
            },
          ]}>
          <Input placeholder="VD: Tên tòa nhà, địa điểm gần đó..." maxLength={1000} />
        </Form.Item>
      </div>
      <div className="space-y-2">
        <h2 className="text-sm font-medium space-x-2">
          <span className="text-[#D63120]">* </span> Tên người liên hệ
        </h2>
        <Form.Item
          name="contactName"
          label=""
          rules={[
            {
              validator: (rule, value) => validateField(rule, value, 'contactName'),
            },
          ]}>
          <Input placeholder="Nhập tên người liên hệ" maxLength={255}></Input>
        </Form.Item>
      </div>
      <div className="space-y-2">
        <h2 className="text-sm font-medium space-x-2">
          <span className="text-[#D63120]">* </span>Số điện thoại người liên hệ
        </h2>
        <Form.Item
          name="contactPhone"
          label=""
          rules={[
            {
              validator: (rule, value) => validateField(rule, value, 'contactPhone'),
            },
          ]}>
          <Input placeholder="Nhập số điện thoại" maxLength={10}></Input>
        </Form.Item>
      </div>
      <div className="flex justify-between mb-5">
        <h2 className="text-sm font-medium">Đặt làm mặc định</h2>
        <Form.Item name="isDefault" valuePropName="checked" label="">
          <Switch />
        </Form.Item>
      </div>
    </div>
  );
};
