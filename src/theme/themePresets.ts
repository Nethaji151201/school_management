export interface ThemePreset {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  headerBgLight: string;
  headerBgDark: string;
  sidebarBgLight: string;
  sidebarBgDark: string;
  tableHeaderLight: string;
  tableHeaderDark: string;
  gradientPrimary: string;
  gradientSecondary: string;
  splitGradient: string; // for duotone swatch button
}

export const THEME_PRESETS: Record<string, ThemePreset> = {
  "theme-1": {
    id: "theme-1",
    name: "Electric Blue & Orange",
    primary: "#2563EB",
    secondary: "#F97316",
    accent: "#06B6D4",
    headerBgLight: "#FFFFFF",
    headerBgDark: "#0F172A",
    sidebarBgLight: "#1E3A8A",
    sidebarBgDark: "#0F172A",
    tableHeaderLight: "#1E3A8A",
    tableHeaderDark: "#0F172A",
    gradientPrimary: "linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)",
    gradientSecondary: "linear-gradient(135deg, #F97316 0%, #FB923C 100%)",
    splitGradient: "linear-gradient(135deg, #2563EB 50%, #F97316 50%)",
  },
  "theme-2": {
    id: "theme-2",
    name: "Ocean Sky & Crimson",
    primary: "#0284C7",
    secondary: "#EF4444",
    accent: "#38BDF8",
    headerBgLight: "#FFFFFF",
    headerBgDark: "#0F172A",
    sidebarBgLight: "#0C4A6E",
    sidebarBgDark: "#0F172A",
    tableHeaderLight: "#0C4A6E",
    tableHeaderDark: "#0F172A",
    gradientPrimary: "linear-gradient(135deg, #0284C7 0%, #0EA5E9 100%)",
    gradientSecondary: "linear-gradient(135deg, #EF4444 0%, #F87171 100%)",
    splitGradient: "linear-gradient(135deg, #0284C7 50%, #EF4444 50%)",
  },
  "theme-3": {
    id: "theme-3",
    name: "Royal Purple & Pink",
    primary: "#7C3AED",
    secondary: "#EC4899",
    accent: "#A855F7",
    headerBgLight: "#FFFFFF",
    headerBgDark: "#0F172A",
    sidebarBgLight: "#4C1D95",
    sidebarBgDark: "#0F172A",
    tableHeaderLight: "#4C1D95",
    tableHeaderDark: "#0F172A",
    gradientPrimary: "linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)",
    gradientSecondary: "linear-gradient(135deg, #EC4899 0%, #F472B6 100%)",
    splitGradient: "linear-gradient(135deg, #7C3AED 50%, #EC4899 50%)",
  },
  "theme-4": {
    id: "theme-4",
    name: "Teal Green & Cyan",
    primary: "#0D9488",
    secondary: "#0284C7",
    accent: "#14B8A6",
    headerBgLight: "#FFFFFF",
    headerBgDark: "#0F172A",
    sidebarBgLight: "#115E59",
    sidebarBgDark: "#0F172A",
    tableHeaderLight: "#115E59",
    tableHeaderDark: "#0F172A",
    gradientPrimary: "linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)",
    gradientSecondary: "linear-gradient(135deg, #0284C7 0%, #38BDF8 100%)",
    splitGradient: "linear-gradient(135deg, #0D9488 50%, #0284C7 50%)",
  },
  "theme-5": {
    id: "theme-5",
    name: "Deep Slate Navy & Ruby Crimson (Default)",
    primary: "#BE123C", // Ruby Crimson
    secondary: "#0F172A", // Deep Slate Navy
    accent: "#E11D48",
    headerBgLight: "#FFFFFF",
    headerBgDark: "#0F172A",
    sidebarBgLight: "#0F172A", // Dark Slate sidebar as shown in Medsky
    sidebarBgDark: "#0B0F19",
    tableHeaderLight: "#0F172A", // Dark navy table header as shown in Medsky
    tableHeaderDark: "#0B0F19",
    gradientPrimary: "linear-gradient(135deg, #BE123C 0%, #E11D48 100%)",
    gradientSecondary: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
    splitGradient: "linear-gradient(135deg, #0F172A 50%, #BE123C 50%)",
  },
};

export const SWATCH_SOLID_COLORS = [
  { label: "White", value: "#FFFFFF", border: "#E2E8F0" },
  { label: "Dark Slate", value: "#0F172A" },
  { label: "Deep Navy", value: "#1E3A8A" },
  { label: "Teal Green", value: "#0D9488" },
  { label: "Royal Blue", value: "#2563EB" },
  { label: "Indigo Violet", value: "#4F46E5" },
  { label: "Ruby Crimson", value: "#BE123C" },
];

export const SWATCH_GRADIENT_COLORS = [
  { label: "Violet Glow", value: "linear-gradient(135deg, #6366F1 0%, #A855F7 100%)" },
  { label: "Ocean Breeze", value: "linear-gradient(135deg, #0284C7 0%, #2563EB 100%)" },
  { label: "Teal Emerald", value: "linear-gradient(135deg, #0D9488 0%, #10B981 100%)" },
  { label: "Ruby Rose", value: "linear-gradient(135deg, #BE123C 0%, #E11D48 100%)" },
  { label: "Sunset Amber", value: "linear-gradient(135deg, #EA580C 0%, #F97316 100%)" },
  { label: "Midnight Slate", value: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)" },
];

export const DEFAULT_THEME_ID = "theme-5";
