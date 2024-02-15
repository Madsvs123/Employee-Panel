import { Box, 
         Modal, 
         useTheme, 
         useMediaQuery, 
         Paper
        } from '@mui/material'

const ModalView = ({children, open, handleClose}) => {

    const { palette } = useTheme()
    const isNonMobileScreen = useMediaQuery('(min-width: 850px)')

  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={{
        bgcolor : palette.primary.light,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isNonMobileScreen ? '40%' : "80%",
        borderRadius: '.5rem',
        boxShadow: 24,
        p: 1,
    }}>

      <Box p='1rem' 
           bgcolor='#FFF'
           borderRadius='.5rem'>

        {children}
      </Box>

    </Box>
    </Modal>
  )
}

export default ModalView