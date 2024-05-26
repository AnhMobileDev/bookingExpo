import { CategoryEntity, VehicleEntity } from '../../graphql/type.interface';

export type FormChooseVehicle = {
  id: string;
  vehicle: VehicleEntity;
};

export type FormChooseProblems = {
  ids: string[];
  problems: CategoryEntity[];
};

export type FormChooseRepairer = {
  id: string;
  transportFee: number;
  transportDistance: number;
  transportDuration: number;
};
