import React, { createContext, useReducer, useContext, useState } from 'react';

import { Action, ModalState, ModalType, modalReducer } from './modal-reducer';

export interface DefaultOption {
  value: string;
  label: string;
}

interface ModalContextType {
  modal: ModalState;
  dispatch: React.Dispatch<Action>;
  recently: DefaultOption[];
  setRecently: React.Dispatch<React.SetStateAction<DefaultOption[]>>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recently, setRecently] = useState<DefaultOption[]>([]);
  const [modal, dispatch] = useReducer(modalReducer, {
    vehicle: {
      open: false,
      onClose: () => dispatch({ type: ModalType.VEHICLE, payload: { ...modal.vehicle, open: false } }),
    },
    location: {
      open: false,
      onClose: () => dispatch({ type: ModalType.LOCATION, payload: { ...modal.location, open: false } }),
    },
    supplies: {
      open: false,
      onClose: () => dispatch({ type: ModalType.SUPPLIES, payload: { ...modal.supplies, open: false } }),
    },
  });

  return <ModalContext.Provider value={{ modal, dispatch, recently, setRecently }}>{children}</ModalContext.Provider>;
};

const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export { ModalProvider, useModal };
