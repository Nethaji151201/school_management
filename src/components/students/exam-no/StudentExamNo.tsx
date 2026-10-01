import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SaveIcon from "@mui/icons-material/Save";
import RefreshIcon from "@mui/icons-material/Refresh";
import toast from "react-hot-toast";

import DataTableAG, { type DataTableHeader } from "../../common/DataTableAG";
import CustomTextField from "../../common/CustomTextField";
import CustomAlertDialog from "../../common/CustomAlertDialog";
import { useThemeStore } from "../../../store/themeStore";
import { COLORS } from "../../../theme/colors";

export interface StudentExamNoRow {
  studentId: string;
  studentName: string;
  examNumber: string;
}

const INITIAL_STUDENT_EXAM_LIST: StudentExamNoRow[] = [
  { studentId: "00924", studentName: "DHARSHAN V", examNumber: "1104" },
  { studentId: "00858", studentName: "GOWTHAM M.G", examNumber: "1107" },
  { studentId: "00852", studentName: "MAGILESH S", examNumber: "1115" },
  { studentId: "00838", studentName: "SANJITHH S", examNumber: "1129" },
  { studentId: "00904", studentName: "ASHWANTH A", examNumber: "1102" },
  { studentId: "00821", studentName: "HESHA VARRDHAN T.A", examNumber: "1109" },
  { studentId: "00928", studentName: "RIYASH RUDWIC .M", examNumber: "1126" },
  { studentId: "00840", studentName: "DHERENDHRA S", examNumber: "1105" },
  { studentId: "00837", studentName: "SABARISH S", examNumber: "1127" },
  { studentId: "00867", studentName: "PREDHEEPAN S", examNumber: "1124" },
  { studentId: "00927", studentName: "NAETHAN GEORGE ABY", examNumber: "1121" },
  { studentId: "00834", studentName: "KESAVAN V", examNumber: "1113" },
  { studentId: "00913", studentName: "THIRUKKUMARAN N", examNumber: "1132" },
  { studentId: "00878", studentName: "SUBIKSHAN P", examNumber: "1130" },
  { studentId: "00833", studentName: "KABILESWARAN M", examNumber: "1111" },
  { studentId: "00926", studentName: "MITHUNAN B", examNumber: "1118" },
  { studentId: "00923", studentName: "DHARANEES S", examNumber: "1103" },
];

const CLASSES = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "LKG", "UKG", "JKG", "SKG"];

const SECTIONS = ["A - Section A", "B - Section B", "C - Section C", "D - Section D"];

const StudentExamNo: React.FC = () => {
  const { primaryColor, baseMode } = useThemeStore();
  const isDark = baseMode === "dark";
  const activePrimary = primaryColor || COLORS.primary;
  const borderColor = isDark ? "#334155" : "#E2E8F0";

  // Filter selection state
  const [selectedClass, setSelectedClass] = useState("1");
  const [selectedSection, setSelectedSection] = useState("A - Section A");

  // Grid Data State
  const [students, setStudents] = useState<StudentExamNoRow[]>(INITIAL_STUDENT_EXAM_LIST);
  const [isLoaded, setIsLoaded] = useState(true);

  // Alert Dialog State
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleGetStudents = () => {
    setStudents(INITIAL_STUDENT_EXAM_LIST);
    setIsLoaded(true);
    toast.success(`Loaded students for Class ${selectedClass} (${selectedSection})`);
  };

  const handleExamNumberChange = (studentId: string, value: string) => {
    setStudents((prev) =>
      prev.map((item) =>
        item.studentId === studentId ? { ...item, examNumber: value } : item,
      ),
    );
  };

  const handleReset = () => {
    setStudents(INITIAL_STUDENT_EXAM_LIST);
    toast.success("Exam numbers reset to default");
  };

  const handleSaveConfirm = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 600));
      setIsConfirmOpen(false);
      toast.success(
        `Exam numbers for Class ${selectedClass} - ${selectedSection} updated successfully!`,
      );
    } catch {
      toast.error("Failed to update exam numbers. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // DataTableAG Columns
  const columns: DataTableHeader<StudentExamNoRow>[] = useMemo(
    () => [
      {
        field: "studentId",
        headerName: "Student ID",
        width: 200,
        minWidth: 200,
        render: (row) => (
          <span
            style={{
              fontWeight: 600,
              fontSize: "0.84rem",
              color: isDark ? "#60A5FA" : "#1D4ED8",
            }}
          >
            {row.studentId}
          </span>
        ),
      },
      {
        field: "studentName",
        headerName: "Student Name",
        width: 260,
        minWidth: 200,
        render: (row) => (
          <span
            style={{
              fontWeight: 500,
              fontSize: "0.84rem",
              color: isDark ? "#F8FAFC" : "#1E293B",
            }}
          >
            {row.studentName}
          </span>
        ),
      },
      {
        field: "examNumber",
        headerName: "Exam Number",
        minWidth: 200,
        render: (row) => (
          <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
            <CustomTextField
              value={row.examNumber}
              onChange={(e) => handleExamNumberChange(row.studentId, e.target.value)}
              placeholder="Exam No"
              width={{ xs: "100%", sm: 180 }}
              height={32}
              sx={{
                "& input": {
                  fontWeight: 600,
                  fontSize: "0.85rem",
                },
              }}
            />
          </div>
        ),
      },
    ],
    [isDark],
  );

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2, pb: 4 }}>
      {/* Save Confirmation Common Alert Dialog */}
      <CustomAlertDialog
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleSaveConfirm}
        type="confirm"
        title="Confirm Save Exam Numbers"
        message={
          <>
            Are you sure you want to save the exam numbers for{" "}
            <strong>Class {selectedClass} - {selectedSection}</strong> ({students.length} students)?
          </>
        }
        confirmLabel="Confirm & Save"
        cancelLabel="Cancel"
        isLoading={isSaving}
      />

      {/* Screen Title */}
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "1.25rem",
          color: isDark ? "#F8FAFC" : "#0F172A",
          fontFamily: '"Roboto", sans-serif',
        }}
      >
        Update Student Exam No
      </Typography>

      {/* Single-Row Filter Selection Container */}
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
            fontSize: "0.85rem",
            color: isDark ? "#94A3B8" : "#475569",
            fontFamily: '"Roboto", sans-serif',
          }}
        >
          Update Student Exam No
        </Typography>

        {/* Single Row of Inputs: Class, Section, Get Students */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            flexWrap: { xs: "wrap", md: "nowrap" },
            gap: 2,
            mt: 0.5,
          }}
        >
          {/* 1. Class */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, minWidth: { xs: "100%", sm: 160 }, flex: 1 }}>
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
            <FormControl size="small" fullWidth>
              <Select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                sx={{
                  height: 36,
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                  backgroundColor: isDark ? "rgba(255, 255, 255, 0.02)" : "#FFFFFF",
                }}
              >
                {CLASSES.map((cls) => (
                  <MenuItem key={cls} value={cls} sx={{ fontSize: "0.85rem" }}>
                    {cls}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* 2. Section */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, minWidth: { xs: "100%", sm: 200 }, flex: 1.2 }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "0.85rem",
                color: isDark ? "#E2E8F0" : "#334155",
                fontFamily: '"Roboto", sans-serif',
              }}
            >
              Section
            </Typography>
            <FormControl size="small" fullWidth>
              <Select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                sx={{
                  height: 36,
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                  backgroundColor: isDark ? "rgba(255, 255, 255, 0.02)" : "#FFFFFF",
                }}
              >
                {SECTIONS.map((sec) => (
                  <MenuItem key={sec} value={sec} sx={{ fontSize: "0.85rem" }}>
                    {sec}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* 3. Primary Action Button: Get Students */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, pb: 0.1, flexShrink: 0 }}>
            <Button
              variant="contained"
              onClick={handleGetStudents}
              startIcon={<PeopleAltOutlinedIcon sx={{ fontSize: 18 }} />}
              sx={{
                height: 36,
                px: 2.5,
                borderRadius: "6px",
                backgroundColor: activePrimary,
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: "0.85rem",
                textTransform: "none",
                boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                "&:hover": {
                  backgroundColor: activePrimary,
                  opacity: 0.92,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.22)",
                },
              }}
            >
              Get Students
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Students Exam Number Table using DataTableAG */}
      {isLoaded && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <DataTableAG<StudentExamNoRow>
            columns={columns}
            data={students}
            showSerialNo={true}
            bordered={true}
            zebra={true}
            pagination={true}
            paginationPageSize={25}
            tableHeight="calc(100vh - 300px)"
            minHeight={350}
            rowHeight={48}
          />

          {/* Bottom Footer Actions (Right-aligned: [Outline Reset] [Primary Save]) */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 1.5,
              py: 0.5,
            }}
          >
            {/* Outline Reset Button */}
            <Button
              variant="outlined"
              onClick={handleReset}
              startIcon={<RefreshIcon sx={{ fontSize: 17, color: isDark ? "#CBD5E1" : "#475569" }} />}
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
              Reset
            </Button>

            {/* Primary Save Button (Opens Confirm Alert Dialog) */}
            <Button
              variant="contained"
              onClick={() => setIsConfirmOpen(true)}
              startIcon={<SaveIcon sx={{ fontSize: 17, color: "#FFFFFF" }} />}
              sx={{
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
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default StudentExamNo;
