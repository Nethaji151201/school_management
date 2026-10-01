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

export interface AttendanceStudentRow {
  studentId: string;
  studentName: string;
  presentDays: number | string;
}

const INITIAL_STUDENT_LIST: AttendanceStudentRow[] = [
  { studentId: "01238", studentName: "Abdul Rahman I", presentDays: 0 },
  { studentId: "00904", studentName: "ASHWANTH A", presentDays: 0 },
  { studentId: "00923", studentName: "DHARANEES S", presentDays: 0 },
  { studentId: "00924", studentName: "DHARSHAN V", presentDays: 0 },
  { studentId: "00840", studentName: "DHERENDHRA S", presentDays: 0 },
  { studentId: "01003", studentName: "EZHIL VENDHAN S", presentDays: 0 },
  { studentId: "00858", studentName: "GOWTHAM M.G", presentDays: 0 },
  { studentId: "01104", studentName: "HARENDRA SINGH SHEKHAWAT", presentDays: 0 },
  { studentId: "00821", studentName: "HESHA VARRDHAN T.A", presentDays: 0 },
  { studentId: "01177", studentName: "Jilan Camron R", presentDays: 0 },
  { studentId: "00833", studentName: "KABILESWARAN M", presentDays: 0 },
  { studentId: "00874", studentName: "KAVINEESH R", presentDays: 0 },
  { studentId: "00834", studentName: "KESAVAN V", presentDays: 0 },
  { studentId: "01132", studentName: "KRISHNA PRAKASH", presentDays: 0 },
  { studentId: "00852", studentName: "MAGILESH S", presentDays: 0 },
  { studentId: "01239", studentName: "Magizhan S P", presentDays: 0 },
  { studentId: "01277", studentName: "Mithun Krishnaa R K", presentDays: 0 },
  { studentId: "00926", studentName: "MITHUNAN B", presentDays: 0 },
  { studentId: "01289", studentName: "Mohammed Aadil M", presentDays: 0 },
  { studentId: "01286", studentName: "Mrithun V", presentDays: 0 },
  { studentId: "00927", studentName: "NAETHAN GEORGE ABY", presentDays: 0 },
  { studentId: "01265", studentName: "Navaneenkarthik A", presentDays: 0 },
];

const MONTHS = [
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
];

const CLASSES = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "LKG", "UKG", "JKG", "SKG"];

const SECTIONS = ["A - Section A", "B - Section B", "C - Section C", "D - Section D"];

const AddAttendance: React.FC = () => {
  const { primaryColor, baseMode } = useThemeStore();
  const isDark = baseMode === "dark";
  const activePrimary = primaryColor || COLORS.primary;
  const borderColor = isDark ? "#334155" : "#E2E8F0";

  // Form Filter State
  const [selectedClass, setSelectedClass] = useState("1");
  const [selectedSection, setSelectedSection] = useState("A - Section A");
  const [selectedMonth, setSelectedMonth] = useState("Jun");
  const [workingDays, setWorkingDays] = useState<number | string>(30);

  // Student Attendance Grid State
  const [students, setStudents] = useState<AttendanceStudentRow[]>(INITIAL_STUDENT_LIST);
  const [isLoaded, setIsLoaded] = useState(true);

  // Alert Dialog State
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleGetStudents = () => {
    // Reload / simulate fetching students for selected class & section
    const defaultDays = Number(workingDays) || 0;
    const refreshed = INITIAL_STUDENT_LIST.map((s) => ({
      ...s,
      presentDays: defaultDays > 0 ? defaultDays : 0,
    }));
    setStudents(refreshed);
    setIsLoaded(true);
    toast.success(`Loaded students for Class ${selectedClass} (${selectedSection})`);
  };

  const handlePresentDaysChange = (studentId: string, value: string) => {
    setStudents((prev) =>
      prev.map((item) => {
        if (item.studentId !== studentId) return item;
        if (value === "") return { ...item, presentDays: "" };
        const num = Number(value);
        const maxDays = Number(workingDays) > 0 ? Number(workingDays) : 31;
        return { ...item, presentDays: Math.max(0, Math.min(num, maxDays)) };
      }),
    );
  };

  const handleSetAllToWorkingDays = () => {
    const days = Number(workingDays) || 0;
    setStudents((prev) => prev.map((s) => ({ ...s, presentDays: days })));
    toast.success(`Set all present days to ${days}`);
  };

  const handleReset = () => {
    setStudents((prev) => prev.map((s) => ({ ...s, presentDays: 0 })));
    toast.success("Attendance grid reset to 0");
  };

  const handleSaveConfirm = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 600));
      setIsConfirmOpen(false);
      toast.success(
        `Attendance for Class ${selectedClass} - ${selectedSection} (${selectedMonth}) saved successfully!`,
      );
    } catch {
      toast.error("Failed to save attendance. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // DataTableAG Columns
  const columns: DataTableHeader<AttendanceStudentRow>[] = useMemo(
    () => [
      {
        field: "studentId",
        headerName: "Student ID",
        width: 140,
        minWidth: 120,
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
        field: "presentDays",
        headerName: "No.of Present Days",
        minWidth: 200,
        render: (row) => (
          <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
            <CustomTextField
              type="number"
              value={row.presentDays}
              onChange={(e) => handlePresentDaysChange(row.studentId, e.target.value)}
              placeholder="0"
              width={120}
              height={32}
              sx={{
                "& input": {
                  textAlign: "center",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                },
              }}
            />
          </div>
        ),
      },
    ],
    [isDark, workingDays],
  );

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2, pb: 4 }}>
      {/* Save Confirmation Common Alert Dialog */}
      <CustomAlertDialog
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleSaveConfirm}
        type="confirm"
        title="Confirm Save Attendance"
        message={
          <>
            Are you sure you want to save the attendance for{" "}
            <strong>Class {selectedClass} - {selectedSection}</strong> for the month of{" "}
            <strong>{selectedMonth}</strong> ({students.length} students)?
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
        Attendance
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
          Attendance
        </Typography>

        {/* Single Row of Inputs: Class, Section, Month, Working Days, Get Students */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            flexWrap: { xs: "wrap", lg: "nowrap" },
            gap: 2,
            mt: 0.5,
          }}
        >
          {/* 1. Class */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, minWidth: { xs: "100%", sm: 130, md: 150 }, flex: 1 }}>
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, minWidth: { xs: "100%", sm: 160, md: 190 }, flex: 1.2 }}>
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

          {/* 3. Month */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, minWidth: { xs: "100%", sm: 130, md: 150 }, flex: 1 }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "0.85rem",
                color: isDark ? "#E2E8F0" : "#334155",
                fontFamily: '"Roboto", sans-serif',
              }}
            >
              Month
            </Typography>
            <FormControl size="small" fullWidth>
              <Select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                sx={{
                  height: 36,
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                  backgroundColor: isDark ? "rgba(255, 255, 255, 0.02)" : "#FFFFFF",
                }}
              >
                {MONTHS.map((m) => (
                  <MenuItem key={m} value={m} sx={{ fontSize: "0.85rem" }}>
                    {m}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* 4. No. of Working Days */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, minWidth: { xs: "100%", sm: 130, md: 150 }, flex: 1 }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "0.85rem",
                color: isDark ? "#E2E8F0" : "#334155",
                fontFamily: '"Roboto", sans-serif',
              }}
            >
              No. of Working Days
            </Typography>
            <CustomTextField
              type="number"
              value={workingDays}
              onChange={(e) => setWorkingDays(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="0"
              height={36}
            />
          </Box>

          {/* 5. Primary Action Button: Get Students */}
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

            {Number(workingDays) > 0 && (
              <Button
                variant="outlined"
                onClick={handleSetAllToWorkingDays}
                sx={{
                  height: 36,
                  px: 1.5,
                  borderRadius: "6px",
                  borderColor: isDark ? "#334155" : "#CBD5E1",
                  color: isDark ? "#CBD5E1" : "#475569",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.82rem",
                  "&:hover": {
                    borderColor: activePrimary,
                    color: activePrimary,
                    backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)",
                  },
                }}
              >
                Fill All ({workingDays}d)
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      {/* Students Attendance Table using DataTableAG */}
      {isLoaded && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <DataTableAG<AttendanceStudentRow>
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

export default AddAttendance;
