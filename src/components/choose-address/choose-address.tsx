import { useEffect, useMemo, useState } from 'react';
import { Button, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ModalCustomize } from '../modal-customize';
import { useAddressesQuery } from '../../graphql/queries/addresses.generated';
import { Address } from '../../assets/icon';
import { AddressEntity } from '../../graphql/type.interface';

type Props = {
  open: boolean;
  setOpen?: (value: boolean) => void;
  onCancel: () => void;
  onFinish: (value: AddressEntity) => void;
  defaultAddress?: AddressEntity;
};

export const ChooseAddress = ({ onCancel, open, onFinish, defaultAddress }: Props) => {
  const navigate = useNavigate();
  const { data, loading } = useAddressesQuery();
  const addresses = useMemo(() => data?.addresses, [data]);

  const [addressSelected, setAddressSelected] = useState<AddressEntity>();

  useEffect(() => {
    if (addresses && addresses.length > 0 && !addressSelected) {
      const addressDefault = addresses?.find((it) => it?.isDefault);
      setAddressSelected((addressDefault ?? addresses[0]) as AddressEntity);
    }
  }, [addressSelected, addresses]);

  useEffect(() => {
    setAddressSelected(defaultAddress);
  }, [defaultAddress]);

  return (
    <Spin spinning={loading}>
      <ModalCustomize
        title="Địa chỉ nhận hàng"
        okButtonProps={{
          title: 'Chọn mã giảm giá',
          disabled: !addressSelected,
        }}
        onOk={() => onFinish(addressSelected as AddressEntity)}
        open={open}
        onCancel={onCancel}>
        {addresses && addresses?.length > 0 ? (
          <div className="h-[400px] overflow-x-auto">
            {addresses.map((add) => (
              <div
                className={`border border-solid  rounded flex gap-x-12px p-16px mb-16px hover:cursor-pointer ${
                  addressSelected?.id === add?.id ? 'border-primary' : 'border-grayscale-border'
                }`}
                key={'address' + add?.id}
                onClick={() => setAddressSelected(add)}>
                <div className="basis-1/12 w-[32px] h-[32px] rounded-full bg-primary flex justify-center items-center">
                  <Address fill="#fff" />
                </div>
                <div className="flex-1">
                  <h4 className="line-clamp-1">{add?.addressName}</h4>
                  <p className="text-[13px] text-grayscale-gray line-clamp-1">{add?.mapAddress}</p>
                  {add?.isDefault && <div className="text-primary">Địa chỉ mặc định</div>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <Button type="primary" onClick={() => navigate('/profile?info=address')}>
              Thêm địa chỉ
            </Button>
          </div>
        )}
      </ModalCustomize>
    </Spin>
  );
};
