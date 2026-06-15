import React, { useMemo, useState } from "react";
import {
  Box,
  List,
  TextField,
  Typography,
  InputAdornment,
  Tooltip,
  Divider,
} from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "../../store/themeStore";
import { useSidebarStore, useMenuStore } from "../../store/menuStore";
import { SIDEBAR_MENUS } from "../../constants/menuConfig";
import { SchoolConfig } from "../../constants/schoolConfig";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";

import { COLORS } from "../../theme/colors";

interface SidebarProps {
  width?: number;
  collapsedWidth?: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  width = 260,
  collapsedWidth = 72,
}) => {
  const { mode } = useThemeStore();
  const { isCollapsed, setCollapsed } = useSidebarStore();
  useMenuStore();
  const navigate = useNavigate();
  const isDark = mode === "dark";
  const [searchQuery, setSearchQuery] = useState("");

  const sidebarBg = isDark ? "#0c2536" : COLORS.primary;

  const filterMenus = (items: any[]): any[] => {
    if (!searchQuery) return items;
    return items
      .map((item) => ({
        ...item,
        children: item.children
          ? item.children.filter((child: any) =>
              child.title.toLowerCase().includes(searchQuery.toLowerCase()),
            )
          : undefined,
      }))
      .filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.children && item.children.length > 0),
      );
  };

  const filteredMenus = useMemo(
    () => filterMenus(SIDEBAR_MENUS),
    [searchQuery],
  );

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <motion.div
      animate={{ width: isCollapsed ? collapsedWidth : width }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1200,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: sidebarBg,
      }}
    >
      {/* Logo / Brand Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: 1.5,
          py: 2,
          minHeight: 64,
          gap: 1.5,
          overflow: "hidden",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* School Logo Icon */}
        <Tooltip title={isCollapsed ? "Nethaji Academy" : ""} placement="right">
          <Box
            onClick={() => isCollapsed && setCollapsed(false)}
            sx={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              backgroundColor: "rgba(255,255,255,0.2)",
              border: "2px solid rgba(255,255,255,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              cursor: isCollapsed ? "pointer" : "default",
              transition: "all 0.2s",
              "&:hover": isCollapsed
                ? { backgroundColor: "rgba(255,255,255,0.3)" }
                : {},
            }}
          >
            <MuiIcons.School sx={{ color: "#fff", fontSize: 22 }} />
          </Box>
        </Tooltip>

        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: "hidden", flex: 1 }}
            >
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "1rem",
                  color: "#fff",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.1,
                  whiteSpace: "nowrap",
                }}
              >
                {SchoolConfig.schoolName}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.65rem",
                  color: "rgba(255,255,255,0.65)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  whiteSpace: "nowrap",
                }}
              >
                {SchoolConfig.schoolAddress}
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Tooltip title="Collapse sidebar">
                <Box
                  onClick={() => setCollapsed(true)}
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.7)",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.12)",
                      color: "#fff",
                    },
                    transition: "all 0.2s",
                    flexShrink: 0,
                  }}
                >
                  <MuiIcons.ChevronLeft sx={{ fontSize: 20 }} />
                </Box>
              </Tooltip>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      {/* Search */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search menus..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <MuiIcons.Search
                          sx={{ fontSize: 16, color: "rgba(255,255,255,0.5)" }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.12)",
                    borderRadius: "10px",
                    fontSize: "0.8rem",
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.35)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgba(255,255,255,0.5)",
                    },
                  },
                  "& .MuiOutlinedInput-input::placeholder": {
                    color: "rgba(255,255,255,0.4)",
                    opacity: 1,
                  },
                }}
              />
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dashboard Quick Link */}
      <Box sx={{ px: isCollapsed ? 1 : 1.5, pt: 0.5, pb: 0 }}>
        <SidebarItem
          item={{
            id: "dashboard",
            title: "Dashboard",
            icon: "Dashboard",
            path: "/",
          }}
          onNavigate={handleNavigate}
          isCollapsed={isCollapsed}
        />
      </Box>

      {/* Section label */}
      {!isCollapsed && (
        <Typography
          sx={{
            px: 2.5,
            pt: 2,
            pb: 0.5,
            fontSize: "0.65rem",
            fontWeight: 700,
            color: "rgba(255,255,255,0.45)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          Apps
        </Typography>
      )}

      {/* Scrollable Menu */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: isCollapsed ? 1 : 1.5,
          pb: 2,
          "&::-webkit-scrollbar": { width: 4 },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255,255,255,0.2)",
            borderRadius: 4,
          },
        }}
      >
        <List sx={{ py: 0 }}>
          {filteredMenus.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              onNavigate={handleNavigate}
              isCollapsed={isCollapsed}
            />
          ))}
        </List>
      </Box>

      {/* Footer User Card */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} />
            <Box
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                cursor: "pointer",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.07)" },
                transition: "background 0.2s",
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.2)",
                  border: "2px solid rgba(255,255,255,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  flexShrink: 0,
                }}
              >
                AD
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    color: "#fff",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Admin User
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.7rem",
                    color: "rgba(255,255,255,0.55)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Administrator
                </Typography>
              </Box>
              <MuiIcons.MoreVert
                sx={{ color: "rgba(255,255,255,0.5)", fontSize: 18 }}
              />
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed expand hint */}
      {isCollapsed && (
        <Tooltip title="Expand sidebar" placement="right">
          <Box
            onClick={() => setCollapsed(false)}
            sx={{
              mx: "auto",
              mb: 2,
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#fff",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
              transition: "all 0.2s",
            }}
          >
            <MuiIcons.ChevronRight sx={{ fontSize: 20 }} />
          </Box>
        </Tooltip>
      )}
    </motion.div>
  );
};

export default Sidebar;
