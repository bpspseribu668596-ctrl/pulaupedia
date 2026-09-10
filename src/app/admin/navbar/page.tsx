"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Edit2, RotateCcw, X } from "lucide-react";

interface NavbarConfig {
  id?: number;
  logo: string;
  logoAlt: string;
  brandName: string;
}

const defaultData: NavbarConfig = {
  logo: '',
  logoAlt: 'Pulau Pedia Logo',
  brandName: 'PULAU PEDIA',
};

export default function AdminNavbarPage() {
  const [navbarData, setNavbarData] = useState<NavbarConfig>(defaultData);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState("");

  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState<NavbarConfig>(defaultData);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => { fetchNavbarConfig(); }, []);

  const fetchNavbarConfig = async () => {
    try {
      const res = await fetch('/api/navbar');
      if (res.ok) setNavbarData(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const openDialog = () => {
    setFormData({ ...navbarData });
    setSelectedFile(null);
    setPreviewUrl(navbarData.logo?.startsWith('http') ? navbarData.logo : null);
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
    setIsSaving(true);
    setSaveMessage("");
    try {
      let logo = formData.logo;

      if (selectedFile) {
        const fd = new FormData();
        fd.append('file', selectedFile);
        const uploadRes = await fetch('/api/uploads/navbar', { method: 'POST', body: fd });
        if (!uploadRes.ok) throw new Error('Upload failed');
        const result = await uploadRes.json();
        logo = result.path;
      }

      const res = await fetch('/api/navbar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, logo }),
      });

      if (!res.ok) throw new Error('Save failed');

      setSaveMessage("Navbar berhasil diperbarui!");
      closeDialog();
      fetchNavbarConfig();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (e) {
      setSaveMessage("Error: Gagal menyimpan navbar");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirm('Reset ke default?')) return;
    setIsSaving(true);
    try {
      await fetch('/api/navbar', { method: 'DELETE' });
      setSaveMessage("Navbar direset ke default!");
      fetchNavbarConfig();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (e) {
      setSaveMessage("Error: Gagal reset");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Navbar Settings</h1>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Navbar Settings</h1>
        <p className="text-muted-foreground mt-2">Atur tampilan navbar dengan logo dan nama brand</p>
      </div>

      {saveMessage && (
        <div className={`p-4 rounded-lg ${saveMessage.includes("berhasil") || saveMessage.includes("direset") ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"}`}>
          {saveMessage}
        </div>
      )}

      <Card className="overflow-hidden">
        <div className="bg-white border-b p-4">
          <div className="container mx-auto flex items-center gap-3">
            <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-[#111111]">
              {navbarData.logo?.startsWith('http') ? (
                <img src={navbarData.logo} alt={navbarData.logoAlt} className="w-8 h-8 object-contain" />
              ) : (
                <span className="text-white text-xs font-bold">BP</span>
              )}
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-semibold">{navbarData.brandName}</span>
              <span className="text-xs text-muted-foreground">Admin</span>
            </div>
          </div>
        </div>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Navbar Preview</CardTitle>
              <CardDescription>Tampilan navbar dengan logo dan brand name</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={openDialog} size="sm" className="gap-2"><Edit2 className="w-4 h-4" /> Edit</Button>
              <Button onClick={handleReset} variant="outline" size="sm" className="gap-2"><RotateCcw className="w-4 h-4" /> Reset</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-semibold text-gray-600">Logo URL:</p>
          <p className="text-xs text-gray-500 break-all">{navbarData.logo || 'Belum ada logo'}</p>
        </CardContent>
      </Card>

      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Edit Navbar</CardTitle>
              <button onClick={closeDialog} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Upload Logo</Label>
                <Input type="file" accept="image/*" onChange={handleFileSelect} className="mt-1" />
                <p className="text-xs text-gray-500 mt-1">Pilih gambar untuk melihat preview. Logo akan diupload saat klik Simpan.</p>
                {previewUrl && (
                  <div className="mt-3 flex items-center gap-3 p-3 bg-gray-50 rounded border">
                    <img src={previewUrl} alt="Preview" className="h-16 w-16 object-contain" />
                    <div>
                      <p className="text-xs text-green-600">
                        {selectedFile ? `✓ Siap diupload: ${selectedFile.name}` : '✓ Logo saat ini'}
                      </p>
                    </div>
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
