import { Button, ButtonProps, Modal } from 'antd';
import React, { memo, PropsWithChildren, ReactNode, useCallback, useContext, useRef, useState } from 'react';

type ContextState = {
  title: ReactNode;
  message: ReactNode;
  cancelButtonProps?: ButtonProps;
  confirmButtonProps?: ButtonProps;
  onConfirmFinish?: () => Promise<any> | void;
  onCancelFinish?: () => Promise<any> | void;
  hiddenFooter?: boolean;
  type: 'ALERT' | 'CONFIRM';
};

type ContextProps = {
  openDialog(options: ContextState): Promise<boolean>;
  resetDiaLog: () => void;
};

const DialogContext = React.createContext<ContextProps>({
  openDialog() {
    throw new Error('Not-ready');
  },
  resetDiaLog() {
    throw new Error('resetDiaLog Not-ready');
  },
});

export const useDialog = () => useContext(DialogContext);

type Props = PropsWithChildren;

export const DialogProvider = memo(({ children }: Props) => {
  const [state, setState] = useState<ContextState | null>();

  const [open, setOpen] = useState(false);

  const modalResolveRef = useRef<(status: boolean) => void>();

  const handleCancel = useCallback(async () => {
    if (state?.onCancelFinish) {
      await state?.onCancelFinish();
    }
    modalResolveRef.current?.(false);
    setOpen(false);
    modalResolveRef.current = undefined;
  }, [state]);

  const handleConfirm = useCallback(async () => {
    if (state?.onConfirmFinish) {
      await state?.onConfirmFinish();
    }
    modalResolveRef.current?.(true);
    setOpen(false);
    modalResolveRef.current = undefined;
  }, [state]);

  const handleOpenDiaLog = useCallback((option: ContextState) => {
    setState(option);
    setOpen(true);
    return new Promise<boolean>((resolve) => {
      modalResolveRef.current = resolve;
    });
  }, []);

  const handleResetDiaLog = useCallback(() => {
    setState(null);
    setOpen(false);
    modalResolveRef.current = undefined;
  }, []);

  return (
    <DialogContext.Provider value={{ openDialog: handleOpenDiaLog, resetDiaLog: handleResetDiaLog }}>
      {children}
      <Modal centered open={open} footer={null} closable={false}>
        <div className="text-[20px] font-semibold leading-[28px]">{state?.title}</div>
        <div className="mt-[8px] mb-[8px] text-[14px] font-medium leading-[20px] text-yankees-blue">
          {state?.message}
        </div>

        {!state?.hiddenFooter && (
          <div className="mt-[32px] flex flex-row items-center justify-end">
            <Button
              onClick={() => (state?.type === 'CONFIRM' ? handleCancel() : handleConfirm())}
              type="ghost"
              className="!h-[40px] !text-[13px] !leading-[18px] font-semibold !text-yankees-blue"
              {...state?.cancelButtonProps}>
              {state?.cancelButtonProps?.children ?? 'Hủy'}
            </Button>
            {state?.type === 'CONFIRM' && (
              <Button
                onClick={handleConfirm}
                type="primary"
                className="!h-[40px] !text-[13px] !leading-[18px] font-semibold !text-yankees-blue ml-[16px]"
                {...state?.confirmButtonProps}>
                {state?.confirmButtonProps?.children ?? 'Xác nhận'}
              </Button>
            )}
          </div>
        )}
      </Modal>
    </DialogContext.Provider>
  );
});
