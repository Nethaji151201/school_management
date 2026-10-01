import React from "react";
import { Box } from "@mui/material";
import FeeUpdateList from "../../components/students/fee-update/feeUpdateList";

const StudentFeeListPage: React.FC = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <FeeUpdateList />
    </Box>
  );
};

export default StudentFeeListPage;
