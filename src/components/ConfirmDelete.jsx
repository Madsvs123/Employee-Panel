import { Box, Button, Modal, Typography, useTheme } from "@mui/material"
import axios from "axios"
import { useData } from "../context/DataContext"

const ConfirmDelete = ({id, name, collection, open, handleClose, setDeleteMsg}) => {

    const { palette } = useTheme()
    const { getData } = useData()

    const modalStyle = {
        bgcolor : palette.primary.light,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '.5rem',
        boxShadow: 24,
        p: 1,
      }

    const deleteItem = async (id) => {
        await axios.delete(`https://kaied-employee-panel-api.onrender.com/${collection}/${id}`)
        getData()
      }


  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>

      <Box p='1rem' bgcolor='#FFF'borderRadius='.5rem'>

         <Box>
            <Typography variant="h6">
                Are you sure you want to delete 
                <span style={{fontWeight: 'bold', color: palette.secondary.main}}> {name} </span> 
                ?
            </Typography>
         </Box>

         <Box display='flex' justifyContent='center' gap="2rem" mt="1rem">
            <Button color="secondary" variant="contained" onClick={() => handleClose()} >
                Cancel
            </Button>
            <Button color="error" variant="contained" onClick={() => {
                deleteItem(id)
                setDeleteMsg(`" ${name} " Deleted Successfully`)
                handleClose()
                }}>
                Confirm
            </Button>
          </Box>

      </Box>

    </Box>
    </Modal>
  )
}

export default ConfirmDelete