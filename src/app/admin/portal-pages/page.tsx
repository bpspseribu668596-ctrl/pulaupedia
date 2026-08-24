"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2, Edit2, Upload, X } from "lucide-react";

interface PortalPage {
  id?: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  image?: string;
  isActive: boolean;
}

export default function AdminPortalPagesPage() {
  const [pages, setPages] = useState<PortalPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  
  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<PortalPage>({
    slug: "",
    title: "",
    description: "",
    content: "",
    image: "",
    isActive: true,
  });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch('/api/portal-pages?all=true');
      if (response.ok) {
        const data = await response.json();
        setPages(data);
      }
    } catch (error) {
      console.error('Error fetching portal pages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      slug: "",
      title: "",
      description: "",
      content: "",
      image: "",
      isActive: true,
    });
    setEditingId(null);
  };

  const openDialog = (page?: PortalPage) => {
    if (page) {
      setEditingId(page.id || null);
      setFormData(page);
    } else {
      resetForm();
    }
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    resetForm();
  };

  const handleSavePage = async () => {
    if (!formData.slug || !formData.title || !formData.content) {
      setSaveMessage("Error: Slug, title, dan content harus diisi");
      return;
    }

    setIsSaving(true);
    setSaveMessage("");
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/portal-pages/${editingId}` : '/api/portal-pages';
      
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save page');

      setSaveMessage(editingId ? "Portal page berhasil diperbarui!" : "Portal page berhasil ditambahkan!");
      closeDialog();
      fetchPages();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: Gagal menyimpan portal page");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePage = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus portal page ini?')) return;

    setIsSaving(true);
    try {
      const response = await fetch(`/api/portal-pages/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete page');

      setSaveMessage("Portal page berhasil dihapus!");
      fetchPages();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: Gagal menghapus portal page");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

      const response = await fetch('/api/uploads/portal-pages', {
        method: 'POST',
        body: formDataUpload,
      });

      if (!response.ok) throw new Error('Upload failed');

      const result = await response.json();
      setFormData(prev => ({ ...prev, image: result.path }));
    } catch (error) {
      setSaveMessage("Error: Gagal upload image");
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
        <h1 className="text-3xl font-bold tracking-tight">Portal Pages Settings</h1>
        <p className="text-muted-foreground mt-2">Kelola konten halaman portal</p>
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
        {/* Pages List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Daftar Portal Pages</CardTitle>
                <CardDescription>Total: {pages.length} pages</CardDescription>
              </div>
              <Button onClick={() => openDialog()} className="gap-2">
                <Plus className="w-4 h-4" />
                Tambah Page
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pages.map((page) => (
                <div key={page.id} className="p-4 border rounded-lg bg-gray-50 flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{page.title}</p>
                    <p className="text-xs text-gray-500">/{page.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openDialog(page)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeletePage(page.id || 0)}
                      disabled={isSaving}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {pages.length === 0 && (
                <p className="text-center text-gray-400 py-8">Belum ada portal pages</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialog Popup */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>{editingId ? 'Edit Portal Page' : 'Tambah Portal Page Baru'}</CardTitle>
              <button onClick={closeDialog} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Slug (URL)</Label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  placeholder="portal-umum"
                  className="mt-1"
                  disabled={!!editingId}
                />
                <p className="text-xs text-gray-500 mt-1">Contoh: portal-umum, brankas-fungsi</p>
              </div>

              <div>
                <Label>Judul</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Portal Umum"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Deskripsi</Label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Deskripsi singkat"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Konten</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Masukkan konten halaman (HTML allowed)"
                  className="mt-1 min-h-[200px]"
                />
              </div>

              <div>
                <Label>Upload Image (Opsional)</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="mt-1"
                />
                {formData.image && (
                  <div className="mt-3">
                    <img
                      src={`/api/${formData.image}`}
                      alt="Preview"
                      className="max-w-xs max-h-40 rounded"
                    />
                    <p className="text-xs text-gray-500 mt-1">{formData.image}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSavePage} disabled={isSaving} className="flex-1 gap-2">
                  <Save className="w-4 h-4" />
                  {editingId ? 'Simpan Perubahan' : 'Tambah Page'}
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
