import {
    Box,
    Typography,
    Select,
    MenuItem,
    useTheme,
    IconButton
} from '@mui/material'
import {ArrowUpward, ArrowDownward} from '@mui/icons-material'

import { useEffect, useState } from 'react'; 
import { useData } from '../context/DataContext';

const SortMenu = ({sortBy, setSortBy, direction, setDirection}) => {
    const { palette }= useTheme()
    const { employees, setEmployees } = useData()

    const handleSort = (key) => {
      setSortBy(key);
    }

  return (
    <Box display='flex' alignItems='center' gap='.5rem'>
      <Typography fontWeight='600' sx={{color: palette.secondary.main}}>
            Sort By :
      </Typography>
      <Select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            size='small'
        >
        <MenuItem value='employeeCode' >Code</MenuItem>
        <MenuItem value='employeeName'>Name</MenuItem>
        <MenuItem value='dateOfHiring'>Hiring Date</MenuItem>
      </Select>

        {sortBy && (
          <IconButton sx={{bgcolor: palette.background.default}} onClick={() => {
            setDirection(direction === 'asc' ? 'dsc' : 'asc')
          }}>
            {direction === 'asc' ? (
              <ArrowUpward sx={{color : palette.primary.dark}} />
            ) : (
              <ArrowDownward sx={{color : palette.primary.dark}} />
            )}
          </IconButton>
        )}

    </Box>
  )
}

export default SortMenu