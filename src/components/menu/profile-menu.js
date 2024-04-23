import React from "react";
import { MenuItem, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StyledMenu } from "../../routes/root";

export default function ProfileMenu({
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
      // slotProps={{
      //   elevation: 0,
      //   sx: {
      //     overflow: "visible",
      //     filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
      //     mt: 1.5,
      //     "& .MuiAvatar-root": {
      //       width: 32,
      //       height: 32,
      //       ml: -0.5,
      //       mr: 1,
      //     },
      //     "&::before": {
      //       content: '""',
      //       display: "block",
      //       position: "absolute",
      //       top: 0,
      //       right: 14,
      //       width: 10,
      //       height: 10,
      //       bgcolor: "background.paper",
      //       transform: "translateY(-50%) rotate(45deg)",
      //       zIndex: 0,
      //     },
      //   },
      // }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }} 
    >
      <MenuItem onClick={() => navigate("/watchlist")}>Watchlist</MenuItem>
      <MenuItem onClick={() => navigate("/ratings")}>Ratings</MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </StyledMenu>
  );
}
