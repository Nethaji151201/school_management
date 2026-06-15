import React from "react";
import { alpha, TextField, type TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export interface CustomTextFieldProps extends Omit<TextFieldProps, "variant"> {
  width?: string | number;
  height?: string | number;
  placeholder?: string;
}

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "width" && prop !== "height",
})<{
  width?: string | number;
  height?: string | number;
}>(({ theme, width, height }) => ({
  width: width ?? "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.spacing(0.5),
    backgroundColor: alpha(theme.palette.background.paper, 0.85),
    minHeight: height ? height : 48,
    height: height ? height : "auto",
    padding: 0,
    "& fieldset": {
      borderColor: alpha(theme.palette.text.primary, 0.16),
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      boxShadow: `${alpha(theme.palette.primary.main, 0.15)} 0 0 0 2px`,
    },
  },
  "& .MuiInputBase-input": {
    height: "100%",
    padding: theme.spacing(1.25, 1.5),
    fontSize: "0.95rem",
  },
}));

const CustomTextField = React.forwardRef<HTMLElement, CustomTextFieldProps>(
  ({ width = "100%", height = 32, placeholder, sx, ...props }, ref) => {
    return (
      <StyledTextField
        ref={ref as any}
        variant="outlined"
        placeholder={placeholder}
        width={width}
        height={height}
        sx={{ ...sx }}
        {...props}
      />
    );
  },
);

CustomTextField.displayName = "CustomTextField";

export default CustomTextField;
