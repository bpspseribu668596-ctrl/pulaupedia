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
} from "lucide-react";
import type { DashboardStats } from "@/lib/fasih/db";

interface DashboardData {
  stats: DashboardStats;
}

const STATUS_META = [
  { key: "total_approved" as keyof DashboardStats,              label: "Approved by Pengawas",       icon: CheckCircle2 },
  { key: "total_draft" as keyof DashboardStats,                 label: "Draft",                      icon: FileText },
  { key: "total_open" as keyof DashboardStats,                  label: "Open",                       icon: FolderOpen },
  { key: "total_submitted" as keyof DashboardStats,             label: "Submitted (Pencacah)",        icon: Send },
  { key: "total_rejected" as keyof DashboardStats,              label: "Rejected by Pengawas",       icon: XCircle },
  { key: "total_edited_admin" as keyof DashboardStats,          label: "Edited by Admin Kabupaten",  icon: Edit },
  { key: "total_revoked" as keyof DashboardStats,               label: "Revoked by Pengawas",        icon: RotateCcw },
  { key: "total_submitted_respondent" as keyof DashboardStats,  label: "Submitted Respondent",       icon: UserCheck },
  { key: "total_edited_supervisor" as keyof DashboardStats,     label: "Edited by Pengawas",         icon: Edit },
];

export default function FasihDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // Logika sama dengan monitoring page
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

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Rekap status seluruh assignment FASIH
        </p>
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
          <Skeleton className="h-36 w-full rounded-2xl" />
          <Skeleton className="h-36 w-full rounded-2xl" />
        </div>
      ) : s ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Total assignment */}
          <div
            className="rounded-2xl p-6 flex items-center gap-4 text-white"
            style={{ background: "linear-gradient(135deg, #F9882B 0%, #e07020 100%)" }}
          >
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

          {/* Assignment Tersubmit — sama persis dengan monitoring */}
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
              <span className="text-4xl font-bold tracking-tight" style={{ color: "#F9882B" }}>
                {pct}
              </span>
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
                      { label: "Approved by Pengawas",        value: s.total_approved },
                      { label: "Edited by Admin Kabupaten",   value: s.total_edited_admin },
                      { label: "Submitted (Pencacah)",        value: s.total_submitted },
                      { label: "Submitted Respondent",        value: s.total_submitted_respondent },
                      { label: "Edited by Pengawas",          value: s.total_edited_supervisor },
                      { label: "Rejected by Pengawas",        value: s.total_rejected },
                      { label: "Revoked by Pengawas",         value: s.total_revoked },
                    ].map((item) => {
                      const itemPct = submitted > 0
                        ? ((item.value / submitted) * 100).toFixed(2)
                        : "0";
                      return (
                        <div
                          key={item.label}
                          className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0"
                        >
                          <span className="text-sm text-slate-600">{item.label}</span>
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
                    <p className="text-xs text-gray-500 mt-0.5 leading-tight">
                      {item.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      {/* Info footer */}
      <div className="rounded-xl border border-gray-100 bg-white p-4 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#F9882B]/10 flex items-center justify-center shrink-0">
          <Users className="w-4 h-4 text-[#F9882B]" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">
            FASIH — Field Activity Supervision Information Hub
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            BPS Kabupaten Kepulauan Seribu — Data diperbarui secara real-time dari sistem sumber
          </p>
        </div>
      </div>
    </div>
  );
}
