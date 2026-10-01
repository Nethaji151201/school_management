import React from "react";
import { alpha, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useThemeStore } from "../../store/themeStore";
import { COLORS } from "../../theme/colors";

export interface CustomTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  width?: string | number | Record<string, string | number>;
  rows?: number;
}

const StyledNativeTextarea = styled("textarea", {
  shouldForwardProp: (prop) =>
    prop !== "customWidth" && prop !== "activePrimary" && prop !== "customRows",
})<{
  customWidth?: string | number | Record<string, string | number>;
  activePrimary?: string;
  customRows?: number;
}>(({ theme, customWidth, activePrimary, customRows = 2 }) => {
  const isDark = theme.palette.mode === "dark";
  const primary = activePrimary || theme.palette.primary.main || COLORS.primary;
  const calculatedMinHeight = `${Math.max(customRows * 24 + 16, 60)}px`;

  return {
    width: (customWidth as any) ?? "100%",
    minHeight: calculatedMinHeight,
    boxSizing: "border-box",
    borderRadius: "6px",
    backgroundColor: isDark ? alpha("#111827", 0.85) : "#ffffff",
    border: `1px solid ${isDark ? "#334155" : "#cbd5e1"}`,
    padding: "8px 12px",
    fontFamily: '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: "0.82rem",
    lineHeight: 1.5,
    color: isDark ? "#f8fafc" : "#0f172a",
    outline: "none",
    resize: "vertical",
    display: "block",
    transition:
      "border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease",

    "&::placeholder": {
      color: isDark ? "#64748b" : "#94a3b8",
      opacity: 1,
      fontFamily: '"Roboto", sans-serif',
      fontSize: "0.82rem",
    },

    "&:hover": {
      borderColor: primary,
    },

    "&:focus": {
      backgroundColor: isDark ? alpha("#111827", 0.95) : "#ffffff",
      borderColor: primary,
      boxShadow: `0 0 0 3px ${alpha(primary, 0.18)}`,
    },

    "&:disabled": {
      backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
      borderColor: isDark ? "#334155" : "#e2e8f0",
      color: isDark ? "#64748b" : "#94a3b8",
      cursor: "not-allowed",
      resize: "none",
    },
  };
});

export const CustomTextarea = React.forwardRef<
  HTMLTextAreaElement,
  CustomTextareaProps
>(({ width = "100%", rows = 2, placeholder, style, ...props }, ref) => {
  const { primaryColor } = useThemeStore();
  const theme = useTheme();
  const activePrimary = primaryColor || theme.palette.primary.main || COLORS.primary;

  return (
    <StyledNativeTextarea
      ref={ref}
      rows={rows}
      customRows={rows}
      customWidth={width}
      activePrimary={activePrimary}
      placeholder={placeholder}
      style={style}
      {...props}
    />
  );
});

CustomTextarea.displayName = "CustomTextarea";

export default CustomTextarea;
