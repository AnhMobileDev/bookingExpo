import { memo, useCallback, useMemo, useState } from 'react';
import { Input, Radio, Spin } from 'antd';

import { VehiclesQueryVariables, useVehiclesQuery } from '../../../../graphql/queries/vehicles.generated';
import { FileType, StatusEnum, VehicleEntity } from '../../../../graphql/type.interface';
import { ModalCustomize } from '../../../../components/modal-customize';
import { RenderImage } from '../../../../components';
import { FormChooseVehicle } from '../../type';

type Props = {
  open: boolean;
  onClose: () => void;
  onFinish: (values: FormChooseVehicle) => void;
  vehicleId?: string;
};

export const ChooseVehicle = memo(({ onClose, onFinish, vehicleId, ...props }: Props) => {
  const [filter, setFilter] = useState<VehiclesQueryVariables>({
    limit: 1000,
    page: 1,
    isActive: StatusEnum.ACTIVE,
    search: '',
    excludeActiveBooking: true,
  });
  const { data, loading } = useVehiclesQuery({
    variables: filter,
  });
  const vehicles = useMemo(() => data?.vehicles?.items ?? [], [data]);

  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(vehicleId ?? null);

  const handleSearch = useCallback(
    (search: string) => {
      setFilter({ ...filter, search: search, page: 1 });
    },
    [filter],
  );

  return (
    <Spin spinning={loading}>
      <ModalCustomize
        title="Chọn xe gặp sự cố"
        onCancel={onClose}
        {...props}
        okButtonProps={{
          disabled: !selectedVehicleId,
        }}
        onOk={() => {
          const vehicle = vehicles?.find((it) => it?.id === selectedVehicleId);
          onFinish({
            id: selectedVehicleId ?? '',
            vehicle: vehicle as VehicleEntity,
          });
        }}>
        <Input className="w-full" placeholder="Nhập tên xe" onChange={(e) => handleSearch(e?.target?.value)} />
        <div className="h-[380px] overflow-y-auto mt-20px">
          {vehicles &&
            vehicles.length > 0 &&
            vehicles?.map((v) => (
              <div
                key={v?.id}
                className="p-16px my-12px rounded border border-solid border-grayscale-border flex justify-between items-center gap-x-16px hover:cursor-pointer"
                onClick={() => setSelectedVehicleId(v?.id)}>
                <div className="flex items-center gap-x-16px">
                  <RenderImage
                    fileType={FileType.IMAGE}
                    key={v?.id}
                    fullOriginalUrl={v?.avatar?.fullOriginalUrl ?? ''}
                    fullThumbUrl={v?.avatar?.fullThumbUrl ?? ''}
                    size={72}
                  />
                  <div>
                    <p className="line-clamp-1">{v?.name}</p>
                    <p className="text-grayscale-gray">
                      {v?.vinNumber} -{v?.yearOfManufacture ?? ''} -{v?.vehicleRegistrationPlate ?? ''}
                    </p>
                  </div>
                </div>
                <Radio checked={v?.id === selectedVehicleId} />
              </div>
            ))}
        </div>
      </ModalCustomize>
    </Spin>
  );
});
