import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";
import { useThemeStore } from "../store/themeStore";
import { useSidebarStore } from "../store/menuStore";
import { COLORS } from "../theme/colors";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { mode } = useThemeStore();
  const { isCollapsed } = useSidebarStore();
  const isDark = mode === "dark";
  const colors = isDark ? COLORS.dark : COLORS.light;

  const marginLeft = isCollapsed ? 80 : 280;

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: colors.bg,
        color: colors.text,
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          ml: `${marginLeft}px`,
          transition: "margin-left 0.3s ease-in-out",
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Header />

        {/* Page Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            marginTop: 64,
          }}
        >
          <Box
            sx={{
              flex: 1,
              p: { xs: 2, sm: 3 },
              overflowY: "auto",
            }}
          >
            {children}
          </Box>

          {/* Footer */}
          <Box
            sx={{
              p: 2,
              textAlign: "center",
              borderTop: `1px solid ${colors.border}`,
              color: colors.textTertiary,
              fontSize: "0.875rem",
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              © 2024 School Management System. All rights reserved.
            </motion.div>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default MainLayout;
