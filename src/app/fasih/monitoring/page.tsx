"use client";

import { useCallback, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  X,
  MapPin,
  User,
  Users,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  FileText,
  FolderOpen,
  Send,
  XCircle,
  RotateCcw,
  Edit,
  UserCheck,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import type { AssignmentRow, FasihOfficer, DashboardStats } from "@/lib/fasih-db";

interface MonitoringResponse {
  assignments: AssignmentRow[];
  total: number;
  page: number;
  pageSize: number;
  islands: string[];
  pencacahList: FasihOfficer[];
  stats: DashboardStats;        // global (tanpa filter)
  filteredStats: DashboardStats; // sesuai filter aktif
}

const STATUS_META = [
  {
    key: "approved" as keyof AssignmentRow,
    label: "Approved",
    shortLabel: "Apv",
    icon: CheckCircle2,
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    key: "open" as keyof AssignmentRow,
    label: "Open",
    shortLabel: "Opn",
    icon: FolderOpen,
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    key: "draft" as keyof AssignmentRow,
    label: "Draft",
    shortLabel: "Drf",
    icon: FileText,
    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  {
    key: "submitted" as keyof AssignmentRow,
    label: "Submitted (Pencacah)",
    shortLabel: "SubP",
    icon: Send,
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    key: "submitted_respondent" as keyof AssignmentRow,
    label: "Submitted (Respondent)",
    shortLabel: "SubR",
    icon: UserCheck,
    color: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    key: "edited_admin" as keyof AssignmentRow,
    label: "Edited (Admin Kab.)",
    shortLabel: "EdAK",
    icon: Edit,
    color: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
  {
    key: "edited_supervisor" as keyof AssignmentRow,
    label: "Edited (Pengawas)",
    shortLabel: "EdP",
    icon: Edit,
    color: "bg-teal-50 text-teal-700 border-teal-200",
  },
  {
    key: "rejected" as keyof AssignmentRow,
    label: "Rejected (Pengawas)",
    shortLabel: "RejP",
    icon: XCircle,
    color: "bg-red-50 text-red-700 border-red-200",
  },
  {
    key: "revoked" as keyof AssignmentRow,
    label: "Revoked (Pengawas)",
    shortLabel: "RvkP",
    icon: RotateCcw,
    color: "bg-orange-50 text-orange-700 border-orange-200",
  },
] as const;

const SORT_OPTIONS = [
  { value: "approved", label: "Approved" },
  { value: "open", label: "Open" },
  { value: "draft", label: "Draft" },
  { value: "submitted", label: "Submitted" },
  { value: "submitted_respondent", label: "Submitted (Respondent)" },
  { value: "edited_admin", label: "Edited (Admin Kab.)" },
  { value: "edited_supervisor", label: "Edited (Pengawas)" },
  { value: "rejected", label: "Rejected (Pengawas)" },
  { value: "revoked", label: "Revoked (Pengawas)" },
  { value: "total_assignments", label: "Total" },
  { value: "region_code", label: "Kode Wilayah" },
  { value: "region_name", label: "Nama Wilayah" },
  { value: "island_name", label: "Nama Pulau" },
  { value: "pencacah_name", label: "Nama Pencacah" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"] | "";

const PAGE_SIZES = [12, 24, 48];

export default function FasihMonitoringPage() {
  const [data, setData] = useState<MonitoringResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [island, setIsland] = useState("ALL");
  const [sortBy, setSortBy] = useState<SortValue>("");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  // Navbar scroll effect
  useEffect(() => {
    const header = document.getElementById("monitoring-header");
    if (!header) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsScrolled(!entry.isIntersecting),
      {
        threshold: 0,
        rootMargin: "-1px 0px 0px 0px",
      }
    );

    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(island !== "ALL" && { island }),
        ...(sortBy && { sortBy, sortDir }),
      });

      console.log(
        "[fetch]",
        `/api/fasih/public/wilayah?${params.toString()}`
      );
      const res = await fetch(`/api/fasih/public/wilayah?${params}`);

      if (!res.ok) {
        throw new Error("Gagal memuat data");
      }

      setData(await res.json());
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, island, sortBy, sortDir, page, pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setPage(1);
    setSortDir("desc");
  }, [debouncedSearch, island, sortBy, pageSize]);

  const totalPages = data
    ? Math.max(1, Math.ceil(data.total / pageSize))
    : 1;

  const hasFilters = search || island !== "ALL" || sortBy !== "";

  const clearFilters = () => {
    setSearch("");
    setIsland("ALL");
    setSortBy("");
    setSortDir("desc");
    setPage(1);
  };

  const toggleSortDir = () => {
    setSortDir((d) => {
      const newDir = d === "asc" ? "desc" : "asc";
      console.log("Toggle sort direction:", d, "->", newDir);
      return newDir;
    });
  };

  // ── Derived stats untuk hero kiri ──
  const uniqueRegions = data
    ? new Set(data.assignments.map((a) => a.region_code)).size
    : 0;

  const activePencacahCount = data?.pencacahList?.length ?? 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar isScrolled={isScrolled} />

      {/* Hero */}
      <header
        id="monitoring-header"
        className="relative bg-[#333333] border-b-4 border-[#D83F3F] pt-20 pb-10 px-4"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#333333]/90 to-[#333333]/70" />

        <div className="container mx-auto relative z-10">
          {/* Grid 50:50 di md ke atas, stack di mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-center md:items-start gap-8">
            {/* Kiri — branding + quick stats + legend */}
            <div className="text-center md:text-left text-white">
              <p className="text-white/60 text-xs uppercase tracking-widest mb-2">
                Monitoring FASIH
              </p>
              <h1 className="text-white text-2xl sm:text-3xl font-bold tracking-wide">
                Status Assignment Wilayah
              </h1>
              <p className="text-white/60 text-sm mt-2 max-w-md mx-auto md:mx-0">
                Pantau progres pencacahan per wilayah dan per pencacah.
              </p>

              {/* Legend status — Opsi B */}
              <div className="mt-6">
                <p className="text-white/50 text-[11px] uppercase tracking-wider mb-2 text-center md:text-left">
                  Keterangan Status
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {STATUS_META.map((s) => (
                    <span
                      key={s.key}
                      className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border ${s.color}`}
                    >
                      <s.icon className="h-3 w-3 shrink-0" />
                      <span className="font-semibold">{s.shortLabel}</span>
                      <span className="opacity-70">— {s.label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Kanan — card statistik */}
            <div className="w-full">
              <div
                className="rounded-2xl p-6 shadow-sm border hover:shadow-md transition-shadow overflow-hidden relative"
                style={{ background: "#FFF5EC", borderColor: "#FDE6D2" }}
              >
                <div className="flex items-center gap-4">
                  {/* Kiri — teks & metrik */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-lg font-bold leading-snug"
                      style={{ color: "#2D3748" }}
                    >
                      Assignment Tersubmit
                    </p>
                    <p
                      className="mt-1 text-xs leading-relaxed"
                      style={{ color: "#718096" }}
                    >
                      Persentase assignment yang berstatus selain{" "}
                      <span className="font-semibold" style={{ color: "#2D3748" }}>
                        OPEN
                      </span>{" "}
                      dan{" "}
                      <span className="font-semibold" style={{ color: "#2D3748" }}>
                        DRAFT
                      </span>
                      .
                    </p>

                    {/* Hitung dari filteredStats: semua selain open & draft */}
                    {(() => {
                      const s = data?.filteredStats;
                      const submitted = s
                        ? s.total_approved + s.total_edited_admin + s.total_submitted + s.total_submitted_respondent + s.total_rejected + s.total_revoked + s.total_edited_supervisor
                        : 0;
                      // total dokumen = semua status dijumlah
                      const total = s
                        ? s.total_approved + s.total_draft + s.total_open + s.total_submitted + s.total_submitted_respondent + s.total_rejected + s.total_edited_admin + s.total_revoked + s.total_edited_supervisor
                        : 0;
                      const pct = total > 0 ? Math.round((submitted / total) * 100) : 0;
                      const pctWidth = total > 0 ? (submitted / total) * 100 : 0;

                      return (
                        <>
                          <div className="mt-3 flex items-baseline gap-1.5">
                            <span
                              className="text-4xl font-bold tracking-tight"
                              style={{ color: "#F9882B" }}
                            >
                              {isLoading ? "—" : pct}
                            </span>
                            <span
                              className="text-2xl font-bold"
                              style={{ color: "#F9882B" }}
                            >
                              %
                            </span>
                          </div>

                          <div className="mt-1.5 flex items-center gap-1.5">
                            <svg
                              className="w-3.5 h-3.5 shrink-0"
                              style={{ color: "#A0AEC0" }}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            <span className="text-sm" style={{ color: "#718096" }}>
                              {isLoading ? "—" : submitted.toLocaleString("id-ID")} Assignment
                            </span>
                          </div>

                          <div
                            className="mt-3 w-full rounded-full h-1.5 overflow-hidden"
                            style={{ background: "#FDE6D2" }}
                          >
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{ background: "#F9882B", width: `${pctWidth}%` }}
                            />
                          </div>

                          <div className="mt-4">
                            <Dialog>
                              <DialogTrigger asChild>
                                <button
                                  className="inline-flex items-center gap-1 text-xs font-semibold group transition-colors cursor-pointer"
                                  style={{ color: "#F9882B" }}
                                >
                                  Lihat selengkapnya
                                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                </button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle>
                                    Rincian Assignment Tersubmit
                                  </DialogTitle>
                                </DialogHeader>
                                <div className="mt-2 space-y-1">
                                  {s && [
                                    { label: "Approved by Pengawas",         value: s.total_approved },
                                    { label: "Edited by Admin Kabupaten",    value: s.total_edited_admin },
                                    { label: "Submitted (Pencacah)",         value: s.total_submitted },
                                    { label: "Submitted Respondent",         value: s.total_submitted_respondent },
                                    { label: "Edited by Pengawas",           value: s.total_edited_supervisor },
                                    { label: "Rejected by Pengawas",         value: s.total_rejected },
                                    { label: "Revoked by Pengawas",          value: s.total_revoked },
                                  ].map((item) => {
                                    const itemPct = submitted > 0
                                      ? ((item.value / submitted) * 100).toFixed(2)
                                      : "0";
                                    return (
                                      <div
                                        key={item.label}
                                        className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0"
                                      >
                                        <span className="text-sm text-slate-600">
                                          {item.label}
                                        </span>
                                        <div className="text-right shrink-0 ml-4">
                                          <span className="text-sm font-bold text-slate-900">
                                            {item.value.toLocaleString("id-ID")}
                                          </span>
                                          <span className="ml-1.5 text-xs text-slate-400">
                                            ({itemPct}%)
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  })}
                                  <div className="flex items-center justify-between pt-3">
                                    <span className="text-sm font-semibold text-slate-700">
                                      Total Tersubmit
                                    </span>
                                    <span className="text-sm font-bold text-slate-900">
                                      {submitted.toLocaleString("id-ID")}{" "}
                                      <span className="text-xs text-slate-400 font-normal">
                                        ({pct}% dari {total.toLocaleString("id-ID")})
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </>
                      );
                    })()}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats bar */}
      {data && !isLoading && (
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
            <span>
              Menampilkan{" "}
              <strong className="text-foreground">
                {data.assignments.length}
              </strong>{" "}
              dari{" "}
              <strong className="text-foreground">
                {data.total.toLocaleString("id-ID")}
              </strong>{" "}
              wilayah assignment
            </span>

            <span className="text-xs">
              Halaman {page} dari {totalPages}
            </span>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9 h-9 text-sm"
                placeholder="Cari kode, nama wilayah..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Filter pulau */}
            <Select value={island} onValueChange={setIsland}>
              <SelectTrigger className="w-44 h-9 text-sm">
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

            {/* Sort */}
            <div className="flex items-center gap-1.5">
              <Select
                key={sortBy || "empty"}
                value={sortBy || undefined}
                onValueChange={(v) => {
                  setSortBy(v as SortValue);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-48 h-9 text-sm">
                  <span className="truncate text-sm">
                    {SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? (
                      <span className="text-muted-foreground">Urutkan...</span>
                    )}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <button
                onClick={toggleSortDir}
                disabled={!sortBy}
                title={
                  sortDir === "asc"
                    ? "Ascending → klik untuk Descending"
                    : "Descending → klik untuk Ascending"
                }
                className={`flex items-center justify-center h-9 w-9 rounded-md border text-sm font-medium transition-colors ${sortBy
                    ? "bg-white hover:bg-gray-50 text-gray-700 cursor-pointer border-gray-300 hover:border-gray-400"
                    : "bg-gray-50 text-gray-300 cursor-not-allowed border-gray-200"
                  }`}
              >
                {sortDir === "asc" ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Reset */}
            {hasFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-9 px-2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-1" />
                Reset
              </Button>
            )}

            {/* Page size */}
            <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
              <span className="hidden sm:inline">Per halaman</span>
              <Select
                value={String(pageSize)}
                onValueChange={(v) => {
                  setPageSize(parseInt(v, 10));
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-20 h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAGE_SIZES.map((s) => (
                    <SelectItem key={s} value={String(s)}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 flex-1">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm mb-6">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: pageSize }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border p-4 space-y-3"
              >
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-2/3" />

                <div className="grid grid-cols-3 gap-2 pt-2">
                  {Array.from({ length: 6 }).map((_, j) => (
                    <Skeleton key={j} className="h-10 rounded-lg" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : data?.assignments.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <MapPin className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="text-base font-medium">
              Tidak ada data yang sesuai filter
            </p>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="mt-2 text-sm text-[#D83F3F] hover:underline"
              >
                Reset filter
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data?.assignments.map((row) => (
              <AssignmentCard key={row.assignment_id} row={row} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && data && data.total > pageSize && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => p - 1)}
              disabled={page <= 1}
              className="h-9 px-3"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">Sebelumnya</span>
            </Button>

            <div className="flex items-center gap-1">
              {Array.from(
                { length: Math.min(5, totalPages) },
                (_, i) => {
                  let start = Math.max(1, page - 2);
                  const end = Math.min(totalPages, start + 4);
                  start = Math.max(1, end - 4);

                  const p = start + i;
                  if (p > totalPages) return null;

                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-9 h-9 rounded-md text-sm font-medium transition-colors ${p === page
                          ? "bg-[#D83F3F] text-white"
                          : "bg-white border hover:bg-gray-50 text-gray-700"
                        }`}
                    >
                      {p}
                    </button>
                  );
                }
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages}
              className="h-9 px-3"
            >
              <span className="hidden sm:inline mr-1">Berikutnya</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

// ─────────────────────────────────────────────
// Assignment Card
// ─────────────────────────────────────────────

function AssignmentCard({ row }: { row: AssignmentRow }) {
  const totalStatus =
    row.approved +
    row.draft +
    row.open +
    row.submitted +
    row.rejected +
    row.edited_admin +
    row.revoked +
    row.submitted_respondent +
    row.edited_supervisor;

  const approvedPct =
    totalStatus > 0
      ? Math.round((row.approved / totalStatus) * 100)
      : 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-[#D83F3F]/40 hover:shadow-md transition-all flex flex-col">
      {/* Card header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between gap-2 mb-2">
          <code className="text-[10px] font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
            {row.region_code}
          </code>

          {row.island_name && (
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground shrink-0">
              <MapPin className="h-3 w-3" />
              {row.island_name}
            </span>
          )}
        </div>

        <h3 className="font-semibold text-sm text-gray-900 leading-tight mb-3">
          {row.region_name || (
            <span className="text-muted-foreground italic">—</span>
          )}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-1">
          <User className="h-3.5 w-3.5 text-gray-400 shrink-0" />
          <div className="min-w-0">
            <span className="font-medium truncate block">
              {row.pencacah_name}
            </span>
            {row.pencacah_username && (
              <span className="text-muted-foreground truncate block">
                {row.pencacah_username}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Users className="h-3.5 w-3.5 text-gray-400 shrink-0" />
          {row.pengawas_name ? (
            <span className="truncate">{row.pengawas_name}</span>
          ) : (
            <span className="italic text-muted-foreground">
              Belum ada pengawas
            </span>
          )}
        </div>
      </div>

      {/* Total + progress */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-muted-foreground">Total Status</span>
          <span className="font-bold text-gray-900">
            {totalStatus.toLocaleString("id-ID")}
          </span>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${approvedPct}%` }}
          />
        </div>

        <p className="text-[10px] text-muted-foreground mt-1 text-right">
          {approvedPct}% approved
        </p>
      </div>

      {/* Status grid */}
      <div className="grid grid-cols-3 gap-1.5 px-4 pb-4">
        {STATUS_META.map(({ key, label, icon: Icon, color }) => {
          const val = row[key] as number;

          return (
            <div
              key={key}
              title={label}
              className={`flex flex-col items-center justify-center rounded-lg border px-1 py-2 ${color} ${val === 0 ? "opacity-30" : ""
                }`}
            >
              <Icon className="h-3 w-3 mb-0.5" />
              <span className="text-sm font-bold tabular-nums leading-none">
                {val}
              </span>
              <span className="text-[9px] leading-tight mt-0.5 text-center">
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
} 