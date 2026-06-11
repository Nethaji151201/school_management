import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  Chip,
  IconButton,
} from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useMenuStore } from "../../store/menuStore";
import { type MenuItem } from "../../types";
import { useThemeStore } from "../../store/themeStore";
import { COLORS } from "../../theme/colors";

interface SidebarItemProps {
  item: MenuItem;
  level?: number;
  onNavigate?: (path: string) => void;
  isActive?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  level = 0,
  onNavigate,
  isActive = false,
}) => {
  const { expandedMenus, toggleMenuExpand, favoriteMenus, toggleFavorite } =
    useMenuStore();
  const { mode } = useThemeStore();
  const isDark = mode === "dark";
  const colors = isDark ? COLORS.dark : COLORS.light;

  const isExpanded = item.children ? expandedMenus.has(item.id || "") : false;
  const isFavorite = favoriteMenus.has(item.id || "");

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

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.id) {
      toggleFavorite(item.id);
    }
  };

  // Get MUI Icon component
  const IconComponent = (MuiIcons as any)[item.icon || "Dashboard"];

  const paddingLeft = level * 16;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <ListItem disablePadding>
          <ListItemButton
            onClick={item.children ? handleToggle : handleNavigate}
            sx={{
              pl: `${12 + paddingLeft}px`,
              pr: 1,
              py: 0.75,
              mb: 0.5,
              borderRadius: 1,
              cursor: item.children ? "pointer" : "pointer",
              backgroundColor: isActive ? `${COLORS.primary}20` : "transparent",
              border: isActive
                ? `1px solid ${COLORS.primary}40`
                : "1px solid transparent",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: isDark ? "#334155" : "#F1F5F9",
                "& .favorite-btn": {
                  opacity: 1,
                },
              },
              "&::before": isActive
                ? {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 3,
                    background: `linear-gradient(180deg, ${COLORS.primary}, ${COLORS.secondary})`,
                  }
                : {},
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 36,
                color: isActive ? COLORS.primary : colors.textSecondary,
                transition: "color 0.2s ease-in-out",
              }}
            >
              {IconComponent ? (
                <IconComponent fontSize="small" />
              ) : (
                <MuiIcons.FolderOpen fontSize="small" />
              )}
            </ListItemIcon>

            <ListItemText
              primary={item.title}
              slotProps={{
                primary: {
                  sx: {
                    fontSize: "0.875rem",
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? COLORS.primary : colors.text,
                    transition: "color 0.2s ease-in-out",
                  },
                },
              }}
            />

            {item.badge && (
              <Chip
                label={item.badge}
                size="small"
                sx={{
                  height: 20,
                  minWidth: 20,
                  fontSize: "0.7rem",
                  backgroundColor: COLORS.warning,
                  color: "#FFFFFF",
                }}
              />
            )}

            {item.children && (
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <MuiIcons.KeyboardArrowDown
                  sx={{
                    fontSize: 18,
                    color: colors.textSecondary,
                  }}
                />
              </motion.div>
            )}

            <IconButton
              size="small"
              onClick={handleFavorite}
              className="favorite-btn"
              sx={{
                opacity: isFavorite ? 1 : 0,
                ml: 0.5,
                transition: "opacity 0.2s",
                color: isFavorite ? COLORS.warning : colors.textTertiary,
              }}
            >
              {isFavorite ? (
                <MuiIcons.Star sx={{ fontSize: 16 }} />
              ) : (
                <MuiIcons.Star sx={{ fontSize: 16 }} />
              )}
            </IconButton>
          </ListItemButton>
        </ListItem>
      </motion.div>

      {item.children && (
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <List
                sx={{
                  pl: 0,
                  py: 0.5,
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.02)"
                    : "rgba(0,0,0,0.02)",
                  borderRadius: 1,
                  my: 0.5,
                  mx: 1,
                }}
              >
                {item.children.map((child) => (
                  <SidebarItem
                    key={child.id}
                    item={child}
                    level={level + 1}
                    onNavigate={onNavigate}
                    isActive={isActive}
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
