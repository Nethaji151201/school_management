/**
 * Centralized Color Configuration
 * Change colors here and they will reflect throughout the entire application
 */

export const COLORS = {
  // Primary Brand Colors
  primary: "#2563EB",
  secondary: "#7C3AED",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#0EA5E9",

  // Neutrals
  white: "#FFFFFF",
  black: "#000000",

  // Light Mode
  light: {
    bg: "#F8FAFC",
    bgSecondary: "#F1F5F9",
    text: "#1E293B",
    textSecondary: "#64748B",
    textTertiary: "#94A3B8",
    border: "#E2E8F0",
    borderLight: "#F1F5F9",
    surface: "#FFFFFF",
    surfaceHover: "#F8FAFC",
  },

  // Dark Mode
  dark: {
    bg: "#0F172A",
    bgSecondary: "#1E293B",
    text: "#F1F5F9",
    textSecondary: "#CBD5E1",
    textTertiary: "#94A3B8",
    border: "#334155",
    borderLight: "#1E293B",
    surface: "#1E293B",
    surfaceHover: "#334155",
  },

  // Glassmorphism
  glass: {
    light: "rgba(255, 255, 255, 0.7)",
    dark: "rgba(30, 41, 59, 0.7)",
    lightBorder: "rgba(255, 255, 255, 0.18)",
    darkBorder: "rgba(255, 255, 255, 0.1)",
  },

  // Gradients
  gradient: {
    primary: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
    secondary: "linear-gradient(135deg, #7C3AED 0%, #0EA5E9 100%)",
    success: "linear-gradient(135deg, #22C55E 0%, #10B981 100%)",
    warning: "linear-gradient(135deg, #F59E0B 0%, #F97316 100%)",
  },

  // Semantic Colors
  success_light: "#DCFCE7",
  success_dark: "#064E3B",
  warning_light: "#FEF3C7",
  warning_dark: "#78350F",
  danger_light: "#FEE2E2",
  danger_dark: "#7F1D1D",
  info_light: "#CFF0FF",
  info_dark: "#082F49",
};

export type ColorMode = "light" | "dark";
