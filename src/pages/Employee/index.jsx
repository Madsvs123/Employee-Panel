import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ModalView from "../../components/ModalView";
import EmployeePanel from "./Filter/panel";
import DataTable from "./View/data";
import { useTheme } from "@emotion/react";



const AllEmployees = () => {
  const { palette } = useTheme()
  const navigate = useNavigate()
  const [submitMsg, setSubmitMsg] = useState(null)
  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => {
    setOpenModal(false);
    navigate('/employee')
  };


  useEffect(() => {
    if (submitMsg !== null) {
      toast.success(submitMsg, {
        onClose: () => {setSubmitMsg(null)},
        containerId: 'success-container'
      });
    }
  }, [submitMsg]);


  return (
    <div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        toastStyle={{color: palette.primary.dark, backgroundColor: palette.background.default, fontWeight: 'bold'}}
        style={{width: '50%'}} 
        containerId={`success-container`}
        />

      <EmployeePanel handleOpen={handleModalOpen} />
      <DataTable handleModalOpen={handleModalOpen} />
    

    <ModalView open={openModal} handleClose={handleModalClose}>
      <Outlet context={[handleModalClose, setSubmitMsg]} />
    </ModalView>
      

    </div>
  )
}

export default AllEmployees