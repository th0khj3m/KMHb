import React from "react";
import { Modal, Backdrop, Fade, Button } from "@mui/material";

const VideoModal = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <div></div>
    </Modal>
  );
};

export default VideoModal;
