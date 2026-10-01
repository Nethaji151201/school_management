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
  Link,
  Tooltip,
} from "@mui/material";
import ViewColumnOutlinedIcon from "@mui/icons-material/ViewColumnOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import toast from "react-hot-toast";

import DataTableAG from "../../common/DataTableAG";
import CustomTextField from "../../common/CustomTextField";
import CustomAutocomplete from "../../common/CustomAutocomplete";
import type { DataTableHeader } from "../../common/DataTableAG";
import { useThemeStore } from "../../../store/themeStore";
import { COLORS } from "../../../theme/colors";
import AddFeeUpdate from "./AddFeeUpdate";

export interface StudentFeeRecord {
  id: string;
  studentId: string;
  studentName: string;
  parentName: string;
  studentClass: string;
  section: string;
  group: string;
  academicYear: string;
}

const INITIAL_FEE_ROWS: StudentFeeRecord[] = [
  {
    id: "1",
    studentId: "01193",
    studentName: "Arshith V",
    parentName: "Venkatesh P",
    studentClass: "JKG",
    section: "A",
    group: "",
    academicYear: "2024-25",
  },
  {
    id: "2",
    studentId: "01198",
    studentName: "Aswanth S",
    parentName: "Saravanan P",
    studentClass: "JKG",
    section: "A",
    group: "",
    academicYear: "2024-25",
  },
  {
    id: "3",
    studentId: "01199",
    studentName: "Mugil P S",
    parentName: "Prakash J J",
    studentClass: "JKG",
    section: "A",
    group: "",
    academicYear: "2024-25",
  },
  {
    id: "4",
    studentId: "01202",
    studentName: "Dev Dheeshithan D N",
    parentName: "Dinesh babu V",
    studentClass: "JKG",
    section: "A",
    group: "",
    academicYear: "2024-25",
  },
  {
    id: "5",
    studentId: "01203",
    studentName: "Nikilan C",
    parentName: "Chandrasekar G",
    studentClass: "JKG",
    section: "A",
    group: "",
    academicYear: "2024-25",
  },
  {
    id: "6",
    studentId: "01207",
    studentName: "SuryaVarman S S",
    parentName: "Suman A",
    studentClass: "JKG",
    section: "A",
    group: "",
    academicYear: "2024-25",
  },
  {
    id: "7",
    studentId: "01212",
    studentName: "NIVIN A",
    parentName: "Ashwin K",
    studentClass: "JKG",
    section: "A",
    group: "",
    academicYear: "2024-25",
  },
  {
    id: "8",
    studentId: "01213",
    studentName: "Sanju S",
    parentName: "Satheesh kumar A",
    studentClass: "JKG",
    section: "A",
    group: "",
    academicYear: "2024-25",
  },
  {
    id: "9",
    studentId: "01217",
    studentName: "Nivinkarthik R",
    parentName: "Ranjithkumar A",
    studentClass: "JKG",
    section: "A",
    group: "",
    academicYear: "2024-25",
  },
  {
    id: "10",
    studentId: "01210",
    studentName: "Jashwanth A",
    parentName: "ARULKUMARAN M",
    studentClass: "JKG",
    section: "A",
    group: "",
    academicYear: "2024-25",
  },
  {
    id: "11",
    studentId: "01220",
    studentName: "Kaviyan M",
    parentName: "Murugan K",
    studentClass: "LKG",
    section: "B",
    group: "",
    academicYear: "2024-25",
  },
  {
    id: "12",
    studentId: "01225",
    studentName: "Tharun Kumar R",
    parentName: "Rajendran S",
    studentClass: "UKG",
    section: "A",
    group: "",
    academicYear: "2024-25",
  },
  {
    id: "13",
    studentId: "01230",
    studentName: "Harini S",
    parentName: "Senthil Nathan P",
    studentClass: "I",
    section: "A",
    group: "",
    academicYear: "2024-25",
  },
  {
    id: "14",
    studentId: "01235",
    studentName: "Gokulraj V",
    parentName: "Vijay Anand K",
    studentClass: "II",
    section: "B",
    group: "",
    academicYear: "2024-25",
  },
  {
    id: "15",
    studentId: "01240",
    studentName: "Sanjay Kumar M",
    parentName: "Manikandan R",
    studentClass: "XI",
    section: "A",
    group: "Bio-Maths",
    academicYear: "2024-25",
  },
];

const FeeUpdateList: React.FC = () => {
  const { primaryColor, baseMode } = useThemeStore();
  const isDark = baseMode === "dark";

  // Selected student for editing in AddFeeUpdate component
  const [selectedStudent, setSelectedStudent] = useState<StudentFeeRecord | null>(null);

  // Search & Filter State
  const [quickSearch, setQuickSearch] = useState("");
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [studentIdFilter, setStudentIdFilter] = useState("");
  const [studentNameFilter, setStudentNameFilter] = useState("");
  const [parentNameFilter, setParentNameFilter] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [sectionFilter, setSectionFilter] = useState("All");
  const [academicYearFilter, setAcademicYearFilter] = useState("All");

  const allFeeHeaders: DataTableHeader<StudentFeeRecord>[] = useMemo(
    () => [
      {
        label: "Student ID",
        key: "studentId",
        field: "studentId",
        minWidth: 130,
        sortable: true,
        searchEnable: true,
        render: (row) => (
          <Link
            component="button"
            underline="hover"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedStudent(row);
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
        minWidth: 130,
        sortable: true,
        searchEnable: true,
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
        label: "",
        headerName: "",
        key: "actions",
        minWidth: 60,
        width: 60,
        maxWidth: 70,
        align: "center",
        pinned: "right",
        sortable: false,
        resizable: false,
        filter: false,
        headerRender: () => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Tooltip title="Actions Settings">
              <SettingsIcon sx={{ fontSize: 18, color: "#FFFFFF" }} />
            </Tooltip>
          </Box>
        ),
        render: (row) => (
          <Tooltip title={`Edit Fees for ${row.studentName}`}>
            <IconButton
              size="small"
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedStudent(row);
              }}
              aria-label={`edit-${row.studentId}`}
              sx={{
                p: 0.5,
                color: primaryColor || COLORS.primary,
                "&:hover": {
                  backgroundColor: "rgba(190, 18, 60, 0.08)",
                },
              }}
            >
              <EditIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        ),
      },
    ],
    [primaryColor],
  );

  // Columns visibility state
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    [
      "studentId",
      "studentName",
      "parentName",
      "studentClass",
      "section",
      "group",
      "academicYear",
      "actions",
    ].forEach((k) => {
      initial[k] = true;
    });
    return initial;
  });

  const [columnMenuAnchor, setColumnMenuAnchor] = useState<null | HTMLElement>(null);

  // Filtered headers based on visible columns
  const activeHeaders = useMemo(() => {
    return allFeeHeaders.filter((col) => visibleColumns[col.key || ""]);
  }, [allFeeHeaders, visibleColumns]);

  // Filtered rows
  const filteredRows = useMemo(() => {
    return INITIAL_FEE_ROWS.filter((item) => {
      if (quickSearch.trim()) {
        const q = quickSearch.toLowerCase();
        const matches =
          item.studentId.toLowerCase().includes(q) ||
          item.studentName.toLowerCase().includes(q) ||
          item.parentName.toLowerCase().includes(q) ||
          item.studentClass.toLowerCase().includes(q) ||
          item.section.toLowerCase().includes(q) ||
          item.group.toLowerCase().includes(q) ||
          item.academicYear.toLowerCase().includes(q);
        if (!matches) return false;
      }

      if (
        studentIdFilter.trim() &&
        !item.studentId.toLowerCase().includes(studentIdFilter.trim().toLowerCase())
      )
        return false;

      if (
        studentNameFilter.trim() &&
        !item.studentName.toLowerCase().includes(studentNameFilter.trim().toLowerCase())
      )
        return false;

      if (
        parentNameFilter.trim() &&
        !item.parentName.toLowerCase().includes(parentNameFilter.trim().toLowerCase())
      )
        return false;

      if (classFilter !== "All" && item.studentClass !== classFilter) return false;
      if (sectionFilter !== "All" && item.section !== sectionFilter) return false;
      if (academicYearFilter !== "All" && item.academicYear !== academicYearFilter)
        return false;

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

  const hasActiveFilters = useMemo(() => {
    return (
      Boolean(studentIdFilter.trim()) ||
      Boolean(studentNameFilter.trim()) ||
      Boolean(parentNameFilter.trim()) ||
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
      {/* AddFeeUpdate Dialog Modal */}
      <AddFeeUpdate
        open={Boolean(selectedStudent)}
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
        onSaveSuccess={() => setSelectedStudent(null)}
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
            Student Fee Update
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
                toast.success("Grid filters refreshed");
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
              width: 340,
              borderRadius: "10px",
              boxShadow: isDark
                ? "0 10px 30px rgba(0,0,0,0.6)"
                : "0 10px 30px rgba(0,0,0,0.12)",
              backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
              border: "1px solid",
              borderColor: isDark ? "#334155" : "#E2E8F0",
            },
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.8 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Filter Records
            </Typography>
            {hasActiveFilters && (
              <Button
                size="small"
                onClick={handleResetFilters}
                sx={{ textTransform: "none", fontSize: "0.75rem", p: 0 }}
              >
                Clear All
              </Button>
            )}
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              Student ID
            </Typography>
            <CustomTextField
              placeholder="e.g. 01193"
              value={studentIdFilter}
              onChange={(e) => setStudentIdFilter(e.target.value)}
              height={34}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              Student Name
            </Typography>
            <CustomTextField
              placeholder="e.g. Arshith"
              value={studentNameFilter}
              onChange={(e) => setStudentNameFilter(e.target.value)}
              height={34}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              Parent Name
            </Typography>
            <CustomTextField
              placeholder="e.g. Venkatesh"
              value={parentNameFilter}
              onChange={(e) => setParentNameFilter(e.target.value)}
              height={34}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                Class
              </Typography>
              <CustomAutocomplete
                options={[
                  "All",
                  "JKG",
                  "LKG",
                  "UKG",
                  "I",
                  "II",
                  "III",
                  "IV",
                  "V",
                  "VI",
                  "VII",
                  "VIII",
                  "IX",
                  "X",
                  "XI",
                  "XII",
                ]}
                value={classFilter}
                onChange={(_, val) => setClassFilter(val || "All")}
                height={34}
              />
            </Box>
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                Section
              </Typography>
              <CustomAutocomplete
                options={["All", "A", "B", "C", "D"]}
                value={sectionFilter}
                onChange={(_, val) => setSectionFilter(val || "All")}
                height={34}
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              Academic Year
            </Typography>
            <CustomAutocomplete
              options={["All", "2024-25", "2025-26", "2023-24"]}
              value={academicYearFilter}
              onChange={(_, val) => setAcademicYearFilter(val || "All")}
              height={34}
            />
          </Box>

          <Button
            variant="contained"
            onClick={() => setFilterAnchorEl(null)}
            sx={{
              mt: 1,
              height: 36,
              borderRadius: "6px",
              textTransform: "none",
              fontWeight: 600,
              backgroundColor: primaryColor || COLORS.primary,
              "&:hover": {
                backgroundColor: primaryColor || COLORS.primary,
              },
            }}
          >
            Apply Filters
          </Button>
        </Box>
      </Popover>

      {/* Column Chooser Menu */}
      <Menu
        anchorEl={columnMenuAnchor}
        open={Boolean(columnMenuAnchor)}
        onClose={() => setColumnMenuAnchor(null)}
        slotProps={{
          paper: {
            sx: {
              maxHeight: 300,
              width: 220,
              p: 1,
              borderRadius: "8px",
            },
          },
        }}
      >
        <Typography variant="subtitle2" sx={{ px: 1, py: 0.5, fontWeight: 700 }}>
          Visible Columns
        </Typography>
        {allFeeHeaders.map((col) => {
          const colKey = col.key || "";
          if (!col.label && colKey === "actions") return null;
          return (
            <MenuItem key={colKey} sx={{ py: 0.25, px: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={visibleColumns[colKey] !== false}
                    onChange={(e) =>
                      setVisibleColumns((prev) => ({
                        ...prev,
                        [colKey]: e.target.checked,
                      }))
                    }
                  />
                }
                label={
                  <Typography variant="body2" sx={{ fontSize: "0.82rem" }}>
                    {col.label || colKey}
                  </Typography>
                }
                sx={{ m: 0, width: "100%" }}
              />
            </MenuItem>
          );
        })}
      </Menu>

      {/* AG Grid Table View */}
      <DataTableAG<StudentFeeRecord>
        columns={activeHeaders}
        data={filteredRows}
        showSerialNo={true}
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

export default FeeUpdateList;
