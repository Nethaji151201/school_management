import React, { useState, useMemo } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Popover,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ViewColumnOutlinedIcon from "@mui/icons-material/ViewColumnOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DataTableAG from "../../common/DataTableAG";
import CustomTextField from "../../common/CustomTextField";
import CustomDatePicker from "../../common/CustomDatePicker";
import StudentForm from "./StudentForm";
import type { DataTableHeader } from "../../common/DataTableAG";
import { useThemeStore } from "../../../store/themeStore";

interface Student {
  studentId: string;
  examNo: string;
  emisNumber: string;
  fullName: string;
  parentName: string;
  dob: string;
  class: string;
  section: string;
  status: string;
  year: string;
  mobileNumber: string;
  parentAddress: string;
  religion: string;
  community: string;
  motherTongue: string;
}

const allStudentHeaders: DataTableHeader<Student>[] = [
  {
    label: "Student ID",
    key: "studentId",
    minWidth: 140,
    sortable: true,
    searchEnable: true,
  },
  {
    label: "Exam No",
    key: "examNo",
    minWidth: 140,
    sortable: true,
    searchEnable: true,
  },
  {
    label: "EMIS Number",
    key: "emisNumber",
    minWidth: 160,
    sortable: true,
    searchEnable: true,
  },
  {
    label: "Full Name",
    key: "fullName",
    minWidth: 180,
    sortable: true,
    searchEnable: true,
  },
  {
    label: "Parent Name",
    key: "parentName",
    minWidth: 160,
    sortable: true,
    searchEnable: true,
  },
  {
    label: "DOB",
    key: "dob",
    minWidth: 140,
    sortable: true,
    searchEnable: true,
  },
  {
    label: "Class",
    key: "class",
    minWidth: 100,
    sortable: true,
    searchEnable: true,
  },
  {
    label: "Section",
    key: "section",
    minWidth: 100,
    sortable: true,
    searchEnable: true,
  },
  {
    label: "Status",
    key: "status",
    minWidth: 120,
    sortable: true,
    searchEnable: true,
  },
  {
    label: "Year",
    key: "year",
    minWidth: 120,
    sortable: true,
    searchEnable: true,
  },
  {
    label: "Mobile Number",
    key: "mobileNumber",
    minWidth: 150,
    sortable: true,
    searchEnable: true,
  },
  {
    label: "Parent Address",
    key: "parentAddress",
    minWidth: 180,
    sortable: true,
    searchEnable: true,
  },
  { label: "Religion", key: "religion", minWidth: 120, sortable: true },
  { label: "Community", key: "community", minWidth: 120, sortable: true },
  {
    label: "Mother Tongue",
    key: "motherTongue",
    minWidth: 130,
    sortable: true,
    align: "center",
  },
  {
    label: "Actions",
    key: "actions",
    minWidth: 90,
    align: "center",
    pinned: "right",
    render: (row) => (
      <IconButton
        size="small"
        color="primary"
        aria-label={`edit-${row.studentId}`}
      >
        <EditIcon fontSize="small" />
      </IconButton>
    ),
  },
];

const studentRows: Student[] = Array.from({ length: 100 }, (_, index) => ({
  studentId: `S${String(index + 1).padStart(3, "0")}`,
  examNo: `E${String(index + 1).padStart(3, "0")}`,
  emisNumber: `EMIS${String(index + 1).padStart(5, "0")}`,
  fullName: `Student ${index + 1}`,
  parentName: `Parent ${index + 1}`,
  dob: `200${index % 10}-0${(index % 9) + 1}-15`,
  class: `${(index % 12) + 1}`,
  section: ["A", "B", "C", "D"][index % 4],
  status: index % 5 === 0 ? "Inactive" : "Active",
  year: index % 2 === 0 ? "2023-2024" : "2024-2025",
  mobileNumber: `+91 98${String(10000000 + index).padStart(8, "0")}`,
  parentAddress: `${index + 1} Main Street, Salem`,
  religion: ["Hinduism", "Christianity", "Islam"][index % 3],
  community: ["General", "BC", "MBC", "SC", "ST"][index % 5],
  motherTongue: ["Tamil", "English", "Telugu", "Malayalam"][index % 4],
}));

const StudentList: React.FC = () => {
  const { primaryColor, baseMode } = useThemeStore();
  const isDark = baseMode === "dark";

  // Date range filters
  const [fromDate, setFromDate] = useState("2026-09-01");
  const [toDate, setToDate] = useState("2026-09-30");

  // Global search input
  const [quickSearch, setQuickSearch] = useState("");

  // Advanced filters state
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [studentIdFilter, setStudentIdFilter] = useState("");
  const [examNo, setExamNo] = useState("");
  const [studentName, setStudentName] = useState("");
  const [parentName, setParentName] = useState("");
  const [mobileFilter, setMobileFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [classFilter, setClassFilter] = useState("All");

  // Columns visibility state
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    allStudentHeaders.forEach((col) => {
      initial[col.key || ""] = true;
    });
    return initial;
  });

  const [columnMenuAnchor, setColumnMenuAnchor] = useState<null | HTMLElement>(null);
  const [isStudentFormOpen, setIsStudentFormOpen] = useState(false);

  // Filtered headers based on visible columns
  const activeHeaders = useMemo(() => {
    return allStudentHeaders.filter((col) => visibleColumns[col.key || ""]);
  }, [visibleColumns]);

  // Filter rows based on all search criteria
  const filteredRows = useMemo(() => {
    return studentRows.filter((s) => {
      // Quick search filter
      if (quickSearch.trim()) {
        const query = quickSearch.toLowerCase();
        const matches =
          s.fullName.toLowerCase().includes(query) ||
          s.studentId.toLowerCase().includes(query) ||
          s.examNo.toLowerCase().includes(query) ||
          s.emisNumber.toLowerCase().includes(query) ||
          s.parentName.toLowerCase().includes(query) ||
          s.mobileNumber.toLowerCase().includes(query);
        if (!matches) return false;
      }

      // Popover advanced filters
      if (studentIdFilter.trim() && !s.studentId.toLowerCase().includes(studentIdFilter.trim().toLowerCase()))
        return false;
      if (examNo.trim() && !s.examNo.toLowerCase().includes(examNo.trim().toLowerCase()))
        return false;
      if (studentName.trim() && !s.fullName.toLowerCase().includes(studentName.trim().toLowerCase()))
        return false;
      if (parentName.trim() && !s.parentName.toLowerCase().includes(parentName.trim().toLowerCase()))
        return false;
      if (mobileFilter.trim() && !s.mobileNumber.toLowerCase().includes(mobileFilter.trim().toLowerCase()))
        return false;
      if (statusFilter && statusFilter !== "All" && s.status.toLowerCase() !== statusFilter.toLowerCase())
        return false;
      if (classFilter && classFilter !== "All" && s.class !== classFilter)
        return false;

      return true;
    });
  }, [
    quickSearch,
    studentIdFilter,
    examNo,
    studentName,
    parentName,
    mobileFilter,
    statusFilter,
    classFilter,
  ]);

  const hasActiveFilters = useMemo(() => {
    return (
      Boolean(studentIdFilter.trim()) ||
      Boolean(examNo.trim()) ||
      Boolean(studentName.trim()) ||
      Boolean(parentName.trim()) ||
      Boolean(mobileFilter.trim()) ||
      (statusFilter !== "All" && Boolean(statusFilter)) ||
      (classFilter !== "All" && Boolean(classFilter))
    );
  }, [
    studentIdFilter,
    examNo,
    studentName,
    parentName,
    mobileFilter,
    statusFilter,
    classFilter,
  ]);

  const handleResetFilters = () => {
    setStudentIdFilter("");
    setExamNo("");
    setStudentName("");
    setParentName("");
    setMobileFilter("");
    setStatusFilter("All");
    setClassFilter("All");
  };

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1.5 }}>
      {/* Top Action Toolbar (Matching 2nd Attachment UI) */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: { xs: "wrap", md: "nowrap" },
          gap: 1.5,
          py: 0.5,
        }}
      >
        {/* Left: Title + Date Range + Search Icon */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, flexWrap: "wrap" }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1.1rem",
              color: isDark ? "#F8FAFC" : "#0F172A",
              fontFamily: '"Roboto", sans-serif',
              whiteSpace: "nowrap",
              mr: 0.5,
            }}
          >
            Student Directory
          </Typography>

          {/* Date From Input */}
          <CustomDatePicker
            placeholder="From Date"
            value={fromDate}
            onChange={(d) => setFromDate(d ? d.format("YYYY-MM-DD") : "")}
            width={145}
            height={36}
          />

          {/* Date To Input */}
          <CustomDatePicker
            placeholder="To Date"
            value={toDate}
            onChange={(d) => setToDate(d ? d.format("YYYY-MM-DD") : "")}
            width={145}
            height={36}
          />

          {/* Search Action Button */}
          <Button
            variant="contained"
            sx={{
              minWidth: 36,
              width: 36,
              height: 36,
              p: 0,
              borderRadius: "6px",
              backgroundColor: isDark ? "#1E293B" : "#0F172A",
              color: "#FFFFFF",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: isDark ? "#334155" : primaryColor,
                boxShadow: "none",
              },
            }}
          >
            <SearchIcon sx={{ fontSize: 18 }} />
          </Button>
        </Box>

        {/* Right: Columns + Quick Search + Filters + Add */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
          {/* Columns Selector Button */}
          <Button
            variant="outlined"
            onClick={(e) => setColumnMenuAnchor(e.currentTarget)}
            startIcon={<ViewColumnOutlinedIcon sx={{ fontSize: 17 }} />}
            sx={{
              height: 36,
              borderRadius: "6px",
              borderColor: isDark ? "#334155" : "#CBD5E1",
              color: isDark ? "#F8FAFC" : "#0F172A",
              backgroundColor: isDark ? "#111827" : "#FFFFFF",
              textTransform: "none",
              fontFamily: '"Roboto", sans-serif',
              fontSize: "0.82rem",
              fontWeight: 500,
              px: 1.5,
              "&:hover": {
                borderColor: primaryColor,
                backgroundColor: isDark ? "#1E293B" : "#F8FAFC",
              },
            }}
          >
            Columns
          </Button>

          {/* Quick Search Input */}
          <CustomTextField
            placeholder="Search students..."
            value={quickSearch}
            onChange={(e) => setQuickSearch(e.target.value)}
            width={{ xs: 150, sm: 200, md: 230 }}
            height={36}
          />

          {/* Filters Toggle Button (Triggers Popover) */}
          <Button
            variant="outlined"
            onClick={(e) => setFilterAnchorEl(e.currentTarget)}
            startIcon={<FilterAltOutlinedIcon sx={{ fontSize: 17 }} />}
            sx={{
              height: 36,
              borderRadius: "6px",
              borderColor: Boolean(filterAnchorEl) || hasActiveFilters ? primaryColor : isDark ? "#334155" : "#CBD5E1",
              color: Boolean(filterAnchorEl) || hasActiveFilters ? primaryColor : isDark ? "#F8FAFC" : "#0F172A",
              backgroundColor: Boolean(filterAnchorEl) || hasActiveFilters
                ? `${primaryColor}15`
                : isDark
                  ? "#111827"
                  : "#FFFFFF",
              textTransform: "none",
              fontFamily: '"Roboto", sans-serif',
              fontSize: "0.82rem",
              fontWeight: 500,
              px: 1.5,
              "&:hover": {
                borderColor: primaryColor,
                backgroundColor: isDark ? "#1E293B" : "#F8FAFC",
              },
            }}
          >
            Filters
          </Button>

          {/* + Add Button */}
          <Button
            variant="contained"
            onClick={() => setIsStudentFormOpen(true)}
            startIcon={<AddIcon sx={{ fontSize: 18 }} />}
            sx={{
              height: 36,
              borderRadius: "6px",
              backgroundColor: isDark ? "#1E293B" : "#0F172A",
              color: "#FFFFFF",
              textTransform: "none",
              fontFamily: '"Roboto", sans-serif',
              fontSize: "0.82rem",
              fontWeight: 600,
              px: 1.8,
              boxShadow: "none",
              "&:hover": {
                backgroundColor: primaryColor,
                boxShadow: "none",
              },
            }}
          >
            + Add
          </Button>
        </Box>
      </Box>

      {/* Columns Selector Dropdown Menu */}
      <Menu
        anchorEl={columnMenuAnchor}
        open={Boolean(columnMenuAnchor)}
        onClose={() => setColumnMenuAnchor(null)}
        slotProps={{
          paper: {
            sx: {
              maxHeight: 350,
              width: 220,
              borderRadius: "8px",
              p: 1,
              backgroundColor: isDark ? "#111827" : "#FFFFFF",
              color: isDark ? "#F8FAFC" : "#0F172A",
              boxShadow: isDark
                ? "0 10px 30px rgba(0,0,0,0.6)"
                : "0 10px 30px rgba(15,23,42,0.12)",
            },
          },
        }}
      >
        <Typography
          sx={{
            px: 1.5,
            py: 0.5,
            fontWeight: 700,
            fontSize: "0.82rem",
            fontFamily: '"Roboto", sans-serif',
          }}
        >
          Toggle Columns
        </Typography>
        {allStudentHeaders.map((col) => {
          if (col.key === "actions") return null;
          const key = col.key || "";
          return (
            <MenuItem key={key} sx={{ py: 0.2, px: 1, borderRadius: "4px" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={!!visibleColumns[key]}
                    onChange={(e) =>
                      setVisibleColumns((prev) => ({
                        ...prev,
                        [key]: e.target.checked,
                      }))
                    }
                    sx={{
                      p: 0.5,
                      color: primaryColor,
                      "&.Mui-checked": { color: primaryColor },
                    }}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                      fontFamily: '"Roboto", sans-serif',
                    }}
                  >
                    {col.label}
                  </Typography>
                }
              />
            </MenuItem>
          );
        })}
      </Menu>

      {/* Filter Popover Dropdown (Matching Attachment 1 UI) */}
      <Popover
        open={Boolean(filterAnchorEl)}
        anchorEl={filterAnchorEl}
        onClose={() => setFilterAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              width: 320,
              mt: 1,
              borderRadius: "10px",
              border: `1px solid ${isDark ? "#334155" : "#E2E8F0"}`,
              backgroundColor: isDark ? "#111827" : "#FFFFFF",
              boxShadow: isDark
                ? "0 10px 30px rgba(0,0,0,0.6)"
                : "0 10px 25px rgba(15,23,42,0.12)",
              overflow: "hidden",
            },
          },
        }}
      >
        {/* Header: Title + Clear All */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.4,
            borderBottom: `1px solid ${isDark ? "#1F2937" : "#F1F5F9"}`,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
            <FilterAltOutlinedIcon
              sx={{ fontSize: 18, color: isDark ? "#94A3B8" : "#475569" }}
            />
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "0.92rem",
                color: isDark ? "#F8FAFC" : "#0F172A",
                fontFamily: '"Roboto", sans-serif',
              }}
            >
              Filter
            </Typography>
          </Box>
          <Button
            onClick={handleResetFilters}
            sx={{
              color: "#BE123C",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.8rem",
              p: 0,
              minWidth: "auto",
              fontFamily: '"Roboto", sans-serif',
              "&:hover": {
                backgroundColor: "transparent",
                textDecoration: "underline",
              },
            }}
          >
            Clear All
          </Button>
        </Box>

        {/* Scrollable Fields */}
        <Box
          sx={{
            maxHeight: 380,
            overflowY: "auto",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1.6,
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: isDark ? "#111827" : "#F8FAFC",
            },
            "&::-webkit-scrollbar-thumb": {
              background: isDark ? "#334155" : "#CBD5E1",
              borderRadius: "4px",
            },
          }}
        >
          {/* Student ID (UHID) */}
          <Box>
            <Typography
              sx={{
                fontSize: "0.78rem",
                fontWeight: 600,
                color: isDark ? "#94A3B8" : "#334155",
                mb: 0.6,
                fontFamily: '"Roboto", sans-serif',
              }}
            >
              Student ID
            </Typography>
            <CustomTextField
              placeholder="Search Student ID..."
              value={studentIdFilter}
              onChange={(e) => setStudentIdFilter(e.target.value)}
              height={36}
            />
          </Box>

          {/* Exam No (OP Number) */}
          <Box>
            <Typography
              sx={{
                fontSize: "0.78rem",
                fontWeight: 600,
                color: isDark ? "#94A3B8" : "#334155",
                mb: 0.6,
                fontFamily: '"Roboto", sans-serif',
              }}
            >
              Exam No
            </Typography>
            <CustomTextField
              placeholder="Search Exam No..."
              value={examNo}
              onChange={(e) => setExamNo(e.target.value)}
              height={36}
            />
          </Box>

          {/* Patient / Student Name */}
          <Box>
            <Typography
              sx={{
                fontSize: "0.78rem",
                fontWeight: 600,
                color: isDark ? "#94A3B8" : "#334155",
                mb: 0.6,
                fontFamily: '"Roboto", sans-serif',
              }}
            >
              Student Name
            </Typography>
            <CustomTextField
              placeholder="Search Student Name..."
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              height={36}
            />
          </Box>

          {/* Mobile No */}
          <Box>
            <Typography
              sx={{
                fontSize: "0.78rem",
                fontWeight: 600,
                color: isDark ? "#94A3B8" : "#334155",
                mb: 0.6,
                fontFamily: '"Roboto", sans-serif',
              }}
            >
              Mobile No
            </Typography>
            <CustomTextField
              placeholder="Search Mobile No..."
              value={mobileFilter}
              onChange={(e) => setMobileFilter(e.target.value)}
              height={36}
            />
          </Box>

          {/* Parent Name */}
          <Box>
            <Typography
              sx={{
                fontSize: "0.78rem",
                fontWeight: 600,
                color: isDark ? "#94A3B8" : "#334155",
                mb: 0.6,
                fontFamily: '"Roboto", sans-serif',
              }}
            >
              Parent Name
            </Typography>
            <CustomTextField
              placeholder="Search Parent Name..."
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              height={36}
            />
          </Box>

          {/* Status Dropdown */}
          <Box>
            <Typography
              sx={{
                fontSize: "0.78rem",
                fontWeight: 600,
                color: isDark ? "#94A3B8" : "#334155",
                mb: 0.6,
                fontFamily: '"Roboto", sans-serif',
              }}
            >
              Status
            </Typography>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                width: "100%",
                height: 36,
                padding: "0 10px",
                borderRadius: "6px",
                border: `1px solid ${isDark ? "#334155" : "#CBD5E1"}`,
                backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
                color: isDark ? "#F8FAFC" : "#0F172A",
                fontSize: "0.82rem",
                fontFamily: '"Roboto", sans-serif',
                outline: "none",
                cursor: "pointer",
                boxSizing: "border-box",
              }}
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </Box>

          {/* Class Dropdown */}
          <Box>
            <Typography
              sx={{
                fontSize: "0.78rem",
                fontWeight: 600,
                color: isDark ? "#94A3B8" : "#334155",
                mb: 0.6,
                fontFamily: '"Roboto", sans-serif',
              }}
            >
              Class
            </Typography>
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              style={{
                width: "100%",
                height: 36,
                padding: "0 10px",
                borderRadius: "6px",
                border: `1px solid ${isDark ? "#334155" : "#CBD5E1"}`,
                backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
                color: isDark ? "#F8FAFC" : "#0F172A",
                fontSize: "0.82rem",
                fontFamily: '"Roboto", sans-serif',
                outline: "none",
                cursor: "pointer",
                boxSizing: "border-box",
              }}
            >
              <option value="All">All Classes</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={`${i + 1}`}>
                  Class {i + 1}
                </option>
              ))}
            </select>
          </Box>
        </Box>

        {/* Footer: Filter Action Button */}
        <Box
          sx={{
            p: 1.5,
            borderTop: `1px solid ${isDark ? "#1F2937" : "#F1F5F9"}`,
            backgroundColor: isDark ? "#0B0F19" : "#F8FAFC",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            onClick={() => setFilterAnchorEl(null)}
            sx={{
              backgroundColor: isDark ? "#1E293B" : "#0F172A",
              color: "#FFFFFF",
              textTransform: "none",
              fontFamily: '"Roboto", sans-serif',
              fontSize: "0.82rem",
              fontWeight: 600,
              px: 2.5,
              py: 0.6,
              borderRadius: "6px",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: primaryColor,
                boxShadow: "none",
              },
            }}
          >
            Filter
          </Button>
        </Box>
      </Popover>

      {/* Main Data Table */}
      <DataTableAG
        headers={activeHeaders}
        data={filteredRows}
        serialNumber
        enablePagination
        emptyMessage="No students found matching the selected criteria"
        onRowClick={(student) => {
          console.log("Selected student", student.fullName);
        }}
      />

      {/* Add / Edit Student Modal Form */}
      <StudentForm
        open={isStudentFormOpen}
        onClose={() => setIsStudentFormOpen(false)}
        onSave={() => {
          /* persist student data */
        }}
      />
    </Box>
  );
};

export default StudentList;
