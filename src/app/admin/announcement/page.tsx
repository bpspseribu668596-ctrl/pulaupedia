"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2, Edit2, X } from "lucide-react";

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

  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Announcement>({ title: "", content: "", image: "", isActive: true });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => { fetchAnnouncements(); }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch('/api/announcements?all=true');
      if (res.ok) setAnnouncements(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ title: "", content: "", image: "", isActive: true });
    setEditingId(null);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const openDialog = (announcement?: Announcement) => {
    if (announcement) {
      setEditingId(announcement.id || null);
      setFormData(announcement);
      setPreviewUrl(announcement.image?.startsWith('http') ? announcement.image : null);
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
    if (!formData.title || !formData.content) {
      setSaveMessage("Error: Title dan content harus diisi");
      return;
    }

    setIsSaving(true);
    setSaveMessage("");
    try {
      let imageUrl = formData.image || "";

      // Upload ke Cloudinary saat klik Simpan
      if (selectedFile) {
        const fd = new FormData();
        fd.append('file', selectedFile);
        const uploadRes = await fetch('/api/uploads/announcements', { method: 'POST', body: fd });
        if (!uploadRes.ok) throw new Error('Upload failed');
        const uploadResult = await uploadRes.json();
        imageUrl = uploadResult.path;
      }

      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/announcements/${editingId}` : '/api/announcements';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, image: imageUrl }),
      });

      if (!res.ok) throw new Error('Save failed');

      setSaveMessage(editingId ? "Announcement berhasil diperbarui!" : "Announcement berhasil ditambahkan!");
      closeDialog();
      fetchAnnouncements();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (e) {
      setSaveMessage("Error: Gagal menyimpan announcement");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus announcement ini?')) return;
    setIsSaving(true);
    try {
      await fetch(`/api/announcements/${id}`, { method: 'DELETE' });
      setSaveMessage("Announcement berhasil dihapus!");
      fetchAnnouncements();
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
        <h1 className="text-3xl font-bold tracking-tight">Announcement Settings</h1>
        <p className="text-muted-foreground mt-2">Kelola pengumuman dan berita penting</p>
      </div>

      {saveMessage && (
        <div className={`p-4 rounded-lg ${saveMessage.includes("berhasil") ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"}`}>
          {saveMessage}
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Daftar Announcement</h2>
            <p className="text-sm text-gray-500">Total: {announcements.length} announcement</p>
          </div>
          <Button onClick={() => openDialog()} className="gap-2">
            <Plus className="w-4 h-4" /> Tambah Announcement
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {announcements.map((a) => (
            <Card key={a.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
              {a.image?.startsWith('http') && (
                <div className="w-full h-48 bg-gray-100 overflow-hidden">
                  <img src={a.image} alt={a.title} className="w-full h-full object-cover" />
                </div>
              )}
              <CardContent className="flex-1 p-4 flex flex-col">
                <h3 className="font-semibold text-sm line-clamp-2 mb-2">{a.title}</h3>
                <p className="text-xs text-gray-600 line-clamp-3 mb-3 flex-1">{a.content}</p>
                {a.createdAt && (
                  <p className="text-xs text-gray-400 mb-3">{new Date(a.createdAt).toLocaleDateString('id-ID')}</p>
                )}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => openDialog(a)} className="flex-1"><Edit2 className="w-3 h-3" /></Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(a.id || 0)} disabled={isSaving} className="flex-1"><Trash2 className="w-3 h-3" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {announcements.length === 0 && (
          <div className="text-center py-12"><p className="text-gray-400">Belum ada announcement</p></div>
        )}
      </div>

      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>{editingId ? 'Edit Announcement' : 'Tambah Announcement Baru'}</CardTitle>
              <button onClick={closeDialog} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Judul Announcement</Label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Masukkan judul" className="mt-1" />
              </div>
              <div>
                <Label>Konten</Label>
                <Textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} placeholder="Masukkan konten" className="mt-1 min-h-[120px]" />
              </div>
              <div>
                <Label>Upload Image (Opsional)</Label>
                <Input type="file" accept="image/*" onChange={handleFileSelect} className="mt-1" />
                <p className="text-xs text-gray-500 mt-1">Pilih gambar untuk melihat preview. Gambar akan diupload saat klik Simpan.</p>
                {previewUrl && (
                  <div className="mt-3">
                    <img src={previewUrl} alt="Preview" className="max-w-xs max-h-40 rounded border" />
                    <p className="text-xs text-green-600 mt-1">
                      {selectedFile ? `✓ Siap diupload: ${selectedFile.name}` : '✓ Gambar saat ini'}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSave} disabled={isSaving} className="flex-1 gap-2">
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Menyimpan...' : editingId ? 'Simpan Perubahan' : 'Tambah Announcement'}
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
