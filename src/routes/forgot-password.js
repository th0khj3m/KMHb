import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Container,
  TextField,
  InputLabel,
  Stack,
} from "@mui/material";
import API from "../apis/client";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("auth/forgot-password", { email });
      navigate("/forgot-password/sent");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
      }}
    >
      <Typography variant="h4" gutterBottom mb={4}>
        Request Password Reset
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "60%" }}>
        <InputLabel htmlFor="email">Please enter your email:</InputLabel>
        <Stack textAlign={"center"}>
          <TextField
            id="email"
            type="email"
            label="Enter your email"
            placeholder="Enter your email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Request Password Reset
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default ForgotPasswordForm;
