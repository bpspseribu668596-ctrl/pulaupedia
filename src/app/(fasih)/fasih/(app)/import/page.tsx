"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  CheckCircle2,
  Upload,
  FileText,
  RefreshCw,
  XCircle,
  AlertTriangle,
  Info,
  Download,
  FileUp,
  Clock,
  Copy,
  ClipboardCheck,
} from "lucide-react";

async function downloadTemplate() {
  const res = await fetch("/api/fasih/export");
  if (!res.ok) {
    alert("Gagal download template. Coba lagi.");
    return;
  }
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const disposition = res.headers.get("Content-Disposition") ?? "";
  const match = disposition.match(/filename="?([^"]+)"?/);
  a.download = match?.[1] ?? "template_fasih.csv";
  a.click();
  URL.revokeObjectURL(url);
}

interface ImportRecord {
  id: string;
  file_name: string;
  imported_by: string | null;
  total_rows: number;
  success_rows: number;
  failed_rows: number;
  status: "processing" | "completed" | "completed_with_errors" | "failed";
  error_message: string | null;
  created_at: string;
}

interface ImportError {
  id: string;
  row_number: number;
  error_type: string;
  error_message: string;
  raw_data: Record<string, string> | null;
}

const STATUS_META: Record<
  ImportRecord["status"],
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
    icon: React.ReactNode;
    badgeClass: string;
  }
> = {
  processing: {
    label: "Sedang Diproses",
    variant: "secondary",
    icon: <RefreshCw className="h-3 w-3 animate-spin" />,
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
  },
  completed: {
    label: "Selesai",
    variant: "default",
    icon: <CheckCircle2 className="h-3 w-3" />,
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  completed_with_errors: {
    label: "Selesai (ada error)",
    variant: "outline",
    icon: <AlertTriangle className="h-3 w-3" />,
    badgeClass: "bg-orange-50 text-orange-700 border-orange-200",
  },
  failed: {
    label: "Gagal",
    variant: "destructive",
    icon: <XCircle className="h-3 w-3" />,
    badgeClass: "bg-red-50 text-red-700 border-red-200",
  },
};

export default function FasihImportPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [imports, setImports] = useState<ImportRecord[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [listError, setListError] = useState<string | null>(null);

  // Upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{
    success: boolean;
    message: string;
    successRows?: number;
    failedRows?: number;
    importId?: string;
  } | null>(null);

  // Progress polling state
  const [progressImportId, setProgressImportId] = useState<string | null>(null);
  const [progress, setProgress] = useState<{
    processed: number;
    total: number;
    success: number;
    failed: number;
    done: boolean;
    status: string;
  } | null>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Error detail dialog
  const [errorDialogId, setErrorDialogId] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<ImportError[]>([]);
  const [isLoadingErrors, setIsLoadingErrors] = useState(false);

  const fetchImports = useCallback(async () => {
    try {
      const res = await fetch("/api/fasih/import");
      if (!res.ok) throw new Error("Gagal memuat riwayat");
      const data = await res.json();
      setImports(data.imports ?? []);
    } catch (e: unknown) {
      setListError(e instanceof Error ? e.message : "Terjadi kesalahan");
    } finally {
      setIsLoadingList(false);
    }
  }, []);

  useEffect(() => {
    fetchImports();
  }, [fetchImports]);

  // ── Polling progress ──────────────────────────────────────────────────────
  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  const startPolling = useCallback((importId: string) => {
    setProgressImportId(importId);
    setProgress({ processed: 0, total: 0, success: 0, failed: 0, done: false, status: "processing" });

    pollingRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/fasih/import/${importId}/progress`);
        if (!res.ok) { stopPolling(); return; }
        const data = await res.json();

        setProgress({
          processed: data.processed,
          total:     data.total,
          success:   data.success,
          failed:    data.failed,
          done:      data.done,
          status:    data.status,
        });

        if (data.done) {
          stopPolling();
          setIsUploading(false);
          setProgressImportId(null);
          setUploadResult({
            success: data.status !== "failed",
            message: `Import selesai — ${data.success} baris berhasil, ${data.failed} baris gagal.`,
            successRows: data.success,
            failedRows:  data.failed,
            importId,
          });
          fetchImports();
        }
      } catch {
        stopPolling();
      }
    }, 1000);
  }, [stopPolling, fetchImports]);

  // Bersihkan interval saat unmount
  useEffect(() => () => stopPolling(), [stopPolling]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f && (f.name.endsWith(".csv") || f.name.endsWith(".xlsx")))
      setSelectedFile(f);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setSelectedFile(f);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    setUploadResult(null);

    try {
      const fd = new FormData();
      fd.append("file", selectedFile);
      const res = await fetch("/api/fasih/import", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) {
        setUploadResult({ success: false, message: data.error ?? "Upload gagal" });
      } else {
        setUploadResult({
          success: true,
          message: `Import selesai — ${data.successRows} baris berhasil, ${data.failedRows} baris gagal.`,
          successRows: data.successRows,
          failedRows: data.failedRows,
          importId: data.importId,
        });
        setSelectedFile(null);
        if (fileRef.current) fileRef.current.value = "";
        fetchImports();
      }
    } catch {
      setUploadResult({
        success: false,
        message: "Terjadi kesalahan saat upload",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const openErrorDetail = async (id: string) => {
    setErrorDialogId(id);
    setIsLoadingErrors(true);
    try {
      const res = await fetch(`/api/fasih/import/${id}/errors`);
      const data = await res.json();
      setErrorDetails(data.errors ?? []);
    } catch {
      setErrorDetails([]);
    } finally {
      setIsLoadingErrors(false);
    }
  };

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Import Data
        </h1>
        <p className="text-sm text-gray-500">
          Upload file CSV atau XLSX untuk memperbarui data assignment dan status wilayah
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column — upload + format guide */}
        <div className="lg:col-span-2 space-y-5">

          {/* Upload card */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Upload File
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Format: .csv atau .xlsx · Maks. 10 MB
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1.5 text-xs border-gray-200 hover:bg-gray-50 shrink-0"
                onClick={() => void downloadTemplate()}
              >
                <Download className="h-3.5 w-3.5" />
                Template
              </Button>
            </div>

            <div className="p-5 space-y-4">
              {/* Drop zone */}
              <div
                className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center transition-all cursor-pointer select-none
                  ${
                    isDragging
                      ? "border-[#F9882B] bg-orange-50"
                      : selectedFile
                      ? "border-emerald-300 bg-emerald-50"
                      : "border-gray-200 hover:border-[#F9882B]/50 hover:bg-orange-50/30"
                  }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
              >
                {selectedFile ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {(selectedFile.size / 1024).toFixed(1)} KB — siap diupload
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "#F9882B1A" }}
                    >
                      <FileUp className="h-6 w-6" style={{ color: "#F9882B" }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        Drag & drop file di sini
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        atau{" "}
                        <span
                          className="font-semibold underline underline-offset-2"
                          style={{ color: "#F9882B" }}
                        >
                          klik untuk memilih file
                        </span>
                      </p>
                    </div>
                  </div>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept=".csv,.xlsx"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </div>

              {/* Upload result */}
              {uploadResult && (
                <Alert
                  variant={uploadResult.success ? "default" : "destructive"}
                  className={
                    uploadResult.success
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : ""
                  }
                >
                  {uploadResult.success ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertDescription className="space-y-1">
                    <p className="font-medium">
                      {uploadResult.success ? "Import Berhasil" : "Import Gagal"}
                    </p>
                    <p className="text-sm">{uploadResult.message}</p>
                    {uploadResult.failedRows != null &&
                      uploadResult.failedRows > 0 &&
                      uploadResult.importId && (
                        <button
                          className="text-sm underline underline-offset-2 font-medium"
                          onClick={() => openErrorDetail(uploadResult.importId!)}
                        >
                          Lihat detail error ({uploadResult.failedRows} baris)
                        </button>
                      )}
                  </AlertDescription>
                </Alert>
              )}

              {/* Progress */}
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Sedang memproses file…</span>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  </div>
                  <Progress value={undefined} className="h-2 animate-pulse" />
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={handleUpload}
                  disabled={!selectedFile || isUploading}
                  className="flex-1 sm:flex-none text-white font-semibold"
                  style={
                    selectedFile && !isUploading
                      ? { backgroundColor: "#F9882B" }
                      : {}
                  }
                >
                  {isUploading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Memproses…
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Mulai Import
                    </>
                  )}
                </Button>
                {selectedFile && !isUploading && (
                  <Button
                    variant="outline"
                    className="border-gray-200"
                    onClick={() => {
                      setSelectedFile(null);
                      setUploadResult(null);
                      if (fileRef.current) fileRef.current.value = "";
                    }}
                  >
                    Batal
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right column — format guide */}
        <div className="space-y-5">
          <FormatGuide />
        </div>
      </div>

      {/* Import history */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#F9882B1A" }}
            >
              <Clock className="h-3.5 w-3.5" style={{ color: "#F9882B" }} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Riwayat Import
              </h2>
              <p className="text-xs text-gray-400">50 import terakhir</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchImports}
            disabled={isLoadingList}
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            <RefreshCw
              className={`h-4 w-4 text-gray-500 ${isLoadingList ? "animate-spin" : ""}`}
            />
          </Button>
        </div>

        {listError && (
          <div className="p-5">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{listError}</AlertDescription>
            </Alert>
          </div>
        )}

        {isLoadingList ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/80 hover:bg-gray-50/80">
                  <TableHead className="font-semibold text-gray-600 min-w-[200px]">
                    Nama File
                  </TableHead>
                  <TableHead className="font-semibold text-gray-600 text-center">
                    Total
                  </TableHead>
                  <TableHead className="font-semibold text-emerald-700 text-center">
                    Berhasil
                  </TableHead>
                  <TableHead className="font-semibold text-red-600 text-center">
                    Gagal
                  </TableHead>
                  <TableHead className="font-semibold text-gray-600">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-gray-600 min-w-[150px]">
                    Waktu
                  </TableHead>
                  <TableHead className="w-24 font-semibold text-gray-600">
                    Detail
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {imports.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center text-gray-400 py-14 text-sm"
                    >
                      Belum ada riwayat import
                    </TableCell>
                  </TableRow>
                ) : (
                  imports.map((imp) => {
                    const meta = STATUS_META[imp.status];
                    return (
                      <TableRow
                        key={imp.id}
                        className="hover:bg-orange-50/20 transition-colors"
                      >
                        <TableCell className="font-medium text-sm text-gray-900">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-300 shrink-0" />
                            <span className="truncate max-w-[200px]">
                              {imp.file_name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center tabular-nums text-gray-700">
                          {imp.total_rows}
                        </TableCell>
                        <TableCell className="text-center tabular-nums">
                          <span className="font-semibold text-emerald-600">
                            {imp.success_rows}
                          </span>
                        </TableCell>
                        <TableCell className="text-center tabular-nums">
                          {imp.failed_rows > 0 ? (
                            <span className="font-semibold text-red-600">
                              {imp.failed_rows}
                            </span>
                          ) : (
                            <span className="text-gray-200">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${meta.badgeClass}`}
                          >
                            {meta.icon}
                            {meta.label}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-gray-400">
                          {fmtDate(imp.created_at)}
                        </TableCell>
                        <TableCell>
                          {imp.failed_rows > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
                              onClick={() => openErrorDetail(imp.id)}
                            >
                              Lihat Error
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Error detail dialog */}
      <Dialog
        open={!!errorDialogId}
        onOpenChange={(o: boolean) => {
          if (!o) setErrorDialogId(null);
        }}
      >
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-lg">Detail Error Import</DialogTitle>
            <DialogDescription>
              Daftar baris yang gagal diproses
            </DialogDescription>
          </DialogHeader>

          {isLoadingErrors ? (
            <div className="space-y-3 py-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full rounded-lg" />
              ))}
            </div>
          ) : errorDetails.length === 0 ? (
            <p className="text-center text-gray-400 py-10 text-sm">
              Tidak ada detail error
            </p>
          ) : (
            <div className="overflow-y-auto flex-1">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/80 hover:bg-gray-50/80">
                    <TableHead className="w-20 font-semibold text-gray-600">
                      Baris
                    </TableHead>
                    <TableHead className="w-40 font-semibold text-gray-600">
                      Tipe Error
                    </TableHead>
                    <TableHead className="font-semibold text-gray-600">
                      Pesan Error
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {errorDetails.map((e) => (
                    <TableRow key={e.id} className="hover:bg-red-50/20">
                      <TableCell className="tabular-nums font-mono text-sm text-gray-600">
                        {e.row_number}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                          {e.error_type}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {e.error_message}
                        {e.raw_data && (
                          <details className="mt-1.5">
                            <summary className="text-xs cursor-pointer text-gray-400 hover:text-gray-600">
                              Lihat data mentah
                            </summary>
                            <pre className="text-xs mt-1.5 bg-gray-50 border border-gray-100 p-2.5 rounded-lg overflow-x-auto whitespace-pre-wrap break-all text-gray-500">
                              {JSON.stringify(e.raw_data, null, 2)}
                            </pre>
                          </details>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Format Guide Component ───────────────────────────────────────────────────

const FORMAT_A_HEADERS = [
  "username", "nama", "regionCode", "islandName", "regionName",
  "totalRegion", "APPROVED BY Pengawas", "DRAFT", "OPEN",
  "SUBMITTED BY Pencacah", "REJECTED BY Pengawas",
  "EDITED BY Admin Kabupaten", "REVOKED BY Pengawas",
  "SUBMITTED RESPONDENT", "EDITED BY Pengawas",
];

const FORMAT_B_HEADERS = [
  "userId", "username", "email", "roleName",
  "totalPetugas", "regionCode", "totalRegion", "statusBreakdown",
];

function CopyHeaderButton({ headers, label }: { headers: string[]; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    // Tab-separated — paste ke Excel/Sheets langsung jadi satu baris, tiap header di kolom tersendiri
    const text = headers.join("\t");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback untuk browser yang tidak support clipboard API
      const el = document.createElement("textarea");
      el.value = text;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all ${
        copied
          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
          : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-[#F9882B]/10 hover:text-[#F9882B] hover:border-[#F9882B]/30"
      }`}
    >
      {copied ? (
        <ClipboardCheck className="h-3.5 w-3.5" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
      {copied ? "Tersalin!" : label}
    </button>
  );
}

function FormatGuide() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: "#F9882B1A" }}
        >
          <Info className="h-3.5 w-3.5" style={{ color: "#F9882B" }} />
        </div>
        <h2 className="text-sm font-semibold text-gray-900">
          Format yang Didukung
        </h2>
      </div>
      <div className="p-5 space-y-5">

        {/* Format A */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-gray-700">
              Format A — Lengkap
            </p>
            <CopyHeaderButton headers={FORMAT_A_HEADERS} label="Salin Header" />
          </div>
          <div className="bg-gray-50 rounded-lg p-3 overflow-x-auto">
            <div className="flex gap-1.5 flex-wrap">
              {FORMAT_A_HEADERS.map((h) => (
                <code key={h} className="text-[10px] bg-white border border-gray-200 text-gray-600 px-1.5 py-0.5 rounded whitespace-nowrap">
                  {h}
                </code>
              ))}
            </div>
          </div>
          <p className="text-[10px] text-gray-400 mt-1.5 leading-relaxed">
            Klik "Salin Header" → buka Excel/Sheets → klik sel <strong>A1</strong> → Paste.
            Header langsung tersebar ke tiap kolom.
          </p>
        </div>

        {/* Format B */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-gray-700">
              Format B — Dari Sistem Sumber
            </p>
            <CopyHeaderButton headers={FORMAT_B_HEADERS} label="Salin Header" />
          </div>
          <div className="bg-gray-50 rounded-lg p-3 overflow-x-auto">
            <div className="flex gap-1.5 flex-wrap">
              {FORMAT_B_HEADERS.map((h) => (
                <code key={h} className="text-[10px] bg-white border border-gray-200 text-gray-600 px-1.5 py-0.5 rounded whitespace-nowrap">
                  {h}
                </code>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
            Kolom <code className="bg-gray-100 px-1 rounded text-gray-600">statusBreakdown</code> diisi seperti:{" "}
            <code className="bg-gray-100 px-1 rounded text-gray-600">OPEN:10 | SUBMITTED BY Pencacah:5</code>
          </p>
        </div>

        {/* Rules */}
        <div className="space-y-1.5 pt-1 border-t border-gray-100">
          {[
            "Format file: .csv atau .xlsx",
            "Nama header tidak peka huruf besar/kecil",
            "regionCode diperlakukan sebagai teks",
            "islandName dan regionName boleh kosong",
            "Import bersifat idempotent — data yang ada akan diperbarui",
          ].map((rule, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-xs text-gray-500 leading-snug">{rule}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
