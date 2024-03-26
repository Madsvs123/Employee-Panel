import { Box } from "@mui/material";
import AppBar from "../components/AppBar";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <Box>
      <AppBar>
        <Outlet />
      </AppBar>
    </Box>
  );
};

export default Main;
