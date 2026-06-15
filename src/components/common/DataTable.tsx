import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  alpha,
  Box,
  Button,
  Checkbox,
  Menu,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import ClearIcon from "@mui/icons-material/Clear";
import CustomTextField from "./CustomTextField";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import AttachFileIcon from "@mui/icons-material/AttachFile";

export interface DataTableHeader<T = any> {
  label: string;
  key: string;
  minWidth?: number;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  resizable?: boolean;
  searchEnable?: boolean;
  render?: (row: T) => React.ReactNode;
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
  headers: DataTableHeader<T>[];
  data: T[];
  isLoading?: boolean;
  selectable?: boolean;
  serialNumber?: boolean;
  emptyMessage?: string;
  enablePagination?: boolean;
  enableColumnSearch?: boolean;
  showColumnSearchClear?: boolean;
  pagination?: DataTablePaginationProps;
  rowsPerPageOptions?: Array<number | { label: string; value: number }>;
  enableInfiniteScroll?: boolean;
  apiFunction?: (
    page: number,
    limit: number,
  ) => Promise<{ data: T[]; total: number }>;
  onLoadMore?: () => void;
  scrollHeight?: string | number;
  onRowClick?: (row: T) => void;
  onSelectionChange?: (selected: T[]) => void;
}

const DataTableWrapper = styled(Paper)(({ theme }) => ({
  width: "100%",
  borderRadius: theme.spacing(2),
  overflow: "hidden",
  border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
  backgroundColor: alpha(theme.palette.background.paper, 0.9),
  backdropFilter: "blur(16px)",
}));

const getCellValue = (row: any, key: string) => {
  return key.split(".").reduce((value, part) => {
    if (value === undefined || value === null) {
      return undefined;
    }
    return value[part];
  }, row);
};

const compare = (a: any, b: any, order: "asc" | "desc") => {
  if (a === null || a === undefined) return order === "asc" ? -1 : 1;
  if (b === null || b === undefined) return order === "asc" ? 1 : -1;

  if (typeof a === "string" && typeof b === "string") {
    return order === "asc" ? a.localeCompare(b) : b.localeCompare(a);
  }

  if (a < b) return order === "asc" ? -1 : 1;
  if (a > b) return order === "asc" ? 1 : -1;
  return 0;
};

const getVisiblePages = (
  currentPage: number,
  totalPages: number,
): (number | "ellipsis")[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index);
  }

  const pages: (number | "ellipsis")[] = [0];

  if (currentPage > 2) {
    pages.push("ellipsis");
  }

  const start = Math.max(1, currentPage - 1);
  const end = Math.min(totalPages - 2, currentPage + 1);

  for (let pageIndex = start; pageIndex <= end; pageIndex += 1) {
    pages.push(pageIndex);
  }

  if (currentPage < totalPages - 3) {
    pages.push("ellipsis");
  }

  if (totalPages > 1) {
    pages.push(totalPages - 1);
  }

  return pages;
};

const DataTable = <T extends Record<string, any>>({
  headers,
  data,
  isLoading = false,
  selectable = false,
  serialNumber = false,
  emptyMessage = "No records found.",
  enablePagination = false,
  enableColumnSearch = false,
  showColumnSearchClear = false,
  pagination,
  rowsPerPageOptions = [10, 25, 50, 100, { label: "All", value: -1 }],
  enableInfiniteScroll = false,
  apiFunction,
  onLoadMore,
  scrollHeight = "auto",
  onRowClick,
  onSelectionChange,
}: DataTableProps<T>) => {
  const theme = useTheme();
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [orderBy, setOrderBy] = useState<string>("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>(
    {},
  );
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [infiniteData, setInfiniteData] = useState<T[]>(data ?? []);
  const [internalPage, setInternalPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [exportAnchorEl, setExportAnchorEl] = useState<null | HTMLElement>(
    null,
  );
  const useApiData = Boolean(enableInfiniteScroll && apiFunction);

  useEffect(() => {
    if (!useApiData) {
      return;
    }

    setInfiniteData(data ?? []);
    setInternalPage(1);
    setHasMore(true);
  }, [data, useApiData]);

  useEffect(() => {
    if (!useApiData || data.length > 0) {
      return;
    }

    const fetchInitial = async () => {
      setLoadingMore(true);
      try {
        const result = await apiFunction?.(1, rowsPerPage);
        if (result) {
          setInfiniteData(result.data ?? []);
          setHasMore(
            result.data.length >= rowsPerPage &&
              result.total > result.data.length,
          );
        }
      } finally {
        setLoadingMore(false);
      }
    };

    fetchInitial();
  }, [apiFunction, data.length, rowsPerPage, useApiData]);

  useEffect(() => {
    if (!enableInfiniteScroll || (!onLoadMore && !apiFunction)) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !loadingMore) {
          if (onLoadMore) {
            onLoadMore();
            return;
          }
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: "120px",
        threshold: 0.3,
      },
    );

    const sentinel = sentinelRef.current;
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
      observer.disconnect();
    };
  }, [enableInfiniteScroll, onLoadMore, apiFunction, loadingMore]);

  const loadMore = async () => {
    if (!apiFunction || loadingMore || !hasMore) {
      return;
    }

    setLoadingMore(true);
    try {
      const nextPage = internalPage + 1;
      const result = await apiFunction(nextPage, rowsPerPage);
      if (result) {
        const nextData = [...infiniteData, ...(result.data ?? [])];
        setInfiniteData(nextData);
        setInternalPage(nextPage);
        setHasMore(nextData.length < result.total);
      }
    } finally {
      setLoadingMore(false);
    }
  };

  const tableData = useMemo(() => {
    const source = useApiData ? infiniteData : data;
    const normalizedSearch = searchQuery.trim().toLowerCase();
    const filtered = source.filter((row) => {
      if (normalizedSearch) {
        const matchesGlobal = headers.some((header) => {
          const cellValue = String(getCellValue(row, header.key) ?? "");
          return cellValue.toLowerCase().includes(normalizedSearch);
        });
        if (!matchesGlobal) {
          return false;
        }
      }

      return headers.every((header) => {
        const filterValue = columnFilters[header.key]?.trim().toLowerCase();
        if (!filterValue) {
          return true;
        }
        const cellValue = String(getCellValue(row, header.key) ?? "");
        return cellValue.toLowerCase().includes(filterValue);
      });
    });

    const sorted = [...filtered];
    if (orderBy) {
      sorted.sort((a, b) =>
        compare(getCellValue(a, orderBy), getCellValue(b, orderBy), order),
      );
    }

    return sorted;
  }, [
    data,
    infiniteData,
    headers,
    orderBy,
    order,
    searchQuery,
    useApiData,
    columnFilters,
  ]);

  const totalRows = useMemo(() => {
    if (pagination) {
      return pagination.total;
    }
    return tableData.length;
  }, [pagination, tableData.length]);

  const currentPageData = useMemo(() => {
    if (enableInfiniteScroll) {
      return tableData;
    }

    if (!enablePagination) {
      return tableData;
    }

    const selectedPage = pagination ? pagination.page : page;
    const selectedLimit = pagination ? pagination.limit : rowsPerPage;
    if (selectedLimit === -1) {
      return tableData;
    }

    const startIndex = selectedPage * selectedLimit;
    return tableData.slice(startIndex, startIndex + selectedLimit);
  }, [
    enableInfiniteScroll,
    enablePagination,
    pagination,
    page,
    rowsPerPage,
    tableData,
  ]);

  const handleSort = (key: string, sortable?: boolean) => {
    if (!sortable) {
      return;
    }

    const isAsc = orderBy === key && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(key);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checked) {
      setSelectedKeys([]);
      onSelectionChange?.([]);
      return;
    }

    const allKeys = currentPageData.map((_, rowIndex) => {
      return String(rowIndex);
    });

    setSelectedKeys(allKeys);
    onSelectionChange?.(currentPageData.map((row) => row));
  };

  const handleSelectRow = (_row: T, index: number) => {
    const key = String(index);
    const nextSelected = selectedKeys.includes(key)
      ? selectedKeys.filter((selectedKey) => selectedKey !== key)
      : [...selectedKeys, key];

    setSelectedKeys(nextSelected);
    onSelectionChange?.(
      currentPageData.filter((rowEntry, rowIndex) =>
        nextSelected.includes(String(rowEntry.id ?? rowIndex)),
      ),
    );
  };

  const isAllSelected =
    selectable &&
    currentPageData.length > 0 &&
    selectedKeys.length === currentPageData.length;

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    if (pagination) {
      pagination.onPageChange(newPage);
      return;
    }

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any,
  ) => {
    const rawValue = event.target.value
      ? parseInt(event.target.value, 10)
      : parseInt(event.target?.value, 10);
    const nextLimit = rawValue === -1 ? totalRows : rawValue;

    if (pagination) {
      pagination.onRowsPerPageChange(rawValue);
      return;
    }

    setRowsPerPage(nextLimit);
    setPage(0);
  };

  const openExportMenu = (event: React.MouseEvent<HTMLElement>) => {
    setExportAnchorEl(event.currentTarget);
  };

  const closeExportMenu = () => {
    setExportAnchorEl(null);
  };

  const clearColumnFilters = () => {
    setColumnFilters({});
    if (!pagination) {
      setPage(0);
    }
  };

  const downloadFile = (
    fileName: string,
    content: string,
    type = "text/csv;charset=utf-8;",
  ) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportData = (fileName: string, mimeType: string) => {
    const csvRows = [
      headers.map((header) => header.label).join(","),
      ...tableData.map((row) =>
        headers
          .map((header) => {
            const value = String(getCellValue(row, header.key) ?? "");
            return `"${value.replace(/"/g, '""')}"`;
          })
          .join(","),
      ),
    ];
    const content = csvRows.join("\r\n");
    downloadFile(fileName, content, mimeType);
  };

  const handleExportOption = (option: "csv" | "xls" | "pdf" | "print") => {
    closeExportMenu();
    if (option === "csv") {
      exportData("export.csv", "text/csv;charset=utf-8;");
    }
    if (option === "xls") {
      exportData("export.xls", "application/vnd.ms-excel;charset=utf-8;");
    }
    if (option === "pdf") {
      exportData("export.pdf", "application/pdf;charset=utf-8;");
    }
    if (option === "print") {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        const tableHtml = `
          <html>
            <head><title>Print</title></head>
            <body>${document.querySelector("table")?.outerHTML ?? ""}</body>
          </html>
        `;
        printWindow.document.write(tableHtml);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
      }
    }
  };

  const renderSortIcon = (columnKey: string, sortable?: boolean) => {
    if (!sortable) {
      return null;
    }

    if (orderBy !== columnKey) {
      return (
        <UnfoldMoreIcon
          sx={{ fontSize: 16, color: "text.disabled", ml: 0.5 }}
        />
      );
    }

    return order === "asc" ? (
      <ArrowUpwardIcon sx={{ fontSize: 14, color: "primary.main", ml: 0.5 }} />
    ) : (
      <ArrowDownwardIcon
        sx={{ fontSize: 14, color: "primary.main", ml: 0.5 }}
      />
    );
  };

  const paginationState = useMemo(() => {
    const currentPage = pagination ? pagination.page : page;
    const currentLimit = pagination ? pagination.limit : rowsPerPage;
    const effectiveLimit =
      currentLimit === -1 ? Math.max(totalRows, 1) : currentLimit;
    const totalPages = Math.max(Math.ceil(totalRows / effectiveLimit), 1);

    if (totalRows === 0) {
      return {
        currentPage,
        currentLimit,
        effectiveLimit,
        totalPages,
        start: 0,
        end: 0,
      };
    }

    const start = currentPage * effectiveLimit + 1;
    const end = Math.min((currentPage + 1) * effectiveLimit, totalRows);

    return {
      currentPage,
      currentLimit,
      effectiveLimit,
      totalPages,
      start,
      end,
    };
  }, [pagination, page, rowsPerPage, totalRows]);

  const headerCellSx = {
    fontWeight: 700,
    color: "text.primary",
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderTop: "none",
    p: 1,
    backgroundColor: "background.paper",
    whiteSpace: "nowrap" as const,
  };

  const bodyCellSx = {
    p: 1,
    color: "text.secondary",
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
  };

  const paginationButtonSx = (isActive: boolean, isDisabled = false) => ({
    minWidth: 40,
    px: 1.5,
    py: 0.75,
    borderRadius: 0,
    border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
    ml: "-1px",
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.5,
    textTransform: "none" as const,
    boxShadow: "none",
    ...(isActive
      ? {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          zIndex: 1,
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
            boxShadow: "none",
          },
        }
      : {
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          color: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.16),
            boxShadow: "none",
          },
        }),
    ...(isDisabled && {
      opacity: 0.45,
      pointerEvents: "none" as const,
    }),
  });

  const renderHeaderCells = () => (
    <>
      {selectable && (
        <TableCell padding="checkbox" sx={headerCellSx}>
          <Checkbox
            color="primary"
            checked={isAllSelected}
            onChange={handleSelectAll}
            indeterminate={
              selectedKeys.length > 0 &&
              selectedKeys.length < currentPageData.length
            }
          />
        </TableCell>
      )}
      {serialNumber && (
        <TableCell align="left" sx={headerCellSx}>
          #
        </TableCell>
      )}
      {headers.map((header) => (
        <TableCell
          key={header.key}
          align={header.align ?? "left"}
          sx={{
            ...headerCellSx,
            minWidth: header.minWidth ?? 120,
            cursor: header.sortable ? "pointer" : "default",
          }}
          onClick={() => handleSort(header.key, header.sortable)}
        >
          <Box sx={{ display: "inline-flex", alignItems: "center" }}>
            {header.label}
            {renderSortIcon(header.key, header.sortable)}
          </Box>
        </TableCell>
      ))}
    </>
  );

  const renderFooterCells = () => (
    <>
      {selectable && <TableCell padding="checkbox" sx={headerCellSx} />}
      {serialNumber && (
        <TableCell align="left" sx={headerCellSx}>
          #
        </TableCell>
      )}
      {headers.map((header) => (
        <TableCell
          key={`footer-${header.key}`}
          align={header.align ?? "left"}
          sx={{
            ...headerCellSx,
            minWidth: header.minWidth ?? 120,
            cursor: "default",
          }}
        >
          {header.label}
        </TableCell>
      ))}
    </>
  );

  return (
    <DataTableWrapper elevation={0}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1.75,
        }}
      >
        {(enablePagination || pagination) && !enableInfiniteScroll ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Show
            </Typography>
            <Select
              size="small"
              value={pagination ? pagination.limit : rowsPerPage}
              onChange={(e) => handleChangeRowsPerPage(e as any)}
              sx={{
                minWidth: 72,
                height: 32,
                fontSize: "0.875rem",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: alpha(theme.palette.divider, 0.9),
                },
              }}
            >
              {rowsPerPageOptions.map((option) => {
                const value =
                  typeof option === "number" ? option : option.value;
                const label =
                  typeof option === "number" ? option : option.label;
                return (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                );
              })}
            </Select>
            <Typography variant="body2" color="text.secondary">
              entries
            </Typography>
          </Box>
        ) : (
          <Box />
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
            ml: "auto",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Search:
            </Typography>
            <CustomTextField
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                if (!pagination) {
                  setPage(0);
                }
              }}
              placeholder=""
              size="small"
              sx={{ width: 220 }}
            />
          </Box>

          <Button variant="contained" onClick={openExportMenu} size="small">
            Export
          </Button>

          <Menu
            anchorEl={exportAnchorEl}
            open={Boolean(exportAnchorEl)}
            onClose={closeExportMenu}
          >
            <MenuItem onClick={() => handleExportOption("csv")}>
              <DownloadIcon
                sx={{ fontSize: 16, mr: 1, color: "primary.main" }}
              />
              CSV
            </MenuItem>

            <MenuItem onClick={() => handleExportOption("xls")}>
              <AttachFileIcon
                sx={{
                  fontSize: 16,
                  mr: 1,
                  color: "primary.main",
                }}
              />
              XLS
            </MenuItem>

            <MenuItem onClick={() => handleExportOption("pdf")}>
              <PictureAsPdfIcon
                sx={{ fontSize: 16, mr: 1, color: "primary.main" }}
              />
              PDF
            </MenuItem>

            <MenuItem onClick={() => handleExportOption("print")}>
              <PrintIcon sx={{ fontSize: 16, mr: 1, color: "primary.main" }} />
              Print
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      <TableContainer sx={{ maxHeight: scrollHeight, minHeight: 240 }}>
        <Table
          stickyHeader
          sx={{
            borderCollapse: "collapse",
            "& .MuiTableCell-root": {
              borderLeft: "none",
              borderRight: "none",
            },
          }}
        >
          <TableHead>
            {enableColumnSearch && (
              <TableRow>
                {selectable && <TableCell padding="checkbox" />}
                {serialNumber && (
                  <TableCell
                    align="center"
                    sx={{
                      p: 1.5,
                      position: "relative",
                      "&:hover .clear-filters-icon": {
                        opacity: showColumnSearchClear ? 1 : 0,
                      },
                    }}
                  >
                    {showColumnSearchClear && (
                      <Tooltip title="Clear filters">
                        <IconButton
                          className="clear-filters-icon"
                          size="small"
                          onClick={(event) => {
                            event.stopPropagation();
                            clearColumnFilters();
                          }}
                          sx={{
                            position: "absolute",
                            right: 8,
                            top: "50%",
                            transform: "translateY(-50%)",
                            transition: "opacity 0.2s ease",
                            color: theme.palette.text.secondary,
                          }}
                        >
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                )}
                {headers.map((header) =>
                  header.searchEnable ? (
                    <TableCell key={`${header.key}-filter`} sx={{ p: 1.5 }}>
                      <CustomTextField
                        size="small"
                        fullWidth
                        placeholder={`${header.label}`}
                        value={columnFilters[header.key] ?? ""}
                        onChange={(event) => {
                          setColumnFilters((prev) => ({
                            ...prev,
                            [header.key]: event.target.value,
                          }));

                          if (!pagination) {
                            setPage(0);
                          }
                        }}
                      />
                    </TableCell>
                  ) : (
                    <TableCell key={`${header.key}-filter`} sx={{ p: 1.5 }} />
                  ),
                )}
              </TableRow>
            )}
            <TableRow>{renderHeaderCells()}</TableRow>
          </TableHead>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell
                  colSpan={
                    headers.length +
                    (selectable ? 1 : 0) +
                    (serialNumber ? 1 : 0)
                  }
                >
                  <Typography variant="body2" align="center" sx={{ py: 6 }}>
                    Loading records...
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {!isLoading && currentPageData.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={
                    headers.length +
                    (selectable ? 1 : 0) +
                    (serialNumber ? 1 : 0)
                  }
                >
                  <Typography
                    variant="body2"
                    align="center"
                    sx={{ py: 6, color: theme.palette.text.secondary }}
                  >
                    {emptyMessage}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              currentPageData.map((row, rowIndex) => {
                const rowKey = String(rowIndex);
                return (
                  <TableRow
                    key={rowKey}
                    hover
                    onClick={() => onRowClick?.(row)}
                    sx={{
                      cursor: onRowClick ? "pointer" : "default",
                      "&:last-child td": {
                        borderBottom: "none",
                      },
                    }}
                  >
                    {selectable && (
                      <TableCell
                        padding="checkbox"
                        sx={bodyCellSx}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <Checkbox
                          color="primary"
                          checked={selectedKeys.includes(rowKey)}
                          onChange={() => handleSelectRow(row, rowIndex)}
                        />
                      </TableCell>
                    )}
                    {serialNumber && (
                      <TableCell align="left" sx={bodyCellSx}>
                        {rowIndex +
                          1 +
                          (pagination
                            ? pagination.page * pagination.limit
                            : page * rowsPerPage)}
                      </TableCell>
                    )}
                    {headers.map((header) => (
                      <TableCell
                        key={header.key}
                        align={header.align ?? "left"}
                        sx={bodyCellSx}
                      >
                        {header.render
                          ? header.render(row)
                          : String(getCellValue(row, header.key) ?? "-")}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
          </TableBody>
          <TableFooter>
            <TableRow>{renderFooterCells()}</TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {(enablePagination || pagination) && !enableInfiniteScroll && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            px: 2,
            py: 1.75,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Showing {paginationState.start} to {paginationState.end} of{" "}
            {totalRows} entries
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              size="small"
              onClick={() =>
                handleChangePage(null, paginationState.currentPage - 1)
              }
              disabled={paginationState.currentPage === 0}
              sx={{
                ...paginationButtonSx(false, paginationState.currentPage === 0),
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
                ml: 0,
              }}
            >
              Previous
            </Button>

            {getVisiblePages(
              paginationState.currentPage,
              paginationState.totalPages,
            ).map((pageItem, index) =>
              pageItem === "ellipsis" ? (
                <Box
                  key={`ellipsis-${index}`}
                  sx={{
                    ...paginationButtonSx(false),
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "default",
                  }}
                >
                  ...
                </Box>
              ) : (
                <Button
                  key={pageItem}
                  size="small"
                  onClick={() => handleChangePage(null, pageItem)}
                  sx={paginationButtonSx(
                    pageItem === paginationState.currentPage,
                  )}
                >
                  {pageItem + 1}
                </Button>
              ),
            )}

            <Button
              size="small"
              onClick={() =>
                handleChangePage(null, paginationState.currentPage + 1)
              }
              disabled={
                paginationState.currentPage >= paginationState.totalPages - 1
              }
              sx={{
                ...paginationButtonSx(
                  false,
                  paginationState.currentPage >= paginationState.totalPages - 1,
                ),
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
              }}
            >
              Next
            </Button>
          </Box>
        </Box>
      )}

      {enableInfiniteScroll && (
        <Box ref={sentinelRef} sx={{ py: 2, textAlign: "center" }}>
          {loadingMore ? (
            <Typography variant="body2" color="text.secondary">
              Loading more records...
            </Typography>
          ) : hasMore ? (
            <Typography variant="body2" color="text.secondary">
              Scroll to load more
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No more records to load
            </Typography>
          )}
        </Box>
      )}
    </DataTableWrapper>
  );
};

export default DataTable;
