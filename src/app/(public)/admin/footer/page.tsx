"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText, Edit2, RotateCcw, X, Save, Upload, Plus, Trash2,
  AlertCircle, CheckCircle2, Loader2, Eye, Phone, Link2, MapPin,
} from "lucide-react";

interface FooterConfig {
  id?: number;
  companyName: string;
  companyAddress: string[];
  contacts: { label: string; value: string }[];
  links: { label: string; url: string }[];
  logo: string;
}

const defaultData: FooterConfig = {
  companyName: 'BPS Kepulauan Seribu',
  companyAddress: ['Jalan Raya Pulau Panjang, Kepulauan Seribu, DKI Jakarta'],
  contacts: [{ label: 'Telepon', value: '+62-21-XXXXXX' }],
  links: [{ label: 'Email', url: 'mailto:info@kepulauanseribu.bps.go.id' }],
  logo: '',
};

export default function AdminFooterPage() {
  const [footerData, setFooterData] = useState<FooterConfig>(defaultData);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState<FooterConfig>(defaultData);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => { fetchFooterConfig(); }, []);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchFooterConfig = async () => {
    try {
      const res = await fetch('/api/public/footer');
      if (res.ok) setFooterData(await res.json());
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  };

  const openDialog = () => {
    setFormData({ ...footerData });
    setSelectedFile(null);
    setPreviewUrl(footerData.logo?.startsWith('http') ? footerData.logo : null);
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
    if (!formData.companyName) { showToast("Nama perusahaan harus diisi", "error"); return; }
    setIsSaving(true);
    try {
      let logo = formData.logo;
      if (selectedFile) {
        const fd = new FormData();
        fd.append('file', selectedFile);
        const up = await fetch('/api/public/uploads/footer', { method: 'POST', body: fd });
        if (!up.ok) throw new Error();
        logo = (await up.json()).path;
      }
      const res = await fetch('/api/public/footer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, logo }),
      });
      if (!res.ok) throw new Error();
      showToast("Footer berhasil diperbarui", "success");
      closeDialog();
      fetchFooterConfig();
    } catch { showToast("Gagal menyimpan footer", "error"); }
    finally { setIsSaving(false); }
  };

  const handleReset = async () => {
    if (!confirm('Reset footer ke default?')) return;
    setIsSaving(true);
    try {
      await fetch('/api/public/footer', { method: 'DELETE' });
      showToast("Footer direset ke default", "success");
      fetchFooterConfig();
    } catch { showToast("Gagal reset", "error"); }
    finally { setIsSaving(false); }
  };

  const addAddress = () => setFormData(p => ({ ...p, companyAddress: [...p.companyAddress, ''] }));
  const removeAddress = (i: number) => setFormData(p => ({ ...p, companyAddress: p.companyAddress.filter((_, idx) => idx !== i) }));
  const updateAddress = (i: number, v: string) => setFormData(p => ({ ...p, companyAddress: p.companyAddress.map((a, idx) => idx === i ? v : a) }));

  const addContact = () => setFormData(p => ({ ...p, contacts: [...p.contacts, { label: '', value: '' }] }));
  const removeContact = (i: number) => setFormData(p => ({ ...p, contacts: p.contacts.filter((_, idx) => idx !== i) }));
  const updateContact = (i: number, f: 'label' | 'value', v: string) => setFormData(p => ({ ...p, contacts: p.contacts.map((c, idx) => idx === i ? { ...c, [f]: v } : c) }));

  const addLink = () => setFormData(p => ({ ...p, links: [...p.links, { label: '', url: '' }] }));
  const removeLink = (i: number) => setFormData(p => ({ ...p, links: p.links.filter((_, idx) => idx !== i) }));
  const updateLink = (i: number, f: 'label' | 'url', v: string) => setFormData(p => ({ ...p, links: p.links.map((l, idx) => idx === i ? { ...l, [f]: v } : l) }));

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
          <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
            <FileText className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Footer Settings</h1>
            <p className="text-sm text-gray-500">Atur informasi perusahaan, kontak, dan tautan di footer</p>
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
        <div className="bg-gray-100 rounded-2xl h-40 animate-pulse" />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Footer preview strip */}
          <div className="bg-[#111111] px-6 py-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {footerData.logo?.startsWith('http') ? (
                <img src={footerData.logo} alt="Logo" className="h-10 w-10 object-contain rounded" />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <span className="text-white/50 text-xs font-bold">PP</span>
                </div>
              )}
              <span className="text-white font-bold text-sm">{footerData.companyName}</span>
            </div>
            <div className="flex items-center gap-1 bg-white/10 text-white/60 text-[10px] px-2 py-1 rounded-full">
              <Eye className="w-3 h-3" /> Preview
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            <div className="px-5 py-4">
              <div className="flex items-center gap-1.5 mb-2">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Alamat</p>
              </div>
              <p className="text-xs text-gray-600 line-clamp-2">{footerData.companyAddress?.[0] || "—"}</p>
            </div>
            <div className="px-5 py-4">
              <div className="flex items-center gap-1.5 mb-2">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Kontak</p>
              </div>
              <div className="space-y-0.5">
                {footerData.contacts?.slice(0, 2).map((c, i) => (
                  <p key={i} className="text-xs text-gray-600">{c.label}: {c.value}</p>
                ))}
              </div>
            </div>
            <div className="px-5 py-4">
              <div className="flex items-center gap-1.5 mb-2">
                <Link2 className="w-3.5 h-3.5 text-gray-400" />
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Tautan</p>
              </div>
              <div className="space-y-0.5">
                {footerData.links?.slice(0, 2).map((l, i) => (
                  <p key={i} className="text-xs text-gray-600 truncate">{l.label}</p>
                ))}
              </div>
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
                <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-teal-600" />
                </div>
                <h2 className="text-base font-semibold text-gray-900">Edit Footer</h2>
              </div>
              <button onClick={closeDialog} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              {/* Nama */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Nama Perusahaan</Label>
                <Input value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} placeholder="BPS Kepulauan Seribu" className="h-10" />
              </div>

              {/* Alamat */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Alamat Kantor</Label>
                  <Button onClick={addAddress} size="sm" variant="outline" className="h-7 text-xs gap-1 px-2"><Plus className="w-3 h-3" /> Tambah</Button>
                </div>
                <div className="space-y-2">
                  {formData.companyAddress.map((addr, i) => (
                    <div key={i} className="flex gap-2">
                      <Textarea value={addr} onChange={(e) => updateAddress(i, e.target.value)} placeholder="Alamat kantor" className="min-h-[64px] resize-none text-sm" />
                      {formData.companyAddress.length > 1 && (
                        <button onClick={() => removeAddress(i)} className="shrink-0 w-8 h-8 mt-1 rounded-lg border border-red-200 text-red-400 hover:bg-red-50 flex items-center justify-center transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Kontak */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Kontak</Label>
                  <Button onClick={addContact} size="sm" variant="outline" className="h-7 text-xs gap-1 px-2"><Plus className="w-3 h-3" /> Tambah</Button>
                </div>
                <div className="space-y-2">
                  {formData.contacts.map((c, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <Input value={c.label} onChange={(e) => updateContact(i, 'label', e.target.value)} placeholder="Label" className="h-9 text-sm" />
                        <Input value={c.value} onChange={(e) => updateContact(i, 'value', e.target.value)} placeholder="Nilai" className="h-9 text-sm" />
                      </div>
                      {formData.contacts.length > 1 && (
                        <button onClick={() => removeContact(i)} className="shrink-0 w-8 h-8 mt-0.5 rounded-lg border border-red-200 text-red-400 hover:bg-red-50 flex items-center justify-center transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Tautan Lainnya</Label>
                  <Button onClick={addLink} size="sm" variant="outline" className="h-7 text-xs gap-1 px-2"><Plus className="w-3 h-3" /> Tambah</Button>
                </div>
                <div className="space-y-2">
                  {formData.links.map((l, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <Input value={l.label} onChange={(e) => updateLink(i, 'label', e.target.value)} placeholder="Label" className="h-9 text-sm" />
                        <Input value={l.url} onChange={(e) => updateLink(i, 'url', e.target.value)} placeholder="URL" className="h-9 text-sm" />
                      </div>
                      {formData.links.length > 1 && (
                        <button onClick={() => removeLink(i)} className="shrink-0 w-8 h-8 mt-0.5 rounded-lg border border-red-200 text-red-400 hover:bg-red-50 flex items-center justify-center transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Logo */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Upload Logo</Label>
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-teal-300 hover:bg-teal-50/30 transition-colors">
                  <Upload className="w-5 h-5 text-gray-300 mb-1" />
                  <span className="text-xs text-gray-400">Klik untuk pilih logo</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
                </label>
                {previewUrl && (
                  <div className="flex items-center gap-3 p-3 bg-[#111111] rounded-xl">
                    <img src={previewUrl} alt="Preview" className="h-10 w-10 object-contain" />
                    <p className="text-xs text-white/70 flex-1 truncate">{selectedFile ? selectedFile.name : "Logo saat ini"}</p>
                    <button onClick={() => { setSelectedFile(null); setPreviewUrl(null); }} className="text-white/30 hover:text-white/60 transition-colors">
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
