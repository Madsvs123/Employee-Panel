import { Box, Button, TextField } from "@mui/material";
import { useOutletContext } from "react-router-dom";

const JovForm = ({
  values,
  errors,
  handleSubmit,
  handleChange,
  submitLabel,
}) => {
  const [handleClose] = useOutletContext();
  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <Box display="flex" flexDirection="column" rowGap="1rem">
          <TextField
            label="Job Code"
            name="code"
            value={values.code}
            onChange={handleChange}
            sx={{ gridColumn: "1", gridRow: "1" }}
            error={Boolean(errors.code)}
            fullWidth
          />
          <TextField
            label="Job Title"
            name="title"
            value={values.title}
            onChange={handleChange}
            sx={{ gridColumn: "1", gridRow: "1" }}
            error={Boolean(errors.title)}
            fullWidth
          />
          <TextField
            label="Salary"
            type="number"
            name="salary"
            value={values.salary}
            onChange={handleChange}
            error={Boolean(errors.salary)}
            fullWidth
          />
        </Box>
      </div>
      <Box display="flex" justifyContent="space-between" gap="1rem">
        <Button
          variant="contained"
          size="samll"
          color="error"
          onClick={() => {
            handleClose();
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="samll"
          color="secondary"
        >
          {submitLabel}
        </Button>
      </Box>
    </form>
  );
};

export default JovForm;
