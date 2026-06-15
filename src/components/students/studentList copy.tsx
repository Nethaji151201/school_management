import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  Card,
  InputAdornment,
  Chip,
} from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import DataTable from "../../components/common/DataTable";
import CustomTextField from "../../components/common/CustomTextField";
import type { DataTableHeader } from "../../components/common/DataTable";
import { useThemeStore } from "../../store/themeStore";
import { COLORS } from "../../theme/colors";

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

const studentHeaders: DataTableHeader<Student>[] = [
  {
    label: "Student ID",
    key: "studentId",
    minWidth: 120,
    sortable: true,
    searchEnable: true,
    render: (row) => (
      <Typography
        variant="body2"
        sx={{ fontFamily: "monospace", fontWeight: 600 }}
      >
        {row.studentId}
      </Typography>
    ),
  },
  {
    label: "Exam No",
    key: "examNo",
    minWidth: 120,
    sortable: true,
    searchEnable: true,
    render: (row) => (
      <Typography
        variant="body2"
        sx={{ fontFamily: "monospace", color: "text.secondary" }}
      >
        {row.examNo}
      </Typography>
    ),
  },
  {
    label: "EMIS Number",
    key: "emisNumber",
    minWidth: 140,
    sortable: true,
    searchEnable: true,
  },
  {
    label: "Full Name",
    key: "fullName",
    minWidth: 160,
    sortable: true,
    searchEnable: true,
    render: (row) => (
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {row.fullName}
      </Typography>
    ),
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
    minWidth: 120,
    sortable: true,
    searchEnable: true,
  },
  {
    label: "Class",
    key: "class",
    minWidth: 100,
    sortable: true,
    searchEnable: true,
    render: (row) => (
      <Chip
        label={`Class ${row.class}`}
        size="small"
        sx={{
          fontWeight: 600,
          fontSize: "0.75rem",
          backgroundColor: "action.selected",
        }}
      />
    ),
  },
  {
    label: "Section",
    key: "section",
    minWidth: 100,
    sortable: true,
    searchEnable: true,
    render: (row) => (
      <Chip
        label={`Sec ${row.section}`}
        size="small"
        sx={{
          fontWeight: 600,
          fontSize: "0.75rem",
          backgroundColor: "action.hover",
          color: COLORS.primary,
          border: `1px solid ${COLORS.primary}30`,
        }}
      />
    ),
  },
  {
    label: "Status",
    key: "status",
    minWidth: 130,
    sortable: true,
    searchEnable: true,
    render: (row) => {
      const isActive = row.status === "Active";
      const badgeColor = isActive ? COLORS.success : COLORS.danger;
      const badgeBg = isActive
        ? "rgba(34, 197, 94, 0.12)"
        : "rgba(239, 68, 68, 0.12)";
      return (
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: 1.5,
            py: 0.5,
            borderRadius: "20px",
            backgroundColor: badgeBg,
            color: badgeColor,
            fontWeight: 700,
            fontSize: "0.75rem",
            border: `1px solid ${isActive ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)"}`,
          }}
        >
          <Box
            component="span"
            className={isActive ? "pulse-dot-green" : "pulse-dot-red"}
            sx={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: badgeColor,
              display: "inline-block",
            }}
          />
          {row.status}
        </Box>
      );
    },
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
    minWidth: 200,
    sortable: true,
    searchEnable: true,
  },
  { label: "Religion", key: "religion", minWidth: 110, sortable: true },
  { label: "Community", key: "community", minWidth: 110, sortable: true },
  {
    label: "Mother Tongue",
    key: "motherTongue",
    minWidth: 120,
    sortable: true,
    align: "center",
  },
  {
    label: "Actions",
    key: "actions",
    minWidth: 100,
    align: "center",
    render: (row) => (
      <IconButton
        size="small"
        sx={{
          color: COLORS.primary,
          backgroundColor: `${COLORS.primary}15`,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: COLORS.primary,
            color: "#fff",
            transform: "scale(1.1)",
            boxShadow: `0 4px 12px ${COLORS.primary}40`,
          },
        }}
        aria-label={`edit-${row.studentId}`}
      >
        <MuiIcons.Edit fontSize="small" />
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
  const { mode } = useThemeStore();
  const isDark = mode === "dark";
  const colors = isDark ? COLORS.dark : COLORS.light;

  const [studentName, setStudentName] = useState("");
  const [examNo, setExamNo] = useState("");
  const [parentName, setParentName] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [religionFilter, setReligionFilter] = useState("");
  const [showFilters, setShowFilters] = useState(true);

  const filteredRows = studentRows.filter((s) => {
    if (
      studentName &&
      !s.fullName.toLowerCase().includes(studentName.toLowerCase())
    )
      return false;
    if (examNo && !s.examNo.toLowerCase().includes(examNo.toLowerCase()))
      return false;
    if (
      parentName &&
      !s.parentName.toLowerCase().includes(parentName.toLowerCase())
    )
      return false;
    if (
      statusFilter &&
      !s.status.toLowerCase().includes(statusFilter.toLowerCase())
    )
      return false;
    if (
      religionFilter &&
      !s.religion.toLowerCase().includes(religionFilter.toLowerCase())
    )
      return false;
    return true;
  });

  const totalStudents = studentRows.length;
  const activeStudents = studentRows.filter(
    (s) => s.status === "Active",
  ).length;
  const inactiveStudents = totalStudents - activeStudents;
  const sections = Array.from(
    new Set(studentRows.map((s) => s.section)),
  ).length;

  const stats = [
    {
      title: "Total Students",
      value: totalStudents,
      icon: <MuiIcons.School sx={{ fontSize: 26 }} />,
      color: COLORS.primary,
      bgColor: isDark ? "rgba(11, 156, 168, 0.15)" : "rgba(11, 156, 168, 0.08)",
      gradient: "linear-gradient(135deg, #0b9ca8 0%, #00acc1 100%)",
    },
    {
      title: "Active Students",
      value: activeStudents,
      icon: <MuiIcons.CheckCircle sx={{ fontSize: 26 }} />,
      color: COLORS.success,
      bgColor: isDark ? "rgba(34, 197, 94, 0.15)" : "rgba(34, 197, 94, 0.08)",
      gradient: "linear-gradient(135deg, #22C55E 0%, #10B981 100%)",
    },
    {
      title: "Inactive Students",
      value: inactiveStudents,
      icon: <MuiIcons.Cancel sx={{ fontSize: 26 }} />,
      color: COLORS.danger,
      bgColor: isDark ? "rgba(239, 68, 68, 0.15)" : "rgba(239, 68, 68, 0.08)",
      gradient: "linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)",
    },
    {
      title: "Total Sections",
      value: `${sections} (A, B, C, D)`,
      icon: <MuiIcons.Layers sx={{ fontSize: 26 }} />,
      color: COLORS.warning,
      bgColor: isDark ? "rgba(245, 158, 11, 0.15)" : "rgba(245, 158, 11, 0.08)",
      gradient: "linear-gradient(135deg, #F59E0B 0%, #F97316 100%)",
    },
  ];

  // Motion variants for stagger entrance animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 110,
        damping: 15,
      },
    },
  };

  const clearFilters = () => {
    setStudentName("");
    setExamNo("");
    setParentName("");
    setStatusFilter("");
    setReligionFilter("");
  };

  const isFiltered =
    studentName || examNo || parentName || statusFilter || religionFilter;

  return (
    <Box sx={{ width: "100%", px: 1, py: 2 }}>
      {/* CSS Keyframes for pulsing dot animation */}
      <style>{`
        @keyframes pulse-green {
          0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.6); }
          70% { box-shadow: 0 0 0 5px rgba(34, 197, 94, 0); }
          100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }
        @keyframes pulse-red {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.6); }
          70% { box-shadow: 0 0 0 5px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        .pulse-dot-green {
          animation: pulse-green 2s infinite;
        }
        .pulse-dot-red {
          animation: pulse-red 2s infinite;
        }
      `}</style>

      {/* Header Title Block */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.02em",
              background: COLORS.gradient.primary,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            Student Directory
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: colors.textSecondary, fontSize: "0.95rem" }}
          >
            Review student progress, sections, and roll details with the table
            below.
          </Typography>
        </Box>
      </motion.div>

      {/* Statistics Cards Row */}
      {/* <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{ marginBottom: "24px" }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(4, 1fr)",
            },
            gap: 2.5,
          }}
        >
          {stats.map((stat, idx) => (
            <motion.div key={idx} variants={itemVariants} whileHover={{ y: -5 }}>
              <Card
                sx={{
                  p: 2.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  borderRadius: "16px",
                  background: isDark
                    ? `linear-gradient(135deg, ${COLORS.glass.dark} 0%, ${COLORS.glass.dark} 100%)`
                    : `linear-gradient(135deg, ${COLORS.glass.light} 0%, ${COLORS.glass.light} 100%)`,
                  backdropFilter: "blur(12px)",
                  border: `1px solid ${isDark ? COLORS.glass.darkBorder : COLORS.glass.lightBorder}`,
                  boxShadow: isDark
                    ? "0 4px 20px rgba(0, 0, 0, 0.25)"
                    : "0 4px 20px rgba(15, 23, 42, 0.05)",
                  transition: "all 0.3s ease-in-out",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    borderColor: stat.color,
                    boxShadow: `0 8px 30px ${stat.color}15`,
                  },
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 4,
                    background: stat.gradient,
                  }}
                />

                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: stat.bgColor,
                    color: stat.color,
                  }}
                >
                  {stat.icon}
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: colors.textSecondary,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      fontWeight: 600,
                    }}
                  >
                    {stat.title}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: colors.text,
                      mt: 0.5,
                    }}
                  >
                    {stat.value}
                  </Typography>
                </Box>
              </Card>
            </motion.div>
          ))}
        </Box>
      </motion.div> */}

      {/* Advanced Expandable Search Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card
          sx={{
            mb: 3,
            borderRadius: "16px",
            background: isDark
              ? `linear-gradient(135deg, ${COLORS.glass.dark} 0%, ${COLORS.glass.dark} 100%)`
              : `linear-gradient(135deg, ${COLORS.glass.light} 0%, ${COLORS.glass.light} 100%)`,
            backdropFilter: "blur(12px)",
            border: `1px solid ${isDark ? COLORS.glass.darkBorder : COLORS.glass.lightBorder}`,
            boxShadow: isDark
              ? "0 4px 20px rgba(0, 0, 0, 0.2)"
              : "0 4px 20px rgba(15, 23, 42, 0.03)",
            overflow: "hidden",
          }}
        >
          {/* Header Toggle Bar */}
          <Box
            onClick={() => setShowFilters(!showFilters)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
              cursor: "pointer",
              backgroundColor: isDark
                ? "rgba(255,255,255,0.01)"
                : "rgba(0,0,0,0.01)",
              borderBottom: showFilters ? `1px solid ${colors.border}` : "none",
              "&:hover": {
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(0,0,0,0.02)",
              },
              transition: "all 0.2s",
            }}
          >
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  borderRadius: "8px",
                  backgroundColor: `${COLORS.primary}15`,
                  color: COLORS.primary,
                }}
              >
                <MuiIcons.FilterList sx={{ fontSize: 18 }} />
              </Box>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, color: colors.text }}
                >
                  Filter Directory
                </Typography>
                {!showFilters && (
                  <Typography
                    variant="caption"
                    sx={{ color: colors.textSecondary }}
                  >
                    {isFiltered
                      ? "Active filters applied"
                      : "Click to search by name, exam number, class, status etc."}
                  </Typography>
                )}
              </Box>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: "center" }}
              onClick={(e) => e.stopPropagation()}
            >
              {isFiltered && (
                <Button
                  size="small"
                  variant="text"
                  color="inherit"
                  onClick={clearFilters}
                  startIcon={<MuiIcons.RestartAlt />}
                  sx={{
                    fontSize: "0.75rem",
                    textTransform: "none",
                    fontWeight: 600,
                    color: colors.textSecondary,
                    "&:hover": { color: COLORS.danger },
                  }}
                >
                  Clear Filters
                </Button>
              )}
              <IconButton
                size="small"
                onClick={() => setShowFilters(!showFilters)}
              >
                <motion.div
                  animate={{ rotate: showFilters ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MuiIcons.ExpandMore />
                </motion.div>
              </IconButton>
            </Stack>
          </Box>

          {/* Collapsible content */}
          <AnimatePresence initial={false}>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <Box sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                        md: "repeat(3, 1fr)",
                      },
                      gap: 2.5,
                      alignItems: "center",
                    }}
                  >
                    {/* Student Name */}
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 700,
                          color: colors.textSecondary,
                          mb: 1,
                          display: "block",
                        }}
                      >
                        Student Name
                      </Typography>
                      <CustomTextField
                        placeholder="Search student name..."
                        value={studentName}
                        onChange={(event) => setStudentName(event.target.value)}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <MuiIcons.Person
                                  sx={{
                                    color: colors.textTertiary,
                                    fontSize: 18,
                                  }}
                                />
                              </InputAdornment>
                            ),
                          },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: isDark
                              ? "rgba(255,255,255,0.03)"
                              : "rgba(0,0,0,0.01)",
                            borderRadius: "10px",
                            "&:hover fieldset": { borderColor: COLORS.primary },
                            "&.Mui-focused fieldset": {
                              borderColor: COLORS.primary,
                              boxShadow: `0 0 0 3px ${COLORS.primary}20`,
                            },
                          },
                        }}
                      />
                    </Box>

                    {/* Exam Number */}
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 700,
                          color: colors.textSecondary,
                          mb: 1,
                          display: "block",
                        }}
                      >
                        Exam Number
                      </Typography>
                      <CustomTextField
                        placeholder="Search exam no..."
                        value={examNo}
                        onChange={(event) => setExamNo(event.target.value)}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <MuiIcons.Numbers
                                  sx={{
                                    color: colors.textTertiary,
                                    fontSize: 18,
                                  }}
                                />
                              </InputAdornment>
                            ),
                          },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: isDark
                              ? "rgba(255,255,255,0.03)"
                              : "rgba(0,0,0,0.01)",
                            borderRadius: "10px",
                            "&:hover fieldset": { borderColor: COLORS.primary },
                            "&.Mui-focused fieldset": {
                              borderColor: COLORS.primary,
                              boxShadow: `0 0 0 3px ${COLORS.primary}20`,
                            },
                          },
                        }}
                      />
                    </Box>

                    {/* Parent Name */}
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 700,
                          color: colors.textSecondary,
                          mb: 1,
                          display: "block",
                        }}
                      >
                        Parent Name
                      </Typography>
                      <CustomTextField
                        placeholder="Search parent name..."
                        value={parentName}
                        onChange={(event) => setParentName(event.target.value)}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <MuiIcons.SupervisorAccount
                                  sx={{
                                    color: colors.textTertiary,
                                    fontSize: 18,
                                  }}
                                />
                              </InputAdornment>
                            ),
                          },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: isDark
                              ? "rgba(255,255,255,0.03)"
                              : "rgba(0,0,0,0.01)",
                            borderRadius: "10px",
                            "&:hover fieldset": { borderColor: COLORS.primary },
                            "&.Mui-focused fieldset": {
                              borderColor: COLORS.primary,
                              boxShadow: `0 0 0 3px ${COLORS.primary}20`,
                            },
                          },
                        }}
                      />
                    </Box>

                    {/* Status */}
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 700,
                          color: colors.textSecondary,
                          mb: 1,
                          display: "block",
                        }}
                      >
                        Status
                      </Typography>
                      <CustomTextField
                        placeholder="e.g. Active, Inactive"
                        value={statusFilter}
                        onChange={(event) =>
                          setStatusFilter(event.target.value)
                        }
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <MuiIcons.ToggleOn
                                  sx={{
                                    color: colors.textTertiary,
                                    fontSize: 18,
                                  }}
                                />
                              </InputAdornment>
                            ),
                          },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: isDark
                              ? "rgba(255,255,255,0.03)"
                              : "rgba(0,0,0,0.01)",
                            borderRadius: "10px",
                            "&:hover fieldset": { borderColor: COLORS.primary },
                            "&.Mui-focused fieldset": {
                              borderColor: COLORS.primary,
                              boxShadow: `0 0 0 3px ${COLORS.primary}20`,
                            },
                          },
                        }}
                      />
                    </Box>

                    {/* Religion */}
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 700,
                          color: colors.textSecondary,
                          mb: 1,
                          display: "block",
                        }}
                      >
                        Religion
                      </Typography>
                      <CustomTextField
                        placeholder="Search religion..."
                        value={religionFilter}
                        onChange={(event) =>
                          setReligionFilter(event.target.value)
                        }
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <MuiIcons.AccountBalance
                                  sx={{
                                    color: colors.textTertiary,
                                    fontSize: 18,
                                  }}
                                />
                              </InputAdornment>
                            ),
                          },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: isDark
                              ? "rgba(255,255,255,0.03)"
                              : "rgba(0,0,0,0.01)",
                            borderRadius: "10px",
                            "&:hover fieldset": { borderColor: COLORS.primary },
                            "&.Mui-focused fieldset": {
                              borderColor: COLORS.primary,
                              boxShadow: `0 0 0 3px ${COLORS.primary}20`,
                            },
                          },
                        }}
                      />
                    </Box>

                    {/* Filter Actions */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        alignItems: "center",
                        justifyContent: "flex-end",
                        alignSelf: "flex-end",
                        height: 38,
                        mt: { xs: 1, md: 0 },
                      }}
                    >
                      {isFiltered && (
                        <Button
                          variant="outlined"
                          color="inherit"
                          onClick={clearFilters}
                          size="medium"
                          sx={{
                            borderRadius: "10px",
                            textTransform: "none",
                            fontWeight: 600,
                          }}
                        >
                          Clear
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        onClick={() => {}}
                        startIcon={<MuiIcons.Search />}
                        sx={{
                          borderRadius: "10px",
                          textTransform: "none",
                          background: COLORS.gradient.primary,
                          fontWeight: 600,
                          px: 3,
                          boxShadow: `0 4px 14px ${COLORS.primary}35`,
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: `0 6px 20px ${COLORS.primary}45`,
                          },
                          transition: "all 0.2s ease-in-out",
                        }}
                      >
                        Search
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>

      {/* Main DataTable Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.35 }}
      >
        <DataTable
          headers={studentHeaders}
          data={filteredRows}
          selectable
          serialNumber
          enablePagination
          emptyMessage="No students available matching your filters"
          onRowClick={(student) => {
            console.log("Selected student", student.fullName);
          }}
        />
      </motion.div>

      <DataTable
        headers={studentHeaders}
        data={filteredRows}
        selectable
        serialNumber
        enablePagination
        emptyMessage="No students available"
        onRowClick={(student) => {
          console.log("Selected student", student.fullName);
        }}
      />
    </Box>
  );
};

export default StudentList;
