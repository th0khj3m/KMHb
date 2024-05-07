import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Container,
  TextField,
  InputLabel,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";
import API from "../apis/client";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await API.post("auth/forgot-password", { email });
      setLoading(false);
      navigate("/forgot-password/sent");
    } catch (err) {
      setError(err.response.data.message); // Set error message state
    }
  };

  return (
    <>
      {loading ? (
        <Container
          maxWidth="md"
          sx={{
            mt: 3,
            display: "flex",
            alignItems: "center", // Center vertically
            justifyContent: "center", // Center horizontally
            minHeight: "50vh",
          }}
        >
          <CircularProgress />
        </Container>
      ) : (
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
              {error && ( // Render Alert if there's an error
                <Alert severity="error" sx={{ mt: 3 }}>
                  {error}
                </Alert>
              )}
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
      )}
    </>
  );
};

export default ForgotPasswordForm;
