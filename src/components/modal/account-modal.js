import React from "react";
import {
  Typography,
  Box,
  Paper,
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Error as ErrorIcon } from "@mui/icons-material";

import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addAccount } from "../../store/accounts/account.actions";
import { ModalStyle } from "../../routes/root";

export default function AccountModal({ handleCloseModal }) {
  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = async (credentials, { setSubmitting, setStatus }) => {
    try {
      await dispatch(addAccount(credentials));
      handleCloseModal();
    } catch (error) {
      console.error("Error adding account:", error);
    } finally {
      setSubmitting(false); // Reset submitting state in any case
    }
  };

  const ErrorDisplay = ({ error, touched }) => {
    return error && touched ? (
      <FormHelperText sx={{ mt: "10px" }}>
        <Box display="flex" alignItems="center">
          <InputAdornment position="start">
            <ErrorIcon color="error" />
          </InputAdornment>
          <Typography color="error" fontWeight={"bold"} fontSize={"13px"}>
            {error}
          </Typography>
        </Box>
      </FormHelperText>
    ) : null;
  };

  return (
    <Paper elevation={4} sx={ModalStyle}>
      <Typography variant="h6" fontWeight={"bold"}>
        Add Account
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <FormControl fullWidth>
              <Field
                name="username"
                as={TextField}
                label="Username"
                fullWidth
                margin="normal"
              />
              <ErrorDisplay
                error={errors.username}
                touched={touched.username}
                id="username-helper-text"
              />
            </FormControl>
            <FormControl fullWidth>
              <Field
                name="email"
                as={TextField}
                label="Email"
                fullWidth
                margin="normal"
              />
              <ErrorDisplay
                error={errors.email}
                touched={touched.email}
                id="email-helper-text"
              />
            </FormControl>
            <FormControl fullWidth>
              <Field
                name="password"
                type="password"
                as={TextField}
                label="Password"
                fullWidth
                margin="normal"
              />
              <ErrorDisplay
                error={errors.password}
                touched={touched.password}
                id="email-helper-text"
              />
            </FormControl>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{ mt: 3 }}
            >
              Add
            </Button>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}
