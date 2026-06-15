import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "../../components/common/DataTable";
import CustomTextField from "../../components/common/CustomTextField";
import type { DataTableHeader } from "../../components/common/DataTable";

interface Student {
  studentId: string;
  examNo: string;
  emisNumber: string;
  fullName: string;
  parentName: string;
  dob: string;
  class: string;
  section: string;
  status: string;
  year: string;
  mobileNumber: string;
  parentAddress: string;
  religion: string;
  community: string;
  motherTongue: string;
}

const studentHeaders: DataTableHeader<Student>[] = [
  {
    label: "Student ID",
    key: "studentId",
    minWidth: 180,
    sortable: true,
    searchEnable: true,
  },
  {
    label: "Exam No",
    key: "examNo",
    minWidth: 180,
    sortable: true,
    searchEnable: true,
  },
  {
    label: "EMIS Number",
    key: "emisNumber",
    minWidth: 180,
    sortable: true,
    searchEnable: true,
  },
  {
    label: "Full Name",
    key: "fullName",
    minWidth: 180,
    sortable: true,
    searchEnable: true,
  },
  {
    label: "Parent Name",
    key: "parentName",
    minWidth: 180,
    sortable: true,
    searchEnable: true,
  },
  {
    label: "DOB",
    key: "dob",
    minWidth: 180,
    sortable: true,
    searchEnable: true,
  },
  {
    label: "Class",
    key: "class",
    minWidth: 180,
    sortable: true,
    searchEnable: true,
  },
  {
    label: "Section",
    key: "section",
    minWidth: 180,
    sortable: true,
    searchEnable: true,
  },
  {
    label: "Status",
    key: "status",
    minWidth: 180,
    sortable: true,
    searchEnable: true,
  },
  {
    label: "Year",
    key: "year",
    minWidth: 180,
    sortable: true,
    searchEnable: true,
  },
  {
    label: "Mobile Number",
    key: "mobileNumber",
    minWidth: 180,
    sortable: true,
    searchEnable: true,
  },
  {
    label: "Parent Address",
    key: "parentAddress",
    minWidth: 180,
    sortable: true,
    searchEnable: true,
  },
  { label: "Religion", key: "religion", minWidth: 100, sortable: true },
  { label: "Community", key: "community", minWidth: 100, sortable: true },
  {
    label: "Mother Tongue",
    key: "motherTongue",
    minWidth: 120,
    sortable: true,
    align: "center",
  },
  {
    label: "Actions",
    key: "actions",
    minWidth: 100,
    align: "center",
    render: (row) => (
      <IconButton
        size="small"
        color="primary"
        aria-label={`edit-${row.studentId}`}
      >
        <EditIcon fontSize="small" />
      </IconButton>
    ),
  },
];

const studentRows: Student[] = Array.from({ length: 100 }, (_, index) => ({
  studentId: `S${String(index + 1).padStart(3, "0")}`,
  examNo: `E${String(index + 1).padStart(3, "0")}`,
  emisNumber: `EMIS${String(index + 1).padStart(5, "0")}`,
  fullName: `Student ${index + 1}`,
  parentName: `Parent ${index + 1}`,
  dob: `200${index % 10}-0${(index % 9) + 1}-15`,
  class: `${(index % 12) + 1}`,
  section: ["A", "B", "C", "D"][index % 4],
  status: index % 5 === 0 ? "Inactive" : "Active",
  year: index % 2 === 0 ? "2023-2024" : "2024-2025",
  mobileNumber: `+91 98${String(10000000 + index).padStart(8, "0")}`,
  parentAddress: `${index + 1} Main Street, Salem`,
  religion: ["Hinduism", "Christianity", "Islam"][index % 3],
  community: ["General", "BC", "MBC", "SC", "ST"][index % 5],
  motherTongue: ["Tamil", "English", "Telugu", "Malayalam"][index % 4],
}));

const StudentList: React.FC = () => {
  const [studentName, setStudentName] = useState("");
  const [examNo, setExamNo] = useState("");
  const [parentName, setParentName] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [religionFilter, setReligionFilter] = useState("");

  const filteredRows = studentRows.filter((s) => {
    if (
      studentName &&
      !s.fullName.toLowerCase().includes(studentName.toLowerCase())
    )
      return false;
    if (examNo && !s.examNo.toLowerCase().includes(examNo.toLowerCase()))
      return false;
    if (
      parentName &&
      !s.parentName.toLowerCase().includes(parentName.toLowerCase())
    )
      return false;
    if (
      statusFilter &&
      !s.status.toLowerCase().includes(statusFilter.toLowerCase())
    )
      return false;
    if (
      religionFilter &&
      !s.religion.toLowerCase().includes(religionFilter.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <Box sx={{ width: "100%", px: 2, py: 3 }}>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box>
          <Typography variant="h5" component="h1" gutterBottom>
            Student Directory
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Review student progress, sections, and roll details with the table
            below.
          </Typography>
        </Box>
      </Stack>

      <Accordion defaultExpanded sx={{ mb: 3, borderRadius: 0.5 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Search records
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ backgroundColor: "background.paper", p: 1.5, pt: 0 }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 2,
              alignItems: "center",
            }}
          >
            <div>
              <span className="small" style={{ fontWeight: 600 }}>
                Student Name
              </span>
              <CustomTextField
                placeholder="Student Name"
                value={studentName}
                onChange={(event) => setStudentName(event.target.value)}
              />
            </div>

            <div>
              <span className="small" style={{ fontWeight: 600 }}>
                Exam Number
              </span>
              <CustomTextField
                placeholder="Exam Number"
                value={examNo}
                onChange={(event) => setExamNo(event.target.value)}
              />
            </div>

            <div>
              <span className="small" style={{ fontWeight: 600 }}>
                Parent Name
              </span>
              <CustomTextField
                placeholder="Parent Name"
                value={parentName}
                onChange={(event) => setParentName(event.target.value)}
              />
            </div>

            <div>
              <span className="small" style={{ fontWeight: 600 }}>
                Status
              </span>
              <CustomTextField
                placeholder="Status (e.g. Active)"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              />
            </div>

            <div>
              <span className="small" style={{ fontWeight: 600 }}>
                Religion
              </span>
              <CustomTextField
                placeholder="Religion"
                value={religionFilter}
                onChange={(event) => setReligionFilter(event.target.value)}
              />
            </div>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
                onClick={() => {
                  /* filter is applied automatically */
                }}
                size="small"
              >
                Search
              </Button>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      <DataTable
        headers={studentHeaders}
        data={filteredRows}
        selectable
        serialNumber
        enablePagination
        emptyMessage="No students available"
        onRowClick={(student) => {
          console.log("Selected student", student.fullName);
        }}
      />
    </Box>
  );
};

export default StudentList;
