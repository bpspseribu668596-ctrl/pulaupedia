"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Package, Plus, Trash2, Edit2, X, Save, Upload,
  AlertCircle, CheckCircle2, Loader2, ExternalLink, ImageIcon,
} from "lucide-react";

interface Service {
  id?: number;
  title: string;
  name?: string;
  logo?: string;
  link?: string;
  sortOrder: number;
  isActive: boolean;
  type: "header" | "service";
  description?: string;
}

const emptyForm: Service = { title: "", name: "", logo: "", link: "", sortOrder: 0, isActive: true, type: "service" };

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Service>(emptyForm);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => { fetchServices(); }, []);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/public/services?all=true');
      if (res.ok) {
        const data = await res.json();
        setServices(data.filter((s: Service) => s.type === "service"));
      }
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  };

  const resetForm = () => { setFormData(emptyForm); setEditingId(null); setSelectedFile(null); setPreviewUrl(null); };

  const openDialog = (s?: Service) => {
    if (s) {
      setEditingId(s.id ?? null);
      setFormData(s);
      setPreviewUrl(s.logo?.startsWith('http') ? s.logo : null);
    } else {
      resetForm();
    }
    setShowDialog(true);
  };

  const closeDialog = () => { setShowDialog(false); resetForm(); };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { showToast("Hanya file gambar yang diizinkan", "error"); return; }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!formData.title || !formData.name || !formData.link) {
      showToast("Judul, nama aplikasi, dan link harus diisi", "error"); return;
    }
    setIsSaving(true);
    try {
      let logo = formData.logo ?? "";
      if (selectedFile) {
        const fd = new FormData();
        fd.append('file', selectedFile);
        const up = await fetch('/api/public/uploads/services', { method: 'POST', body: fd });
        if (!up.ok) throw new Error();
        logo = (await up.json()).path;
      }
      if (!logo) { showToast("Logo harus diisi", "error"); setIsSaving(false); return; }

      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/public/services/${editingId}` : '/api/public/services';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, logo }),
      });
      if (!res.ok) throw new Error();
      showToast(editingId ? "Service berhasil diperbarui" : "Service berhasil ditambahkan", "success");
      closeDialog();
      fetchServices();
    } catch { showToast("Gagal menyimpan service", "error"); }
    finally { setIsSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus service ini?')) return;
    setIsSaving(true);
    try {
      await fetch(`/api/public/services/${id}`, { method: 'DELETE' });
      showToast("Service berhasil dihapus", "success");
      fetchServices();
    } catch { showToast("Gagal menghapus", "error"); }
    finally { setIsSaving(false); }
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
            <h1 className="text-xl font-bold text-gray-900">BPS Services</h1>
            <p className="text-sm text-gray-500">Kelola layanan digital BPS yang tampil di beranda</p>
          </div>
        </div>
        <Button onClick={() => openDialog()} className="gap-2 bg-[#D83F3F] hover:bg-[#c03535] text-white shrink-0">
          <Plus className="w-4 h-4" /> Tambah
        </Button>
      </div>

      {/* List */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3 animate-pulse">
              <div className="w-14 h-14 bg-gray-100 rounded-xl shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 bg-gray-100 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
                <div className="h-3 bg-gray-100 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : services.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
            <Package className="w-6 h-6 text-gray-300" />
          </div>
          <p className="text-sm font-medium text-gray-500">Belum ada service</p>
          <Button variant="outline" size="sm" onClick={() => openDialog()} className="gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Tambah Pertama
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <div key={s.id} className="group bg-white rounded-2xl border border-gray-100 hover:border-[#D83F3F]/20 hover:shadow-md transition-all duration-200 p-4 flex items-center gap-4">
              {/* Logo */}
              <div className="w-14 h-14 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden">
                {s.logo?.startsWith('http') ? (
                  <img src={s.logo} alt={s.name} className="w-full h-full object-contain p-1" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-gray-200" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{s.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.name}</p>
                {s.link && (
                  <a href={s.link} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] text-blue-500 hover:text-blue-700 mt-1 transition-colors">
                    <ExternalLink className="w-3 h-3" />
                    <span className="truncate max-w-[120px]">{s.link.replace(/^https?:\/\//, '')}</span>
                  </a>
                )}
                <div className="mt-1.5">
                  <Badge className={`text-[10px] px-1.5 py-0 ${s.isActive ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-gray-100 text-gray-500 border-gray-200"}`}>
                    {s.isActive ? "Aktif" : "Nonaktif"}
                  </Badge>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openDialog(s)}
                  className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(s.id ?? 0)} disabled={isSaving}
                  className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Package className="w-4 h-4 text-emerald-600" />
                </div>
                <h2 className="text-base font-semibold text-gray-900">
                  {editingId ? "Edit Service" : "Tambah Service"}
                </h2>
              </div>
              <button onClick={closeDialog} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Judul Layanan</Label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Sistem Informasi BPS" className="h-10" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Nama Aplikasi</Label>
                <Input value={formData.name ?? ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="SIAPP" className="h-10" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Link Aplikasi</Label>
                <Input value={formData.link ?? ""} onChange={(e) => setFormData({ ...formData, link: e.target.value })} placeholder="https://..." className="h-10" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Upload Logo</Label>
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-emerald-300 hover:bg-emerald-50/30 transition-colors">
                  <Upload className="w-5 h-5 text-gray-300 mb-1" />
                  <span className="text-xs text-gray-400">Klik untuk pilih logo</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
                </label>
                {previewUrl && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-12 h-12 rounded-lg border border-gray-200 bg-white flex items-center justify-center overflow-hidden shrink-0">
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-contain p-1" />
                    </div>
                    <p className="text-xs text-emerald-700 flex-1 truncate">
                      {selectedFile ? `✓ ${selectedFile.name}` : "✓ Logo saat ini"}
                    </p>
                    <button onClick={() => { setSelectedFile(null); setPreviewUrl(null); }} className="text-gray-300 hover:text-red-400 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
              <Button variant="outline" onClick={closeDialog} className="flex-1 h-10">Batal</Button>
              <Button onClick={handleSave} disabled={isSaving} className="flex-1 h-10 gap-2 bg-[#D83F3F] hover:bg-[#c03535] text-white">
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
