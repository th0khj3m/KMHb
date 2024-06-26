import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import {
  TextField,
  Alert,
  Grid,
  Box,
  Typography,
  Container,
  FormControl,
} from "@mui/material";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";

import { AuthButton, Img } from "./root";
import { checkLoginStatus, loginUser } from "../store/auth/auth.actions";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleLogin = async (credentials, { setSubmitting }) => {
    try {
      // Set submitting state to true to indicate form submission is in progress
      setSubmitting(true);
      setError("");
      await dispatch(loginUser(credentials)).unwrap();
      await dispatch(checkLoginStatus());
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      // Set submitting state to false after login attempt is completed (whether success or failure)
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
  });

  return (
    <Grid container>
      <Grid item md={5}>
        <Box>
          <Img
            src={process.env.PUBLIC_URL + "/images/login_background.jpg"}
            alt="decoration"
            sx={{ m: "0" }}
          />
        </Box>
      </Grid>
      <Grid item md={7} display={"flex"} alignItems={"center"}>
        <Container maxWidth="sm">
          <Box mb={3}>
            <Typography variant="h3" component={"h1"} color={"main"}>
              Login
            </Typography>
            <Typography variant="h6" component={"h2"} color={"#666666"}>
              Log into KMHb
            </Typography>
          </Box>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}
            initialErrors={{ username: "" }}
            onSubmit={handleLogin}
          >
            {({ isValid }) => (
              <Form>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Field
                    as={TextField}
                    type="text"
                    label="Username"
                    name="username"
                    required
                  />
                </FormControl>
                <FormControl fullWidth>
                  <Field
                    as={TextField}
                    type="password"
                    label="Password"
                    name="password"
                    required
                  />
                </FormControl>

                {error && (
                  <Alert severity="error" sx={{ mr: "auto", mt: 3 }}>
                    {error}
                  </Alert>
                )}
                <Link to="/forgot-password/new">
                  <Typography
                    mr="auto"
                    py={3}
                    color={"main"}
                    fontWeight={"bold"}
                  >
                    I forgot my password{" "}
                  </Typography>
                </Link>

                <AuthButton
                  type="submit"
                  variant="contained"
                  disabled={!isValid}
                >
                  Log In
                </AuthButton>
                <Typography mr={"auto"} py={2}>
                  Not a member yet?&nbsp;
                  <Link to="/register" style={{ textDecoration: "none" }}>
                    <Typography component={"span"} color={"main"}>
                      Sign Up Now
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
