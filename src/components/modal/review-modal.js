import React, { useEffect } from "react";
import {
  Typography,
  Divider,
  Grid,
  Box,
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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"; // or another CKEditor build
import styled from "styled-components";

import { Img, ModalContainer } from "../../routes/root";
import { useDispatch, useSelector } from "react-redux";
import { addReview, updateReview } from "../../store/review/review.actions";
import { fetchMovieDetails } from "../../store/movie/movie.actions";

const StyledCKEditorContainer = styled.div`
  .ck-editor__editable_inline:not(.ck-comment__input *) {
    height: 200px;
    overflow-y: auto;
  }
`;

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

const editorConfig = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "|",
    "bulletedList",
    "numberedList",
    "|",
    "outdent",
    "indent",
    "|",
    "blockQuote",
  ],
};

export default function ReviewModal({ movieId, review, handleCloseModal }) {
  const dispatch = useDispatch();
  const { movieDetails } = useSelector((state) => state.movie.movieDetails); // Get movie details from Redux state

  // Function to fetch movie details
  useEffect(() => {
    if (review && review.review_movie_id) {
      dispatch(fetchMovieDetails(review.review_movie_id)); // Dispatch action to fetch movie details
    }
  }, [dispatch, review]); // Trigger useEffect when review changes

  const isEditMode = !!review; //Convert to boolean

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required."),
    content: Yup.string()
      .required("Review is required")
      .min(
        50,
        "Sorry, your review is too short. It needs to contain at least 50 characters"
      ),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      if (isEditMode) {
        dispatch(updateReview({ reviewId: review.review_id, data: values }));
        setStatus({ success: true }); // Set Formik status for success feedback
      } else {
        dispatch(addReview({ movieId, data: values }));
        setStatus({ success: true }); // Set Formik status for success feedback
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting review:", error);
      setStatus({
        error:
          error.message || "An error occurred while submitting your review.",
      }); // Set Formik status for error feedback
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
    <ModalContainer maxWidth="sm">
      {movieDetails && (
        <Paper elevation={4} sx={{ borderRadius: "10px", p: "15px" }}>
          <Stack sx={{ bgcolor: "#f3f3f3" }} divider={<Divider />}>
            <Grid container>
              <Grid item md={2}>
                <Img
                  src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                  width={"80%"}
                />
              </Grid>
              <Grid item md={10} p={"15px"}>
                <Stack direction={"column"} divider={<Divider />} spacing={1}>
                  <Typography variant="h6">
                    {movieDetails.title}&nbsp; (
                    {movieDetails.release_date.split("-")[0]})
                  </Typography>
                  <Typography variant="h5" component={"h1"}>
                    Add an Item
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
          <Box display={"flex"} mt="10px">
            <Typography ml={"5px"} mt="5px"></Typography>
          </Box>
          <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
            <Typography bgcolor={"#f3f3f3"} p={"5px"}>
              YOUR REVIEW
            </Typography>
            <Formik
              initialValues={
                isEditMode
                  ? {
                      title: review.review_title,
                      content: review.review_content,
                    }
                  : { title: "", content: "" }
              }
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, handleChange }) => (
                <Form>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <Field
                      as={OutlinedInput}
                      id="title"
                      name="title"
                      placeholder="Write a title for your review here"
                      required
                    />
                    <ErrorDisplay
                      error={errors.title}
                      touched={touched.title}
                      id="title-helper-text"
                    />
                  </FormControl>

                  <FormControl fullWidth>
                    <StyledCKEditorContainer>
                      <CKEditor
                        editor={ClassicEditor}
                        data={values.content}
                        value={values.content}
                        id="content"
                        name="content"
                        config={editorConfig}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          handleChange({
                            target: { name: "content", value: data },
                          });
                        }}
                      />
                    </StyledCKEditorContainer>
                    <ErrorDisplay
                      error={errors.content}
                      touched={touched.content}
                      id="content-helper-text"
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    variant="outlined"
                    fullWidth
                    sx={{ mt: "30px" }}
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Paper>
      )}
    </ModalContainer>
  );
}
