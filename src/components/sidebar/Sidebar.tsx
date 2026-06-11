import React, { useMemo, useState } from "react";
import {
  Box,
  List,
  TextField,
  Divider,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  InputAdornment,
} from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { motion } from "framer-motion";
import { useThemeStore } from "../../store/themeStore";
import { useSidebarStore, useMenuStore } from "../../store/menuStore";
import { COLORS } from "../../theme/colors";
import { SIDEBAR_MENUS } from "../../constants/menuConfig";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  width?: number;
  collapsedWidth?: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  width = 280,
  collapsedWidth = 80,
}) => {
  const { mode } = useThemeStore();
  const { isCollapsed, setCollapsed } = useSidebarStore();
  const { favoriteMenus, recentMenus } = useMenuStore();
  const navigate = useNavigate();
  const isDark = mode === "dark";
  const colors = isDark ? COLORS.dark : COLORS.light;
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Filter menus based on search query
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

  const sidebarVariants = {
    expanded: { width },
    collapsed: { width: collapsedWidth },
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        animate={isCollapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        transition={{ duration: 0.3 }}
        style={{
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 1200,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            backgroundImage: isDark
              ? `linear-gradient(135deg, ${COLORS.glass.dark} 0%, ${COLORS.glass.dark} 100%)`
              : `linear-gradient(135deg, ${COLORS.glass.light} 0%, ${COLORS.glass.light} 100%)`,
            backdropFilter: "blur(10px)",
            border: `1px solid ${isDark ? COLORS.glass.darkBorder : COLORS.glass.lightBorder}`,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: `1px solid ${colors.border}`,
            }}
          >
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    backgroundImage: COLORS.gradient.primary,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "1rem",
                  }}
                >
                  SMS
                </Typography>
              </motion.div>
            )}
            <Tooltip title={isCollapsed ? "Expand" : "Collapse"}>
              <IconButton
                size="small"
                onClick={() => setCollapsed(!isCollapsed)}
                sx={{
                  color: colors.textSecondary,
                  "&:hover": {
                    backgroundColor: isDark ? "#334155" : "#F1F5F9",
                  },
                }}
              >
                {isCollapsed ? (
                  <MuiIcons.ChevronRight />
                ) : (
                  <MuiIcons.ChevronLeft />
                )}
              </IconButton>
            </Tooltip>
          </Box>

          {/* Search */}
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              style={{ padding: "0.5rem 1rem" }}
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
                          sx={{
                            fontSize: 18,
                            color: colors.textTertiary,
                          }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    fontSize: "0.875rem",
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.02)",
                    border: `1px solid ${colors.border}`,
                    borderRadius: 1,
                    transition: "all 0.2s",
                    "&:hover": {
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(0,0,0,0.04)",
                      borderColor: COLORS.primary,
                    },
                    "&.Mui-focused": {
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.05)",
                      borderColor: COLORS.primary,
                    },
                  },
                  "& .MuiOutlinedInput-input::placeholder": {
                    color: colors.textTertiary,
                    opacity: 0.7,
                  },
                }}
              />
            </motion.div>
          )}

          {/* Main Content */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              py: 1,
              px: isCollapsed ? 0.5 : 1,
              "&::-webkit-scrollbar": {
                width: 6,
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                background: isDark ? "#475569" : "#CBD5E1",
                borderRadius: 3,
                "&:hover": {
                  background: isDark ? "#64748B" : "#94A3B8",
                },
              },
            }}
          >
            {/* Favorites Section */}
            {!isCollapsed && favoriteMenus.size > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    px: 1.5,
                    py: 1,
                    color: colors.textTertiary,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    fontSize: "0.7rem",
                    display: "block",
                  }}
                >
                  Favorites
                </Typography>
                <List sx={{ py: 0 }}>
                  {SIDEBAR_MENUS.map((item) =>
                    favoriteMenus.has(item.id || "") ? (
                      <SidebarItem
                        key={item.id}
                        item={item}
                        onNavigate={handleNavigate}
                      />
                    ) : null,
                  )}
                </List>
                <Divider
                  sx={{
                    my: 1,
                    borderColor: colors.border,
                  }}
                />
              </motion.div>
            )}

            {/* Recent Menus */}
            {!isCollapsed && recentMenus.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    px: 1.5,
                    py: 1,
                    color: colors.textTertiary,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    fontSize: "0.7rem",
                    display: "block",
                  }}
                >
                  Recent
                </Typography>
                <List sx={{ py: 0 }}>
                  {recentMenus.slice(0, 3).map((menuId) => {
                    const item = SIDEBAR_MENUS.find((m) => m.id === menuId);
                    return item ? (
                      <SidebarItem
                        key={item.id}
                        item={item}
                        onNavigate={handleNavigate}
                      />
                    ) : null;
                  })}
                </List>
                <Divider
                  sx={{
                    my: 1,
                    borderColor: colors.border,
                  }}
                />
              </motion.div>
            )}

            {/* Main Menu */}
            <Typography
              variant="caption"
              sx={{
                px: 1.5,
                py: 1,
                color: colors.textTertiary,
                fontWeight: 600,
                textTransform: "uppercase",
                fontSize: "0.7rem",
                display: !isCollapsed ? "block" : "none",
              }}
            >
              Menu
            </Typography>
            <List sx={{ py: 0 }}>
              {filteredMenus.map((item) => (
                <SidebarItem
                  key={item.id}
                  item={item}
                  onNavigate={handleNavigate}
                />
              ))}
            </List>
          </Box>

          {/* Footer */}
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  p: 2,
                  borderTop: `1px solid ${colors.border}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.02)",
                  },
                }}
                onClick={handleMenuOpen}
              >
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    backgroundImage: COLORS.gradient.primary,
                    fontSize: "0.875rem",
                    fontWeight: 600,
                  }}
                >
                  AD
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: colors.text,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Admin
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: colors.textTertiary,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Admin
                  </Typography>
                </Box>
                <MuiIcons.MoreVertOutlined
                  sx={{
                    fontSize: 18,
                    color: colors.textTertiary,
                  }}
                />
              </Box>
            </motion.div>
          )}
        </Box>
      </motion.div>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        slotProps={{
          paper: {
            sx: {
              backgroundImage: isDark
                ? `linear-gradient(135deg, ${COLORS.glass.dark} 0%, ${COLORS.glass.dark} 100%)`
                : `linear-gradient(135deg, ${COLORS.glass.light} 0%, ${COLORS.glass.light} 100%)`,
              backdropFilter: "blur(10px)",
              border: `1px solid ${
                isDark ? COLORS.glass.darkBorder : COLORS.glass.lightBorder
              }`,
            },
          },
        }}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default Sidebar;
