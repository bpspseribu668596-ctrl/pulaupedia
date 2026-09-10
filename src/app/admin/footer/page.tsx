"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Edit2, RotateCcw, X, Plus, Trash2 } from "lucide-react";

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
  const [saveMessage, setSaveMessage] = useState("");

  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState<FooterConfig>(defaultData);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => { fetchFooterConfig(); }, []);

  const fetchFooterConfig = async () => {
    try {
      const res = await fetch('/api/footer');
      if (res.ok) setFooterData(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const openDialog = () => {
    setFormData({ ...footerData });
    setSelectedFile(null);
    setPreviewUrl(footerData.logo?.startsWith('http') ? footerData.logo : null);
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setSaveMessage("Error: Hanya file gambar yang diizinkan");
      return;
    }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!formData.companyName) {
      setSaveMessage("Error: Nama perusahaan harus diisi");
      return;
    }

    setIsSaving(true);
    setSaveMessage("");
    try {
      let logo = formData.logo;

      if (selectedFile) {
        const fd = new FormData();
        fd.append('file', selectedFile);
        const uploadRes = await fetch('/api/uploads/footer', { method: 'POST', body: fd });
        if (!uploadRes.ok) throw new Error('Upload failed');
        const result = await uploadRes.json();
        logo = result.path;
      }

      const res = await fetch('/api/footer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, logo }),
      });

      if (!res.ok) throw new Error('Save failed');

      setSaveMessage("Footer berhasil diperbarui!");
      closeDialog();
      fetchFooterConfig();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (e) {
      setSaveMessage("Error: Gagal menyimpan footer");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirm('Reset ke default?')) return;
    setIsSaving(true);
    try {
      await fetch('/api/footer', { method: 'DELETE' });
      setSaveMessage("Footer direset ke default!");
      fetchFooterConfig();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (e) {
      setSaveMessage("Error: Gagal reset");
    } finally {
      setIsSaving(false);
    }
  };

  const addAddress = () => setFormData(p => ({ ...p, companyAddress: [...p.companyAddress, ''] }));
  const removeAddress = (i: number) => setFormData(p => ({ ...p, companyAddress: p.companyAddress.filter((_, idx) => idx !== i) }));
  const updateAddress = (i: number, v: string) => setFormData(p => ({ ...p, companyAddress: p.companyAddress.map((a, idx) => idx === i ? v : a) }));

  const addContact = () => setFormData(p => ({ ...p, contacts: [...p.contacts, { label: '', value: '' }] }));
  const removeContact = (i: number) => setFormData(p => ({ ...p, contacts: p.contacts.filter((_, idx) => idx !== i) }));
  const updateContact = (i: number, field: 'label' | 'value', v: string) => setFormData(p => ({ ...p, contacts: p.contacts.map((c, idx) => idx === i ? { ...c, [field]: v } : c) }));

  const addLink = () => setFormData(p => ({ ...p, links: [...p.links, { label: '', url: '' }] }));
  const removeLink = (i: number) => setFormData(p => ({ ...p, links: p.links.filter((_, idx) => idx !== i) }));
  const updateLink = (i: number, field: 'label' | 'url', v: string) => setFormData(p => ({ ...p, links: p.links.map((l, idx) => idx === i ? { ...l, [field]: v } : l) }));

  if (isLoading) return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Footer Settings</h1>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Footer Settings</h1>
        <p className="text-muted-foreground mt-2">Atur konfigurasi footer</p>
      </div>

      {saveMessage && (
        <div className={`p-4 rounded-lg ${saveMessage.includes("berhasil") || saveMessage.includes("direset") ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"}`}>
          {saveMessage}
        </div>
      )}

      <Card className="overflow-hidden">
        <div className="bg-[#111111] py-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundImage: `linear-gradient(to right, #A87932, #D83F3F)` }} />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-4">
                {footerData?.logo?.startsWith('http') ? (
                  <img src={footerData.logo} alt="Logo BPS" className="h-20 object-contain opacity-90" />
                ) : (
                  <div className="w-20 h-20 flex items-center justify-center rounded bg-white/10">
                    <span className="text-white/50 text-xs text-center leading-tight">Logo<br/>tidak tersedia</span>
                  </div>
                )}
                <span className="text-white font-bold text-xl md:text-2xl uppercase">{footerData?.companyName}</span>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-6">
              <p className="text-center text-gray-400 text-sm">© 2026 {footerData?.companyName}. All rights reserved.</p>
            </div>
          </div>
        </div>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Footer Preview</CardTitle>
              <CardDescription>Tampilan footer</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={openDialog} size="sm" className="gap-2"><Edit2 className="w-4 h-4" /> Edit</Button>
              <Button onClick={handleReset} variant="outline" size="sm" className="gap-2"><RotateCcw className="w-4 h-4" /> Reset</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div><p className="text-sm font-semibold text-gray-600">Nama Perusahaan:</p><p className="text-sm">{footerData?.companyName}</p></div>
          <div><p className="text-sm font-semibold text-gray-600">Logo URL:</p><p className="text-xs text-gray-500 break-all">{footerData?.logo || 'Belum ada logo'}</p></div>
        </CardContent>
      </Card>

      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Edit Footer</CardTitle>
              <button onClick={closeDialog} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Nama Perusahaan</Label>
                <Input value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} placeholder="BPS Kepulauan Seribu" className="mt-1" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Alamat Kantor</Label>
                  <Button onClick={addAddress} size="sm" variant="outline" className="gap-1"><Plus className="w-4 h-4" /> Tambah</Button>
                </div>
                <div className="space-y-2">
                  {formData.companyAddress.map((addr, i) => (
                    <div key={i} className="flex gap-2">
                      <Textarea value={addr} onChange={(e) => updateAddress(i, e.target.value)} placeholder="Alamat" className="min-h-[60px]" />
                      {formData.companyAddress.length > 1 && (
                        <Button onClick={() => removeAddress(i)} size="sm" variant="destructive" className="shrink-0"><Trash2 className="w-4 h-4" /></Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Kontak</Label>
                  <Button onClick={addContact} size="sm" variant="outline" className="gap-1"><Plus className="w-4 h-4" /> Tambah</Button>
                </div>
                <div className="space-y-3">
                  {formData.contacts.map((contact, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <div className="flex-1 space-y-2">
                        <Input value={contact.label} onChange={(e) => updateContact(i, 'label', e.target.value)} placeholder="Label (e.g., Telepon)" className="text-sm" />
                        <Input value={contact.value} onChange={(e) => updateContact(i, 'value', e.target.value)} placeholder="Nilai (e.g., +62-21-XXXXXX)" className="text-sm" />
                      </div>
                      {formData.contacts.length > 1 && (
                        <Button onClick={() => removeContact(i)} size="sm" variant="destructive" className="shrink-0 mt-1"><Trash2 className="w-4 h-4" /></Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Tautan Lainnya</Label>
                  <Button onClick={addLink} size="sm" variant="outline" className="gap-1"><Plus className="w-4 h-4" /> Tambah</Button>
                </div>
                <div className="space-y-3">
                  {formData.links.map((link, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <div className="flex-1 space-y-2">
                        <Input value={link.label} onChange={(e) => updateLink(i, 'label', e.target.value)} placeholder="Label (e.g., Website)" className="text-sm" />
                        <Input value={link.url} onChange={(e) => updateLink(i, 'url', e.target.value)} placeholder="URL" className="text-sm" />
                      </div>
                      {formData.links.length > 1 && (
                        <Button onClick={() => removeLink(i)} size="sm" variant="destructive" className="shrink-0 mt-1"><Trash2 className="w-4 h-4" /></Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Upload Logo</Label>
                <Input type="file" accept="image/*" onChange={handleFileSelect} className="mt-1" />
                <p className="text-xs text-gray-500 mt-1">Pilih gambar untuk melihat preview. Logo akan diupload saat klik Simpan.</p>
                {previewUrl && (
                  <div className="mt-3 flex items-center gap-3 p-3 bg-gray-50 rounded border">
                    <img src={previewUrl} alt="Preview" className="h-16 w-16 object-contain" />
                    <p className="text-xs text-green-600">
                      {selectedFile ? `✓ Siap diupload: ${selectedFile.name}` : '✓ Logo saat ini'}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSave} disabled={isSaving} className="flex-1 gap-2">
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </Button>
                <Button variant="outline" onClick={closeDialog} className="flex-1">Batal</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
