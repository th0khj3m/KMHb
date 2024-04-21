import React, { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./search";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  LinearProgress,
  Button,
} from "@mui/material";
import { BookmarkAdd, Menu, AccountCircle } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Img } from "../routes/root";
import { useSelector, useDispatch } from "react-redux";
import ProfileMenu from "./profile-menu";
import { logoutUser } from "../store/auth/auth.actions";
import useCombinedLoadingState from "../hooks/useCombinedLoadingState";

export default function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const loadingStateSlices = ["movies", "movie", "cast", "watchlist", "rating"]; // List of loading state slices
  const isLoading = useCombinedLoadingState(loadingStateSlices);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const MenuItemLink = styled(Link)({
    textDecoration: "none",
    color: "black",
    display: "flex",
    gap: "4px",
    alignItems: "center",
    padding: "10px",
    ":hover": {
      backgroundColor: "#5EC1A2",
      borderRadius: "6px",
    },
  });

  return (
    <Box component="header" mt={8}>
      <AppBar position="fixed">
        {isLoading && (
          <Box
            sx={{
              width: "100%",
            }}
          >
            <LinearProgress color="success" />
          </Box>
        )}
        <Toolbar
          sx={{
            display: "flex",
            backgroundColor: "#41A58D",
            padding: "5px",
            gap: "20px",
          }}
        >
          <IconButton
            edge="start"
            aria-label="menu"
            sx={{
              width: "10%",
              "&:hover": { bgcolor: "transparent" },
              borderRadius: 0,
            }}
          >
            <Link to="/">
              <Img
                src={process.env.PUBLIC_URL + "/images/logo.png"}
                alt="Website Logo"
              />
            </Link>
          </IconButton>

          <MenuItemLink to="/menu">
            <Menu />
            <Typography fontWeight={"bold"}>Menu</Typography>
          </MenuItemLink>

          <Box flexGrow={1}>
            <Search />
          </Box>

          <MenuItemLink to="/watchlist">
            <BookmarkAdd />
            <Typography fontWeight={"bold"}>Watchlist</Typography>
          </MenuItemLink>
          {isAuthenticated ? (
            <>
              <Button
                sx={{
                  textTransform: "none",
                  display: "flex",
                  gap: "4px",
                  alignItems: "center",
                  padding: "10px",
                  ":hover": {
                    backgroundColor: "#5EC1A2",
                    borderRadius: "6px",
                  },
                }}
                color="inherit"
                onClick={handleClick}
              >
                <AccountCircle color="secondary" />
                <Typography color={"black"} fontWeight={"bold"} ml={1} sx={{}}>
                  {user.username}
                </Typography>
              </Button>
              <ProfileMenu
                anchorEl={anchorEl}
                open={open}
                handleClose={handleClose}
                handleLogout={handleLogout}
              />
            </>
          ) : (
            <MenuItemLink to="/login">
              <Typography fontWeight={"bold"}>Sign In</Typography>
            </MenuItemLink>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
