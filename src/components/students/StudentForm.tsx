import React, { useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ModalForm, { type ModalFormTab } from "../common/ModalForm";
import CustomTextField from "../common/CustomTextField";
import CustomAutocomplete from "../common/CustomAutocomplete";
import CustomDatePicker from "../common/CustomDatePicker";
import { COLORS } from "../../theme/colors";
import dayjs, { type Dayjs } from "dayjs";
import { alpha } from "@mui/material/styles";

const STUDENT_TABS: ModalFormTab[] = [
  { id: "student-info", label: "Student Info" },
  { id: "present-add", label: "Present Add" },
  { id: "permanent-add", label: "Permanent Add" },
  { id: "father", label: "Father" },
  { id: "mother", label: "Mother" },
  { id: "guardian", label: "Guardian" },
  { id: "siblings", label: "Siblings" },
  { id: "medical", label: "Medical" },
  { id: "eca", label: "ECA" },
  { id: "transfer", label: "Transfer" },
];

interface FormRowProps {
  label: string;
  children: React.ReactNode;
  compact?: boolean;
  gridSpan?: number;
}

const FormRow: React.FC<FormRowProps> = ({ label, children, compact, gridSpan = 1 }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 0.75,
      mb: compact ? 0.5 : 0,
      gridColumn: { xs: "span 1", sm: `span ${gridSpan}` },
    }}
  >
    <Typography
      variant="body2"
      sx={{
        fontWeight: 700,
        color: "text.primary",
        fontSize: "0.85rem",
      }}
    >
      {label}
    </Typography>
    <Box>{children}</Box>
  </Box>
);

const FormGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
      columnGap: 4,
      rowGap: 2.5,
      width: "100%",
    }}
  >
    {children}
  </Box>
);

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <Typography
    variant="subtitle1"
    sx={{
      fontWeight: 800,
      mb: 1,
      mt: 0.5,
      color: COLORS.primary,
      gridColumn: "span 2",
    }}
  >
    {title}
  </Typography>
);

const AddressFields: React.FC = () => (
  <FormGrid>
    <SectionTitle title="Address Details" />
    <FormRow label="Phone 1">
      <CustomTextField placeholder="Phone 1" />
    </FormRow>
    <FormRow label="Mobile 1">
      <CustomTextField placeholder="Mobile 1" />
    </FormRow>
    <FormRow label="Email" gridSpan={2}>
      <CustomTextField placeholder="Email" type="email" />
    </FormRow>
    <FormRow label="Address 1" gridSpan={2}>
      <CustomTextField placeholder="Address 1" />
    </FormRow>
    <FormRow label="Address 2" gridSpan={2}>
      <CustomTextField placeholder="Address 2" />
    </FormRow>
    <FormRow label="City">
      <CustomTextField placeholder="City" />
    </FormRow>
    <FormRow label="State">
      <CustomTextField placeholder="State" />
    </FormRow>
    <FormRow label="Pin Code" gridSpan={2}>
      <CustomTextField placeholder="Pin Code" />
    </FormRow>
  </FormGrid>
);

const ParentFields: React.FC = () => (
  <FormGrid>
    <FormRow label="First Name">
      <CustomTextField placeholder="First Name" />
    </FormRow>
    <FormRow label="Last Name">
      <CustomTextField placeholder="Last Name" />
    </FormRow>
    <FormRow label="Full Name" gridSpan={2}>
      <CustomTextField placeholder="Full Name" />
    </FormRow>
    <FormRow label="Pan No">
      <CustomTextField placeholder="Pan No" />
    </FormRow>
    <FormRow label="Aadhar No">
      <CustomTextField placeholder="Aadhar No" />
    </FormRow>
    <FormRow label="Occupation">
      <CustomTextField placeholder="Occupation" />
    </FormRow>
    <FormRow label="Education Qualification">
      <CustomTextField placeholder="Education Qualification" />
    </FormRow>
    <FormRow label="Annual Income" gridSpan={2}>
      <CustomTextField placeholder="Annual Income" />
    </FormRow>
  </FormGrid>
);

interface StudentFormProps {
  open: boolean;
  onClose: () => void;
  onSave?: () => void;
  mode?: "add" | "edit";
}

const StudentForm: React.FC<StudentFormProps> = ({
  open,
  onClose,
  onSave,
  mode = "add",
}) => {
  const [activeTab, setActiveTab] = useState(STUDENT_TABS[0].id);
  const [sameAsPresent, setSameAsPresent] = useState(false);
  const [isPhysicallyChallenged, setIsPhysicallyChallenged] = useState(false);

  // Form Field States
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("Indian");
  const [religion, setReligion] = useState("");
  const [communityType, setCommunityType] = useState("");
  const [motherTongue, setMotherTongue] = useState("");
  const [travelMode, setTravelMode] = useState("");
  const [status, setStatus] = useState("Active");
  const [studentClass, setStudentClass] = useState("");
  const [section, setSection] = useState("");
  const [academicYear, setAcademicYear] = useState("2024-2025");
  const [bloodGroup, setBloodGroup] = useState("");
  const [lastStudiedClass, setLastStudiedClass] = useState("");

  const [dob, setDob] = useState<Dayjs | null>(null);
  const [admissionDate, setAdmissionDate] = useState<Dayjs | null>(null);
  const [transferAppDate, setTransferAppDate] = useState<Dayjs | null>(null);
  const [tcDate, setTcDate] = useState<Dayjs | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleClose = () => {
    setActiveTab(STUDENT_TABS[0].id);
    setSameAsPresent(false);
    setIsPhysicallyChallenged(false);
    setDob(null);
    setAdmissionDate(null);
    setTransferAppDate(null);
    setTcDate(null);
    setPhoto(null);
    setPhotoPreview(null);
    onClose();
  };

  const handleSave = () => {
    onSave?.();
    handleClose();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent triggering click event on parent box
    setPhoto(null);
    setPhotoPreview(null);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "student-info":
        return (
          <FormGrid>
            <FormRow label="Student Id">
              <CustomTextField placeholder="Student Id" />
            </FormRow>
            <FormRow label="Emis Number">
              <CustomTextField placeholder="Emis Number" />
            </FormRow>
            <FormRow label="Aadhar Number">
              <CustomTextField placeholder="Aadhar Number" />
            </FormRow>
            <FormRow label="First Name">
              <CustomTextField placeholder="First Name" />
            </FormRow>
            <FormRow label="Last Name">
              <CustomTextField placeholder="Last Name" />
            </FormRow>
            <FormRow label="Full Name" gridSpan={2}>
              <CustomTextField placeholder="Full Name" />
            </FormRow>
            <FormRow label="DOB">
              <CustomDatePicker
                placeholder="DOB"
                value={dob}
                onChange={setDob}
                height={32}
              />
            </FormRow>
            <FormRow label="Gender">
              <CustomAutocomplete
                options={["Male", "Female", "Other"]}
                placeholder="Select Gender"
                value={gender}
                onChange={(_, val) => setGender(val || "")}
                height={32}
              />
            </FormRow>
            <FormRow label="Nationality">
              <CustomAutocomplete
                options={["Indian", "Other"]}
                placeholder="Select Nationality"
                value={nationality}
                onChange={(_, val) => setNationality(val || "")}
                height={32}
              />
            </FormRow>
            <FormRow label="Religion">
              <CustomAutocomplete
                options={["Hinduism", "Christianity", "Islam", "Others"]}
                placeholder="Select Religion"
                value={religion}
                onChange={(_, val) => setReligion(val || "")}
                height={32}
              />
            </FormRow>
            <FormRow label="Community">
              <CustomTextField placeholder="Community" />
            </FormRow>
            <FormRow label="Community Type">
              <CustomAutocomplete
                options={["General", "BC", "MBC", "SC", "ST"]}
                placeholder="Select Community Type"
                value={communityType}
                onChange={(_, val) => setCommunityType(val || "")}
                height={32}
              />
            </FormRow>
            <FormRow label="Mother Tongue">
              <CustomAutocomplete
                options={["Tamil", "English", "Telugu", "Malayalam", "Hindi"]}
                placeholder="Select Mother Tongue"
                value={motherTongue}
                onChange={(_, val) => setMotherTongue(val || "")}
                height={32}
              />
            </FormRow>
            <FormRow label="Travel Mode">
              <CustomAutocomplete
                options={["Bus", "Walk", "Private", "Bicycle"]}
                placeholder="Select Travel Mode"
                value={travelMode}
                onChange={(_, val) => setTravelMode(val || "")}
                height={32}
              />
            </FormRow>
            <FormRow label="Status">
              <CustomAutocomplete
                options={["Active", "Inactive"]}
                placeholder="Select Status"
                value={status}
                onChange={(_, val) => setStatus(val || "")}
                height={32}
              />
            </FormRow>
            <FormRow label="Class">
              <CustomAutocomplete
                options={Array.from({ length: 12 }, (_, index) => String(index + 1))}
                placeholder="Select Class"
                value={studentClass}
                onChange={(_, val) => setStudentClass(val || "")}
                height={32}
              />
            </FormRow>
            <FormRow label="Section">
              <CustomAutocomplete
                options={["A", "B", "C", "D"]}
                placeholder="Select Section"
                value={section}
                onChange={(_, val) => setSection(val || "")}
                height={32}
              />
            </FormRow>
            <FormRow label="Academic Year">
              <CustomAutocomplete
                options={["2024-2025", "2025-2026"]}
                placeholder="Select Academic Year"
                value={academicYear}
                onChange={(_, val) => setAcademicYear(val || "")}
                height={32}
              />
            </FormRow>
            <FormRow label="Identification Marks" gridSpan={2}>
              <CustomTextField placeholder="Identification Marks" />
            </FormRow>
            <FormRow label="Upload Photo" gridSpan={2}>
              <Box
                sx={{
                  border: `2px dashed ${photoPreview ? COLORS.primary : "rgba(0, 0, 0, 0.15)"}`,
                  borderRadius: "12px",
                  p: 3,
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: "center",
                  justifyContent: photoPreview ? "space-between" : "center",
                  gap: 3,
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark"
                      ? alpha(COLORS.primary, photoPreview ? 0.08 : 0.02)
                      : alpha(COLORS.primary, photoPreview ? 0.05 : 0.01),
                  cursor: photoPreview ? "default" : "pointer",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  "&:hover": {
                    borderColor: COLORS.primary,
                    bgcolor: (theme) =>
                      theme.palette.mode === "dark"
                        ? alpha(COLORS.primary, 0.06)
                        : alpha(COLORS.primary, 0.03),
                  },
                }}
                onClick={() => {
                  if (!photoPreview) {
                    document.getElementById("student-photo-file-input")?.click();
                  }
                }}
              >
                <input
                  type="file"
                  id="student-photo-file-input"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={{ display: "none" }}
                />

                {photoPreview ? (
                  <>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar
                        src={photoPreview}
                        variant="rounded"
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: "8px",
                          border: `2px solid ${COLORS.primary}`,
                          boxShadow: `0 4px 12px ${COLORS.primary}25`,
                        }}
                      />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 0.5 }}>
                          <CheckCircleIcon sx={{ fontSize: 16, color: COLORS.primary }} />
                          Photo Selected
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {photo?.name || "student-photo.jpg"}
                        </Typography>
                        {photo && (
                          <Typography variant="caption" color="text.disabled">
                            {(photo.size / 1024).toFixed(1)} KB
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => document.getElementById("student-photo-file-input")?.click()}
                        sx={{
                          bgcolor: "background.paper",
                          border: "1px solid",
                          borderColor: "divider",
                          "&:hover": { bgcolor: "action.hover" },
                        }}
                      >
                        <CloudUploadIcon fontSize="small" sx={{ color: "text.secondary" }} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={handleRemovePhoto}
                        sx={{
                          bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
                          color: "error.main",
                          "&:hover": {
                            bgcolor: (theme) => alpha(theme.palette.error.main, 0.2),
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </>
                ) : (
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, py: 1 }}>
                    <CloudUploadIcon sx={{ fontSize: 40, color: "text.secondary" }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      Click to upload student photo
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Support PNG, JPG, or JPEG (Max 2MB)
                    </Typography>
                  </Box>
                )}
              </Box>
            </FormRow>
          </FormGrid>
        );

      case "present-add":
        return <AddressFields />;

      case "permanent-add":
        return (
          <FormGrid>
            <Box sx={{ gridColumn: "span 2", mb: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={sameAsPresent}
                    onChange={(event) => setSameAsPresent(event.target.checked)}
                    color="primary"
                  />
                }
                label="Same as Present Address"
              />
            </Box>
            {!sameAsPresent && <AddressFields />}
          </FormGrid>
        );

      case "father":
      case "mother":
      case "guardian":
        return <ParentFields />;

      case "siblings":
        return (
          <FormGrid>
            <FormRow label="Sibling Name">
              <CustomTextField placeholder="Sibling Name" />
            </FormRow>
            <FormRow label="Relationship">
              <CustomTextField placeholder="Relationship" />
            </FormRow>
            <FormRow label="Class / Occupation">
              <CustomTextField placeholder="Class / Occupation" />
            </FormRow>
            <FormRow label="School / Organization">
              <CustomTextField placeholder="School / Organization" />
            </FormRow>
          </FormGrid>
        );

      case "medical":
        return (
          <FormGrid>
            <FormRow label="Alergies">
              <CustomTextField placeholder="Alergies" />
            </FormRow>
            <FormRow label="Doctor Name">
              <CustomTextField placeholder="Doctor Name" />
            </FormRow>
            <FormRow label="Doctor Phone No">
              <CustomTextField placeholder="Doctor Phone No" />
            </FormRow>
            <FormRow label="Blood Group">
              <CustomAutocomplete
                options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
                placeholder="Select Blood Group"
                value={bloodGroup}
                onChange={(_, val) => setBloodGroup(val || "")}
                height={32}
              />
            </FormRow>
            <FormRow label="Height (Cms)">
              <CustomTextField placeholder="Height (Cms)" />
            </FormRow>
            <FormRow label="Weight (Kgs)">
              <CustomTextField placeholder="Weight (Kgs)" />
            </FormRow>
            <Box sx={{ gridColumn: "span 2", mt: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isPhysicallyChallenged}
                    onChange={(event) =>
                      setIsPhysicallyChallenged(event.target.checked)
                    }
                    color="primary"
                  />
                }
                label="Is Physically Challenged?"
              />
            </Box>
            {isPhysicallyChallenged && (
              <>
                <FormRow label="Disability Percentage">
                  <CustomTextField placeholder="Disability Percentage" />
                </FormRow>
                <FormRow label="Disability Description" gridSpan={2}>
                  <CustomTextField placeholder="Disability Description" />
                </FormRow>
              </>
            )}
          </FormGrid>
        );

      case "eca":
        return (
          <FormGrid>
            <FormRow label="Activity Name">
              <CustomTextField placeholder="Activity Name" />
            </FormRow>
            <FormRow label="Category">
              <CustomTextField placeholder="Category" />
            </FormRow>
            <FormRow label="Level">
              <CustomTextField placeholder="Level" />
            </FormRow>
            <FormRow label="Achievement / Remarks" gridSpan={2}>
              <CustomTextField placeholder="Achievement / Remarks" multiline rows={3} />
            </FormRow>
          </FormGrid>
        );

      case "transfer":
        return (
          <FormGrid>
            <FormRow label="TC Number">
              <CustomTextField placeholder="TC Number" />
            </FormRow>
            <FormRow label="Date of Admission">
              <CustomDatePicker
                placeholder="Select Date"
                value={admissionDate}
                onChange={setAdmissionDate}
                height={32}
              />
            </FormRow>
            <FormRow label="Last Studied Class">
              <CustomAutocomplete
                options={Array.from({ length: 12 }, (_, index) => String(index + 1))}
                placeholder="Select Class"
                value={lastStudiedClass}
                onChange={(_, val) => setLastStudiedClass(val || "")}
                height={32}
              />
            </FormRow>
            <FormRow label="Last Exam & Result">
              <CustomTextField placeholder="Last Exam & Result" />
            </FormRow>
            <FormRow label="Is Failed Remarks">
              <CustomTextField placeholder="Is Failed Remarks" />
            </FormRow>
            <FormRow label="Subjects Studied" gridSpan={2}>
              <CustomTextField placeholder="Subjects Studied" multiline rows={2} />
            </FormRow>
            <FormRow label="Promoted To Class">
              <CustomTextField placeholder="Promoted To Class" />
            </FormRow>
            <FormRow label="Fees Fully Paid?">
              <CustomTextField placeholder="Fees Fully Paid?" />
            </FormRow>
            <FormRow label="Scholarship/Concession Remarks">
              <CustomTextField placeholder="Scholarship/Concession Remarks" />
            </FormRow>
            <FormRow label="No. Of Working Days">
              <CustomTextField placeholder="No. Of Working Days" />
            </FormRow>
            <FormRow label="No. Of Present Days">
              <CustomTextField placeholder="No. Of Present Days" />
            </FormRow>
            <FormRow label="NCC Remarks">
              <CustomTextField placeholder="NCC Remarks" />
            </FormRow>
            <FormRow label="Extra Curricular Remarks">
              <CustomTextField placeholder="Extra Curricular Remarks" />
            </FormRow>
            <FormRow label="Conduct and Character">
              <CustomTextField placeholder="Conduct and Character" />
            </FormRow>
            <FormRow label="Date of Application for Transfer">
              <CustomDatePicker
                placeholder="Select Date"
                value={transferAppDate}
                onChange={setTransferAppDate}
                height={32}
              />
            </FormRow>
            <FormRow label="Date of Transfer Certificate">
              <CustomDatePicker
                placeholder="Select Date"
                value={tcDate}
                onChange={setTcDate}
                height={32}
              />
            </FormRow>
            <FormRow label="Reason for Leaving" gridSpan={2}>
              <CustomTextField placeholder="Reason for Leaving" />
            </FormRow>
            <FormRow label="Any Other Remarks" gridSpan={2}>
              <CustomTextField placeholder="Any Other Remarks" multiline rows={2} />
            </FormRow>
          </FormGrid>
        );

      default:
        return null;
    }
  };

  return (
    <ModalForm
      open={open}
      title={mode === "add" ? "Create Student" : "Edit Student"}
      onClose={handleClose}
      onSave={handleSave}
      maxWidth="lg"
      tabs={STUDENT_TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      headerIcon={
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(11, 156, 168, 0.12)",
            border: `2px solid ${COLORS.primary}40`,
            color: COLORS.primary,
          }}
        >
          <PersonAddAlt1Icon sx={{ fontSize: 18 }} />
        </Box>
      }
    >
      <Box sx={{ width: "100%" }}>{renderTabContent()}</Box>
    </ModalForm>
  );
};

export default StudentForm;
