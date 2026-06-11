import { createTheme, type ThemeOptions } from "@mui/material/styles";
import { COLORS, type ColorMode } from "./colors";

const getTheme = (mode: ColorMode): ThemeOptions => {
  const isDark = mode === "dark";
  const colors = isDark ? COLORS.dark : COLORS.light;

  return {
    palette: {
      mode,
      primary: {
        main: COLORS.primary,
        light: "#60A5FA",
        dark: "#1D4ED8",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: COLORS.secondary,
        light: "#A78BFA",
        dark: "#6D28D9",
        contrastText: "#FFFFFF",
      },
      success: {
        main: COLORS.success,
        light: "#86EFAC",
        dark: "#15803D",
        contrastText: "#FFFFFF",
      },
      warning: {
        main: COLORS.warning,
        light: "#FBBF24",
        dark: "#D97706",
        contrastText: "#FFFFFF",
      },
      error: {
        main: COLORS.danger,
        light: "#F87171",
        dark: "#DC2626",
        contrastText: "#FFFFFF",
      },
      info: {
        main: COLORS.info,
        light: "#38BDF8",
        dark: "#0284C7",
        contrastText: "#FFFFFF",
      },
      background: {
        default: colors.bg,
        paper: colors.surface,
      },
      text: {
        primary: colors.text,
        secondary: colors.textSecondary,
      },
      divider: colors.border,
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: "2.5rem",
        fontWeight: 700,
        letterSpacing: "-0.02em",
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 700,
        letterSpacing: "-0.01em",
      },
      h3: {
        fontSize: "1.5rem",
        fontWeight: 600,
        letterSpacing: "-0.01em",
      },
      h4: {
        fontSize: "1.25rem",
        fontWeight: 600,
      },
      h5: {
        fontSize: "1rem",
        fontWeight: 600,
      },
      h6: {
        fontSize: "0.875rem",
        fontWeight: 600,
      },
      body1: {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.5,
      },
      body2: {
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: 1.5,
      },
      caption: {
        fontSize: "0.75rem",
        fontWeight: 500,
        lineHeight: 1.4,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 500,
            borderRadius: 8,
            transition: "all 0.2s ease-in-out",
          },
          contained: {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            "&:hover": {
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: isDark
              ? `linear-gradient(135deg, ${COLORS.glass.dark} 0%, ${COLORS.glass.dark} 100%)`
              : `linear-gradient(135deg, ${COLORS.glass.light} 0%, ${COLORS.glass.light} 100%)`,
            backdropFilter: "blur(10px)",
            border: `1px solid ${isDark ? COLORS.glass.darkBorder : COLORS.glass.lightBorder}`,
            boxShadow: isDark
              ? "0 8px 32px rgba(0, 0, 0, 0.3)"
              : "0 8px 32px rgba(0, 0, 0, 0.1)",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: isDark
              ? `linear-gradient(135deg, ${COLORS.glass.dark} 0%, ${COLORS.glass.dark} 100%)`
              : `linear-gradient(135deg, ${COLORS.glass.light} 0%, ${COLORS.glass.light} 100%)`,
            backdropFilter: "blur(10px)",
            border: `1px solid ${isDark ? COLORS.glass.darkBorder : COLORS.glass.lightBorder}`,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: isDark
              ? `linear-gradient(135deg, ${COLORS.glass.dark} 0%, ${COLORS.glass.dark} 100%)`
              : `linear-gradient(135deg, ${COLORS.glass.light} 0%, ${COLORS.glass.light} 100%)`,
            backdropFilter: "blur(10px)",
            border: `1px solid ${isDark ? COLORS.glass.darkBorder : COLORS.glass.lightBorder}`,
            boxShadow: isDark
              ? "0 4px 12px rgba(0, 0, 0, 0.3)"
              : "0 4px 12px rgba(0, 0, 0, 0.08)",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              transition: "all 0.2s ease-in-out",
              "&:hover fieldset": {
                borderColor: COLORS.primary,
              },
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundImage: isDark
              ? `linear-gradient(135deg, ${COLORS.glass.dark} 0%, ${COLORS.glass.dark} 100%)`
              : `linear-gradient(135deg, ${COLORS.glass.light} 0%, ${COLORS.glass.light} 100%)`,
            backdropFilter: "blur(10px)",
            border: `1px solid ${isDark ? COLORS.glass.darkBorder : COLORS.glass.lightBorder}`,
          },
        },
      },
    },
  };
};

export const lightTheme = createTheme(getTheme("light"));
export const darkTheme = createTheme(getTheme("dark"));

export default getTheme;
