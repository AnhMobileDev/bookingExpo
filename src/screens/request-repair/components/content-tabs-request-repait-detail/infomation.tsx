import { Col, Image, Row } from 'antd';
import { memo } from 'react';

import { BookingEntity } from '../../../../graphql/type.interface';
import { Address } from '../../../../assets/icon';
import { RenderImage } from '../../../../components';
import { Timeline } from '../timeline';
import { Repairer } from '../repairer';
import { DetailExpense } from '../expense';

type Props = {
  booking?: BookingEntity;
};

export const Infomation = memo(({ booking }: Props) => {
  return (
    <div className="m-20px">
      <Row gutter={20}>
        <Col span={16}>
          <div className="bg-white p-20px">
            <h2 className="text-lg font-semibold mb-20px">Xe gặp sự cố</h2>
            <div className="flex gap-x-20px items-center">
              <img
                className="w-[64px] h-[64px] object-cover rounded"
                src={`${booking?.vehicle ? booking.vehicle.avatar?.fullThumbUrl : ''}`}
                alt="xe sự cố"
              />
              <div className="flex flex-col gap-1.5 w-full">
                <h3 className="text-[16px] font-semibold ">{booking?.vehicle.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[#676E72] text-sm">
                    {booking?.vehicle.vinNumber && <span> {booking?.vehicle.vinNumber}</span>}
                  </span>
                  <span className="bg-[#676E72] w-1 h-1 rounded-full"></span>
                  <span className="text-[#676E72] text-sm">
                    {booking?.vehicle.vehicleRegistrationPlate && (
                      <span> {booking?.vehicle.vehicleRegistrationPlate}</span>
                    )}
                  </span>
                  <span className="bg-[#676E72] w-1 h-1 rounded-full"></span>
                  <span className="text-[#676E72] text-sm">
                    {booking?.vehicle.yearOfManufacture && <span> {booking?.vehicle.yearOfManufacture}</span>}
                  </span>
                </div>
                <div className="flex items-center gap-3 py-2 px-3 w-full rounded bg-[#F9F9F9]">
                  <Address fill="#F5B102" />
                  <span className="text-sm font-normal ">{booking?.mapAddress}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-20px mt-20px flex gap-5 flex-col">
            <h2 className="text-16px font-semibold">Hiện tượng hư hỏng</h2>
            <div className="flex gap-2 mb-5">
              {booking?.problems?.map((item) => (
                <span key={item.id} style={{ border: '1px' }} className="border bg-[#EEEEEE] rounded-lg py-1.5 px-3">
                  {item.name}
                </span>
              ))}
            </div>
            <div className="flex items-center flex-wrap gap-8px">
              <Image.PreviewGroup>
                {(booking?.medias ?? []).map((media) => (
                  <RenderImage
                    key={media?.id}
                    fileType={media?.type}
                    fullThumbUrl={media?.fullThumbUrl as string}
                    fullOriginalUrl={media?.fullOriginalUrl as string}
                  />
                ))}
              </Image.PreviewGroup>
            </div>
            {booking?.description && (
              <div className="w-full bg-[#F9F9F9] rounded-md py-3 px-4">{booking?.description}</div>
            )}
          </div>
        </Col>
        <Col span={8}>
          <DetailExpense
            title="Chi phí DỰ kiến"
            expenses={[{ label: 'Phí di chuyển', value: booking?.transportFee ?? 0 }]}
          />
          <div className="mt-20px">
            <Repairer booking={booking} />
          </div>
          <div className="mt-20px">
            <Timeline booking={booking} />
          </div>
        </Col>
      </Row>
    </div>
  );
});
