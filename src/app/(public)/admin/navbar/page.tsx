"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Layout, Edit2, RotateCcw, X, Save, Upload,
  AlertCircle, CheckCircle2, Loader2, Eye,
} from "lucide-react";

interface NavbarConfig {
  id?: number;
  logo: string;
  logoAlt: string;
  brandName: string;
}

const defaultData: NavbarConfig = { logo: '', logoAlt: 'Pulau Pedia Logo', brandName: 'PULAU PEDIA' };

export default function AdminNavbarPage() {
  const [navbarData, setNavbarData] = useState<NavbarConfig>(defaultData);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState<NavbarConfig>(defaultData);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => { fetchNavbarConfig(); }, []);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchNavbarConfig = async () => {
    try {
      const res = await fetch('/api/public/navbar');
      if (res.ok) setNavbarData(await res.json());
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  };

  const openDialog = () => {
    setFormData({ ...navbarData });
    setSelectedFile(null);
    setPreviewUrl(navbarData.logo?.startsWith('http') ? navbarData.logo : null);
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
    setIsSaving(true);
    try {
      let logo = formData.logo;
      if (selectedFile) {
        const fd = new FormData();
        fd.append('file', selectedFile);
        const up = await fetch('/api/public/uploads/navbar', { method: 'POST', body: fd });
        if (!up.ok) throw new Error();
        logo = (await up.json()).path;
      }
      const res = await fetch('/api/public/navbar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, logo }),
      });
      if (!res.ok) throw new Error();
      showToast("Navbar berhasil diperbarui", "success");
      closeDialog();
      fetchNavbarConfig();
    } catch { showToast("Gagal menyimpan navbar", "error"); }
    finally { setIsSaving(false); }
  };

  const handleReset = async () => {
    if (!confirm('Reset navbar ke default?')) return;
    setIsSaving(true);
    try {
      await fetch('/api/public/navbar', { method: 'DELETE' });
      showToast("Navbar direset ke default", "success");
      fetchNavbarConfig();
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
          <div>
            <h1 className="text-xl font-bold text-gray-900">Navbar Settings</h1>
            <p className="text-sm text-gray-500">Konfigurasi logo dan nama brand di navigation bar</p>
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
        <div className="bg-gray-100 rounded-2xl h-32 animate-pulse" />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Navbar preview */}
          <div className="border-b border-gray-100 px-5 py-3 bg-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#111111] flex items-center justify-center overflow-hidden shrink-0">
                {navbarData.logo?.startsWith('http') ? (
                  <img src={navbarData.logo} alt={navbarData.logoAlt} className="w-7 h-7 object-contain" />
                ) : (
                  <span className="text-white text-xs font-bold">PP</span>
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{navbarData.brandName}</p>
                <p className="text-[10px] text-gray-400">Portal BPS</p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-gray-50 text-gray-400 text-[10px] px-2 py-1 rounded-full border border-gray-100">
              <Eye className="w-3 h-3" /> Preview
            </div>
          </div>

          {/* Detail */}
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            <div className="px-5 py-4">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Brand Name</p>
              <p className="text-sm font-semibold text-gray-800">{navbarData.brandName}</p>
            </div>
            <div className="px-5 py-4">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Logo Alt</p>
              <p className="text-sm text-gray-600">{navbarData.logoAlt}</p>
            </div>
            <div className="px-5 py-4">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Logo URL</p>
              <p className="text-xs text-gray-400 truncate">{navbarData.logo || "Belum ada logo"}</p>
            </div>
          </div>
        </div>
      )}

      {/* Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                  <Layout className="w-4 h-4 text-violet-600" />
                </div>
                <h2 className="text-base font-semibold text-gray-900">Edit Navbar</h2>
              </div>
              <button onClick={closeDialog} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Brand Name</Label>
                <Input value={formData.brandName} onChange={(e) => setFormData({ ...formData, brandName: e.target.value })} placeholder="PULAU PEDIA" className="h-10" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Logo Alt Text</Label>
                <Input value={formData.logoAlt} onChange={(e) => setFormData({ ...formData, logoAlt: e.target.value })} placeholder="Pulau Pedia Logo" className="h-10" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Upload Logo</Label>
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-violet-300 hover:bg-violet-50/30 transition-colors">
                  <Upload className="w-5 h-5 text-gray-300 mb-1" />
                  <span className="text-xs text-gray-400">Klik untuk pilih logo</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
                </label>
                {previewUrl && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-12 h-12 rounded-lg bg-[#111111] flex items-center justify-center overflow-hidden shrink-0">
                      <img src={previewUrl} alt="Preview" className="w-10 h-10 object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-emerald-700">{selectedFile ? `✓ ${selectedFile.name}` : "✓ Logo saat ini"}</p>
                    </div>
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
                {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
