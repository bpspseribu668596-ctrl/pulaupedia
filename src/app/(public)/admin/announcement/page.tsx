"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Plus, Trash2, Edit2, X, Save, Bell, ImageIcon,
  Calendar, AlertCircle, CheckCircle2, Upload, Loader2,
} from "lucide-react";

interface Announcement {
  id?: number;
  title: string;
  content: string;
  image?: string;
  isActive: boolean;
  createdAt?: string;
}

export default function AdminAnnouncementPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Announcement>({ title: "", content: "", image: "", isActive: true });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => { fetchAnnouncements(); }, []);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch('/api/public/announcements?all=true');
      if (res.ok) setAnnouncements(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ title: "", content: "", image: "", isActive: true });
    setEditingId(null);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const openDialog = (a?: Announcement) => {
    if (a) {
      setEditingId(a.id ?? null);
      setFormData(a);
      setPreviewUrl(a.image?.startsWith('http') ? a.image : null);
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
    if (!formData.title || !formData.content) { showToast("Judul dan konten harus diisi", "error"); return; }
    setIsSaving(true);
    try {
      let imageUrl = formData.image ?? "";
      if (selectedFile) {
        const fd = new FormData();
        fd.append('file', selectedFile);
        const up = await fetch('/api/public/uploads/announcements', { method: 'POST', body: fd });
        if (!up.ok) throw new Error('Upload failed');
        imageUrl = (await up.json()).path;
      }
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/public/announcements/${editingId}` : '/api/public/announcements';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, image: imageUrl }),
      });
      if (!res.ok) throw new Error();
      showToast(editingId ? "Announcement berhasil diperbarui" : "Announcement berhasil ditambahkan", "success");
      closeDialog();
      fetchAnnouncements();
    } catch {
      showToast("Gagal menyimpan announcement", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus announcement ini?')) return;
    setIsSaving(true);
    try {
      await fetch(`/api/public/announcements/${id}`, { method: 'DELETE' });
      showToast("Announcement berhasil dihapus", "success");
      fetchAnnouncements();
    } catch {
      showToast("Gagal menghapus", "error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-sm font-medium transition-all animate-in slide-in-from-top-2 ${
          toast.type === "success"
            ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
            : "bg-red-50 border border-red-200 text-red-800"
        }`}>
          {toast.type === "success"
            ? <CheckCircle2 className="w-4 h-4 shrink-0" />
            : <AlertCircle className="w-4 h-4 shrink-0" />}
          {toast.msg}
        </div>
      )}

      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
            <Bell className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Announcement</h1>
            <p className="text-sm text-gray-500">Kelola pengumuman yang tampil di halaman utama</p>
          </div>
        </div>
        <Button onClick={() => openDialog()} className="gap-2 bg-[#D83F3F] hover:bg-[#c03535] text-white shrink-0">
          <Plus className="w-4 h-4" /> Tambah
        </Button>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-2xl font-bold text-gray-900">{announcements.length}</p>
          <p className="text-xs text-gray-500 mt-0.5">Total Announcement</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-2xl font-bold text-emerald-600">{announcements.filter(a => a.isActive).length}</p>
          <p className="text-xs text-gray-500 mt-0.5">Aktif</p>
        </div>
      </div>

      {/* List */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 animate-pulse">
              <div className="h-44 bg-gray-100 rounded-t-2xl" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-100 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-3 bg-gray-100 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : announcements.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
            <Bell className="w-6 h-6 text-gray-300" />
          </div>
          <p className="text-sm font-medium text-gray-500">Belum ada announcement</p>
          <Button variant="outline" size="sm" onClick={() => openDialog()} className="gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Buat Pertama
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {announcements.map((a) => (
            <div key={a.id} className="group bg-white rounded-2xl border border-gray-100 hover:border-[#D83F3F]/20 hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden">
              {/* Image */}
              <div className="w-full h-44 bg-gray-50 overflow-hidden relative">
                {a.image?.startsWith('http') ? (
                  <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-200" />
                  </div>
                )}
                {/* Active badge */}
                <div className="absolute top-2 right-2">
                  <Badge className={a.isActive ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-gray-100 text-gray-500 border-gray-200"}>
                    {a.isActive ? "Aktif" : "Nonaktif"}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-4 flex flex-col gap-2">
                <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 leading-snug">{a.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-3 flex-1">{a.content}</p>
                {a.createdAt && (
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mt-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(a.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="px-4 pb-4 flex gap-2">
                <Button size="sm" variant="outline" onClick={() => openDialog(a)} className="flex-1 gap-1.5 text-xs h-8">
                  <Edit2 className="w-3 h-3" /> Edit
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(a.id ?? 0)} disabled={isSaving}
                  className="flex-1 gap-1.5 text-xs h-8 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300">
                  <Trash2 className="w-3 h-3" /> Hapus
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Dialog header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-orange-600" />
                </div>
                <h2 className="text-base font-semibold text-gray-900">
                  {editingId ? "Edit Announcement" : "Tambah Announcement"}
                </h2>
              </div>
              <button onClick={closeDialog} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Dialog body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Judul</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Judul pengumuman..."
                  className="h-10"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Konten</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Isi pengumuman..."
                  className="min-h-[120px] resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Gambar (Opsional)</Label>
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#D83F3F]/40 hover:bg-red-50/30 transition-colors">
                  <Upload className="w-5 h-5 text-gray-300 mb-1" />
                  <span className="text-xs text-gray-400">Klik untuk pilih gambar</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
                </label>
                {previewUrl && (
                  <div className="relative mt-2 rounded-xl overflow-hidden border border-gray-100">
                    <img src={previewUrl} alt="Preview" className="w-full h-40 object-cover" />
                    <button
                      onClick={() => { setSelectedFile(null); setPreviewUrl(null); setFormData(f => ({ ...f, image: "" })); }}
                      className="absolute top-2 right-2 w-7 h-7 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    {selectedFile && (
                      <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full">
                        {selectedFile.name}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Dialog footer */}
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
