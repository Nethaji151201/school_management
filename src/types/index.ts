/**
 * Menu Item Type Definition
 */
export interface MenuItem {
  id?: string;
  title: string;
  path?: string;
  icon?: string;
  children?: MenuItem[];
  badge?: number;
  isFavorite?: boolean;
  isRecent?: boolean;
  permissions?: string[];
  description?: string;
}

/**
 * Menu Group Type Definition
 */
export interface MenuGroup extends MenuItem {
  children: MenuItem[];
}

/**
 * User Type Definition
 */
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "teacher" | "student" | "parent";
  permissions: string[];
  academicYear: string;
}

/**
 * Dashboard Widget Type
 */
export interface DashboardWidget {
  id: string;
  title: string;
  value: number | string;
  change: number;
  unit?: string;
  icon: string;
  color: string;
  trend: "up" | "down" | "neutral";
}

/**
 * Notification Type
 */
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: Date;
  isRead: boolean;
  actionUrl?: string;
}

/**
 * Academic Year Type
 */
export interface AcademicYear {
  id: string;
  year: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

/**
 * API Response Type
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  status: number;
}

/**
 * Pagination Type
 */
export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
}

/**
 * Error Response Type
 */
export interface ErrorResponse {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export interface schoolDetails {
  schoolName: string;
  schoolAddress: string;
  schoolPhone: string;
  schoolEmail: string;
  schoolLogo?: string;
}
