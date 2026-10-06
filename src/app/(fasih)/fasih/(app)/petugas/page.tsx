"use client";

import { useEffect, useState } from "react";
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
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  Plus,
  Pencil,
  Loader2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Users,
  ShieldCheck,
  KeyRound,
  CheckCircle2,
} from "lucide-react";

interface Officer {
  id: string;
  username: string | null;
  name: string;
  officer_role: "pencacah" | "pengawas";
  created_at: string;
  updated_at: string;
}

interface FasihUser {
  id: string;
  officer_id: string | null;
  username: string;
  name: string;
  role: string;
  is_active: boolean;
}

export default function FasihPetugasPage() {
  const [pencacah, setPencacah] = useState<Officer[]>([]);
  const [pengawas, setPengawas] = useState<Officer[]>([]);
  const [fasihUsers, setFasihUsers] = useState<FasihUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Add form state
  const [openAdd, setOpenAdd] = useState(false);
  const [addForm, setAddForm] = useState({
    name: "",
    username: "",
    officer_role: "pencacah" as "pencacah" | "pengawas",
  });
  const [isSaving, setIsSaving] = useState(false);

  // Edit form state
  const [editOfficer, setEditOfficer] = useState<Officer | null>(null);
  const [editForm, setEditForm] = useState({ name: "", username: "" });

  // Sorting
  const [sortColumn, setSortColumn] = useState<keyof Officer | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const fetchData = async () => {
    try {
      const res = await fetch("/api/fasih/petugas");
      if (!res.ok) throw new Error("Gagal memuat data");
      const data = await res.json();
      setPencacah(data.pencacah ?? []);
      setPengawas(data.pengawas ?? []);
      setFasihUsers(data.fasihUsers ?? []);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showToast = (type: "success" | "error", text: string) => {
    setSaveMessage({ type, text });
    setTimeout(() => setSaveMessage(null), 4000);
  };

  const handleAdd = async () => {
    if (!addForm.name.trim()) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/fasih/petugas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gagal menambah");
      showToast("success", "Petugas berhasil ditambahkan");
      setOpenAdd(false);
      setAddForm({ name: "", username: "", officer_role: "pencacah" });
      fetchData();
    } catch (e: unknown) {
      showToast("error", e instanceof Error ? e.message : "Gagal menyimpan");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = async () => {
    if (!editOfficer) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/fasih/petugas/${editOfficer.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gagal mengubah");
      showToast("success", "Petugas berhasil diperbarui");
      setEditOfficer(null);
      fetchData();
    } catch (e: unknown) {
      showToast("error", e instanceof Error ? e.message : "Gagal menyimpan");
    } finally {
      setIsSaving(false);
    }
  };

  const openEditDialog = (o: Officer) => {
    setEditOfficer(o);
    setEditForm({ name: o.name, username: o.username ?? "" });
  };

  const handleSort = (column: keyof Officer) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const SortIcon = ({ column }: { column: keyof Officer }) => {
    if (sortColumn !== column)
      return <ArrowUpDown className="h-3 w-3 opacity-40 shrink-0" />;
    return sortDirection === "asc" ? (
      <ArrowUp className="h-3 w-3 shrink-0" />
    ) : (
      <ArrowDown className="h-3 w-3 shrink-0" />
    );
  };

  const SortHeader = ({
    column,
    label,
  }: {
    column: keyof Officer;
    label: string;
  }) => (
    <button
      onClick={() => handleSort(column)}
      className="flex items-center justify-between gap-2 w-full text-left cursor-pointer hover:text-foreground transition-colors select-none"
    >
      <span>{label}</span>
      <SortIcon column={column} />
    </button>
  );

  const sortData = (data: Officer[]) => {
    if (!sortColumn) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return 0;
    });
  };

  const OfficerTable = ({ officers }: { officers: Officer[] }) => {
    const sorted = sortData(officers);
    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/80 hover:bg-gray-50/80">
              <TableHead className="font-semibold text-gray-600 w-12 text-center">#</TableHead>
              <TableHead className="font-semibold text-gray-600">
                <SortHeader column="name" label="Nama Lengkap" />
              </TableHead>
              <TableHead className="font-semibold text-gray-600">
                <SortHeader column="username" label="Username / Email" />
              </TableHead>
              <TableHead className="w-20 font-semibold text-gray-600">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-gray-400 py-12 text-sm"
                >
                  Belum ada data
                </TableCell>
              </TableRow>
            ) : (
              sorted.map((o, idx) => (
                <TableRow
                  key={o.id}
                  className="hover:bg-orange-50/30 transition-colors group"
                >
                  <TableCell className="text-center text-xs text-gray-400 tabular-nums">
                    {idx + 1}
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">
                    {o.name}
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    {o.username ?? <span className="italic text-gray-300">—</span>}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openEditDialog(o)}
                      className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-orange-50 hover:text-[#F9882B]"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Petugas
          </h1>
          <p className="text-sm text-gray-500">
            Master data Pencacah dan Pengawas
          </p>
        </div>

        <Dialog open={openAdd} onOpenChange={setOpenAdd}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="shrink-0 text-white"
              style={{ backgroundColor: "#F9882B" }}
            >
              <Plus className="mr-1.5 h-4 w-4" />
              Tambah Petugas
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg">Tambah Petugas</DialogTitle>
              <DialogDescription>
                Tambah data Pencacah atau Pengawas baru
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Nama Lengkap <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={addForm.name}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="Nama petugas"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Username / Email
                  <span className="ml-1 text-xs text-gray-400 font-normal">
                    (opsional)
                  </span>
                </Label>
                <Input
                  value={addForm.username}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, username: e.target.value }))
                  }
                  placeholder="username@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Role Operasional <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={addForm.officer_role}
                  onValueChange={(v: string) =>
                    setAddForm((f) => ({
                      ...f,
                      officer_role: v as "pencacah" | "pengawas",
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pencacah">Pencacah</SelectItem>
                    <SelectItem value="pengawas">Pengawas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setOpenAdd(false)}>
                Batal
              </Button>
              <Button
                onClick={handleAdd}
                disabled={isSaving || !addForm.name.trim()}
                className="text-white"
                style={{ backgroundColor: "#F9882B" }}
              >
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Simpan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Toast notification */}
      {saveMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg transition-all ${
            saveMessage.type === "success"
              ? "border-emerald-200 bg-white text-emerald-700"
              : "border-red-200 bg-white text-red-700"
          }`}
        >
          {saveMessage.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0" />
          )}
          <span className="text-sm font-medium">{saveMessage.text}</span>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Edit dialog */}
      <Dialog
        open={!!editOfficer}
        onOpenChange={(o: boolean) => {
          if (!o) setEditOfficer(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg">Edit Petugas</DialogTitle>
            <DialogDescription>Ubah data petugas</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Nama Lengkap</Label>
              <Input
                value={editForm.name}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Username / Email</Label>
              <Input
                value={editForm.username}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, username: e.target.value }))
                }
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setEditOfficer(null)}>
              Batal
            </Button>
            <Button
              onClick={handleEdit}
              disabled={isSaving}
              className="text-white"
              style={{ backgroundColor: "#F9882B" }}
            >
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stats strip */}
      {!isLoading && (
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: "Pencacah",
              value: pencacah.length,
              icon: Users,
              iconBg: "bg-orange-100",
              iconColor: "text-[#F9882B]",
              border: "border-orange-100",
            },
            {
              label: "Pengawas",
              value: pengawas.length,
              icon: ShieldCheck,
              iconBg: "bg-blue-100",
              iconColor: "text-blue-600",
              border: "border-blue-100",
            },
            {
              label: "Akun Login",
              value: fasihUsers.length,
              icon: KeyRound,
              iconBg: "bg-violet-100",
              iconColor: "text-violet-600",
              border: "border-violet-100",
            },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className={`group bg-white rounded-2xl border ${s.border} p-4 flex items-center gap-3 hover:shadow-md transition-all duration-200`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.iconBg} transition-transform duration-200 group-hover:scale-110`}
                >
                  <Icon className={`w-5 h-5 ${s.iconColor}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold tabular-nums text-gray-900">
                    {s.value}
                  </p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tabs */}
      <Tabs defaultValue="pencacah">
        <TabsList className="bg-gray-100 p-1 rounded-xl">
          <TabsTrigger
            value="pencacah"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#F9882B] data-[state=active]:font-semibold"
          >
            <Users className="mr-1.5 h-3.5 w-3.5" />
            Pencacah
            {!isLoading && (
              <Badge
                variant="secondary"
                className="ml-2 text-xs bg-orange-50 text-[#F9882B] border-orange-100"
              >
                {pencacah.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="pengawas"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#F9882B] data-[state=active]:font-semibold"
          >
            <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
            Pengawas
            {!isLoading && (
              <Badge
                variant="secondary"
                className="ml-2 text-xs bg-orange-50 text-[#F9882B] border-orange-100"
              >
                {pengawas.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="akun"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#F9882B] data-[state=active]:font-semibold"
          >
            <KeyRound className="mr-1.5 h-3.5 w-3.5" />
            Akun Login
            {!isLoading && (
              <Badge
                variant="secondary"
                className="ml-2 text-xs bg-orange-50 text-[#F9882B] border-orange-100"
              >
                {fasihUsers.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {isLoading ? (
          <div className="mt-4 bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <>
            <TabsContent value="pencacah">
              <div className="mt-4 bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      Daftar Pencacah
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {pencacah.length} pencacah terdaftar
                    </p>
                  </div>
                </div>
                <OfficerTable officers={pencacah} />
              </div>
            </TabsContent>

            <TabsContent value="pengawas">
              <div className="mt-4 bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Daftar Pengawas
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {pengawas.length} pengawas terdaftar
                  </p>
                </div>
                <OfficerTable officers={pengawas} />
              </div>
            </TabsContent>

            <TabsContent value="akun">
              <div className="mt-4 bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Akun Login FASIH
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Akun yang dapat mengakses sistem FASIH
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50/80 hover:bg-gray-50/80">
                        <TableHead className="font-semibold text-gray-600 w-12 text-center">#</TableHead>
                        <TableHead className="font-semibold text-gray-600">Nama</TableHead>
                        <TableHead className="font-semibold text-gray-600">Username</TableHead>
                        <TableHead className="font-semibold text-gray-600">Role</TableHead>
                        <TableHead className="font-semibold text-gray-600">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {fasihUsers.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={6}
                            className="text-center text-gray-400 py-12 text-sm"
                          >
                            Belum ada akun
                          </TableCell>
                        </TableRow>
                      ) : (
                        fasihUsers.map((u, idx) => {
                          const linkedOfficer = [
                            ...pencacah,
                            ...pengawas,
                          ].find((o) => o.id === u.officer_id);
                          return (
                            <TableRow
                              key={u.id}
                              className="hover:bg-orange-50/30 transition-colors"
                            >
                              <TableCell className="text-center text-xs text-gray-400 tabular-nums">
                                {idx + 1}
                              </TableCell>
                              <TableCell className="font-medium text-gray-900">
                                {u.name}
                              </TableCell>
                              <TableCell className="text-gray-500 text-sm">
                                @{u.username}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    u.role === "admin" ? "default" : "secondary"
                                  }
                                  className={
                                    u.role === "admin"
                                      ? "bg-[#F9882B] text-white border-orange-300"
                                      : ""
                                  }
                                >
                                  {u.role}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {u.is_active ? (
                                  <Badge
                                    variant="outline"
                                    className="text-emerald-700 border-emerald-200 bg-emerald-50"
                                  >
                                    Aktif
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="outline"
                                    className="text-gray-400 border-gray-200"
                                  >
                                    Nonaktif
                                  </Badge>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
}
