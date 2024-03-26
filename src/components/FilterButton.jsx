import { Box, Button, Popover, useTheme } from "@mui/material";
import { Tune } from "@mui/icons-material";
import { useState } from "react";

const FilterButton = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { palette } = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const filterOpen = Boolean(anchorEl);
  const id = filterOpen ? "filter-popover" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        sx={{
          bgcolor: palette.secondary.main,
          color: palette.primary.light,
          "&:hover": { bgcolor: palette.secondary.main },
        }}
      >
        <Tune />
      </Button>
      <Popover
        id={id}
        open={filterOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {children}
      </Popover>
    </div>
  );
};

export default FilterButton;
