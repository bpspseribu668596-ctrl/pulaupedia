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
import { AlertCircle, Plus, Pencil, Loader2, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

interface Officer {
  id: string;
  username: string | null;
  name: string;
  officer_role: "pencacah" | "pengawas";
  is_active: boolean;
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
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Add form state
  const [openAdd, setOpenAdd] = useState(false);
  const [addForm, setAddForm] = useState({ name: "", username: "", officer_role: "pencacah" as "pencacah" | "pengawas" });
  const [isSaving, setIsSaving] = useState(false);

  // Edit form state
  const [editOfficer, setEditOfficer] = useState<Officer | null>(null);
  const [editForm, setEditForm] = useState({ name: "", username: "", is_active: true });

  // Sorting state
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

  useEffect(() => { fetchData(); }, []);

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
      setSaveMessage("Petugas berhasil ditambahkan");
      setOpenAdd(false);
      setAddForm({ name: "", username: "", officer_role: "pencacah" });
      fetchData();
    } catch (e: unknown) {
      setSaveMessage(`Error: ${e instanceof Error ? e.message : "Gagal"}`);
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(null), 4000);
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
      setSaveMessage("Petugas berhasil diperbarui");
      setEditOfficer(null);
      fetchData();
    } catch (e: unknown) {
      setSaveMessage(`Error: ${e instanceof Error ? e.message : "Gagal"}`);
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(null), 4000);
    }
  };

  const openEditDialog = (o: Officer) => {
    setEditOfficer(o);
    setEditForm({ name: o.name, username: o.username ?? "", is_active: o.is_active });
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
    if (sortColumn !== column) return <ArrowUpDown className="h-3 w-3 opacity-40 shrink-0" />;
    return sortDirection === "asc"
      ? <ArrowUp className="h-3 w-3 shrink-0" />
      : <ArrowDown className="h-3 w-3 shrink-0" />;
  };

  const SortHeader = ({ column, label }: { column: keyof Officer; label: string }) => (
    <button
      onClick={() => handleSort(column)}
      className="flex items-center justify-between gap-2 w-full text-left cursor-pointer hover:text-foreground transition-colors group select-none"
    >
      <span className="truncate">{label}</span>
      <SortIcon column={column} />
    </button>
  );

  const sortData = (data: Officer[]) => {
    if (!sortColumn) return data;
    
    const sorted = [...data].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      
      if (typeof aVal === "boolean" && typeof bVal === "boolean") {
        return sortDirection === "asc"
          ? (aVal === bVal ? 0 : aVal ? -1 : 1)
          : (aVal === bVal ? 0 : aVal ? 1 : -1);
      }
      
      return 0;
    });
    
    return sorted;
  };

  const OfficerTable = ({ officers }: { officers: Officer[] }) => {
    const sortedOfficers = sortData(officers);
    
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <SortHeader column="name" label="Nama" />
            </TableHead>
            <TableHead>
              <SortHeader column="username" label="Username / Email" />
            </TableHead>
            <TableHead>
              <SortHeader column="is_active" label="Status" />
            </TableHead>
            <TableHead className="w-20">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedOfficers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                Tidak ada data
              </TableCell>
            </TableRow>
          ) : (
            sortedOfficers.map((o) => (
              <TableRow key={o.id}>
                <TableCell className="font-medium">{o.name}</TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {o.username ?? <span className="italic">—</span>}
                </TableCell>
                <TableCell>
                  {o.is_active ? (
                    <Badge variant="outline" className="text-emerald-700 border-emerald-300 bg-emerald-50">Aktif</Badge>
                  ) : (
                    <Badge variant="outline" className="text-slate-500">Nonaktif</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => openEditDialog(o)}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Petugas</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Master data Pencacah dan Pengawas
          </p>
        </div>

        <Dialog open={openAdd} onOpenChange={setOpenAdd}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Petugas
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Petugas</DialogTitle>
              <DialogDescription>Tambah data Pencacah atau Pengawas baru</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Nama Lengkap <span className="text-red-500">*</span></Label>
                <Input
                  value={addForm.name}
                  onChange={(e) => setAddForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Nama petugas"
                />
              </div>
              <div className="space-y-2">
                <Label>Username / Email</Label>
                <Input
                  value={addForm.username}
                  onChange={(e) => setAddForm((f) => ({ ...f, username: e.target.value }))}
                  placeholder="username@email.com (opsional)"
                />
              </div>
              <div className="space-y-2">
                <Label>Role Operasional <span className="text-red-500">*</span></Label>
                <Select
                  value={addForm.officer_role}
                  onValueChange={(v: string) => setAddForm((f) => ({ ...f, officer_role: v as "pencacah" | "pengawas" }))}
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
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenAdd(false)}>Batal</Button>
              <Button onClick={handleAdd} disabled={isSaving || !addForm.name.trim()}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Simpan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {saveMessage && (
        <Alert variant={saveMessage.startsWith("Error") ? "destructive" : "default"}>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{saveMessage}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Edit dialog */}
      <Dialog open={!!editOfficer} onOpenChange={(o: boolean) => { if (!o) setEditOfficer(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Petugas</DialogTitle>
            <DialogDescription>Ubah data petugas</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Nama Lengkap</Label>
              <Input
                value={editForm.name}
                onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Username / Email</Label>
              <Input
                value={editForm.username}
                onChange={(e) => setEditForm((f) => ({ ...f, username: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={editForm.is_active ? "aktif" : "nonaktif"}
                onValueChange={(v: string) => setEditForm((f) => ({ ...f, is_active: v === "aktif" }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aktif">Aktif</SelectItem>
                  <SelectItem value="nonaktif">Nonaktif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOfficer(null)}>Batal</Button>
            <Button onClick={handleEdit} disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Tabs defaultValue="pencacah">
        <TabsList>
          <TabsTrigger value="pencacah">
            Pencacah
            {!isLoading && (
              <Badge variant="secondary" className="ml-2">{pencacah.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="pengawas">
            Pengawas
            {!isLoading && (
              <Badge variant="secondary" className="ml-2">{pengawas.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="akun">
            Akun Login
            {!isLoading && (
              <Badge variant="secondary" className="ml-2">{fasihUsers.length}</Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {isLoading ? (
          <Card className="mt-4">
            <CardContent className="p-6 space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </CardContent>
          </Card>
        ) : (
          <>
            <TabsContent value="pencacah">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Daftar Pencacah</CardTitle>
                  <CardDescription>{pencacah.length} pencacah terdaftar</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <OfficerTable officers={pencacah} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pengawas">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Daftar Pengawas</CardTitle>
                  <CardDescription>{pengawas.length} pengawas terdaftar</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <OfficerTable officers={pengawas} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="akun">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Akun Login FASIH</CardTitle>
                  <CardDescription>
                    Akun yang dapat mengakses sistem FASIH
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <button
                            onClick={() => {
                              if (sortColumn === "name" || sortColumn === "username") {
                                setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                              } else {
                                setSortColumn("name");
                                setSortDirection("asc");
                              }
                            }}
                            className="flex items-center justify-between gap-2 cursor-pointer hover:text-foreground transition-colors select-none"
                          >
                            <span>Nama</span>
                            {sortColumn === "name" ? (
                              sortDirection === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
                            ) : <ArrowUpDown className="h-3 w-3 opacity-40" />}
                          </button>
                        </TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Role Login</TableHead>
                        <TableHead>Terhubung ke</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {fasihUsers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                            Tidak ada akun
                          </TableCell>
                        </TableRow>
                      ) : (
                        fasihUsers.sort((a, b) => {
                          if (!sortColumn || sortColumn !== "name") return 0;
                          const aVal = a.name || "";
                          const bVal = b.name || "";
                          return sortDirection === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
                        }).map((u) => {
                          const linkedOfficer = [...pencacah, ...pengawas].find(
                            (o) => o.id === u.officer_id
                          );
                          return (
                            <TableRow key={u.id}>
                              <TableCell className="font-medium">{u.name}</TableCell>
                              <TableCell className="text-muted-foreground text-sm">
                                @{u.username}
                              </TableCell>
                              <TableCell>
                                <Badge variant={u.role === "admin" ? "default" : "secondary"}>
                                  {u.role}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {linkedOfficer ? (
                                  <span>
                                    {linkedOfficer.name}{" "}
                                    <Badge variant="outline" className="text-xs ml-1">
                                      {linkedOfficer.officer_role}
                                    </Badge>
                                  </span>
                                ) : (
                                  <span className="italic">Tidak terhubung</span>
                                )}
                              </TableCell>
                              <TableCell>
                                {u.is_active ? (
                                  <Badge variant="outline" className="text-emerald-700 border-emerald-300 bg-emerald-50">Aktif</Badge>
                                ) : (
                                  <Badge variant="outline" className="text-slate-500">Nonaktif</Badge>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
}
