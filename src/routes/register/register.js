import React, { useState } from "react";
import "./register.css";

import { Form, Formik, Field } from "formik";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../../store/auth/auth.actions";

import * as Yup from "yup";

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
    email: Yup.string()
      .email()
      .required(),
  });

  return (
    <main className="register-page">
      <section className="picture-container">
        <img
          src={process.env.PUBLIC_URL + "/images/auth.jpg"}
          alt="decoration"
        />
      </section>
      <section className="register-section">
        <section className="register-title">
          <h1>Register</h1>
          <h3>Register for CMUniversity</h3>
        </section>
        <Formik
          initialValues={{ username: "", password: "", email: "" }}
          validationSchema={validationSchema}
          initialErrors={{ email: "" }}
          onSubmit={handleRegister}
        >
          {({ isValid }) => (
            <Form className="register-form">
              <Field
                as={TextField}
                id = "username"
                type="text"
                label="Username"
                name="username"
                className="form-group"
                required
              />
              <Field
                as={TextField}
                id = "password"
                type={showPassword ? "text" : "password"}
                label="Password"
                name="password"
                className="form-group"
                InputProps={{
                  autoComplete: "new-password", // Disable autofill for password field
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} className = "input-button">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />
              <Field
                as={TextField}
                type="email"
                label="Email"
                name="email"
                required
                className="form-group"
              />
              <Button
                type="submit"
                variant="contained"
                className="submitButton"
                disabled={!isValid}
              >
                Sign Up
              </Button>
              <section className="social-register">
                <p>Or sign up using: </p>
                <Button
                  type="button"
                  variant="contained"
                  className="googleButton"
                >
                  <img
                    src={process.env.PUBLIC_URL + "/images/google.png"}
                    alt="Sign up with Google"
                  />
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  className="facebookButton"
                >
                  <img
                    src={process.env.PUBLIC_URL + "/images/facebook.png"}
                    alt="Sign up with Facebook"
                  />
                </Button>
              </section>
              <span className="credentials">
                Already have an account?&nbsp;
                <Link to="/login" className="active">
                  Log in
                </Link>
              </span>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
}
