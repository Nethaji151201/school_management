import React from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Slide,
  type SlideProps,
  Tabs,
  Tab,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { alpha, styled } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "../../store/themeStore";
import { COLORS } from "../../theme/colors";

const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(1),
  padding: theme.spacing(2, 3),
  backgroundColor: alpha(theme.palette.text.primary, 0.02),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Footer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: theme.spacing(2),
  padding: theme.spacing(2, 3),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

const RoundActionButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "actionVariant" && prop !== "customPrimary",
})<{ actionVariant?: "save" | "cancel"; customPrimary?: string }>(
  ({ actionVariant, customPrimary }) => {
    const primary = customPrimary || COLORS.primary;
    return {
      width: 44,
      height: 44,
      borderRadius: "50%",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      ...(actionVariant === "save"
        ? {
            backgroundColor: primary,
            color: "#fff",
            "&:hover": {
              backgroundColor: primary,
              transform: "scale(1.08) translateY(-2px)",
              boxShadow: `0 6px 16px ${alpha(primary, 0.4)}`,
            },
          }
        : {
            backgroundColor: "rgba(100, 116, 139, 0.15)",
            color: "rgba(100, 116, 139, 0.8)",
            "&:hover": {
              backgroundColor: "rgba(100, 116, 139, 0.25)",
              transform: "scale(1.08) translateY(-2px)",
              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.08)",
            },
          }),
    };
  },
);

const Transition = React.forwardRef(function Transition(
  props: SlideProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export interface ModalFormTab {
  id: string;
  label: string;
}

export interface ModalFormProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  onSave?: () => void;
  saveLabel?: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  tabs?: ModalFormTab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  headerIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const ModalForm: React.FC<ModalFormProps> = ({
  open,
  title,
  onClose,
  onSave,
  maxWidth = "lg",
  tabs,
  activeTab,
  onTabChange,
  headerIcon,
  children,
}) => {
  const { primaryColor } = useThemeStore();
  const activePrimary = primaryColor || COLORS.primary;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      slots={{
        transition: Transition,
      }}
      slotProps={{
        paper: {
          sx: {
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 24px 70px rgba(0,0,0,0.15)",
          },
        },
      }}
    >
      <Header>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            color: "text.primary",
            letterSpacing: "-0.01em",
            fontFamily: '"Roboto", sans-serif',
          }}
        >
          {title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {headerIcon}
          <IconButton
            onClick={onClose}
            size="small"
            aria-label="Close dialog"
            sx={{
              color: "text.secondary",
              "&:hover": { color: COLORS.danger },
              transition: "color 0.2s",
            }}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </Header>

      {tabs && tabs.length > 0 && (
        <Box
          sx={{
            px: 3,
            py: 1.5,
            borderBottom: "1px solid",
            borderColor: "divider",
            backgroundColor: (theme) => alpha(theme.palette.text.primary, 0.01),
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => onTabChange?.(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              minHeight: "auto",
              "& .MuiTabs-indicator": {
                display: "none",
              },
              "& .MuiTabs-flexContainer": {
                gap: 1.25,
              },
            }}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                value={tab.id}
                label={tab.label}
                sx={{
                  minHeight: "auto",
                  minWidth: "auto",
                  textTransform: "none",
                  fontWeight: 650,
                  fontSize: "0.85rem",
                  fontFamily: '"Roboto", sans-serif',
                  borderRadius: "20px",
                  color: "text.secondary",
                  px: 2.2,
                  py: 0.8,
                  whiteSpace: "nowrap",
                  transition: "all 0.2s ease-in-out",
                  "&.Mui-selected": {
                    color: "#fff !important",
                    backgroundColor: activePrimary,
                    boxShadow: `0 4px 12px ${alpha(activePrimary, 0.35)}`,
                  },
                  "&:hover:not(.Mui-selected)": {
                    color: "text.primary",
                    backgroundColor: "action.hover",
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>
      )}

      {/* Center Content with Static Fixed Height (card height does not change on tab switch) */}
      <DialogContent
        sx={{
          p: 0,
          backgroundColor: "background.paper",
          height: 480,
          minHeight: 480,
          maxHeight: 480,
          overflowY: "auto",
          overflowX: "hidden",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(100, 116, 139, 0.2)",
            borderRadius: "4px",
          },
        }}
      >
        <Box
          sx={{
            p: 3.5,
            minHeight: "100%",
            boxSizing: "border-box",
          }}
        >
          {activeTab ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                style={{ width: "100%" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          ) : (
            children
          )}
        </Box>
      </DialogContent>

      <Footer>
        <RoundActionButton
          actionVariant="cancel"
          onClick={onClose}
          aria-label="Cancel"
        >
          <CloseIcon fontSize="small" />
        </RoundActionButton>
        <RoundActionButton
          actionVariant="save"
          customPrimary={activePrimary}
          onClick={onSave}
          aria-label="Save"
        >
          <SaveIcon fontSize="small" />
        </RoundActionButton>
      </Footer>
    </Dialog>
  );
};

export default ModalForm;
