import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";

import CustomDialog from "../../common/CustomDialog";
import CustomTextField from "../../common/CustomTextField";
import CustomDatePicker from "../../common/CustomDatePicker";
import CustomAutocomplete from "../../common/CustomAutocomplete";
import { useThemeStore } from "../../../store/themeStore";
import { COLORS } from "../../../theme/colors";

export interface StudentFeeEditRecord {
  id: string;
  feesPaidOn: string;
  receiptNo: string;
  studentId: string;
  studentName: string;
  parentName: string;
  studentClass: string;
  section: string;
  feesType: string;
  amountPaid: number;
  concession: number;
  academicYear?: string;
  term?: string;
  actualFees?: number;
}

export interface AddFeeEditProps {
  open: boolean;
  record?: StudentFeeEditRecord | null;
  onClose: () => void;
  onSaveSuccess?: () => void;
  onDeleteSuccess?: () => void;
}

const AddFeeEdit: React.FC<AddFeeEditProps> = ({
  open,
  record,
  onClose,
  onSaveSuccess,
  onDeleteSuccess,
}) => {
  const { baseMode } = useThemeStore();
  const isDark = baseMode === "dark";
  const borderColor = isDark ? "#334155" : "#E2E8F0";

  // Form Field States
  const [studentId, setStudentId] = useState("00980");
  const [studentName, setStudentName] = useState("KRISTEN LALRINPUIA V");
  const [parentName, setParentName] = useState("VISPINKIRUBA I");
  const [studentClass, setStudentClass] = useState("SKG");
  const [academicYear, setAcademicYear] = useState("2024-25");
  const [term, setTerm] = useState("Term 1");

  const [paidOn, setPaidOn] = useState<string>("2025-10-06");
  const [feesType, setFeesType] = useState("Voluntary Contribution");
  const [actualFees, setActualFees] = useState<number>(5000);
  const [amountPaid, setAmountPaid] = useState<number>(5000);
  const [concession, setConcession] = useState<number>(0);

  useEffect(() => {
    if (record) {
      setStudentId(record.studentId || "00980");
      setStudentName(record.studentName || "KRISTEN LALRINPUIA V");
      setParentName(record.parentName || "VISPINKIRUBA I");
      setStudentClass(record.studentClass || "SKG");
      setAcademicYear(record.academicYear || "2024-25");
      setTerm(record.term || "Term 1");
      setPaidOn(record.feesPaidOn || "2025-10-06");
      setFeesType(record.feesType || "Voluntary Contribution");
      setActualFees(record.actualFees ?? record.amountPaid ?? 5000);
      setAmountPaid(record.amountPaid ?? 5000);
      setConcession(record.concession ?? 0);
    }
  }, [record]);

  const handleReset = () => {
    if (record) {
      setParentName(record.parentName || "");
      setTerm(record.term || "Term 1");
      setPaidOn(record.feesPaidOn || "2025-10-06");
      setActualFees(record.actualFees ?? record.amountPaid ?? 5000);
      setAmountPaid(record.amountPaid ?? 5000);
      setConcession(record.concession ?? 0);
    } else {
      setParentName("VISPINKIRUBA I");
      setTerm("Term 1");
      setPaidOn("2025-10-06");
      setActualFees(5000);
      setAmountPaid(5000);
      setConcession(0);
    }
    toast.success("Form reset to initial values");
  };

  const handleSave = () => {
    toast.success(`Fee updated for ${studentName} (${studentId})`);
    onSaveSuccess?.();
    onClose();
  };

  const handleDelete = () => {
    toast.success(`Fee entry deleted for ${studentName} (${studentId})`);
    onDeleteSuccess?.();
    onClose();
  };

  const readonlyInputStyle = {
    backgroundColor: isDark ? "rgba(255, 255, 255, 0.04)" : "#F1F5F9",
    fontWeight: 600,
    cursor: "default",
  };

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title="EDIT / Fees Update Edit"
      maxWidth="md"
      onSave={handleSave}
      onReset={handleReset}
      onDelete={handleDelete}
      saveLabel="Save"
      resetLabel="Reset"
      deleteLabel="Delete"
      closeLabel="Back"
      contentPadding={2.5}
    >
      {/* 2-Column Grid Layout: Tab order completes Left Column first, then Right Column */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          columnGap: 4,
          rowGap: 1.8,
          p: 2,
          borderRadius: "8px",
          border: `1px solid ${borderColor}`,
          backgroundColor: isDark ? "rgba(255, 255, 255, 0.02)" : "#F8FAFC",
        }}
      >
        {/* ================= LEFT COLUMN ================= */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.8 }}>
          {/* 1: Student ID (Readonly) */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", fontSize: "0.8rem" }}>
              Student ID
            </Typography>
            <CustomTextField
              tabIndex={1}
              value={studentId}
              slotProps={{
                input: {
                  readOnly: true,
                  sx: readonlyInputStyle,
                },
              }}
            />
          </Box>

          {/* 2: Student Name (Readonly) */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", fontSize: "0.8rem" }}>
              Student Name
            </Typography>
            <CustomTextField
              tabIndex={2}
              value={studentName}
              slotProps={{
                input: {
                  readOnly: true,
                  sx: readonlyInputStyle,
                },
              }}
            />
          </Box>

          {/* 3: Parent Name */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", fontSize: "0.8rem" }}>
              Parent Name
            </Typography>
            <CustomTextField
              tabIndex={3}
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
            />
          </Box>

          {/* 4: Class (Readonly) */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", fontSize: "0.8rem" }}>
              Class
            </Typography>
            <CustomTextField
              tabIndex={4}
              value={studentClass}
              slotProps={{
                input: {
                  readOnly: true,
                  sx: readonlyInputStyle,
                },
              }}
            />
          </Box>

          {/* 5: Academic Year (Readonly) */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", fontSize: "0.8rem" }}>
              Academic Year
            </Typography>
            <CustomTextField
              tabIndex={5}
              value={academicYear}
              slotProps={{
                input: {
                  readOnly: true,
                  sx: readonlyInputStyle,
                },
              }}
            />
          </Box>

          {/* 6: Term */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", fontSize: "0.8rem" }}>
              Term
            </Typography>
            <CustomAutocomplete
              tabIndex={6}
              options={["Term 1", "Term 2", "Term 3", "Annual"]}
              value={term}
              onChange={(_, val) => setTerm(val || "Term 1")}
            />
          </Box>
        </Box>

        {/* ================= RIGHT COLUMN ================= */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.8 }}>
          {/* 7: Paid On */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", fontSize: "0.8rem" }}>
              Paid On
            </Typography>
            <CustomDatePicker
              tabIndex={7}
              placeholder="Paid On Date"
              value={paidOn}
              onChange={(d) => setPaidOn(d ? d.format("YYYY-MM-DD") : "")}
            />
          </Box>

          {/* 8: Fees Type (Readonly) */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", fontSize: "0.8rem" }}>
              Fees Type
            </Typography>
            <CustomTextField
              tabIndex={8}
              value={feesType}
              slotProps={{
                input: {
                  readOnly: true,
                  sx: readonlyInputStyle,
                },
              }}
            />
          </Box>

          {/* 9: Actual Fees */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", fontSize: "0.8rem" }}>
              Actual Fees (₹)
            </Typography>
            <CustomTextField
              tabIndex={9}
              type="number"
              value={actualFees}
              onChange={(e) => setActualFees(parseFloat(e.target.value) || 0)}
            />
          </Box>

          {/* 10: Amount Paid */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", fontSize: "0.8rem" }}>
              Amount Paid (₹)
            </Typography>
            <CustomTextField
              tabIndex={10}
              type="number"
              value={amountPaid}
              onChange={(e) => setAmountPaid(parseFloat(e.target.value) || 0)}
              sx={{
                "& input": { fontWeight: 700, color: COLORS.success },
              }}
            />
          </Box>

          {/* 11: Concession */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", fontSize: "0.8rem" }}>
              Concession (₹)
            </Typography>
            <CustomTextField
              tabIndex={11}
              type="number"
              value={concession}
              onChange={(e) => setConcession(parseFloat(e.target.value) || 0)}
            />
          </Box>
        </Box>
      </Box>
    </CustomDialog>
  );
};

export default AddFeeEdit;
