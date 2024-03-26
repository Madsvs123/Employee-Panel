import { useEffect, useState } from "react";
import { Box, Alert } from "@mui/material";
import { useOutletContext, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import EmployeeForm from "./form";
import { useData } from "../../../context/DataContext";

const validationSchema = yup.object().shape({
  employeeName: yup.string().required("Employee Name is required"),
  salaryStatus: yup.string().required("Salary Status is required"),
  dateOfHiring: yup.date().required("hiring date is required"),
  jobCode: yup.string().required("jop Code is required"),
});

const initialValues = {
  employeeCode: "",
  employeeName: "",
  salaryStatus: "",
  dateOfHiring: null,
  jobCode: "",
};

const EditEmployee = () => {
  const { getData } = useData();
  const [employee, setEmployee] = useState(initialValues);
  const [handleModalClose, setSubmitMsg] = useOutletContext();
  const params = useParams();
  const id = params.id;

  const getEmployee = () => {
    axios
      .get(`https://kaied-employee-panel-api.onrender.com/employee/${id}`)
      .then((response) => {
        const data = { ...response.data, jobCode: response.data.jobCode._id };
        setEmployee(data);
      });
  };

  useEffect(() => {
    getEmployee();
  }, []);

  const { values, errors, handleSubmit, handleChange, setFieldValue } =
    useFormik({
      initialValues: employee,
      enableReinitialize: true,
      validationSchema: validationSchema,

      onSubmit: async (values) => {
        const data = JSON.stringify(values);

        await axios
          .patch(
            `https://kaied-employee-panel-api.onrender.com/employee/${id}`,
            data,
            { headers: { "Content-Type": "application/json" } }
          )
          .then((response) => {
            setSubmitMsg("Employee Updated Successfully");
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
        submitLabel="Update Employee"
      />
    </Box>
  );
};

export default EditEmployee;
