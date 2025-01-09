import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Button from "react-bootstrap/esm/Button";

const AddSchema = Yup.object().shape({
  brandName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  modelName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  color: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  year: Yup.number()
    .min(1940, "Too old!")
    .max(2025, "Too young!")
    .required("Required"),
  isNew: Yup.boolean().required("Required"),
});

export default function AddPage() {
  const navigate = useNavigate();
  return (
    <>
      <Button variant="danger" onClick={() => navigate(`/`)} className="m-5  ">
        Go Back
      </Button>
      <Formik
        initialValues={{
          brandName: "",
          modelName: "",
          year: "",
          color: "",
          isNew: "",
        }}
        validationSchema={AddSchema}
        onSubmit={(values) => {
          axios
            .post("http://localhost:3000/cars/", values)
            .then(() =>
              Swal.fire({
                icon: "success",
                title: "Successfully added car",
                showConfirmButton: false,
                timer: 1500,
              })
            )
            .then(() => navigate("/"));
        }}
      >
        {({ errors, touched }) => (
          <Form className="d-flex flex-column w-100 align-items-center mt-5 gap-2">
            <Field name="brandName" placeholder="Brand" />
            {errors.brandName && touched.brandName ? (
              <div>{errors.brandName}</div>
            ) : null}
            <Field name="modelName" placeholder="Model" />
            {errors.modelName && touched.modelName ? (
              <div>{errors.modelName}</div>
            ) : null}
            <Field name="color" type="text" placeholder="Color" />
            {errors.color && touched.color ? <div>{errors.color}</div> : null}
            <Field name="year" type="text" placeholder="Year" />
            {errors.year && touched.year ? <div>{errors.year}</div> : null}
            <Field name="isNew" type="text" placeholder="New or old" />
            {errors.isNew && touched.isNew ? <div>{errors.isNew}</div> : null}
            <Button variant="success" type="submit">
              Add car
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
