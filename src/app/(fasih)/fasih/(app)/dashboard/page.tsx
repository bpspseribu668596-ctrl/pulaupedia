"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  FolderOpen,
  Send,
  XCircle,
  RotateCcw,
  Edit,
  UserCheck,
  Users,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
} from "lucide-react";
import type { DashboardStats, PencacahSummary } from "@/lib/fasih/db";

interface DashboardData {
  stats: DashboardStats;
  pencacahSummary: PencacahSummary[];
}

const STATUS_META = [
  { key: "total_approved" as keyof DashboardStats,             label: "Approved by Pengawas",      icon: CheckCircle2 },
  { key: "total_draft" as keyof DashboardStats,                label: "Draft",                     icon: FileText },
  { key: "total_open" as keyof DashboardStats,                 label: "Open",                      icon: FolderOpen },
  { key: "total_submitted" as keyof DashboardStats,            label: "Submitted (Pencacah)",       icon: Send },
  { key: "total_rejected" as keyof DashboardStats,             label: "Rejected by Pengawas",      icon: XCircle },
  { key: "total_edited_admin" as keyof DashboardStats,         label: "Edited by Admin Kabupaten", icon: Edit },
  { key: "total_revoked" as keyof DashboardStats,              label: "Revoked by Pengawas",       icon: RotateCcw },
  { key: "total_submitted_respondent" as keyof DashboardStats, label: "Submitted Respondent",      icon: UserCheck },
  { key: "total_edited_supervisor" as keyof DashboardStats,    label: "Edited by Pengawas",        icon: Edit },
];

// Hitung "sudah" = approved + submitted, "belum" = sisanya
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

type SortKey = "name" | "total" | "sudah" | "belum" | "pctBelum" | "pctSudah";
type SortDir = "asc" | "desc";

export default function FasihDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sort state untuk tabel pencacah
  const [sortKey, setSortKey] = useState<SortKey>("pctBelum");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [tableCollapsed, setTableCollapsed] = useState(false);

  useEffect(() => {
    fetch("/api/fasih/dashboard")
      .then((r) => {
        if (!r.ok) throw new Error("Gagal memuat data");
        return r.json();
      })
      .then(setData)
      .catch((e: unknown) =>
        setError(e instanceof Error ? e.message : "Terjadi kesalahan")
      )
      .finally(() => setIsLoading(false));
  }, []);

  const s = data?.stats;

  const submitted = s
    ? s.total_approved + s.total_edited_admin + s.total_submitted +
      s.total_submitted_respondent + s.total_rejected + s.total_revoked +
      s.total_edited_supervisor
    : 0;
  const totalDocs = s
    ? s.total_approved + s.total_draft + s.total_open + s.total_submitted +
      s.total_submitted_respondent + s.total_rejected + s.total_edited_admin +
      s.total_revoked + s.total_edited_supervisor
    : 0;
  const pct = totalDocs > 0 ? Math.round((submitted / totalDocs) * 100) : 0;
  const pctWidth = totalDocs > 0 ? (submitted / totalDocs) * 100 : 0;

  // Sort pencacah
  const sortedPencacah = data?.pencacahSummary
    ? [...data.pencacahSummary].sort((a, b) => {
        const pa = calcProgress(a);
        const pb = calcProgress(b);
        let valA: number | string;
        let valB: number | string;
        switch (sortKey) {
          case "name":     valA = a.pencacah_name; valB = b.pencacah_name; break;
          case "total":    valA = pa.total;        valB = pb.total;        break;
          case "sudah":    valA = pa.sudah;        valB = pb.sudah;        break;
          case "belum":    valA = pa.belum;        valB = pb.belum;        break;
          case "pctSudah": valA = pa.pctSudah;     valB = pb.pctSudah;     break;
          case "pctBelum": valA = pa.pctBelum;     valB = pb.pctBelum;     break;
          default:         valA = pa.pctBelum;     valB = pb.pctBelum;
        }
        if (typeof valA === "string" && typeof valB === "string") {
          return sortDir === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }
        return sortDir === "asc"
          ? (valA as number) - (valB as number)
          : (valB as number) - (valA as number);
      })
    : [];

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("desc"); }
  };

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k) return <ArrowUpDown className="h-3 w-3 opacity-40" />;
    return sortDir === "asc"
      ? <ArrowUp className="h-3 w-3 text-[#F9882B]" />
      : <ArrowDown className="h-3 w-3 text-[#F9882B]" />;
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Rekap status seluruh assignment FASIH</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Highlight cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Skeleton className="h-44 w-full rounded-2xl" />
          <Skeleton className="h-44 w-full rounded-2xl" />
        </div>
      ) : s ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Total assignment */}
          <div
            className="rounded-2xl p-6 flex flex-col gap-4 text-white"
            style={{ background: "linear-gradient(135deg, #F9882B 0%, #e07020 100%)" }}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-orange-100 text-sm font-medium">Total Assignment</p>
                <p className="text-4xl font-bold tabular-nums mt-0.5">
                  {totalDocs.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
            <div>
              <p className="text-white/50 text-[10px] uppercase tracking-wider mb-1.5">
                Keterangan Status
              </p>
              <div className="flex flex-wrap gap-1">
                {[
                  { short: "Apv",  label: "Approved" },
                  { short: "Opn",  label: "Open" },
                  { short: "Drf",  label: "Draft" },
                  { short: "SubP", label: "Submitted (Pencacah)" },
                  { short: "SubR", label: "Submitted (Respondent)" },
                  { short: "EdAK", label: "Edited (Admin Kab.)" },
                  { short: "EdP",  label: "Edited (Pengawas)" },
                  { short: "RejP", label: "Rejected (Pengawas)" },
                  { short: "RvkP", label: "Revoked (Pengawas)" },
                ].map((st) => (
                  <span
                    key={st.short}
                    className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-white/15 border border-white/20 font-medium"
                  >
                    <span className="font-bold">{st.short}</span>
                    <span className="text-white/60">—</span>
                    <span className="text-white/80">{st.label}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Assignment Tersubmit */}
          <div
            className="rounded-2xl p-6 border"
            style={{ background: "#FFF5EC", borderColor: "#FDE6D2" }}
          >
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
              <span className="text-4xl font-bold tracking-tight" style={{ color: "#F9882B" }}>{pct}</span>
              <span className="text-xl font-bold" style={{ color: "#F9882B" }}>%</span>
            </div>
            <div className="mt-1.5 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 shrink-0" style={{ color: "#A0AEC0" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm" style={{ color: "#718096" }}>
                {submitted.toLocaleString("id-ID")} Assignment
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
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Rincian Assignment Tersubmit</DialogTitle>
                  </DialogHeader>
                  <div className="mt-2 space-y-1">
                    {[
                      { label: "Approved by Pengawas",      value: s.total_approved },
                      { label: "Edited by Admin Kabupaten", value: s.total_edited_admin },
                      { label: "Submitted (Pencacah)",      value: s.total_submitted },
                      { label: "Submitted Respondent",      value: s.total_submitted_respondent },
                      { label: "Edited by Pengawas",        value: s.total_edited_supervisor },
                      { label: "Rejected by Pengawas",      value: s.total_rejected },
                      { label: "Revoked by Pengawas",       value: s.total_revoked },
                    ].map((item) => {
                      const itemPct = submitted > 0
                        ? ((item.value / submitted) * 100).toFixed(2)
                        : "0";
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
      ) : null}

      {/* ── Tabel Progress per Pencacah ── */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">

        {/* Header — klik untuk toggle */}
        <button
          onClick={() => setTableCollapsed((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50/60 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3 text-left">
            <div className="w-7 h-7 rounded-lg bg-[#F9882B]/10 flex items-center justify-center shrink-0">
              <Users className="h-3.5 w-3.5 text-[#F9882B]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Progress per Pencacah</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Sudah = Approved + Submitted · Belum = status lainnya
                {!isLoading && sortedPencacah.length > 0 && (
                  <span className="ml-2 text-gray-300">· {sortedPencacah.length} pencacah</span>
                )}
              </p>
            </div>
          </div>
          <ChevronRight
            className={`h-4 w-4 text-gray-400 shrink-0 transition-transform duration-200 ${
              tableCollapsed ? "" : "rotate-90"
            }`}
          />
        </button>

        {/* Body — collapse/expand */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            tableCollapsed ? "max-h-0" : "max-h-[2000px]"
          }`}
        >
          <div className="border-t border-gray-100">
            {isLoading ? (
              <div className="p-4 space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full rounded-lg" />
                ))}
              </div>
            ) : sortedPencacah.length === 0 ? (
              <p className="text-center text-gray-400 py-10 text-sm">Belum ada data</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50/80 border-b border-gray-100">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 w-8">#</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 min-w-[160px]">
                        <button onClick={() => handleSort("name")} className="flex items-center gap-1.5 hover:text-gray-800 transition-colors">
                          Pencacah <SortIcon k="name" />
                        </button>
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">
                        <button onClick={() => handleSort("total")} className="flex items-center gap-1.5 ml-auto hover:text-gray-800 transition-colors">
                          Total <SortIcon k="total" />
                        </button>
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-emerald-600">
                        <button onClick={() => handleSort("sudah")} className="flex items-center gap-1.5 ml-auto hover:text-emerald-700 transition-colors">
                          Sudah <SortIcon k="sudah" />
                        </button>
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-red-500">
                        <button onClick={() => handleSort("belum")} className="flex items-center gap-1.5 ml-auto hover:text-red-600 transition-colors">
                          Belum <SortIcon k="belum" />
                        </button>
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 min-w-[100px]">
                        <button onClick={() => handleSort("pctSudah")} className="flex items-center gap-1.5 ml-auto hover:text-gray-800 transition-colors">
                          % Sudah <SortIcon k="pctSudah" />
                        </button>
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 min-w-[100px]">
                        <button onClick={() => handleSort("pctBelum")} className="flex items-center gap-1.5 ml-auto hover:text-gray-800 transition-colors">
                          % Belum <SortIcon k="pctBelum" />
                        </button>
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 min-w-[100px]">
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
                          className="border-b border-gray-50 hover:bg-orange-50/20 transition-colors last:border-0"
                        >
                          <td className="px-4 py-3 text-xs text-gray-300 tabular-nums">{idx + 1}</td>
                          <td className="px-4 py-3 font-medium text-gray-900">{p.pencacah_name}</td>
                          <td className="px-4 py-3 text-right tabular-nums text-gray-700 font-semibold">
                            {total.toLocaleString("id-ID")}
                          </td>
                          <td className="px-4 py-3 text-right tabular-nums">
                            <span className="font-semibold text-emerald-600">
                              {sudah.toLocaleString("id-ID")}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right tabular-nums">
                            <span className={`font-semibold ${belum > 0 ? "text-red-500" : "text-gray-300"}`}>
                              {belum > 0 ? belum.toLocaleString("id-ID") : "—"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right tabular-nums">
                            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                              {pctSudah}%
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right tabular-nums">
                            {pctBelum > 0 ? (
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                                pctBelum >= 50
                                  ? "text-red-600 bg-red-50 border-red-100"
                                  : pctBelum >= 25
                                  ? "text-orange-600 bg-orange-50 border-orange-100"
                                  : "text-gray-500 bg-gray-50 border-gray-100"
                              }`}>
                                {pctBelum}%
                              </span>
                            ) : (
                              <span className="text-xs text-gray-300">—</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden min-w-[80px]">
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

      {/* Rincian status */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Rincian Status
        </h2>
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-2xl" />
            ))}
          </div>
        ) : s ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {STATUS_META.map((item) => {
              const Icon = item.icon;
              const value = s[item.key] as number;
              return (
                <div
                  key={item.key}
                  className="group bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-3 hover:border-[#F9882B]/30 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#F9882B]/10 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                    <Icon className="w-4 h-4 text-[#F9882B]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold tabular-nums text-gray-900">
                      {value.toLocaleString("id-ID")}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-tight">{item.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
