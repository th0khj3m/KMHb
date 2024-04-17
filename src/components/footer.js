import { Typography, Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component={"footer"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: "20px",
        backgroundColor: "#41A58D",
      }}
    >
      <Typography variant="body2" color="black" align="center">
        KMHB &copy; 2024. All rights reserved.
      </Typography>
    </Box>
  );
}
