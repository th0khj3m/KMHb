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

import { Img, ModalStyle } from "../../routes/root";
import { useDispatch, useSelector } from "react-redux";
import { addReview, updateReview } from "../../store/review/review.actions";
import { fetchMovieDetails } from "../../store/movie/movie.actions";

const StyledCKEditorContainer = styled.div`
  .ck-editor__editable_inline:not(.ck-comment__input *) {
    height: 200px;
    overflow-y: auto;
  }
`;

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
  const { movieDetails } = useSelector((state) => state.movie); // Get movie details from Redux state

  // Function to fetch movie details
  useEffect(() => {
    if (review && review.movie_id) {
      dispatch(fetchMovieDetails(review.movie_id)); // Dispatch action to fetch movie details
    } else {
      dispatch(fetchMovieDetails(movieId));
    }
  }, [dispatch, review, movieId]); // Trigger useEffect when review changes

  const isEditMode = !!review; //Convert to boolean (review truthy => !!review will become true)

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
        await dispatch(updateReview({ reviewId: review.id, data: values }));
      } else {
        await dispatch(addReview({ movieId, data: values }));
      }
      setStatus({ success: true });
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
    <>
      {movieDetails && (
        <Paper elevation={4} sx={{ ...ModalStyle, borderRadius: 2 }}>
          <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
            <Formik
              initialValues={
                isEditMode //If is Edit mode then display edit data
                  ? {
                      title: review.title,
                      content: review.content,
                      status: false,
                    }
                  : { title: "", content: "" }
              }
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                status,
                resetForm,
                setStatus,
              }) => (
                <>
                  <Stack divider={<Divider />}>
                    <Grid container>
                      <Grid item md={2}>
                        <Img
                          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                          width={"80%"}
                        />
                      </Grid>
                      <Grid item md={10} p={"15px"}>
                        <Stack
                          direction={"column"}
                          divider={<Divider />}
                          spacing={1}
                        >
                          <Typography variant="h6">
                            {movieDetails.title}&nbsp; (
                            {movieDetails.release_date?.split("-")[0]})
                          </Typography>
                          <Typography variant="h5" component={"h1"}>
                            {status?.success
                              ? "Submission Successful"
                              : isEditMode
                              ? "Edit an Item"
                              : "Add an Item"}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>

                  {!status?.success && (
                    <Typography bgcolor={"#f3f3f3"} p={"5px"}>
                      YOUR REVIEW
                    </Typography>
                  )}

                  <Form>
                    {status?.success ? (
                      <Stack gap={1} mt={1}>
                        <Typography variant="h6">
                          Thank you for contributing to KMHb!
                        </Typography>
                        <Typography variant="body2">
                          The information you have supplied is now being
                          processed by the moderator.
                        </Typography>
                        <Button
                          variant="contained"
                          onClick={() => {
                            handleCloseModal();
                            resetForm();
                            setStatus(null);
                          }}
                          fullWidth
                          sx={{ mt: 2 }}
                        >
                          OK
                        </Button>
                      </Stack>
                    ) : (
                      <>
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
                      </>
                    )}
                  </Form>
                </>
              )}
            </Formik>
          </Box>
        </Paper>
      )}
    </>
  );
}
