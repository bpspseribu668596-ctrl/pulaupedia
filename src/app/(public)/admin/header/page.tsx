"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Image, Edit2, RotateCcw, X, Save, Upload,
  AlertCircle, CheckCircle2, Loader2, Eye,
} from "lucide-react";

interface HeaderData {
  id?: number;
  title: string;
  subtitle: string;
  backgroundImage: string;
}

const defaultData: HeaderData = {
  title: "PULAU PEDIA",
  subtitle: "Portal Informasi dan Layanan Digital BPS Kepulauan Seribu",
  backgroundImage: "",
};

export default function AdminHeaderPage() {
  const [headerData, setHeaderData] = useState<HeaderData>(defaultData);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState<HeaderData>(defaultData);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => { fetchHeaderData(); }, []);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchHeaderData = async () => {
    try {
      const res = await fetch('/api/public/header');
      if (res.ok) setHeaderData(await res.json());
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  };

  const openDialog = () => {
    setFormData({ ...headerData });
    setSelectedFile(null);
    setPreviewUrl(headerData.backgroundImage?.startsWith('http') ? headerData.backgroundImage : null);
    setShowDialog(true);
  };

  const closeDialog = () => { setShowDialog(false); setSelectedFile(null); setPreviewUrl(null); };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { showToast("Hanya file gambar yang diizinkan", "error"); return; }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!formData.title || !formData.subtitle) { showToast("Judul dan subtitle harus diisi", "error"); return; }
    setIsSaving(true);
    try {
      let backgroundImage = formData.backgroundImage;
      if (selectedFile) {
        const fd = new FormData();
        fd.append('file', selectedFile);
        const up = await fetch('/api/public/uploads/header', { method: 'POST', body: fd });
        if (!up.ok) throw new Error();
        backgroundImage = (await up.json()).path;
      }
      const res = await fetch('/api/public/header', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, backgroundImage }),
      });
      if (!res.ok) throw new Error();
      showToast("Header berhasil diperbarui", "success");
      closeDialog();
      fetchHeaderData();
    } catch { showToast("Gagal menyimpan header", "error"); }
    finally { setIsSaving(false); }
  };

  const handleReset = async () => {
    if (!confirm('Reset header ke default?')) return;
    setIsSaving(true);
    try {
      await fetch('/api/public/header', { method: 'DELETE' });
      showToast("Header direset ke default", "success");
      fetchHeaderData();
    } catch { showToast("Gagal reset", "error"); }
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
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
            <Image className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Header Settings</h1>
            <p className="text-sm text-gray-500">Atur judul, subtitle, dan background halaman utama</p>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={handleReset} disabled={isSaving} className="gap-1.5 text-xs">
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </Button>
          <Button size="sm" onClick={openDialog} className="gap-1.5 bg-[#D83F3F] hover:bg-[#c03535] text-white text-xs">
            <Edit2 className="w-3.5 h-3.5" /> Edit
          </Button>
        </div>
      </div>

      {/* Preview card */}
      {isLoading ? (
        <div className="bg-gray-200 rounded-2xl h-56 animate-pulse" />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          {/* Hero preview */}
          <div className="relative h-56 bg-[#333333] overflow-hidden">
            {headerData.backgroundImage?.startsWith('http') && (
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${headerData.backgroundImage}')` }} />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-[#333333]/80 via-[#333333]/70 to-[#333333]/60" />
            <div className="absolute bottom-0 left-0 right-0 border-b-4 border-[#D83F3F]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 gap-2">
              <h2 className="text-white text-3xl md:text-4xl font-bold tracking-wide drop-shadow-xl">
                {headerData.title}
              </h2>
              <p className="text-white/80 text-sm max-w-lg">{headerData.subtitle}</p>
            </div>
            <div className="absolute top-3 right-3">
              <span className="flex items-center gap-1 bg-black/40 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm">
                <Eye className="w-3 h-3" /> Preview
              </span>
            </div>
          </div>

          {/* Detail */}
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            <div className="px-5 py-4">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Judul</p>
              <p className="text-sm font-semibold text-gray-800 truncate">{headerData.title}</p>
            </div>
            <div className="px-5 py-4">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Subtitle</p>
              <p className="text-sm text-gray-600 line-clamp-2">{headerData.subtitle}</p>
            </div>
            <div className="px-5 py-4">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Background</p>
              <p className="text-xs text-gray-400 truncate">{headerData.backgroundImage || "Tidak ada gambar"}</p>
            </div>
          </div>
        </div>
      )}

      {/* Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Image className="w-4 h-4 text-blue-600" />
                </div>
                <h2 className="text-base font-semibold text-gray-900">Edit Header</h2>
              </div>
              <button onClick={closeDialog} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Judul (Title)</Label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="PULAU PEDIA" className="h-10" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Subtitle</Label>
                <Textarea value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} placeholder="Portal Informasi..." className="min-h-[90px] resize-none" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Background Image</Label>
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-colors">
                  <Upload className="w-5 h-5 text-gray-300 mb-1" />
                  <span className="text-xs text-gray-400">Klik untuk pilih gambar</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
                </label>
                {previewUrl && (
                  <div className="relative rounded-xl overflow-hidden border border-gray-100">
                    <img src={previewUrl} alt="Preview" className="w-full h-36 object-cover" />
                    <button onClick={() => { setSelectedFile(null); setPreviewUrl(null); }} className="absolute top-2 right-2 w-7 h-7 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white">
                      <X className="w-3.5 h-3.5" />
                    </button>
                    {selectedFile && <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full">{selectedFile.name}</div>}
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
              <Button variant="outline" onClick={closeDialog} className="flex-1 h-10">Batal</Button>
              <Button onClick={handleSave} disabled={isSaving} className="flex-1 h-10 gap-2 bg-[#D83F3F] hover:bg-[#c03535] text-white">
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
