import { Box, Alert } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import JobForm from "./form";
import { useData } from "../../../context/DataContext";

const validationSchema = yup.object().shape({
  code: yup.string().required("Jop code is required"),
  title: yup.string().required("Jop title is required"),
  salary: yup.number().required("date is required"),
});

const initialValues = {
  code: "",
  title: "",
  salary: "",
};

const AddJob = () => {
  const [handleClose] = useOutletContext();
  const { getData } = useData();

  // Form Main Function

  const { values, errors, handleSubmit, handleChange, resetForm } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, onSubmitProps) => {
      const data = JSON.stringify(values);

      await axios
        .post(`https://kaied-employee-panel-api.onrender.com/job`, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          handleClose();
          getData();
          resetForm();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <Box>
      <JobForm
        values={values}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        submitLabel="Add Job"
      />
    </Box>
  );
};

export default AddJob;
