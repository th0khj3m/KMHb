import React from "react";
import { Modal } from "@mui/material";

export default function ModalRender({
  isOpen,
  handleClose,
  Component,
  modalProps,
}) {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Component {...modalProps} />
    </Modal>
  );
}
