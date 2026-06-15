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

  const [notificationAnchor, setNotificationAnchor] =
    useState<null | HTMLElement>(null);
  const [academicYearAnchor, setAcademicYearAnchor] =
    useState<null | HTMLElement>(null);
  const [avatarAnchor, setAvatarAnchor] = useState<null | HTMLElement>(null);
  const [searchValue, setSearchValue] = useState("");

  const notifications = [
    {
      id: 1,
      title: "Fees Payment Received",
      message: "Student John Doe paid ₹5000",
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

  const handleClose = () => {
    setNotificationAnchor(null);
    setAcademicYearAnchor(null);
    setAvatarAnchor(null);
  };

  const marginLeft = isCollapsed ? 64 : 248;

  const headerBg = isDark
    ? "rgba(15, 23, 42, 0.82)"
    : "rgba(255, 255, 255, 0.92)";
  const borderColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.1)";
  const headerShadow = isDark
    ? "0 26px 70px rgba(0,0,0,0.24)"
    : "0 20px 52px rgba(15,23,42,0.08)";
  const textColor = isDark ? "#e2e8f0" : "#22354d";
  const subTextColor = isDark ? "#cbd5e1" : "#6b7280";
  const inputBg = isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.98)";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          ml: `${marginLeft}px`,
          width: `calc(100% - ${marginLeft}px)`,
          transition: "margin-left 0.3s ease-in-out, width 0.3s ease-in-out",
          backgroundColor: headerBg,
          backgroundImage: isDark
            ? "linear-gradient(180deg, rgba(15,23,42,0.96) 0%, rgba(15,23,42,0.82) 100%)"
            : "linear-gradient(180deg, rgba(255,255,255,0.99) 0%, rgba(248,250,252,0.92) 100%)",
          borderBottom: `1px solid ${borderColor}`,
          boxShadow: headerShadow,
          color: textColor,
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          borderRadius: "16px 16px 16px 16px",
        }}
      >
        <Toolbar sx={{ minHeight: "64px !important" }}>
          {/* Left: Search Bar */}
          <Box sx={{ flex: 1, maxWidth: 440 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: inputBg,
                borderRadius: "22px",
                px: 2.5,
                py: 1,
                gap: 1,
                border: `1px solid ${borderColor}`,
                transition: "all 0.25s ease",
                boxShadow: isDark
                  ? "inset 0 3px 18px rgba(255,255,255,0.06)"
                  : "inset 0 3px 18px rgba(15,23,42,0.06)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                "&:focus-within": {
                  borderColor: COLORS.primary,
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.18)"
                    : "rgba(255,255,255,1)",
                  boxShadow: `0 0 0 3px ${COLORS.primary}18`,
                },
              }}
            >
              <input
                type="text"
                placeholder="Type here to search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent",
                  color: textColor,
                  fontSize: "0.875rem",
                  flex: 1,
                  fontFamily: "inherit",
                }}
              />
              <MuiIcons.Search
                sx={{
                  fontSize: 18,
                  color: COLORS.primary,
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.12)"
                    : "rgba(37,99,235,0.12)",
                  borderRadius: "50%",
                  p: 0.7,
                  flexShrink: 0,
                }}
              />
            </Box>
          </Box>

          {/* Right: Actions + Profile */}
          <Stack
            direction="row"
            spacing={0.5}
            sx={{ alignItems: "center", ml: "auto" }}
          >
            {/* Academic Year */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Chip
                label="2024-2025"
                onClick={(e) => setAcademicYearAnchor(e.currentTarget)}
                icon={
                  <MuiIcons.CalendarMonth
                    sx={{ fontSize: "16px !important" }}
                  />
                }
                size="small"
                sx={{
                  backgroundColor: `${COLORS.primary}14`,
                  color: COLORS.primary,
                  border: `1px solid ${COLORS.primary}30`,
                  fontWeight: 600,
                  fontSize: "0.78rem",
                  cursor: "pointer",
                  px: 0.5,
                  "&:hover": { backgroundColor: `${COLORS.primary}22` },
                }}
              />
            </motion.div>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 0.5, height: 24, alignSelf: "center", borderColor }}
            />

            {/* Theme Toggle */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                onClick={toggleTheme}
                size="small"
                sx={{
                  color: subTextColor,
                  "&:hover": {
                    backgroundColor: inputBg,
                    color: COLORS.primary,
                  },
                }}
              >
                {isDark ? (
                  <MuiIcons.LightMode sx={{ fontSize: 20 }} />
                ) : (
                  <MuiIcons.DarkMode sx={{ fontSize: 20 }} />
                )}
              </IconButton>
            </motion.div>

            {/* Notifications */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                onClick={(e) => setNotificationAnchor(e.currentTarget)}
                size="small"
                sx={{
                  color: subTextColor,
                  "&:hover": {
                    backgroundColor: inputBg,
                    color: COLORS.primary,
                  },
                }}
              >
                <Badge
                  badgeContent={2}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#ef4444",
                      color: "#fff",
                      fontSize: "0.6rem",
                      minWidth: 16,
                      height: 16,
                    },
                  }}
                >
                  <MuiIcons.NotificationsOutlined sx={{ fontSize: 20 }} />
                </Badge>
              </IconButton>
            </motion.div>

            {/* Email */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                size="small"
                sx={{
                  color: subTextColor,
                  "&:hover": {
                    backgroundColor: inputBg,
                    color: COLORS.primary,
                  },
                }}
              >
                <MuiIcons.MailOutlined sx={{ fontSize: 20 }} />
              </IconButton>
            </motion.div>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 0.5, height: 24, alignSelf: "center", borderColor }}
            />

            {/* User Profile */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Box
                onClick={(e) => setAvatarAnchor(e.currentTarget)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                  pl: 0.5,
                  pr: 1,
                  py: 0.5,
                  borderRadius: "12px",
                  "&:hover": { backgroundColor: inputBg },
                  transition: "all 0.2s",
                }}
              >
                {/* Avatar */}
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    flexShrink: 0,
                    boxShadow: `0 2px 8px ${COLORS.primary}40`,
                  }}
                >
                  AD
                </Box>

                {/* Name + Status */}
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  <Typography
                    sx={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: textColor,
                      lineHeight: 1.2,
                    }}
                  >
                    Admin User
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.4,
                    }}
                  >
                    <Box
                      sx={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        backgroundColor: "#22c55e",
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "0.68rem",
                        color: "#22c55e",
                        fontWeight: 600,
                      }}
                    >
                      Available
                    </Typography>
                  </Box>
                </Box>

                <MuiIcons.ExpandMore
                  sx={{
                    fontSize: 18,
                    color: subTextColor,
                    display: { xs: "none", sm: "flex" },
                  }}
                />
              </Box>
            </motion.div>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 340,
              backgroundColor: headerBg,
              border: `1px solid ${borderColor}`,
              borderRadius: "16px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            },
          },
        }}
      >
        <Box sx={{ px: 2, pt: 2, pb: 1 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, fontSize: "1rem", color: textColor }}
          >
            Notifications
          </Typography>
        </Box>
        <Divider sx={{ borderColor }} />
        {notifications.map((n) => (
          <MenuItem
            key={n.id}
            onClick={handleClose}
            sx={{
              py: 1.5,
              px: 2,
              alignItems: "flex-start",
              gap: 1,
              borderBottom: `1px solid ${borderColor}`,
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: n.read ? "transparent" : COLORS.primary,
                mt: 0.8,
                flexShrink: 0,
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{ fontSize: "0.85rem", fontWeight: 600, color: textColor }}
              >
                {n.title}
              </Typography>
              <Typography sx={{ fontSize: "0.75rem", color: subTextColor }}>
                {n.message}
              </Typography>
              <Typography
                sx={{ fontSize: "0.7rem", color: subTextColor, mt: 0.3 }}
              >
                {n.timestamp}
              </Typography>
            </Box>
          </MenuItem>
        ))}
        <MenuItem
          onClick={handleClose}
          sx={{ justifyContent: "center", py: 1.5 }}
        >
          <Typography
            sx={{ fontSize: "0.85rem", color: COLORS.primary, fontWeight: 600 }}
          >
            View All Notifications
          </Typography>
        </MenuItem>
      </Menu>

      {/* Academic Year Menu */}
      <Menu
        anchorEl={academicYearAnchor}
        open={Boolean(academicYearAnchor)}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 180,
              backgroundColor: headerBg,
              border: `1px solid ${borderColor}`,
              borderRadius: "14px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            },
          },
        }}
      >
        {academicYears.map((year) => (
          <MenuItem
            key={year.id}
            onClick={handleClose}
            sx={{
              py: 1,
              px: 2,
              borderLeft: year.isActive
                ? `3px solid ${COLORS.primary}`
                : "3px solid transparent",
              backgroundColor: year.isActive
                ? `${COLORS.primary}0f`
                : "transparent",
            }}
          >
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              {year.isActive && (
                <MuiIcons.Check sx={{ fontSize: 15, color: COLORS.primary }} />
              )}
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  color: year.isActive ? COLORS.primary : textColor,
                }}
              >
                {year.year}
              </Typography>
            </Stack>
          </MenuItem>
        ))}
      </Menu>

      {/* Avatar Menu */}
      <Menu
        anchorEl={avatarAnchor}
        open={Boolean(avatarAnchor)}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 180,
              backgroundColor: headerBg,
              border: `1px solid ${borderColor}`,
              borderRadius: "14px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            },
          },
        }}
      >
        <MenuItem onClick={handleClose} sx={{ gap: 1.5, py: 1 }}>
          <MuiIcons.Person sx={{ fontSize: 18, color: subTextColor }} />
          <Typography sx={{ fontSize: "0.875rem", color: textColor }}>
            Profile
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ gap: 1.5, py: 1 }}>
          <MuiIcons.Settings sx={{ fontSize: 18, color: subTextColor }} />
          <Typography sx={{ fontSize: "0.875rem", color: textColor }}>
            Settings
          </Typography>
        </MenuItem>
        <Divider sx={{ borderColor }} />
        <MenuItem onClick={handleClose} sx={{ gap: 1.5, py: 1 }}>
          <MuiIcons.Logout sx={{ fontSize: 18, color: "#ef4444" }} />
          <Typography sx={{ fontSize: "0.875rem", color: "#ef4444" }}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </motion.div>
  );
};

export default Header;
