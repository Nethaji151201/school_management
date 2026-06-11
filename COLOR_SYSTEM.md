# 🎨 Centralized Color System - Quick Reference

## One Place to Change All Colors

The entire School Management System now uses a **centralized color configuration** that can be changed in ONE PLACE and will reflect throughout the entire application.

### 📍 Location

**File:** `src/theme/colors.ts`

### ⚡ How to Use

#### Step 1: Open the file

```
src/theme/colors.ts
```

#### Step 2: Change the colors in the COLORS object

```typescript
export const COLORS = {
  primary: "#2563EB", // ← Change this
  secondary: "#7C3AED", // ← And this
  success: "#22C55E", // ← And this
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#0EA5E9",
  // ... rest of colors
};
```

#### Step 3: Done! 🎉

All components will automatically update.

---

## 📋 Color Reference

### Primary Colors

- **primary**: Main brand color (buttons, links, highlights)
- **secondary**: Secondary accent (sidebars, secondary buttons)
- **success**: Success messages, positive indicators
- **warning**: Warnings, caution indicators
- **danger**: Errors, deletion, danger indicators
- **info**: Information messages

### Light Mode Colors (when theme is light)

```
COLORS.light = {
  bg: "#F8FAFC",                    // Background
  bgSecondary: "#F1F5F9",           // Secondary background
  text: "#1E293B",                  // Main text
  textSecondary: "#64748B",         // Secondary text
  textTertiary: "#94A3B8",          // Tertiary text
  border: "#E2E8F0",                // Borders
}
```

### Dark Mode Colors (when theme is dark)

```
COLORS.dark = {
  bg: "#0F172A",                    // Background
  bgSecondary: "#1E293B",           // Secondary background
  text: "#F1F5F9",                  // Main text
  textSecondary: "#CBD5E1",         // Secondary text
  textTertiary: "#94A3B8",          // Tertiary text
  border: "#334155",                // Borders
}
```

### Glassmorphism Effects

- `COLORS.glass.light` - Light glass effect
- `COLORS.glass.dark` - Dark glass effect
- `COLORS.glass.lightBorder` - Light glass border
- `COLORS.glass.darkBorder` - Dark glass border

### Gradients

```typescript
COLORS.gradient.primary; // Blue to Purple gradient
COLORS.gradient.secondary; // Purple to Sky Blue
COLORS.gradient.success; // Green to Emerald
COLORS.gradient.warning; // Amber to Orange
```

---

## 🎯 Where Colors Are Used

### Sidebar

- Menu items background and text
- Active indicator color
- Hover effects

### Header

- Dark/light mode toggle
- Notifications badge
- Academic year chip
- Search bar

### Dashboard

- KPI card icons
- Progress bars
- Chart colors
- Status indicators

### All Components

- Buttons
- Cards
- Modals
- Forms
- Tables
- Chips
- Dividers

---

## 💡 Example: Change All Colors to Green Theme

```typescript
export const COLORS = {
  primary: "#10B981", // Emerald
  secondary: "#14B8A6", // Teal
  success: "#06B6D4", // Cyan
  warning: "#F59E0B", // Amber (keep)
  danger: "#EF4444", // Red (keep)
  info: "#06B6D4", // Cyan

  white: "#FFFFFF",
  black: "#000000",

  light: {
    bg: "#F0FDFA", // Very light teal
    bgSecondary: "#CCFBF1", // Light teal
    text: "#134E4A", // Dark teal
    textSecondary: "#0D9488", // Medium teal
    textTertiary: "#14B8A6", // Teal
    border: "#99F6E4", // Very light teal
  },

  // ... rest stays the same
};
```

**Result:** Entire app turns green! 🟢

---

## 🌓 Dark Mode

The theme automatically switches between light and dark mode based on:

- User preference (toggled in header)
- System preference (if available)
- Persisted in browser localStorage

**No need to change colors** - they're automatically adjusted for the mode.

---

## 🔐 Component Examples Using Colors

### Using in a Component

```typescript
import { COLORS } from '@/theme/colors';
import { useThemeStore } from '@/store/themeStore';

export const MyComponent = () => {
  const { mode } = useThemeStore();
  const isDark = mode === "dark";
  const colors = isDark ? COLORS.dark : COLORS.light;

  return (
    <Box sx={{
      backgroundColor: colors.bg,
      color: colors.text,
      borderColor: colors.border,
    }}>
      {/* Your component */}
    </Box>
  );
};
```

### Using Gradients

```typescript
<Box sx={{
  backgroundImage: COLORS.gradient.primary,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}}>
  Gradient Text
</Box>
```

### Using Glassmorphism

```typescript
<Card sx={{
  backgroundImage: isDark
    ? `linear-gradient(135deg, ${COLORS.glass.dark} 0%, ${COLORS.glass.dark} 100%)`
    : `linear-gradient(135deg, ${COLORS.glass.light} 0%, ${COLORS.glass.light} 100%)`,
  backdropFilter: "blur(10px)",
  border: `1px solid ${isDark ? COLORS.glass.darkBorder : COLORS.glass.lightBorder}`,
}} />
```

---

## ✨ Benefits

✅ **Single Source of Truth** - All colors defined in one place
✅ **Instant Updates** - Change one color, updates everywhere
✅ **Theme Support** - Automatic light/dark mode adaptation
✅ **Glassmorphism** - Ready-made glass effects
✅ **Gradients** - Pre-built gradient combinations
✅ **Type Safe** - Full TypeScript support
✅ **Semantic** - Meaningful color names
✅ **Accessible** - Good contrast ratios

---

## 🎓 Best Practices

1. **Always use COLORS instead of hardcoding**

   ```typescript
   // ❌ Don't do this
   backgroundColor: "#2563EB";

   // ✅ Do this
   backgroundColor: COLORS.primary;
   ```

2. **Use the correct color for the mode**

   ```typescript
   // Get colors based on current mode
   const colors = isDark ? COLORS.dark : COLORS.light;
   ```

3. **Use semantic colors**

   ```typescript
   // ❌ Not semantic
   color: COLORS.primary;

   // ✅ Semantic
   color: colors.textSecondary;
   ```

4. **Respect dark mode**
   ```typescript
   // Always check mode and use appropriate colors
   const { mode } = useThemeStore();
   const isDark = mode === "dark";
   ```

---

## 📝 Pre-built Color Schemes

Ready-to-use color combinations:

### Modern Blue (Current)

```
Primary: #2563EB | Secondary: #7C3AED | Success: #22C55E
```

### Vibrant Purple

```
Primary: #A855F7 | Secondary: #9F7AEA | Success: #10B981
```

### Professional Teal

```
Primary: #0D9488 | Secondary: #06B6D4 | Success: #14B8A6
```

### Sunset Orange

```
Primary: #EA580C | Secondary: #F97316 | Success: #4ADE80
```

Just replace the values in `COLORS` object and enjoy the new theme!

---

## 🚀 Next Step

Start using colors from `src/theme/colors.ts` in all your components. The system is ready!

---

**File to modify:** `src/theme/colors.ts`
**No other files need changes to update colors** 🎨
