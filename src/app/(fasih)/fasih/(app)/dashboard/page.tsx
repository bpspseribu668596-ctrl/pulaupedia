"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  TrendingUp,
} from "lucide-react";
import type { DashboardStats } from "@/lib/fasih/db";

interface DashboardData {
  stats: DashboardStats;
}

const statusCards = (s: DashboardStats) => [
  { label: "Total Assignment",      value: s.total_assignments,          icon: Users },
  { label: "Approved",              value: s.total_approved,             icon: CheckCircle2 },
  { label: "Draft",                 value: s.total_draft,                icon: FileText },
  { label: "Open",                  value: s.total_open,                 icon: FolderOpen },
  { label: "Submitted",             value: s.total_submitted,            icon: Send },
  { label: "Rejected",              value: s.total_rejected,             icon: XCircle },
  { label: "Revoked",               value: s.total_revoked,              icon: RotateCcw },
  { label: "Submitted Respondent",  value: s.total_submitted_respondent, icon: UserCheck },
  { label: "Edited Admin",          value: s.total_edited_admin,         icon: Edit },
  { label: "Edited Supervisor",     value: s.total_edited_supervisor,    icon: Edit },
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

  const cards = data ? statusCards(data.stats) : [];
  const total = data?.stats.total_assignments ?? 0;
  const approved = data?.stats.total_approved ?? 0;
  const approvedPct = total > 0 ? Math.round((approved / total) * 100) : 0;

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

      {/* Highlight strip */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Skeleton className="h-28 w-full rounded-2xl" />
          <Skeleton className="h-28 w-full rounded-2xl" />
        </div>
      ) : data ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Total — gradient brand orange */}
          <div
            className="rounded-2xl p-5 flex items-center gap-4 text-white"
            style={{ background: "linear-gradient(135deg, #F9882B 0%, #e07020 100%)" }}
          >
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-orange-100 text-sm font-medium">Total Assignment</p>
              <p className="text-4xl font-bold tabular-nums mt-0.5">
                {total.toLocaleString("id-ID")}
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#F9882B]/10 flex items-center justify-center shrink-0">
              <TrendingUp className="w-7 h-7 text-[#F9882B]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-500 text-sm font-medium">Progress Approved</p>
              <p className="text-4xl font-bold tabular-nums text-gray-900 mt-0.5">
                {approvedPct}%
              </p>
              <div className="mt-2 h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${approvedPct}%`, backgroundColor: "#F9882B" }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Status grid */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Rincian Status
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-2xl" />
            ))}
          </div>
        ) : data ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="group bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-3 hover:border-[#F9882B]/30 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#F9882B]/10 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                    <Icon className="w-4 h-4 text-[#F9882B]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold tabular-nums text-gray-900">
                      {card.value.toLocaleString("id-ID")}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-tight">
                      {card.label}
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
