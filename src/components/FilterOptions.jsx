import {
  Box,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

const FilterOptions = ({ filterOptions, setFilterOptions }) => {
  const { palette } = useTheme();

  const initialValues = {
    salaryStatus: filterOptions.salaryStatus,
    startDate: filterOptions.startDate,
    endDate: filterOptions.endDate,
  };

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    onSubmit: (values) => {
      setFilterOptions(values);
    },
  });

  return (
    <Box
      display="flex"
      component="form"
      onSubmit={handleSubmit}
      flexDirection="column"
      p=".5rem"
      bgcolor={palette.primary.light}
    >
      <Box
        p=".5rem"
        mb=".5rem"
        bgcolor={palette.background.default}
        borderRadius=".5rem"
      >
        <Box mb=".5rem">
          <Typography variant="h6" sx={{ color: "#666" }} fontWeight="600">
            Salary Status
          </Typography>
        </Box>
        <RadioGroup
          aria-labelledby="salaryStatus"
          value={values.salaryStatus}
          onChange={handleChange}
          name="salaryStatus"
        >
          <FormControlLabel
            value="All"
            control={<Radio size="small" />}
            label="All"
          />
          <FormControlLabel
            value="valid"
            control={<Radio size="small" />}
            label="Valid"
          />
          <FormControlLabel
            value="not valid"
            control={<Radio size="small" />}
            label="Not Valid"
          />
        </RadioGroup>
      </Box>

      <Box
        p=".5rem"
        mb=".5rem"
        bgcolor={palette.background.default}
        borderRadius=".5rem"
      >
        <Box m=".5rem 0">
          <Typography variant="h6" sx={{ color: "#666" }} fontWeight="600">
            Hiring Date
          </Typography>
        </Box>
        <Box display="flex" gap="1rem">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Hiring Date"
              value={values.startDate}
              onChange={(value) => setFieldValue("startDate", value)}
              slotProps={{ textField: { size: "small" } }}
            />
            <DatePicker
              label="End Hiring Date"
              value={values.endDate}
              onChange={(value) => setFieldValue("endDate", value)}
              slotProps={{ textField: { size: "small" } }}
            />
          </LocalizationProvider>
        </Box>
      </Box>
      <Button variant="contained" color="secondary" type="submit">
        Submit Filters
      </Button>
    </Box>
  );
};

export default FilterOptions;
