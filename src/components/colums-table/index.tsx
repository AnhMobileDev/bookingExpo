import { Avatar, StarYellowIcon } from '../../assets/icon';
import { VehicleEntity, BookingEntity, CategoryEntity } from '../../graphql/type.interface';
import { getNameCategoriesEntity, numberWithDots } from '../../utils';
interface PropsVehicle {
  vehicle: VehicleEntity;
}
interface PropsProblemTexts {
  problemTexts: string[];
}
interface PropsUser {
  user: any;
  showStar?: boolean;
}
interface PropsTransportDistance {
  record: BookingEntity;
}

const Vehicle = ({ vehicle }: PropsVehicle) => {
  return (
    <div className="flex my-auto gap-4">
      <img className="w-[32px] h-[32px] rounded" src={`${vehicle?.avatar?.fullThumbUrl}`} alt="img" />
      <div className="flex flex-col gap-1  ">
        <h2 className="text-base font-medium overflow-hidden h-5 text-ellipsis line-clamp-1">{vehicle?.name}</h2>
        <span className="text-sm text-[#676E72] h-5 overflow-hidden text-ellipsis line-clamp-1">
          {vehicle?.mapAddress}
        </span>
      </div>
    </div>
  );
};

const ProblemTexts = ({ problemTexts }: PropsProblemTexts) => {
  return (
    <span className="text-base font-normal">
      {problemTexts?.map((item: string, index: number) => (
        <span key={index}>
          {item} {index === problemTexts.length - 1 ? '' : ', '}
        </span>
      ))}
    </span>
  );
};

const User = ({ user, showStar = false }: PropsUser) => {
  return (
    <div className="flex items-center gap-4 gap-x-[20px] my-auto">
      <div className="relative">
        <img
          className="w-[32px] h-[32px] object-cover rounded-full"
          src={`${user ? user?.avatar?.fullThumbUrl : <Avatar className="w-[32px] h-[32px]" />}`}
          alt="avatar"
        />
        {showStar && (
          <div className="absolute left-[-7px] bottom-[-16px] flex items-center justify-center p-[4px] gap-x-[6px] bg-white shadow rounded-full">
            <StarYellowIcon />
            <span className="text-grayscale-black font-semibold text-12px">
              {user?.reviewSummary?.starAverage.toFixed(1) ?? 0}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col  ">
        <h2 className="text-base font-medium">{user?.fullname}</h2>
        <span className="text-base text-[#676E72]">{user?.phone || user?.hotline || user?.email}</span>
        <span className="line-clamp-1 text-[#676E72]">
          {getNameCategoriesEntity(user?.qualifications as CategoryEntity[])}
        </span>
      </div>
    </div>
  );
};

const TransportDistance = ({ record }: PropsTransportDistance) => {
  return (
    <div className="flex flex-col  ">
      <h2 className="text-base font-normal">{numberWithDots(record.transportDistance) + ' KM'}</h2>
      <span className="text-base text-[#161d24] h-5 font-semibold ">
        {numberWithDots(record.transportFee) + ' đ'} đ
      </span>
    </div>
  );
};
export { Vehicle, TransportDistance, User, ProblemTexts };
