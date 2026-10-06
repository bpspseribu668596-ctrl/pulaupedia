"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
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
} from "lucide-react";
import type { DashboardStats } from "@/lib/fasih-db";

interface DashboardData {
  stats: DashboardStats;
}

const statusCards = (s: DashboardStats) => [
  {
    label: "Total Assignment",
    value: s.total_assignments,
    icon: Users,
    color: "bg-slate-100 text-slate-700",
  },
  {
    label: "Approved",
    value: s.total_approved,
    icon: CheckCircle2,
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    label: "Draft",
    value: s.total_draft,
    icon: FileText,
    color: "bg-yellow-50 text-yellow-700",
  },
  {
    label: "Open",
    value: s.total_open,
    icon: FolderOpen,
    color: "bg-blue-50 text-blue-700",
  },
  {
    label: "Submitted",
    value: s.total_submitted,
    icon: Send,
    color: "bg-indigo-50 text-indigo-700",
  },
  {
    label: "Rejected",
    value: s.total_rejected,
    icon: XCircle,
    color: "bg-red-50 text-red-700",
  },
  {
    label: "Revoked",
    value: s.total_revoked,
    icon: RotateCcw,
    color: "bg-orange-50 text-orange-700",
  },
  {
    label: "Submitted Respondent",
    value: s.total_submitted_respondent,
    icon: UserCheck,
    color: "bg-purple-50 text-purple-700",
  },
  {
    label: "Edited Admin",
    value: s.total_edited_admin,
    icon: Edit,
    color: "bg-cyan-50 text-cyan-700",
  },
  {
    label: "Edited Supervisor",
    value: s.total_edited_supervisor,
    icon: Edit,
    color: "bg-teal-50 text-teal-700",
  },
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
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Terjadi kesalahan"))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Rekap status seluruh assignment FASIH
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : data ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {statusCards(data.stats).map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.label}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 rounded-md ${card.color}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium truncate">
                      {card.label}
                    </span>
                  </div>
                  <p className="text-2xl font-bold tabular-nums">
                    {card.value.toLocaleString("id-ID")}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
