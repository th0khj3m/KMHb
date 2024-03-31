import React from "react";
import "./list-form.css";

import { Form, Formik, Field } from "formik";
import { TextField, Button } from "@mui/material";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { addList } from "../../store/list/list.actions";

import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  listTitle: Yup.string().required("List title is required"),
  listDescription: Yup.string().max(500, "Description must be less than 500"),
});

export default function ListForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, {setSubmitting}) => {
    dispatch(addList(values));
    setSubmitting(false);
    navigate("/lists");
  }

  return (
    <>
    <div className="list-types">
      <h2> Create a new list</h2>
      <p>List your movie, TV & celebrity picks.</p>
      <div className = "line"></div>
    </div>

      <Formik
        initialValues={{ listTitle: "", listDescription: "" }}
        validationSchema={validationSchema}
        onSubmit = {handleSubmit}
        initialErrors={{listTitle: ""}}
      >
        {({ errors, touched, isValid }) => (
          <Form className="create-list">
            <Field
              as={TextField}
              type="text"
              label="List Title"
              name="listTitle"
              error={touched.listTitle && !!errors.listTitle}
              helperText={touched.listTitle && errors.listTitle}
              placeholder="Text"
              required
              className = 'form-group'
            />
            <Field
              as={TextField}
              multiline
              rows = {3}
              label="List Description"
              name = "listDescription"
              placeholder="Text"
              className = 'form-group'
            />
            <Button type="submit" variant="contained" disabled={!isValid}>
              Create
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
