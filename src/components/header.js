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
import {
  BookmarkAdd as BookmarkAddIcon,
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon,
  Chat as ChatIcon,
  ManageAccounts as ManageAccountsIcon,
  Dashboard as DashboardIcon,
  Approval as ApprovalIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Img } from "../routes/root";
import { useSelector, useDispatch } from "react-redux";
import ProfileMenu from "./menu/profile-menu";
import { logoutUser } from "../store/auth/auth.actions";
import useCombinedLoadingState from "../hooks/useCombinedLoadingState";
import HeaderMenu from "./menu/header-menu";

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

const MenuButton = styled(Button)({
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

export default function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const isAdmin = user?.role_id === 1; // Assuming `role_id` indicates admin status
  const loadingStateSlices = ["movies", "movie", "cast"]; // List of loading state slices

  if (isAuthenticated) {
    loadingStateSlices.push("watchlist", "review");
  }
  const isLoading = useCombinedLoadingState(loadingStateSlices);

  const [headerMenuAnchorEl, setHeaderMenuAnchorEl] = useState(null);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);

  const handleHeaderMenuClose = () => {
    setHeaderMenuAnchorEl(null);
  };

  const handleHeaderMenuClick = (event) => {
    setHeaderMenuAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

  const handleProfileMenuClick = (event) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Box
      component="header"
      mt={8}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
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
          {!isAdmin && (
            <>
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

              <MenuButton
                startIcon={<MenuIcon />}
                onClick={handleHeaderMenuClick}
              >
                <Typography fontWeight={"bold"} textTransform={"none"}>
                  Menu
                </Typography>
              </MenuButton>
              <HeaderMenu
                anchorEl={headerMenuAnchorEl}
                open={Boolean(headerMenuAnchorEl)}
                handleClose={handleHeaderMenuClose}
              />

              <Box flexGrow={1}>
                <Search />
              </Box>

              <MenuItemLink to="user/watchlist">
                <BookmarkAddIcon />
                <Typography fontWeight={"bold"}>Watchlist</Typography>
              </MenuItemLink>
            </>
          )}

          {isAdmin && (
            <>
              <MenuItemLink to="admin/dashboard">
                <DashboardIcon />
                <Typography fontWeight={"bold"}>Dashboard</Typography>
              </MenuItemLink>

              <MenuItemLink to="admin/accounts">
                <ManageAccountsIcon />
                <Typography fontWeight={"bold"}>Accounts</Typography>
              </MenuItemLink>

              <MenuItemLink to="admin/reviews-approval">
                <ApprovalIcon />
                <Typography fontWeight={"bold"}>Reviews Approval</Typography>
              </MenuItemLink>
            </>
          )}

          <MenuItemLink to="user/chatroom">
            <ChatIcon />
            <Typography fontWeight={"bold"}>Chatroom</Typography>
          </MenuItemLink>

          {isAuthenticated ? (
            <>
              <MenuButton
                color="inherit"
                onClick={handleProfileMenuClick}
                sx={{ marginLeft: "auto" }}
              >
                <AccountCircleIcon color="secondary" />
                <Typography
                  color={"black"}
                  textTransform={"none"}
                  fontWeight={"bold"}
                  ml={1}
                >
                  {user.username}
                </Typography>
              </MenuButton>
              <ProfileMenu
                isAdmin={isAdmin}
                anchorEl={profileMenuAnchorEl}
                open={Boolean(profileMenuAnchorEl)}
                handleClose={handleProfileMenuClose}
                handleLogout={handleLogout}
              />
            </>
          ) : (
            <MenuItemLink to="/login" sx={{ marginLeft: "auto" }}>
              <Typography fontWeight={"bold"}>Sign In</Typography>
            </MenuItemLink>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
