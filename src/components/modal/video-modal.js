import React from "react";
import { Button, Box, Stack } from "@mui/material";
import { ModalStyle } from "../../routes/root";

const VideoModal = ({ videoKey, videoName, handleCloseModal }) => {
  return (
    <Stack
      sx={ModalStyle}
      width={"60%"}
      height={"80%"}
      bgcolor={"black"}
      spacing={3}
    >
      <Button
        onClick={handleCloseModal}
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
        <Box
          component={"iframe"}
          src={`https://www.youtube.com/embed/${videoKey}`}
          alt={`${videoName}`}
          title={videoName}
          allowFullScreen
          width={"100%"}
          height={"100%"}
        />
      )}
    </Stack>
  );
};

export default VideoModal;
