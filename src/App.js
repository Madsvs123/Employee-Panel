import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import themeSettings from "./theme.js";

import Main from "./pages";
import Employees from "./pages/Employee";
import AddEmployee from "./pages/Employee/Form/add";
import EditEmployee from "./pages/Employee/Form/edit";

import Jobs from "./pages/Job";
import AddJob from "./pages/Job/Form/add";
import EditJob from "./pages/Job/Form/edit";

import NotFound from "./pages/NotFound";

function App() {
  const theme = createTheme(themeSettings());

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route path="/" element={<Navigate to="/employee" />} />
              <Route path="employee" element={<Employees />}>
                <Route path="add" element={<AddEmployee />} />
                <Route path="edit/:id" element={<EditEmployee />} />
              </Route>

              <Route path="job" element={<Jobs />}>
                <Route path="add" element={<AddJob />} />
                <Route path="edit/:id" element={<EditJob />} />
              </Route>

              <Route path="/*" element={<NotFound />} />
            </Route>
          </Routes>
        </CssBaseline>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
