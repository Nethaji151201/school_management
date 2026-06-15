import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Typography,
  Button,
  Slide,
  type SlideProps,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { styled } from "@mui/material/styles";

const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(1),
  padding: theme.spacing(1.5, 2),
  background: `linear-gradient(90deg, ${theme.palette.background.paper}, ${theme.palette.primary.light})`,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Transition = React.forwardRef(function Transition(
  props: SlideProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export interface ModalFormProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  onSave?: () => void;
  saveLabel?: string;
  maxWidth?: string;
  children?: React.ReactNode;
}

const ModalForm: React.FC<ModalFormProps> = ({
  open,
  title,
  onClose,
  onSave,
  saveLabel = "Save",
  maxWidth = "md",
  children,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth as any}
      slots={{
        transition: Transition,
      }}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: (theme) => theme.shadows[24],
          },
        },
      }}
    >
      <Header>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
        </Box>
        <Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </Header>

      <DialogContent sx={{ p: 3 }}>{children}</DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={onSave}
          color="primary"
        >
          {saveLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalForm;
