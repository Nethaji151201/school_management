import { create } from "zustand";

interface MenuStore {
  expandedMenus: Set<string>;
  favoriteMenus: Set<string>;
  recentMenus: string[];
  toggleMenuExpand: (menuId: string) => void;
  toggleFavorite: (menuId: string) => void;
  addRecentMenu: (menuId: string) => void;
  removeRecentMenu: (menuId: string) => void;
  clearRecentMenus: () => void;
}

export const useMenuStore = create<MenuStore>((set) => ({
  expandedMenus: new Set(),
  favoriteMenus: new Set(),
  recentMenus: [],

  toggleMenuExpand: (menuId: string) =>
    set((state) => {
      const newSet = new Set(state.expandedMenus);
      if (newSet.has(menuId)) {
        newSet.delete(menuId);
      } else {
        newSet.add(menuId);
      }
      return { expandedMenus: newSet };
    }),

  toggleFavorite: (menuId: string) =>
    set((state) => {
      const newSet = new Set(state.favoriteMenus);
      if (newSet.has(menuId)) {
        newSet.delete(menuId);
      } else {
        newSet.add(menuId);
      }
      return { favoriteMenus: newSet };
    }),

  addRecentMenu: (menuId: string) =>
    set((state) => {
      let recent = [...state.recentMenus];
      recent = recent.filter((item) => item !== menuId);
      recent.unshift(menuId);
      recent = recent.slice(0, 5);
      return { recentMenus: recent };
    }),

  removeRecentMenu: (menuId: string) =>
    set((state) => ({
      recentMenus: state.recentMenus.filter((item) => item !== menuId),
    })),

  clearRecentMenus: () => set({ recentMenus: [] }),
}));

interface SidebarStore {
  isOpen: boolean;
  isCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  toggleCollapse: () => void;
  setCollapsed: (isCollapsed: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: true,
  isCollapsed: false,

  toggleSidebar: () =>
    set((state) => ({
      isOpen: !state.isOpen,
    })),

  setSidebarOpen: (isOpen: boolean) => set({ isOpen }),

  toggleCollapse: () =>
    set((state) => ({
      isCollapsed: !state.isCollapsed,
    })),

  setCollapsed: (isCollapsed: boolean) => set({ isCollapsed }),
}));
