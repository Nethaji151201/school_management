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
import AddFeeEdit, { type StudentFeeEditRecord } from "./AddFeeEdit";

const INITIAL_FEE_EDIT_ROWS: StudentFeeEditRecord[] = [
  {
    id: "1",
    feesPaidOn: "06-10-2025",
    receiptNo: "JNA0903",
    studentId: "00980",
    studentName: "KRISTEN LALRINPUIA V",
    parentName: "VISPINKIRUBA I",
    studentClass: "SKG",
    section: "A",
    feesType: "Voluntary Contribution",
    amountPaid: 5000,
    actualFees: 5000,
    concession: 0,
    academicYear: "2024-25",
    term: "Term 1",
  },
  {
    id: "2",
    feesPaidOn: "04-10-2025",
    receiptNo: "JNA0902",
    studentId: "01380",
    studentName: "HARISARAVANA PRABHU R",
    parentName: "RANGANATHAN P",
    studentClass: "9",
    section: "A",
    feesType: "Voluntary Contribution",
    amountPaid: 5000,
    actualFees: 5000,
    concession: 0,
    academicYear: "2024-25",
    term: "Term 1",
  },
  {
    id: "3",
    feesPaidOn: "03-10-2025",
    receiptNo: "JNA0899",
    studentId: "00922",
    studentName: "ABDUL RASHEED",
    parentName: "Mohammed Haneefa",
    studentClass: "1",
    section: "B",
    feesType: "Voluntary Contribution",
    amountPaid: 5000,
    actualFees: 5000,
    concession: 0,
    academicYear: "2024-25",
    term: "Term 1",
  },
  {
    id: "4",
    feesPaidOn: "03-10-2025",
    receiptNo: "JNA0900",
    studentId: "01285",
    studentName: "Ashvath G",
    parentName: "Gunasekaran S",
    studentClass: "2",
    section: "A",
    feesType: "Voluntary Contribution",
    amountPaid: 5000,
    actualFees: 5000,
    concession: 0,
    academicYear: "2024-25",
    term: "Term 1",
  },
  {
    id: "5",
    feesPaidOn: "03-10-2025",
    receiptNo: "JNA0901",
    studentId: "01047",
    studentName: "SHERILL SAM V",
    parentName: "VELMANI K",
    studentClass: "SKG",
    section: "A",
    feesType: "Voluntary Contribution",
    amountPaid: 5000,
    actualFees: 5000,
    concession: 0,
    academicYear: "2024-25",
    term: "Term 1",
  },
  {
    id: "6",
    feesPaidOn: "23-07-2025",
    receiptNo: "1624",
    studentId: "00939",
    studentName: "Vel Kumar A.S",
    parentName: "Ambalavanan V",
    studentClass: "7",
    section: "B",
    feesType: "Tuition Fees",
    amountPaid: 23000,
    actualFees: 23000,
    concession: 0,
    academicYear: "2024-25",
    term: "Term 1",
  },
  {
    id: "7",
    feesPaidOn: "23-07-2025",
    receiptNo: "1624",
    studentId: "00939",
    studentName: "Vel Kumar A.S",
    parentName: "Ambalavanan V",
    studentClass: "7",
    section: "B",
    feesType: "Lunch and Snacks",
    amountPaid: 3500,
    actualFees: 3500,
    concession: 0,
    academicYear: "2024-25",
    term: "Term 1",
  },
  {
    id: "8",
    feesPaidOn: "11-04-2025",
    receiptNo: "1623",
    studentId: "00323",
    studentName: "Eniyan G.V",
    parentName: "gopi M",
    studentClass: "7",
    section: "A",
    feesType: "Tuition Fees",
    amountPaid: 23000,
    actualFees: 23000,
    concession: 0,
    academicYear: "2024-25",
    term: "Term 1",
  },
  {
    id: "9",
    feesPaidOn: "11-04-2025",
    receiptNo: "1623",
    studentId: "00323",
    studentName: "Eniyan G.V",
    parentName: "gopi M",
    studentClass: "7",
    section: "A",
    feesType: "Lunch and Snacks",
    amountPaid: 3500,
    actualFees: 3500,
    concession: 0,
    academicYear: "2024-25",
    term: "Term 1",
  },
  {
    id: "10",
    feesPaidOn: "08-04-2025",
    receiptNo: "1622",
    studentId: "00466",
    studentName: "Hareesh A",
    parentName: "Arul Murugan P",
    studentClass: "6",
    section: "A",
    feesType: "Tuition Fees",
    amountPaid: 22000,
    actualFees: 22000,
    concession: 0,
    academicYear: "2024-25",
    term: "Term 1",
  },
];

const FeeEditList: React.FC = () => {
  const { primaryColor, baseMode } = useThemeStore();
  const isDark = baseMode === "dark";

  // Selected record for editing in AddFeeEdit modal
  const [selectedRecord, setSelectedRecord] = useState<StudentFeeEditRecord | null>(null);

  // Search & Filter State
  const [quickSearch, setQuickSearch] = useState("");
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [studentIdFilter, setStudentIdFilter] = useState("");
  const [studentNameFilter, setStudentNameFilter] = useState("");
  const [receiptNoFilter, setReceiptNoFilter] = useState("");
  const [feesTypeFilter, setFeesTypeFilter] = useState("All");
  const [classFilter, setClassFilter] = useState("All");
  const [sectionFilter, setSectionFilter] = useState("All");

  const allHeaders: DataTableHeader<StudentFeeEditRecord>[] = useMemo(
    () => [
      {
        label: "Fees Paid On",
        key: "feesPaidOn",
        field: "feesPaidOn",
        minWidth: 130,
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
            {row.feesPaidOn}
          </Link>
        ),
      },
      {
        label: "Receipt No",
        key: "receiptNo",
        field: "receiptNo",
        minWidth: 120,
        sortable: true,
        searchEnable: true,
      },
      {
        label: "Student ID",
        key: "studentId",
        field: "studentId",
        minWidth: 110,
        sortable: true,
        searchEnable: true,
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
        minWidth: 170,
        sortable: true,
        searchEnable: true,
      },
      {
        label: "Class",
        key: "studentClass",
        field: "studentClass",
        minWidth: 90,
        sortable: true,
        searchEnable: true,
      },
      {
        label: "Section",
        key: "section",
        field: "section",
        minWidth: 90,
        sortable: true,
        searchEnable: true,
      },
      {
        label: "Fees Type",
        key: "feesType",
        field: "feesType",
        minWidth: 170,
        sortable: true,
        searchEnable: true,
      },
      {
        label: "Amount Paid",
        key: "amountPaid",
        field: "amountPaid",
        minWidth: 130,
        align: "right",
        sortable: true,
        searchEnable: true,
        render: (row) => (
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              fontSize: "13px",
              color: isDark ? "#F8FAFC" : "#0F172A",
              fontFamily: '"Roboto", sans-serif',
            }}
          >
            {Number(row.amountPaid).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>
        ),
      },
      {
        label: "Concession",
        key: "concession",
        field: "concession",
        minWidth: 110,
        align: "right",
        sortable: true,
        searchEnable: true,
        render: (row) => (
          <Typography
            variant="body2"
            sx={{
              fontSize: "13px",
              color: "text.secondary",
              fontFamily: '"Roboto", sans-serif',
            }}
          >
            {Number(row.concession).toFixed(2)}
          </Typography>
        ),
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
                setSelectedRecord(row);
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
    [primaryColor, isDark],
  );

  // Columns visibility state
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    [
      "feesPaidOn",
      "receiptNo",
      "studentId",
      "studentName",
      "parentName",
      "studentClass",
      "section",
      "feesType",
      "amountPaid",
      "concession",
      "actions",
    ].forEach((k) => {
      initial[k] = true;
    });
    return initial;
  });

  const [columnMenuAnchor, setColumnMenuAnchor] = useState<null | HTMLElement>(null);

  // Filtered headers based on visible columns
  const activeHeaders = useMemo(() => {
    return allHeaders.filter((col) => visibleColumns[col.key || ""]);
  }, [allHeaders, visibleColumns]);

  // Filtered rows
  const filteredRows = useMemo(() => {
    return INITIAL_FEE_EDIT_ROWS.filter((item) => {
      if (quickSearch.trim()) {
        const q = quickSearch.toLowerCase();
        const matches =
          item.feesPaidOn.toLowerCase().includes(q) ||
          item.receiptNo.toLowerCase().includes(q) ||
          item.studentId.toLowerCase().includes(q) ||
          item.studentName.toLowerCase().includes(q) ||
          item.parentName.toLowerCase().includes(q) ||
          item.studentClass.toLowerCase().includes(q) ||
          item.section.toLowerCase().includes(q) ||
          item.feesType.toLowerCase().includes(q) ||
          String(item.amountPaid).includes(q);
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
        receiptNoFilter.trim() &&
        !item.receiptNo.toLowerCase().includes(receiptNoFilter.trim().toLowerCase())
      )
        return false;

      if (feesTypeFilter !== "All" && item.feesType !== feesTypeFilter) return false;
      if (classFilter !== "All" && item.studentClass !== classFilter) return false;
      if (sectionFilter !== "All" && item.section !== sectionFilter) return false;

      return true;
    });
  }, [
    quickSearch,
    studentIdFilter,
    studentNameFilter,
    receiptNoFilter,
    feesTypeFilter,
    classFilter,
    sectionFilter,
  ]);

  const hasActiveFilters = useMemo(() => {
    return (
      Boolean(studentIdFilter.trim()) ||
      Boolean(studentNameFilter.trim()) ||
      Boolean(receiptNoFilter.trim()) ||
      feesTypeFilter !== "All" ||
      classFilter !== "All" ||
      sectionFilter !== "All"
    );
  }, [
    studentIdFilter,
    studentNameFilter,
    receiptNoFilter,
    feesTypeFilter,
    classFilter,
    sectionFilter,
  ]);

  const handleResetFilters = () => {
    setStudentIdFilter("");
    setStudentNameFilter("");
    setReceiptNoFilter("");
    setFeesTypeFilter("All");
    setClassFilter("All");
    setSectionFilter("All");
  };

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1.5 }}>
      {/* AddFeeEdit Dialog Modal */}
      <AddFeeEdit
        open={Boolean(selectedRecord)}
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
        onSaveSuccess={() => setSelectedRecord(null)}
        onDeleteSuccess={() => setSelectedRecord(null)}
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
            Student Fees Edit
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
            placeholder="Search Receipt, Student ID, Name..."
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
              Filter Fees Edit Records
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
              Receipt No
            </Typography>
            <CustomTextField
              placeholder="e.g. JNA0903"
              value={receiptNoFilter}
              onChange={(e) => setReceiptNoFilter(e.target.value)}
              height={34}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              Student ID
            </Typography>
            <CustomTextField
              placeholder="e.g. 00980"
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
              placeholder="e.g. KRISTEN"
              value={studentNameFilter}
              onChange={(e) => setStudentNameFilter(e.target.value)}
              height={34}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              Fees Type
            </Typography>
            <CustomAutocomplete
              options={["All", "Voluntary Contribution", "Tuition Fees", "Lunch and Snacks", "Study Materials"]}
              value={feesTypeFilter}
              onChange={(_, val) => setFeesTypeFilter(val || "All")}
              height={34}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                Class
              </Typography>
              <CustomAutocomplete
                options={["All", "SKG", "JKG", "LKG", "UKG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]}
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
        {allHeaders.map((col) => {
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
      <DataTableAG<StudentFeeEditRecord>
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

export default FeeEditList;
