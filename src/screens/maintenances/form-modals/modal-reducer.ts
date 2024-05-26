import { Reducer } from 'react';

interface DefaultModalProps {
  open: boolean;
  onClose: () => void;
}

interface SuppliesModalProps extends DefaultModalProps {
  routineLevel?: number;
}

export interface ModalState {
  vehicle: DefaultModalProps;
  location: DefaultModalProps;
  supplies: SuppliesModalProps;
}

export enum ModalType {
  VEHICLE = 'VEHICLE',
  LOCATION = 'LOCATION',
  SUPPLIES = 'SUPPLIES',
}

export type Action = {
  type: ModalType;
  payload: SuppliesModalProps | DefaultModalProps;
};

export const modalReducer: Reducer<ModalState, Action> = (state, action) => {
  switch (action.type) {
    case ModalType.VEHICLE:
      return { ...state, vehicle: action.payload };
    case ModalType.LOCATION:
      return { ...state, location: action.payload };
    case ModalType.SUPPLIES:
      return { ...state, supplies: action.payload };
    default:
      return state;
  }
};
