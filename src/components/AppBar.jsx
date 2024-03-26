import * as React from "react";

import {
  Box,
  Typography,
  IconButton,
  Divider,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  styled,
  useTheme,
} from "@mui/material";

import {
  Person,
  Menu,
  AdminPanelSettings,
  Groups,
  Work,
  ChevronLeft,
  ChevronRight,
  Logout,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

// ===========================================
// ====== Customize Some AppBar Styles =======
// ===========================================

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: "#FFF",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// ===========================================
// =========== Admin AppBar Component ========
// ===========================================

const AppBarComponent = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  // AppBar Links

  const MainLinks = [
    {
      label: "Employees",
      event: () => navigate("/employee"),
      icon: <Groups sx={{ fontSize: "1.7rem", mr: "1rem", color: "#FFF" }} />,
    },
    {
      label: "Jobs",
      event: () => navigate("/job"),
      icon: <Work sx={{ fontSize: "1.6rem", mr: "1rem", color: "#FFF" }} />,
    },
    {
      label: "Logout",
      event: () => window.alert("You Didn't set Login to set Logout :) :) :)"),
      icon: <Logout sx={{ fontSize: "1.7rem", mr: "1rem", color: "#FFF" }} />,
    },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <StyledAppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 3,
                ...(open && { display: "none" }),
              }}
            >
              <Menu />
            </IconButton>
            <Typography
              variant="h6"
              display="flex"
              alignItems="center"
              noWrap
              component="div"
            >
              <Person sx={{ fontSize: "2rem", mr: ".5rem" }} />
              Username
            </Typography>
          </Box>
        </Toolbar>
      </StyledAppBar>
      <StyledDrawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: { backgroundColor: theme.palette.primary.dark, color: "#FFF" },
        }}
      >
        <DrawerHeader>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            ml="1rem"
          >
            <AdminPanelSettings sx={{ fontSize: "1.7rem", mr: ".5rem" }} />
            <Typography sx={{ fontSize: "1.5rem" }}>Admin</Typography>
          </Box>
          <IconButton color="primary" onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRight sx={{ color: "#FFF" }} />
            ) : (
              <ChevronLeft sx={{ color: "#FFF" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {MainLinks.map((link, index) => (
            <ListItem key={link.label} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => link.event()}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {link.icon}
                </ListItemIcon>
                <ListItemText
                  primary={link.label}
                  disableTypography
                  sx={{ opacity: open ? 1 : 0, fontSize: "1rem" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </StyledDrawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        {children}
      </Box>
    </Box>
  );
};

export default AppBarComponent;
