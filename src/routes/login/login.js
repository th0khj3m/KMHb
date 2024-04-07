import React, { useState } from "react";
import "./login.css";

import { Form, Formik, Field } from "formik";
import { TextField, Button, Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../../store/auth/auth.actions";

import * as Yup from "yup";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleLogin = async (credentials, { setSubmitting }) => {
    try {
      // Set submitting state to true to indicate form submission is in progress
      setSubmitting(true);
      await dispatch(loginUser(credentials)).unwrap();
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
    <main className="login-page">
      <section className="picture-container">
        <img
          src={process.env.PUBLIC_URL + "/images/auth.jpg"}
          alt="decoration"
        />
      </section>
      <section className="login-section">
        <section className="login-title">
          <h1>Login</h1>
          <h3>Log into CMUniversity</h3>
        </section>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          initialErrors={{ username: "" }}
          onSubmit={handleLogin}
        >
          {({ isValid }) => (
            <Form className="login-form">
              <Field
                as={TextField}
                type="text"
                label="Username"
                name="username"
                required
                className="form-group"
              />
              <Field
                as={TextField}
                type="password"
                label="Password"
                name="password"
                className="form-group"
                required
              />
              {error && (
                <Alert severity="error" className="error-message">
                  {error}
                </Alert>
              )}
              <span className="credentials">
                Forgot your <span className="active">username</span> or{" "}
                <span className="active">password</span>
              </span>
              <Button
                type="submit"
                variant="contained"
                className="submitButton"
                disabled={!isValid}
              >
                Log In
              </Button>
              <section className="social-login">
                <p>Or log in using: </p>
                <Button
                  type="button"
                  variant="contained"
                  className="googleButton"
                >
                  <img
                    src={process.env.PUBLIC_URL + "/images/google.png"}
                    alt="Sign in with Google"
                  />
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  className="facebookButton"
                >
                  <img
                    src={process.env.PUBLIC_URL + "/images/facebook.png"}
                    alt="Sign in with Facebook"
                  />
                </Button>
              </section>
              <span className="credentials">
                Not a member yet?&nbsp;
                <Link to="/register" className="active">Sign Up Now</Link>
              </span>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
}