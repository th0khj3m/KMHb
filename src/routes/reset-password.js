import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Typography,
  Container,
  Button,
  CircularProgress,
} from "@mui/material";
import API from "../apis/client";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (newPassword !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      await API.post(`/auth/reset-password/${token}`, { newPassword });
      setLoading(false);
      navigate("/login");
    } catch (err) {
      setError(err.response.data.message); // Set error message state
    }
  };

  return (
    <>
      {loading ? (
        <>
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
        </>
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
            Reset Password
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: "60%" }}>
            <TextField
              id="password"
              type="password"
              label="Enter new password"
              variant="outlined"
              fullWidth
              margin="normal"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <TextField
              id="confirm-password"
              type="password"
              label="Confirm new password"
              fullWidth
              margin="normal"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => setError("")}
              error={error ?? ""}
              helperText={error}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Reset Password
            </Button>
          </form>
        </Container>
      )}
    </>
  );
};

export default ResetPasswordPage;
