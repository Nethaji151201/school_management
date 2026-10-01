import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import toast from "react-hot-toast";

import CustomDialog from "../../common/CustomDialog";
import CustomTextField from "../../common/CustomTextField";
import CustomDatePicker from "../../common/CustomDatePicker";
import CustomAutocomplete from "../../common/CustomAutocomplete";
import { useThemeStore } from "../../../store/themeStore";
import { COLORS } from "../../../theme/colors";
import type { StudentFeeRecord } from "./feeUpdateList";

export interface FeeItemRow {
  id: string;
  feeType: string;
  actualFees: number;
  amountPayable: number;
  amountReceived: number;
  concession: number;
}

const DEFAULT_FEE_ITEMS: FeeItemRow[] = [
  { id: "1", feeType: "Tuition Fees", actualFees: 10000, amountPayable: 0, amountReceived: 0, concession: 0 },
  { id: "2", feeType: "Study Materials", actualFees: 7500, amountPayable: 0, amountReceived: 0, concession: 0 },
  { id: "3", feeType: "Uniform & Sports Wear", actualFees: 4500, amountPayable: 0, amountReceived: 0, concession: 0 },
  { id: "4", feeType: "Voluntary Contribution", actualFees: 5000, amountPayable: 0, amountReceived: 0, concession: 0 },
  { id: "5", feeType: "Lunch and Snacks", actualFees: 3000, amountPayable: 0, amountReceived: 0, concession: 0 },
  { id: "6", feeType: "dummy", actualFees: 0, amountPayable: 0, amountReceived: 0, concession: 0 },
  { id: "7", feeType: "Bus Fees", actualFees: 0, amountPayable: 0, amountReceived: 0, concession: 0 },
  { id: "8", feeType: "Arrear Tuition Fee 21-22", actualFees: 0, amountPayable: 0, amountReceived: 0, concession: 0 },
  { id: "9", feeType: "Arrear Material Fee 21-22", actualFees: 0, amountPayable: 0, amountReceived: 0, concession: 0 },
  { id: "10", feeType: "Arrear Uniform Fee 21-22", actualFees: 0, amountPayable: 0, amountReceived: 0, concession: 0 },
  { id: "11", feeType: "Voluntary Contribution", actualFees: 0, amountPayable: 0, amountReceived: 0, concession: 0 },
  { id: "12", feeType: "Arrear Lunch Fee 21-22", actualFees: 0, amountPayable: 0, amountReceived: 0, concession: 0 },
];

export interface AddFeeUpdateProps {
  open: boolean;
  student?: StudentFeeRecord | null;
  onClose: () => void;
  onSaveSuccess?: () => void;
}

const AddFeeUpdate: React.FC<AddFeeUpdateProps> = ({
  open,
  student,
  onClose,
  onSaveSuccess,
}) => {
  const { primaryColor, baseMode } = useThemeStore();
  const isDark = baseMode === "dark";
  const activePrimary = primaryColor || COLORS.primary;

  // Header Details (Synchronized with selected student)
  const [studentId, setStudentId] = useState("01193");
  const [studentName, setStudentName] = useState("Arshith V");
  const [parentName, setParentName] = useState("Venkatesh P");
  const [studentClass, setStudentClass] = useState("JKG");
  const [academicYear, setAcademicYear] = useState("2024-25");
  const [term, setTerm] = useState("Term 1");
  const [paidOn, setPaidOn] = useState<string>("2026-09-30");

  useEffect(() => {
    if (student) {
      setStudentId(student.studentId || "01193");
      setStudentName(student.studentName || "Arshith V");
      setParentName(student.parentName || "Venkatesh P");
      setStudentClass(student.studentClass || "JKG");
      setAcademicYear(student.academicYear || "2024-25");
    }
  }, [student]);

  // Table items state
  const [feeItems, setFeeItems] = useState<FeeItemRow[]>(DEFAULT_FEE_ITEMS);

  const handleRowChange = (
    index: number,
    field: "feeType" | "actualFees" | "amountPayable" | "amountReceived" | "concession",
    value: string | number,
  ) => {
    setFeeItems((prev) => {
      const updated = [...prev];
      const numericVal = typeof value === "string" ? parseFloat(value) || 0 : value;
      if (field === "feeType") {
        updated[index] = { ...updated[index], feeType: String(value) };
      } else {
        updated[index] = { ...updated[index], [field]: numericVal };
      }
      return updated;
    });
  };

  const handleAddRow = () => {
    const newId = String(Date.now());
    setFeeItems((prev) => [
      ...prev,
      {
        id: newId,
        feeType: "",
        actualFees: 0,
        amountPayable: 0,
        amountReceived: 0,
        concession: 0,
      },
    ]);
  };

  const handleDeleteRow = (index: number) => {
    setFeeItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setFeeItems(DEFAULT_FEE_ITEMS);
    setTerm("Term 1");
    setPaidOn("2026-09-30");
    toast.success("Form reset to initial values");
  };

  const handleSave = () => {
    toast.success(`Fee update saved successfully for ${studentName} (${studentId})`);
    onSaveSuccess?.();
    onClose();
  };

  // Calculations
  const totalActual = useMemo(
    () => feeItems.reduce((sum, item) => sum + (Number(item.actualFees) || 0), 0),
    [feeItems],
  );
  const totalPayable = useMemo(
    () => feeItems.reduce((sum, item) => sum + (Number(item.amountPayable) || 0), 0),
    [feeItems],
  );
  const totalReceived = useMemo(
    () => feeItems.reduce((sum, item) => sum + (Number(item.amountReceived) || 0), 0),
    [feeItems],
  );
  const totalConcession = useMemo(
    () => feeItems.reduce((sum, item) => sum + (Number(item.concession) || 0), 0),
    [feeItems],
  );

  const headerBg = isDark ? "#1E293B" : "#F8FAFC";
  const borderColor = isDark ? "#334155" : "#E2E8F0";

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title="EDIT / Fees Update"
      maxWidth="lg"
      onSave={handleSave}
      onReset={handleReset}
      saveLabel="Save"
      resetLabel="Reset"
      closeLabel="Back"
      contentPadding={2}
    >
      {/* Top Details Section: Compact with 4 Fields Per Row */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          columnGap: 2,
          rowGap: 1.5,
          p: 1.8,
          mb: 2,
          borderRadius: "8px",
          border: `1px solid ${borderColor}`,
          backgroundColor: isDark ? "rgba(255, 255, 255, 0.02)" : "#F8FAFC",
        }}
      >
        {/* Row 1 - Field 1: Student ID (Readonly) */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", fontSize: "0.8rem" }}>
            Student ID
          </Typography>
          <CustomTextField
            value={studentId}
            slotProps={{
              input: {
                readOnly: true,
                sx: {
                  backgroundColor: isDark ? "rgba(255, 255, 255, 0.04)" : "#F1F5F9",
                  fontWeight: 700,
                  cursor: "default",
                },
              },
            }}
          />
        </Box>

        {/* Row 1 - Field 2: Student Name (Readonly) */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", fontSize: "0.8rem" }}>
            Student Name
          </Typography>
          <CustomTextField
            value={studentName}
            slotProps={{
              input: {
                readOnly: true,
                sx: {
                  backgroundColor: isDark ? "rgba(255, 255, 255, 0.04)" : "#F1F5F9",
                  fontWeight: 600,
                  cursor: "default",
                },
              },
            }}
          />
        </Box>

        {/* Row 1 - Field 3: Parent Name */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", fontSize: "0.8rem" }}>
            Parent Name
          </Typography>
          <CustomTextField
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
          />
        </Box>

        {/* Row 1 - Field 4: Class (Readonly) */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", fontSize: "0.8rem" }}>
            Class
          </Typography>
          <CustomTextField
            value={studentClass}
            slotProps={{
              input: {
                readOnly: true,
                sx: {
                  backgroundColor: isDark ? "rgba(255, 255, 255, 0.04)" : "#F1F5F9",
                  fontWeight: 600,
                  cursor: "default",
                },
              },
            }}
          />
        </Box>

        {/* Row 2 - Field 5: Academic Year (Readonly) */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", fontSize: "0.8rem" }}>
            Academic Year
          </Typography>
          <CustomTextField
            value={academicYear}
            slotProps={{
              input: {
                readOnly: true,
                sx: {
                  backgroundColor: isDark ? "rgba(255, 255, 255, 0.04)" : "#F1F5F9",
                  fontWeight: 600,
                  cursor: "default",
                },
              },
            }}
          />
        </Box>

        {/* Row 2 - Field 6: Term */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", fontSize: "0.8rem" }}>
            Term
          </Typography>
          <CustomAutocomplete
            options={["Term 1", "Term 2", "Term 3", "Annual"]}
            value={term}
            onChange={(_, val) => setTerm(val || "Term 1")}
          />
        </Box>

        {/* Row 2 - Field 7: Paid On */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", fontSize: "0.8rem" }}>
            Paid On
          </Typography>
          <CustomDatePicker
            placeholder="Paid On Date"
            value={paidOn}
            onChange={(d) => setPaidOn(d ? d.format("YYYY-MM-DD") : "")}
          />
        </Box>
      </Box>

      {/* Fees Breakdown Modern Table */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: "8px",
          border: `1px solid ${borderColor}`,
          backgroundColor: isDark ? "#111827" : "#FFFFFF",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.25,
            borderBottom: `1px solid ${borderColor}`,
            backgroundColor: isDark ? "#1E293B" : "#F8FAFC",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "0.9rem",
              color: isDark ? "#F8FAFC" : "#0F172A",
              fontFamily: '"Roboto", sans-serif',
            }}
          >
            Fees Breakdown
          </Typography>

          <Button
            size="small"
            variant="outlined"
            onClick={handleAddRow}
            startIcon={<AddIcon fontSize="small" />}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.78rem",
              borderRadius: "6px",
              height: 28,
              borderColor: borderColor,
              color: isDark ? "#CBD5E1" : "#475569",
              "&:hover": {
                borderColor: activePrimary,
                color: activePrimary,
              },
            }}
          >
            Add Fee Row
          </Button>
        </Box>

        <TableContainer sx={{ maxHeight: 380 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    width: 45,
                    fontWeight: 700,
                    backgroundColor: headerBg,
                    color: isDark ? "#CBD5E1" : "#334155",
                    borderColor: borderColor,
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: "0.8rem",
                    textAlign: "center",
                  }}
                >
                  #
                </TableCell>
                <TableCell
                  sx={{
                    minWidth: 200,
                    fontWeight: 700,
                    backgroundColor: headerBg,
                    color: isDark ? "#CBD5E1" : "#334155",
                    borderColor: borderColor,
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: "0.8rem",
                  }}
                >
                  Fees Type / Particulars
                </TableCell>
                <TableCell
                  sx={{
                    width: 130,
                    fontWeight: 700,
                    backgroundColor: headerBg,
                    color: isDark ? "#CBD5E1" : "#334155",
                    borderColor: borderColor,
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: "0.8rem",
                    textAlign: "right",
                  }}
                >
                  Actual Fees (₹)
                </TableCell>
                <TableCell
                  sx={{
                    width: 140,
                    fontWeight: 700,
                    backgroundColor: headerBg,
                    color: isDark ? "#CBD5E1" : "#334155",
                    borderColor: borderColor,
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: "0.8rem",
                    textAlign: "right",
                  }}
                >
                  Amount Payable (₹)
                </TableCell>
                <TableCell
                  sx={{
                    width: 140,
                    fontWeight: 700,
                    backgroundColor: headerBg,
                    color: isDark ? "#CBD5E1" : "#334155",
                    borderColor: borderColor,
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: "0.8rem",
                    textAlign: "right",
                  }}
                >
                  Amount Received (₹)
                </TableCell>
                <TableCell
                  sx={{
                    width: 130,
                    fontWeight: 700,
                    backgroundColor: headerBg,
                    color: isDark ? "#CBD5E1" : "#334155",
                    borderColor: borderColor,
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: "0.8rem",
                    textAlign: "right",
                  }}
                >
                  Concession (₹)
                </TableCell>
                <TableCell
                  sx={{
                    width: 50,
                    fontWeight: 700,
                    backgroundColor: headerBg,
                    color: isDark ? "#CBD5E1" : "#334155",
                    borderColor: borderColor,
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: "0.8rem",
                    textAlign: "center",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {feeItems.map((row, index) => (
                <TableRow
                  key={row.id}
                  hover
                  sx={{
                    backgroundColor:
                      index % 2 === 1
                        ? isDark
                          ? "rgba(255, 255, 255, 0.02)"
                          : "#F8FAFC"
                        : "transparent",
                  }}
                >
                  {/* # */}
                  <TableCell
                    sx={{
                      borderColor: borderColor,
                      textAlign: "center",
                      color: "text.secondary",
                      fontSize: "0.8rem",
                      fontFamily: '"Roboto", sans-serif',
                      fontWeight: 600,
                    }}
                  >
                    {index + 1}
                  </TableCell>

                  {/* Fees Type */}
                  <TableCell sx={{ borderColor: borderColor }}>
                    <CustomTextField
                      value={row.feeType}
                      onChange={(e) => handleRowChange(index, "feeType", e.target.value)}
                      placeholder="Fee Particular"
                      height={30}
                    />
                  </TableCell>

                  {/* Actual Fees */}
                  <TableCell sx={{ borderColor: borderColor, textAlign: "right" }}>
                    <CustomTextField
                      type="number"
                      value={row.actualFees === 0 ? "0" : row.actualFees}
                      onChange={(e) => handleRowChange(index, "actualFees", e.target.value)}
                      height={30}
                      sx={{
                        "& input": { textAlign: "right", fontWeight: 600 },
                      }}
                    />
                  </TableCell>

                  {/* Amount Payable */}
                  <TableCell sx={{ borderColor: borderColor, textAlign: "right" }}>
                    <CustomTextField
                      type="number"
                      value={row.amountPayable === 0 ? "0" : row.amountPayable}
                      onChange={(e) => handleRowChange(index, "amountPayable", e.target.value)}
                      height={30}
                      sx={{
                        "& input": { textAlign: "right" },
                      }}
                    />
                  </TableCell>

                  {/* Amount Received */}
                  <TableCell sx={{ borderColor: borderColor, textAlign: "right" }}>
                    <CustomTextField
                      type="number"
                      value={row.amountReceived === 0 ? "0" : row.amountReceived}
                      onChange={(e) => handleRowChange(index, "amountReceived", e.target.value)}
                      height={30}
                      sx={{
                        "& input": { textAlign: "right", fontWeight: 600, color: COLORS.success },
                      }}
                    />
                  </TableCell>

                  {/* Concession */}
                  <TableCell sx={{ borderColor: borderColor, textAlign: "right" }}>
                    <CustomTextField
                      type="number"
                      value={row.concession === 0 ? "0" : row.concession}
                      onChange={(e) => handleRowChange(index, "concession", e.target.value)}
                      height={30}
                      sx={{
                        "& input": { textAlign: "right" },
                      }}
                    />
                  </TableCell>

                  {/* Delete Action */}
                  <TableCell sx={{ borderColor: borderColor, textAlign: "center" }}>
                    <Tooltip title="Remove Row">
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteRow(index)}
                        sx={{
                          color: "#EF4444",
                          p: 0.4,
                          "&:hover": {
                            backgroundColor: "rgba(239, 68, 68, 0.1)",
                          },
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            {/* Pinned Sticky Static Total Footer Row */}
            <TableFooter
              sx={{
                position: "sticky",
                bottom: 0,
                zIndex: 3,
                "& .MuiTableCell-root": {
                  backgroundColor: isDark ? "#1E293B" : "#F1F5F9",
                  borderTop: `2px solid ${borderColor}`,
                  boxShadow: "0 -2px 6px rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <TableRow>
                <TableCell
                  colSpan={2}
                  sx={{
                    borderColor: borderColor,
                    fontWeight: 800,
                    fontSize: "0.88rem",
                    color: activePrimary,
                    fontFamily: '"Roboto", sans-serif',
                    textAlign: "right",
                    pr: 2.5,
                  }}
                >
                  Total (₹):
                </TableCell>
                <TableCell
                  sx={{
                    borderColor: borderColor,
                    fontWeight: 800,
                    fontSize: "0.88rem",
                    color: isDark ? "#F8FAFC" : "#0F172A",
                    textAlign: "right",
                    fontFamily: '"Roboto", sans-serif',
                  }}
                >
                  {totalActual.toFixed(2)}
                </TableCell>
                <TableCell
                  sx={{
                    borderColor: borderColor,
                    fontWeight: 800,
                    fontSize: "0.88rem",
                    color: isDark ? "#F8FAFC" : "#0F172A",
                    textAlign: "right",
                    fontFamily: '"Roboto", sans-serif',
                  }}
                >
                  {totalPayable.toFixed(2)}
                </TableCell>
                <TableCell
                  sx={{
                    borderColor: borderColor,
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    color: COLORS.success,
                    textAlign: "right",
                    fontFamily: '"Roboto", sans-serif',
                  }}
                >
                  {totalReceived.toFixed(2)}
                </TableCell>
                <TableCell
                  sx={{
                    borderColor: borderColor,
                    fontWeight: 800,
                    fontSize: "0.88rem",
                    color: isDark ? "#CBD5E1" : "#475569",
                    textAlign: "right",
                    fontFamily: '"Roboto", sans-serif',
                  }}
                >
                  {totalConcession.toFixed(2)}
                </TableCell>
                <TableCell sx={{ borderColor: borderColor }} />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </CustomDialog>
  );
};

export default AddFeeUpdate;
