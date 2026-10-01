import { useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import getTheme from "./theme/themeConfig";
import AppRoutes from "./routes/AppRoutes";
import { useThemeStore } from "./store/themeStore";

function AppContent() {
  const { mode, baseMode, primaryColor, secondaryColor, activePreset } = useThemeStore();

  const theme = useMemo(
    () =>
      createTheme(
        getTheme({
          mode,
          baseMode,
          primaryColor,
          secondaryColor,
          activePreset,
        }),
      ),
    [mode, baseMode, primaryColor, secondaryColor, activePreset],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "8px",
            background: "#0F172A",
            color: "#FFFFFF",
            fontSize: "0.85rem",
          },
        }}
      />
    </ThemeProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
