import { useState } from "react";
import { Box, Alert } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import EmployeeForm from "./form";
import { useData } from "../../../context/DataContext";

const validationSchema = yup.object().shape({
  employeeName: yup.string().required("Employee Name is required"),
  salaryStatus: yup.string().required("Salary Status is required"),
  dateOfHiring: yup.date().required("hiring date is required"),
  jobCode: yup.string().required("job Code is required"),
});

const initialValues = {
  employeeCode: "",
  employeeName: "",
  salaryStatus: "valid",
  dateOfHiring: null,
  jobCode: "",
};

const AddEmployee = ({ handleClose }) => {
  const [handleModalClose, setSubmitMsg] = useOutletContext();
  const { getData } = useData();

  // Form Main Function

  const { values, errors, handleSubmit, handleChange, setFieldValue } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        const data = JSON.stringify(values);
        console.log(data);
        await axios
          .post(
            `https://kaied-employee-panel-api.onrender.com/employee`,
            data,
            { headers: { "Content-Type": "application/json" } }
          )
          .then((response) => {
            setSubmitMsg("Employee Added Successfully");
            getData();
            handleModalClose();
          })
          .catch((error) => {
            console.log(error);
          });
      },
    });
  return (
    <Box>
      <EmployeeForm
        values={values}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        setFieldValue={setFieldValue}
        submitLabel="Add Employee"
      />
    </Box>
  );
};

export default AddEmployee;
