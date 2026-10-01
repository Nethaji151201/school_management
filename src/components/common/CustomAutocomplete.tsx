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
  width?: string | number | Record<string, string | number>;
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
  height = 36,
  error,
  helperText,
  sx,
  ...props
}: CustomAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) => {
  return (
    <Autocomplete
      {...props}
      sx={{
        width: (width as any) ?? "100%",
        ...sx,
        "& .MuiOutlinedInput-root": {
          padding: "0 34px 0 6px !important",
          minHeight: height,
          height: height,
        },
        "& .MuiAutocomplete-endAdornment": {
          right: "6px !important",
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
              height: height,
            },
          }}
        />
      )}
    />
  );
};

export default CustomAutocomplete;
