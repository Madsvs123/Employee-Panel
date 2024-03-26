import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  useTheme,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
import { useData } from "../../../context/DataContext";
import ConfirmDelete from "../../../components/ConfirmDelete";

const columns = [
  {
    id: 1,
    label: "Employee Code",
    width: "",
  },
  {
    id: 2,
    label: "Employee Name",
    width: "",
  },
  {
    id: 3,
    label: "Salary Status",
    width: "",
  },
  {
    id: 4,
    label: "Hiring Date",
    width: "",
  },
  {
    id: 5,
    label: "Job Code",
    width: "",
  },
  {
    id: 6,
    label: "Options",
    width: "",
  },
];

const DataTable = ({ handleModalOpen }) => {
  const { filteredData } = useData();
  const { palette } = useTheme();
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState({
    id: null,
    name: null,
    status: false,
  });
  const [deleteMsg, setDeleteMsg] = useState(null);
  const handleDeleteClose = () => {
    setConfirmDelete({ id: null, name: null, status: false });
  };

  useEffect(() => {
    if (deleteMsg !== null) {
      toast.error(deleteMsg, {
        onClose: () => {
          setDeleteMsg(null);
        },
        containerId: "delete-container",
      });
    }
  }, [deleteMsg]);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: palette.primary.dark }}>
            <TableRow>
              {columns.map((column) => {
                return (
                  <TableCell align="center" key={column.id}>
                    <Typography
                      variant="h6"
                      fontWeight="600"
                      sx={{ color: palette.primary.light }}
                    >
                      {column.label}
                    </Typography>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData &&
              filteredData.map((employee, index) => {
                var date = new Date(employee.dateOfHiring);
                var formmatedDate = date.toISOString().slice(0, 10);

                return (
                  <TableRow key={index}>
                    <TableCell align="center" sx={{ bgcolor: `#f5f5f5` }}>
                      <Typography
                        fontWeight="600"
                        sx={{ color: palette.primary.dark, cursor: "pointer" }}
                      >
                        {employee.employeeCode}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        fontWeight="600"
                        sx={{ color: palette.primary.dark }}
                      >
                        {employee.employeeName}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ bgcolor: `#f5f5f5` }}>
                      <Typography
                        fontWeight="600"
                        sx={{
                          color:
                            employee.salaryStatus === "valid"
                              ? palette.secondary.main
                              : "#E57373",
                        }}
                      >
                        {employee.salaryStatus}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        fontWeight="600"
                        fontStyle="italic"
                        sx={{ color: "#999" }}
                      >
                        {formmatedDate.split("-").join(" / ")}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ bgcolor: `#f5f5f5` }}>
                      <Typography
                        fontWeight="600"
                        sx={{ color: palette.primary.dark }}
                      >
                        {employee.jobCode}
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1rem",
                      }}
                    >
                      <Button
                        variant="text"
                        size="large"
                        color="secondary"
                        onClick={() => {
                          handleModalOpen(true);
                          navigate(`/employee/edit/${employee._id}`);
                        }}
                      >
                        <Edit />
                      </Button>
                      <Button
                        variant="text"
                        size="large"
                        color="error"
                        onClick={() => {
                          setConfirmDelete({
                            id: employee._id,
                            name: employee.employeeName,
                            status: true,
                          });
                        }}
                      >
                        <Delete />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        toastStyle={{
          color: palette.primary.dark,
          backgroundColor: palette.background.default,
          fontWeight: "bold",
        }}
        style={{ width: "50%" }}
        containerId={`delete-container`}
      />

      {confirmDelete.status && (
        <ConfirmDelete
          open={confirmDelete.status}
          handleClose={() => handleDeleteClose()}
          id={confirmDelete.id}
          name={confirmDelete.name}
          collection="employee"
          setDeleteMsg={setDeleteMsg}
        />
      )}
    </Box>
  );
};

export default DataTable;
