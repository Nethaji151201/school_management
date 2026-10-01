# 👥 School Management System — Project Roles & AI Agent Guidelines

This document defines the **user roles, feature access rules, architecture standards, UI/UX rules, reusable component rules, coding conventions, and AI agent development guidelines** for the School Management System.

All developers and AI coding agents, including **Antigravity, Copilot, Codex, and other AI agents**, must follow these rules when creating, modifying, or refactoring code.

---

# 1. 🔑 Project User Roles

The application supports four primary roles:

```typescript
role: "admin" | "teacher" | "student" | "parent"
```

## 1.1 Administrator

Administrators manage the overall school system.

### Responsibilities

* Academic year configuration
* Classes and sections
* Subject configuration
* Student registration
* Student promotion and transfer
* Fee categories and fee structures
* Fee collection and cancellation
* User management
* Permissions
* Reports
* Audit logs
* System configuration

---

## 1.2 Teacher

Teachers manage academic and student-related activities.

### Responsibilities

* Student attendance
* Student marks
* Exam-related data
* Teacher comments
* Student academic history
* Student profiles
* Academic reports
* Mark lists
* Subject marks
* Student registers

Teachers must not access administrative configuration or financial management screens unless explicitly permitted.

---

## 1.3 Student

Students can access their own academic and registration information.

### Responsibilities

* View own profile
* View registration details
* View attendance
* View mark lists
* View rank cards
* View exam timetable
* Download own fee receipts
* Request Transfer Certificate

Students must never access administrative or other students' private information.

---

## 1.4 Parent

Parents can monitor their children's academic and financial information.

### Responsibilities

* View children's profiles
* View academic performance
* View rank cards
* View attendance
* View teacher comments
* View pending fees
* Download fee receipts
* Monitor behavioral information

Parents must only access information belonging to their linked children.

---

# 2. 📊 Feature Access Control Matrix

| Menu Section   | Feature             | Admin | Teacher | Student | Parent |
| -------------- | ------------------- | :---: | :-----: | :-----: | :----: |
| Student        | Student List        |  Full |   View  |    No   |   No   |
| Student        | Fees Update/Edit    |  Full |    No   |    No   |   No   |
| Student        | Teacher Comments    |  Full |   Full  |   View  |  View  |
| Student        | Promotion/Transfer  |  Full |    No   |    No   |   No   |
| Student        | Attendance Entry    |  Full |   Full  |    No   |   No   |
| Exams          | Exam Master         |  Full |   View  |    No   |   No   |
| Exams          | Student Marks Entry |  Full |   Full  |    No   |   No   |
| Reports        | Mark List/Rank Card |  Full |   Full  |   View  |  View  |
| Reports        | Fees Receipts       |  Full |    No   |   View  |  View  |
| Reports        | Cancelled Receipts  |  Full |    No   |    No   |   No   |
| Reports        | Daily Collections   |  Full |    No   |    No   |   No   |
| Reports        | Student Strength    |  Full |   View  |    No   |   No   |
| Reports        | Student Registers   |  Full |   View  |    No   |   No   |
| Configuration  | Academic Year       |  Full |    No   |    No   |   No   |
| Configuration  | Classes/Sections    |  Full |    No   |    No   |   No   |
| Configuration  | Subjects            |  Full |    No   |    No   |   No   |
| Configuration  | Fee Categories      |  Full |    No   |    No   |   No   |
| Configuration  | Fee Structure       |  Full |    No   |    No   |   No   |
| Administration | User Management     |  Full |    No   |    No   |   No   |
| Administration | Audit Logs          |  Full |    No   |    No   |   No   |
| My Profile     | Profile             |  View |   View  |   View  |  View  |

### Important

Frontend permissions are for UI protection only.

Actual authorization must always be enforced by the backend API.

Never assume that hiding a menu item is sufficient security.

---

# 3. 🧱 Technology Stack

The project uses:

* React 19
* TypeScript
* Material UI
* React Router v7
* Zustand
* TanStack React Query
* Axios
* Framer Motion 12

### Core architecture

```text
src/
├── components/
│   ├── common/
│   ├── layout/
│   └── ...
├── pages/
├── routes/
├── services/
├── store/
├── hooks/
├── theme/
├── utils/
├── constants/
├── types/
└── assets/
```

AI agents must follow the existing project architecture.

Do not introduce a new architectural pattern unless there is a clear project-level reason.

---

# 4. ♻️ Reusable Components — MANDATORY

## Most Important Rule

> **Before creating a new component, check whether an existing common component can be reused or extended.**

Do not create duplicate UI components for the same purpose.

Before implementing a new UI element:

1. Search `src/components/common/`
2. Search related components in `src/components/`
3. Search existing pages for similar implementations
4. Reuse the existing component if possible
5. If the existing component is missing a required feature, extend it
6. Create a new component only when reuse or extension is not appropriate

---

# 5. 🧩 Common Components

Common reusable components should be placed under:

```text
src/components/common/
```

Examples:

```text
DataTable
CommonButton
CommonTextField
CommonSelect
CommonAutocomplete
CommonDatePicker
CommonDialog
CommonModal
CommonCard
CommonPageHeader
CommonSearch
CommonFilter
CommonLoader
CommonEmptyState
CommonErrorState
CommonConfirmDialog
CommonForm
CommonBreadcrumb
CommonPagination
CommonExportButton
```

The actual component names must follow the existing project structure.

Do not create another component with the same responsibility.

---

# 6. 📋 Data Tables

All lists, reports, grids, and management screens must use:

```text
src/components/common/DataTable.tsx
```

Do not independently implement:

* Pagination
* Sorting
* Search
* Column visibility
* Export
* Loading state
* Empty state
* Row actions

inside individual pages if `DataTable` already supports the requirement.

If `DataTable` is missing a reusable capability:

> Extend `DataTable` instead of creating another table implementation.

---

# 7. 🔘 Buttons

Always use the existing common button component.

Do not repeatedly create:

```tsx
<Button>Save</Button>
<Button>Cancel</Button>
<Button>Add</Button>
```

with different styling across pages.

Instead:

```tsx
<CommonButton>
  Save
</CommonButton>
```

or the project's existing button abstraction.

If a new button behavior is required, extend the common button component.

---

# 8. 📝 Form Controls

Before creating any input, search the common components.

Reuse:

* Text fields
* Selects
* Autocomplete
* Date pickers
* Number inputs
* Search fields
* Form controls
* Validation messages

Do not duplicate:

```tsx
sx={{
  borderRadius: ...,
  fontSize: ...,
  ...
}}
```

across multiple pages.

Common styling belongs in the reusable component or theme.

---

# 9. 🧠 DRY — Don't Repeat Yourself

The project must follow the **DRY principle**.

If the same:

* UI
* CSS
* Typography
* API logic
* Validation
* Formatting
* Business logic
* Table configuration
* Dialog
* Filter
* Button
* Form field
* Status badge
* Empty state
* Loading state

appears more than once, consider moving it into a reusable abstraction.

### Example

❌ Bad:

```text
StudentList.tsx
TeacherList.tsx
ParentList.tsx
```

Each contains its own:

```text
SearchBox
Pagination
Loading
EmptyState
ExportButton
```

### Better:

```text
components/common/
├── DataTable.tsx
├── CommonSearch.tsx
├── CommonEmptyState.tsx
├── CommonLoader.tsx
└── CommonExportButton.tsx
```

Then pages compose these components.

---

# 10. 📦 Common Constants

Repeated constants must not be duplicated.

Use:

```text
src/constants/
```

for shared values.

Examples:

```text
menuConfig.ts
routes.ts
statusConstants.ts
validationConstants.ts
appConstants.ts
```

If the same value is used in multiple files, consider moving it to a shared constant.

Never duplicate magic strings throughout the application.

---

# 11. 🎨 Centralized Color System

Never hardcode colors inside individual components.

Do not use:

```tsx
color: "#2563EB"
```

or:

```tsx
color: "blue"
```

when the color represents an application design token.

Use:

```text
src/theme/colors.ts
```

Example:

```typescript
COLORS.primary
COLORS.secondary
COLORS.success
COLORS.warning
COLORS.error
COLORS.text
COLORS.background
```

Use the existing theme whenever possible.

---

# 12. 🌓 Light & Dark Mode

All new components must support:

* Light mode
* Dark mode

Do not create components that only look correct in light mode.

Use MUI theme values:

```tsx
sx={{
  color: "text.primary",
  backgroundColor: "background.paper",
}}
```

instead of hardcoded colors.

Do not use:

```tsx
backgroundColor: "#ffffff"
```

unless there is a documented design requirement.

---

# 13. 🪟 Glassmorphism Design

Cards, dialogs, sidebars, panels, and appropriate dashboard surfaces should follow the application's glassmorphism design system.

Follow:

```text
COLOR_SYSTEM.md
```

Use:

* Backdrop blur
* Transparent/semi-transparent surfaces
* Subtle borders
* Theme-aware shadows
* Appropriate opacity

Do not create a completely different visual style for an individual page.

---

# 14. 🔤 Typography & Font Size Rules

Typography must be centralized.

Do not randomly define font sizes throughout pages.

Avoid:

```tsx
fontSize: "13px"
```

```tsx
fontSize: "14px"
```

```tsx
fontSize: "15px"
```

```tsx
fontSize: "17px"
```

unless the size is intentionally defined by the design system.

Use the MUI typography system:

```tsx
variant="h1"
variant="h2"
variant="h3"
variant="h4"
variant="h5"
variant="h6"
variant="subtitle1"
variant="subtitle2"
variant="body1"
variant="body2"
variant="caption"
```

For custom application typography, define reusable typography tokens in the theme.

Example:

```typescript
typography: {
  fontFamily: FONT_FAMILY,
  h1: {...},
  h2: {...},
  h3: {...},
  h4: {...},
  h5: {...},
  h6: {...},
  body1: {...},
  body2: {...},
  caption: {...},
}
```

### Font-size principle

Use the smallest number of typography sizes necessary.

Do not introduce a new font size simply because a single screen needs it.

If a size is required by multiple components, add it to the design system/theme and reuse it.

---

# 15. 🔤 Font Family

Font family must be defined centrally.

Example:

```text
src/theme/typography.ts
```

or:

```text
src/theme/themeConfig.ts
```

Do not write different font families inside individual components.

Bad:

```tsx
fontFamily: "Poppins"
```

inside one page and:

```tsx
fontFamily: "Roboto"
```

inside another.

Use the project's centralized typography configuration.

---

# 16. 📏 Spacing System

Do not randomly use different spacing values throughout the application.

Prefer MUI's spacing system:

```tsx
sx={{
  p: 2,
  mt: 2,
  mb: 3,
  gap: 2,
}}
```

instead of repeatedly creating arbitrary values:

```tsx
padding: "13px"
marginTop: "19px"
gap: "11px"
```

If a custom spacing value is genuinely required throughout the application, add it to the design system.

---

# 17. 📱 Responsive Design

Every new screen must support:

* Desktop
* Tablet
* Mobile

Use MUI responsive utilities and breakpoints.

Example:

```tsx
sx={{
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "1fr",
    md: "repeat(2, 1fr)",
    lg: "repeat(3, 1fr)",
  },
}}
```

Do not design only for a desktop 1920px screen.

---

# 18. 🧭 Routing

All routes must be managed through:

```text
src/routes/AppRoutes.tsx
```

Use React Router v7 conventions already established in the project.

Do not create independent routing systems inside pages.

Protected routes must respect user roles.

Example concept:

```text
/admin/*
/teacher/*
/student/*
/parent/*
```

Access control must be centralized where possible.

---

# 19. 🔐 Permission-Based UI

Do not duplicate permission checks throughout the application.

Create reusable permission utilities/hooks where appropriate.

Example:

```typescript
hasPermission("student.create")
```

or:

```typescript
hasRole("admin")
```

The exact implementation must follow the existing project architecture.

UI permissions do not replace backend authorization.

---

# 20. 🌐 API & Data Fetching

All API communication must use:

```text
src/services/api/apiService.ts
```

Do not create independent Axios instances unless there is a documented requirement.

Use TanStack React Query for server state.

Recommended structure:

```text
src/
├── services/
│   ├── api/
│   │   └── apiService.ts
│   └── ...
├── hooks/
│   ├── useStudents.ts
│   ├── useTeachers.ts
│   └── ...
```

Reusable API logic should be placed in custom hooks/services rather than duplicated inside pages.

---

# 21. 🔄 API Query & Mutation Rules

For server data:

Use:

```typescript
useQuery()
```

For create/update/delete operations:

Use:

```typescript
useMutation()
```

Avoid manually implementing loading/error/cache logic repeatedly.

Use React Query's caching and invalidation mechanisms.

---

# 22. 🧠 State Management

Use Zustand for client-side/global UI state.

Existing stores include:

```text
src/store/themeStore.ts
src/store/menuStore.ts
```

Do not create multiple stores for the same state.

Before creating a new Zustand store:

1. Check existing stores
2. Determine whether the state belongs to an existing store
3. Extend the existing store if appropriate
4. Create a new store only when the state represents a distinct responsibility

---

# 23. 🎬 Animations

Use:

```text
src/utils/animationVariants.ts
```

and:

```text
Framer Motion 12
```

Reuse existing animation variants.

Do not create slightly different animations for every page.

Animations should be:

* Smooth
* Purposeful
* Consistent
* Responsive
* Accessible

Avoid excessive animation that affects usability.

---

# 24. 🧱 Page Structure

Pages should focus on composition and business flow.

Avoid placing large amounts of reusable UI logic directly inside pages.

Preferred:

```text
pages/
└── students/
    ├── StudentList.tsx
    ├── StudentForm.tsx
    └── StudentDetails.tsx
```

Reusable components:

```text
components/
├── common/
├── students/
├── teachers/
└── reports/
```

If a component is used only by one feature, keep it close to that feature.

If it is used by multiple features, consider moving it into:

```text
components/common/
```

---

# 25. 📂 Component Placement Rule

Use this decision:

```text
Used by one page?
        ↓
Keep near that feature/page.

Used by multiple pages?
        ↓
Feature-level reusable component.

Used by multiple modules?
        ↓
components/common/
```

Do not put everything into `common/`.

The common folder should contain genuinely generic components.

---

# 26. 🧹 Before Creating New Code

AI agents must perform this checklist:

```text
1. Search existing components
2. Search existing hooks
3. Search existing utilities
4. Search existing constants
5. Search existing theme tokens
6. Search existing API services
7. Search existing animations
8. Search existing types
9. Reuse if possible
10. Extend if necessary
11. Create new code only when justified
```

---

# 27. 🔍 Search Before Duplicate Implementation

Before creating:

```text
Button
Dialog
Modal
Table
Form
Search
Filter
DatePicker
Autocomplete
Card
Badge
Loader
EmptyState
ErrorState
Pagination
Export
Confirmation
```

search the repository first.

The AI agent must not assume that a component does not exist.

---

# 28. 🛠️ Extending Existing Components

If an existing common component is missing a feature:

### Preferred

```text
Existing Common Component
        ↓
Add reusable feature
        ↓
All existing pages benefit
```

### Avoid

```text
Existing Common Component
        +
New Duplicate Component
```

Example:

If `DataTable.tsx` does not support a required filter:

❌ Do not create:

```text
AdvancedDataTable.tsx
```

just for one page.

Instead, determine whether the filtering functionality belongs in the reusable `DataTable`.

---

# 29. 🧾 Forms & Validation

Forms must use the project's existing form architecture.

Validation should be reusable.

Do not duplicate validation rules.

For example, if student admission number validation is used in multiple places, create a shared validation rule instead of copying the same logic.

---

# 30. ⚠️ Loading, Error & Empty States

Every API-driven screen should properly handle:

```text
Loading
Success
Empty
Error
```

Use common components.

Do not create custom loading spinners on every page.

Prefer:

```text
CommonLoader
CommonEmptyState
CommonErrorState
```

where available.

---

# 31. 🗑️ Delete / Cancel Operations

Destructive operations must use a reusable confirmation dialog.

Examples:

```text
Delete Student
Cancel Fee Receipt
Remove Subject
Delete User
Transfer Student
```

Do not immediately execute destructive actions without confirmation unless the action is explicitly designed to be reversible.

---

# 32. 📤 Export & Reports

Reports should reuse the common:

```text
DataTable
Export
Filter
Pagination
Print
```

components/utilities.

Do not implement different export buttons with different visual styles.

---

# 33. 🧪 TypeScript Rules

Use strict TypeScript patterns.

Avoid:

```typescript
any
```

unless there is a justified technical reason.

Prefer:

```typescript
interface
type
generic types
unknown
```

with proper type narrowing.

Do not disable TypeScript errors simply to make the build pass.

---

# 34. 🧩 Types

Shared types should be maintained in:

```text
src/types/
```

If the same interface is used in multiple modules, move it to the shared types location.

Avoid duplicating:

```typescript
interface Student
```

in multiple files.

---

# 35. 📝 Naming Conventions

Use descriptive names.

Components:

```text
StudentList
StudentForm
StudentDetails
FeeCollection
ExamMaster
AttendanceEntry
```

Hooks:

```text
useStudents
useStudentDetails
useAttendance
useFeeCollection
```

Stores:

```text
themeStore
menuStore
authStore
```

Avoid meaningless names:

```text
Data1
Component2
TestPage
TempComponent
NewComponent
```

Do not leave temporary names in production code.

---

# 36. 🧼 Code Quality

AI agents must not:

* Leave unused imports
* Leave unused variables
* Leave commented-out old implementations
* Duplicate functions
* Duplicate components
* Add unnecessary dependencies
* Add unnecessary files
* Create dead code
* Ignore TypeScript errors
* Ignore ESLint errors
* Introduce console debugging into production code

---

# 37. 📦 Dependency Rules

Before installing a new package:

1. Check whether the functionality already exists in the project
2. Check whether an existing dependency can solve the problem
3. Prefer existing project libraries
4. Add a new dependency only when there is a meaningful benefit

Do not install multiple libraries that solve the same problem.

For example, do not introduce another table library when `DataTable.tsx` already uses the project's chosen table solution.

---

# 38. 🎨 UI Consistency Rule

Every new screen must visually belong to the existing application.

Maintain consistency for:

* Colors
* Typography
* Font sizes
* Buttons
* Inputs
* Tables
* Cards
* Dialogs
* Borders
* Radius
* Shadows
* Spacing
* Icons
* Animations
* Dark mode
* Mobile layout

Do not create a new visual language for an individual page.

---

# 39. 🖼️ Icons

Use the project's existing icon library/configuration.

Do not introduce another icon library for a single icon.

Icons should have consistent:

* Size
* Alignment
* Stroke/weight
* Color
* Spacing

---

# 40. ♿ Accessibility

All new UI should consider accessibility.

Use:

* Semantic HTML
* Proper labels
* Keyboard navigation
* Accessible dialogs
* Accessible buttons
* Appropriate ARIA attributes when necessary
* Sufficient contrast
* Visible focus states

Do not rely only on color to communicate status.

---

# 41. ⚡ Performance

Avoid unnecessary:

* Re-renders
* API calls
* State updates
* Large component trees
* Duplicate network requests
* Heavy dependencies

Use React Query caching where appropriate.

Use memoization only when it provides a real benefit.

Do not add `useMemo` or `useCallback` everywhere without a reason.

---

# 42. 🔄 Refactoring Rule

When modifying existing code:

> Improve the code without unnecessarily changing unrelated behavior.

Do not rewrite entire modules when the requested change only affects one component.

Avoid unrelated refactoring during feature development unless required to maintain architecture.

---

# 43. 🧠 AI Agent Decision Rule

Before writing code, the AI agent should think in this order:

```text
Requirement
    ↓
Existing component?
    ↓
Existing hook?
    ↓
Existing utility?
    ↓
Existing constant?
    ↓
Existing theme token?
    ↓
Existing API service?
    ↓
Existing type?
    ↓
Can existing code be extended?
    ↓
Create new code only if necessary
```

---

# 44. 🚫 Do Not Duplicate

The following should NOT be duplicated unnecessarily:

```text
Colors
Font family
Font sizes
Typography
Spacing
Buttons
Inputs
Tables
Dialogs
Modals
Loaders
Empty states
Error states
Search fields
Filters
Pagination
Export buttons
API clients
Validation
Types
Constants
Animations
Permission logic
Status styles
```

Centralize reusable functionality.

---

# 45. 📚 Documentation

When introducing a reusable component or architectural pattern, document:

* Purpose
* Props
* Usage
* Expected behavior
* Important limitations

Do not create documentation for trivial implementation details.

---

# 46. 🔒 Security

Never expose:

* Passwords
* API secrets
* Tokens
* Private keys
* Database credentials
* Environment secrets

Do not commit:

```text
.env
.env.local
credentials
API keys
private certificates
```

Use environment variables.

---

# 47. 🌎 Environment Configuration

Environment-specific configuration must not be hardcoded.

Use environment variables for:

```text
API URL
Environment
Feature flags
External service configuration
```

Example:

```typescript
import.meta.env.VITE_API_URL
```

Use the project's existing environment configuration strategy.

---

# 48. 🧪 Build Verification

After making changes, AI agents should verify:

```text
1. TypeScript compilation
2. ESLint
3. Build
4. Route availability
5. Console errors
6. Responsive behavior
7. Light mode
8. Dark mode
```

Do not claim a feature is complete without checking for obvious compilation/type errors.

---

# 49. 🧹 Final Cleanup Before Completion

Before completing any task, check:

```text
[ ] No duplicate components
[ ] No duplicate styles
[ ] No duplicate constants
[ ] No duplicate types
[ ] No duplicate API logic
[ ] No hardcoded design colors
[ ] No unnecessary font sizes
[ ] Existing common components reused
[ ] Existing theme reused
[ ] Existing animations reused
[ ] Responsive design supported
[ ] Light mode supported
[ ] Dark mode supported
[ ] Loading state handled
[ ] Empty state handled
[ ] Error state handled
[ ] TypeScript errors resolved
[ ] Unused imports removed
[ ] Console debugging removed
```

---

# 50. ⭐ Golden Rule for AI Agents

The most important rule of this project is:

> **Reuse before creating. Extend before duplicating. Centralize before repeating.**

Before creating any new component, style, font size, color, API function, validation rule, utility, constant, animation, or type:

```text
SEARCH → REUSE → EXTEND → CREATE
```

The AI agent must prefer the existing project architecture over introducing new patterns.

The goal is to keep the School Management System:

* Consistent
* Reusable
* Maintainable
* Type-safe
* Responsive
* Accessible
* Performant
* Scalable
* Easy for developers to understand

---

# 51. 🤖 AI Agent Implementation Checklist

For every feature request, AI agents should follow:

### Step 1 — Understand

Understand:

```text
User role
Feature
Business requirement
Existing architecture
Existing UI
Existing API
```

### Step 2 — Search

Search:

```text
components
common components
hooks
services
stores
constants
types
theme
animations
routes
```

### Step 3 — Reuse

Reuse existing implementation whenever possible.

### Step 4 — Extend

If existing functionality is close but incomplete, extend it.

### Step 5 — Implement

Create new files/components only when required.

### Step 6 — Verify

Check:

```text
TypeScript
ESLint
Build
Responsive UI
Light mode
Dark mode
Permissions
Loading
Error
Empty state
```

### Step 7 — Cleanup

Remove:

```text
unused code
duplicate code
temporary code
debug logs
unnecessary dependencies
```

---

# 52. 🏁 Final Development Principle

This project should evolve as a **design system**, not as a collection of independent pages.

Every new feature should strengthen the existing architecture.

```text
                 SCHOOL MANAGEMENT SYSTEM
                           │
                           ▼
                    DESIGN SYSTEM
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
    Components          Theme             Utilities
        │                  │                  │
        ▼                  ▼                  ▼
   Reuse / Extend    Colors / Fonts     Shared Logic
        │                  │                  │
        └──────────────────┼──────────────────┘
                           ▼
                     Feature Pages
                           │
                           ▼
                    Consistent HMS UI
```

### Core principle

> **Do not build every page independently. Build reusable building blocks and compose pages from them.**

When an existing component can satisfy a requirement, **reuse it**.

When several components contain the same logic, **extract the shared logic**.

When several pages require the same styling, **move the styling into the theme or common component**.

When the same font size or design value appears repeatedly, **centralize it as a design token**.

When a new requirement can be handled by improving an existing common component, **extend the common component instead of creating a duplicate**.
