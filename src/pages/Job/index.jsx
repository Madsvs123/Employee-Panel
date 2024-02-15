import { Box,         
         Typography,
         Button, 
         Table, 
         TableContainer,
         TableHead, 
         TableBody, 
         TableRow, 
         TableCell,  
         Paper,
         useTheme
        } from "@mui/material";
        import { Add, Delete, Edit } from "@mui/icons-material";

import { useNavigate, Outlet } from "react-router-dom";

import { useEffect, useState } from "react";
import ConfirmDelete from "../../components/ConfirmDelete";
import ModalView from "../../components/ModalView";
import { useData } from "../../context/DataContext";
import JobPanel from "./panel";

// Job Panel Options

// const JobPannel = () => {
//   const navigate = useNavigate()

//   return (
//     <Box display="flex" mb="1rem" columnGap="1rem">

//     </Box>
//   )
// }


// Job Table

const AllJobs = () => {

  const {jobs} = useData()
  const [confirmDelete, setConfirmDelete] = useState({id : null, title: null, status: false})
  const navigate = useNavigate()
  const { palette } = useTheme()

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Get All Employees From Backend Api

    const handleDeleteClose = () => {
      setConfirmDelete({id : null, title: null, status: false});
    };

  return (
    <div>
    <JobPanel handleOpen={handleOpen} />
    <TableContainer component={Paper} >
      <Table>
        <TableHead>
          <TableRow>
          <TableCell align="center">
              <Typography variant='h6' fontWeight="600" sx={{color : palette.secondary.main}}>
              Job Code
              </Typography>
              </TableCell>
            <TableCell align="center">
              <Typography variant='h6' fontWeight="600" sx={{color : palette.secondary.main}}>
              Job Title
              </Typography>
              </TableCell>
              <TableCell align="center">
            <Typography variant='h6' fontWeight="600" sx={{color : palette.secondary.main}}>
              Salary
              </Typography>
              </TableCell>
              <TableCell align="center">
            <Typography variant='h6' fontWeight="600" sx={{color : palette.secondary.main}}>
              Options
              </Typography>
              </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {jobs && jobs.map((job) => {

            return (
              <TableRow key={job._id}>
              <TableCell align="center">
                <Typography fontWeight="600" sx={{color : palette.primary.dark}}>
                {job.code}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography sx={{color : '#999'}}>
                {job.title}
                </Typography>
              </TableCell>
              <TableCell align="center">
              <Typography fontWeight="600" fontStyle='italic' sx={{color : '#666'}}>
                {job.salary}$
                </Typography>
                </TableCell>
              <TableCell sx={{display : "flex", justifyContent : "center", gap : "1rem"}}>
              <Button size="small"
                      color="secondary" 
                      onClick={() => {
                        handleOpen()
                        navigate(`/job/edit/${job._id}`)
                      }}
                      > 
                      <Edit />
                </Button>
                <Button size="small"
                        color="error" 
                        onClick={() => setConfirmDelete({id : job._id, title: job.title , status: true})}> 
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
    name={confirmDelete.title}
    collection='job'
      />

    )}

    <ModalView open={open} handleClose={() => handleClose()}>
    <Outlet context={[handleClose]} />
    </ModalView>

    </div>
  )
}

export default AllJobs