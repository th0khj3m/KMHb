import React, { useState } from "react";
import API from "../apis/client";
import { useParams } from "react-router-dom";
import { TextField, Typography, Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newPassword !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      await API.post(`/auth/reset-password/${token}`, { newPassword });
      navigate("/login");
    } catch (error) {
      console.log(error);
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
          required
          error={error !== ""}
          helperText={error}
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
  );
};

export default ResetPasswordPage;
