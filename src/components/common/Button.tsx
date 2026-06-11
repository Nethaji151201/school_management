import React from "react";
import {
  Button as MuiButton,
  type ButtonProps as MuiButtonProps,
} from "@mui/material";
import { motion } from "framer-motion";
import { COLORS } from "../../theme/colors";

interface CustomButtonProps extends MuiButtonProps {
  isLoading?: boolean;
  isGradient?: boolean;
  size?: "small" | "medium" | "large";
}

const Button: React.FC<CustomButtonProps> = ({
  isLoading,
  isGradient,
  children,
  disabled,
  ...props
}) => {
  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      <MuiButton
        {...props}
        disabled={disabled || isLoading}
        sx={{
          backgroundImage: isGradient ? COLORS.gradient.primary : undefined,
          fontWeight: 600,
          textTransform: "none",
          fontSize: "0.875rem",
          ...props.sx,
        }}
      >
        {isLoading ? "Loading..." : children}
      </MuiButton>
    </motion.div>
  );
};

export default Button;
