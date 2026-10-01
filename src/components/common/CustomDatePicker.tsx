import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, type DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import dayjs, { type Dayjs } from "dayjs";
import { useThemeStore } from "../../store/themeStore";
import { useTheme, alpha } from "@mui/material";

export interface CustomDatePickerProps
  extends Omit<DatePickerProps, "onChange" | "value"> {
  placeholder?: string;
  width?: string | number;
  height?: string | number;
  error?: boolean;
  helperText?: React.ReactNode;
  value?: string | Date | Dayjs | null;
  onChange?: (date: Dayjs | null) => void;
  tabIndex?: number;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  placeholder,
  width = "100%",
  height = 36,
  error,
  helperText,
  value,
  onChange,
  tabIndex,
  slotProps,
  sx,
  ...props
}) => {
  const { primaryColor } = useThemeStore();
  const muiTheme = useTheme();
  const isDark = muiTheme.palette.mode === "dark";
  const activePrimary = primaryColor || muiTheme.palette.primary.main || "#BE123C";

  // Parse date safely using dayjs
  const parsedValue = value ? (dayjs.isDayjs(value) ? value : dayjs(value)) : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        {...props}
        value={parsedValue}
        onChange={(newValue) => onChange?.(newValue)}
        slotProps={{
          ...slotProps,
          textField: {
            ...(slotProps?.textField as any),
            size: "small",
            error,
            helperText,
            placeholder: placeholder || "Select Date",
            inputProps: {
              ...(slotProps?.textField as any)?.inputProps,
              tabIndex,
            },
            sx: {
              width,
              ...(slotProps?.textField as any)?.sx,
              ...sx,
              "& .MuiOutlinedInput-root": {
                height: height,
                minHeight: height,
                padding: "0 6px 0 0 !important",
                borderRadius: "6px",
                backgroundColor: isDark ? alpha("#111827", 0.85) : "#ffffff",
                transition: "all 0.2s ease-in-out",
                "& fieldset": {
                  borderColor: isDark ? "#334155" : "#cbd5e1",
                  transition:
                    "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                },
                "&:hover fieldset": {
                  borderColor: activePrimary,
                },
                "&.Mui-focused fieldset": {
                  borderColor: `${activePrimary} !important`,
                  boxShadow: `0 0 0 3px ${alpha(activePrimary, 0.18)}`,
                },
              },
              "& .MuiInputBase-input": {
                padding: "8px 12px",
                fontSize: "0.82rem",
                fontFamily: '"Roboto", sans-serif',
                color: isDark ? "#f8fafc" : "#0f172a",
                "&::placeholder": {
                  color: isDark ? "#64748b" : "#94a3b8",
                  opacity: 1,
                },
              },
              "& .MuiSvgIcon-root": {
                fontSize: "18px",
                color: isDark ? "#94a3b8" : "#64748b",
              },
              "& .MuiInputAdornment-root": {
                margin: 0,
              },
            },
          } as any,
        }}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
