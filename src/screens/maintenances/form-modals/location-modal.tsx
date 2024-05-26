import React, { memo, useState, useMemo } from 'react';
import { Divider, Select, Spin } from 'antd';

import { ModalCustomize } from '../../../components/modal-customize';
import { useAddressesQuery } from '../../../graphql/queries/addresses.generated';
import { ClockIcon } from '../../../assets/icon';
import { AddressEntity } from '../../../graphql/type.interface';

import { useModal } from './modal-context';
import '../styles.less';

interface LocationModalProps {
  open: boolean;
  onClose: () => void;
  onFinish: (value: any) => void;
}

const LocationModal = memo(({ open, onClose, onFinish }: LocationModalProps) => {
  const { recently, setRecently } = useModal();
  const [selected, setSelected] = useState<string | undefined>();

  const handleSubmitSelected = (address: AddressEntity) => {
    setRecently((prevValues) => {
      const option = {
        label: (address.addressName ? `${address.addressName}, ` : '') + address.mapAddress,
        value: address.id,
      };
      if (prevValues.some((el) => el.value === address.id)) {
        const updatedValues = [option, ...prevValues.filter((item) => item.value !== address.id)];
        return updatedValues;
      }

      const updatedValues = [option, ...prevValues.slice(0, 4)];
      return updatedValues;
    });
    onFinish(address);
    onClose();
  };

  const { data, loading } = useAddressesQuery({ variables: {} });

  const addresses = useMemo(() => data?.addresses, [data?.addresses]);

  return (
    <Spin spinning={loading}>
      <ModalCustomize
        title="Vị trí xe"
        open={open}
        onCancel={() => {
          setSelected(recently[0]?.value);
          onClose();
        }}
        okButtonProps={{
          disabled: !selected,
        }}
        onOk={() => {
          const address = addresses?.find((address) => address.id === selected);
          return address && handleSubmitSelected(address);
        }}>
        <Select
          showSearch
          className="w-full slc-none-icon"
          placeholder="Nhập vị trí xe"
          value={selected}
          options={addresses?.map((el) => ({
            label: (el.addressName ? `${el.addressName}, ` : '') + el.mapAddress,
            value: el.id,
          }))}
          filterOption={(input, option) => option?.label?.toLowerCase().includes(input.toLowerCase()) ?? false}
          onChange={(v) => setSelected(v)}
        />
        <div className="px-4 mt-4">
          {recently.length !== 0 && <p className="mb-4 text-grayscale-gray">Địa điểm sử dụng gần đây</p>}
          {recently.map((el, i) => (
            <React.Fragment key={el.value}>
              <p className="flex items-center cursor-pointer" onClick={() => setSelected(el.value)}>
                <span className="mr-3">
                  <ClockIcon />
                </span>
                {el.label}
              </p>
              {i !== recently.length - 1 && <Divider className="my-4" />}
            </React.Fragment>
          ))}
        </div>
      </ModalCustomize>
    </Spin>
  );
});

export default LocationModal;
