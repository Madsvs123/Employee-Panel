import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import JobCode from "./form";

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
const EditJob = () => {
  const [handleClose] = useOutletContext();
  const [job, setJob] = useState(initialValues);
  const params = useParams();
  const id = params.id;

  const getJob = () => {
    axios
      .get(`https://kaied-employee-panel-api.onrender.com/job/${id}`)
      .then((reponse) => {
        setJob(reponse.data);
      });
  };

  useEffect(() => {
    getJob();
  });

  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues: job,
    enableReinitialize: true,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      const data = JSON.stringify(values);

      await axios
        .patch(
          `https://kaied-employee-panel-api.onrender.com/job/${id}`,
          data,
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          handleClose();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <Box>
      <JobCode
        values={values}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        submitLabel="Update Job"
      />
    </Box>
  );
};

export default EditJob;
