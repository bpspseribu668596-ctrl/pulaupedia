"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Plus, Trash2, Edit2, Upload } from "lucide-react";

interface Service {
  id?: number;
  title: string;
  name: string;
  logo: string;
  link: string;
  sortOrder: number;
  isActive: boolean;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Service | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [newService, setNewService] = useState<Service>({
    title: "",
    name: "",
    logo: "",
    link: "",
    sortOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddService = async () => {
    if (!newService.title || !newService.name || !newService.logo || !newService.link) {
      setSaveMessage("Error: Semua field harus diisi");
      return;
    }

    setIsSaving(true);
    setSaveMessage("");
    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newService),
      });

      if (!response.ok) throw new Error('Failed to add service');

      setSaveMessage("Service berhasil ditambahkan!");
      setNewService({ title: "", name: "", logo: "", link: "", sortOrder: 0, isActive: true });
      fetchServices();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: Gagal menambah service");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditService = async () => {
    if (!editFormData || !editingId) return;

    if (!editFormData.title || !editFormData.name || !editFormData.logo || !editFormData.link) {
      setSaveMessage("Error: Semua field harus diisi");
      return;
    }

    setIsSaving(true);
    setSaveMessage("");
    try {
      const response = await fetch(`/api/services/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData),
      });

      if (!response.ok) throw new Error('Failed to update service');

      setSaveMessage("Service berhasil diperbarui!");
      setEditingId(null);
      setEditFormData(null);
      fetchServices();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: Gagal memperbarui service");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteService = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus service ini?')) return;

    setIsSaving(true);
    try {
      const response = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete service');

      setSaveMessage("Service berhasil dihapus!");
      fetchServices();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: Gagal menghapus service");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>, isNew: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setSaveMessage("Error: Hanya file gambar yang diizinkan");
      return;
    }

    setIsUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      const response = await fetch('/api/uploads/services', {
        method: 'POST',
        body: formDataUpload,
      });

      if (!response.ok) throw new Error('Upload failed');

      const result = await response.json();
      if (isNew) {
        setNewService(prev => ({ ...prev, logo: result.path }));
      } else if (editFormData) {
        setEditFormData(prev => prev ? { ...prev, logo: result.path } : null);
      }
    } catch (error) {
      setSaveMessage("Error: Gagal upload logo");
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return <div className="space-y-6"><p className="text-muted-foreground">Loading...</p></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">BPS Services Settings</h1>
        <p className="text-muted-foreground mt-2">Kelola layanan dan aplikasi web BPS</p>
      </div>

      {saveMessage && (
        <div className={`p-4 rounded-lg ${
          saveMessage.includes("berhasil") 
            ? "bg-green-50 border border-green-200 text-green-800" 
            : "bg-red-50 border border-red-200 text-red-800"
        }`}>
          {saveMessage}
        </div>
      )}

      <div className="grid gap-6">
        {/* List Services */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Services</CardTitle>
            <CardDescription>Total: {services.length} service</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {services.map((service) => (
                <div key={service.id} className="p-4 border rounded-lg bg-gray-50 flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{service.title}</p>
                    <p className="text-xs text-gray-500">{service.name} • {service.link}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingId(service.id || null);
                        setEditFormData({ ...service });
                      }}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteService(service.id || 0)}
                      disabled={isSaving}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Edit Service */}
        {editingId && editFormData && (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle>Edit Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Judul Layanan</Label>
                  <Input
                    value={editFormData.title}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Nama Aplikasi</Label>
                  <Input
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Logo</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleLogoUpload(e, false)}
                    disabled={isUploading}
                    className="mt-1"
                  />
                  {editFormData.logo && (
                    <p className="text-xs text-gray-500 mt-1">{editFormData.logo}</p>
                  )}
                </div>
                <div>
                  <Label>Link Aplikasi</Label>
                  <Input
                    value={editFormData.link}
                    onChange={(e) => setEditFormData({ ...editFormData, link: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleEditService}
                  disabled={isSaving}
                  className="gap-2"
                >
                  <Save className="w-4 h-4" />
                  Simpan Perubahan
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingId(null);
                    setEditFormData(null);
                  }}
                >
                  Batal
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add New Service */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Tambah Service Baru
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Judul Layanan</Label>
                <Input
                  value={newService.title}
                  onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                  placeholder="Zona Integritas BPS"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Nama Aplikasi</Label>
                <Input
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  placeholder="ZI APP"
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Upload Logo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleLogoUpload(e, true)}
                  disabled={isUploading}
                  className="mt-1"
                />
                {newService.logo && (
                  <p className="text-xs text-gray-500 mt-1">{newService.logo}</p>
                )}
              </div>
              <div>
                <Label>Link Aplikasi</Label>
                <Input
                  value={newService.link}
                  onChange={(e) => setNewService({ ...newService, link: e.target.value })}
                  placeholder="https://..."
                  className="mt-1"
                />
              </div>
            </div>
            <Button
              onClick={handleAddService}
              disabled={isSaving}
              className="w-full gap-2"
            >
              <Plus className="w-4 h-4" />
              Tambah Service
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
