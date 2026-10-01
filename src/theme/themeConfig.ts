import { createTheme, type ThemeOptions } from "@mui/material/styles";
import { COLORS } from "./colors";
import { THEME_PRESETS } from "./themePresets";

export interface DynamicThemeConfig {
  mode: "light" | "dark" | "custom";
  baseMode: "light" | "dark";
  primaryColor?: string;
  secondaryColor?: string;
  headerColor?: string;
  sidebarColor?: string;
  activePreset?: string;
}

export const getTheme = (configOrMode: DynamicThemeConfig | "light" | "dark" | "custom"): ThemeOptions => {
  let baseMode: "light" | "dark" = "light";
  let primary = COLORS.primary;
  let secondary = COLORS.secondary;

  if (typeof configOrMode === "string") {
    baseMode = configOrMode === "dark" ? "dark" : "light";
  } else {
    baseMode = configOrMode.baseMode || (configOrMode.mode === "dark" ? "dark" : "light");
    if (configOrMode.primaryColor) primary = configOrMode.primaryColor;
    if (configOrMode.secondaryColor) secondary = configOrMode.secondaryColor;
    if (!configOrMode.primaryColor && configOrMode.activePreset && THEME_PRESETS[configOrMode.activePreset]) {
      primary = THEME_PRESETS[configOrMode.activePreset].primary;
      secondary = THEME_PRESETS[configOrMode.activePreset].secondary;
    }
  }

  const isDark = baseMode === "dark";
  const colors = isDark ? COLORS.dark : COLORS.light;

  return {
    palette: {
      mode: baseMode,
      primary: {
        main: primary,
        light: "#F43F5E",
        dark: "#9F1239",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: secondary,
        light: "#334155",
        dark: "#020617",
        contrastText: "#FFFFFF",
      },
      success: {
        main: COLORS.success,
        light: "#6EE7B7",
        dark: "#047857",
        contrastText: "#FFFFFF",
      },
      warning: {
        main: COLORS.warning,
        light: "#FCD34D",
        dark: "#B45309",
        contrastText: "#FFFFFF",
      },
      error: {
        main: COLORS.danger,
        light: "#FCA5A5",
        dark: "#B91C1C",
        contrastText: "#FFFFFF",
      },
      info: {
        main: COLORS.info,
        light: "#60A5FA",
        dark: "#1D4ED8",
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
      fontFamily: '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
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
        fontSize: "0.9375rem",
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
      borderRadius: 10,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 8,
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          },
          contained: {
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
            "&:hover": {
              boxShadow: "0 6px 18px rgba(0, 0, 0, 0.18)",
              transform: "translateY(-1px)",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: 12,
            boxShadow: isDark
              ? "0 4px 20px rgba(0, 0, 0, 0.4)"
              : "0 2px 12px rgba(15, 23, 42, 0.05)",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: colors.surface,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 8,
              transition: "all 0.2s ease-in-out",
              "&:hover fieldset": {
                borderColor: primary,
              },
              "&.Mui-focused fieldset": {
                borderColor: `${primary} !important`,
                boxShadow: `0 0 0 3px ${primary}20`,
              },
            },
          },
        },
      },
    },
  };
};

export const lightTheme = createTheme(getTheme({ mode: "light", baseMode: "light" }));
export const darkTheme = createTheme(getTheme({ mode: "dark", baseMode: "dark" }));

export default getTheme;
