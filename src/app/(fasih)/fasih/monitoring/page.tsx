"use client";

import { useCallback, useEffect, useState } from "react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
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
  ArrowUpDown,
  SlidersHorizontal,
} from "lucide-react";
import type { AssignmentRow, FasihOfficer, DashboardStats, PencacahSummary } from "@/lib/fasih/db";

interface MonitoringResponse {
  assignments: AssignmentRow[];
  total: number;
  page: number;
  pageSize: number;
  islands: string[];
  pencacahList: FasihOfficer[];
  stats: DashboardStats;
  filteredStats: DashboardStats;
  pencacahSummary: PencacahSummary[];
}

const STATUS_META = [
  { key: "approved" as keyof AssignmentRow, label: "Approved", shortLabel: "Apv", infoLabel: "Approved", icon: CheckCircle2, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { key: "open" as keyof AssignmentRow, label: "Open", shortLabel: "Opn", infoLabel: "Open", icon: FolderOpen, color: "bg-blue-50 text-blue-700 border-blue-200" },
  { key: "draft" as keyof AssignmentRow, label: "Draft", shortLabel: "Drf", infoLabel: "Draft", icon: FileText, color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  { key: "submitted" as keyof AssignmentRow, label: "Submitted (Pencacah)", shortLabel: "SubP", infoLabel: "Submitted (Pencacah)", icon: Send, color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  { key: "submitted_respondent" as keyof AssignmentRow, label: "Submitted (Resp.)", shortLabel: "SubR", infoLabel: "Submitted (Respondent)", icon: UserCheck, color: "bg-purple-50 text-purple-700 border-purple-200" },
  { key: "edited_admin" as keyof AssignmentRow, label: "Edited (Admin)", shortLabel: "EdAK", infoLabel: "Edited (Admin Kab.)", icon: Edit, color: "bg-cyan-50 text-cyan-700 border-cyan-200" },
  { key: "edited_supervisor" as keyof AssignmentRow, label: "Edited (Pengawas)", shortLabel: "EdP", infoLabel: "Edited (Pengawas)", icon: Edit, color: "bg-teal-50 text-teal-700 border-teal-200" },
  { key: "rejected" as keyof AssignmentRow, label: "Rejected", shortLabel: "RejP", infoLabel: "Rejected (Pengawas)", icon: XCircle, color: "bg-red-50 text-red-700 border-red-200" },
  { key: "revoked" as keyof AssignmentRow, label: "Revoked", shortLabel: "RvkP", infoLabel: "Revoked (Pengawas)", icon: RotateCcw, color: "bg-orange-50 text-orange-700 border-orange-200" },
] as const;

const SORT_OPTIONS = [
  { value: "approved", label: "Approved" },
  { value: "open", label: "Open" },
  { value: "draft", label: "Draft" },
  { value: "submitted", label: "Submitted" },
  { value: "submitted_respondent", label: "Submitted (Resp.)" },
  { value: "edited_admin", label: "Edited (Admin)" },
  { value: "edited_supervisor", label: "Edited (Pengawas)" },
  { value: "rejected", label: "Rejected" },
  { value: "revoked", label: "Revoked" },
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
  const [tableCollapsed, setTableCollapsed] = useState(false);

  const [search, setSearch] = useState("");
  const [island, setIsland] = useState("ALL");
  const [sortBy, setSortBy] = useState<SortValue>("");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    const header = document.getElementById("monitoring-header");
    if (!header) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsScrolled(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-1px 0px 0px 0px" }
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
      const res = await fetch(`/api/fasih/public/wilayah?${params}`);
      if (!res.ok) throw new Error("Gagal memuat data");
      setData(await res.json());
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, island, sortBy, sortDir, page, pageSize]);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    setPage(1);
    setSortDir("desc");
  }, [debouncedSearch, island, sortBy, pageSize]);

  const totalPages = data ? Math.max(1, Math.ceil(data.total / pageSize)) : 1;
  const hasFilters = search || island !== "ALL" || sortBy !== "";

  const clearFilters = () => {
    setSearch("");
    setIsland("ALL");
    setSortBy("");
    setSortDir("desc");
    setPage(1);
  };

  const toggleSortDir = () => setSortDir((d) => d === "asc" ? "desc" : "asc");

  // ── Progress per pencacah ─────────────────────────────────────────────────
  const [pencacahSortKey, setPencacahSortKey] = useState<"name" | "total" | "sudah" | "belum" | "pctBelum" | "pctSudah">("pctBelum");
  const [pencacahSortDir, setPencacahSortDir] = useState<"asc" | "desc">("desc");

  function calcProgress(p: PencacahSummary) {
    const total =
      p.total_approved + p.total_draft + p.total_open + p.total_submitted +
      p.total_submitted_respondent + p.total_rejected + p.total_edited_admin +
      p.total_revoked + p.total_edited_supervisor;
    const sudah = p.total_approved + p.total_submitted;
    const belum = total - sudah;
    const pctSudah = total > 0 ? Math.round((sudah / total) * 100) : 0;
    const pctBelum = total > 0 ? 100 - pctSudah : 0;
    return { total, sudah, belum, pctSudah, pctBelum };
  }

  const sortedPencacah = data?.pencacahSummary
    ? [...data.pencacahSummary].sort((a, b) => {
        const pa = calcProgress(a);
        const pb = calcProgress(b);
        let valA: number | string;
        let valB: number | string;
        switch (pencacahSortKey) {
          case "name":     valA = a.pencacah_name; valB = b.pencacah_name; break;
          case "total":    valA = pa.total;        valB = pb.total;        break;
          case "sudah":    valA = pa.sudah;        valB = pb.sudah;        break;
          case "belum":    valA = pa.belum;        valB = pb.belum;        break;
          case "pctSudah": valA = pa.pctSudah;     valB = pb.pctSudah;     break;
          default:         valA = pa.pctBelum;     valB = pb.pctBelum;
        }
        if (typeof valA === "string" && typeof valB === "string")
          return pencacahSortDir === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
        return pencacahSortDir === "asc"
          ? (valA as number) - (valB as number)
          : (valB as number) - (valA as number);
      })
    : [];

  const handlePencacahSort = (key: typeof pencacahSortKey) => {
    if (pencacahSortKey === key) setPencacahSortDir((d) => d === "asc" ? "desc" : "asc");
    else { setPencacahSortKey(key); setPencacahSortDir("desc"); }
  };

  // Derived stats dari filteredStats
  const s = data?.filteredStats;
  const submitted = s
    ? s.total_approved + s.total_edited_admin + s.total_submitted + s.total_submitted_respondent + s.total_rejected + s.total_revoked + s.total_edited_supervisor
    : 0;
  const totalDocs = s
    ? s.total_approved + s.total_draft + s.total_open + s.total_submitted + s.total_submitted_respondent + s.total_rejected + s.total_edited_admin + s.total_revoked + s.total_edited_supervisor
    : 0;
  const pct = totalDocs > 0 ? Math.round((submitted / totalDocs) * 100) : 0;
  const pctWidth = totalDocs > 0 ? (submitted / totalDocs) * 100 : 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar isScrolled={isScrolled} />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <header
        id="monitoring-header"
        className="relative bg-[#333333] border-b-4 border-[#D83F3F] pt-20 pb-12 px-4 overflow-hidden"
      >
        {/* Dot texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#333333]/90 to-[#333333]/70" />

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">

            {/* Kiri */}
            <div className="text-center md:text-left">
              <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide drop-shadow-xl mb-2">
                Monitoring FASIH
              </h1>
              <p className="text-white/60 text-sm max-w-md mx-auto md:mx-0">
                Status assignment wilayah dan pencacahan — BPS Kabupaten Kepulauan Seribu
              </p>

              {/* Legend — dengan info kode + label lengkap */}
              <div className="mt-6">
                <p className="text-white/40 text-[10px] uppercase tracking-wider mb-2 text-center md:text-left">
                  Keterangan Status
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-1.5">
                  {STATUS_META.map((s) => (
                    <span
                      key={s.key}
                      className={`inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-full border font-medium ${s.color}`}
                    >
                      <s.icon className="h-2.5 w-2.5 shrink-0" />
                      <span className="font-bold">{s.shortLabel}</span>
                      <span className="opacity-60">—</span>
                      <span>{s.infoLabel}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Kanan — card statistik */}
            <div className="w-full">
              <div
                className="rounded-2xl p-6 shadow-sm border hover:shadow-md transition-shadow"
                style={{ background: "#FFF5EC", borderColor: "#FDE6D2" }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold" style={{ color: "#2D3748" }}>
                      Assignment Tersubmit
                    </p>
                    <p className="mt-0.5 text-xs" style={{ color: "#718096" }}>
                      Selain status{" "}
                      <span className="font-semibold" style={{ color: "#2D3748" }}>OPEN</span>
                      {" "}dan{" "}
                      <span className="font-semibold" style={{ color: "#2D3748" }}>DRAFT</span>
                    </p>

                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-4xl font-bold tracking-tight" style={{ color: "#F9882B" }}>
                        {isLoading ? "—" : pct}
                      </span>
                      <span className="text-xl font-bold" style={{ color: "#F9882B" }}>%</span>
                    </div>

                    <div className="mt-1.5 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 shrink-0" style={{ color: "#A0AEC0" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm" style={{ color: "#718096" }}>
                        {isLoading ? "—" : submitted.toLocaleString("id-ID")} Assignment
                      </span>
                    </div>

                    <div className="mt-3 w-full rounded-full h-2 overflow-hidden" style={{ background: "#FDE6D2" }}>
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
                        <DialogContent className="max-w-md z-[100]">
                          <DialogHeader>
                            <DialogTitle>Rincian Assignment Tersubmit</DialogTitle>
                          </DialogHeader>
                          <div className="mt-2 space-y-1">
                            {s && [
                              { label: "Approved by Pengawas", value: s.total_approved },
                              { label: "Edited by Admin Kabupaten", value: s.total_edited_admin },
                              { label: "Submitted (Pencacah)", value: s.total_submitted },
                              { label: "Submitted Respondent", value: s.total_submitted_respondent },
                              { label: "Edited by Pengawas", value: s.total_edited_supervisor },
                              { label: "Rejected by Pengawas", value: s.total_rejected },
                              { label: "Revoked by Pengawas", value: s.total_revoked },
                            ].map((item) => {
                              const itemPct = submitted > 0 ? ((item.value / submitted) * 100).toFixed(2) : "0";
                              return (
                                <div key={item.label} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
                                  <span className="text-sm text-slate-600">{item.label}</span>
                                  <div className="text-right shrink-0 ml-4">
                                    <span className="text-sm font-bold text-slate-900">
                                      {item.value.toLocaleString("id-ID")}
                                    </span>
                                    <span className="ml-1.5 text-xs text-slate-400">({itemPct}%)</span>
                                  </div>
                                </div>
                              );
                            })}
                            <div className="flex items-center justify-between pt-3">
                              <span className="text-sm font-semibold text-slate-700">Total Tersubmit</span>
                              <span className="text-sm font-bold text-slate-900">
                                {submitted.toLocaleString("id-ID")}{" "}
                                <span className="text-xs text-slate-400 font-normal">
                                  ({pct}% dari {totalDocs.toLocaleString("id-ID")})
                                </span>
                              </span>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Stats Bar (putih, di dalam zona putih wave) ───────── */}
      <div className="bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center py-4 sm:py-5 px-2 gap-1.5 animate-pulse"
                >
                  <div className="h-6 sm:h-7 w-12 bg-gray-200 rounded-md" />
                  <div className="h-3 w-20 bg-gray-100 rounded" />
                </div>
              ))
            ) : (
              [
                {
                  value:
                    totalDocs > 0
                      ? totalDocs.toLocaleString("id-ID")
                      : (data?.total.toLocaleString("id-ID") ?? "—"),
                  label: "Total Assignment",
                },
                {
                  value: data?.islands.length ?? "—",
                  label: "Pulau",
                },
                {
                  value: data?.pencacahList.length ?? "—",
                  label: "Pencacah Aktif",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center py-4 sm:py-5 px-2"
                >
                  <span className="text-xl sm:text-2xl font-bold text-[#D83F3F]">
                    {stat.value}
                  </span>
                  <span className="text-[10px] sm:text-xs text-gray-500 mt-0.5 text-center">
                    {stat.label}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── Keterangan Status Bar ─────────────────────────────── */}
      <div className="bg-white">
        <div className="container mx-auto px-4">

          {/* Judul */}
          <div className="pt-3 sm:pt-4 pb-2">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-700">
              Keterangan Status Assignment
            </h3>
          </div>

          <div className="grid grid-cols-3">
            {[
              [
                { short: "Apv", label: "Approved" },
                { short: "Opn", label: "Open" },
                { short: "Drf", label: "Draft" },
              ],
              [
                { short: "SubP", label: "Submitted (Pencacah)" },
                { short: "SubR", label: "Submitted (Respondent)" },
                { short: "EdAK", label: "Edited (Admin Kab.)" },
              ],
              [
                { short: "EdP", label: "Edited (Pengawas)" },
                { short: "RejP", label: "Rejected (Pengawas)" },
                { short: "RvkP", label: "Revoked (Pengawas)" },
              ],
            ].map((group, i) => (
              <div
                key={i}
                className="flex flex-col justify-center py-3 sm:py-4 px-3 gap-1"
              >
              
                {group.map((s) => (
                  <span
                    key={s.short}
                    className="inline-flex items-center gap-1 text-[10px] font-medium text-gray-600"
                  >
                    <span className="font-bold text-gray-800">{s.short}</span>
                    <span className="text-gray-300">—</span>
                    <span>{s.label}</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Wave Divider + Filter Bar (DISATUKAN) ─────────────── */}
      <div className="bg-white">
        {/* SVG wave */}
        <svg
          viewBox="0 0 1440 40"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full"
          preserveAspectRatio="none"
          style={{ height: "40px" }}
        >
          <path d="M0,0 C360,40 1080,40 1440,0 L1440,40 L0,40 Z" fill="#333333" />
        </svg>

        {/* Filter Bar — menyatu di zona gelap wave, controls putih */}
        <div className="bg-[#333333]">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap gap-2 items-center">

              {/* Search — putih */}
              <div className="relative flex-1 min-w-[180px] max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <Input
                  className="pl-8 h-9 text-sm bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus-visible:ring-[#D83F3F]/30"
                  placeholder="Cari kode, nama, pencacah..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Filter pulau — putih, dropdown z-[100] */}
              <Select value={island} onValueChange={setIsland}>
                <SelectTrigger className="w-40 h-9 text-sm bg-white border-gray-200 text-gray-900">
                  <SelectValue placeholder="Semua Pulau" />
                </SelectTrigger>
                <SelectContent className="z-[100]">
                  <SelectItem value="ALL">Semua Pulau</SelectItem>
                  {(data?.islands ?? []).map((isl) => (
                    <SelectItem key={isl} value={isl}>{isl}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort — putih, dropdown z-[100] */}
              <div className="flex items-center gap-1">
                <Select
                  key={sortBy || "empty"}
                  value={sortBy || undefined}
                  onValueChange={(v) => { setSortBy(v as SortValue); setPage(1); }}
                >
                  <SelectTrigger className="w-44 h-9 text-sm bg-white border-gray-200 text-gray-900">
                    <span className="truncate text-sm">
                      {SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? (
                        <span className="text-gray-400">Urutkan...</span>
                      )}
                    </span>
                  </SelectTrigger>
                  <SelectContent className="z-[100]">
                    {SORT_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <button
                  onClick={toggleSortDir}
                  disabled={!sortBy}
                  title={sortDir === "asc" ? "Ascending" : "Descending"}
                  className={`flex items-center justify-center h-9 w-9 rounded-md border text-sm font-medium transition-colors ${sortBy
                    ? "bg-white hover:bg-gray-50 text-gray-700 cursor-pointer border-gray-300"
                    : "bg-gray-50 text-gray-300 cursor-not-allowed border-gray-200"
                    }`}
                >
                  {sortDir === "asc" ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />}
                </button>
              </div>

              {/* Reset — putih */}
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 h-9 px-3 rounded-md text-xs font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 bg-white border border-gray-200 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                  Reset
                </button>
              )}

              {/* Spacer + page size — putih, dropdown z-[100] */}
              <div className="ml-auto flex items-center gap-2">
                <span className="hidden sm:inline text-xs text-white/70">Per halaman</span>
                <Select
                  value={String(pageSize)}
                  onValueChange={(v) => { setPageSize(parseInt(v, 10)); setPage(1); }}
                >
                  <SelectTrigger className="w-20 h-9 text-sm bg-white border-gray-200 text-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="z-[100]">
                    {PAGE_SIZES.map((s) => (
                      <SelectItem key={s} value={String(s)}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active filters indicator */}
            {hasFilters && (
              <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-white/10">
                <SlidersHorizontal className="h-3 w-3 text-white/70" />
                <span className="text-[11px] text-white/70 font-medium">Filter aktif:</span>
                {search && (
                  <span className="inline-flex items-center gap-1 text-[11px] bg-white/10 text-white border border-white/20 rounded-full px-2 py-0.5">
                    "{search}"
                    <button onClick={() => setSearch("")}><X className="h-2.5 w-2.5" /></button>
                  </span>
                )}
                {island !== "ALL" && (
                  <span className="inline-flex items-center gap-1 text-[11px] bg-white/10 text-white border border-white/20 rounded-full px-2 py-0.5">
                    {island}
                    <button onClick={() => setIsland("ALL")}><X className="h-2.5 w-2.5" /></button>
                  </span>
                )}
                {sortBy && (
                  <span className="inline-flex items-center gap-1 text-[11px] bg-white/10 text-white border border-white/20 rounded-full px-2 py-0.5">
                    {SORT_OPTIONS.find((o) => o.value === sortBy)?.label} {sortDir === "asc" ? "↑" : "↓"}
                    <button onClick={() => setSortBy("")}><X className="h-2.5 w-2.5" /></button>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Result info bar ───────────────────────────────────── */}
      {!isLoading && data && (
        <div className="bg-gray-50 border-b border-gray-100">
          <div className="container mx-auto px-4 py-2 flex items-center justify-between text-xs text-gray-500">
            <span>
              Menampilkan{" "}
              <strong className="text-gray-700">{data.assignments.length}</strong>
              {" "}dari{" "}
              <strong className="text-gray-700">{data.total.toLocaleString("id-ID")}</strong>
              {" "}wilayah assignment
            </span>
            <span>Hal. {page} / {totalPages}</span>
          </div>
        </div>
      )}

      {/* ── Content ───────────────────────────────────────────── */}
      <main className="container mx-auto px-4 py-6 flex-1">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm mb-6">
            {error}
          </div>
        )}

        {/* ── Tabel Progress per Pencacah ── */}
        {(isLoading || (sortedPencacah.length > 0)) && (
          <div className="mb-6 rounded-2xl overflow-hidden border border-white/10 bg-[#2a2a2a]">

            {/* Header — klik untuk toggle, style dark */}
            <button
              onClick={() => setTableCollapsed((v) => !v)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-7 h-7 rounded-lg bg-[#F9882B]/20 flex items-center justify-center shrink-0">
                  <Users className="h-3.5 w-3.5 text-[#F9882B]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Progress per Pencacah</p>
                  <p className="text-xs text-white/40 mt-0.5">
                    Sudah = Approved + Submitted · Belum = status lainnya
                    {!isLoading && sortedPencacah.length > 0 && (
                      <span className="ml-2 text-white/25">· {sortedPencacah.length} pencacah</span>
                    )}
                  </p>
                </div>
              </div>
              <ChevronRight
                className={`h-4 w-4 text-white/30 shrink-0 transition-transform duration-200 ${
                  tableCollapsed ? "" : "rotate-90"
                }`}
              />
            </button>

            {/* Body */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                tableCollapsed ? "max-h-0" : "max-h-[2000px]"
              }`}
            >
              <div className="border-t border-white/10">
                {isLoading ? (
                  <div className="p-4 space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="h-10 rounded-lg bg-white/5 animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left px-4 py-3 text-[11px] font-semibold text-white/40 w-8">#</th>
                          <th className="text-left px-4 py-3 text-[11px] font-semibold text-white/40 min-w-[160px]">
                            <button onClick={() => handlePencacahSort("name")} className="flex items-center gap-1.5 hover:text-white/70 transition-colors">
                              Pencacah <SortIcon2 k="name" sk={pencacahSortKey} sd={pencacahSortDir} />
                            </button>
                          </th>
                          <th className="text-right px-4 py-3 text-[11px] font-semibold text-white/40">
                            <button onClick={() => handlePencacahSort("total")} className="flex items-center gap-1.5 ml-auto hover:text-white/70 transition-colors">
                              Total <SortIcon2 k="total" sk={pencacahSortKey} sd={pencacahSortDir} />
                            </button>
                          </th>
                          <th className="text-right px-4 py-3 text-[11px] font-semibold text-emerald-400/70">
                            <button onClick={() => handlePencacahSort("sudah")} className="flex items-center gap-1.5 ml-auto hover:text-emerald-400 transition-colors">
                              Sudah <SortIcon2 k="sudah" sk={pencacahSortKey} sd={pencacahSortDir} />
                            </button>
                          </th>
                          <th className="text-right px-4 py-3 text-[11px] font-semibold text-red-400/70">
                            <button onClick={() => handlePencacahSort("belum")} className="flex items-center gap-1.5 ml-auto hover:text-red-400 transition-colors">
                              Belum <SortIcon2 k="belum" sk={pencacahSortKey} sd={pencacahSortDir} />
                            </button>
                          </th>
                          <th className="text-right px-4 py-3 text-[11px] font-semibold text-white/40 min-w-[100px]">
                            <button onClick={() => handlePencacahSort("pctSudah")} className="flex items-center gap-1.5 ml-auto hover:text-white/70 transition-colors">
                              % Sudah <SortIcon2 k="pctSudah" sk={pencacahSortKey} sd={pencacahSortDir} />
                            </button>
                          </th>
                          <th className="text-right px-4 py-3 text-[11px] font-semibold text-white/40 min-w-[100px]">
                            <button onClick={() => handlePencacahSort("pctBelum")} className="flex items-center gap-1.5 ml-auto hover:text-white/70 transition-colors">
                              % Belum <SortIcon2 k="pctBelum" sk={pencacahSortKey} sd={pencacahSortDir} />
                            </button>
                          </th>
                          <th className="px-4 py-3 text-[11px] font-semibold text-white/40 min-w-[100px]">
                            Progress
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedPencacah.map((p, idx) => {
                          const { total, sudah, belum, pctSudah, pctBelum } = calcProgress(p);
                          return (
                            <tr
                              key={p.pencacah_id}
                              className="border-b border-white/5 hover:bg-white/5 transition-colors last:border-0"
                            >
                              <td className="px-4 py-3 text-xs text-white/20 tabular-nums">{idx + 1}</td>
                              <td className="px-4 py-3 font-medium text-white/80">{p.pencacah_name}</td>
                              <td className="px-4 py-3 text-right tabular-nums text-white/60 font-semibold">
                                {total.toLocaleString("id-ID")}
                              </td>
                              <td className="px-4 py-3 text-right tabular-nums">
                                <span className="font-semibold text-emerald-400">
                                  {sudah.toLocaleString("id-ID")}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right tabular-nums">
                                <span className={`font-semibold ${belum > 0 ? "text-red-400" : "text-white/20"}`}>
                                  {belum > 0 ? belum.toLocaleString("id-ID") : "—"}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right tabular-nums">
                                <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full">
                                  {pctSudah}%
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right tabular-nums">
                                {pctBelum > 0 ? (
                                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                                    pctBelum >= 50
                                      ? "text-red-400 bg-red-400/10 border-red-400/20"
                                      : pctBelum >= 25
                                      ? "text-orange-400 bg-orange-400/10 border-orange-400/20"
                                      : "text-white/40 bg-white/5 border-white/10"
                                  }`}>
                                    {pctBelum}%
                                  </span>
                                ) : (
                                  <span className="text-xs text-white/20">—</span>
                                )}
                              </td>
                              <td className="px-4 py-3">
                                <div className="h-2 rounded-full bg-white/10 overflow-hidden min-w-[80px]">
                                  <div
                                    className="h-full rounded-full bg-emerald-400 transition-all duration-500"
                                    style={{ width: `${pctSudah}%` }}
                                  />
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: pageSize }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-2/3" />
                <Skeleton className="h-2 w-full rounded-full" />
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  {Array.from({ length: 9 }).map((_, j) => (
                    <Skeleton key={j} className="h-12 rounded-xl" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : data?.assignments.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 opacity-30" />
            </div>
            <p className="text-base font-semibold text-gray-600 mb-1">
              Tidak ada data ditemukan
            </p>
            <p className="text-sm text-gray-400 mb-4">
              Coba ubah atau reset filter pencarian
            </p>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#D83F3F] hover:underline"
              >
                <X className="h-3.5 w-3.5" />
                Reset semua filter
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
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page <= 1}
              className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Sebelumnya</span>
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let start = Math.max(1, page - 2);
                const end = Math.min(totalPages, start + 4);
                start = Math.max(1, end - 4);
                const p = start + i;
                if (p > totalPages) return null;
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${p === page
                      ? "bg-[#D83F3F] text-white shadow-sm"
                      : "bg-white border border-gray-200 hover:bg-gray-50 text-gray-700"
                      }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages}
              className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span className="hidden sm:inline">Berikutnya</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

// ─────────────────────────────────────────────
// Sort Icon helper untuk tabel pencacah
// ─────────────────────────────────────────────

function SortIcon2({
  k, sk, sd,
}: {
  k: string;
  sk: string;
  sd: "asc" | "desc";
}) {
  if (sk !== k) return <ArrowUpDown className="h-3 w-3 opacity-30" />;
  return sd === "asc"
    ? <ArrowUp className="h-3 w-3 text-[#F9882B]" />
    : <ArrowDown className="h-3 w-3 text-[#F9882B]" />;
}

// ─────────────────────────────────────────────
// Assignment Card
// ─────────────────────────────────────────────

function AssignmentCard({ row }: { row: AssignmentRow }) {
  const totalStatus =
    row.approved + row.draft + row.open + row.submitted +
    row.rejected + row.edited_admin + row.revoked +
    row.submitted_respondent + row.edited_supervisor;

  const approvedPct = totalStatus > 0
    ? Math.round((row.approved / totalStatus) * 100)
    : 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 hover:border-[#D83F3F]/30 hover:shadow-lg transition-all duration-200 flex flex-col group">

      {/* Header */}
      <div className="p-4 pb-3">
        {/* Kode + Pulau */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <code className="text-[10px] font-mono bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md">
            {row.region_code}
          </code>
          {row.island_name && (
            <span className="flex items-center gap-1 text-[10px] text-gray-400 shrink-0">
              <MapPin className="h-2.5 w-2.5" />
              {row.island_name}
            </span>
          )}
        </div>

        {/* Nama wilayah */}
        <h3 className="font-semibold text-sm text-gray-900 leading-tight mb-3 line-clamp-2">
          {row.region_name || <span className="text-gray-400 italic">—</span>}
        </h3>

        {/* Pencacah */}
        <div className="flex items-start gap-2 mb-1.5">
          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
            <User className="h-3 w-3 text-blue-500" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-700 truncate">{row.pencacah_name}</p>
            {row.pencacah_username && (
              <p className="text-[10px] text-gray-400 truncate">@{row.pencacah_username}</p>
            )}
          </div>
        </div>

        {/* Pengawas */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
            <Users className="h-3 w-3 text-purple-500" />
          </div>
          <p className="text-xs text-gray-500 truncate">
            {row.pengawas_name || <span className="italic text-gray-300">Belum ada pengawas</span>}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="px-4 pb-3">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-gray-400 font-medium">Total</span>
          <span className="font-bold text-gray-800">{totalStatus.toLocaleString("id-ID")}</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${approvedPct}%` }}
          />
        </div>
        <p className="text-[10px] text-gray-400 mt-1 text-right">{approvedPct}% approved</p>
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-gray-100" />

      {/* Status grid — pakai infoLabel juga biar konsisten */}
      <div className="grid grid-cols-3 gap-1.5 p-3">
        {STATUS_META.map(({ key, label, icon: Icon, color }) => {
          const val = row[key] as number;
          return (
            <div
              key={key}
              title={label}
              className={`flex flex-col items-center justify-center rounded-xl border py-2 px-1 transition-opacity ${color} ${val === 0 ? "opacity-25" : ""}`}
            >
              <Icon className="h-3 w-3 mb-0.5" />
              <span className="text-sm font-bold tabular-nums leading-none">{val}</span>
              <span className="text-[8px] leading-tight mt-0.5 text-center opacity-80 line-clamp-1">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}