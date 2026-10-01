import React, { useState, useMemo, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { useTheme } from "@mui/material";
import type {
  ColDef,
  GridApi,
  GridReadyEvent,
  IsRowSelectable,
  GetRowIdFunc,
} from "ag-grid-community";
import {
  ModuleRegistry,
  AllCommunityModule,
  themeAlpine,
} from "ag-grid-community";

import { useThemeStore } from "../../store/themeStore";

// Register all community modules globally in AG Grid
ModuleRegistry.registerModules([AllCommunityModule]);

// Interface Definitions (compatible with both ColDef and DataTableHeader)
export interface DataTableHeader<T = any> {
  label?: string;
  headerName?: string;
  headerRender?: (params?: any) => React.ReactNode;
  headerComponent?: any;
  key?: string;
  field?: string;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  flex?: number;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  resizable?: boolean;
  searchEnable?: boolean;
  filter?: boolean | string | any;
  render?: (row: T, params?: any) => React.ReactNode;
  cellRenderer?: any;
  cellClass?: any;
  headerClass?: string;
  pinned?: "left" | "right" | boolean | null;
  [key: string]: any;
}

export interface DataTablePaginationProps {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (limit: number) => void;
  rowsPerPageOptions?: number[];
}

export interface DataTableProps<T = any> {
  // Column definitions (supports both 'columns' and 'headers')
  columns?: DataTableHeader<T>[] | ColDef<T>[];
  headers?: DataTableHeader<T>[] | ColDef<T>[];

  // Data
  data?: T[];

  // Styling & Layout
  bordered?: boolean;
  zebra?: boolean;
  tableHeight?: string | number;
  scrollHeight?: string | number; // Backward compatibility
  minHeight?: string | number;
  rowHeight?: number | null;

  // Status & Messages
  isLoading?: boolean;
  emptyMessage?: string;

  // Interactions
  onRowClick?: (row: T, event?: any) => void;
  onRowDoubleClick?: (row: T, event?: any) => void;
  selectable?: boolean;
  onSelectionChange?: (selected: T[]) => void;
  isRowSelected?: (row: T) => boolean;
  isRowSelectable?: IsRowSelectable<T>;
  getRowId?: GetRowIdFunc<T> | null;

  // Features
  showSerialNo?: boolean;
  serialNumber?: boolean; // Backward compatibility
  applyColumnFilter?: boolean;
  enableColumnSearch?: boolean; // Backward compatibility
  showColumnSearchClear?: boolean;

  // Pagination
  pagination?: boolean | DataTablePaginationProps;
  enablePagination?: boolean; // Backward compatibility
  paginationPageSize?: number;
  rowsPerPageOptions?: Array<number | { label: string; value: number }>;

  // Infinite Scroll / Async (optional)
  enableInfiniteScroll?: boolean;
  apiFunction?: (
    page: number,
    limit: number,
  ) => Promise<{ data: T[]; total: number }>;
  onLoadMore?: () => void;
}

// Helper to generate visible page numbers with ellipsis
const getVisiblePages = (
  currentPage: number,
  totalPages: number,
): (number | "ellipsis")[] => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [1];

  if (currentPage > 3) {
    pages.push("ellipsis");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) {
    pages.push("ellipsis");
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
};

const DataTableAG = <T extends Record<string, any>>({
  columns,
  headers,
  data = [],
  bordered = true,
  zebra = true,
  isLoading = false,
  emptyMessage = "No records found",
  onRowClick,
  onRowDoubleClick,
  selectable = false,
  onSelectionChange,
  showSerialNo,
  serialNumber,
  applyColumnFilter,
  enableColumnSearch,
  tableHeight = "calc(100vh - 235px)",
  scrollHeight,
  minHeight = "250px",
  isRowSelected: _isRowSelected,
  isRowSelectable,
  rowHeight = null,
  getRowId = null,
  pagination = true,
  enablePagination,
  paginationPageSize = 25,
  rowsPerPageOptions = [10, 25, 50, 100],
}: DataTableProps<T>) => {
  const muiTheme = useTheme();
  const themeMode = muiTheme.palette.mode; // "light" or "dark"
  const isDark = themeMode === "dark";

  // Normalize props for backward compatibility
  const effectiveColumns = columns || headers || [];
  const effectiveShowSerial = showSerialNo !== undefined ? showSerialNo : (serialNumber !== undefined ? serialNumber : true);
  const effectiveColumnFilter = applyColumnFilter !== undefined ? applyColumnFilter : !!enableColumnSearch;
  const isPaginationEnabled = pagination === true || (pagination && typeof pagination === "object") || enablePagination === true;
  const externalPagination = typeof pagination === "object" ? pagination : undefined;
  const effectiveHeight = scrollHeight !== undefined ? scrollHeight : tableHeight;

  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(
    externalPagination?.limit || paginationPageSize || 25,
  );
  const [totalRows, setTotalRows] = useState<number>(
    externalPagination?.total !== undefined ? externalPagination.total : data.length,
  );
  const [totalPages, setTotalPages] = useState<number>(1);

  // Normalize page size options
  const normalizedPageSizeOptions = useMemo(() => {
    return rowsPerPageOptions.map((opt) =>
      typeof opt === "number" ? opt : opt.value,
    );
  }, [rowsPerPageOptions]);

  // Update client pagination state when data or external props change
  useEffect(() => {
    if (externalPagination) {
      setCurrentPage(externalPagination.page + 1);
      setPageSize(externalPagination.limit);
      setTotalRows(externalPagination.total);
      setTotalPages(
        Math.ceil(externalPagination.total / (externalPagination.limit || 1)) || 1,
      );
    } else {
      setTotalRows(data.length);
      setTotalPages(Math.ceil(data.length / pageSize) || 1);
    }
  }, [externalPagination, data.length, pageSize]);

  // Handle AG Grid pagination change
  const handlePaginationChanged = useCallback(() => {
    if (!gridApi || externalPagination) return;
    const curr = gridApi.paginationGetCurrentPage() + 1;
    const totalP = gridApi.paginationGetTotalPages() || 1;
    const rowCount = gridApi.paginationGetRowCount() || data.length;

    setCurrentPage(curr);
    setTotalPages(totalP);
    setTotalRows(rowCount);
  }, [gridApi, externalPagination, data.length]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    if (externalPagination) {
      externalPagination.onPageChange(newPage - 1);
    } else if (gridApi) {
      gridApi.paginationGoToPage(newPage - 1);
      setCurrentPage(newPage);
    }
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    if (externalPagination) {
      externalPagination.onRowsPerPageChange(newSize);
    } else if (gridApi) {
      (gridApi as any).setGridOption?.('paginationPageSize', newSize) ?? (gridApi as any).paginationSetPageSize?.(newSize);
      gridApi.paginationGoToPage(0);
      setCurrentPage(1);
    }
  };

  const { tableHeaderColor, primaryColor } = useThemeStore();
  const headerBgColor = tableHeaderColor || (isDark ? "#0B0F19" : "#0F172A");
  const headerTextColor = "#ffffff";
  const primaryBg = isDark ? "#0F172A" : "#ffffff";
  const primaryText = isDark ? "#F8FAFC" : "#0F172A";
  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "#E2E8F0";

  const gridTheme = useMemo(() => {
    return themeAlpine.withParams({
      accentColor: primaryColor || "#BE123C",
      backgroundColor: primaryBg,
      headerBackgroundColor: headerBgColor,
      headerTextColor: headerTextColor,
      foregroundColor: primaryText,
      borderColor: borderColor,
      selectedRowBackgroundColor: isDark
        ? "rgba(190, 18, 60, 0.25)"
        : "rgba(190, 18, 60, 0.08)",
      rowHoverColor: isDark
        ? "rgba(190, 18, 60, 0.15)"
        : "rgba(190, 18, 60, 0.04)",
      fontFamily:
        "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      fontSize: "13px",
      spacing: 6,
    });
  }, [isDark, primaryBg, headerBgColor, headerTextColor, primaryText, borderColor, primaryColor]);

  // Default ColDef to ensure consistency across columns
  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      resizable: true,
      suppressMovable: false,
      minWidth: 100,
    }),
    [],
  );

  // Map Column definitions properly to avoid alignment mismatch
  const columnDefs = useMemo(() => {
    const mapped: ColDef[] = [];

    // Checkbox selection column if enabled
    if (selectable) {
      mapped.push({
        headerCheckboxSelection: true,
        checkboxSelection: true,
        width: 48,
        minWidth: 48,
        maxWidth: 55,
        pinned: "left",
        suppressMovable: true,
        resizable: false,
        sortable: false,
        filter: false,
      });
    }

    // S.No Serial Number column if enabled
    if (effectiveShowSerial) {
      mapped.push({
        headerName: "S.No",
        valueGetter: (params) => {
          const rowIndex = params.node?.rowIndex;
          if (rowIndex === undefined || rowIndex === null) return "";
          if (isPaginationEnabled) {
            return (currentPage - 1) * pageSize + rowIndex + 1;
          }
          return rowIndex + 1;
        },
        width: 70,
        minWidth: 65,
        maxWidth: 85,
        pinned: "left",
        suppressMovable: true,
        resizable: false,
        sortable: false,
        filter: false,
        cellClass: "dt-cell-sno text-center",
        headerClass: "dt-header-sno text-center",
      });
    }

    // Find index of the last flexible (non-pinned) column
    const lastFlexibleIndex = (() => {
      for (let i = effectiveColumns.length - 1; i >= 0; i--) {
        const c = effectiveColumns[i] as any;
        if (c.pinned !== "right" && c.pinned !== "left") {
          return i;
        }
      }
      return effectiveColumns.length - 1;
    })();

    effectiveColumns.forEach((col: any, index: number) => {
      const field = col.field || col.key;
      const headerName = col.headerName || col.label || field;

      const agCol: ColDef = {
        field,
        headerName,
        resizable: col.resizable ?? true,
        sortable: col.sortable ?? true,
        filter:
          effectiveColumnFilter || col.searchEnable || col.filter
            ? typeof col.filter === "string"
              ? col.filter
              : "agTextColumnFilter"
            : false,
        suppressMovable: col.suppressMovable ?? false,
        ...col, // Preserve any additional standard AG Grid ColDef properties
      };

      // Handle widths consistently
      if (col.width) {
        agCol.width = col.width;
      }
      if (col.minWidth) {
        agCol.minWidth = col.minWidth;
      }
      if (col.maxWidth) {
        agCol.maxWidth = col.maxWidth;
      }
      if (col.flex !== undefined) {
        agCol.flex = col.flex;
      } else if (index === lastFlexibleIndex && agCol.pinned !== "right" && agCol.pinned !== "left") {
        // If last column has space available, take full remaining width
        agCol.flex = 1;
        if (col.width && !col.minWidth) {
          agCol.minWidth = col.width;
        }
      }

      if (col.align) {
        agCol.cellClass = `text-${col.align}`;
        agCol.headerClass = `text-${col.align}`;
      }

      if (col.headerComponent) {
        agCol.headerComponent = col.headerComponent;
      } else if (col.headerRender) {
        agCol.headerComponent = (params: any) => col.headerRender(params);
      }

      if (col.render) {
        agCol.cellRenderer = (params: any) => {
          if (!params.data) return null;
          return col.render(params.data, params);
        };
      }

      mapped.push(agCol);
    });

    return mapped;
  }, [
    effectiveColumns,
    selectable,
    effectiveShowSerial,
    effectiveColumnFilter,
    isPaginationEnabled,
    currentPage,
    pageSize,
  ]);

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  const handleSelectionChanged = (event: any) => {
    if (onSelectionChange) {
      const selectedRows = event.api.getSelectedRows();
      onSelectionChange(selectedRows);
    }
  };

  const formattedHeight = useMemo(() => {
    if (typeof effectiveHeight === "number") return `${effectiveHeight}px`;
    return effectiveHeight || "calc(100vh - 235px)";
  }, [effectiveHeight]);

  // Compute records count range
  const startRecord = totalRows === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, totalRows);
  const visiblePages = useMemo(
    () => getVisiblePages(currentPage, totalPages),
    [currentPage, totalPages],
  );

  return (
    <div
      className={`dt-custom-wrapper position-relative ${bordered ? "dt-bordered" : ""} ${zebra ? "dt-zebra" : ""}`}
    >
      <style>{`
        .dt-custom-wrapper {
          border: 1px solid ${isDark ? "#2d3748" : "#e2e8f0"};
          border-radius: 8px;
          background-color: ${isDark ? "#11141c" : "#ffffff"};
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        /* AG Grid Container */
        .ag-theme-alpine,
        .ag-theme-alpine-dark {
          --ag-font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
          --ag-font-size: 13px !important;
          --ag-header-background-color: ${headerBgColor} !important;
          --ag-header-foreground-color: ${headerTextColor} !important;
          --ag-border-color: ${isDark ? "#2d3748" : "#edf2f7"} !important;
          --ag-row-border-color: ${isDark ? "#2d3748" : "#f1f5f9"} !important;
          border: none !important;
          font-family: 'Roboto', sans-serif !important;
        }

        /* Suppress default permanent vertical separator lines in header */
        .ag-theme-alpine .ag-header-cell::after,
        .ag-theme-alpine-dark .ag-header-cell::after,
        .ag-theme-alpine .ag-header-separator,
        .ag-theme-alpine-dark .ag-header-separator,
        .ag-theme-alpine .ag-pinned-left-header .ag-header-cell::after,
        .ag-theme-alpine-dark .ag-pinned-left-header .ag-header-cell::after,
        .ag-theme-alpine .ag-pinned-right-header .ag-header-cell::after,
        .ag-theme-alpine-dark .ag-pinned-right-header .ag-header-cell::after {
          display: none !important;
          opacity: 0 !important;
          width: 0 !important;
          border: none !important;
          background: transparent !important;
        }

        /* Column Resizable Handle & Indicator */
        .ag-theme-alpine .ag-header-cell-resize,
        .ag-theme-alpine-dark .ag-header-cell-resize {
          cursor: col-resize !important;
          width: 10px !important;
          right: -5px !important;
          z-index: 5 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          position: absolute !important;
          top: 0 !important;
          bottom: 0 !important;
        }

        .ag-theme-alpine .ag-header-cell-resize::after,
        .ag-theme-alpine-dark .ag-header-cell-resize::after {
          content: "" !important;
          display: block !important;
          width: 2px !important;
          height: 14px !important;
          background-color: rgba(255, 255, 255, 0.45) !important;
          border-radius: 1px !important;
          opacity: 0.6 !important;
          transition: all 0.2s ease !important;
        }

        .ag-theme-alpine .ag-header-cell:hover .ag-header-cell-resize::after,
        .ag-theme-alpine-dark .ag-header-cell:hover .ag-header-cell-resize::after,
        .ag-theme-alpine .ag-header-cell-resize:hover::after,
        .ag-theme-alpine-dark .ag-header-cell-resize:hover::after {
          opacity: 1 !important;
          background-color: #ffffff !important;
          height: 20px !important;
          box-shadow: 0 0 4px rgba(255, 255, 255, 0.6) !important;
        }

        /* Header Styling - No vertical lines between standard columns */
        .ag-theme-alpine .ag-header,
        .ag-theme-alpine-dark .ag-header {
          background-color: ${headerBgColor} !important;
          border-bottom: none !important;
        }

        .ag-theme-alpine .ag-header-cell,
        .ag-theme-alpine-dark .ag-header-cell {
          background-color: ${headerBgColor} !important;
          border-right: none !important;
          border-left: none !important;
        }

        .ag-theme-alpine .ag-header-cell-label,
        .ag-theme-alpine-dark .ag-header-cell-label {
          color: #ffffff !important;
          font-weight: 500 !important;
          font-size: 13px !important;
          letter-spacing: 0.1px;
          font-family: 'Roboto', sans-serif !important;
        }

        .ag-theme-alpine .ag-header-icon,
        .ag-theme-alpine-dark .ag-header-icon,
        .ag-theme-alpine .ag-icon,
        .ag-theme-alpine-dark .ag-icon {
          color: #ffffff !important;
          fill: #ffffff !important;
        }

        /* Cell Styling - No vertical lines on standard columns */
        .ag-theme-alpine .ag-cell,
        .ag-theme-alpine-dark .ag-cell {
          font-size: 13px !important;
          color: ${primaryText} !important;
          line-height: ${rowHeight ? `${rowHeight}px` : "42px"} !important;
          border-bottom: 1px solid ${isDark ? "#242d3d" : "#f1f5f9"} !important;
          border-right: none !important;
          border-left: none !important;
          font-family: 'Roboto', sans-serif !important;
        }

        /* ONLY Pinned Columns get a clean vertical border line (Matching reference) */
        /* Pinned Left Divider (e.g. S.No) */
        .ag-theme-alpine .ag-pinned-left-header,
        .ag-theme-alpine-dark .ag-pinned-left-header {
          border-right: 1px solid rgba(255, 255, 255, 0.25) !important;
        }

        .ag-theme-alpine .ag-pinned-left-cols-viewport,
        .ag-theme-alpine-dark .ag-pinned-left-cols-viewport,
        .ag-theme-alpine .ag-pinned-left-cols-container,
        .ag-theme-alpine-dark .ag-pinned-left-cols-container {
          border-right: 1px solid ${isDark ? "#334155" : "#e2e8f0"} !important;
        }

        .ag-theme-alpine .ag-cell-last-left-pinned,
        .ag-theme-alpine-dark .ag-cell-last-left-pinned,
        .ag-theme-alpine .ag-pinned-left-cols-container .ag-cell,
        .ag-theme-alpine-dark .ag-pinned-left-cols-container .ag-cell {
          border-right: 1px solid ${isDark ? "#334155" : "#e2e8f0"} !important;
        }

        /* Pinned Right Divider (e.g. Actions Column) */
        .ag-theme-alpine .ag-pinned-right-header,
        .ag-theme-alpine-dark .ag-pinned-right-header {
          border-left: 1px solid rgba(255, 255, 255, 0.25) !important;
        }

        .ag-theme-alpine .ag-pinned-right-cols-viewport,
        .ag-theme-alpine-dark .ag-pinned-right-cols-viewport,
        .ag-theme-alpine .ag-pinned-right-cols-container,
        .ag-theme-alpine-dark .ag-pinned-right-cols-container {
          border-left: 1px solid ${isDark ? "#334155" : "#e2e8f0"} !important;
        }

        .ag-theme-alpine .ag-cell-first-right-pinned,
        .ag-theme-alpine-dark .ag-cell-first-right-pinned,
        .ag-theme-alpine .ag-pinned-right-cols-container .ag-cell,
        .ag-theme-alpine-dark .ag-pinned-right-cols-container .ag-cell {
          border-left: 1px solid ${isDark ? "#334155" : "#e2e8f0"} !important;
        }

        /* Zebra Striping */
        .dt-zebra .ag-theme-alpine .ag-row-odd {
          background-color: #f8fafc !important;
        }
        .dt-zebra .ag-theme-alpine .ag-row-even {
          background-color: #ffffff !important;
        }
        .dt-zebra .ag-theme-alpine-dark .ag-row-odd {
          background-color: #161c28 !important;
        }
        .dt-zebra .ag-theme-alpine-dark .ag-row-even {
          background-color: #11141c !important;
        }

        .ag-theme-alpine .ag-row,
        .ag-theme-alpine-dark .ag-row {
          cursor: pointer !important;
          transition: background-color 0.15s ease;
          font-family: 'Roboto', sans-serif !important;
        }

        .datatable-wrapper,
        .ag-theme-alpine,
        .ag-theme-alpine-dark,
        .ag-root-wrapper,
        .ag-header-cell,
        .ag-cell,
        .dt-footer-bar,
        .dt-page-btn,
        .dt-nav-btn,
        .dt-pagesize-select {
          font-family: 'Roboto', sans-serif !important;
        }

        .ag-theme-alpine .ag-row:hover,
        .ag-theme-alpine-dark .ag-row:hover {
          background-color: ${isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)"} !important;
        }

        .ag-theme-alpine .ag-row-selected,
        .ag-theme-alpine-dark .ag-row-selected {
          background-color: ${isDark ? `${primaryColor || "#BE123C"}30` : `${primaryColor || "#BE123C"}12`} !important;
        }

        /* S.No styling */
        .dt-cell-sno {
          text-align: center;
          font-weight: 500;
          color: ${isDark ? "#94a3b8" : "#64748b"} !important;
        }
        .dt-header-sno .ag-header-cell-label {
          justify-content: center;
        }

        /* Scrollbar Styling */
        .ag-theme-alpine ::-webkit-scrollbar,
        .ag-theme-alpine-dark ::-webkit-scrollbar {
          width: 7px;
          height: 7px;
        }
        .ag-theme-alpine ::-webkit-scrollbar-track,
        .ag-theme-alpine-dark ::-webkit-scrollbar-track {
          background: ${isDark ? "#1a2234" : "#f8fafc"};
        }
        .ag-theme-alpine ::-webkit-scrollbar-thumb,
        .ag-theme-alpine-dark ::-webkit-scrollbar-thumb {
          background: ${isDark ? "#334155" : "#cbd5e1"};
          border-radius: 4px;
        }
        .ag-theme-alpine ::-webkit-scrollbar-thumb:hover,
        .ag-theme-alpine-dark ::-webkit-scrollbar-thumb:hover {
          background: ${isDark ? "#475569" : "#94a3b8"};
        }

        /* Custom Pagination Footer - Right Aligned Page Size & Pagination */
        .dt-footer-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          box-sizing: border-box;
          padding: 10px 18px;
          background-color: ${isDark ? "#141923" : "#ffffff"};
          border-top: 1px solid ${isDark ? "#2d3748" : "#eef2f6"};
          font-size: 13px;
          color: ${isDark ? "#94a3b8" : "#64748b"};
        }

        .dt-footer-left {
          display: flex;
          align-items: center;
          font-weight: 400;
          white-space: nowrap;
          color: ${isDark ? "#94a3b8" : "#64748b"};
          font-size: 13px;
        }

        .dt-footer-right {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 20px;
          margin-left: auto;
        }

        .dt-pagesize-container {
          display: flex;
          align-items: center;
          gap: 8px;
          color: ${isDark ? "#94a3b8" : "#64748b"};
          white-space: nowrap;
          font-size: 13px;
        }

        .dt-pagesize-select {
          border: 1px solid ${isDark ? "#334155" : "#cbd5e1"};
          border-radius: 5px;
          padding: 3px 8px;
          font-size: 12.5px;
          background-color: ${isDark ? "#1a2234" : "#ffffff"};
          color: ${isDark ? "#cbd5e1" : "#334155"};
          cursor: pointer;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .dt-pagesize-select:focus {
          border-color: ${primaryColor || "#BE123C"};
        }

        .dt-pagination-nav {
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
        }

        .dt-nav-btn {
          background: transparent;
          border: none;
          font-size: 13px;
          font-weight: 500;
          color: ${isDark ? "#94a3b8" : "#64748b"};
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          gap: 2px;
          transition: color 0.15s ease;
        }

        .dt-nav-btn:hover:not(:disabled) {
          color: ${primaryColor || "#BE123C"};
        }

        .dt-nav-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .dt-page-btn {
          width: 28px;
          height: 28px;
          min-width: 28px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: ${isDark ? "#cbd5e1" : "#475569"};
          font-size: 12.5px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
          padding: 0;
        }

        .dt-page-btn:hover:not(.active) {
          background-color: ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)"};
          color: ${primaryColor || "#BE123C"};
        }

        .dt-page-btn.active {
          background-color: ${primaryColor || "#BE123C"} !important;
          color: #ffffff !important;
          font-weight: 600;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }

        .dt-ellipsis {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          color: ${isDark ? "#64748b" : "#94a3b8"};
        }
      `}</style>

      <div
        className={isDark ? "ag-theme-alpine-dark w-100" : "ag-theme-alpine w-100"}
        style={{
          height: formattedHeight,
          minHeight: typeof minHeight === "number" ? `${minHeight}px` : minHeight,
        }}
      >
        <AgGridReact
          theme={gridTheme}
          defaultColDef={defaultColDef}
          rowData={data}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          pagination={isPaginationEnabled}
          paginationPageSize={pageSize}
          suppressPaginationPanel={true}
          onPaginationChanged={handlePaginationChanged}
          suppressCellFocus={true}
          rowSelection={selectable ? "multiple" : undefined}
          onSelectionChanged={handleSelectionChanged}
          onRowClicked={(event) => event.data && onRowClick?.(event.data, event)}
          onRowDoubleClicked={(event) => event.data && onRowDoubleClick?.(event.data, event)}
          overlayNoRowsTemplate={`<span class="text-muted">${emptyMessage}</span>`}
          rowHeight={rowHeight || 42}
          headerHeight={38}
          suppressDragLeaveHidesColumns={true}
          getRowId={getRowId || undefined}
          isRowSelectable={isRowSelectable || undefined}
        />
      </div>

      {/* Custom Bottom Pagination Footer */}
      {isPaginationEnabled && (
        <div className="dt-footer-bar">
          <div className="dt-footer-left">
            Showing {startRecord} to {endRecord} of {totalRows} results
          </div>

          <div className="dt-footer-right">
            <div className="dt-pagesize-container">
              <span>Page Size:</span>
              <select
                className="dt-pagesize-select"
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              >
                {normalizedPageSizeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="dt-pagination-nav">
              <button
                className="dt-nav-btn"
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                &lt; Previous
              </button>

              {visiblePages.map((pageItem, index) =>
                pageItem === "ellipsis" ? (
                  <span key={`ellipsis-${index}`} className="dt-ellipsis">
                    ...
                  </span>
                ) : (
                  <button
                    key={pageItem}
                    className={`dt-page-btn ${pageItem === currentPage ? "active" : ""}`}
                    onClick={() => handlePageChange(pageItem)}
                  >
                    {pageItem}
                  </button>
                ),
              )}

              <button
                className="dt-nav-btn"
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next &gt;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay Spinner */}
      {isLoading && (
        <div
          className="dt-loading-overlay d-flex justify-content-center align-items-center position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundColor: isDark ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.7)",
            zIndex: 1050,
          }}
        >
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "2.5rem", height: "2.5rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTableAG;
