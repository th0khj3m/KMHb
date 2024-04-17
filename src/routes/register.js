import React, { useState } from "react";
// import "./register.css";

import { Form, Formik, Field } from "formik";
import {
  TextField,
  IconButton,
  InputAdornment,
  Container,
  Grid,
  Box,
  Typography,
  FormControl,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../store/auth/auth.actions.js";

import * as Yup from "yup";
import { AuthButton, Img, MediaLoginButton } from "./root.js";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (credentials, { setSubmitting, resetForm }) => {
    try {
      // Set submitting state to true to indicate form submission is in progress
      setSubmitting(true);
      navigate("/login");
      await dispatch(registerUser(credentials)).unwrap();
      // Reset the form after successful registration
      resetForm();
    } catch (err) {
    } finally {
      // Set submitting state to false after register attempt is completed (whether success or failure)
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
    email: Yup.string().email().required(),
  });

  return (
    <Grid container>
      <Grid item md={5}>
        <Box>
          <Img
            src={process.env.PUBLIC_URL + "/images/login_background.jpg"}
            alt="decoration"
          />
        </Box>
      </Grid>
      <Grid item md={7} display="flex" alignItems="center">
        <Container maxWidth="sm">
          <Box mb={3}>
            <Typography variant="h3" component={"h2"} color={"main"}>
              {" "}
              Register{" "}
            </Typography>
            <Typography variant="h6" component={"h2"} color={"#666666"}>
              Register for KMHb
            </Typography>
          </Box>
          <Formik
            initialValues={{ username: "", password: "", email: "" }}
            validationSchema={validationSchema}
            initialErrors={{ email: "" }}
            onSubmit={handleRegister}
          >
            {({ isValid }) => (
              <Form>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Field
                    as={TextField}
                    id="username"
                    type="text"
                    label="Username"
                    name="username"
                    required
                  />
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  {" "}
                  <Field
                    as={TextField}
                    type="email"
                    label="Email"
                    name="email"
                    required
                  />
                </FormControl>
                <FormControl fullWidth>
                  <Field
                    as={TextField}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    name="password"
                    InputProps={{
                      autoComplete: "new-password", // Disable autofill for password field
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePassword}
                            sx={{
                              position: "absolute",
                              top: "50%" /*Position the button in the middle vertically*/,
                              right: "15px",
                              color: "#666666",
                              transform:
                                "translateY(-50%)" /* Center the button vertically */,
                              backgroundColor:
                                "transparent" /* Make the button background transparent */,
                              border: "none",
                              cursor: "pointer",
                              width: "auto",
                              padding: 0 /* Remove padding */,
                              margin: 0 /* Remove margin */,
                            }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    required
                  />
                </FormControl>

                <AuthButton
                  type="submit"
                  variant="contained"
                  disabled={!isValid}
                  sx={{ mt: 3 }}
                >
                  Sign Up
                </AuthButton>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  gap={"10px"}
                  mt={3}
                >
                  <Typography>Or sign up using: </Typography>
                  <Box display="inline-flex" gap="10px">
                    <MediaLoginButton type="button" variant="contained">
                      <Img
                        src={process.env.PUBLIC_URL + "/images/google.png"}
                        alt="Sign up with Google"
                      />
                    </MediaLoginButton>
                    <MediaLoginButton type="button" variant="contained">
                      <Img
                        src={process.env.PUBLIC_URL + "/images/facebook.png"}
                        alt="Sign up with Facebook"
                      />
                    </MediaLoginButton>
                  </Box>
                </Box>

                <Typography mr={"auto"} py={2}>
                  Already have an account?&nbsp;
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <Typography component={"span"} color={"main"}>
                      Log In
                    </Typography>
                  </Link>
                </Typography>
              </Form>
            )}
          </Formik>
        </Container>
      </Grid>
    </Grid>
  );
}