# School Management System - Premium Dashboard

A world-class premium school management system built with React, TypeScript, Material UI, Framer Motion, and modern design patterns inspired by Stripe, Notion, Linear, and Vercel.

## 🎨 Centralized Color Configuration

The entire application uses a centralized color system that can be changed in one place and reflected throughout the project.

### Color Palette

All colors are defined in `src/theme/colors.ts`:

```typescript
export const COLORS = {
  // Primary Brand Colors
  primary: "#2563EB", // Blue
  secondary: "#7C3AED", // Purple
  success: "#22C55E", // Green
  warning: "#F59E0B", // Amber
  danger: "#EF4444", // Red
  info: "#0EA5E9", // Sky Blue

  // And more...
};
```

### Changing Colors

To change any color throughout the entire application:

1. Open `src/theme/colors.ts`
2. Modify the color value in the `COLORS` object
3. The change will be reflected immediately across:
   - All components
   - Dark and light themes
   - Gradients
   - Semantic colors
   - Glassmorphism effects

**Example:** To change primary color from blue to green:

```typescript
primary: "#16A34A",  // Green instead of blue
```

### Light vs Dark Mode

Colors automatically adapt based on the current theme:

- Light Mode: Uses lighter backgrounds with clear text
- Dark Mode: Uses dark backgrounds with light text

The theme system handles all color variations automatically.

## ✨ Features Implemented

- ✅ **Premium Glassmorphism Sidebar**
  - Blur and transparency effects
  - Modern gradient background
  - Smooth animations

- ✅ **Animated Collapsible Navigation**
  - Multi-level menu support
  - Expand/collapse with smooth transitions
  - Active state indicators

- ✅ **Floating Active Indicator**
  - Gradient accent on active menu items
  - Smooth transitions

- ✅ **Dark & Light Themes**
  - Toggle in header
  - Persistent storage
  - Automatic color adaptation

- ✅ **Search Menu Functionality**
  - Real-time filtering
  - Deep nested search

- ✅ **Favorite & Recent Menus**
  - Pin favorite items
  - Track recently accessed items
  - Quick access section

- ✅ **Framer Motion Animations**
  - Page transitions
  - Component entrance animations
  - Micro-interactions

- ✅ **Dashboard with KPI Cards**
  - Animated cards
  - Real-time metrics
  - Charts integration (Recharts)

- ✅ **Material UI Components**
  - Custom theme overrides
  - Consistent styling
  - Type-safe usage

- ✅ **Notification Center**
  - Notification badges
  - Status indicators
  - Dismissable notifications

- ✅ **Academic Year Switcher**
  - Quick switch between years
  - Active state indicator

## 📁 Folder Structure

```
src/
├── assets/              # Static images and files
├── components/          # React components
│   ├── common/          # Reusable components (Button, Card, etc)
│   ├── sidebar/         # Sidebar components
│   └── header/          # Header component
├── constants/           # Constants and configurations
│   └── menuConfig.ts    # Menu configuration
├── hooks/               # Custom React hooks
├── layouts/             # Layout components
│   └── MainLayout.tsx   # Main app layout
├── pages/               # Page components
│   └── dashboard/       # Dashboard pages
├── routes/              # Routing configuration
├── services/            # API and external services
│   ├── api/             # API service
│   └── queryClient.ts   # React Query client
├── store/               # State management (Zustand)
│   ├── themeStore.ts    # Theme state
│   └── menuStore.ts     # Menu state
├── theme/               # Theme configuration
│   ├── colors.ts        # Color palette (MAIN FILE TO EDIT)
│   └── themeConfig.ts   # Material UI theme
├── types/               # TypeScript types
└── utils/               # Utility functions
    ├── animationVariants.ts   # Framer Motion variants
    └── helpers.ts             # Common helpers
```

## 🎯 Key Components

### Theme System

The theme system is built on two main files:

1. **`src/theme/colors.ts`** - Color definitions
   - Define all colors here
   - Used throughout the app
   - Supports light/dark modes

2. **`src/theme/themeConfig.ts`** - Material UI theme
   - Uses colors from `colors.ts`
   - Creates Material UI themes
   - Handles component overrides

### Sidebar Component

Located at `src/components/sidebar/Sidebar.tsx`:

- Glassmorphic design
- Search functionality
- Favorites system
- Recent items tracking
- Multi-level menu support

### Header Component

Located at `src/components/header/Header.tsx`:

- Theme toggle (Dark/Light)
- Notifications
- Academic year switcher
- Search bar
- User profile menu

### Dashboard

Located at `src/pages/dashboard/Dashboard.tsx`:

- KPI cards with metrics
- Attendance chart (Line chart)
- Fees collection (Pie chart)
- Recent admissions table
- Animated transitions

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

## 🎨 Customization Guide

### Changing Primary Color

Edit `src/theme/colors.ts`:

```typescript
export const COLORS = {
  primary: "#FF6B6B", // Changed from #2563EB
  // ... rest of colors
};
```

### Changing All Colors

```typescript
export const COLORS = {
  primary: "#FF6B6B",
  secondary: "#4ECDC4",
  success: "#95E1D3",
  warning: "#FFA502",
  danger: "#FF6B5B",
  info: "#5DADE2",
  // ... rest
};
```

### Custom Theme Variants

Add to `src/theme/themeConfig.ts` for component-specific overrides.

## 📦 Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Material UI** - Component library
- **Framer Motion** - Animation library
- **Zustand** - State management
- **React Router** - Routing
- **React Query** - API queries
- **Recharts** - Charts
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **Zod** - Schema validation

## 🔐 State Management

### Theme Store

```typescript
import { useThemeStore } from "@/store/themeStore";

const { mode, toggleTheme } = useThemeStore();
```

### Menu Store

```typescript
import { useMenuStore, useSidebarStore } from "@/store/menuStore";

const { expandedMenus, favoriteMenus } = useMenuStore();
const { isCollapsed } = useSidebarStore();
```

## 📱 Responsive Design

The application is fully responsive:

- Desktop: Full sidebar and header
- Tablet: Collapsible sidebar
- Mobile: Drawer-based navigation

## 🎭 Animation Patterns

Common animation variants available in `src/utils/animationVariants.ts`:

- `fadeInUp` - Fade in with slide up
- `fadeIn` - Simple fade
- `slideInLeft` / `slideInRight` - Slide animations
- `scaleIn` - Scale animation
- `containerVariants` - Staggered container
- `itemVariants` - Individual item animations

## 🔗 API Integration

The API service is ready for backend integration:

```typescript
import { apiService } from "@/services/api/apiService";

// Get request
const data = await apiService.get<Student>("/students");

// Post request
const newStudent = await apiService.post<Student>("/students", studentData);

// Update
await apiService.put<Student>("/students/1", updatedData);

// Delete
await apiService.delete("/students/1");
```

## 📝 Type Definitions

All types are defined in `src/types/index.ts`:

- `MenuItem` - Menu item structure
- `User` - User information
- `DashboardWidget` - Widget data
- `Notification` - Notification structure
- `ApiResponse` - API response structure
- And more...

## 🛠️ Available Scripts

```bash
# Development
npm run dev

# Build
npm run build

# Lint
npm run lint

# Preview
npm run preview
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Support

For more information or support, please contact the development team.

---

**Remember:** All colors can be changed in one place (`src/theme/colors.ts`) and will automatically reflect throughout the entire application! 🎨
