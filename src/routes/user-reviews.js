import React, { useState } from "react";
import {
  Box,
  Grid,
  Button,
  Paper,
  IconButton,
  Typography,
  Container,
  Menu,
  MenuItem,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import ModalRender from "../components/modal-render";
import ReviewModal from "../components/modal/review-modal";
import useModal from "../hooks/useModal";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const options = ["Edit", "Delete"];

export default function UserReviews() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { userReviews } = useSelector((state) => state.review);
  const { openModal, handleOpenModal, handleCloseModal, modalIndex } =
    useModal();

  // State variables for menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  // Functions to handle menu actions
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    handleClose();
    // Additional logic can be added here based on the selected option
    if (option === "Edit") {
        handleOpenModal()
      // Handle edit action
      // Example: handleEdit(review);
      // You can pass the review data to the edit modal using state or props
    } else if (option === "Delete") {
      // Handle delete action
      // Example: handleDelete(review.id);
    }
  };

  return (
    <Container maxWidth="xl">
      {userReviews?.map((review, index) => (
        <Paper elevation={3} sx={{ mb: 4, position: "relative" }} key={index}>
          <Box p={"15px"}>
            <IconButton
              onClick={handleClick}
              sx={{ position: "absolute", top: "8px", right: "8px" }}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {options.map((option) => (
                <MenuItem
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
            <Grid container ml={"-8px"}>
              <Grid item>
                <IconButton>
                  <Avatar
                    alt="user-profile"
                    src=""
                    sx={{ width: 47, height: 47 }}
                  />
                </IconButton>
              </Grid>
              <Grid item>
                <Box display={"flex"} flexDirection={"column"}>
                  <Typography fontWeight={"bold"} fontSize={"20px"}>
                    {review.title}
                  </Typography>
                  <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                    <Typography>Written by user on date</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Box>
              <Typography component={"p"} mt={"10px"}>
                {review.content}
              </Typography>
            </Box>
          </Box>
        </Paper>
      ))}
      <ModalRender
        isOpen={openModal}
        handleClose={handleCloseModal}
        Component={ReviewModal}
        modalProps={{
          movieId: modalIndex,
          handleCloseModal,
        }}
      />
    </Container>
  );
}
