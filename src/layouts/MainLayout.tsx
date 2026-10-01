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
  const { baseMode } = useThemeStore();
  const { isCollapsed } = useSidebarStore();
  const isDark = baseMode === "dark";
  const colors = isDark ? COLORS.dark : COLORS.light;

  const marginLeft = isCollapsed ? 72 : 260;

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
      <Sidebar width={260} collapsedWidth={72} />

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
          initial={{ opacity: 0, y: 15 }}
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
              p: { xs: 1.5, sm: 2 },
              overflowY: "auto",
            }}
          >
            {children}
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default MainLayout;
