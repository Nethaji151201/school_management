import React, { useState, useMemo } from "react";
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  Typography,
  Popover,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ViewColumnOutlinedIcon from "@mui/icons-material/ViewColumnOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import toast from "react-hot-toast";

import DataTableAG, { type DataTableHeader } from "../../common/DataTableAG";
import CustomTextField from "../../common/CustomTextField";
import AddTeachersContribution, {
  type TeacherContributionRecord,
} from "./AddTeachersContribution";
import { useThemeStore } from "../../../store/themeStore";
import { COLORS } from "../../../theme/colors";

// Initial sample data based on user attachment
const INITIAL_RECORDS: TeacherContributionRecord[] = [
  {
    id: "1",
    studentId: "01193",
    studentName: "Arshith V",
    parentName: "Velmani K",
    studentClass: "JKG",
    section: "A",
    group: "",
    academicYear: "2024-25",
    paidOn: "2026-09-30",
    feesType: "Voluntary Contribution",
    amountPaid: 0,
  },
  {
    id: "2",
    studentId: "01198",
    studentName: "Aswanth S",
    parentName: "Senthil Kumar P",
    studentClass: "JKG",
    section: "A",
    group: "",
    academicYear: "2024-25",
    paidOn: "2026-09-30",
    feesType: "Voluntary Contribution",
    amountPaid: 0,
  },
  {
    id: "3",
    studentId: "01199",
    studentName: "Mugil P S",
    parentName: "Sathish Kumar S",
    studentClass: "JKG",
    section: "A",
    group: "",
    academicYear: "2024-25",
    paidOn: "2026-09-30",
    feesType: "Voluntary Contribution",
    amountPaid: 0,
  },
  {
    id: "4",
    studentId: "01202",
    studentName: "Dev Dheeshithan D N",
    parentName: "Nagaraj D",
    studentClass: "JKG",
    section: "A",
    group: "",
    academicYear: "2024-25",
    paidOn: "2026-09-30",
    feesType: "Voluntary Contribution",
    amountPaid: 0,
  },
  {
    id: "5",
    studentId: "01203",
    studentName: "Nikilan C",
    parentName: "Chinnasamy R",
    studentClass: "JKG",
    section: "A",
    group: "",
    academicYear: "2024-25",
    paidOn: "2026-09-30",
    feesType: "Voluntary Contribution",
    amountPaid: 0,
  },
  {
    id: "6",
    studentId: "01207",
    studentName: "SuryaVarman S S",
    parentName: "Saravanan S",
    studentClass: "JKG",
    section: "A",
    group: "",
    academicYear: "2024-25",
    paidOn: "2026-09-30",
    feesType: "Voluntary Contribution",
    amountPaid: 0,
  },
  {
    id: "7",
    studentId: "01212",
    studentName: "NIVIN A",
    parentName: "Anand Kumar M",
    studentClass: "JKG",
    section: "A",
    group: "",
    academicYear: "2024-25",
    paidOn: "2026-09-30",
    feesType: "Voluntary Contribution",
    amountPaid: 0,
  },
  {
    id: "8",
    studentId: "01213",
    studentName: "Sanju S",
    parentName: "Suresh K",
    studentClass: "JKG",
    section: "A",
    group: "",
    academicYear: "2024-25",
    paidOn: "2026-09-30",
    feesType: "Voluntary Contribution",
    amountPaid: 0,
  },
  {
    id: "9",
    studentId: "01217",
    studentName: "Nivinkarthik R",
    parentName: "Ramesh P",
    studentClass: "JKG",
    section: "A",
    group: "",
    academicYear: "2024-25",
    paidOn: "2026-09-30",
    feesType: "Voluntary Contribution",
    amountPaid: 0,
  },
  {
    id: "10",
    studentId: "01210",
    studentName: "Jashwanth A",
    parentName: "Ambalavanan V",
    studentClass: "JKG",
    section: "A",
    group: "",
    academicYear: "2024-25",
    paidOn: "2026-09-30",
    feesType: "Voluntary Contribution",
    amountPaid: 0,
  },
  {
    id: "11",
    studentId: "01225",
    studentName: "Tharun Kumar R",
    parentName: "Rajendran S",
    studentClass: "UKG",
    section: "A",
    group: "",
    academicYear: "2024-25",
    paidOn: "2026-09-30",
    feesType: "Voluntary Contribution",
    amountPaid: 0,
  },
  {
    id: "12",
    studentId: "01230",
    studentName: "Harini S",
    parentName: "Senthil Nathan P",
    studentClass: "I",
    section: "A",
    group: "",
    academicYear: "2024-25",
    paidOn: "2026-09-30",
    feesType: "Voluntary Contribution",
    amountPaid: 0,
  },
];

const TeachersContributionList: React.FC = () => {
  const { primaryColor, baseMode } = useThemeStore();
  const isDark = baseMode === "dark";

  // Modal State
  const [selectedRecord, setSelectedRecord] = useState<TeacherContributionRecord | null>(null);

  // Search & Filter State
  const [quickSearch, setQuickSearch] = useState("");
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [studentIdFilter, setStudentIdFilter] = useState("");
  const [studentNameFilter, setStudentNameFilter] = useState("");
  const [parentNameFilter, setParentNameFilter] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [sectionFilter, setSectionFilter] = useState("All");
  const [academicYearFilter, setAcademicYearFilter] = useState("All");

  const allHeaders: DataTableHeader<TeacherContributionRecord>[] = useMemo(
    () => [
      {
        label: "Student ID",
        key: "studentId",
        field: "studentId",
        minWidth: 140,
        sortable: true,
        searchEnable: true,
        render: (row) => (
          <Link
            component="button"
            underline="hover"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedRecord(row);
            }}
            sx={{
              fontWeight: 650,
              color: (theme) =>
                theme.palette.mode === "dark" ? "#60A5FA" : "#1D4ED8",
              fontSize: "13px",
              fontFamily: '"Roboto", sans-serif',
              cursor: "pointer",
              textAlign: "left",
              border: "none",
              background: "none",
              p: 0,
              "&:hover": {
                color: primaryColor || COLORS.primary,
              },
            }}
          >
            {row.studentId}
          </Link>
        ),
      },
      {
        label: "Student Name",
        key: "studentName",
        field: "studentName",
        minWidth: 180,
        sortable: true,
        searchEnable: true,
      },
      {
        label: "Parent Name",
        key: "parentName",
        field: "parentName",
        minWidth: 180,
        sortable: true,
        searchEnable: true,
      },
      {
        label: "Class",
        key: "studentClass",
        field: "studentClass",
        minWidth: 110,
        sortable: true,
        searchEnable: true,
      },
      {
        label: "Section",
        key: "section",
        field: "section",
        minWidth: 100,
        sortable: true,
        searchEnable: true,
      },
      {
        label: "Group",
        key: "group",
        field: "group",
        minWidth: 120,
        sortable: true,
        searchEnable: true,
        render: (row) => row.group || "-",
      },
      {
        label: "Academic Year",
        key: "academicYear",
        field: "academicYear",
        minWidth: 140,
        sortable: true,
        searchEnable: true,
      },
      {
        label: "Settings",
        key: "actions",
        field: "id",
        minWidth: 70,
        align: "center",
        pinned: "right",
        headerRender: () => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <SettingsOutlinedIcon
              sx={{
                fontSize: 18,
                color: isDark ? "#94A3B8" : "#64748B",
              }}
            />
          </Box>
        ),
        render: (row) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
            }}
          >
            <Tooltip title="Edit Teachers Contribution">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedRecord(row);
                }}
                sx={{
                  color: isDark ? "#94A3B8" : "#64748B",
                  p: 0.5,
                  borderRadius: "4px",
                  "&:hover": {
                    color: primaryColor || COLORS.primary,
                    backgroundColor: isDark
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <EditOutlinedIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ],
    [isDark, primaryColor],
  );

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    allHeaders.forEach((h) => {
      const colKey = h.key || h.field || "";
      if (colKey) initial[colKey] = true;
    });
    return initial;
  });

  const [columnMenuAnchor, setColumnMenuAnchor] = useState<null | HTMLElement>(null);

  const toggleColumn = (key: string) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const visibleHeaders = useMemo(
    () =>
      allHeaders.filter((h) => {
        const colKey = h.key || h.field || "";
        return columnVisibility[colKey] !== false;
      }),
    [allHeaders, columnVisibility],
  );

  // Filter options
  const classOptions = useMemo(() => {
    const set = new Set(INITIAL_RECORDS.map((r) => r.studentClass));
    return ["All", ...Array.from(set)];
  }, []);

  const sectionOptions = useMemo(() => {
    const set = new Set(INITIAL_RECORDS.map((r) => r.section));
    return ["All", ...Array.from(set)];
  }, []);

  const academicYearOptions = useMemo(() => {
    const set = new Set(INITIAL_RECORDS.map((r) => r.academicYear));
    return ["All", ...Array.from(set)];
  }, []);

  const hasActiveFilters = useMemo(() => {
    return (
      studentIdFilter !== "" ||
      studentNameFilter !== "" ||
      parentNameFilter !== "" ||
      classFilter !== "All" ||
      sectionFilter !== "All" ||
      academicYearFilter !== "All"
    );
  }, [
    studentIdFilter,
    studentNameFilter,
    parentNameFilter,
    classFilter,
    sectionFilter,
    academicYearFilter,
  ]);

  const filteredRecords = useMemo(() => {
    return INITIAL_RECORDS.filter((r) => {
      if (quickSearch.trim()) {
        const q = quickSearch.toLowerCase();
        const matchesQuick =
          r.studentId.toLowerCase().includes(q) ||
          r.studentName.toLowerCase().includes(q) ||
          r.parentName.toLowerCase().includes(q) ||
          r.studentClass.toLowerCase().includes(q) ||
          r.section.toLowerCase().includes(q) ||
          (r.group && r.group.toLowerCase().includes(q)) ||
          r.academicYear.toLowerCase().includes(q);
        if (!matchesQuick) return false;
      }

      if (studentIdFilter.trim()) {
        if (!r.studentId.toLowerCase().includes(studentIdFilter.toLowerCase())) return false;
      }
      if (studentNameFilter.trim()) {
        if (!r.studentName.toLowerCase().includes(studentNameFilter.toLowerCase())) return false;
      }
      if (parentNameFilter.trim()) {
        if (!r.parentName.toLowerCase().includes(parentNameFilter.toLowerCase())) return false;
      }
      if (classFilter !== "All" && r.studentClass !== classFilter) return false;
      if (sectionFilter !== "All" && r.section !== sectionFilter) return false;
      if (academicYearFilter !== "All" && r.academicYear !== academicYearFilter) return false;

      return true;
    });
  }, [
    quickSearch,
    studentIdFilter,
    studentNameFilter,
    parentNameFilter,
    classFilter,
    sectionFilter,
    academicYearFilter,
  ]);

  const handleResetFilters = () => {
    setStudentIdFilter("");
    setStudentNameFilter("");
    setParentNameFilter("");
    setClassFilter("All");
    setSectionFilter("All");
    setAcademicYearFilter("All");
  };

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1.5 }}>
      {/* AddTeachersContribution Dialog Modal */}
      <AddTeachersContribution
        open={Boolean(selectedRecord)}
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
        onSaveSuccess={() => setSelectedRecord(null)}
      />

      {/* Top Action Toolbar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: { xs: "wrap", md: "nowrap" },
          gap: 1.5,
        }}
      >
        {/* Left: Title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1.1rem",
              color: isDark ? "#F8FAFC" : "#0F172A",
              fontFamily: '"Roboto", sans-serif',
              whiteSpace: "nowrap",
            }}
          >
            Teachers Contribution
          </Typography>
        </Box>

        {/* Right: Actions (Filter, Column Chooser, Refresh) + Quick Search on the right */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
          {/* Advanced Filter Button */}
          <Button
            variant="outlined"
            onClick={(e) => setFilterAnchorEl(e.currentTarget)}
            startIcon={<FilterAltOutlinedIcon sx={{ fontSize: 18 }} />}
            sx={{
              height: 36,
              borderRadius: "6px",
              borderColor: hasActiveFilters
                ? primaryColor || COLORS.primary
                : isDark
                  ? "#334155"
                  : "#CBD5E1",
              color: hasActiveFilters
                ? primaryColor || COLORS.primary
                : isDark
                  ? "#CBD5E1"
                  : "#475569",
              backgroundColor: hasActiveFilters
                ? isDark
                  ? "rgba(190, 18, 60, 0.15)"
                  : "rgba(190, 18, 60, 0.05)"
                : "transparent",
              textTransform: "none",
              fontSize: "0.85rem",
              fontWeight: 600,
              px: 1.5,
              "&:hover": {
                borderColor: primaryColor || COLORS.primary,
                backgroundColor: isDark
                  ? "rgba(255, 255, 255, 0.05)"
                  : "rgba(0, 0, 0, 0.02)",
              },
            }}
          >
            Filters {hasActiveFilters && "•"}
          </Button>

          {/* Column Chooser Button */}
          <Tooltip title="Manage Columns">
            <IconButton
              onClick={(e) => setColumnMenuAnchor(e.currentTarget)}
              sx={{
                width: 36,
                height: 36,
                borderRadius: "6px",
                border: "1px solid",
                borderColor: isDark ? "#334155" : "#CBD5E1",
                color: isDark ? "#CBD5E1" : "#475569",
                "&:hover": {
                  borderColor: primaryColor || COLORS.primary,
                  color: primaryColor || COLORS.primary,
                },
              }}
            >
              <ViewColumnOutlinedIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>

          {/* Reset / Refresh */}
          <Tooltip title="Reset Grid">
            <IconButton
              onClick={() => {
                setQuickSearch("");
                handleResetFilters();
                toast.success("Grid refreshed");
              }}
              sx={{
                width: 36,
                height: 36,
                borderRadius: "6px",
                border: "1px solid",
                borderColor: isDark ? "#334155" : "#CBD5E1",
                color: isDark ? "#CBD5E1" : "#475569",
                "&:hover": {
                  borderColor: primaryColor || COLORS.primary,
                  color: primaryColor || COLORS.primary,
                },
              }}
            >
              <RefreshIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>

          {/* Quick Search on the right side */}
          <CustomTextField
            placeholder="Search Student ID, Name, Parent..."
            value={quickSearch}
            onChange={(e) => setQuickSearch(e.target.value)}
            width={{ xs: "100%", sm: 260 }}
            height={36}
          />
        </Box>
      </Box>

      {/* Filter Popover */}
      <Popover
        open={Boolean(filterAnchorEl)}
        anchorEl={filterAnchorEl}
        onClose={() => setFilterAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              p: 2.5,
              width: { xs: 300, sm: 360 },
              borderRadius: "8px",
              boxShadow: isDark
                ? "0 10px 25px -5px rgba(0, 0, 0, 0.6)"
                : "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              border: `1px solid ${isDark ? "#334155" : "#E2E8F0"}`,
              backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
            },
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: `1px solid ${isDark ? "#334155" : "#E2E8F0"}`,
              pb: 1,
            }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: "0.95rem" }}>
              Filter Records
            </Typography>
            {hasActiveFilters && (
              <Button
                size="small"
                onClick={handleResetFilters}
                sx={{
                  color: primaryColor || COLORS.primary,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  p: 0,
                }}
              >
                Clear All
              </Button>
            )}
          </Box>

          {/* Student ID */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              Student ID
            </Typography>
            <CustomTextField
              placeholder="Search Student ID..."
              value={studentIdFilter}
              onChange={(e) => setStudentIdFilter(e.target.value)}
            />
          </Box>

          {/* Student Name */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              Student Name
            </Typography>
            <CustomTextField
              placeholder="Search Student Name..."
              value={studentNameFilter}
              onChange={(e) => setStudentNameFilter(e.target.value)}
            />
          </Box>

          {/* Parent Name */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              Parent Name
            </Typography>
            <CustomTextField
              placeholder="Search Parent Name..."
              value={parentNameFilter}
              onChange={(e) => setParentNameFilter(e.target.value)}
            />
          </Box>

          {/* Class Filter */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              Class
            </Typography>
            <FormControl size="small" fullWidth>
              <Select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                sx={{
                  height: 36,
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                }}
              >
                {classOptions.map((opt) => (
                  <MenuItem key={opt} value={opt} sx={{ fontSize: "0.85rem" }}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Section Filter */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              Section
            </Typography>
            <FormControl size="small" fullWidth>
              <Select
                value={sectionFilter}
                onChange={(e) => setSectionFilter(e.target.value)}
                sx={{
                  height: 36,
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                }}
              >
                {sectionOptions.map((opt) => (
                  <MenuItem key={opt} value={opt} sx={{ fontSize: "0.85rem" }}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Academic Year Filter */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              Academic Year
            </Typography>
            <FormControl size="small" fullWidth>
              <Select
                value={academicYearFilter}
                onChange={(e) => setAcademicYearFilter(e.target.value)}
                sx={{
                  height: 36,
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                }}
              >
                {academicYearOptions.map((opt) => (
                  <MenuItem key={opt} value={opt} sx={{ fontSize: "0.85rem" }}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Button
            variant="contained"
            onClick={() => setFilterAnchorEl(null)}
            sx={{
              mt: 1,
              height: 36,
              backgroundColor: primaryColor || COLORS.primary,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.85rem",
              borderRadius: "6px",
              "&:hover": {
                backgroundColor: primaryColor || COLORS.primary,
                opacity: 0.9,
              },
            }}
          >
            Apply Filters
          </Button>
        </Box>
      </Popover>

      {/* Column Chooser Popover */}
      <Popover
        open={Boolean(columnMenuAnchor)}
        anchorEl={columnMenuAnchor}
        onClose={() => setColumnMenuAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              p: 2,
              width: 240,
              maxHeight: 380,
              borderRadius: "8px",
              border: `1px solid ${isDark ? "#334155" : "#E2E8F0"}`,
              backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
            },
          },
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: "0.9rem", mb: 1 }}>
          Manage Columns
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {allHeaders
            .filter((h) => (h.key || h.field) !== "actions")
            .map((h) => {
              const colKey = h.key || h.field || "";
              return (
                <FormControlLabel
                  key={colKey}
                  control={
                    <Checkbox
                      size="small"
                      checked={columnVisibility[colKey] !== false}
                      onChange={() => toggleColumn(colKey)}
                      sx={{
                        p: 0.5,
                        color: primaryColor || COLORS.primary,
                        "&.Mui-checked": {
                          color: primaryColor || COLORS.primary,
                        },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: "0.85rem" }}>
                      {h.label}
                    </Typography>
                  }
                />
              );
            })}
        </Box>
      </Popover>

      {/* Main DataTable */}
      <DataTableAG<TeacherContributionRecord>
        columns={visibleHeaders}
        data={filteredRecords}
        showSerialNo={false}
        bordered={true}
        zebra={true}
        tableHeight="calc(100vh - 220px)"
        pagination={true}
        paginationPageSize={25}
        rowsPerPageOptions={[10, 25, 50, 100]}
      />
    </Box>
  );
};

export default TeachersContributionList;
