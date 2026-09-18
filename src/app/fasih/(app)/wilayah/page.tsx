"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
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
import { Label } from "@/components/ui/label";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Settings,
  Pencil,
  Trash2,
  RefreshCw,
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

type SortColumn =
  | "region_code" | "island_name" | "region_name" | "total_region"
  | "pencacah_name" | "pengawas_name" | "approved" | "draft" | "open"
  | "submitted" | "rejected" | "edited_admin" | "revoked"
  | "submitted_respondent" | "edited_supervisor" | null;
type SortDirection = "asc" | "desc";

const STATUS_COLS: { key: keyof AssignmentRow; label: string; line2?: string; line3?: string; color: string }[] = [
  { key: "approved",             label: "APPROVED",  line2: "BY",          line3: "Pengawas",        color: "text-emerald-700" },
  { key: "draft",                label: "DRAFT",                                                       color: "text-yellow-700"  },
  { key: "open",                 label: "OPEN",                                                        color: "text-blue-700"    },
  { key: "submitted",            label: "SUBMITTED", line2: "BY",          line3: "Pencacah",        color: "text-indigo-700"  },
  { key: "rejected",             label: "REJECTED",  line2: "BY",          line3: "Pengawas",        color: "text-red-700"     },
  { key: "edited_admin",         label: "EDITED",    line2: "BY",          line3: "Admin Kabupaten", color: "text-cyan-700"    },
  { key: "revoked",              label: "REVOKED",   line2: "BY",          line3: "Pengawas",        color: "text-orange-700"  },
  { key: "submitted_respondent", label: "SUBMITTED", line2: "RESPONDENT",                            color: "text-purple-700"  },
  { key: "edited_supervisor",    label: "EDITED",    line2: "BY",          line3: "Pengawas",        color: "text-teal-700"    },
];

// All editable numeric fields (total + status cols)
const EDIT_FIELDS: { key: string; label: string }[] = [
  { key: "total_region",          label: "Total" },
  { key: "approved",              label: "Approved (by Pengawas)" },
  { key: "draft",                 label: "Draft" },
  { key: "open",                  label: "Open" },
  { key: "submitted",             label: "Submitted (by Pencacah)" },
  { key: "rejected",              label: "Rejected (by Pengawas)" },
  { key: "edited_admin",          label: "Edited (by Admin Kabupaten)" },
  { key: "revoked",               label: "Revoked (by Pengawas)" },
  { key: "submitted_respondent",  label: "Submitted Respondent" },
  { key: "edited_supervisor",     label: "Edited (by Pengawas)" },
];

const PAGE_SIZES = [10, 20, 50, 100];

type EditForm = Record<string, number>;

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

  // Column visibility
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

  // ── Edit state ─────────────────────────────────────────────────────────────
  const [editRow, setEditRow] = useState<AssignmentRow | null>(null);
  const [editForm, setEditForm] = useState<EditForm>({});
  const [isEditing, setIsEditing] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  // ── Delete state ───────────────────────────────────────────────────────────
  const [deleteRow, setDeleteRow] = useState<AssignmentRow | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

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
  useEffect(() => { setPage(1); }, [debouncedSearch, island, pencacahId, sortColumn, sortDirection, pageSize]);

  const totalPages = data ? Math.max(1, Math.ceil(data.total / pageSize)) : 1;

  const clearFilters = () => {
    setSearch(""); setIsland("ALL"); setPencacahId("ALL");
    setPage(1); setSortColumn(null); setSortDirection("asc"); setPageSize(10);
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
    if (sortColumn !== column) return <ArrowUpDown className="h-3 w-3 opacity-40 shrink-0" />;
    return sortDirection === "asc"
      ? <ArrowUp className="h-3 w-3 shrink-0" />
      : <ArrowDown className="h-3 w-3 shrink-0" />;
  };

  const SortHeader = ({ column, label }: { column: SortColumn; label: string | React.ReactNode }) => (
    <button
      onClick={() => handleSort(column)}
      className="flex items-center justify-between gap-2 w-full text-left cursor-pointer hover:text-foreground transition-colors group select-none"
    >
      <span className="truncate">{label}</span>
      <SortIcon column={column} />
    </button>
  );

  const toggleColumnVisibility = (columnKey: string) => {
    const newVisible = new Set(visibleColumns);
    if (newVisible.has(columnKey)) newVisible.delete(columnKey);
    else newVisible.add(columnKey);
    setVisibleColumns(newVisible);
  };

  // ── Open edit modal ────────────────────────────────────────────────────────
  const openEdit = (row: AssignmentRow) => {
    setEditRow(row);
    setEditError(null);
    setEditForm({
      total_region:         row.total_region,
      approved:             row.approved,
      draft:                row.draft,
      open:                 row.open,
      submitted:            row.submitted,
      rejected:             row.rejected,
      edited_admin:         row.edited_admin,
      revoked:              row.revoked,
      submitted_respondent: row.submitted_respondent,
      edited_supervisor:    row.edited_supervisor,
    });
  };

  // ── Submit edit ────────────────────────────────────────────────────────────
  const handleEdit = async () => {
    if (!editRow) return;
    setIsEditing(true);
    setEditError(null);
    try {
      const res = await fetch(`/api/fasih/wilayah/${editRow.assignment_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Gagal menyimpan");
      setEditRow(null);
      fetchData();
    } catch (e: unknown) {
      setEditError(e instanceof Error ? e.message : "Terjadi kesalahan");
    } finally {
      setIsEditing(false);
    }
  };

  // ── Submit delete ──────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleteRow) return;
    setIsDeleting(true);
    setDeleteError(null);
    try {
      const res = await fetch(`/api/fasih/wilayah/${deleteRow.assignment_id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Gagal menghapus");
      setDeleteRow(null);
      fetchData();
    } catch (e: unknown) {
      setDeleteError(e instanceof Error ? e.message : "Terjadi kesalahan");
    } finally {
      setIsDeleting(false);
    }
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

      <Card className="border shadow-sm bg-white">
        <CardHeader className="p-6 pb-4 border-b">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            <div className="flex flex-wrap items-center gap-3 flex-1">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-9 h-9 text-sm"
                  placeholder="Cari kode, nama wilayah..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={island} onValueChange={setIsland}>
                <SelectTrigger className="w-full sm:w-44 h-9 text-sm">
                  <SelectValue placeholder="Semua Pulau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Semua Pulau</SelectItem>
                  {(data?.islands ?? []).map((isl) => (
                    <SelectItem key={isl} value={isl}>{isl}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {hasFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9 px-2 text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4 mr-1" /> Reset
                </Button>
              )}
            </div>

            <div className="flex items-center gap-3 justify-end">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Show</span>
                <Select value={String(pageSize)} onValueChange={(val) => { setPageSize(parseInt(val, 10)); setPage(1); }}>
                  <SelectTrigger className="w-20 h-9 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PAGE_SIZES.map((size) => (
                      <SelectItem key={size} value={String(size)}>{size}</SelectItem>
                    ))}
                    <SelectItem value={String(data?.total ?? 999999)}>Semua</SelectItem>
                  </SelectContent>
                </Select>
                <span>entries</span>
              </div>
              <DropdownMenu>
                <div className="inline-flex">
                  <DropdownMenuTrigger className="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 cursor-pointer">
                    <Settings className="h-4 w-4" />
                    Kolom
                  </DropdownMenuTrigger>
                </div>
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
                        <span className="text-sm">
                          {s.label}{s.line2 && s.line3 ? ` (${s.line2} ${s.line3})` : s.line2 ? ` (${s.line2})` : ""}
                        </span>
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
              <div className="w-full overflow-x-auto border-b">
                <div className="inline-block min-w-full align-middle pr-2">
                  <Table className="w-full text-sm">
                    <TableHeader className="bg-muted/50">
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="px-4 py-3 font-semibold whitespace-nowrap min-w-[120px]">
                          <SortHeader column="region_code" label="Kode" />
                        </TableHead>
                        <TableHead className="px-4 py-3 font-semibold whitespace-nowrap min-w-[100px]">
                          <SortHeader column="island_name" label="Pulau" />
                        </TableHead>
                        <TableHead className="px-4 py-3 font-semibold whitespace-nowrap min-w-[180px]">
                          <SortHeader column="region_name" label="Nama Wilayah" />
                        </TableHead>
                        <TableHead className="px-4 py-3 font-semibold whitespace-nowrap min-w-[80px] text-center">
                          <SortHeader column="total_region" label="Total" />
                        </TableHead>
                        <TableHead className="px-4 py-3 font-semibold whitespace-nowrap min-w-[140px]">
                          <SortHeader column="pencacah_name" label="Pencacah" />
                        </TableHead>
                        <TableHead className="px-4 py-3 font-semibold whitespace-nowrap min-w-[140px]">
                          <SortHeader column="pengawas_name" label="Pengawas" />
                        </TableHead>
                        {STATUS_COLS.map((s) =>
                          visibleColumns.has(String(s.key)) ? (
                            <TableHead key={s.key} className={`px-3 py-3 whitespace-nowrap min-w-[110px] text-center text-xs ${s.color} font-bold`}>
                              <SortHeader column={s.key as SortColumn} label={
                                <div className="flex flex-col leading-tight items-center text-center w-full">
                                  <span>{s.label}</span>
                                  {s.line2 && <span className="text-[10px] opacity-80">{s.line2} {s.line3}</span>}
                                </div>
                              } />
                            </TableHead>
                          ) : null
                        )}
                        {/* Kolom Aksi */}
                        <TableHead className="px-4 py-3 font-semibold whitespace-nowrap w-24 text-center">
                          Aksi
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data?.assignments.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7 + STATUS_COLS.length} className="text-center text-muted-foreground py-12">
                            Tidak ada data yang sesuai filter
                          </TableCell>
                        </TableRow>
                      ) : (
                        data?.assignments.map((row) => (
                          <TableRow key={row.assignment_id} className="hover:bg-muted/30 transition-colors">
                            <TableCell className="px-4 py-3 font-mono text-xs whitespace-nowrap">{row.region_code}</TableCell>
                            <TableCell className="px-4 py-3 whitespace-nowrap">{row.island_name}</TableCell>
                            <TableCell className="px-4 py-3 font-medium whitespace-nowrap">{row.region_name}</TableCell>
                            <TableCell className="px-4 py-3 text-center tabular-nums whitespace-nowrap">
                              {row.total_region.toLocaleString("id-ID")}
                            </TableCell>
                            <TableCell className="px-4 py-3 whitespace-nowrap">{row.pencacah_name}</TableCell>
                            <TableCell className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                              {row.pengawas_name ?? (
                                <Badge variant="outline" className="text-xs text-slate-400 font-normal">—</Badge>
                              )}
                            </TableCell>
                            {STATUS_COLS.map((s) => {
                              if (!visibleColumns.has(String(s.key))) return null;
                              const val = row[s.key] as number;
                              return (
                                <TableCell key={s.key} className={`px-3 py-3 text-center tabular-nums whitespace-nowrap ${s.color} font-semibold`}>
                                  {val > 0 ? val : <span className="text-muted-foreground/30 font-normal">—</span>}
                                </TableCell>
                              );
                            })}
                            {/* Aksi per baris */}
                            <TableCell className="px-4 py-3 text-center whitespace-nowrap">
                              <div className="flex items-center justify-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 text-muted-foreground hover:text-blue-600 hover:bg-blue-50"
                                  title="Edit"
                                  onClick={() => openEdit(row)}
                                >
                                  <Pencil className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 text-muted-foreground hover:text-red-600 hover:bg-red-50"
                                  title="Hapus"
                                  onClick={() => { setDeleteRow(row); setDeleteError(null); }}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between gap-4 px-6 py-4 flex-wrap">
                <p className="text-sm text-muted-foreground">
                  {data
                    ? `Showing ${((page - 1) * pageSize) + 1} to ${Math.min(page * pageSize, data.total)} of ${data.total.toLocaleString("id-ID")} entries`
                    : ""}
                </p>
                <div className="flex items-center gap-1.5">
                  <Button variant="outline" size="sm" className="h-8 px-3 text-sm"
                    onClick={() => setPage((p) => p - 1)} disabled={page <= 1 || isLoading}>
                    Previous
                  </Button>
                  <div className="flex items-center px-2 text-sm font-medium">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded text-xs">{page}</span>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 px-3 text-sm"
                    onClick={() => setPage((p) => p + 1)} disabled={page >= totalPages || isLoading}>
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* ── Modal Edit ──────────────────────────────────────────────────────── */}
      <Dialog open={!!editRow} onOpenChange={(open) => { if (!open) setEditRow(null); }}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Data Wilayah</DialogTitle>
            <DialogDescription>
              {editRow && (
                <span className="font-medium text-foreground">
                  {editRow.region_code} — {editRow.region_name} ({editRow.pencacah_name})
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3 py-2">
            {EDIT_FIELDS.map((f) => (
              <div key={f.key} className={f.key === "total_region" ? "col-span-2" : ""}>
                <Label htmlFor={`edit-${f.key}`} className="text-xs font-medium text-muted-foreground mb-1 block">
                  {f.label}
                </Label>
                <Input
                  id={`edit-${f.key}`}
                  type="number"
                  min={0}
                  value={editForm[f.key] ?? 0}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      [f.key]: Math.max(0, parseInt(e.target.value, 10) || 0),
                    }))
                  }
                  className="h-8 text-sm"
                />
              </div>
            ))}
          </div>

          {editError && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{editError}</AlertDescription>
            </Alert>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setEditRow(null)} disabled={isEditing}>
              Batal
            </Button>
            <Button onClick={handleEdit} disabled={isEditing}>
              {isEditing ? (
                <><RefreshCw className="mr-2 h-4 w-4 animate-spin" />Menyimpan…</>
              ) : "Simpan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Dialog Hapus ────────────────────────────────────────────────────── */}
      <Dialog open={!!deleteRow} onOpenChange={(open) => { if (!open) setDeleteRow(null); }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Hapus Assignment</DialogTitle>
            <DialogDescription>
              Tindakan ini tidak dapat dibatalkan. Assignment berikut akan dihapus permanen beserta seluruh data statusnya.
            </DialogDescription>
          </DialogHeader>

          {deleteRow && (
            <div className="rounded-md bg-muted px-4 py-3 text-sm space-y-1">
              <p><span className="text-muted-foreground">Kode:</span> <span className="font-mono font-medium">{deleteRow.region_code}</span></p>
              <p><span className="text-muted-foreground">Wilayah:</span> {deleteRow.region_name}</p>
              <p><span className="text-muted-foreground">Pencacah:</span> {deleteRow.pencacah_name}</p>
            </div>
          )}

          {deleteError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{deleteError}</AlertDescription>
            </Alert>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteRow(null)} disabled={isDeleting}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? (
                <><RefreshCw className="mr-2 h-4 w-4 animate-spin" />Menghapus…</>
              ) : (
                <><Trash2 className="mr-2 h-4 w-4" />Hapus</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
