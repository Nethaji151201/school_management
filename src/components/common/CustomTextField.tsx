import React from "react";
import { alpha, TextField, type TextFieldProps, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useThemeStore } from "../../store/themeStore";

export interface CustomTextFieldProps extends Omit<TextFieldProps, "variant"> {
  width?: string | number | Record<string, string | number>;
  height?: string | number;
  placeholder?: string;
}

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "width" && prop !== "height" && prop !== "activePrimary",
})<{
  width?: string | number | Record<string, string | number>;
  height?: string | number;
  activePrimary?: string;
}>(({ theme, width, height, activePrimary }) => {
  const isDark = theme.palette.mode === "dark";
  const primary = activePrimary || theme.palette.primary.main || "#BE123C";

  return {
    width: (width as any) ?? "100%",
    "& .MuiOutlinedInput-root": {
      borderRadius: "6px",
      backgroundColor: isDark ? alpha("#111827", 0.85) : "#ffffff",
      minHeight: height ? height : 36,
      height: height ? height : "auto",
      padding: 0,
      fontFamily: '"Roboto", sans-serif',
      fontSize: "0.85rem",
      transition:
        "background-color 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
      "& fieldset": {
        borderColor: isDark ? "#334155" : "#cbd5e1",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
      },
      "&:hover fieldset": {
        borderColor: primary,
      },
      "&.Mui-focused": {
        backgroundColor: isDark ? alpha("#111827", 0.95) : "#ffffff",
        "& fieldset": {
          borderColor: `${primary} !important`,
          boxShadow: `0 0 0 3px ${alpha(primary, 0.18)}`,
        },
      },
      "&:active fieldset": {
        borderColor: primary,
      },
    },
    "& .MuiInputBase-input": {
      height: "100%",
      padding: "8px 12px",
      fontSize: "0.82rem",
      fontFamily: '"Roboto", sans-serif',
      color: isDark ? "#f8fafc" : "#0f172a",
      transition: "color 0.2s ease-in-out",
      "&::placeholder": {
        color: isDark ? "#64748b" : "#94a3b8",
        opacity: 1,
      },
    },
  };
});

const CustomTextField = React.forwardRef<HTMLElement, CustomTextFieldProps>(
  ({ width = "100%", height = 36, placeholder, sx, ...props }, ref) => {
    const { primaryColor } = useThemeStore();
    const theme = useTheme();
    const activePrimary = primaryColor || theme.palette.primary.main || "#BE123C";

    return (
      <StyledTextField
        ref={ref as any}
        variant="outlined"
        placeholder={placeholder}
        width={width}
        height={height}
        activePrimary={activePrimary}
        sx={{ ...sx }}
        {...props}
      />
    );
  },
);

CustomTextField.displayName = "CustomTextField";

export default CustomTextField;
