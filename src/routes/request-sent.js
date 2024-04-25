import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function PasswordRequestSent() {
  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: 1,
          textAlign: "center",
          border: "1px solid #D9D9D9"
        }}
      >
        <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
          Password Reset Sent
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          We just sent a message to the email you provided with a link to reset
          your password. Please check your inbox and follow the instructions in
          the email.
        </Typography>
      </Box>
    </Container>
  );
}
