"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
} from "lucide-react";

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
  { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ReactNode }
> = {
  processing: {
    label: "Sedang Diproses",
    variant: "secondary",
    icon: <RefreshCw className="h-3 w-3 animate-spin" />,
  },
  completed: {
    label: "Selesai",
    variant: "default",
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
  completed_with_errors: {
    label: "Selesai (ada error)",
    variant: "outline",
    icon: <AlertTriangle className="h-3 w-3 text-orange-500" />,
  },
  failed: {
    label: "Gagal",
    variant: "destructive",
    icon: <XCircle className="h-3 w-3" />,
  },
};

export default function FasihImportPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [imports, setImports]   = useState<ImportRecord[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [listError, setListError] = useState<string | null>(null);

  // Upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging]     = useState(false);
  const [isUploading, setIsUploading]   = useState(false);
  const [uploadResult, setUploadResult] = useState<{
    success: boolean;
    message: string;
    successRows?: number;
    failedRows?: number;
    importId?: string;
  } | null>(null);

  // Error detail dialog
  const [errorDialogId, setErrorDialogId]     = useState<string | null>(null);
  const [errorDetails, setErrorDetails]       = useState<ImportError[]>([]);
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

  useEffect(() => { fetchImports(); }, [fetchImports]);

  // ── Drag & Drop ────────────────────────────────────────────────────────────
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f && f.name.endsWith(".csv")) setSelectedFile(f);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setSelectedFile(f);
  };

  // ── Upload ─────────────────────────────────────────────────────────────────
  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    setUploadResult(null);

    try {
      const fd = new FormData();
      fd.append("file", selectedFile);

      const res  = await fetch("/api/fasih/import", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) {
        setUploadResult({ success: false, message: data.error ?? "Upload gagal" });
      } else {
        setUploadResult({
          success:     true,
          message:     `Import selesai — ${data.successRows} baris berhasil, ${data.failedRows} baris gagal.`,
          successRows: data.successRows,
          failedRows:  data.failedRows,
          importId:    data.importId,
        });
        setSelectedFile(null);
        if (fileRef.current) fileRef.current.value = "";
        fetchImports();
      }
    } catch {
      setUploadResult({ success: false, message: "Terjadi kesalahan saat upload" });
    } finally {
      setIsUploading(false);
    }
  };

  // ── Error detail ───────────────────────────────────────────────────────────
  const openErrorDetail = async (id: string) => {
    setErrorDialogId(id);
    setIsLoadingErrors(true);
    try {
      const res  = await fetch(`/api/fasih/import/${id}/errors`);
      const data = await res.json();
      setErrorDetails(data.errors ?? []);
    } catch {
      setErrorDetails([]);
    } finally {
      setIsLoadingErrors(false);
    }
  };

  // ── Helpers ────────────────────────────────────────────────────────────────
  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleString("id-ID", {
      day:    "2-digit",
      month:  "short",
      year:   "numeric",
      hour:   "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Import Data</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Upload file CSV untuk memperbarui data assignment dan status wilayah
        </p>
      </div>

      {/* ── Format panduan ────────────────────────────────────────────────── */}
      <Card className="border-dashed">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm font-medium">Format CSV yang Diperlukan</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <code className="text-xs text-muted-foreground whitespace-nowrap">
              username, name, regionCode, islandName, regionName, totalRegion,
              approved, draft, open, submitted, rejected, editedAdmin, revoked,
              submittedRespondent, editedSupervisor
            </code>
          </div>
          <ul className="mt-3 space-y-1 text-xs text-muted-foreground list-disc list-inside">
            <li>Header tidak peka huruf besar/kecil dan spasi</li>
            <li>
              <code className="bg-muted px-1 rounded">regionCode</code> diperlakukan
              sebagai teks (gunakan tanda kutip jika dimulai angka 0)
            </li>
            <li>Kolom status harus berupa angka bulat ≥ 0</li>
            <li>
              Import bersifat <strong>idempotent</strong> — data yang sudah ada
              akan diperbarui, bukan digandakan
            </li>
            <li>Mapping Pengawas <em>tidak diisi otomatis</em> dari import ini</li>
          </ul>
        </CardContent>
      </Card>

      {/* ── Upload area ───────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Upload File CSV</CardTitle>
          <CardDescription>Format: .csv · Maks. 10 MB</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Drag & Drop zone */}
          <div
            className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 text-center transition-colors cursor-pointer
              ${isDragging ? "border-emerald-500 bg-emerald-50" : "border-muted-foreground/25 hover:border-muted-foreground/50"}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
          >
            <Upload className="h-8 w-8 text-muted-foreground mb-3" />
            {selectedFile ? (
              <div className="space-y-1">
                <p className="font-medium text-sm flex items-center gap-2">
                  <FileText className="h-4 w-4 text-emerald-600" />
                  {selectedFile.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-sm font-medium">Drag & drop file CSV di sini</p>
                <p className="text-xs text-muted-foreground">atau klik untuk memilih file</p>
              </div>
            )}
            <input
              ref={fileRef}
              type="file"
              accept=".csv"
              className="sr-only"
              onChange={handleFileChange}
            />
          </div>

          {/* Upload result */}
          {uploadResult && (
            <Alert variant={uploadResult.success ? "default" : "destructive"}>
              {uploadResult.success
                ? <CheckCircle2 className="h-4 w-4" />
                : <AlertCircle className="h-4 w-4" />}
              <AlertTitle>{uploadResult.success ? "Import Berhasil" : "Import Gagal"}</AlertTitle>
              <AlertDescription className="space-y-1">
                <p>{uploadResult.message}</p>
                {uploadResult.failedRows != null && uploadResult.failedRows > 0 && uploadResult.importId && (
                  <button
                    className="underline text-sm"
                    onClick={() => openErrorDetail(uploadResult.importId!)}
                  >
                    Lihat detail error ({uploadResult.failedRows} baris)
                  </button>
                )}
              </AlertDescription>
            </Alert>
          )}

          {/* Upload progress */}
          {isUploading && (
            <div className="space-y-2">
              <Progress value={undefined} className="h-2 animate-pulse" />
              <p className="text-xs text-muted-foreground text-center">Sedang memproses…</p>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className="flex-1 sm:flex-none"
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
        </CardContent>
      </Card>

      {/* ── Riwayat Import ────────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-base">Riwayat Import</CardTitle>
            <CardDescription>50 import terakhir</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={fetchImports} disabled={isLoadingList}>
            <RefreshCw className={`h-4 w-4 ${isLoadingList ? "animate-spin" : ""}`} />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {listError && (
            <div className="p-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{listError}</AlertDescription>
              </Alert>
            </div>
          )}

          {isLoadingList ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">Nama File</TableHead>
                    <TableHead className="text-center">Total</TableHead>
                    <TableHead className="text-center text-emerald-700">Berhasil</TableHead>
                    <TableHead className="text-center text-red-700">Gagal</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="min-w-[160px]">Waktu</TableHead>
                    <TableHead className="w-24">Detail</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {imports.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground py-12">
                        Belum ada riwayat import
                      </TableCell>
                    </TableRow>
                  ) : (
                    imports.map((imp) => {
                      const meta = STATUS_META[imp.status];
                      return (
                        <TableRow key={imp.id}>
                          <TableCell className="font-medium text-sm">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                              <span className="truncate max-w-[200px]">{imp.file_name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center tabular-nums">{imp.total_rows}</TableCell>
                          <TableCell className="text-center tabular-nums text-emerald-700 font-medium">
                            {imp.success_rows}
                          </TableCell>
                          <TableCell className="text-center tabular-nums text-red-700">
                            {imp.failed_rows > 0 ? imp.failed_rows : <span className="text-muted-foreground/40">—</span>}
                          </TableCell>
                          <TableCell>
                            <Badge variant={meta.variant} className="gap-1">
                              {meta.icon}
                              {meta.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {fmtDate(imp.created_at)}
                          </TableCell>
                          <TableCell>
                            {imp.failed_rows > 0 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs h-7"
                                onClick={() => openErrorDetail(imp.id)}
                              >
                                Error
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
        </CardContent>
      </Card>

      {/* ── Error detail dialog ───────────────────────────────────────────── */}
      <Dialog open={!!errorDialogId} onOpenChange={(o: boolean) => { if (!o) setErrorDialogId(null); }}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Detail Error Import</DialogTitle>
            <DialogDescription>Daftar baris yang gagal diproses</DialogDescription>
          </DialogHeader>

          {isLoadingErrors ? (
            <div className="space-y-3 py-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : errorDetails.length === 0 ? (
            <p className="text-center text-muted-foreground py-8 text-sm">Tidak ada detail error</p>
          ) : (
            <div className="overflow-y-auto flex-1">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Baris</TableHead>
                    <TableHead className="w-40">Tipe Error</TableHead>
                    <TableHead>Pesan Error</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {errorDetails.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell className="tabular-nums">{e.row_number}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs text-red-600 border-red-200">
                          {e.error_type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {e.error_message}
                        {e.raw_data && (
                          <details className="mt-1">
                            <summary className="text-xs cursor-pointer text-muted-foreground/60">
                              Lihat data mentah
                            </summary>
                            <pre className="text-xs mt-1 bg-muted p-2 rounded overflow-x-auto whitespace-pre-wrap break-all">
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
