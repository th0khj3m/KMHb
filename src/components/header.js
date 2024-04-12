import React from "react";
import { Link } from "react-router-dom";
import Search from "./search";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import { BookmarkAdd, Menu } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Img } from "../routes/root";

export default function Header() {
  const MenuItemLink = styled(Link)({
    textDecoration: "none",
    color: "black",
    display: "flex",
    gap: "4px",
    alignItems: "center",
    padding: "10px",
    ":hover": {
      backgroundColor: "#5EC1A2",
      borderRadius: "6px"
    },
  });

  return (
    <Box component="header">
      <AppBar position="static">
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

          <MenuItemLink to="/login">
            <Typography fontWeight={"bold"}>Sign In</Typography>
          </MenuItemLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
