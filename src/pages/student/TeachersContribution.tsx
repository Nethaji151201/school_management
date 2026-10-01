import React from "react";
import { Box } from "@mui/material";
import TeachersContributionList from "../../components/students/teachers-contribution/TeachersContributionList";

const TeachersContributionPage: React.FC = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <TeachersContributionList />
    </Box>
  );
};

export default TeachersContributionPage;
