import React from "react";
import { Box } from "@mui/material";
import FeeEditList from "../../components/students/fee-edit/FeeEditList";

const StudentFeeEditListPage: React.FC = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <FeeEditList />
    </Box>
  );
};

export default StudentFeeEditListPage;
