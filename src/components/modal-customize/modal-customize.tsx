import React from 'react';
import { Modal, ModalProps } from 'antd';

import { DefaultPropModal } from '../../helpers/modal';

type Props = {
  title: ModalProps['title'];
  open: ModalProps['open'];
  onCancel?: () => void;
  onOk?: () => void;
  children?: React.ReactNode;
  okText?: ModalProps['okText'];
  footer?: ModalProps['footer'];
} & ModalProps;
export const ModalCustomize = (props: Props) => {
  return (
    <Modal
      {...DefaultPropModal}
      {...props}
      zIndex={100}
      title={<span className="font-semibold text-20px">{props.title}</span>}>
      {props.children}
    </Modal>
  );
};
