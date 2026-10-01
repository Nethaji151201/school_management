import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";

import CustomDialog from "../../common/CustomDialog";
import CustomTextField from "../../common/CustomTextField";
import CustomDatePicker from "../../common/CustomDatePicker";
import { useThemeStore } from "../../../store/themeStore";

export interface TeacherContributionRecord {
  id: string;
  studentId: string;
  studentName: string;
  parentName: string;
  studentClass: string;
  section: string;
  group?: string;
  academicYear: string;
  paidOn?: string;
  feesType?: string;
  amountPaid?: number;
}

export interface AddTeachersContributionProps {
  open: boolean;
  record?: TeacherContributionRecord | null;
  onClose: () => void;
  onSaveSuccess?: () => void;
}

const AddTeachersContribution: React.FC<AddTeachersContributionProps> = ({
  open,
  record,
  onClose,
  onSaveSuccess,
}) => {
  const { baseMode } = useThemeStore();
  const isDark = baseMode === "dark";
  const borderColor = isDark ? "#334155" : "#CBD5E1";

  // Form Field States
  const [studentId, setStudentId] = useState("01193");
  const [studentName, setStudentName] = useState("Arshith V");
  const [studentClass, setStudentClass] = useState("JKG");
  const [academicYear, setAcademicYear] = useState("2024-25");
  const [paidOn, setPaidOn] = useState<string>("2026-09-30");
  const [feesType, setFeesType] = useState("Voluntary Contribution");
  const [amountPaid, setAmountPaid] = useState<number | string>(0);

  useEffect(() => {
    if (record) {
      setStudentId(record.studentId || "01193");
      setStudentName(record.studentName || "Arshith V");
      setStudentClass(record.studentClass || "JKG");
      setAcademicYear(record.academicYear || "2024-25");
      setPaidOn(record.paidOn || "2026-09-30");
      setFeesType(record.feesType || "Voluntary Contribution");
      setAmountPaid(record.amountPaid ?? 0);
    }
  }, [record]);

  const handleReset = () => {
    if (record) {
      setPaidOn(record.paidOn || "2026-09-30");
      setAmountPaid(record.amountPaid ?? 0);
    } else {
      setPaidOn("2026-09-30");
      setAmountPaid(0);
    }
    toast.success("Form reset to original values");
  };

  const handleSave = () => {
    if (Number(amountPaid) < 0) {
      toast.error("Amount paid cannot be negative");
      return;
    }
    toast.success(`Teacher contribution for ${studentName} (${studentId}) saved successfully!`);
    if (onSaveSuccess) onSaveSuccess();
    onClose();
  };

  const readonlyInputStyle = {
    backgroundColor: isDark ? "rgba(255, 255, 255, 0.04)" : "#F1F5F9",
    color: isDark ? "#94A3B8" : "#475569",
    cursor: "default",
    userSelect: "none" as const,
    fontWeight: 500,
  };

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title="Teachers Contribution"
      maxWidth="sm"
      onSave={handleSave}
      onReset={handleReset}
      saveLabel="Save"
      resetLabel="Reset"
      closeLabel="Back"
      contentPadding={2.5}
    >
      {/* Fieldset EDIT Box */}
      <Box
        component="fieldset"
        sx={{
          border: `1px solid ${borderColor}`,
          borderRadius: "6px",
          p: { xs: 2, sm: 2.5 },
          pt: { xs: 1.5, sm: 2 },
          m: 0,
          backgroundColor: isDark ? "rgba(255, 255, 255, 0.01)" : "#FFFFFF",
        }}
      >
        <Typography
          component="legend"
          sx={{
            px: 1,
            fontWeight: 700,
            fontSize: "0.82rem",
            letterSpacing: "0.05em",
            color: isDark ? "#94A3B8" : "#475569",
            fontFamily: '"Roboto", sans-serif',
          }}
        >
          EDIT
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.8, mt: 1 }}>
          {/* 1. Student ID (Readonly) */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "140px 1fr" },
              alignItems: "center",
              gap: { xs: 0.5, sm: 2 },
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "0.85rem",
                color: isDark ? "#E2E8F0" : "#334155",
                fontFamily: '"Roboto", sans-serif',
              }}
            >
              Student ID
            </Typography>
            <CustomTextField
              value={studentId}
              slotProps={{
                input: {
                  readOnly: true,
                  sx: readonlyInputStyle,
                },
              }}
            />
          </Box>

          {/* 2. Student Name (Readonly) */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "140px 1fr" },
              alignItems: "center",
              gap: { xs: 0.5, sm: 2 },
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "0.85rem",
                color: isDark ? "#E2E8F0" : "#334155",
                fontFamily: '"Roboto", sans-serif',
              }}
            >
              Student Name
            </Typography>
            <CustomTextField
              value={studentName}
              slotProps={{
                input: {
                  readOnly: true,
                  sx: readonlyInputStyle,
                },
              }}
            />
          </Box>

          {/* 3. Class (Readonly) */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "140px 1fr" },
              alignItems: "center",
              gap: { xs: 0.5, sm: 2 },
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "0.85rem",
                color: isDark ? "#E2E8F0" : "#334155",
                fontFamily: '"Roboto", sans-serif',
              }}
            >
              Class
            </Typography>
            <CustomTextField
              value={studentClass}
              slotProps={{
                input: {
                  readOnly: true,
                  sx: readonlyInputStyle,
                },
              }}
            />
          </Box>

          {/* 4. Academic Year (Readonly) */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "140px 1fr" },
              alignItems: "center",
              gap: { xs: 0.5, sm: 2 },
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "0.85rem",
                color: isDark ? "#E2E8F0" : "#334155",
                fontFamily: '"Roboto", sans-serif',
              }}
            >
              Academic Year
            </Typography>
            <CustomTextField
              value={academicYear}
              slotProps={{
                input: {
                  readOnly: true,
                  sx: readonlyInputStyle,
                },
              }}
            />
          </Box>

          {/* 5. Paid On (Editable DatePicker) */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "140px 1fr" },
              alignItems: "center",
              gap: { xs: 0.5, sm: 2 },
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "0.85rem",
                color: isDark ? "#E2E8F0" : "#334155",
                fontFamily: '"Roboto", sans-serif',
              }}
            >
              Paid On
            </Typography>
            <Box sx={{ maxWidth: 220 }}>
              <CustomDatePicker
                value={paidOn}
                onChange={(date) => setPaidOn(date ? date.format("YYYY-MM-DD") : "")}
                placeholder="Paid On"
              />
            </Box>
          </Box>

          {/* 6. Fees Type (Readonly) */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "140px 1fr" },
              alignItems: "center",
              gap: { xs: 0.5, sm: 2 },
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "0.85rem",
                color: isDark ? "#E2E8F0" : "#334155",
                fontFamily: '"Roboto", sans-serif',
              }}
            >
              Fees Type
            </Typography>
            <CustomTextField
              value={feesType}
              slotProps={{
                input: {
                  readOnly: true,
                  sx: readonlyInputStyle,
                },
              }}
            />
          </Box>

          {/* 7. Amount Paid (Editable) */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "140px 1fr" },
              alignItems: "center",
              gap: { xs: 0.5, sm: 2 },
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "0.85rem",
                color: isDark ? "#E2E8F0" : "#334155",
                fontFamily: '"Roboto", sans-serif',
              }}
            >
              Amount Paid
            </Typography>
            <Box sx={{ maxWidth: 220 }}>
              <CustomTextField
                type="number"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="0"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </CustomDialog>
  );
};

export default AddTeachersContribution;
