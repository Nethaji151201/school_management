import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import StudentListPage from "../pages/student/StudentList";
import StudentFeeListPage from "../pages/student/StudentFeeList";
import StudentFeeEditListPage from "../pages/student/StudentFeeEditList";
import TeachersContributionPage from "../pages/student/TeachersContribution";
import AttendancePage from "../pages/student/Attendance";
import StudentExamNoPage from "../pages/student/StudentExamNo";
import MainLayout from "../layouts/MainLayout";

const LayoutWrapper: React.FC = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<LayoutWrapper />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/student" element={<StudentListPage />} />
        <Route path="/fees-update" element={<StudentFeeListPage />} />
        <Route path="/fees-edit" element={<StudentFeeEditListPage />} />
        <Route path="/teacher-contribution" element={<TeachersContributionPage />} />
        <Route path="/teachers-contribution" element={<TeachersContributionPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/add-attendance" element={<AttendancePage />} />
        <Route path="/exam-no" element={<StudentExamNoPage />} />
        <Route path="/student-exam-no" element={<StudentExamNoPage />} />
        <Route path="/update-exam-number" element={<StudentExamNoPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
