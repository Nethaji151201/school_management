/**
 * Centralized Color Configuration
 * Default: Theme-5 (Deep Slate Navy & Ruby Crimson)
 */

export const COLORS = {
  // Primary Brand Colors (Theme-5 Default)
  primary: "#BE123C", // Ruby Crimson
  secondary: "#0F172A", // Deep Slate Navy
  accent: "#E11D48", // Vivid Rose
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#0284C7",

  // Table & Header Specific
  tableHeaderLight: "#0F172A",
  tableHeaderDark: "#0B0F19",

  // Neutrals
  white: "#FFFFFF",
  black: "#000000",

  // Light Mode
  light: {
    bg: "#F8FAFC",
    bgSecondary: "#F1F5F9",
    text: "#0F172A",
    textSecondary: "#475569",
    textTertiary: "#94A3B8",
    border: "#E2E8F0",
    borderLight: "#F1F5F9",
    surface: "#FFFFFF",
    surfaceHover: "#F8FAFC",
  },

  // Dark Mode
  dark: {
    bg: "#0B0F19",
    bgSecondary: "#111827",
    text: "#F8FAFC",
    textSecondary: "#94A3B8",
    textTertiary: "#64748B",
    border: "#1E293B",
    borderLight: "#111827",
    surface: "#111827",
    surfaceHover: "#1E293B",
  },

  // Glassmorphism
  glass: {
    light: "rgba(255, 255, 255, 0.7)",
    dark: "rgba(15, 23, 42, 0.7)",
    lightBorder: "rgba(255, 255, 255, 0.18)",
    darkBorder: "rgba(255, 255, 255, 0.08)",
  },

  // Gradients
  gradient: {
    primary: "linear-gradient(135deg, #BE123C 0%, #E11D48 100%)",
    secondary: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
    success: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
    warning: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
  },

  // Semantic Colors
  success_light: "#DCFCE7",
  success_dark: "#064E3B",
  warning_light: "#FEF3C7",
  warning_dark: "#78350F",
  danger_light: "#FEE2E2",
  danger_dark: "#7F1D1D",
  info_light: "#E0F2FE",
  info_dark: "#0C4A6E",
};

export type ColorMode = "light" | "dark" | "custom";
