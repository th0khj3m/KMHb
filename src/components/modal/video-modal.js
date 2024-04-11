import React from "react";
import { Modal, Button, Box, CardMedia } from "@mui/material";

const VideoModal = ({ open, handleClose, videoKey, videoName }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      // slots={{ backdrop: (props) => <Backdrop {...props} onClick={() => {}} /> }} //Prevent user from clicking outside to close
    >
      <Box
        display={"flex"}
        position={"relative"}
        pt="50px"
        borderRadius={"10px"}
        bgcolor={"black"}
        width={"60%"}
        height={"80%"}
      >
        <Button
          onClick={handleClose}
          variant="contained"
          sx={{
            position: "absolute",
            top: "8px",
            right: "10px",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            color: "white",
            "&:hover": {
              backgroundColor: "#141414", // Apply hover effect
            },
          }}
        >
          X Close
        </Button>
        {videoKey && (
          <CardMedia
            component={"iframe"}
            src={`https://www.youtube.com/embed/${videoKey}`}
            alt={`${videoName}`}
            title={videoName}
            allowFullScreen
          />
        )}
      </Box>
    </Modal>
  );
};

export default VideoModal;
