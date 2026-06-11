import React from "react";
import { Card as MuiCard, type CardProps as MuiCardProps } from "@mui/material";
import { useThemeStore } from "../../store/themeStore";
import { COLORS } from "../../theme/colors";

interface CustomCardProps extends MuiCardProps {
  glassEffect?: boolean;
}

const Card: React.FC<CustomCardProps> = ({
  glassEffect = true,
  children,
  sx,
  ...props
}) => {
  const { mode } = useThemeStore();
  const isDark = mode === "dark";

  const glassStyle = glassEffect
    ? {
        backgroundImage: isDark
          ? `linear-gradient(135deg, ${COLORS.glass.dark} 0%, ${COLORS.glass.dark} 100%)`
          : `linear-gradient(135deg, ${COLORS.glass.light} 0%, ${COLORS.glass.light} 100%)`,
        backdropFilter: "blur(10px)",
        border: `1px solid ${isDark ? COLORS.glass.darkBorder : COLORS.glass.lightBorder}`,
      }
    : {};

  return (
    <MuiCard
      {...props}
      sx={{
        ...glassStyle,
        ...sx,
      }}
    >
      {children}
    </MuiCard>
  );
};

export default Card;
