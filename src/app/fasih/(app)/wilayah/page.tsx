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
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
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

const STATUS_COLS: { key: keyof AssignmentRow; label: string; color: string }[] = [
  { key: "approved",            label: "Apv",  color: "text-emerald-700" },
  { key: "draft",               label: "Drf",  color: "text-yellow-700"  },
  { key: "open",                label: "Opn",  color: "text-blue-700"    },
  { key: "submitted",           label: "Sub",  color: "text-indigo-700"  },
  { key: "rejected",            label: "Rej",  color: "text-red-700"     },
  { key: "edited_admin",        label: "EdA",  color: "text-cyan-700"    },
  { key: "revoked",             label: "Rvk",  color: "text-orange-700"  },
  { key: "submitted_respondent",label: "SubR", color: "text-purple-700"  },
  { key: "edited_supervisor",   label: "EdS",  color: "text-teal-700"    },
];

const PAGE_SIZE = 50;

export default function FasihWilayahPage() {
  const [data, setData]         = useState<WilayahResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]       = useState<string | null>(null);

  // Filters
  const [search, setSearch]         = useState("");
  const [island, setIsland]         = useState("ALL");
  const [pencacahId, setPencacahId] = useState("ALL");
  const [page, setPage]             = useState(1);

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
        pageSize: String(PAGE_SIZE),
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(island !== "ALL"      && { island }),
        ...(pencacahId !== "ALL"  && { pencacahId }),
      });
      const res = await fetch(`/api/fasih/wilayah?${params}`);
      if (!res.ok) throw new Error("Gagal memuat data");
      setData(await res.json());
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, island, pencacahId, page]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Reset page when filters change
  useEffect(() => { setPage(1); }, [debouncedSearch, island, pencacahId]);

  const totalPages = data ? Math.max(1, Math.ceil(data.total / PAGE_SIZE)) : 1;

  const clearFilters = () => {
    setSearch("");
    setIsland("ALL");
    setPencacahId("ALL");
    setPage(1);
  };

  const hasFilters = search || island !== "ALL" || pencacahId !== "ALL";

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
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
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

            {/* Filter Pencacah */}
            <Select value={pencacahId} onValueChange={setPencacahId}>
              <SelectTrigger className="w-full sm:w-52">
                <SelectValue placeholder="Semua Pencacah" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Semua Pencacah</SelectItem>
                {(data?.pencacahList ?? []).map((p) => (
                  <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

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
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[140px]">Kode Wilayah</TableHead>
                      <TableHead className="min-w-[120px]">Pulau</TableHead>
                      <TableHead className="min-w-[160px]">Nama Wilayah</TableHead>
                      <TableHead className="text-center">Total</TableHead>
                      <TableHead className="min-w-[160px]">Pencacah</TableHead>
                      <TableHead className="min-w-[160px]">Pengawas</TableHead>
                      {STATUS_COLS.map((s) => (
                        <TableHead key={s.key} className={`text-center ${s.color} font-semibold`}>
                          {s.label}
                        </TableHead>
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
                          <TableCell className="font-mono text-xs">
                            {row.region_code}
                          </TableCell>
                          <TableCell className="text-sm">
                            {row.island_name}
                          </TableCell>
                          <TableCell className="text-sm font-medium">
                            {row.region_name}
                          </TableCell>
                          <TableCell className="text-center tabular-nums text-sm">
                            {row.total_region.toLocaleString("id-ID")}
                          </TableCell>
                          <TableCell className="text-sm">
                            {row.pencacah_name}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {row.pengawas_name ?? (
                              <Badge variant="outline" className="text-xs text-slate-400">
                                Belum Ditugaskan
                              </Badge>
                            )}
                          </TableCell>
                          {STATUS_COLS.map((s) => {
                            const val = row[s.key] as number;
                            return (
                              <TableCell key={s.key} className={`text-center tabular-nums text-sm ${s.color}`}>
                                {val > 0 ? val : <span className="text-muted-foreground/40">—</span>}
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
              <div className="flex items-center justify-between px-4 py-3 border-t">
                <p className="text-sm text-muted-foreground">
                  {data
                    ? `${((page - 1) * PAGE_SIZE) + 1}–${Math.min(page * PAGE_SIZE, data.total)} dari ${data.total.toLocaleString("id-ID")} assignment`
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
