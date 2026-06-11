import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type ColorMode } from "../theme/colors";

interface ThemeStore {
  mode: ColorMode;
  toggleTheme: () => void;
  setTheme: (mode: ColorMode) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      mode: "light",
      toggleTheme: () =>
        set((state) => ({
          mode: state.mode === "light" ? "dark" : "light",
        })),
      setTheme: (mode: ColorMode) => set({ mode }),
    }),
    {
      name: "theme-storage",
    },
  ),
);
