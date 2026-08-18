"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Plus, Trash2, Edit2, Upload, X } from "lucide-react";

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
  const [isUploading, setIsUploading] = useState(false);
  
  const [headerData, setHeaderData] = useState<Service | null>(null);
  const [editingHeaderForm, setEditingHeaderForm] = useState(false);
  const [headerFormData, setHeaderFormData] = useState<Service>({
    title: "",
    description: "",
    sortOrder: 0,
    isActive: true,
    type: 'header',
  });

  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Service>({
    title: "",
    name: "",
    logo: "",
    link: "",
    sortOrder: 0,
    isActive: true,
    type: 'service',
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services?all=true');
      if (response.ok) {
        const data = await response.json();
        const header = data.find((s: Service) => s.type === 'header');
        const servicesList = data.filter((s: Service) => s.type === 'service');
        
        setHeaderData(header || null);
        setServices(servicesList);
        
        if (header) {
          setHeaderFormData(header);
        }
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      name: "",
      logo: "",
      link: "",
      sortOrder: 0,
      isActive: true,
      type: 'service',
    });
    setEditingId(null);
  };

  const openDialog = (service?: Service) => {
    if (service) {
      setEditingId(service.id || null);
      setFormData(service);
    } else {
      resetForm();
    }
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    resetForm();
  };

  const handleSaveHeader = async () => {
    if (!headerFormData.title || !headerFormData.description) {
      setSaveMessage("Error: Title dan description harus diisi");
      return;
    }

    setIsSaving(true);
    setSaveMessage("");
    try {
      const method = headerData ? 'PUT' : 'POST';
      const url = headerData ? `/api/services/${headerData.id}` : '/api/services';
      
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(headerFormData),
      });

      if (!response.ok) throw new Error('Failed to save header');

      setSaveMessage("Header berhasil disimpan!");
      setEditingHeaderForm(false);
      fetchServices();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: Gagal menyimpan header");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveService = async () => {
    if (!formData.title || !formData.name || !formData.logo || !formData.link) {
      setSaveMessage("Error: Semua field harus diisi");
      return;
    }

    setIsSaving(true);
    setSaveMessage("");
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/services/${editingId}` : '/api/services';
      
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save service');

      setSaveMessage(editingId ? "Service berhasil diperbarui!" : "Service berhasil ditambahkan!");
      closeDialog();
      fetchServices();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: Gagal menyimpan service");
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

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setFormData(prev => ({ ...prev, logo: result.path }));
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
        <p className="text-muted-foreground mt-2">Kelola header dan layanan BPS</p>
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
        {/* Header Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Section Header</CardTitle>
                <CardDescription>Edit judul dan deskripsi section BPS Services</CardDescription>
              </div>
              {!editingHeaderForm && (
                <Button onClick={() => setEditingHeaderForm(true)} size="sm">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {editingHeaderForm ? (
              <div className="space-y-4">
                <div>
                  <Label>Judul Section</Label>
                  <Input
                    value={headerFormData.title}
                    onChange={(e) => setHeaderFormData({ ...headerFormData, title: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Deskripsi</Label>
                  <Input
                    value={headerFormData.description || ""}
                    onChange={(e) => setHeaderFormData({ ...headerFormData, description: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveHeader} disabled={isSaving} className="gap-2">
                    <Save className="w-4 h-4" />
                    Simpan
                  </Button>
                  <Button variant="outline" onClick={() => setEditingHeaderForm(false)}>
                    Batal
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Judul:</p>
                  <p className="text-lg font-bold">{headerFormData.title}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Deskripsi:</p>
                  <p className="text-gray-700">{headerFormData.description}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Services List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Daftar Services</CardTitle>
                <CardDescription>Total: {services.length} service</CardDescription>
              </div>
              <Button onClick={() => openDialog()} size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Tambah Service
              </Button>
            </div>
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
                      onClick={() => openDialog(service)}
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
              {services.length === 0 && (
                <p className="text-center text-gray-400 py-8">Belum ada service</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialog Popup */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>{editingId ? 'Edit Service' : 'Tambah Service Baru'}</CardTitle>
              <button onClick={closeDialog} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Judul Layanan</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Zona Integritas BPS"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Nama Aplikasi</Label>
                <Input
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="ZI APP"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Upload Logo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  disabled={isUploading}
                  className="mt-1"
                />
                {formData.logo && (
                  <p className="text-xs text-gray-500 mt-1">{formData.logo}</p>
                )}
              </div>
              <div>
                <Label>Link Aplikasi</Label>
                <Input
                  value={formData.link || ""}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="https://..."
                  className="mt-1"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSaveService} disabled={isSaving} className="flex-1 gap-2">
                  <Save className="w-4 h-4" />
                  {editingId ? 'Simpan Perubahan' : 'Tambah Service'}
                </Button>
                <Button variant="outline" onClick={closeDialog} className="flex-1">
                  Batal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
