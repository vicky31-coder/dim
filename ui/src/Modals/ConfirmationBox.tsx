import React, { useCallback } from "react";

import ModalBox from "./Index";

import "./ConfirmationBox.scss";

interface Props {
  action: () => void;
  title: string;
  msg: string;
  cancelText: string;
  confirmText: string;
  children?: React.ReactElement;
}

export const ConfirmationBox = (props: Props) => {
  const { action } = props;

  const confirmAction = useCallback(
    (close: any) => {
      close();
      action();
    },
    [action]
  );

  return (
    <ModalBox activatingComponent={props.children as any}>
      {(closeModal: () => void) => (
        <div className="modalConfirmation">
          <h3>{props.title}</h3>
          <div className="separator" />
          <p>{props.msg}</p>
          <div className="options">
            <button className="cancelBtn" onClick={closeModal}>
              {props.cancelText}
            </button>
            <button onClick={() => confirmAction(closeModal)}>
              {props.confirmText}
            </button>
          </div>
        </div>
      )}
    </ModalBox>
  );
};

export default ConfirmationBox;
