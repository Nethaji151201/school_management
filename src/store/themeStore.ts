import { create } from "zustand";
import { persist } from "zustand/middleware";
import { THEME_PRESETS, DEFAULT_THEME_ID } from "../theme/themePresets";

export type ThemeModeType = "light" | "dark" | "custom";
export type BaseModeType = "light" | "dark";
export type ColorStyleType = "solid" | "gradient";

export interface ThemeState {
  // Main Theme Modes
  mode: ThemeModeType;
  baseMode: BaseModeType;
  activePreset: string;

  // Custom Color Selections
  headerColor: string;
  headerType: ColorStyleType;
  sidebarColor: string;
  sidebarType: ColorStyleType;

  // Dynamic Brand Colors
  primaryColor: string;
  secondaryColor: string;
  tableHeaderColor: string;

  // UI Panels
  isSettingPanelOpen: boolean;

  // Actions
  setMode: (mode: ThemeModeType) => void;
  toggleTheme: () => void;
  setBaseMode: (baseMode: BaseModeType) => void;
  setPreset: (presetId: string) => void;
  setHeaderColor: (color: string, type?: ColorStyleType) => void;
  setSidebarColor: (color: string, type?: ColorStyleType) => void;
  setSettingPanelOpen: (isOpen: boolean) => void;
  toggleSettingPanel: () => void;
  resetToDefault: () => void;
}

const defaultPreset = THEME_PRESETS[DEFAULT_THEME_ID];

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: "custom",
      baseMode: "light",
      activePreset: DEFAULT_THEME_ID,

      headerColor: "#FFFFFF",
      headerType: "solid",
      sidebarColor: defaultPreset.sidebarBgLight,
      sidebarType: "solid",

      primaryColor: defaultPreset.primary,
      secondaryColor: defaultPreset.secondary,
      tableHeaderColor: defaultPreset.tableHeaderLight,

      isSettingPanelOpen: false,

      setMode: (mode) =>
        set((state) => {
          if (mode === "light") {
            return {
              mode: "light",
              baseMode: "light",
              headerColor: "#FFFFFF",
              headerType: "solid",
              sidebarColor: state.activePreset && THEME_PRESETS[state.activePreset] ? THEME_PRESETS[state.activePreset].sidebarBgLight : "#0F172A",
            };
          }
          if (mode === "dark") {
            return {
              mode: "dark",
              baseMode: "dark",
              headerColor: "#0F172A",
              headerType: "solid",
              sidebarColor: "#0B0F19",
            };
          }
          return { mode: "custom" };
        }),

      toggleTheme: () =>
        set((state) => {
          const newBase = state.baseMode === "light" ? "dark" : "light";
          return {
            baseMode: newBase,
            headerColor: newBase === "dark" ? "#0F172A" : "#FFFFFF",
          };
        }),

      setBaseMode: (baseMode) =>
        set((state) => {
          const preset = THEME_PRESETS[state.activePreset] || defaultPreset;
          const isDark = baseMode === "dark";
          return {
            baseMode,
            headerColor: isDark ? "#0F172A" : (state.headerType === "solid" && state.headerColor === "#0F172A" ? "#FFFFFF" : state.headerColor),
            tableHeaderColor: isDark ? preset.tableHeaderDark : preset.tableHeaderLight,
          };
        }),

      setPreset: (presetId) =>
        set((state) => {
          const preset = THEME_PRESETS[presetId] || defaultPreset;
          const isDark = state.baseMode === "dark";
          return {
            activePreset: presetId,
            primaryColor: preset.primary,
            secondaryColor: preset.secondary,
            tableHeaderColor: isDark ? preset.tableHeaderDark : preset.tableHeaderLight,
            sidebarColor: isDark ? preset.sidebarBgDark : preset.sidebarBgLight,
            sidebarType: "solid",
          };
        }),

      setHeaderColor: (headerColor, headerType = "solid") =>
        set({
          headerColor,
          headerType,
        }),

      setSidebarColor: (sidebarColor, sidebarType = "solid") =>
        set({
          sidebarColor,
          sidebarType,
        }),

      setSettingPanelOpen: (isSettingPanelOpen) => set({ isSettingPanelOpen }),

      toggleSettingPanel: () =>
        set((state) => ({ isSettingPanelOpen: !state.isSettingPanelOpen })),

      resetToDefault: () =>
        set({
          mode: "custom",
          baseMode: "light",
          activePreset: DEFAULT_THEME_ID,
          headerColor: "#FFFFFF",
          headerType: "solid",
          sidebarColor: defaultPreset.sidebarBgLight,
          sidebarType: "solid",
          primaryColor: defaultPreset.primary,
          secondaryColor: defaultPreset.secondary,
          tableHeaderColor: defaultPreset.tableHeaderLight,
        }),
    }),
    {
      name: "nethaji-theme-storage-v2",
    },
  ),
);
