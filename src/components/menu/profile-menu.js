import React from "react";
import { MenuItem, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StyledMenu } from "../../routes/root";

export default function ProfileMenu({
  isAdmin,
  anchorEl,
  open,
  handleClose,
  handleLogout,
}) {
  const navigate = useNavigate();
  return (
    <StyledMenu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {!isAdmin && (
        <>
          <MenuItem onClick={() => navigate("user/watchlist")}>
            Watchlist
          </MenuItem>
          <MenuItem onClick={() => navigate("user/ratings")}>Ratings</MenuItem>
          <MenuItem onClick={() => navigate("user/reviews")}>Reviews</MenuItem>
          <Divider />
        </>
      )}

      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </StyledMenu>
  );
}
