import {
    Box,
    Button,
    TextField,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    Select,
    MenuItem,
    RadioGroup,
    Radio
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useOutletContext } from 'react-router-dom';


import { useData } from '../../../context/DataContext'
import dayjs from 'dayjs';

const EmployeeForm = ({values, errors, handleSubmit, handleChange, setFieldValue, submitLabel}) => {
    const [handleModalClose] = useOutletContext()
    const {jobs} = useData()

  return (
    <form onSubmit={handleSubmit}>
       <div style={{
       display : "flex",
       flexFlow : 'column',
       gap : "1rem",
       marginBottom : "1rem"
           }}>                        
          <Box display="flex" flexDirection="column" rowGap="1rem">
            <TextField label="Employee Code" 
                   type='number'
                   name="employeeCode" 
                   value={values.employeeCode}
                   onChange={handleChange}
                   error={Boolean(errors.employeeCode)}
                   size='small'
                   fullWidth
           />
           <TextField label="Employee Name" 
                   name="employeeName" 
                   value={values.employeeName}
                   onChange={handleChange}
                   error={Boolean(errors.employeeName)} 
                   size='small'
                   sx={{gridColumn : 'span 2'}}
                   fullWidth
           />
            <FormControl>
            <FormLabel id="salaryStatus">Salary Status</FormLabel>
            <RadioGroup
              aria-labelledby="salaryStatus"
              value={values.salaryStatus}
              onChange={handleChange}
              name="salaryStatus"
              row
            >
              <FormControlLabel value="valid" control={<Radio />} label="valid" />
              <FormControlLabel value="not valid" control={<Radio />} label="not valid" />
            </RadioGroup>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
{            console.log(values.dateOfHiring)}
          <DatePicker
            value={values.dateOfHiring ? dayjs(values.dateOfHiring) : null}
            onChange={(value) => setFieldValue('dateOfHiring', value)}
            slotProps={{ textField: { size: 'small' } }}
            label="Hiring Date"
          />
          </LocalizationProvider>
           </Box>
            <FormControl fullWidth size='small'>
              <InputLabel id="jobCode-label">Job code</InputLabel>
              <Select
                labelId="jobCode-label"
                label="Job Code"
                id="jobCode"
                name="jobCode" 
                value={values.jobCode}
                error={Boolean(errors.jobCode)}
                onChange={handleChange}
                size='small'
              >
                {jobs && jobs.map((job) => {
                  return (
                    <MenuItem key={job._id} value={job._id}>
                      {job.code}<span style={{color : '#acacac'}}>&nbsp; ({job.title})</span>
                      </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
       </div>
       <Box display='flex' justifyContent='space-between' gap="1rem">
            <Button variant="contained" 
                    size="samll"
                    color='error'
                    onClick={() => {
                      handleModalClose()
                    }}
                    >
                    Cancel
            </Button>
            <Button type='submit'
                    variant="contained" 
                    size="samll"   
                    color='secondary'>
                    {submitLabel}
            </Button>
          </Box>
   </form>    
  )
}

export default EmployeeForm