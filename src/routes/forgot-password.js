import React, { useState } from "react";
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
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("auth/forgot-password", { email });
      setMessage("Password reset email sent successfully");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Request Password Reset
      </Typography>
      <form onSubmit={handleSubmit}>
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

      <Typography variant="body1" align="center" gutterBottom>
        {message}
      </Typography>
    </Container>
  );
};

export default ForgotPasswordForm;
