import React from "react";
import { Box } from "@mui/material";
import StudentExamNo from "../../components/students/exam-no/StudentExamNo";

const StudentExamNoPage: React.FC = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <StudentExamNo />
    </Box>
  );
};

export default StudentExamNoPage;
