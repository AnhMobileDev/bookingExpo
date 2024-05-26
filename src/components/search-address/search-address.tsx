import { Select, SelectProps } from 'antd';
import { useState, useEffect, useCallback, memo } from 'react';

import { useSearchPlacesAutocompleteLazyQuery } from '../../graphql/queries/searchPlacesAutocomplete.generated';
import { useGetPlaceDetailLazyQuery } from '../../graphql/queries/getPlaceDetail.generated';
import { STORAGE_KEYS } from '../../constants';
import { showNotification } from '../../utils';
import { getGraphQLErrorMessage } from '../../helpers';
type Address = { latitude: number; longitude: number; mapAddress: string; addressName: string };

interface Props {
  defaultValues?: Address;
  onChange?: (value: Address) => void;
}

export const SearchAddress = memo(({ onChange, defaultValues }: Props) => {
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [, setAddressMapInfo] = useState<Address | undefined>();

  const [value, setValue] = useState<any>(undefined);

  const [searchAsync, { loading: searching }] = useSearchPlacesAutocompleteLazyQuery({});

  const [getPlaceAsync, { loading: gettingPlace }] = useGetPlaceDetailLazyQuery({
    onError(error) {
      showNotification('error', 'Đã có lỗi xảy ra khi chọn vị trí. Vui lòng thử lại', getGraphQLErrorMessage(error));
    },
  });

  const getAddressFromLocalStorage = useCallback(() => {
    const optionsDefault = localStorage.getItem(STORAGE_KEYS.historySearchAddresses);
    const parse = optionsDefault ? JSON.parse(optionsDefault) : undefined;
    return parse ?? [];
  }, []);

  //   select address
  const handleChange = useCallback(
    async (place_id: string, options: any) => {
      setValue(options?.lable);
      const data = await getPlaceAsync({ variables: { place_id } });
      const place = data?.data?.getPlaceDetail;
      if (!place) return;
      const { lat, lng, address, name } = place;
      onChange?.({ longitude: lng, latitude: lat, mapAddress: address, addressName: name });
      setAddressMapInfo({ longitude: lng, latitude: lat, mapAddress: address, addressName: name });
      const newAddressSelected = { label: address, value: place_id };
      const parse = getAddressFromLocalStorage();
      const addresses = [];
      if (parse && parse?.length >= 5) {
        for (let i = 1; i <= 5; i++) {
          if (i <= 4) {
            const element = parse[i];
            if (element && element?.value !== newAddressSelected?.value) {
              addresses.push(element);
            }
          } else {
            addresses?.push(newAddressSelected);
          }
        }
      } else if (parse && parse?.length > 0) {
        for (let i = 0; i <= parse?.length; i++) {
          const element = parse[i];
          if (element && element?.value !== newAddressSelected?.value) {
            addresses.push(element);
          }
        }
        addresses?.push(newAddressSelected);
      } else {
        addresses.push(newAddressSelected);
      }
      localStorage.setItem(STORAGE_KEYS.historySearchAddresses, JSON.stringify(addresses));
    },
    [getAddressFromLocalStorage, getPlaceAsync, onChange],
  );

  //  search address
  const handleSearch = useCallback(
    (keyword: string) => {
      if (!keyword) return;

      setTimeout(async () => {
        const rs = await searchAsync({ variables: { input: { keyword } } });
        const data = rs?.data?.searchPlacesAutocomplete;
        const newOptions = data?.map((item) => ({ label: item.address, value: item.place_id }));
        setOptions(newOptions);
      }, 800);
    },
    [searchAsync],
  );

  useEffect(() => {
    if (defaultValues) {
      const addressInitial = {
        longitude: defaultValues?.latitude as number,
        latitude: defaultValues?.latitude as number,
        mapAddress: defaultValues?.mapAddress as string,
        addressName: defaultValues?.addressName as string,
      };
      setAddressMapInfo({
        ...addressInitial,
      });
      setValue(defaultValues?.addressName);
      onChange?.({
        ...addressInitial,
      });
    }
    // get options from localStorage
    const parse = getAddressFromLocalStorage();
    if (parse && parse?.length > 0) {
      setOptions(parse);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
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
    </div>
  );
});
