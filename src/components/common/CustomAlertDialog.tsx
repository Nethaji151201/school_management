import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  Slide,
  CircularProgress,
  type SlideProps,
} from "@mui/material";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useThemeStore } from "../../store/themeStore";
import { COLORS } from "../../theme/colors";

const TopToCenterTransition = React.forwardRef(function TopToCenterTransition(
  props: SlideProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return (
    <Slide
      direction="down"
      ref={ref}
      timeout={{ enter: 180, exit: 120 }}
      {...props}
    />
  );
});

export type AlertDialogType = "confirm" | "delete" | "warning" | "info" | "success";

export interface CustomAlertDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title?: string;
  message?: React.ReactNode;
  type?: AlertDialogType;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
}

export const CustomAlertDialog: React.FC<CustomAlertDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  type = "confirm",
  confirmLabel,
  cancelLabel = "Cancel",
  isLoading = false,
}) => {
  const { primaryColor, baseMode } = useThemeStore();
  const isDark = baseMode === "dark";
  const activePrimary = primaryColor || COLORS.primary;
  const borderColor = isDark ? "#334155" : "#E2E8F0";

  // Type configuration
  const getTypeConfig = () => {
    switch (type) {
      case "delete":
        return {
          defaultTitle: "Confirm Delete",
          defaultConfirm: "Delete",
          icon: <DeleteOutlinedIcon sx={{ fontSize: 32, color: "#EF4444" }} />,
          iconBg: isDark ? "rgba(239, 68, 68, 0.15)" : "#FEE2E2",
          confirmBg: "#EF4444",
          confirmHoverBg: "#DC2626",
          confirmColor: "#FFFFFF",
          confirmIcon: <DeleteIcon sx={{ fontSize: 17 }} />,
        };
      case "warning":
        return {
          defaultTitle: "Warning",
          defaultConfirm: "Proceed",
          icon: <WarningAmberIcon sx={{ fontSize: 32, color: "#F59E0B" }} />,
          iconBg: isDark ? "rgba(245, 158, 11, 0.15)" : "#FEF3C7",
          confirmBg: "#F59E0B",
          confirmHoverBg: "#D97706",
          confirmColor: "#FFFFFF",
          confirmIcon: <SaveIcon sx={{ fontSize: 17 }} />,
        };
      case "info":
        return {
          defaultTitle: "Information",
          defaultConfirm: "OK",
          icon: <InfoOutlinedIcon sx={{ fontSize: 32, color: "#0284C7" }} />,
          iconBg: isDark ? "rgba(2, 132, 199, 0.15)" : "#E0F2FE",
          confirmBg: "#0284C7",
          confirmHoverBg: "#0369A1",
          confirmColor: "#FFFFFF",
          confirmIcon: null,
        };
      case "success":
        return {
          defaultTitle: "Success",
          defaultConfirm: "Continue",
          icon: <CheckCircleOutlinedIcon sx={{ fontSize: 32, color: "#16A34A" }} />,
          iconBg: isDark ? "rgba(22, 163, 74, 0.15)" : "#DCFCE7",
          confirmBg: "#16A34A",
          confirmHoverBg: "#15803D",
          confirmColor: "#FFFFFF",
          confirmIcon: null,
        };
      case "confirm":
      default:
        return {
          defaultTitle: "Confirm Save",
          defaultConfirm: "Save",
          icon: <HelpOutlinedIcon sx={{ fontSize: 32, color: activePrimary }} />,
          iconBg: isDark ? "rgba(190, 18, 60, 0.15)" : "rgba(190, 18, 60, 0.08)",
          confirmBg: activePrimary,
          confirmHoverBg: activePrimary,
          confirmColor: "#FFFFFF",
          confirmIcon: <SaveIcon sx={{ fontSize: 17 }} />,
        };
    }
  };

  const config = getTypeConfig();
  const displayTitle = title || config.defaultTitle;
  const displayConfirmLabel = confirmLabel || config.defaultConfirm;

  const handleConfirmClick = async () => {
    await onConfirm();
  };

  return (
    <Dialog
      open={open}
      onClose={isLoading ? undefined : onClose}
      maxWidth="xs"
      fullWidth
      slots={{
        transition: TopToCenterTransition,
      }}
      transitionDuration={{ enter: 180, exit: 120 }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: isDark
              ? "rgba(0, 0, 0, 0.75)"
              : "rgba(15, 23, 42, 0.45)",
            backdropFilter: "blur(2px)",
          },
        },
        paper: {
          sx: {
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: isDark
              ? "0 24px 70px rgba(0,0,0,0.6)"
              : "0 20px 60px rgba(0,0,0,0.15)",
            backgroundColor: isDark ? "#111827" : "#FFFFFF",
            border: `1px solid ${borderColor}`,
            p: 0,
          },
        },
      }}
    >
      <DialogContent sx={{ p: 3, pb: 2 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          {/* Status Icon */}
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "12px",
              backgroundColor: config.iconBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {config.icon}
          </Box>

          {/* Title & Message */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75, flexGrow: 1 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "1.05rem",
                color: isDark ? "#F8FAFC" : "#0F172A",
                fontFamily: '"Roboto", sans-serif',
              }}
            >
              {displayTitle}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.88rem",
                color: isDark ? "#94A3B8" : "#64748B",
                lineHeight: 1.5,
              }}
            >
              {message || "Are you sure you want to proceed with this action?"}
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      {/* Right-Aligned Action Buttons */}
      <DialogActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 1.5,
          px: 3,
          py: 1.8,
          borderTop: `1px solid ${borderColor}`,
          backgroundColor: isDark ? "#1E293B" : "#F8FAFC",
          m: 0,
        }}
      >
        {/* Cancel Button */}
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={isLoading}
          startIcon={<ArrowBackIcon sx={{ fontSize: 17, color: isDark ? "#CBD5E1" : "#475569" }} />}
          sx={{
            height: 36,
            px: 2,
            borderRadius: "6px",
            borderColor: isDark ? "#334155" : "#CBD5E1",
            backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
            color: isDark ? "#F8FAFC" : "#334155",
            fontWeight: 600,
            fontSize: "0.85rem",
            textTransform: "none",
            "&:hover": {
              borderColor: isDark ? "#64748B" : "#94A3B8",
              backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : "#F8FAFC",
            },
          }}
        >
          {cancelLabel}
        </Button>

        {/* Confirm Action Button */}
        <Button
          variant="contained"
          onClick={handleConfirmClick}
          disabled={isLoading}
          startIcon={
            isLoading ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              config.confirmIcon
            )
          }
          sx={{
            height: 36,
            px: 2.5,
            borderRadius: "6px",
            backgroundColor: config.confirmBg,
            color: config.confirmColor,
            fontWeight: 700,
            fontSize: "0.85rem",
            textTransform: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
            "&:hover": {
              backgroundColor: config.confirmHoverBg,
              opacity: 0.92,
              boxShadow: "0 4px 12px rgba(0,0,0,0.22)",
            },
          }}
        >
          {isLoading ? "Processing..." : displayConfirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomAlertDialog;
