import { useState } from 'react'
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
} from '@mui/material'
import { Edit, Delete, Check } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../../context/DataContext'
import ConfirmDelete from "../../../components/ConfirmDelete";



const columns = [
    {
      id: 1,
      label : "Employee Code",
      width : ""
    },
    {
      id: 2,
      label : "Employee Name",
      width : ""
    },
    {
      id: 3,
      label : "Salary Status",
      width : ""
    },
    {
      id: 4,
      label : "Hiring Date",
      width : ""
    },
    {
      id: 5,
      label : "Job Code",
      width : ""
    },
    {
      id: 6,
      label : "Options",
      width : ""
    },
  ]
  


const DataTable = ({handleModalOpen}) => {

    const { filteredData } = useData()
    const {palette} = useTheme()
    const navigate = useNavigate()
    const [confirmDelete, setConfirmDelete] = useState({id : null, name: null, status: false})

    const handleDeleteClose = () => {
        setConfirmDelete({id : null, name: null, status: false});
      };


  return (
    <Box>
        <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{bgcolor: palette.primary.dark}}>
          <TableRow>

              {columns.map(column => {
                return (
                  <TableCell align="center" key={column.id}>
                  <Typography variant='h6' fontWeight="600" sx={{color : palette.primary.light}}>
                  {column.label}
                  </Typography>
                  </TableCell>  
                )
              })}

          </TableRow>
        </TableHead>
        <TableBody>

          {filteredData && filteredData.map((employee, index) => {

            var date = new Date(employee.dateOfHiring);
            var formmatedDate = date.toISOString().slice(0,10)

            return (
              <TableRow key={index}>
              <TableCell align="center" sx={{bgcolor : `#f5f5f5`}}>
                <Typography fontWeight="600" 
                            sx={{color : palette.primary.dark, 
                            cursor : "pointer"}}>
                {employee.employeeCode}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography fontWeight="600" sx={{color : palette.primary.dark}}>
                  {employee.employeeName}
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{bgcolor : `#f5f5f5`}}>
                <Typography fontWeight="600" sx={{color : employee.salaryStatus === 'valid' ? palette.secondary.main : '#E57373'}}>
                {employee.salaryStatus}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography fontWeight="600" fontStyle='italic' sx={{color : '#888'}}>
                  {formmatedDate.split("-").join(" / ")}
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{bgcolor : `#f5f5f5`}}>
               <Typography fontWeight='600' sx={{color : palette.primary.dark}}>
                {employee.jobCode}
               </Typography>
              </TableCell>
              <TableCell sx={{display : "flex", justifyContent : "center", gap : "1rem"}}>
              <Button variant="text"
                      size="medium"
                      color="secondary" 
                      onClick={() => 
                        {
                          handleModalOpen(true)
                          navigate(`/employee/edit/${employee._id}`)
                        }
                      }
                      > 
                      <Edit />
                </Button>
                <Button variant="text"
                        size="medium"
                        color="error" 
                        onClick={() => {
                          setConfirmDelete({id : employee._id, name: employee.employeeName , status: true})}
                        }> 
                      <Delete />
                </Button>
              </TableCell>
            </TableRow>
            )
          })}

          
        </TableBody>
      </Table>
    </TableContainer>

  {confirmDelete.status && (

    <ConfirmDelete 
    open={confirmDelete.status} 
    handleClose={() => handleDeleteClose()}
    id={confirmDelete.id} 
    name={confirmDelete.name}
    collection='employee'
    />

  )}
    </Box>

  )
}

export default DataTable