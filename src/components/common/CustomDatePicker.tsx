import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, type DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import dayjs, { type Dayjs } from "dayjs";
import { COLORS } from "../../theme/colors";

export interface CustomDatePickerProps extends Omit<DatePickerProps, "onChange" | "value"> {
  placeholder?: string;
  width?: string | number;
  height?: string | number;
  error?: boolean;
  helperText?: React.ReactNode;
  value?: string | Date | Dayjs | null;
  onChange?: (date: Dayjs | null) => void;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  placeholder,
  width = "100%",
  height = 32,
  error,
  helperText,
  value,
  onChange,
  slotProps,
  sx,
  ...props
}) => {
  // Parse date safely using dayjs
  const parsedValue = value ? dayjs(value) : null;

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
            sx: {
              width,
              ...(slotProps?.textField as any)?.sx,
              ...sx,
              // Integrate CustomTextField design styles
              "& .MuiOutlinedInput-root": {
                height: height,
                minHeight: height,
                padding: "0 10px 0 0 !important", // Offset for date picker icon
                borderRadius: "4px",
                "& fieldset": {
                  borderColor: "rgba(0, 0, 0, 0.16)",
                },
                "&:hover fieldset": {
                  borderColor: COLORS.primary,
                },
                "&.Mui-focused fieldset": {
                  borderColor: COLORS.primary,
                  boxShadow: `0 0 0 2px ${COLORS.primary}25`,
                },
              },
              "& .MuiInputBase-input": {
                padding: "6px 12px",
                fontSize: "0.95rem",
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
