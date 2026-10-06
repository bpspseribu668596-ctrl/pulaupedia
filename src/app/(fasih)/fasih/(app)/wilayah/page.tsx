"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertCircle,
  Search,
  X,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  SlidersHorizontal,
  MapPin,
} from "lucide-react";
import type { AssignmentRow, FasihOfficer } from "@/lib/fasih/db";

interface WilayahResponse {
  assignments: AssignmentRow[];
  total: number;
  page: number;
  pageSize: number;
  islands: string[];
  pencacahList: FasihOfficer[];
}

type SortColumn =
  | "region_code"
  | "island_name"
  | "region_name"
  | "total_assignments"
  | "pencacah_name"
  | "pengawas_name"
  | "approved"
  | "draft"
  | "open"
  | "submitted"
  | "rejected"
  | "edited_admin"
  | "revoked"
  | "submitted_respondent"
  | "edited_supervisor"
  | null;

type SortDirection = "asc" | "desc";

const STATUS_COLS: {
  key: keyof AssignmentRow;
  label: string;
  line2?: string;
  line3?: string;
  color: string;
  badgeClass: string;
}[] = [
  {
    key: "approved",
    label: "APPROVED",
    line2: "BY",
    line3: "Pengawas",
    color: "text-emerald-700",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    key: "draft",
    label: "DRAFT",
    color: "text-yellow-700",
    badgeClass: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  {
    key: "open",
    label: "OPEN",
    color: "text-blue-700",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    key: "submitted",
    label: "SUBMITTED",
    line2: "BY",
    line3: "Pencacah",
    color: "text-indigo-700",
    badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    key: "rejected",
    label: "REJECTED",
    line2: "BY",
    line3: "Pengawas",
    color: "text-red-700",
    badgeClass: "bg-red-50 text-red-700 border-red-200",
  },
  {
    key: "edited_admin",
    label: "EDITED",
    line2: "BY",
    line3: "Admin Kab.",
    color: "text-cyan-700",
    badgeClass: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
  {
    key: "revoked",
    label: "REVOKED",
    line2: "BY",
    line3: "Pengawas",
    color: "text-orange-700",
    badgeClass: "bg-orange-50 text-orange-700 border-orange-200",
  },
  {
    key: "submitted_respondent",
    label: "SUBMITTED",
    line2: "RESPONDENT",
    color: "text-purple-700",
    badgeClass: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    key: "edited_supervisor",
    label: "EDITED",
    line2: "BY",
    line3: "Pengawas",
    color: "text-teal-700",
    badgeClass: "bg-teal-50 text-teal-700 border-teal-200",
  },
];

const PAGE_SIZES = [10, 20, 50, 100];

export default function FasihWilayahPage() {
  const [data, setData] = useState<WilayahResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [island, setIsland] = useState("ALL");
  const [pencacahId, setPencacahId] = useState("ALL");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Sorting
  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // Column visibility — hide rejected & edited_admin by default
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(() => {
    const cols = new Set(STATUS_COLS.map((s) => String(s.key)));
    cols.delete("rejected");
    cols.delete("edited_admin");
    return cols;
  });

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(island !== "ALL" && { island }),
        ...(pencacahId !== "ALL" && { pencacahId }),
        ...(sortColumn && { sortBy: sortColumn, sortDir: sortDirection }),
      });
      const res = await fetch(`/api/fasih/wilayah?${params}`);
      if (!res.ok) throw new Error("Gagal memuat data");
      setData(await res.json());
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, island, pencacahId, page, pageSize, sortColumn, sortDirection]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, island, pencacahId, sortColumn, sortDirection, pageSize]);

  const totalPages = data ? Math.max(1, Math.ceil(data.total / pageSize)) : 1;

  const clearFilters = () => {
    setSearch("");
    setIsland("ALL");
    setPencacahId("ALL");
    setPage(1);
    setSortColumn(null);
    setSortDirection("asc");
    setPageSize(10);
  };

  const hasFilters =
    search || island !== "ALL" || pencacahId !== "ALL" || sortColumn;

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const SortIcon = ({ column }: { column: SortColumn }) => {
    if (sortColumn !== column)
      return <ArrowUpDown className="h-3 w-3 opacity-40 shrink-0" />;
    return sortDirection === "asc" ? (
      <ArrowUp className="h-3 w-3 shrink-0" />
    ) : (
      <ArrowDown className="h-3 w-3 shrink-0" />
    );
  };

  const SortHeader = ({
    column,
    label,
  }: {
    column: SortColumn;
    label: string | React.ReactNode;
  }) => (
    <button
      onClick={() => handleSort(column)}
      className="flex items-center justify-between gap-1 w-full text-left cursor-pointer hover:text-foreground transition-colors select-none"
    >
      <span className="truncate">{label}</span>
      <SortIcon column={column} />
    </button>
  );

  const toggleColumnVisibility = (columnKey: string) => {
    const next = new Set(visibleColumns);
    if (next.has(columnKey)) next.delete(columnKey);
    else next.add(columnKey);
    setVisibleColumns(next);
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Wilayah
        </h1>
        <p className="text-sm text-gray-500">
          Data assignment wilayah dan status per Pencacah
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Main card */}
      <div
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden w-full"
      >
        {/* Filter bar */}
        <div className="px-5 py-4 border-b border-gray-100 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="flex flex-wrap items-center gap-2 flex-1">
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                className="pl-9 h-9 text-sm bg-gray-50 border-gray-200 focus:bg-white"
                placeholder="Cari kode, nama wilayah..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Island filter */}
            <Select value={island} onValueChange={setIsland}>
              <SelectTrigger className="w-full sm:w-44 h-9 text-sm bg-gray-50 border-gray-200">
                <MapPin className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                <SelectValue placeholder="Semua Pulau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Semua Pulau</SelectItem>
                {(data?.islands ?? []).map((isl) => (
                  <SelectItem key={isl} value={isl}>
                    {isl}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Reset */}
            {hasFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-9 px-2.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                <X className="h-3.5 w-3.5 mr-1" />
                Reset
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2 justify-end shrink-0">
            {/* Page size */}
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <span className="hidden sm:inline">Tampilkan</span>
              <Select
                value={String(pageSize)}
                onValueChange={(val) => {
                  setPageSize(parseInt(val, 10));
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-20 h-9 text-sm bg-gray-50 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAGE_SIZES.map((size) => (
                    <SelectItem key={size} value={String(size)}>
                      {size}
                    </SelectItem>
                  ))}
                  <SelectItem value={String(data?.total ?? 999999)}>
                    Semua
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Column visibility */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md border border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Kolom
                <span className="ml-0.5 inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-600 text-xs font-semibold px-1.5 h-4 min-w-[1rem]">
                  {visibleColumns.size}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Tampilkan Kolom
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {STATUS_COLS.map((s) => (
                    <DropdownMenuCheckboxItem
                      key={s.key}
                      checked={visibleColumns.has(String(s.key))}
                      onCheckedChange={() =>
                        toggleColumnVisibility(String(s.key))
                      }
                    >
                      <span className={`text-sm font-medium ${s.color}`}>
                        {s.label}
                        {s.line2 && s.line3
                          ? ` (${s.line2} ${s.line3})`
                          : s.line2
                          ? ` (${s.line2})`
                          : ""}
                      </span>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <>
            <div className="w-full overflow-x-auto">
              <Table className="w-full text-sm">
                <TableHeader>
                  <TableRow className="bg-gray-50/80 hover:bg-gray-50/80">
                    <TableHead className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap min-w-[130px]">
                      <SortHeader column="region_code" label="Kode" />
                    </TableHead>
                    <TableHead className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap min-w-[110px]">
                      <SortHeader column="island_name" label="Pulau" />
                    </TableHead>
                    <TableHead className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap min-w-[180px]">
                      <SortHeader column="region_name" label="Nama Wilayah" />
                    </TableHead>
                    <TableHead className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap min-w-[150px]">
                      <SortHeader column="pencacah_name" label="Pencacah" />
                    </TableHead>
                    <TableHead className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap min-w-[150px]">
                      <SortHeader column="pengawas_name" label="Pengawas" />
                    </TableHead>
                    <TableHead className="px-4 py-3 font-semibold text-gray-600 whitespace-nowrap min-w-[80px] text-center">
                      <SortHeader column="total_assignments" label="Total" />
                    </TableHead>
                    {STATUS_COLS.map((s) =>
                      visibleColumns.has(String(s.key)) ? (
                        <TableHead
                          key={s.key}
                          className={`px-3 py-3 whitespace-nowrap min-w-[110px] text-center text-xs font-bold ${s.color}`}
                        >
                          <SortHeader
                            column={s.key as SortColumn}
                            label={
                              <div className="flex flex-col leading-tight items-center text-center w-full">
                                <span>{s.label}</span>
                                {(s.line2 || s.line3) && (
                                  <span className="text-[10px] opacity-70 font-normal">
                                    {s.line2} {s.line3}
                                  </span>
                                )}
                              </div>
                            }
                          />
                        </TableHead>
                      ) : null
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.assignments.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6 + STATUS_COLS.length}
                        className="text-center text-gray-400 py-14 text-sm"
                      >
                        Tidak ada data yang sesuai filter
                      </TableCell>
                    </TableRow>
                  ) : (
                    data?.assignments.map((row) => (
                      <TableRow
                        key={row.assignment_id}
                        className="hover:bg-orange-50/20 transition-colors"
                      >
                        <TableCell className="px-4 py-3 font-mono text-xs text-gray-600 whitespace-nowrap">
                          {row.region_code}
                        </TableCell>
                        <TableCell className="px-4 py-3 whitespace-nowrap text-gray-700">
                          {row.island_name}
                        </TableCell>
                        <TableCell className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                          {row.region_name}
                        </TableCell>
                        <TableCell className="px-4 py-3 whitespace-nowrap">
                          <div className="flex flex-col leading-tight">
                            <span className="font-medium text-gray-900">
                              {row.pencacah_name}
                            </span>
                            {row.pencacah_username && (
                              <span className="text-xs text-gray-400">
                                {row.pencacah_username}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 whitespace-nowrap">
                          {row.pengawas_name ?? (
                            <span className="text-gray-300 italic text-xs">
                              —
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-center tabular-nums whitespace-nowrap font-semibold text-gray-900">
                          {row.total_assignments.toLocaleString("id-ID")}
                        </TableCell>
                        {STATUS_COLS.map((s) => {
                          if (!visibleColumns.has(String(s.key))) return null;
                          const val = row[s.key] as number;
                          return (
                            <TableCell
                              key={s.key}
                              className="px-3 py-3 text-center tabular-nums whitespace-nowrap"
                            >
                              {val > 0 ? (
                                <span
                                  className={`inline-flex items-center justify-center min-w-[2rem] px-2 py-0.5 rounded-full text-xs font-semibold border ${s.badgeClass}`}
                                >
                                  {val}
                                </span>
                              ) : (
                                <span className="text-gray-200 text-xs">—</span>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between gap-4 px-5 py-4 border-t border-gray-100 flex-wrap">
              <p className="text-sm text-gray-400">
                {data
                  ? `Menampilkan ${((page - 1) * pageSize) + 1}–${Math.min(page * pageSize, data.total)} dari ${data.total.toLocaleString("id-ID")} data`
                  : ""}
              </p>
              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-sm border-gray-200 hover:bg-gray-50"
                  onClick={() => setPage((p) => p - 1)}
                  disabled={page <= 1 || isLoading}
                >
                  ← Prev
                </Button>
                <span className="px-3 py-1 rounded-lg text-xs font-semibold text-white"
                  style={{ backgroundColor: "#F9882B" }}>
                  {page} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-sm border-gray-200 hover:bg-gray-50"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page >= totalPages || isLoading}
                >
                  Next →
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
