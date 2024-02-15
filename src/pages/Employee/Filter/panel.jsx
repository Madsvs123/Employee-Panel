import { Box, 
         Button, 
         useTheme,
        } from '@mui/material'
import { Add } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom'
import Filters from './filters';



const EmployeePanel = ({handleOpen}) => {
    const navigate = useNavigate();
    const { palette } = useTheme()

  
  
    return (
      <Box bgcolor={palette.primary.light}
           borderRadius='1rem'
           boxShadow={`2px 2px 5px #CCC`}
           mb='1rem' 
           p='.5rem 1rem'
           display='flex'
           justifyContent='space-between'
           alignItems='center'>

            <Filters />

              <Box>
              <Button variant="contained" 
                      color='secondary'
                      size='medium' 
                      onClick={() => {
                    handleOpen()
                    navigate('/employee/add')
                  }} 
              >
            Add Employee <Add />
          </Button>
            </Box>
      </Box>
    )
  }
  
  export default EmployeePanel