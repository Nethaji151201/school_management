import React from "react";
import { Autocomplete, type AutocompleteProps } from "@mui/material";
import CustomTextField from "./CustomTextField";

export interface CustomAutocompleteProps<
  T,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false
> extends Omit<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, "renderInput"> {
  placeholder?: string;
  width?: string | number;
  height?: string | number;
  error?: boolean;
  helperText?: React.ReactNode;
}

export const CustomAutocomplete = <
  T,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false
>({
  placeholder,
  width = "100%",
  height = 32,
  error,
  helperText,
  sx,
  ...props
}: CustomAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) => {
  return (
    <Autocomplete
      {...props}
      sx={{
        width,
        ...sx,
        // Synchronize Autocomplete layout with CustomTextField design system
        "& .MuiOutlinedInput-root": {
          padding: "0 36px 0 8px !important", // Spacing for endAdornments (clear + arrows)
          minHeight: height,
        },
        "& .MuiAutocomplete-endAdornment": {
          right: "8px !important",
        },
      }}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          height={height}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: "auto",
            },
          }}
        />
      )}
    />
  );
};

export default CustomAutocomplete;
