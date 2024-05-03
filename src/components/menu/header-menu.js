import React from "react";
import { MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StyledMenu } from "../../routes/root";

export default function HeaderMenu({ anchorEl, open, handleClose }) {
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
      <MenuItem onClick={() => navigate("/menu/movies")}>Movies</MenuItem>
      <MenuItem onClick={() => navigate("/menu/casts")}>Casts</MenuItem>
    </StyledMenu>
  );
}
