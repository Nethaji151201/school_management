import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  Chip,
  Tooltip,
} from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useMenuStore } from "../../store/menuStore";
import { type MenuItem } from "../../types";
import { COLORS } from "../../theme/colors";
import { useLocation } from "react-router-dom";

interface SidebarItemProps {
  item: MenuItem;
  level?: number;
  onNavigate?: (path: string) => void;
  isCollapsed?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  level = 0,
  onNavigate,
  isCollapsed = false,
}) => {
  const { expandedMenus, toggleMenuExpand } = useMenuStore();
  const location = useLocation();

  const isChildActive = (menuItem: MenuItem): boolean => {
    if (menuItem.path && location.pathname === menuItem.path) return true;
    if (menuItem.children) {
      return menuItem.children.some((child) => isChildActive(child));
    }
    return false;
  };

  const isActive = isChildActive(item);
  const hasActiveChild = item.children
    ? item.children.some((child) => isChildActive(child))
    : false;
  const isExpanded = item.children
    ? expandedMenus.has(item.id || "") || hasActiveChild
    : false;

  const handleToggle = () => {
    if (item.children && item.id) {
      toggleMenuExpand(item.id);
    }
  };

  const handleNavigate = () => {
    if (item.path && onNavigate) {
      onNavigate(item.path);
    }
  };

  const IconComponent = (MuiIcons as any)[item.icon || "FolderOpen"];
  const paddingLeft = level * 12;

  // Collapsed mode — icon only with tooltip
  if (isCollapsed && level === 0) {
    return (
      <Tooltip title={item.title} placement="right">
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            onClick={item.children ? handleToggle : handleNavigate}
            sx={{
              justifyContent: "center",
              borderRadius: "12px",
              py: 1,
              minHeight: 44,
              backgroundColor: isActive ? "#fff" : "transparent",
              "&:hover": {
                backgroundColor: isActive
                  ? "rgba(255,255,255,0.95)"
                  : "rgba(255,255,255,0.1)",
              },
              transition: "all 0.2s",
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
              {IconComponent ? (
                <IconComponent
                  fontSize="small"
                  sx={{
                    color: isActive ? COLORS.primary : "rgba(255,255,255,0.8)",
                  }}
                />
              ) : (
                <MuiIcons.Circle
                  fontSize="small"
                  sx={{ color: "rgba(255,255,255,0.5)", fontSize: 6 }}
                />
              )}
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </Tooltip>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.15 }}
      >
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            onClick={item.children ? handleToggle : handleNavigate}
            sx={{
              pl: `${12 + paddingLeft}px`,
              pr: 1,
              py: level === 0 ? 0.9 : 0.6,
              borderRadius: "12px",
              position: "relative",
              transition: "all 0.2s ease-in-out",
              // Active: white capsule
              backgroundColor:
                isActive && !item.children ? "#fff" : "transparent",
              // Parent with active child: slightly highlighted
              ...(isActive && item.children
                ? { backgroundColor: "rgba(255,255,255,0.15)" }
                : {}),
              "&:hover": {
                backgroundColor:
                  isActive && !item.children
                    ? "rgba(255,255,255,0.95)"
                    : "rgba(255,255,255,0.1)",
              },
            }}
          >
            {IconComponent && level === 0 && (
              <ListItemIcon
                sx={{
                  minWidth: 34,
                  color:
                    isActive && !item.children
                      ? COLORS.primary
                      : isActive && item.children
                        ? "#fff"
                        : "rgba(255,255,255,0.75)",
                  transition: "color 0.2s",
                }}
              >
                <IconComponent fontSize="small" />
              </ListItemIcon>
            )}

            {/* Submenu bullet dot */}
            {level > 0 && (
              <ListItemIcon sx={{ minWidth: 22 }}>
                <MuiIcons.FiberManualRecord
                  sx={{
                    fontSize: isActive ? 8 : 5,
                    color:
                      isActive && !item.children
                        ? COLORS.primary
                        : "rgba(255,255,255,0.5)",
                    transition: "all 0.2s",
                  }}
                />
              </ListItemIcon>
            )}

            <ListItemText
              primary={item.title}
              slotProps={{
                primary: {
                  sx: {
                    fontSize: level === 0 ? "0.875rem" : "0.82rem",
                    fontWeight:
                      isActive && !item.children
                        ? 700
                        : isActive && item.children
                          ? 600
                          : 500,
                    color:
                      isActive && !item.children
                        ? COLORS.primary
                        : "rgba(255,255,255,0.85)",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  },
                },
              }}
            />

            {item.badge && (
              <Chip
                label={item.badge}
                size="small"
                sx={{
                  height: 18,
                  minWidth: 18,
                  fontSize: "0.65rem",
                  backgroundColor: COLORS.warning,
                  color: "#fff",
                  mr: 0.5,
                }}
              />
            )}

            {item.children && (
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: "flex" }}
              >
                <MuiIcons.ChevronRight
                  sx={{
                    fontSize: 18,
                    color: "rgba(255,255,255,0.5)",
                  }}
                />
              </motion.div>
            )}
          </ListItemButton>
        </ListItem>
      </motion.div>

      {item.children && (
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              key={`submenu-${item.id}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <List sx={{ py: 0, pl: 1.5 }}>
                {item.children.map((child) => (
                  <SidebarItem
                    key={child.id}
                    item={child}
                    level={level + 1}
                    onNavigate={onNavigate}
                    isCollapsed={false}
                  />
                ))}
              </List>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
};

export default SidebarItem;
