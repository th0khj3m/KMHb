import React from "react";
import {
  Container,
  Typography,
  Divider,
  Grid,
  Box,
  Rating,
  Paper,
  Button,
  FormControl,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  Stack,
} from "@mui/material";
import { Error as ErrorIcon } from "@mui/icons-material";

import { Form, Formik, Field } from "formik";
import * as Yup from "yup";

import { Img, ModalContainer } from "../../routes/root";

const testMovies = [
  {
    adult: false,
    backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    genre_ids: [878, 12],
    id: 693134,
    original_language: "en",
    original_title: "Dune: Part Two",
    overview:
      "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
    popularity: 4651.845,
    poster_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    release_date: "2024-02-27",
    title: "Dune: Part Two",
    video: false,
    vote_average: 8.317,
    vote_count: 2670,
  },
];

export default function ReviewModal({ isOpen, handleClose, modalMovieIndex }) {
  const validationSchema = Yup.object().shape({
    headline: Yup.string().required("Headline is required."),
    content: Yup.string()
      .required("Review is required")
      .when("submit", {
        is: true,
        then: Yup.string().min(
          600,
          "Sorry, your review is too short. It needs to contain at least 600 characters"
        ),
      }),
  });

  const ErrorDisplay = ({ error, touched }) => {
    return error && touched ? (
      <FormHelperText>
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
    <ModalContainer maxWidth="sm" >
      <Paper elevation={4} sx={{ borderRadius: "10px", p: "15px" }}>
        <Stack sx={{ bgcolor: "#f3f3f3" }} divider={<Divider />}>
          <Grid container>
            <Grid item md={2}>
              <Img
                src={`https://image.tmdb.org/t/p/w500${testMovies[0].poster_path}`}
                width={"80%"}
              />
            </Grid>
            <Grid item md={10} p={"15px"}>
              <Stack direction={"column"} divider={<Divider />} spacing={1}>
                <Typography variant="h6">Dune: Part Two (2024)</Typography>
                <Typography variant="h5" component={"h1"}>
                  Add an Item
                </Typography>
              </Stack>
            </Grid>
          </Grid>
          <Typography p={"5px"}>YOUR RATING</Typography>
        </Stack>
        <Rating
          name="rating"
          max={10}
          precision={1}
          size="large"
          // onChange={handleRating}
          sx={{ marginBottom: "15px", color: "main" }}
        />
        <Box display={"flex"} flexDirection={"column"} >
          <Typography bgcolor={"#f3f3f3"}>YOUR REVIEW</Typography>
          <Formik
            initialValues={{
              headline: "",
              review: "",
            }}
            validationSchema={validationSchema}
          >
            {({ errors, touched }) => (
              <Form>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Field
                    as={OutlinedInput}
                    id="headline"
                    name="headline"
                    placeholder="Write a headline for your review here"
                    required
                  />
                  <ErrorDisplay
                    error={errors.headline}
                    touched={touched.headline}
                    id="headline-helper-text"
                  />
                </FormControl>

                <FormControl fullWidth>
                  <Field
                    as={OutlinedInput}
                    id="content"
                    name="content"
                    multiline
                    rows={4}
                    placeholder="Write your review here"
                    required
                  />

                  <ErrorDisplay
                    error={errors.content}
                    touched={touched.content}
                    id="content-helper-text"
                  />
                </FormControl>
                <Button type="submit" fullWidth>
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </ModalContainer>
  );
}
