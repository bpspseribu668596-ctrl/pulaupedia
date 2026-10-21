"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Grid3x3, Plus, Trash2, Edit2, X, Save, Upload, ImageIcon,
  AlertCircle, CheckCircle2, Loader2, BookOpen, Archive, FileText,
  Package, Laptop, DollarSign, BarChart3, Award, FileSpreadsheet,
  Megaphone, ShoppingCart, Users, Link2, ChevronRight, FolderOpen,
  ExternalLink, ArrowRight,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Portal {
  id?: number;
  name: string;
  description: string;
  icon: string;
  iconImage?: string | null;
  href: string;
  sortOrder: number;
  isActive: boolean;
}

interface PortalItem {
  id?: number;
  portalId?: number;
  name: string;
  description: string;
  icon: string;
  link: string;
  sortOrder: number;
  isActive: boolean;
  documents?: Array<{ title: string; link: string }>;
}

interface PortalWithItems extends Portal { items?: PortalItem[]; }

type DialogMode = "add-portal" | "edit-portal" | "add-item" | "edit-item" | null;

// ─── Constants ────────────────────────────────────────────────────────────────

const iconOptions = [
  { label: "BookOpen",        value: "BookOpen",        Icon: BookOpen },
  { label: "Archive",         value: "Archive",         Icon: Archive },
  { label: "FileText",        value: "FileText",        Icon: FileText },
  { label: "Package",         value: "Package",         Icon: Package },
  { label: "Laptop",          value: "Laptop",          Icon: Laptop },
  { label: "DollarSign",      value: "DollarSign",      Icon: DollarSign },
  { label: "BarChart3",       value: "BarChart3",       Icon: BarChart3 },
  { label: "Award",           value: "Award",           Icon: Award },
  { label: "FileSpreadsheet", value: "FileSpreadsheet", Icon: FileSpreadsheet },
  { label: "Megaphone",       value: "Megaphone",       Icon: Megaphone },
  { label: "ShoppingCart",    value: "ShoppingCart",    Icon: ShoppingCart },
  { label: "Users",           value: "Users",           Icon: Users },
];

const getIcon = (name: string) =>
  iconOptions.find((o) => o.value === name)?.Icon ?? BookOpen;

const makeSlug = (t: string) =>
  t.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
``
const emptyPortal: Portal = {
  name: "", description: "", icon: "BookOpen", iconImage: null,
  href: "", sortOrder: 0, isActive: true,
};

const emptyItem: PortalItem = {
  name: "", description: "", icon: "FileSpreadsheet",
  link: "", sortOrder: 0, isActive: true, documents: [],
};

// ─── Main Page ────────────────────────────────────────────────────────────────

function AdminMainPortalContent() {
  const searchParams = useSearchParams();
  const portalParam = searchParams.get("portal");
  const itemParam = searchParams.get("item"); // id item dari URL

  const [portals, setPortals] = useState<PortalWithItems[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const [selectedPortalId, setSelectedPortalId] = useState<number | null>(null);

  // Dialog state — single dialog untuk semua mode
  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [iconMode, setIconMode] = useState<"lucide" | "image">("lucide");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [portalForm, setPortalForm] = useState<Portal>(emptyPortal);
  const [itemForm, setItemForm] = useState<PortalItem>(emptyItem);
  const [docTitle, setDocTitle] = useState("");
  const [docLink, setDocLink] = useState("");

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchPortals = async () => {
    try {
      const res = await fetch("/api/public/portals?all=true");
      if (!res.ok) return;
      const data = await res.json();
      const withItems = await Promise.all(
        data.map(async (p: Portal) => {
          try {
            const r = await fetch(`/api/public/portals/${p.id}/items?all=true`);
            return { ...p, items: r.ok ? await r.json() : [] };
          } catch { return { ...p, items: [] }; }
        })
      );
      setPortals(withItems);

      // Auto-select: dari URL param dulu, kalau tidak ada baru pilih pertama
      if (withItems.length > 0) {
        let matchedPortal: PortalWithItems = withItems[0];

        if (portalParam) {
          const found = withItems.find(
            (p) => p.href === `/${portalParam}` || p.href === portalParam
          );
          if (found) matchedPortal = found;
        } else if (selectedPortalId) {
          const found = withItems.find((p) => p.id === selectedPortalId);
          if (found) matchedPortal = found;
        }

        setSelectedPortalId(matchedPortal.id ?? null);

        // Auto-open dialog edit item kalau ada ?item= di URL
        if (itemParam) {
          const itemId = parseInt(itemParam, 10);
          const matchedItem = matchedPortal.items?.find((i) => i.id === itemId);
          if (matchedItem) {
            setItemForm({ ...matchedItem });
            setDocTitle(""); setDocLink("");
            setDialogMode("edit-item");
          }
        }
      }
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  };

  useEffect(() => { fetchPortals(); }, []);

  const selectedPortal = portals.find((p) => p.id === selectedPortalId) ?? null;

  // ── Dialog helpers ────────────────────────────────────────────────────────

  const closeDialog = () => {
    setDialogMode(null);
    setPortalForm(emptyPortal);
    setItemForm(emptyItem);
    setIconMode("lucide");
    setSelectedFile(null);
    setPreviewUrl(null);
    setDocTitle(""); setDocLink("");
  };

  const openAddPortal = () => {
    setPortalForm(emptyPortal);
    setIconMode("lucide");
    setSelectedFile(null); setPreviewUrl(null);
    setDialogMode("add-portal");
  };

  const openEditPortal = (p: Portal) => {
    setPortalForm({ ...p });
    setIconMode(p.iconImage ? "image" : "lucide");
    setPreviewUrl(p.iconImage ?? null);
    setSelectedFile(null);
    setDialogMode("edit-portal");
  };

  const openAddItem = () => {
    setItemForm(emptyItem);
    setDocTitle(""); setDocLink("");
    setDialogMode("add-item");
  };

  const openEditItem = (item: PortalItem) => {
    setItemForm({ ...item });
    setDocTitle(""); setDocLink("");
    setDialogMode("edit-item");
  };

  // ── Portal CRUD ───────────────────────────────────────────────────────────

  const handleSavePortal = async () => {
    if (!portalForm.name || !portalForm.description || !portalForm.href) {
      showToast("Nama, deskripsi, dan URL harus diisi", "error"); return;
    }
    setIsSaving(true);
    try {
      let iconImage = portalForm.iconImage ?? null;
      if (iconMode === "image" && selectedFile) {
        const fd = new FormData(); fd.append("file", selectedFile);
        const up = await fetch("/api/public/uploads/portals", { method: "POST", body: fd });
        if (!up.ok) throw new Error();
        iconImage = (await up.json()).url;
      }
      if (iconMode === "lucide") iconImage = null;
      const isEdit = dialogMode === "edit-portal";
      const res = await fetch(
        isEdit ? `/api/public/portals/${portalForm.id}` : "/api/public/portals",
        { method: isEdit ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...portalForm, iconImage }) }
      );
      if (!res.ok) throw new Error();
      showToast(isEdit ? "Portal berhasil diperbarui" : "Portal berhasil ditambahkan", "success");
      closeDialog(); await fetchPortals();
    } catch { showToast("Gagal menyimpan portal", "error"); }
    finally { setIsSaving(false); }
  };

  const handleDeletePortal = async (id: number) => {
    if (!confirm("Hapus portal beserta semua itemnya?")) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/public/portals/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      showToast("Portal berhasil dihapus", "success");
      if (selectedPortalId === id) setSelectedPortalId(null);
      await fetchPortals();
    } catch { showToast("Gagal menghapus portal", "error"); }
    finally { setIsSaving(false); }
  };

  // ── Item CRUD ─────────────────────────────────────────────────────────────

  const handleSaveItem = async () => {
    if (!itemForm.name || !itemForm.description || !itemForm.link || !itemForm.icon) {
      showToast("Semua field harus diisi", "error"); return;
    }
    if (!selectedPortalId) { showToast("Pilih portal terlebih dahulu", "error"); return; }
    setIsSaving(true);
    try {
      const isEdit = dialogMode === "edit-item";
      const res = await fetch(
        isEdit
          ? `/api/public/portals/${selectedPortalId}/items/${itemForm.id}`
          : `/api/public/portals/${selectedPortalId}/items`,
        { method: isEdit ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(itemForm) }
      );
      if (!res.ok) throw new Error();
      showToast(isEdit ? "Item berhasil diperbarui" : "Item berhasil ditambahkan", "success");
      closeDialog(); await fetchPortals();
    } catch { showToast("Gagal menyimpan item", "error"); }
    finally { setIsSaving(false); }
  };

  const handleDeleteItem = async (portalId: number, itemId: number) => {
    if (!confirm("Hapus item ini?")) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/public/portals/${portalId}/items/${itemId}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      showToast("Item berhasil dihapus", "success"); await fetchPortals();
    } catch { showToast("Gagal menghapus item", "error"); }
    finally { setIsSaving(false); }
  };

  const addDoc = () => {
    if (!docTitle || !docLink) return;
    setItemForm((f) => ({ ...f, documents: [...(f.documents ?? []), { title: docTitle, link: docLink }] }));
    setDocTitle(""); setDocLink("");
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { showToast("Hanya file gambar", "error"); return; }
    setSelectedFile(file); setPreviewUrl(URL.createObjectURL(file));
    setPortalForm((p) => ({ ...p, iconImage: null }));
  };

  const suggestedItemLink = () => {
    if (!itemForm.name || !selectedPortalId) return "";
    const p = portals.find((x) => x.id === selectedPortalId);
    return p ? `${p.href}/${makeSlug(itemForm.name)}` : "";
  };

  const isPortalDialog = dialogMode === "add-portal" || dialogMode === "edit-portal";
  const isItemDialog = dialogMode === "add-item" || dialogMode === "edit-item";

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-8">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-sm font-medium ${
          toast.type === "success"
            ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
            : "bg-red-50 border border-red-200 text-red-800"
        }`}>
          {toast.type === "success" ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          {toast.msg}
        </div>
      )}

      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Main Portal</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola portal dan item yang tampil di halaman beranda</p>
        </div>
        <button
          onClick={openAddPortal}
          className="shrink-0 flex items-center gap-1.5 h-9 px-4 rounded-lg bg-[#D83F3F] hover:bg-[#c03535] text-white text-sm font-semibold transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Tambah Portal
        </button>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { value: portals.length, label: "Total Portal" },
          { value: selectedPortal?.items?.length ?? "—", label: "Item di Portal Ini" },
          { value: portals.reduce((a, p) => a + (p.items?.length ?? 0), 0), label: "Total Item" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Split layout */}
      <div className="flex flex-col md:flex-row gap-5 items-start">

        {/* Sidebar kiri */}
        <aside className="w-full md:w-60 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Portal</p>
              <span className="text-xs text-gray-400">{portals.length} portal</span>
            </div>

            {isLoading ? (
              <div className="p-3 space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-11 rounded-xl bg-gray-100 animate-pulse" />
                ))}
              </div>
            ) : portals.length === 0 ? (
              <div className="text-center py-10 px-4">
                <p className="text-sm text-gray-400">Belum ada portal</p>
              </div>
            ) : (
              <nav className="p-2 space-y-0.5">
                {portals.map((portal) => {
                  const Icon = getIcon(portal.icon);
                  const isActive = portal.id === selectedPortalId;
                  return (
                    <div
                      key={portal.id}
                      onClick={() => setSelectedPortalId(portal.id ?? null)}
                      className={`group flex items-center gap-2.5 rounded-xl px-3 py-2 cursor-pointer transition-all ${
                        isActive ? "bg-[#D83F3F]/10" : "hover:bg-gray-100"
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isActive ? "bg-[#D83F3F]/10" : "bg-gray-100"}`}>
                        {portal.iconImage
                          ? <img src={portal.iconImage} alt="" className="w-4 h-4 object-contain" />
                          : <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#D83F3F]" : "text-gray-400"}`} />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-semibold truncate ${isActive ? "text-[#D83F3F]" : "text-gray-700"}`}>{portal.name}</p>
                        <p className="text-[10px] text-gray-400 truncate">{portal.items?.length ?? 0} item</p>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => openEditPortal(portal)}
                          className="w-6 h-6 rounded-md flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer">
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button onClick={() => handleDeletePortal(portal.id ?? 0)} disabled={isSaving}
                          className="w-6 h-6 rounded-md flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 shrink-0 text-[#D83F3F]" />}
                    </div>
                  );
                })}
              </nav>
            )}
          </div>
        </aside>

        {/* Konten kanan */}
        <div className="flex-1 min-w-0">
          {!selectedPortal ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center py-20 gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                <Grid3x3 className="w-6 h-6 text-gray-300" />
              </div>
              <p className="text-sm text-gray-400">Pilih portal dari sidebar</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">{selectedPortal.name}</h2>
                  <p className="text-xs text-gray-400 mt-0.5">{selectedPortal.description}</p>
                </div>
                <button onClick={openAddItem}
                  className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-[#D83F3F] hover:bg-[#c03535] text-white text-xs font-semibold transition-colors cursor-pointer">
                  <Plus className="w-3.5 h-3.5" /> Tambah Item
                </button>
              </div>

              {(selectedPortal.items?.length ?? 0) === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <FolderOpen className="w-6 h-6 text-gray-300" />
                  </div>
                  <p className="text-sm text-gray-400">Belum ada item</p>
                  <button onClick={openAddItem}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#D83F3F] hover:underline cursor-pointer">
                    <Plus className="w-3.5 h-3.5" /> Tambah item pertama
                  </button>
                </div>
              ) : (
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {selectedPortal.items!.map((item) => {
                    const Icon = getIcon(item.icon);
                    return (
                      <div key={item.id}
                        className="group relative bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4 hover:border-[#D83F3F]/30 hover:shadow-lg transition-all duration-200">
                        <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => openEditItem(item)}
                            className="w-7 h-7 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 shadow-sm transition-colors cursor-pointer">
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button onClick={() => handleDeleteItem(selectedPortal.id ?? 0, item.id ?? 0)} disabled={isSaving}
                            className="w-7 h-7 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 shadow-sm transition-colors cursor-pointer">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-[#D83F3F]/10 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                          <Icon className="w-5 h-5 text-[#D83F3F]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.name}</h3>
                          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{item.description}</p>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          {(item.documents?.length ?? 0) > 0 && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#D83F3F] bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                              <ExternalLink className="w-2.5 h-2.5" />
                              {item.documents!.length} dokumen
                            </span>
                          )}
                          <div className="flex items-center gap-1 text-xs font-semibold text-[#D83F3F] opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                            Kelola <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Modal Dialog ────────────────────────────────────────── */}
      {dialogMode && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeDialog(); }}
        >
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

            {/* Dialog header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#D83F3F]/10 flex items-center justify-center">
                  {isPortalDialog
                    ? <Grid3x3 className="w-4 h-4 text-[#D83F3F]" />
                    : <FolderOpen className="w-4 h-4 text-[#D83F3F]" />
                  }
                </div>
                <h2 className="text-base font-semibold text-gray-900">
                  {dialogMode === "add-portal" && "Tambah Portal"}
                  {dialogMode === "edit-portal" && "Edit Portal"}
                  {dialogMode === "add-item" && "Tambah Item"}
                  {dialogMode === "edit-item" && "Edit Item"}
                </h2>
              </div>
              <button onClick={closeDialog}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Dialog body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

              {/* ── Portal form ── */}
              {isPortalDialog && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Nama Portal</Label>
                      <Input value={portalForm.name} onChange={(e) => setPortalForm({ ...portalForm, name: e.target.value })} placeholder="Portal Umum" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">URL / Href</Label>
                      <Input value={portalForm.href} onChange={(e) => setPortalForm({ ...portalForm, href: e.target.value })} placeholder="/portal-umum" />
                      {(() => { const s = portalForm.name ? `/${makeSlug(portalForm.name)}` : ""; return s && s !== portalForm.href ? (
                        <button onClick={() => setPortalForm({ ...portalForm, href: s })}
                          className="text-[10px] text-blue-600 hover:underline cursor-pointer">
                          Gunakan: <span className="font-mono">{s}</span>
                        </button>
                      ) : null; })()}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Deskripsi</Label>
                    <Textarea value={portalForm.description} onChange={(e) => setPortalForm({ ...portalForm, description: e.target.value })} placeholder="Deskripsi portal..." className="min-h-[70px] resize-none" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Icon</Label>
                    <div className="flex gap-2">
                      {(["lucide", "image"] as const).map((mode) => (
                        <button key={mode} type="button" onClick={() => setIconMode(mode)}
                          className={`flex-1 flex items-center justify-center gap-1.5 h-9 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
                            iconMode === mode ? "bg-[#D83F3F] text-white border-[#D83F3F]" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                          }`}>
                          {mode === "lucide" ? <><BookOpen className="w-3.5 h-3.5" /> Pilih Icon</> : <><ImageIcon className="w-3.5 h-3.5" /> Upload Gambar</>}
                        </button>
                      ))}
                    </div>
                    {iconMode === "lucide" && (
                      <div className="grid grid-cols-6 gap-1.5">
                        {iconOptions.map(({ value, label, Icon }) => (
                          <button key={value} type="button" onClick={() => setPortalForm({ ...portalForm, icon: value })} title={label}
                            className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer ${
                              portalForm.icon === value ? "border-[#D83F3F] bg-red-50" : "border-gray-100 hover:border-gray-300 bg-white"
                            }`}>
                            <Icon className="w-4 h-4 text-gray-600" />
                            <span className="text-[8px] text-gray-400">{label.slice(0, 6)}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    {iconMode === "image" && (
                      <div className="space-y-2">
                        <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#D83F3F]/40 hover:bg-red-50/20 transition-colors">
                          <Upload className="w-5 h-5 text-gray-300 mb-1" />
                          <span className="text-xs text-gray-400">Klik untuk pilih gambar</span>
                          <input type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
                        </label>
                        {previewUrl && (
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <img src={previewUrl} alt="Preview" className="w-10 h-10 object-contain rounded-lg" />
                            <p className="text-xs text-emerald-700 flex-1 truncate">✓ Gambar dipilih</p>
                            <button onClick={() => { setSelectedFile(null); setPreviewUrl(null); setPortalForm((p) => ({ ...p, iconImage: null })); }}
                              className="text-gray-300 hover:text-red-400 cursor-pointer"><X className="w-4 h-4" /></button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Sort Order</Label>
                    <Input type="number" value={portalForm.sortOrder} onChange={(e) => setPortalForm({ ...portalForm, sortOrder: parseInt(e.target.value) || 0 })} className="w-28" />
                  </div>
                </>
              )}

              {/* ── Item form ── */}
              {isItemDialog && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Nama Item</Label>
                      <Input value={itemForm.name} onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })} placeholder="Bigram" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Link</Label>
                      <Input value={itemForm.link} onChange={(e) => setItemForm({ ...itemForm, link: e.target.value })} placeholder="/portal-umum/bigram" />
                      {(() => { const s = suggestedItemLink(); return s && s !== itemForm.link ? (
                        <button onClick={() => setItemForm({ ...itemForm, link: s })}
                          className="text-[10px] text-blue-600 hover:underline cursor-pointer">
                          Gunakan: <span className="font-mono">{s}</span>
                        </button>
                      ) : null; })()}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Deskripsi</Label>
                    <Textarea value={itemForm.description} onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })} placeholder="Deskripsi item..." className="min-h-[70px] resize-none" />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Icon</Label>
                    <div className="grid grid-cols-6 gap-1.5">
                      {iconOptions.map(({ value, label, Icon }) => (
                        <button key={value} type="button" onClick={() => setItemForm({ ...itemForm, icon: value })} title={label}
                          className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer ${
                            itemForm.icon === value ? "border-[#D83F3F] bg-red-50" : "border-gray-100 hover:border-gray-300 bg-white"
                          }`}>
                          <Icon className="w-4 h-4 text-gray-600" />
                          <span className="text-[8px] text-gray-400">{label.slice(0, 6)}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-1.5">
                      <Link2 className="w-3.5 h-3.5" /> Dokumen
                    </Label>
                    {itemForm.documents && itemForm.documents.length > 0 ? (
                      <div className="space-y-1.5 max-h-36 overflow-y-auto">
                        {itemForm.documents.map((doc, i) => (
                          <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-100">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-gray-800 truncate">{doc.title}</p>
                              <p className="text-[10px] text-gray-400 truncate">{doc.link}</p>
                            </div>
                            <button onClick={() => setItemForm({ ...itemForm, documents: itemForm.documents?.filter((_, idx) => idx !== i) })}
                              className="w-6 h-6 rounded-md border border-red-200 text-red-400 hover:bg-red-50 flex items-center justify-center transition-colors shrink-0 cursor-pointer">
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 text-center py-3 bg-gray-50 rounded-xl">Belum ada dokumen</p>
                    )}
                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 space-y-2">
                      <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Tambah Dokumen</p>
                      <Input value={docTitle} onChange={(e) => setDocTitle(e.target.value)} placeholder="Judul dokumen" className="h-9 text-sm bg-white" />
                      <Input value={docLink} onChange={(e) => setDocLink(e.target.value)} placeholder="https://..." className="h-9 text-sm bg-white" />
                      <button type="button" onClick={addDoc} disabled={!docTitle || !docLink}
                        className="w-full h-8 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-white flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40 cursor-pointer">
                        <Plus className="w-3.5 h-3.5" /> Tambah
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Sort Order</Label>
                    <Input type="number" value={itemForm.sortOrder} onChange={(e) => setItemForm({ ...itemForm, sortOrder: parseInt(e.target.value) || 0 })} className="w-28" />
                  </div>
                </>
              )}
            </div>

            {/* Dialog footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 shrink-0">
              <button onClick={closeDialog}
                className="flex-1 h-10 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
                Batal
              </button>
              <button
                onClick={isPortalDialog ? handleSavePortal : handleSaveItem}
                disabled={isSaving}
                className="flex-1 h-10 rounded-xl bg-[#D83F3F] hover:bg-[#c03535] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-60 cursor-pointer"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isSaving ? "Menyimpan..."
                  : dialogMode === "add-portal" || dialogMode === "add-item" ? "Tambahkan"
                  : "Simpan Perubahan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Wrapper dengan Suspense — diperlukan karena useSearchParams() ────────────

export default function AdminMainPortalPage() {
  return (
    <Suspense fallback={null}>
      <AdminMainPortalContent />
    </Suspense>
  );
}
