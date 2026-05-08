import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1B6CA8",
      light: "#3A8CC9",
      dark: "#0D4C7A",
      contrastText: "#fff",
    },
    secondary: {
      main: "#0F8A5F",
      light: "#2BAF80",
      dark: "#076642",
      contrastText: "#fff",
    },
    background: {
      default: "#F0F4F8",
      paper: "#FFFFFF",
    },
    error: { main: "#D32F2F" },
    warning: { main: "#E65100" },
    success: { main: "#1B5E20" },
  },
  typography: {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600, borderRadius: 8 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      defaultProps: { size: "small" },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#0D2137",
          color: "#fff",
        },
      },
    },
  },
});

export default theme;
