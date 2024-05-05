import React from "react";
import { Modal } from "@mui/material";

const ModalRender = React.forwardRef(
  (
    props,
    ref //Passing props to child component
  ) => (
    <Modal open={props.isOpen} onClose={props.handleClose}>
      <props.Component {...props.modalProps} ref={ref} />
    </Modal>
  )
);

export default ModalRender;
