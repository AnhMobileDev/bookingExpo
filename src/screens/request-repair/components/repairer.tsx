import { BookingEntity, PartnerEntity } from '../../../graphql/type.interface';
import { User } from '../../../components/colums-table';

type Props = {
  booking?: BookingEntity;
};

export const Repairer = ({ booking }: Props) => {
  return (
    <div className="bg-white p-20px">
      <h2 className="text-16px font-semibold uppercase mb-20px">Kỹ thuật viên</h2>
      <div className="rounded border border-solid border-grayscale-border p-20px">
        {booking?.technician?.id !== booking?.partner?.id ? (
          <>
            {booking?.technician && <User showStar user={booking?.technician as PartnerEntity} />}
            {booking?.technician && <div className="w-full h-1px bg-grayscale-border my-12px"></div>}
            {booking?.partner && <User showStar user={booking?.partner as PartnerEntity} />}
          </>
        ) : (
          <User showStar user={booking?.technician as PartnerEntity} />
        )}
      </div>
    </div>
  );
};
