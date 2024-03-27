import { Form, Formik, Field } from "formik";
import { TextField, Button } from "@mui/material";
import "./sign-in.css";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const handleLogin = async (values, { setSubmitting }) => {
  try {
  } catch (err) {
    console.error("Login failed:", err.message);
  } finally {
    // Reset the form submission state
    setSubmitting(false);
  }
};

export default function SignIn() {
  return (
    <main className="login-page">
      <section className="picture-container">
        <img
          src={process.env.PUBLIC_URL + "/images/login.jpg"}
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
          {({ errors, touched, isValid }) => (
            <Form className="login-form">
              <Field
                as={TextField}
                type="text"
                label="Username"
                name="username"
                error={touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                required
                className="form-group"
              />
              <Field
                as={TextField}
                type="password"
                label="Password"
                name="password"
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                className="form-group"
                required
              />
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
                Log in
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
                Not a member yet?&nbsp;<span className="active">Sign Up Now</span>{" "}
              </span>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
}
