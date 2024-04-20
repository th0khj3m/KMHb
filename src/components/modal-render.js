import React from "react";
import { Modal } from "@mui/material";

const ModalRender = React.forwardRef((props, ref) => (
  <Modal open={props.isOpen} onClose={props.handleClose}>
    <props.Component {...props.modalProps} ref={ref} />
  </Modal>
));

export default ModalRender;
