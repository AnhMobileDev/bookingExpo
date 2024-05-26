import React, { memo, useMemo, useState, useEffect, useCallback } from 'react';
import { Radio, Spin } from 'antd';

import { ModalCustomize } from '../../../components/modal-customize';
import { useMaintenanceAccessoriesQuery } from '../../../graphql/queries/maintenanceAccessories.generated';
import { MaintenanceAccessory, MaintenanceAccessoryInput } from '../../../graphql/type.interface';

interface SuppliesModalProps {
  open: boolean;
  onClose: () => void;
  onFinish: (values: (MaintenanceAccessoryInput & MaintenanceAccessory)[]) => void;
  routineLevel?: number;
}

const SuppliesModal = memo(({ open, onClose, onFinish, routineLevel = 1 }: SuppliesModalProps) => {
  const { data, loading } = useMaintenanceAccessoriesQuery({
    variables: {
      routineLevel,
    },
  });
  const supplies = useMemo(() => data?.maintenanceAccessories, [data?.maintenanceAccessories]);
  const [accessories, setAccessories] = useState<(MaintenanceAccessoryInput & MaintenanceAccessory)[]>();
  useEffect(() => {
    if (supplies) {
      setAccessories(supplies.map((el) => ({ ...el, isAvailable: !el.quantity })));
    }
  }, [supplies]);
  const handleRadioChange = useCallback(
    (index: number, value: boolean) => {
      if (accessories) {
        const newItems = [...accessories];
        newItems[index].isAvailable = value;
        setAccessories(newItems);
      }
    },
    [accessories],
  );
  return (
    <Spin spinning={loading}>
      <ModalCustomize
        title={`Vật tư bảo dưỡng ${routineLevel ? `định kỳ lần ${routineLevel}` : 'phát sinh'} `}
        open={open}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ disabled: !accessories }}
        onOk={() => {
          if (accessories) {
            onFinish(accessories);
            onClose();
          }
        }}
        className="h-80vh"
        bodyStyle={{
          maxHeight: 'calc(80vh - 100px)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
        {accessories?.map((accessory, index) => (
          <div key={accessory.id} className="border-accessory">
            <p className="flex justify-between px-4 py-3 bg-[#F9F9F9]">
              <span className="font-medium">
                {index + 1}. {accessory.name}
              </span>
              <span className="text-sm">
                x{accessory.quantity} {accessory.unit}
              </span>
            </p>
            <Radio.Group
              className="p-4"
              value={accessory.isAvailable}
              onChange={(e) => handleRadioChange(index, e.target.value)}>
              <Radio value={false}>Không có sẵn</Radio>
              <Radio value={true}>Có sẵn</Radio>
            </Radio.Group>
          </div>
        ))}
      </ModalCustomize>
    </Spin>
  );
});

export default SuppliesModal;
