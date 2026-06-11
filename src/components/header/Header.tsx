import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Divider,
  Typography,
  Stack,
  Chip,
} from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { motion } from "framer-motion";
import { useThemeStore } from "../../store/themeStore";
import { useSidebarStore } from "../../store/menuStore";
import { COLORS } from "../../theme/colors";

const Header: React.FC = () => {
  const { mode, toggleTheme } = useThemeStore();
  const { isCollapsed } = useSidebarStore();
  const isDark = mode === "dark";
  const colors = isDark ? COLORS.dark : COLORS.light;

  const [notificationAnchor, setNotificationAnchor] =
    useState<null | HTMLElement>(null);
  const [academicYearAnchor, setAcademicYearAnchor] =
    useState<null | HTMLElement>(null);
  const [avatarAnchor, setAvatarAnchor] = useState<null | HTMLElement>(null);

  const notifications = [
    {
      id: 1,
      title: "Fees Payment Received",
      message: "Student John Doe paid $5000",
      timestamp: "2 mins ago",
      read: false,
    },
    {
      id: 2,
      title: "Attendance Alert",
      message: "5 students absent today",
      timestamp: "1 hour ago",
      read: true,
    },
    {
      id: 3,
      title: "Exam Schedule Updated",
      message: "Final exams schedule has been updated",
      timestamp: "3 hours ago",
      read: true,
    },
  ];

  const academicYears = [
    { id: 1, year: "2024-2025", isActive: true },
    { id: 2, year: "2023-2024", isActive: false },
    { id: 3, year: "2022-2023", isActive: false },
  ];

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleAcademicYearClick = (event: React.MouseEvent<HTMLElement>) => {
    setAcademicYearAnchor(event.currentTarget);
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAvatarAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setNotificationAnchor(null);
    setAcademicYearAnchor(null);
    setAvatarAnchor(null);
  };

  const marginLeft = isCollapsed ? 80 : 280;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AppBar
        position="fixed"
        sx={{
          ml: `${marginLeft}px`,
          width: `calc(100% - ${marginLeft}px)`,
          transition: "margin-left 0.3s ease-in-out, width 0.3s ease-in-out",
          backgroundImage: isDark
            ? `linear-gradient(135deg, ${COLORS.glass.dark} 0%, ${COLORS.glass.dark} 100%)`
            : `linear-gradient(135deg, ${COLORS.glass.light} 0%, ${COLORS.glass.light} 100%)`,
          backdropFilter: "blur(10px)",
          border: `1px solid ${isDark ? COLORS.glass.darkBorder : COLORS.glass.lightBorder}`,
          boxShadow: isDark
            ? "0 4px 12px rgba(0, 0, 0, 0.3)"
            : "0 4px 12px rgba(0, 0, 0, 0.08)",
          color: colors.text,
        }}
        elevation={0}
      >
        <Toolbar sx={{ px: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Dashboard
              </Typography>
            </Stack>
          </Box>

          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Chip
                label="2024-2025"
                onClick={handleAcademicYearClick}
                sx={{
                  background: `linear-gradient(135deg, ${COLORS.primary}20, ${COLORS.secondary}20)`,
                  border: `1px solid ${COLORS.primary}40`,
                  fontWeight: 500,
                  cursor: "pointer",
                  "&:hover": {
                    background: `linear-gradient(135deg, ${COLORS.primary}30, ${COLORS.secondary}30)`,
                  },
                }}
                icon={<MuiIcons.CalendarMonth />}
              />
            </motion.div>

            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderColor: colors.border,
              }}
            />

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <IconButton
                onClick={handleNotificationClick}
                sx={{
                  color: colors.text,
                  "&:hover": {
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.05)",
                  },
                }}
              >
                <Badge badgeContent={2} color="error">
                  <MuiIcons.NotificationsOutlined />
                </Badge>
              </IconButton>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <IconButton
                onClick={toggleTheme}
                sx={{
                  color: colors.text,
                  "&:hover": {
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.05)",
                  },
                }}
              >
                {isDark ? <MuiIcons.LightMode /> : <MuiIcons.DarkMode />}
              </IconButton>
            </motion.div>

            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.02)",
                border: `1px solid ${colors.border}`,
                borderRadius: 1,
                px: 1.5,
                py: 0.75,
              }}
            >
              <MuiIcons.Search
                sx={{ fontSize: 18, color: colors.textTertiary, mr: 1 }}
              />
              <input
                type="text"
                placeholder="Search..."
                style={{
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent",
                  color: colors.text,
                  fontSize: "0.875rem",
                  width: 150,
                }}
              />
            </Box>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <IconButton onClick={handleAvatarClick} sx={{ p: 0, ml: 1 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    backgroundImage: COLORS.gradient.primary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                  }}
                >
                  AD
                </Box>
              </IconButton>
            </motion.div>
          </Stack>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              backgroundImage: isDark
                ? `linear-gradient(135deg, ${COLORS.glass.dark} 0%, ${COLORS.glass.dark} 100%)`
                : `linear-gradient(135deg, ${COLORS.glass.light} 0%, ${COLORS.glass.light} 100%)`,
              backdropFilter: "blur(10px)",
              border: `1px solid ${isDark ? COLORS.glass.darkBorder : COLORS.glass.lightBorder}`,
              minWidth: 350,
            },
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Notifications
          </Typography>
        </Box>
        <Divider />
        {notifications.map((notification) => (
          <MenuItem
            key={notification.id}
            onClick={handleClose}
            sx={{
              py: 1.5,
              px: 2,
              flexDirection: "column",
              alignItems: "flex-start",
              borderBottom: `1px solid ${colors.border}`,
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{ width: "100%", alignItems: "flex-start" }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: notification.read
                    ? "transparent"
                    : COLORS.primary,
                  mt: 1,
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {notification.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: colors.textSecondary }}
                >
                  {notification.message}
                </Typography>
              </Box>
            </Stack>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem
          onClick={handleClose}
          sx={{ justifyContent: "center", py: 1 }}
        >
          <Typography
            variant="body2"
            sx={{ color: COLORS.primary, fontWeight: 600 }}
          >
            View All
          </Typography>
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={academicYearAnchor}
        open={Boolean(academicYearAnchor)}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              backgroundImage: isDark
                ? `linear-gradient(135deg, ${COLORS.glass.dark} 0%, ${COLORS.glass.dark} 100%)`
                : `linear-gradient(135deg, ${COLORS.glass.light} 0%, ${COLORS.glass.light} 100%)`,
              backdropFilter: "blur(10px)",
              border: `1px solid ${isDark ? COLORS.glass.darkBorder : COLORS.glass.lightBorder}`,
            },
          },
        }}
      >
        {academicYears.map((year) => (
          <MenuItem
            key={year.id}
            onClick={handleClose}
            selected={year.isActive}
            sx={{
              backgroundColor: year.isActive
                ? `${COLORS.primary}20`
                : "transparent",
              borderLeft: year.isActive
                ? `3px solid ${COLORS.primary}`
                : "3px solid transparent",
            }}
          >
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              {year.isActive && (
                <MuiIcons.Check sx={{ fontSize: 16, color: COLORS.primary }} />
              )}
              <Typography variant="body2">{year.year}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Menu>

      <Menu
        anchorEl={avatarAnchor}
        open={Boolean(avatarAnchor)}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              backgroundImage: isDark
                ? `linear-gradient(135deg, ${COLORS.glass.dark} 0%, ${COLORS.glass.dark} 100%)`
                : `linear-gradient(135deg, ${COLORS.glass.light} 0%, ${COLORS.glass.light} 100%)`,
              backdropFilter: "blur(10px)",
              border: `1px solid ${isDark ? COLORS.glass.darkBorder : COLORS.glass.lightBorder}`,
            },
          },
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </motion.div>
  );
};

export default Header;
