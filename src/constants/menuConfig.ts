import { type MenuItem } from "../types";

export const SIDEBAR_MENUS: MenuItem[] = [
  {
    id: "student",
    title: "Student",
    icon: "School",
    children: [
      { id: "student-list", title: "Student", path: "/student" },
      { id: "fees-update", title: "Student Fees Update", path: "/fees-update" },
      { id: "fees-edit", title: "Student Fees Edit", path: "/fees-edit" },
      {
        id: "teacher-contribution",
        title: "Teachers Contribution",
        path: "/teacher-contribution",
      },
      { id: "promotion", title: "Promotion", path: "/promotion" },
      { id: "transfer", title: "Transfer", path: "/transfer" },
      { id: "history", title: "Student History", path: "/history" },
      { id: "comment", title: "Teacher Comment", path: "/comment" },
      { id: "attendance", title: "Attendance", path: "/attendance" },
      { id: "exam-no", title: "Student Exam No", path: "/exam-no" },
    ],
  },
  {
    id: "exams",
    title: "Exams",
    icon: "Assignment",
    children: [
      { id: "exam-master", title: "Exam Master", path: "/exam-master" },
      { id: "student-marks", title: "Student Marks", path: "/student-marks" },
    ],
  },
  {
    id: "reports",
    title: "Reports",
    icon: "Assessment",
    children: [
      {
        id: "mark-list",
        title: "Student Mark List",
        path: "/student-mark-list",
      },
      {
        id: "subject-marks",
        title: "Student Marks By Subject",
        path: "/subject-marks",
      },
      { id: "rank-card", title: "Student Rank Card", path: "/rank-card" },
      {
        id: "fees-receipt",
        title: "Fees Receipt By Student",
        path: "/fees-receipt",
      },
      { id: "receipt", title: "Receipt", path: "/receipt" },
      {
        id: "cancelled-receipt",
        title: "Cancelled Fees Receipts",
        path: "/cancelled-receipt",
      },
      { id: "daily-report", title: "Daily Report", path: "/daily-report" },
      { id: "annual-report", title: "Annual Report", path: "/annual-report" },
      {
        id: "daily-fees",
        title: "Daily Fees Collection",
        path: "/daily-fees",
      },
      { id: "fees-list", title: "Fees Collection List", path: "/fees-list" },
      {
        id: "teacher-contribution-report",
        title: "Teachers Contribution",
        path: "/teacher-contribution-report",
      },
      { id: "pending-fees", title: "Fees Pending List", path: "/pending-fees" },
      {
        id: "student-list-report",
        title: "Student List",
        path: "/student-list",
      },
      {
        id: "student-register",
        title: "Student Register",
        path: "/student-register",
      },
      {
        id: "student-profile",
        title: "Student Profile",
        path: "/student-profile",
      },
      {
        id: "concession-list",
        title: "Concession List",
        path: "/concession-list",
      },
      { id: "student-tc", title: "Student TC", path: "/student-tc" },
      {
        id: "strength-report",
        title: "Student Strength Report",
        path: "/strength-report",
      },
    ],
  },
  {
    id: "configuration",
    title: "Configuration",
    icon: "Settings",
    children: [
      {
        id: "academic-year",
        title: "Academic Year",
        path: "/academic-year",
      },
      { id: "holidays", title: "Holidays", path: "/holidays" },
      { id: "class", title: "Class", path: "/class" },
      { id: "section", title: "Section", path: "/section" },
      { id: "group", title: "Group", path: "/group" },
      { id: "subjects", title: "Subjects", path: "/subjects" },
      { id: "grade", title: "Grade Criteria", path: "/grade" },
      { id: "teacher", title: "Teacher", path: "/teacher" },
      { id: "relation", title: "Relation", path: "/relation" },
      { id: "fees-types", title: "Fees Types", path: "/fees-types" },
      {
        id: "activities",
        title: "Extra Curricular Activity",
        path: "/activities",
      },
    ],
  },
  {
    id: "administration",
    title: "Administration",
    icon: "AdminPanelSettings",
    children: [
      {
        id: "admin-settings",
        title: "Admin Settings",
        path: "/admin-settings",
      },
      {
        id: "update-exam-number",
        title: "Update Exam Number",
        path: "/update-exam-number",
      },
      {
        id: "fees-configuration",
        title: "Fees Configuration",
        path: "/fees-configuration",
      },
      {
        id: "teacher-comment",
        title: "Teacher Comment",
        path: "/teacher-comment",
      },
      { id: "student-sms", title: "Student SMS", path: "/student-sms" },
    ],
  },
  {
    id: "profile",
    title: "My Profile",
    icon: "Person",
    children: [
      {
        id: "change-password",
        title: "Change Password",
        path: "/change-password",
      },
      { id: "logout", title: "Logout", path: "/logout" },
    ],
  },
];

export const QUICK_ACCESS_MENUS = [
  { id: "dashboard", title: "Dashboard", path: "/", icon: "Dashboard" },
  { id: "student", title: "Student", path: "/student", icon: "School" },
  {
    id: "reports",
    title: "Reports",
    path: "/student-mark-list",
    icon: "Assessment",
  },
];
