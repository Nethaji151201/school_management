import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  IconButton,
  Button,
  Slide,
  type DialogProps,
  type SlideProps,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import RefreshIcon from "@mui/icons-material/Refresh";
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

export interface CustomDialogProps extends Omit<DialogProps, "title"> {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  headerIcon?: React.ReactNode;
  headerExtra?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  fullWidth?: boolean;
  contentPadding?: number | string;
  maxContentHeight?: number | string;
  hideHeader?: boolean;
  hideCloseButton?: boolean;
  // Built-in actions
  actions?: React.ReactNode;
  onSave?: () => void;
  onReset?: () => void;
  onDelete?: () => void;
  saveLabel?: string;
  resetLabel?: string;
  deleteLabel?: string;
  closeLabel?: string;
  showSave?: boolean;
  showReset?: boolean;
  showDelete?: boolean;
  showClose?: boolean;
  isSaving?: boolean;
}

export const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  onClose,
  title,
  headerIcon,
  headerExtra,
  children,
  maxWidth = "md",
  fullWidth = true,
  contentPadding = 2.5,
  maxContentHeight = "78vh",
  hideHeader = false,
  hideCloseButton = false,
  actions,
  onSave,
  onReset,
  onDelete,
  saveLabel = "Save",
  resetLabel = "Reset",
  deleteLabel = "Delete",
  closeLabel = "Back",
  showSave = Boolean(onSave),
  showReset = Boolean(onReset),
  showDelete = Boolean(onDelete),
  showClose = true,
  isSaving = false,
  slotProps,
  ...dialogProps
}) => {
  const { primaryColor, baseMode } = useThemeStore();
  const isDark = baseMode === "dark";
  const activePrimary = primaryColor || COLORS.primary;
  const borderColor = isDark ? "#334155" : "#E2E8F0";

  const hasFooter = Boolean(actions || showSave || showReset || showDelete || showClose);

  // Neutral Outline Button Style for Back & Reset
  const neutralButtonStyle = {
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
    "&.Mui-disabled": {
      opacity: 0.6,
      color: isDark ? "#64748B" : "#94A3B8",
      borderColor: isDark ? "#1E293B" : "#E2E8F0",
    },
  };

  // Delete Outline Button Style
  const deleteButtonStyle = {
    height: 36,
    px: 2,
    borderRadius: "6px",
    borderColor: isDark ? "rgba(239, 68, 68, 0.4)" : "#FECDD3",
    backgroundColor: isDark ? "rgba(239, 68, 68, 0.1)" : "#FFF1F2",
    color: "#EF4444",
    fontWeight: 700,
    fontSize: "0.85rem",
    textTransform: "none",
    "&:hover": {
      borderColor: "#EF4444",
      backgroundColor: isDark ? "rgba(239, 68, 68, 0.2)" : "#FEE2E2",
    },
  };

  // Save Filled Button Style
  const saveButtonStyle = {
    height: 36,
    px: 2.5,
    borderRadius: "6px",
    backgroundColor: activePrimary,
    color: "#FFFFFF",
    fontWeight: 700,
    fontSize: "0.85rem",
    textTransform: "none",
    boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
    "&:hover": {
      backgroundColor: activePrimary,
      opacity: 0.92,
      boxShadow: "0 4px 12px rgba(0,0,0,0.22)",
    },
    "&.Mui-disabled": {
      opacity: 0.6,
      color: "#FFFFFF",
      backgroundColor: activePrimary,
    },
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      slots={{
        transition: TopToCenterTransition,
      }}
      transitionDuration={{ enter: 180, exit: 120 }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: isDark
              ? "rgba(0, 0, 0, 0.7)"
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
            backgroundImage: "none",
            border: `1px solid ${borderColor}`,
            ...(slotProps?.paper as any)?.sx,
          },
        },
        ...slotProps,
      }}
      {...dialogProps}
    >
      {/* Header */}
      {!hideHeader && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2.5,
            py: 1.25,
            borderBottom: `1px solid ${borderColor}`,
            backgroundColor: isDark ? "#1E293B" : "#F8FAFC",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            {headerIcon}
            {typeof title === "string" ? (
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  fontSize: "1rem",
                  color: isDark ? "#F8FAFC" : "#0F172A",
                  fontFamily: '"Roboto", sans-serif',
                  letterSpacing: "-0.01em",
                }}
              >
                {title}
              </Typography>
            ) : (
              title
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {headerExtra}
            {!hideCloseButton && (
              <IconButton
                size="small"
                onClick={onClose}
                aria-label="Close dialog"
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: COLORS.danger },
                  transition: "color 0.15s ease",
                }}
              >
                <CloseIcon sx={{ fontSize: 20 }} />
              </IconButton>
            )}
          </Box>
        </Box>
      )}

      {/* Content Area with smooth scrolling */}
      <DialogContent
        sx={{
          p: contentPadding,
          maxHeight: maxContentHeight,
          overflowY: "auto",
          overflowX: "hidden",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
            borderRadius: "4px",
          },
        }}
      >
        {children}
      </DialogContent>

      {/* Right-Aligned Footer Actions matching screenshot: [Back] [Reset] [Delete] [Save] */}
      {hasFooter && (
        <DialogActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 1.5,
            px: 2.5,
            py: 1.25,
            borderTop: `1px solid ${borderColor}`,
            backgroundColor: isDark ? "#1E293B" : "#F8FAFC",
            m: 0,
          }}
        >
          {actions ? (
            actions
          ) : (
            <>
              {/* 1. Back Button */}
              {showClose && (
                <Button
                  variant="outlined"
                  onClick={onClose}
                  startIcon={<ArrowBackIcon sx={{ fontSize: 17, color: isDark ? "#CBD5E1" : "#475569" }} />}
                  sx={neutralButtonStyle}
                >
                  {closeLabel}
                </Button>
              )}

              {/* 2. Reset Button */}
              {showReset && (
                <Button
                  variant="outlined"
                  onClick={onReset}
                  startIcon={<RefreshIcon sx={{ fontSize: 17, color: isDark ? "#CBD5E1" : "#475569" }} />}
                  sx={neutralButtonStyle}
                >
                  {resetLabel}
                </Button>
              )}

              {/* 3. Delete Button (Optional) */}
              {showDelete && (
                <Button
                  variant="outlined"
                  onClick={onDelete}
                  startIcon={<DeleteIcon sx={{ fontSize: 17, color: "#EF4444" }} />}
                  sx={deleteButtonStyle}
                >
                  {deleteLabel}
                </Button>
              )}

              {/* 4. Save Button */}
              {showSave && (
                <Button
                  variant="contained"
                  onClick={onSave}
                  disabled={isSaving}
                  startIcon={<SaveIcon sx={{ fontSize: 17, color: "#FFFFFF" }} />}
                  sx={saveButtonStyle}
                >
                  {isSaving ? "Saving..." : saveLabel}
                </Button>
              )}
            </>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default CustomDialog;
