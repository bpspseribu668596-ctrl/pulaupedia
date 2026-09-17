"use client";

import { useEffect, useState } from "react";
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
import type { DashboardStats, PencacahSummary } from "@/lib/fasih-db";

interface DashboardData {
  stats: DashboardStats;
  pencacahSummary: PencacahSummary[];
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
    label: "Sub. Respondent",
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
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      {/* Page header */}
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

      {/* Status cards */}
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

      {/* Rekap per Pencacah
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Rekap per Pencacah</CardTitle>
          <CardDescription>
            Distribusi status assignment berdasarkan Pencacah
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : data && data.pencacahSummary.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[180px]">Pencacah</TableHead>
                    <TableHead className="text-center">Asgn</TableHead>
                    <TableHead className="text-center text-emerald-700">Apv</TableHead>
                    <TableHead className="text-center text-yellow-700">Drf</TableHead>
                    <TableHead className="text-center text-blue-700">Opn</TableHead>
                    <TableHead className="text-center text-indigo-700">Sub</TableHead>
                    <TableHead className="text-center text-red-700">Rej</TableHead>
                    <TableHead className="text-center text-orange-700">Rvk</TableHead>
                    <TableHead className="text-center text-purple-700">SubR</TableHead>
                    <TableHead className="text-center text-cyan-700">EdA</TableHead>
                    <TableHead className="text-center text-teal-700">EdS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.pencacahSummary.map((p) => (
                    <TableRow key={p.pencacah_id}>
                      <TableCell className="font-medium">
                        {p.pencacah_name}
                      </TableCell>
                      <TableCell className="text-center tabular-nums">
                        <Badge variant="outline">{p.total_assignments}</Badge>
                      </TableCell>
                      <TableCell className="text-center tabular-nums text-emerald-700 font-medium">
                        {p.total_approved || "—"}
                      </TableCell>
                      <TableCell className="text-center tabular-nums text-yellow-700">
                        {p.total_draft || "—"}
                      </TableCell>
                      <TableCell className="text-center tabular-nums text-blue-700">
                        {p.total_open || "—"}
                      </TableCell>
                      <TableCell className="text-center tabular-nums text-indigo-700">
                        {p.total_submitted || "—"}
                      </TableCell>
                      <TableCell className="text-center tabular-nums text-red-700">
                        {p.total_rejected || "—"}
                      </TableCell>
                      <TableCell className="text-center tabular-nums text-orange-700">
                        {p.total_revoked || "—"}
                      </TableCell>
                      <TableCell className="text-center tabular-nums text-purple-700">
                        {p.total_submitted_respondent || "—"}
                      </TableCell>
                      <TableCell className="text-center tabular-nums text-cyan-700">
                        {p.total_edited_admin || "—"}
                      </TableCell>
                      <TableCell className="text-center tabular-nums text-teal-700">
                        {p.total_edited_supervisor || "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            !error && (
              <p className="text-center text-muted-foreground py-8 text-sm">
                Belum ada data
              </p>
            )
          )}
        </CardContent>
      </Card> */}

      {/* Catatan Pengawas
      <Card className="border-dashed">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Catatan:</span>{" "}
            Rekap per Pengawas belum tersedia karena mapping{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              pengawas_id
            </code>{" "}
            pada data assignment saat ini masih kosong (NULL). Rekap akan tampil
            otomatis setelah mapping Pengawas diisi.
          </p>
        </CardContent>
      </Card> */}
    </div>
  );
}
