"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
  ChevronLeft,
  ChevronRight,
  Search,
  X,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Settings,
} from "lucide-react";
import type { AssignmentRow, FasihOfficer } from "@/lib/fasih-db";

interface WilayahResponse {
  assignments: AssignmentRow[];
  total: number;
  page: number;
  pageSize: number;
  islands: string[];
  pencacahList: FasihOfficer[];
}

type SortColumn = "region_code" | "island_name" | "region_name" | "total_region" | "pencacah_name" | "pengawas_name" | "approved" | "draft" | "open" | "submitted" | "rejected" | "edited_admin" | "revoked" | "submitted_respondent" | "edited_supervisor" | null;
type SortDirection = "asc" | "desc";

const STATUS_COLS: { key: keyof AssignmentRow; label: string; line2?: string; line3?: string; color: string }[] = [
  { key: "approved", label: "APPROVED", line2: "BY", line3: "Pengawas", color: "text-emerald-700" },
  { key: "draft", label: "DRAFT", color: "text-yellow-700" },
  { key: "open", label: "OPEN", color: "text-blue-700" },
  { key: "submitted", label: "SUBMITTED", line2: "BY", line3: "Pencacah", color: "text-indigo-700" },
  { key: "rejected", label: "REJECTED", line2: "BY", line3: "Pengawas", color: "text-red-700" },
  { key: "edited_admin", label: "EDITED", line2: "BY", line3: "Admin Kabupaten", color: "text-cyan-700" },
  { key: "revoked", label: "REVOKED", line2: "BY", line3: "Pengawas", color: "text-orange-700" },
  { key: "submitted_respondent", label: "SUBMITTED", line2: "RESPONDENT", color: "text-purple-700" },
  { key: "edited_supervisor", label: "EDITED", line2: "BY", line3: "Pengawas", color: "text-teal-700" },
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

  // Column visibility — default semua kecuali rejected dan edited_admin
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(() => {
    const cols = new Set(STATUS_COLS.map(s => String(s.key)));
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

  useEffect(() => { fetchData(); }, [fetchData]);

  // Reset page when filters change
  useEffect(() => { setPage(1); }, [debouncedSearch, island, pencacahId, sortColumn, sortDirection, pageSize]);

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

  const hasFilters = search || island !== "ALL" || pencacahId !== "ALL" || sortColumn;

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const SortIcon = ({ column }: { column: SortColumn }) => {
    if (sortColumn !== column) return <ArrowUpDown className="h-4 w-4 opacity-40" />;
    return sortDirection === "asc"
      ? <ArrowUp className="h-4 w-4" />
      : <ArrowDown className="h-4 w-4" />;
  };

  const SortHeader = ({ column, label }: { column: SortColumn; label: string | React.ReactNode }) => (
    <button
      onClick={() => handleSort(column)}
      className="flex items-center justify-center gap-1 cursor-pointer hover:opacity-70 transition-opacity flex-col"
    >
      {label}
      <SortIcon column={column} />
    </button>
  );

  const toggleColumnVisibility = (columnKey: string) => {
    const newVisible = new Set(visibleColumns);
    if (newVisible.has(columnKey)) {
      newVisible.delete(columnKey);
    } else {
      newVisible.add(columnKey);
    }
    setVisibleColumns(newVisible);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Wilayah</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Data assignment wilayah dan status per Pencacah
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            {/* Search */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Cari kode, nama wilayah, pulau, pencacah..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Filter Pulau */}
            <Select value={island} onValueChange={setIsland}>
              <SelectTrigger className="w-full sm:w-52">
                <SelectValue placeholder="Semua Pulau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Semua Pulau</SelectItem>
                {(data?.islands ?? []).map((isl) => (
                  <SelectItem key={isl} value={isl}>{isl}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Page Size */}
            <Select value={String(pageSize)} onValueChange={(val) => {
              setPageSize(parseInt(val, 10));
              setPage(1);
            }}>
              <SelectTrigger className="w-full sm:w-28">
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

            {/* Column Visibility Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger className="px-3 py-2 h-9 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center text-sm font-medium gap-2 cursor-pointer">
                <Settings className="h-4 w-4" />
                Kolom
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Tampilkan Kolom</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {STATUS_COLS.map((s) => (
                    <DropdownMenuCheckboxItem
                      key={s.key}
                      checked={visibleColumns.has(String(s.key))}
                      onCheckedChange={() => toggleColumnVisibility(String(s.key))}
                    >
                      <span className="text-sm">{s.label} {s.line2 && s.line3 ? `(${s.line2} ${s.line3})` : s.line2 ? `(${s.line2})` : ''}</span>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {hasFilters && (
              <Button variant="ghost" size="icon" onClick={clearFilters} title="Reset filter">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : (
            <>
              <div className="w-full overflow-x-auto overflow-y-hidden max-h-full">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="px-2 py-2 whitespace-nowrap w-32 min-w-fit">
                        <SortHeader column="region_code" label="Kode" />
                      </TableHead>
                      <TableHead className="px-2 py-2 whitespace-nowrap w-24 min-w-fit">
                        <SortHeader column="island_name" label="Pulau" />
                      </TableHead>
                      <TableHead className="px-2 py-2 whitespace-nowrap w-40 min-w-fit">
                        <SortHeader column="region_name" label="Nama Wilayah" />
                      </TableHead>
                      <TableHead className="px-2 py-2 whitespace-nowrap w-20 min-w-fit text-center">
                        <SortHeader column="total_region" label="Total" />
                      </TableHead>
                      <TableHead className="px-2 py-2 whitespace-nowrap w-32 min-w-fit">
                        <SortHeader column="pencacah_name" label="Pencacah" />
                      </TableHead>
                      <TableHead className="px-2 py-2 whitespace-nowrap w-32 min-w-fit">
                        <SortHeader column="pengawas_name" label="Pengawas" />
                      </TableHead>
                      {STATUS_COLS.map((s) => (
                        visibleColumns.has(String(s.key)) && (
                          <TableHead key={s.key} className={`px-2 py-2 whitespace-normal w-24 min-w-fit text-center text-xs ${s.color} font-semibold leading-tight`}>
                            <SortHeader column={s.key as SortColumn} label={
                              <>
                                <div>{s.label}</div>
                                {s.line2 && <div>{s.line2}</div>}
                                {s.line3 && <div>{s.line3}</div>}
                              </>
                            } />
                          </TableHead>
                        )
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.assignments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6 + STATUS_COLS.length} className="text-center text-muted-foreground py-12">
                          Tidak ada data yang sesuai filter
                        </TableCell>
                      </TableRow>
                    ) : (
                      data?.assignments.map((row) => (
                        <TableRow key={row.assignment_id}>
                          <TableCell className="px-2 py-2 font-mono text-xs w-32 min-w-fit">
                            {row.region_code}
                          </TableCell>
                          <TableCell className="px-2 py-2 text-xs w-24 min-w-fit">
                            {row.island_name}
                          </TableCell>
                          <TableCell className="px-2 py-2 text-xs font-medium w-40 min-w-fit">
                            {row.region_name}
                          </TableCell>
                          <TableCell className="px-2 py-2 text-center tabular-nums text-xs w-20 min-w-fit">
                            {row.total_region.toLocaleString("id-ID")}
                          </TableCell>
                          <TableCell className="px-2 py-2 text-xs w-32 min-w-fit">
                            {row.pencacah_name}
                          </TableCell>
                          <TableCell className="px-2 py-2 text-xs text-muted-foreground w-32 min-w-fit">
                            {row.pengawas_name ?? (
                              <Badge variant="outline" className="text-xs text-slate-400">
                                —
                              </Badge>
                            )}
                          </TableCell>
                          {STATUS_COLS.map((s) => {
                            if (!visibleColumns.has(String(s.key))) return null;
                            const val = row[s.key] as number;
                            return (
                              <TableCell key={s.key} className={`px-2 py-2 text-center tabular-nums text-xs w-24 min-w-fit ${s.color} font-semibold`}>
                                {val > 0 ? val : <span className="text-muted-foreground/30">—</span>}
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
              <div className="flex items-center justify-between gap-4 px-4 py-3 border-t flex-wrap">
                <p className="text-sm text-muted-foreground">
                  {data
                    ? `${((page - 1) * pageSize) + 1}–${Math.min(page * pageSize, data.total)} dari ${data.total.toLocaleString("id-ID")} assignment`
                    : ""}
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => p - 1)}
                    disabled={page <= 1 || isLoading}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm tabular-nums">
                    {page} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page >= totalPages || isLoading}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
