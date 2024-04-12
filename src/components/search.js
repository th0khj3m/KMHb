import React from "react";

import { Box, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Search() {
  return (
    <Box
      component={"form"}
      bgcolor={"white"}
      display={"flex"}
      alignItems={"center"}
      borderRadius={"6px"}
      height={"35px"}
    >
      <InputBase placeholder="Search KMHb" sx={{ml: 1, flex: 1}} />
      <IconButton>
        <SearchIcon />
      </IconButton>
    </Box>
  );
}
