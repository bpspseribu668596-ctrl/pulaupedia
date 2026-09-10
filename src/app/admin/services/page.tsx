"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Plus, Trash2, Edit2, X } from "lucide-react";

interface Service {
  id?: number;
  title: string;
  name?: string;
  logo?: string;
  link?: string;
  sortOrder: number;
  isActive: boolean;
  type: 'header' | 'service';
  description?: string;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Service>({ title: "", name: "", logo: "", link: "", sortOrder: 0, isActive: true, type: 'service' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => { fetchServices(); }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services?all=true');
      if (res.ok) {
        const data = await res.json();
        setServices(data.filter((s: Service) => s.type === 'service'));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ title: "", name: "", logo: "", link: "", sortOrder: 0, isActive: true, type: 'service' });
    setEditingId(null);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const openDialog = (service?: Service) => {
    if (service) {
      setEditingId(service.id || null);
      setFormData(service);
      setPreviewUrl(service.logo?.startsWith('http') ? service.logo : null);
    } else {
      resetForm();
    }
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    resetForm();
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
    if (!formData.title || !formData.name || !formData.link) {
      setSaveMessage("Error: Judul, nama aplikasi, dan link harus diisi");
      return;
    }

    setIsSaving(true);
    setSaveMessage("");
    try {
      let logo = formData.logo || "";

      if (selectedFile) {
        const fd = new FormData();
        fd.append('file', selectedFile);
        const uploadRes = await fetch('/api/uploads/services', { method: 'POST', body: fd });
        if (!uploadRes.ok) throw new Error('Upload failed');
        const result = await uploadRes.json();
        logo = result.path;
      }

      if (!logo) {
        setSaveMessage("Error: Logo harus diisi");
        setIsSaving(false);
        return;
      }

      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/services/${editingId}` : '/api/services';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, logo }),
      });

      if (!res.ok) throw new Error('Save failed');

      setSaveMessage(editingId ? "Service berhasil diperbarui!" : "Service berhasil ditambahkan!");
      closeDialog();
      fetchServices();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (e) {
      setSaveMessage("Error: Gagal menyimpan service");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus service ini?')) return;
    setIsSaving(true);
    try {
      await fetch(`/api/services/${id}`, { method: 'DELETE' });
      setSaveMessage("Service berhasil dihapus!");
      fetchServices();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (e) {
      setSaveMessage("Error: Gagal menghapus");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="space-y-6"><p className="text-muted-foreground">Loading...</p></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">BPS Services Settings</h1>
        <p className="text-muted-foreground mt-2">Kelola layanan BPS</p>
      </div>

      {saveMessage && (
        <div className={`p-4 rounded-lg ${saveMessage.includes("berhasil") ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"}`}>
          {saveMessage}
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Daftar Services</h2>
            <p className="text-sm text-gray-500">Total: {services.length} service</p>
          </div>
          <Button onClick={() => openDialog()} className="gap-2"><Plus className="w-4 h-4" /> Tambah Service</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {services.map((service) => (
            <Card key={service.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="flex-1 p-4 flex flex-col">
                <div className="text-center mb-3">
                  <h3 className="font-semibold text-sm line-clamp-2">{service.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{service.name}</p>
                </div>
                <div className="flex-1 flex items-center justify-center mb-3">
                  <div className="w-20 h-20">
                    {service.logo?.startsWith('http') ? (
                      <img src={service.logo} alt={service.name} className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded border border-gray-200">
                        <span className="text-gray-400 text-xs text-center">Gambar</span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-600 text-center truncate mb-3">{service.link}</p>
                <div className="flex gap-2 mt-auto">
                  <Button size="sm" variant="outline" onClick={() => openDialog(service)} className="flex-1"><Edit2 className="w-3 h-3" /></Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(service.id || 0)} disabled={isSaving} className="flex-1"><Trash2 className="w-3 h-3" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-12"><p className="text-gray-400">Belum ada service</p></div>
        )}
      </div>

      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>{editingId ? 'Edit Service' : 'Tambah Service Baru'}</CardTitle>
              <button onClick={closeDialog} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Judul Layanan</Label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Sistem Informasi BPS" className="mt-1" />
              </div>
              <div>
                <Label>Nama Aplikasi</Label>
                <Input value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="SIAPP" className="mt-1" />
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
              <div>
                <Label>Link Aplikasi</Label>
                <Input value={formData.link || ""} onChange={(e) => setFormData({ ...formData, link: e.target.value })} placeholder="https://..." className="mt-1" />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSave} disabled={isSaving} className="flex-1 gap-2">
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Menyimpan...' : editingId ? 'Simpan Perubahan' : 'Tambah Service'}
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
