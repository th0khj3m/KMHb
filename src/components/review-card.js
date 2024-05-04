import React from "react";
import {
  Box,
  Paper,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { sanitize } from "dompurify";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { formatReviewDate } from "../utils/format-date";

const ReviewCard = ({
  key,
  review,
  options,
  handleOptionSelect,
  isUser = false,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const sanitizedContent = sanitize(review.review_content);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper
      key={key}
      elevation={3}
      sx={{ mb: 4, position: "relative", my: "15px" }}
    >
      <Box p={"15px"}>
        {isUser && (
          <>
            <IconButton
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
              }}
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
                  onClick={() => {
                    handleOptionSelect(option, review);
                    handleClose();
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
        <Box display={"flex"} flexDirection={"column"}>
          <Typography fontWeight={"bold"} fontSize={"20px"}>
            {review.review_title}
          </Typography>
          <Box display={"flex"} alignItems={"center"} gap={"10px"}>
            <Typography>
              Written by{" "}
              <Typography variant="span" fontWeight={"bold"} mr={0.6}>
                {review.user_username}
              </Typography>
              on {formatReviewDate(review.review_date)}
            </Typography>
          </Box>
        </Box>
        <Box mt={2}>
          <Typography
            component="div"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default ReviewCard;
