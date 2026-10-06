"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Grid3x3, Plus, Trash2, Edit2, X, Save, Upload, ImageIcon,
  ChevronDown, ChevronRight, AlertCircle, CheckCircle2, Loader2,
  BookOpen, Archive, FileText, Package, Laptop, DollarSign,
  BarChart3, Award, FileSpreadsheet, Megaphone, ShoppingCart, Users,
  Link2, FolderOpen,
} from "lucide-react";

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

const iconOptions = [
  { label: 'BookOpen',      value: 'BookOpen',      Icon: BookOpen },
  { label: 'Archive',       value: 'Archive',       Icon: Archive },
  { label: 'FileText',      value: 'FileText',      Icon: FileText },
  { label: 'Package',       value: 'Package',       Icon: Package },
  { label: 'Laptop',        value: 'Laptop',        Icon: Laptop },
  { label: 'DollarSign',    value: 'DollarSign',    Icon: DollarSign },
  { label: 'BarChart3',     value: 'BarChart3',     Icon: BarChart3 },
  { label: 'Award',         value: 'Award',         Icon: Award },
  { label: 'FileSpreadsheet', value: 'FileSpreadsheet', Icon: FileSpreadsheet },
  { label: 'Megaphone',     value: 'Megaphone',     Icon: Megaphone },
  { label: 'ShoppingCart',  value: 'ShoppingCart',  Icon: ShoppingCart },
  { label: 'Users',         value: 'Users',         Icon: Users },
];

const getIcon = (name: string) => iconOptions.find(o => o.value === name)?.Icon ?? BookOpen;

const slug = (t: string) => t.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

export default function AdminMainPortalPage() {
  const [portals, setPortals] = useState<PortalWithItems[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const [showDialog, setShowDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'portal' | 'item'>('portal');
  const [selectedPortalId, setSelectedPortalId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [iconMode, setIconMode] = useState<'lucide' | 'image'>('lucide');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const emptyPortal: Portal = { name: "", description: "", icon: "BookOpen", iconImage: null, href: "", sortOrder: 0, isActive: true };
  const emptyItem: PortalItem = { name: "", description: "", icon: "FileSpreadsheet", link: "", sortOrder: 0, isActive: true, documents: [] };

  const [portalForm, setPortalForm] = useState<Portal>(emptyPortal);
  const [itemForm, setItemForm] = useState<PortalItem>(emptyItem);
  const [docTitle, setDocTitle] = useState("");
  const [docLink, setDocLink] = useState("");

  useEffect(() => { fetchPortals(); }, []);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchPortals = async () => {
    try {
      const res = await fetch('/api/public/portals?all=true');
      if (res.ok) {
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
      }
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  };

  const resetForms = () => {
    setPortalForm(emptyPortal); setItemForm(emptyItem);
    setEditingId(null); setSelectedPortalId(null);
    setIconMode('lucide'); setSelectedFile(null); setPreviewUrl(null);
    setDocTitle(""); setDocLink("");
  };

  const openPortalDialog = (p?: Portal) => {
    setDialogMode('portal');
    if (p) {
      setEditingId(p.id ?? null); setPortalForm(p);
      if (p.iconImage) { setIconMode('image'); setPreviewUrl(p.iconImage); }
      else { setIconMode('lucide'); setPreviewUrl(null); }
      setSelectedFile(null);
    } else { resetForms(); }
    setShowDialog(true);
  };

  const openItemDialog = (portalId: number, item?: PortalItem) => {
    setDialogMode('item'); setSelectedPortalId(portalId);
    if (item) { setEditingId(item.id ?? null); setItemForm(item); }
    else { setItemForm(emptyItem); setEditingId(null); }
    setShowDialog(true);
  };

  const closeDialog = () => { setShowDialog(false); resetForms(); };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { showToast("Hanya file gambar yang diizinkan", "error"); return; }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setPortalForm(p => ({ ...p, iconImage: null }));
  };

  const handleSavePortal = async () => {
    if (!portalForm.name || !portalForm.description || !portalForm.href) {
      showToast("Nama, deskripsi, dan URL harus diisi", "error"); return;
    }
    setIsSaving(true);
    try {
      let iconImage = portalForm.iconImage ?? null;
      if (iconMode === 'image' && selectedFile) {
        const fd = new FormData(); fd.append('file', selectedFile);
        const up = await fetch('/api/public/uploads/portals', { method: 'POST', body: fd });
        if (!up.ok) throw new Error();
        iconImage = (await up.json()).url;
      }
      if (iconMode === 'lucide') iconImage = null;

      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/public/portals/${editingId}` : '/api/public/portals';
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...portalForm, iconImage }),
      });
      if (!res.ok) throw new Error();
      showToast(editingId ? "Portal berhasil diperbarui" : "Portal berhasil ditambahkan", "success");
      closeDialog(); fetchPortals();
    } catch { showToast("Gagal menyimpan portal", "error"); }
    finally { setIsSaving(false); }
  };

  const handleSaveItem = async () => {
    if (!itemForm.name || !itemForm.description || !itemForm.link || !itemForm.icon) {
      showToast("Semua field harus diisi", "error"); return;
    }
    if (!selectedPortalId) { showToast("Portal tidak dipilih", "error"); return; }
    setIsSaving(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId
        ? `/api/public/portals/${selectedPortalId}/items/${editingId}`
        : `/api/public/portals/${selectedPortalId}/items`;
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemForm),
      });
      if (!res.ok) throw new Error();
      showToast(editingId ? "Item berhasil diperbarui" : "Item berhasil ditambahkan", "success");
      closeDialog(); fetchPortals();
    } catch { showToast("Gagal menyimpan item", "error"); }
    finally { setIsSaving(false); }
  };

  const handleDeletePortal = async (id: number) => {
    if (!confirm('Hapus portal beserta semua itemnya?')) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/public/portals/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      showToast("Portal berhasil dihapus", "success"); fetchPortals();
    } catch { showToast("Gagal menghapus portal", "error"); }
    finally { setIsSaving(false); }
  };

  const handleDeleteItem = async (portalId: number, itemId: number) => {
    if (!confirm('Hapus item ini?')) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/public/portals/${portalId}/items/${itemId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      showToast("Item berhasil dihapus", "success"); fetchPortals();
    } catch { showToast("Gagal menghapus item", "error"); }
    finally { setIsSaving(false); }
  };

  const addDoc = () => {
    if (!docTitle || !docLink) return;
    setItemForm(f => ({ ...f, documents: [...(f.documents ?? []), { title: docTitle, link: docLink }] }));
    setDocTitle(""); setDocLink("");
  };

  const suggestedPortalHref = portalForm.name ? `/${slug(portalForm.name)}` : '';
  const suggestedItemLink = () => {
    if (!itemForm.name || !selectedPortalId) return '';
    const p = portals.find(x => x.id === selectedPortalId);
    return p ? `${p.href}/${slug(itemForm.name)}` : '';
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-sm font-medium animate-in slide-in-from-top-2 ${
          toast.type === "success" ? "bg-emerald-50 border border-emerald-200 text-emerald-800" : "bg-red-50 border border-red-200 text-red-800"
        }`}>
          {toast.type === "success" ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          {toast.msg}
        </div>
      )}

      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Main Portal</h1>
            <p className="text-sm text-gray-500">Kelola portal dan sub-item di halaman beranda</p>
          </div>
        </div>
        <Button onClick={() => openPortalDialog()} className="gap-2 bg-[#D83F3F] hover:bg-[#c03535] text-white shrink-0">
          <Plus className="w-4 h-4" /> Tambah Portal
        </Button>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-2xl font-bold text-gray-900">{portals.length}</p>
          <p className="text-xs text-gray-500 mt-0.5">Total Portal</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-2xl font-bold text-[#D83F3F]">{portals.reduce((acc, p) => acc + (p.items?.length ?? 0), 0)}</p>
          <p className="text-xs text-gray-500 mt-0.5">Total Item</p>
        </div>
      </div>

      {/* Portal list */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 animate-pulse h-16" />
          ))}
        </div>
      ) : portals.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
            <Grid3x3 className="w-6 h-6 text-gray-300" />
          </div>
          <p className="text-sm font-medium text-gray-500">Belum ada portal</p>
          <Button variant="outline" size="sm" onClick={() => openPortalDialog()} className="gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Buat Pertama
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {portals.map((portal) => {
            const Icon = getIcon(portal.icon);
            const isExpanded = expandedId === portal.id;
            return (
              <div key={portal.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                {/* Portal row */}
                <div
                  className="flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-gray-50/80 transition-colors select-none"
                  onClick={() => setExpandedId(isExpanded ? null : (portal.id ?? null))}
                >
                  {/* Icon */}
                  <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                    {portal.iconImage ? (
                      <img src={portal.iconImage} alt={portal.name} className="w-6 h-6 object-contain" />
                    ) : (
                      <Icon className="w-4.5 h-4.5 text-[#D83F3F]" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-900">{portal.name}</p>
                      <Badge className="text-[10px] px-1.5 py-0 bg-gray-100 text-gray-500 border-gray-200">
                        {portal.items?.length ?? 0} item
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-400 truncate">{portal.href}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button onClick={(e) => { e.stopPropagation(); openPortalDialog(portal); }}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); handleDeletePortal(portal.id ?? 0); }} disabled={isSaving}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="w-8 h-8 flex items-center justify-center text-gray-400">
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Items panel */}
                {isExpanded && (
                  <div className="border-t border-gray-100 bg-gray-50/50 px-4 py-3">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
                        <FolderOpen className="w-3.5 h-3.5" /> Items
                      </p>
                      <Button size="sm" onClick={() => openItemDialog(portal.id ?? 0)}
                        className="h-7 text-xs gap-1 px-2.5 bg-[#D83F3F] hover:bg-[#c03535] text-white">
                        <Plus className="w-3 h-3" /> Tambah Item
                      </Button>
                    </div>

                    {portal.items && portal.items.length > 0 ? (
                      <div className="space-y-1.5">
                        {portal.items.map((item) => {
                          const ItemIcon = getIcon(item.icon);
                          return (
                            <div key={item.id} className="group flex items-center gap-3 bg-white rounded-xl border border-gray-100 px-3 py-2.5 hover:border-gray-200 transition-colors">
                              <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                                <ItemIcon className="w-3.5 h-3.5 text-gray-500" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-gray-800">{item.name}</p>
                                <p className="text-[10px] text-gray-400 truncate">{item.link}</p>
                              </div>
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                <button onClick={() => openItemDialog(portal.id ?? 0, item)}
                                  className="w-6 h-6 rounded-md border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors">
                                  <Edit2 className="w-3 h-3" />
                                </button>
                                <button onClick={() => handleDeleteItem(portal.id ?? 0, item.id ?? 0)} disabled={isSaving}
                                  className="w-6 h-6 rounded-md border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors">
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 text-center py-4">Belum ada item</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Dialog header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                  <Grid3x3 className="w-4 h-4 text-[#D83F3F]" />
                </div>
                <h2 className="text-base font-semibold text-gray-900">
                  {dialogMode === 'portal'
                    ? (editingId ? 'Edit Portal' : 'Tambah Portal')
                    : (editingId ? 'Edit Item' : 'Tambah Item')}
                </h2>
              </div>
              <button onClick={closeDialog} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {dialogMode === 'portal' ? (
                <>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Nama Portal</Label>
                    <Input value={portalForm.name} onChange={(e) => setPortalForm({ ...portalForm, name: e.target.value })} placeholder="Portal Umum" className="h-10" />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Deskripsi</Label>
                    <Textarea value={portalForm.description} onChange={(e) => setPortalForm({ ...portalForm, description: e.target.value })} placeholder="Deskripsi portal..." className="min-h-[80px] resize-none" />
                  </div>

                  {/* URL */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">URL / Href</Label>
                    <Input value={portalForm.href} onChange={(e) => setPortalForm({ ...portalForm, href: e.target.value })} placeholder="/portal-umum" className="h-10" />
                    {portalForm.name && suggestedPortalHref && suggestedPortalHref !== portalForm.href && (
                      <div className="flex items-center gap-2 p-2.5 bg-blue-50 border border-blue-100 rounded-xl">
                        <p className="text-xs text-blue-600 flex-1">Saran: <span className="font-mono font-semibold">{suggestedPortalHref}</span></p>
                        <Button type="button" size="sm" variant="outline" onClick={() => setPortalForm({ ...portalForm, href: suggestedPortalHref })} className="h-7 text-xs px-2.5">Gunakan</Button>
                      </div>
                    )}
                  </div>

                  {/* Icon */}
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Icon</Label>
                    <div className="flex gap-2">
                      {(['lucide', 'image'] as const).map(mode => (
                        <button key={mode} type="button" onClick={() => setIconMode(mode)}
                          className={`flex-1 flex items-center justify-center gap-1.5 h-9 rounded-xl border text-xs font-medium transition-colors ${
                            iconMode === mode ? 'bg-[#D83F3F] text-white border-[#D83F3F]' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                          }`}>
                          {mode === 'lucide' ? <><BookOpen className="w-3.5 h-3.5" /> Pilih Icon</> : <><ImageIcon className="w-3.5 h-3.5" /> Upload Gambar</>}
                        </button>
                      ))}
                    </div>

                    {iconMode === 'lucide' && (
                      <div className="grid grid-cols-6 gap-1.5">
                        {iconOptions.map(({ value, label, Icon }) => (
                          <button key={value} type="button" onClick={() => setPortalForm({ ...portalForm, icon: value })}
                            title={label}
                            className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center gap-0.5 transition-all ${
                              portalForm.icon === value ? 'border-[#D83F3F] bg-red-50' : 'border-gray-100 hover:border-gray-300 bg-white'
                            }`}>
                            <Icon className="w-4 h-4 text-gray-600" />
                            <span className="text-[8px] text-gray-400 leading-none">{label.slice(0, 6)}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {iconMode === 'image' && (
                      <div className="space-y-2">
                        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#D83F3F]/40 hover:bg-red-50/20 transition-colors">
                          <Upload className="w-5 h-5 text-gray-300 mb-1" />
                          <span className="text-xs text-gray-400">Klik untuk pilih gambar</span>
                          <input type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
                        </label>
                        {previewUrl && (
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <img src={previewUrl} alt="Preview" className="w-10 h-10 object-contain rounded-lg" />
                            <p className="text-xs text-emerald-700 flex-1 truncate">{selectedFile ? `✓ ${selectedFile.name}` : "✓ Gambar saat ini"}</p>
                            <button onClick={() => { setSelectedFile(null); setPreviewUrl(null); setPortalForm(p => ({ ...p, iconImage: null })); }} className="text-gray-300 hover:text-red-400 transition-colors"><X className="w-4 h-4" /></button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Sort Order</Label>
                    <Input type="number" value={portalForm.sortOrder} onChange={(e) => setPortalForm({ ...portalForm, sortOrder: parseInt(e.target.value) || 0 })} className="h-10 w-28" />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Nama Item</Label>
                    <Input value={itemForm.name} onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })} placeholder="Bigram" className="h-10" />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Deskripsi</Label>
                    <Textarea value={itemForm.description} onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })} placeholder="Deskripsi item..." className="min-h-[70px] resize-none" />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Icon</Label>
                    <div className="grid grid-cols-6 gap-1.5">
                      {iconOptions.map(({ value, label, Icon }) => (
                        <button key={value} type="button" onClick={() => setItemForm({ ...itemForm, icon: value })}
                          title={label}
                          className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center gap-0.5 transition-all ${
                            itemForm.icon === value ? 'border-[#D83F3F] bg-red-50' : 'border-gray-100 hover:border-gray-300 bg-white'
                          }`}>
                          <Icon className="w-4 h-4 text-gray-600" />
                          <span className="text-[8px] text-gray-400 leading-none">{label.slice(0, 6)}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Link</Label>
                    <Input value={itemForm.link} onChange={(e) => setItemForm({ ...itemForm, link: e.target.value })} placeholder="/portal-umum/bigram" className="h-10" />
                    {itemForm.name && selectedPortalId && suggestedItemLink() && suggestedItemLink() !== itemForm.link && (
                      <div className="flex items-center gap-2 p-2.5 bg-blue-50 border border-blue-100 rounded-xl">
                        <p className="text-xs text-blue-600 flex-1">Saran: <span className="font-mono font-semibold">{suggestedItemLink()}</span></p>
                        <Button type="button" size="sm" variant="outline" onClick={() => setItemForm({ ...itemForm, link: suggestedItemLink() })} className="h-7 text-xs px-2.5">Gunakan</Button>
                      </div>
                    )}
                  </div>

                  {/* Documents */}
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
                              className="w-6 h-6 rounded-md border border-red-200 text-red-400 hover:bg-red-50 flex items-center justify-center transition-colors shrink-0">
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
                      <Button type="button" variant="outline" size="sm" onClick={addDoc} disabled={!docTitle || !docLink}
                        className="w-full gap-1.5 h-8 text-xs">
                        <Plus className="w-3.5 h-3.5" /> Tambah
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Sort Order</Label>
                    <Input type="number" value={itemForm.sortOrder} onChange={(e) => setItemForm({ ...itemForm, sortOrder: parseInt(e.target.value) || 0 })} className="h-10 w-28" />
                  </div>
                </>
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
              <Button variant="outline" onClick={closeDialog} className="flex-1 h-10">Batal</Button>
              <Button onClick={dialogMode === 'portal' ? handleSavePortal : handleSaveItem} disabled={isSaving}
                className="flex-1 h-10 gap-2 bg-[#D83F3F] hover:bg-[#c03535] text-white">
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isSaving ? "Menyimpan..." : editingId ? "Simpan Perubahan" : "Tambahkan"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
