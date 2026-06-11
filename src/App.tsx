import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import getTheme from "./theme/themeConfig";
import AppRoutes from "./routes/AppRoutes";
import { useThemeStore } from "./store/themeStore";

function AppContent() {
  const { mode } = useThemeStore();
  const theme = createTheme(getTheme(mode));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
      <Toaster position="top-right" />
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
