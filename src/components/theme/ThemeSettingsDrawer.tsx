import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Chip,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PaletteIcon from "@mui/icons-material/Palette";
import CheckIcon from "@mui/icons-material/Check";
import RefreshIcon from "@mui/icons-material/Refresh";
import toast from "react-hot-toast";
import { useThemeStore } from "../../store/themeStore";
import {
  THEME_PRESETS,
  SWATCH_SOLID_COLORS,
  SWATCH_GRADIENT_COLORS,
  DEFAULT_THEME_ID,
} from "../../theme/themePresets";

const ThemeSettingsDrawer: React.FC = () => {
  const {
    mode,
    baseMode,
    activePreset,
    headerColor,
    headerType,
    sidebarColor,
    sidebarType,
    primaryColor,
    secondaryColor,
    isSettingPanelOpen,
    setMode,
    setBaseMode,
    setPreset,
    setHeaderColor,
    setSidebarColor,
    setSettingPanelOpen,
    resetToDefault,
  } = useThemeStore();

  const isDark = baseMode === "dark";

  const handleCopyConfig = () => {
    const config = {
      mode,
      baseMode,
      activePreset,
      primaryColor,
      secondaryColor,
      headerColor,
      headerType,
      sidebarColor,
      sidebarType,
    };
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    toast.success("Theme configuration copied to clipboard!", {
      style: {
        borderRadius: "8px",
        background: "#0F172A",
        color: "#fff",
      },
      iconTheme: {
        primary: "#10B981",
        secondary: "#fff",
      },
    });
  };

  return (
    <Drawer
      anchor="right"
      open={isSettingPanelOpen}
      onClose={() => setSettingPanelOpen(false)}
      slotProps={{
        paper: {
          sx: {
            width: { xs: "100%", sm: 380 },
            backgroundColor: isDark ? "#0F172A" : "#FFFFFF",
            color: isDark ? "#F8FAFC" : "#0F172A",
            boxShadow: isDark
              ? "-8px 0 32px rgba(0, 0, 0, 0.6)"
              : "-8px 0 32px rgba(15, 23, 42, 0.12)",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          },
        },
      }}
    >
      {/* Drawer Header */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#E2E8F0"}`,
          position: "sticky",
          top: 0,
          backgroundColor: isDark ? "#0F172A" : "#FFFFFF",
          zIndex: 10,
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: "1.05rem" }}>
          Setting Panel
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
          <Button
            size="small"
            variant="contained"
            onClick={handleCopyConfig}
            startIcon={<ContentCopyIcon sx={{ fontSize: 15 }} />}
            sx={{
              backgroundColor: isDark ? "#1E293B" : "#0F172A",
              color: "#FFFFFF",
              fontSize: "0.75rem",
              fontWeight: 600,
              px: 1.5,
              py: 0.5,
              borderRadius: "6px",
              boxShadow: "none",
              textTransform: "none",
              "&:hover": {
                backgroundColor: isDark ? "#334155" : "#1E293B",
                boxShadow: "none",
              },
            }}
          >
            Copy Config
          </Button>

          <Tooltip title="Reset to default">
            <IconButton
              size="small"
              onClick={() => {
                resetToDefault();
                toast.success("Reset to Default (Theme-5)");
              }}
              sx={{
                width: 32,
                height: 32,
                borderRadius: "6px",
                backgroundColor: isDark ? "#1E293B" : "#F1F5F9",
                color: isDark ? "#F8FAFC" : "#0F172A",
                "&:hover": {
                  backgroundColor: isDark ? "#334155" : "#E2E8F0",
                },
              }}
            >
              <RestartAltIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>

          <IconButton
            size="small"
            onClick={() => setSettingPanelOpen(false)}
            sx={{
              width: 32,
              height: 32,
              borderRadius: "6px",
              backgroundColor: isDark ? "#1E293B" : "#F1F5F9",
              color: isDark ? "#F8FAFC" : "#0F172A",
              "&:hover": {
                backgroundColor: isDark ? "#334155" : "#E2E8F0",
              },
            }}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Drawer Body Content */}
      <Box sx={{ p: 2.5, display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Section: Theme Mode */}
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1.5,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.85rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 0.8,
              }}
            >
              <PaletteIcon sx={{ fontSize: 17, color: primaryColor }} />
              Theme Mode
            </Typography>
            <Chip
              label={mode === "custom" ? "Customized" : "Preset"}
              size="small"
              sx={{
                height: 20,
                fontSize: "0.68rem",
                fontWeight: 600,
                backgroundColor: isDark ? "#1E293B" : "#F1F5F9",
                color: isDark ? "#94A3B8" : "#64748B",
              }}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {/* Light Theme Card */}
            <Box
              onClick={() => setMode("light")}
              sx={{
                p: 1.5,
                borderRadius: "10px",
                border: `2px solid ${
                  mode === "light"
                    ? primaryColor
                    : isDark
                    ? "#1E293B"
                    : "#E2E8F0"
                }`,
                backgroundColor: isDark ? "#111827" : "#F8FAFC",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  borderColor: primaryColor,
                },
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    backgroundColor: "#FEF3C7",
                    color: "#D97706",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <WbSunnyIcon sx={{ fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: "0.85rem" }}>
                    Light Theme
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.72rem",
                      color: isDark ? "#94A3B8" : "#64748B",
                    }}
                  >
                    Default clean light layout
                  </Typography>
                </Box>
              </Box>
              {/* Mini mockup wireframe */}
              <Box
                sx={{
                  width: 38,
                  height: 24,
                  borderRadius: "4px",
                  border: "1px solid #CBD5E1",
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  p: 0.3,
                  gap: 0.3,
                }}
              >
                <Box
                  sx={{ width: 8, height: "100%", backgroundColor: "#E2E8F0", borderRadius: "1px" }}
                />
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 0.3 }}>
                  <Box sx={{ height: 4, backgroundColor: "#E2E8F0", borderRadius: "1px" }} />
                  <Box sx={{ flex: 1, backgroundColor: "#F1F5F9", borderRadius: "1px" }} />
                </Box>
              </Box>
            </Box>

            {/* Dark Theme Card */}
            <Box
              onClick={() => setMode("dark")}
              sx={{
                p: 1.5,
                borderRadius: "10px",
                border: `2px solid ${
                  mode === "dark"
                    ? primaryColor
                    : isDark
                    ? "#1E293B"
                    : "#E2E8F0"
                }`,
                backgroundColor: isDark ? "#111827" : "#F8FAFC",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  borderColor: primaryColor,
                },
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    backgroundColor: "#0F172A",
                    color: "#38BDF8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <DarkModeIcon sx={{ fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: "0.85rem" }}>
                    Dark Theme
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.72rem",
                      color: isDark ? "#94A3B8" : "#64748B",
                    }}
                  >
                    High-contrast dark layout
                  </Typography>
                </Box>
              </Box>
              {/* Mini mockup wireframe */}
              <Box
                sx={{
                  width: 38,
                  height: 24,
                  borderRadius: "4px",
                  border: "1px solid #334155",
                  backgroundColor: "#0F172A",
                  display: "flex",
                  p: 0.3,
                  gap: 0.3,
                }}
              >
                <Box
                  sx={{ width: 8, height: "100%", backgroundColor: "#1E293B", borderRadius: "1px" }}
                />
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 0.3 }}>
                  <Box sx={{ height: 4, backgroundColor: "#1E293B", borderRadius: "1px" }} />
                  <Box sx={{ flex: 1, backgroundColor: "#020617", borderRadius: "1px" }} />
                </Box>
              </Box>
            </Box>

            {/* Customize Theme Card */}
            <Box
              onClick={() => setMode("custom")}
              sx={{
                p: 1.5,
                borderRadius: "10px",
                border: `2px solid ${
                  mode === "custom"
                    ? primaryColor
                    : isDark
                    ? "#1E293B"
                    : "#E2E8F0"
                }`,
                backgroundColor: isDark ? "#111827" : "#F8FAFC",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  borderColor: primaryColor,
                },
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    backgroundColor: isDark ? "#1E293B" : "#EEF2FF",
                    color: primaryColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PaletteIcon sx={{ fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: "0.85rem" }}>
                    Customize Theme
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.72rem",
                      color: isDark ? "#94A3B8" : "#64748B",
                    }}
                  >
                    Custom Header, Sidebar & Colors
                  </Typography>
                </Box>
              </Box>
              <Chip
                icon={<CheckIcon sx={{ fontSize: "13px !important", color: "#fff !important" }} />}
                label="Custom"
                size="small"
                sx={{
                  height: 22,
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  backgroundColor: "#0F172A",
                  color: "#FFFFFF",
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Section: Customize Base Mode */}
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1.2,
            }}
          >
            <Typography sx={{ fontSize: "0.82rem", fontWeight: 700 }}>
              Customize Base Mode
            </Typography>
            <Typography
              sx={{
                fontSize: "0.72rem",
                color: isDark ? "#94A3B8" : "#64748B",
              }}
            >
              Active:{" "}
              <span style={{ fontWeight: 600, color: isDark ? "#38BDF8" : "#0F172A" }}>
                {baseMode === "dark" ? "Dark Base" : "Light Base"}
              </span>
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              p: 0.5,
              borderRadius: "8px",
              backgroundColor: isDark ? "#111827" : "#F1F5F9",
              gap: 0.5,
            }}
          >
            <Button
              fullWidth
              size="small"
              onClick={() => setBaseMode("light")}
              startIcon={<WbSunnyIcon sx={{ fontSize: 16 }} />}
              sx={{
                py: 0.8,
                fontSize: "0.78rem",
                fontWeight: 600,
                borderRadius: "6px",
                textTransform: "none",
                backgroundColor:
                  baseMode === "light"
                    ? isDark
                      ? "#1E293B"
                      : "#0F172A"
                    : "transparent",
                color:
                  baseMode === "light"
                    ? "#FFFFFF"
                    : isDark
                    ? "#94A3B8"
                    : "#64748B",
                "&:hover": {
                  backgroundColor:
                    baseMode === "light"
                      ? isDark
                        ? "#1E293B"
                        : "#0F172A"
                      : "rgba(0,0,0,0.05)",
                },
              }}
            >
              Light Base
            </Button>

            <Button
              fullWidth
              size="small"
              onClick={() => setBaseMode("dark")}
              startIcon={<DarkModeIcon sx={{ fontSize: 16 }} />}
              sx={{
                py: 0.8,
                fontSize: "0.78rem",
                fontWeight: 600,
                borderRadius: "6px",
                textTransform: "none",
                backgroundColor:
                  baseMode === "dark"
                    ? isDark
                      ? "#1E293B"
                      : "#0F172A"
                    : "transparent",
                color:
                  baseMode === "dark"
                    ? "#FFFFFF"
                    : isDark
                    ? "#94A3B8"
                    : "#64748B",
                "&:hover": {
                  backgroundColor:
                    baseMode === "dark"
                      ? isDark
                        ? "#1E293B"
                        : "#0F172A"
                      : "rgba(0,0,0,0.05)",
                },
              }}
            >
              Dark Base
            </Button>
          </Box>
        </Box>

        {/* Section: Header Color */}
        <Box
          sx={{
            p: 2,
            borderRadius: "10px",
            border: `1px solid ${isDark ? "#1E293B" : "#E2E8F0"}`,
            backgroundColor: isDark ? "#111827" : "#FFFFFF",
          }}
        >
          <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, mb: 1.2 }}>
            Header Color
          </Typography>

          {/* Solid Colors */}
          <Typography
            sx={{
              fontSize: "0.72rem",
              fontWeight: 600,
              color: isDark ? "#94A3B8" : "#64748B",
              mb: 1,
            }}
          >
            Solid Colors
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
            {SWATCH_SOLID_COLORS.map((swatch) => {
              const isSelected =
                headerType === "solid" && headerColor.toLowerCase() === swatch.value.toLowerCase();
              return (
                <Tooltip key={swatch.value} title={swatch.label}>
                  <Box
                    onClick={() => setHeaderColor(swatch.value, "solid")}
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "6px",
                      backgroundColor: swatch.value,
                      border: swatch.border
                        ? `1px solid ${swatch.border}`
                        : `1px solid rgba(0,0,0,0.15)`,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: isSelected
                        ? `0 0 0 2px ${primaryColor}`
                        : "0 1px 3px rgba(0,0,0,0.1)",
                      transition: "transform 0.15s",
                      "&:hover": { transform: "scale(1.1)" },
                    }}
                  >
                    {isSelected && (
                      <CheckIcon
                        sx={{
                          fontSize: 16,
                          color: swatch.value === "#FFFFFF" ? "#0F172A" : "#FFFFFF",
                        }}
                      />
                    )}
                  </Box>
                </Tooltip>
              );
            })}
          </Box>

          {/* Gradient Colors */}
          <Typography
            sx={{
              fontSize: "0.72rem",
              fontWeight: 600,
              color: isDark ? "#94A3B8" : "#64748B",
              mb: 1,
            }}
          >
            Gradient Colors
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {SWATCH_GRADIENT_COLORS.map((swatch) => {
              const isSelected =
                headerType === "gradient" && headerColor === swatch.value;
              return (
                <Tooltip key={swatch.value} title={swatch.label}>
                  <Box
                    onClick={() => setHeaderColor(swatch.value, "gradient")}
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "6px",
                      backgroundImage: swatch.value,
                      border: "1px solid rgba(0,0,0,0.15)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: isSelected
                        ? `0 0 0 2px ${primaryColor}`
                        : "0 1px 3px rgba(0,0,0,0.1)",
                      transition: "transform 0.15s",
                      "&:hover": { transform: "scale(1.1)" },
                    }}
                  >
                    {isSelected && <CheckIcon sx={{ fontSize: 16, color: "#FFFFFF" }} />}
                  </Box>
                </Tooltip>
              );
            })}
          </Box>
        </Box>

        {/* Section: Sidebar Color */}
        <Box
          sx={{
            p: 2,
            borderRadius: "10px",
            border: `1px solid ${isDark ? "#1E293B" : "#E2E8F0"}`,
            backgroundColor: isDark ? "#111827" : "#FFFFFF",
          }}
        >
          <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, mb: 1.2 }}>
            Sidebar Color
          </Typography>

          {/* Solid Colors */}
          <Typography
            sx={{
              fontSize: "0.72rem",
              fontWeight: 600,
              color: isDark ? "#94A3B8" : "#64748B",
              mb: 1,
            }}
          >
            Solid Colors
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
            {SWATCH_SOLID_COLORS.map((swatch) => {
              const isSelected =
                sidebarType === "solid" && sidebarColor.toLowerCase() === swatch.value.toLowerCase();
              return (
                <Tooltip key={swatch.value} title={swatch.label}>
                  <Box
                    onClick={() => setSidebarColor(swatch.value, "solid")}
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "6px",
                      backgroundColor: swatch.value,
                      border: swatch.border
                        ? `1px solid ${swatch.border}`
                        : `1px solid rgba(0,0,0,0.15)`,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: isSelected
                        ? `0 0 0 2px ${primaryColor}`
                        : "0 1px 3px rgba(0,0,0,0.1)",
                      transition: "transform 0.15s",
                      "&:hover": { transform: "scale(1.1)" },
                    }}
                  >
                    {isSelected && (
                      <CheckIcon
                        sx={{
                          fontSize: 16,
                          color: swatch.value === "#FFFFFF" ? "#0F172A" : "#FFFFFF",
                        }}
                      />
                    )}
                  </Box>
                </Tooltip>
              );
            })}
          </Box>

          {/* Gradient Colors */}
          <Typography
            sx={{
              fontSize: "0.72rem",
              fontWeight: 600,
              color: isDark ? "#94A3B8" : "#64748B",
              mb: 1,
            }}
          >
            Gradient Colors
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {SWATCH_GRADIENT_COLORS.map((swatch) => {
              const isSelected =
                sidebarType === "gradient" && sidebarColor === swatch.value;
              return (
                <Tooltip key={swatch.value} title={swatch.label}>
                  <Box
                    onClick={() => setSidebarColor(swatch.value, "gradient")}
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "6px",
                      backgroundImage: swatch.value,
                      border: "1px solid rgba(0,0,0,0.15)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: isSelected
                        ? `0 0 0 2px ${primaryColor}`
                        : "0 1px 3px rgba(0,0,0,0.1)",
                      transition: "transform 0.15s",
                      "&:hover": { transform: "scale(1.1)" },
                    }}
                  >
                    {isSelected && <CheckIcon sx={{ fontSize: 16, color: "#FFFFFF" }} />}
                  </Box>
                </Tooltip>
              );
            })}
          </Box>
        </Box>

        {/* Section: Color Customizer (Presets) */}
        <Box
          sx={{
            p: 2,
            borderRadius: "10px",
            border: `1px solid ${isDark ? "#1E293B" : "#E2E8F0"}`,
            backgroundColor: isDark ? "#111827" : "#FFFFFF",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1.5,
            }}
          >
            <Typography sx={{ fontSize: "0.82rem", fontWeight: 700 }}>
              Color Customizer
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 0.5 }}>
              <Typography
                sx={{
                  fontSize: "0.72rem",
                  color: isDark ? "#94A3B8" : "#64748B",
                  fontWeight: 600,
                }}
              >
                Custom
              </Typography>
              <Tooltip title="Reset to default theme preset (Theme-5)">
                <IconButton
                  size="small"
                  onClick={() => {
                    setPreset(DEFAULT_THEME_ID);
                    toast.success("Applied Theme-5 (Default)");
                  }}
                  sx={{ p: 0.2 }}
                >
                  <RefreshIcon sx={{ fontSize: 14 }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* 5 Duotone split circle presets */}
          <Box sx={{ display: "flex", gap: 1.5, justifyContent: "space-between" }}>
            {Object.values(THEME_PRESETS).map((preset, index) => {
              const isSelected = activePreset === preset.id;
              return (
                <Tooltip
                  key={preset.id}
                  title={`${preset.name} (Theme-${index + 1})`}
                >
                  <Box
                    onClick={() => {
                      setPreset(preset.id);
                      toast.success(`Applied ${preset.name}`);
                    }}
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      backgroundImage: preset.splitGradient,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: `2px solid ${
                        isSelected ? primaryColor : isDark ? "#334155" : "#E2E8F0"
                      }`,
                      boxShadow: isSelected
                        ? `0 0 0 3px ${primaryColor}40`
                        : "0 2px 6px rgba(0,0,0,0.12)",
                      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    {isSelected && (
                      <CheckIcon
                        sx={{
                          fontSize: 18,
                          color: "#FFFFFF",
                          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.8))",
                        }}
                      />
                    )}
                  </Box>
                </Tooltip>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ThemeSettingsDrawer;
