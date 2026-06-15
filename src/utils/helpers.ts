/**
 * Common Utility Functions
 */

/**
 * Format date to readable format
 */
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
};

/**
 * Format currency
 */
export const formatCurrency = (
  amount: number,
  currency: string = "INR",
): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
  }).format(amount);
};

/**
 * Format percentage
 */
export const formatPercentage = (
  value: number,
  decimals: number = 2,
): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Truncate text
 */
export const truncateText = (text: string, length: number = 50): string => {
  return text.length > length ? `${text.substring(0, length)}...` : text;
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Format number with commas
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString("en-IN");
};

/**
 * Calculate percentage change
 */
export const calculatePercentageChange = (
  currentValue: number,
  previousValue: number,
): number => {
  if (previousValue === 0) return 0;
  return ((currentValue - previousValue) / previousValue) * 100;
};

/**
 * Get initials from name
 */
export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Generate random color
 */
export const getRandomColor = (): string => {
  const colors = [
    "#2563EB",
    "#7C3AED",
    "#22C55E",
    "#F59E0B",
    "#EF4444",
    "#0EA5E9",
    "#EC4899",
    "#14B8A6",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Check if object is empty
 */
export const isEmpty = (obj: any): boolean => {
  return Object.keys(obj || {}).length === 0;
};

/**
 * Validate email
 */
export const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Get color based on status
 */
export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "active":
    case "success":
      return "#22C55E";
    case "pending":
    case "warning":
      return "#F59E0B";
    case "inactive":
    case "error":
    case "danger":
      return "#EF4444";
    case "info":
      return "#0EA5E9";
    default:
      return "#64748B";
  }
};
