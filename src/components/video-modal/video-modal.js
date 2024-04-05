import React from "react";
import { Modal, Backdrop, Button } from "@mui/material";
import "./video-modal.css";

const ModalComponent = ({ open, handleClose, videoKey, videoName }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose} // Keep the onClose handle for internal closign
      closeAfterTransition
      className="custom-modal"
      slots={{ backdrop: (props) => <Backdrop {...props} onClick={() => {}} /> }} //
    >
      <div className="modal-container">
        <Button onClick={handleClose} variant="contained">
          X Close
        </Button>
        {videoKey && (
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}`}
            title={videoName}
            allowFullScreen
            className="embedded-video"
          />
        )}
      </div>
    </Modal>
  );
};

export default ModalComponent;
