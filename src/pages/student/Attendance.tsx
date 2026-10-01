import React from "react";
import { Box } from "@mui/material";
import AddAttendance from "../../components/students/attendance/AddAttendance";

const AttendancePage: React.FC = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <AddAttendance />
    </Box>
  );
};

export default AttendancePage;
