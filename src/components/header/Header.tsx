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
  Tooltip,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SchoolIcon from "@mui/icons-material/School";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { useThemeStore } from "../../store/themeStore";
import { useSidebarStore } from "../../store/menuStore";
import { SchoolConfig } from "../../constants/schoolConfig";
import ThemeSettingsDrawer from "../theme/ThemeSettingsDrawer";

const Header: React.FC = () => {
  const {
    baseMode,
    headerColor,
    headerType,
    primaryColor,
    toggleSettingPanel,
  } = useThemeStore();
  const { isCollapsed } = useSidebarStore();
  const isDark = baseMode === "dark";

  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);
  const [avatarAnchor, setAvatarAnchor] = useState<null | HTMLElement>(null);

  const notifications = [
    {
      id: 1,
      title: "Fees Payment Received",
      message: "Student John Doe paid ₹5000",
      timestamp: "2 mins ago",
    },
    {
      id: 2,
      title: "Attendance Alert",
      message: "5 students absent today",
      timestamp: "1 hour ago",
    },
    {
      id: 3,
      title: "Exam Schedule Updated",
      message: "Final exams schedule has been updated",
      timestamp: "3 hours ago",
    },
  ];

  const handleClose = () => {
    setNotificationAnchor(null);
    setAvatarAnchor(null);
  };

  const sidebarWidth = isCollapsed ? 72 : 260;

  // Determine text color based on header background
  const isLightHeader =
    headerType === "solid" && (headerColor === "#FFFFFF" || headerColor.toLowerCase() === "#fff");
  
  const textColor = isLightHeader
    ? isDark
      ? "#0F172A"
      : "#0F172A"
    : "#FFFFFF";
  
  const subTextColor = isLightHeader ? "#64748B" : "rgba(255, 255, 255, 0.75)";
  const iconColor = isLightHeader ? "#475569" : "rgba(255, 255, 255, 0.9)";
  const borderColor = isDark ? "rgba(255, 255, 255, 0.08)" : "#E2E8F0";

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          ml: `${sidebarWidth}px`,
          width: `calc(100% - ${sidebarWidth}px)`,
          transition: "margin-left 0.3s ease-in-out, width 0.3s ease-in-out",
          backgroundColor: headerType === "solid" ? headerColor : undefined,
          backgroundImage: headerType === "gradient" ? headerColor : undefined,
          borderBottom: `1px solid ${borderColor}`,
          boxShadow: isDark
            ? "0 2px 10px rgba(0,0,0,0.3)"
            : "0 1px 4px rgba(15,23,42,0.06)",
          color: textColor,
          zIndex: 1100,
        }}
      >
        <Toolbar
          sx={{
            minHeight: "64px !important",
            px: { xs: 2, sm: 3 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left: School Logo & Title (Medsky Style) */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: "10px",
                backgroundColor: primaryColor,
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 2px 8px ${primaryColor}40`,
                flexShrink: 0,
              }}
            >
              <SchoolIcon sx={{ fontSize: 22 }} />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "0.95rem", sm: "1.05rem" },
                  color: textColor,
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                }}
              >
                {SchoolConfig.schoolName}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.72rem",
                  color: subTextColor,
                  fontWeight: 500,
                  lineHeight: 1.1,
                  display: { xs: "none", sm: "block" },
                }}
              >
                Main Branch, Healthcare & Education Campus, City
              </Typography>
            </Box>
          </Box>

          {/* Right: Actions, Setting Panel Toggle & User Profile */}
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: { xs: 1, sm: 2 } }}>
            {/* Setting Panel Toggle Button */}
            <Tooltip title="Theme & Color Customizer">
              <IconButton
                onClick={toggleSettingPanel}
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: "8px",
                  backgroundColor: isLightHeader
                    ? isDark
                      ? "#1E293B"
                      : "#F1F5F9"
                    : "rgba(255, 255, 255, 0.15)",
                  color: iconColor,
                  transition: "all 0.2s",
                  "&:hover": {
                    backgroundColor: isLightHeader
                      ? isDark
                        ? "#334155"
                        : "#E2E8F0"
                      : "rgba(255, 255, 255, 0.25)",
                    transform: "rotate(45deg)",
                  },
                }}
              >
                <TuneIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>

            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton
                onClick={(e) => setNotificationAnchor(e.currentTarget)}
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: "8px",
                  backgroundColor: isLightHeader
                    ? isDark
                      ? "#1E293B"
                      : "#F1F5F9"
                    : "rgba(255, 255, 255, 0.15)",
                  color: iconColor,
                  "&:hover": {
                    backgroundColor: isLightHeader
                      ? isDark
                        ? "#334155"
                        : "#E2E8F0"
                      : "rgba(255, 255, 255, 0.25)",
                  },
                }}
              >
                <Badge badgeContent={3} color="error">
                  <NotificationsNoneIcon sx={{ fontSize: 20 }} />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* User Profile Avatar (Medsky Style) */}
            <Box
              onClick={(e) => setAvatarAnchor(e.currentTarget)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                cursor: "pointer",
                p: 0.5,
                borderRadius: "10px",
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: isLightHeader
                    ? isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.04)"
                    : "rgba(255,255,255,0.12)",
                },
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  backgroundColor: primaryColor,
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 2px 6px ${primaryColor}50`,
                }}
              >
                NE
              </Box>

              <Box sx={{ display: { xs: "none", md: "block" }, textAlign: "left" }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    color: textColor,
                    lineHeight: 1.1,
                  }}
                >
                  Nethaji
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.7rem",
                    color: subTextColor,
                    lineHeight: 1.1,
                  }}
                >
                  Administrator
                </Typography>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              width: 320,
              maxHeight: 400,
              borderRadius: "12px",
              boxShadow: isDark
                ? "0 10px 30px rgba(0,0,0,0.6)"
                : "0 10px 30px rgba(15,23,42,0.12)",
              p: 1,
              backgroundColor: isDark ? "#111827" : "#FFFFFF",
              color: isDark ? "#F8FAFC" : "#0F172A",
            },
          },
        }}
      >
        <Box sx={{ p: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ fontWeight: 700, fontSize: "0.9rem" }}>
            Notifications
          </Typography>
          <Typography sx={{ fontSize: "0.75rem", color: primaryColor, cursor: "pointer", fontWeight: 600 }}>
            Mark all as read
          </Typography>
        </Box>
        <Divider sx={{ my: 0.5 }} />
        {notifications.map((item) => (
          <MenuItem
            key={item.id}
            onClick={handleClose}
            sx={{
              borderRadius: "8px",
              my: 0.5,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              p: 1.2,
            }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: "0.82rem" }}>
              {item.title}
            </Typography>
            <Typography sx={{ fontSize: "0.75rem", color: "#64748B", my: 0.3 }}>
              {item.message}
            </Typography>
            <Typography sx={{ fontSize: "0.68rem", color: "#94A3B8" }}>
              {item.timestamp}
            </Typography>
          </MenuItem>
        ))}
      </Menu>

      {/* User Profile Menu */}
      <Menu
        anchorEl={avatarAnchor}
        open={Boolean(avatarAnchor)}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              width: 200,
              borderRadius: "12px",
              boxShadow: isDark
                ? "0 10px 30px rgba(0,0,0,0.6)"
                : "0 10px 30px rgba(15,23,42,0.12)",
              p: 0.5,
              backgroundColor: isDark ? "#111827" : "#FFFFFF",
              color: isDark ? "#F8FAFC" : "#0F172A",
            },
          },
        }}
      >
        <Box sx={{ p: 1.5 }}>
          <Typography sx={{ fontWeight: 700, fontSize: "0.88rem" }}>
            Nethaji
          </Typography>
          <Typography sx={{ fontSize: "0.72rem", color: "#64748B" }}>
            nethaji@school.edu
          </Typography>
        </Box>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} sx={{ borderRadius: "6px", fontSize: "0.82rem", gap: 1 }}>
          <PersonIcon sx={{ fontSize: 18 }} /> My Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            toggleSettingPanel();
          }}
          sx={{ borderRadius: "6px", fontSize: "0.82rem", gap: 1 }}
        >
          <SettingsIcon sx={{ fontSize: 18 }} /> Settings & Theme
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} sx={{ borderRadius: "6px", fontSize: "0.82rem", color: "#EF4444", gap: 1 }}>
          <LogoutIcon sx={{ fontSize: 18 }} /> Logout
        </MenuItem>
      </Menu>

      {/* Theme Customizer Drawer */}
      <ThemeSettingsDrawer />
    </>
  );
};

export default Header;
