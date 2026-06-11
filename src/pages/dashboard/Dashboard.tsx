import React from "react";
import {
  Box,
  Card,
  Grid,
  Typography,
  Stack,
  LinearProgress,
  Button,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useThemeStore } from "../../store/themeStore";
import { COLORS } from "../../theme/colors";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  trend: number;
  unit?: string;
  index?: number;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  icon,
  color,
  trend,
  unit,
  index = 0,
}) => {
  const { mode } = useThemeStore();
  const isDark = mode === "dark";
  const colors = isDark ? COLORS.dark : COLORS.light;
  const IconComponent = (MuiIcons as any)[icon] || MuiIcons.Dashboard;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card
        sx={{
          p: 3,
          backgroundImage: isDark
            ? `linear-gradient(135deg, ${COLORS.glass.dark} 0%, ${COLORS.glass.dark} 100%)`
            : `linear-gradient(135deg, ${COLORS.glass.light} 0%, ${COLORS.glass.light} 100%)`,
          backdropFilter: "blur(10px)",
          border: `1px solid ${isDark ? COLORS.glass.darkBorder : COLORS.glass.lightBorder}`,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            borderColor: color,
            boxShadow: `0 8px 32px ${color}20`,
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <Box
            sx={{
              p: 1.5,
              borderRadius: "50%",
              backgroundColor: `${color}20`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconComponent sx={{ color, fontSize: 24 }} />
          </Box>
          <Chip
            size="small"
            icon={
              trend >= 0 ? (
                <MuiIcons.TrendingUp sx={{ fontSize: 14 }} />
              ) : (
                <MuiIcons.TrendingDown sx={{ fontSize: 14 }} />
              )
            }
            label={`${trend >= 0 ? "+" : ""}${trend}%`}
            sx={{
              backgroundColor:
                trend >= 0 ? `${COLORS.success}20` : `${COLORS.danger}20`,
              color: trend >= 0 ? COLORS.success : COLORS.danger,
              fontWeight: 600,
            }}
          />
        </Stack>

        <Typography
          variant="body2"
          sx={{ color: colors.textSecondary, mb: 0.5 }}
        >
          {title}
        </Typography>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 1,
            background: COLORS.gradient.primary,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {value}
          {unit && <span style={{ fontSize: "0.875rem" }}> {unit}</span>}
        </Typography>

        <LinearProgress
          variant="determinate"
          value={Math.min(100, parseInt(String(value)))}
          sx={{
            backgroundColor: isDark
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.05)",
            borderRadius: 2,
            "& .MuiLinearProgress-bar": {
              background: COLORS.gradient.primary,
              borderRadius: 2,
            },
          }}
        />
      </Card>
    </motion.div>
  );
};

const Dashboard: React.FC = () => {
  const { mode } = useThemeStore();
  const isDark = mode === "dark";
  const colors = isDark ? COLORS.dark : COLORS.light;
  const [tabValue, setTabValue] = React.useState(0);

  const kpiCards = [
    {
      title: "Total Students",
      value: 1250,
      icon: "School",
      color: COLORS.primary,
      trend: 12,
    },
    {
      title: "Total Teachers",
      value: 85,
      icon: "Person",
      color: COLORS.secondary,
      trend: 8,
    },
    {
      title: "Today's Attendance",
      value: 92,
      icon: "CheckCircle",
      color: COLORS.success,
      trend: 5,
      unit: "%",
    },
    {
      title: "Pending Fees",
      value: 28500,
      icon: "LocalOffer",
      color: COLORS.warning,
      trend: -3,
      unit: "₹",
    },
  ];

  const attendanceData = [
    { name: "Mon", value: 95 },
    { name: "Tue", value: 92 },
    { name: "Wed", value: 88 },
    { name: "Thu", value: 91 },
    { name: "Fri", value: 87 },
    { name: "Sat", value: 94 },
  ];

  const feesData = [
    { name: "Paid", value: 71500, fill: COLORS.success },
    { name: "Pending", value: 28500, fill: COLORS.warning },
  ];

  const recentAdmissions = [
    {
      id: 1,
      name: "John Doe",
      class: "10-A",
      admissionDate: "2024-01-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      class: "9-B",
      admissionDate: "2024-01-10",
      status: "Active",
    },
    {
      id: 3,
      name: "Mike Johnson",
      class: "8-C",
      admissionDate: "2024-01-08",
      status: "Pending",
    },
  ];

  return (
    <Box>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Box mb={4}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Welcome Back, Admin!
          </Typography>
          <Typography variant="body2" sx={{ color: colors.textSecondary }}>
            Here's what's happening in your school today.
          </Typography>
        </Box>
      </motion.div>

      {/* KPI Cards */}
      <Grid container spacing={3} mb={4}>
        {kpiCards.map((card, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <KPICard {...card} index={index} />
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} mb={4}>
        {/* Attendance Chart */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card
              sx={{
                p: 3,
                backgroundImage: isDark
                  ? `linear-gradient(135deg, ${COLORS.glass.dark} 0%, ${COLORS.glass.dark} 100%)`
                  : `linear-gradient(135deg, ${COLORS.glass.light} 0%, ${COLORS.glass.light} 100%)`,
                backdropFilter: "blur(10px)",
                border: `1px solid ${isDark ? COLORS.glass.darkBorder : COLORS.glass.lightBorder}`,
                height: "100%",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Attendance Trend
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={attendanceData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={isDark ? "#334155" : "#E2E8F0"}
                  />
                  <XAxis stroke={colors.textTertiary} />
                  <YAxis stroke={colors.textTertiary} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
                      border: `1px solid ${colors.border}`,
                      borderRadius: 8,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={COLORS.primary}
                    strokeWidth={3}
                    dot={{ fill: COLORS.primary, r: 5 }}
                    activeDot={{ r: 7 }}
                    animationDuration={800}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Grid>

        {/* Fees Collection Chart */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Card
              sx={{
                p: 3,
                backgroundImage: isDark
                  ? `linear-gradient(135deg, ${COLORS.glass.dark} 0%, ${COLORS.glass.dark} 100%)`
                  : `linear-gradient(135deg, ${COLORS.glass.light} 0%, ${COLORS.glass.light} 100%)`,
                backdropFilter: "blur(10px)",
                border: `1px solid ${isDark ? COLORS.glass.darkBorder : COLORS.glass.lightBorder}`,
                height: "100%",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Fees Collection Status
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={feesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ₹${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    animationDuration={800}
                  >
                    {feesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
                      border: `1px solid ${colors.border}`,
                      borderRadius: 8,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Recent Admissions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <Card
          sx={{
            backgroundImage: isDark
              ? `linear-gradient(135deg, ${COLORS.glass.dark} 0%, ${COLORS.glass.dark} 100%)`
              : `linear-gradient(135deg, ${COLORS.glass.light} 0%, ${COLORS.glass.light} 100%)`,
            backdropFilter: "blur(10px)",
            border: `1px solid ${isDark ? COLORS.glass.darkBorder : COLORS.glass.lightBorder}`,
          }}
        >
          <Box sx={{ p: 3, borderBottom: `1px solid ${colors.border}` }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Recent Admissions
              </Typography>
              <Button
                endIcon={<MuiIcons.ArrowForward />}
                sx={{
                  color: COLORS.primary,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                View All
              </Button>
            </Stack>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.02)"
                      : "rgba(0,0,0,0.02)",
                  }}
                >
                  <TableCell sx={{ fontWeight: 700 }}>Student Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Class</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Admission Date</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentAdmissions.map((row, index) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.class}</TableCell>
                    <TableCell>{row.admissionDate}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        size="small"
                        sx={{
                          backgroundColor:
                            row.status === "Active"
                              ? `${COLORS.success}20`
                              : `${COLORS.warning}20`,
                          color:
                            row.status === "Active"
                              ? COLORS.success
                              : COLORS.warning,
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Dashboard;
