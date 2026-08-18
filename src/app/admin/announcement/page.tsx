"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2, Edit2, Upload, X } from "lucide-react";

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
  const [saveMessage, setSaveMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  
  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Announcement>({
    title: "",
    content: "",
    image: "",
    isActive: true,
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch('/api/announcements?all=true');
      if (response.ok) {
        const data = await response.json();
        setAnnouncements(data);
      }
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      image: "",
      isActive: true,
    });
    setEditingId(null);
  };

  const openDialog = (announcement?: Announcement) => {
    if (announcement) {
      setEditingId(announcement.id || null);
      setFormData(announcement);
    } else {
      resetForm();
    }
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    resetForm();
  };

  const handleSaveAnnouncement = async () => {
    if (!formData.title || !formData.content) {
      setSaveMessage("Error: Title dan content harus diisi");
      return;
    }

    setIsSaving(true);
    setSaveMessage("");
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/announcements/${editingId}` : '/api/announcements';
      
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save announcement');

      setSaveMessage(editingId ? "Announcement berhasil diperbarui!" : "Announcement berhasil ditambahkan!");
      closeDialog();
      fetchAnnouncements();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: Gagal menyimpan announcement");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAnnouncement = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus announcement ini?')) return;

    setIsSaving(true);
    try {
      const response = await fetch(`/api/announcements/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete announcement');

      setSaveMessage("Announcement berhasil dihapus!");
      fetchAnnouncements();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: Gagal menghapus announcement");
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

      const response = await fetch('/api/uploads/announcements', {
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
        <h1 className="text-3xl font-bold tracking-tight">Announcement Settings</h1>
        <p className="text-muted-foreground mt-2">Kelola pengumuman dan berita penting</p>
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
        {/* Announcements Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Daftar Announcement</h2>
              <p className="text-sm text-gray-500">Total: {announcements.length} announcement</p>
            </div>
            <Button onClick={() => openDialog()} className="gap-2">
              <Plus className="w-4 h-4" />
              Tambah Announcement
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                {announcement.image && (
                  <div className="w-full h-48 bg-gray-100 overflow-hidden">
                    <img
                      src={`/api/${announcement.image}`}
                      alt={announcement.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardContent className="flex-1 p-4 flex flex-col">
                  <h3 className="font-semibold text-sm line-clamp-2 mb-2">{announcement.title}</h3>
                  <p className="text-xs text-gray-600 line-clamp-3 mb-3 flex-1">{announcement.content}</p>
                  {announcement.createdAt && (
                    <p className="text-xs text-gray-400 mb-3">
                      {new Date(announcement.createdAt).toLocaleDateString('id-ID')}
                    </p>
                  )}
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openDialog(announcement)}
                      className="flex-1"
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteAnnouncement(announcement.id || 0)}
                      disabled={isSaving}
                      className="flex-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {announcements.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">Belum ada announcement</p>
            </div>
          )}
        </div>
      </div>

      {/* Dialog Popup */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>{editingId ? 'Edit Announcement' : 'Tambah Announcement Baru'}</CardTitle>
              <button onClick={closeDialog} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Judul Announcement</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Masukkan judul announcement"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Konten</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Masukkan konten announcement"
                  className="mt-1 min-h-[120px]"
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
                <Button onClick={handleSaveAnnouncement} disabled={isSaving} className="flex-1 gap-2">
                  <Save className="w-4 h-4" />
                  {editingId ? 'Simpan Perubahan' : 'Tambah Announcement'}
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
