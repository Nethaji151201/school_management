import React, { useMemo, useState } from "react";
import {
  Box,
  List,
  TextField,
  Typography,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "../../store/themeStore";
import { useSidebarStore, useMenuStore } from "../../store/menuStore";
import { SIDEBAR_MENUS } from "../../constants/menuConfig";
import { SchoolConfig } from "../../constants/schoolConfig";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  width?: number;
  collapsedWidth?: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  width = 260,
  collapsedWidth = 72,
}) => {
  const { sidebarColor, sidebarType, primaryColor, baseMode } = useThemeStore();
  const { isCollapsed, setCollapsed } = useSidebarStore();
  useMenuStore();
  const navigate = useNavigate();
  const isDark = baseMode === "dark";
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <>
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
          backgroundColor: sidebarType === "solid" ? sidebarColor : undefined,
          backgroundImage: sidebarType === "gradient" ? sidebarColor : undefined,
          boxShadow: isDark
            ? "4px 0 24px rgba(0,0,0,0.5)"
            : "4px 0 24px rgba(15,23,42,0.08)",
        }}
      >
        {/* Logo / Brand Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: 1.8,
            py: 2,
            minHeight: 64,
            gap: 1.5,
            overflow: "hidden",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* School Logo Icon */}
          <Tooltip title={isCollapsed ? SchoolConfig.schoolName : ""} placement="right">
            <Box
              onClick={() => isCollapsed && setCollapsed(false)}
              sx={{
                width: 38,
                height: 38,
                borderRadius: "10px",
                backgroundColor: "rgba(255,255,255,0.18)",
                border: "1px solid rgba(255,255,255,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                cursor: isCollapsed ? "pointer" : "default",
                transition: "all 0.2s",
                "&:hover": isCollapsed
                  ? { backgroundColor: "rgba(255,255,255,0.28)" }
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
                    lineHeight: 1.2,
                    whiteSpace: "nowrap",
                  }}
                >
                  {SchoolConfig.schoolName}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.68rem",
                    color: "rgba(255,255,255,0.65)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    whiteSpace: "nowrap",
                  }}
                >
                  SCHOOL MANAGEMENT
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        {/* Search Field (when expanded) */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: "hidden", padding: "12px 14px 6px 14px" }}
            >
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
                          sx={{ color: "rgba(255,255,255,0.6)", fontSize: 18 }}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: searchQuery ? (
                      <InputAdornment position="end">
                        <Box
                          onClick={() => setSearchQuery("")}
                          sx={{ cursor: "pointer", display: "flex", color: "rgba(255,255,255,0.6)" }}
                        >
                          <MuiIcons.Close sx={{ fontSize: 16 }} />
                        </Box>
                      </InputAdornment>
                    ) : null,
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "0.82rem",
                    height: 36,
                    "& fieldset": {
                      borderColor: "rgba(255,255,255,0.15)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.3)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgba(255,255,255,0.5)",
                    },
                    "& input::placeholder": {
                      color: "rgba(255,255,255,0.5)",
                      opacity: 1,
                    },
                  },
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Menu Items List */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            px: isCollapsed ? 1 : 1.5,
            py: 1.5,
            "&::-webkit-scrollbar": {
              width: 4,
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(255,255,255,0.2)",
              borderRadius: 2,
            },
          }}
        >
          <List disablePadding>
            {filteredMenus.map((item) => (
              <SidebarItem
                key={item.id}
                item={item}
                isCollapsed={isCollapsed}
                onNavigate={(path) => navigate(path)}
              />
            ))}
          </List>
        </Box>

        {/* Footer info (Medsky Style) */}
        <Box
          sx={{
            p: 1.5,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            gap: 1.2,
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: primaryColor,
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            NE
          </Box>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ overflow: "hidden", flex: 1 }}
              >
                <Typography
                  sx={{
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: "#fff",
                    whiteSpace: "nowrap",
                  }}
                >
                  Nethaji
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.68rem",
                    color: "rgba(255,255,255,0.6)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Administrator
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </motion.div>

      {/* Floating Toggle Button on Sidebar Border (Medsky Style) */}
      <Box
        onClick={() => setCollapsed(!isCollapsed)}
        sx={{
          position: "fixed",
          left: isCollapsed ? collapsedWidth - 14 : width - 14,
          top: 18,
          zIndex: 1300,
          width: 28,
          height: 28,
          borderRadius: "50%",
          backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
          color: isDark ? "#F8FAFC" : "#0F172A",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "#CBD5E1"}`,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "left 0.3s ease-in-out, transform 0.2s, background-color 0.2s",
          "&:hover": {
            backgroundColor: isDark ? "#334155" : "#F1F5F9",
            transform: "scale(1.1)",
          },
        }}
      >
        {isCollapsed ? (
          <MuiIcons.ChevronRight sx={{ fontSize: 18 }} />
        ) : (
          <MuiIcons.ChevronLeft sx={{ fontSize: 18 }} />
        )}
      </Box>
    </>
  );
};

export default Sidebar;
