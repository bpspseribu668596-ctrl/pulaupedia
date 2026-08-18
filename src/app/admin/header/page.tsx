"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Edit2, RotateCcw, X } from "lucide-react";

interface HeaderData {
  id?: number;
  title: string;
  subtitle: string;
  backgroundImage: string;
}

const defaultData: HeaderData = {
  title: "PULAU PEDIA",
  subtitle: "Portal Informasi dan Layanan Digital BPS Kepulauan Seribu",
  backgroundImage: "uploads/headers/default.jpg",
};

export default function AdminHeaderPage() {
  const [headerData, setHeaderData] = useState<HeaderData>(defaultData);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState<HeaderData>(defaultData);

  useEffect(() => {
    fetchHeaderData();
  }, []);

  const fetchHeaderData = async () => {
    try {
      const response = await fetch('/api/header');
      if (response.ok) {
        const data = await response.json();
        setHeaderData(data);
      }
    } catch (error) {
      console.error('Error fetching header:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openDialog = () => {
    setFormData({ ...headerData });
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

      const response = await fetch('/api/uploads/header', {
        method: 'POST',
        body: formDataUpload,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      setFormData(prev => ({
        ...prev,
        backgroundImage: result.path,
      }));
    } catch (error) {
      setSaveMessage("Error: Gagal upload gambar");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.subtitle) {
      setSaveMessage("Error: Title dan subtitle harus diisi");
      return;
    }

    setIsSaving(true);
    setSaveMessage("");
    try {
      const response = await fetch('/api/header', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Save failed');
      }

      setSaveMessage("Header berhasil diperbarui!");
      closeDialog();
      fetchHeaderData();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: Gagal menyimpan header");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirm('Apakah Anda yakin ingin reset ke default?')) return;

    setIsSaving(true);
    setSaveMessage("");
    try {
      const response = await fetch('/api/header', {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Reset failed');
      }

      setSaveMessage("Header berhasil direset ke default!");
      fetchHeaderData();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: Gagal reset header");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Header Settings</h1>
          <p className="text-muted-foreground mt-2">Atur tampilan header halaman utama</p>
        </div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Header Settings</h1>
        <p className="text-muted-foreground mt-2">Atur tampilan header halaman utama</p>
      </div>

      {saveMessage && (
        <div className={`p-4 rounded-lg ${
          saveMessage.includes("berhasil") || saveMessage.includes("direset")
            ? "bg-green-50 border border-green-200 text-green-800" 
            : "bg-red-50 border border-red-200 text-red-800"
        }`}>
          {saveMessage}
        </div>
      )}

      <div className="grid gap-6">
        {/* Header Preview Card */}
        <Card className="overflow-hidden">
          <div 
            className="relative h-64 bg-cover bg-center"
            style={{
              backgroundImage: `url('/api/${headerData.backgroundImage}')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#333333]/80 via-[#333333]/70 to-[#333333]/60" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
              <h2 className="text-white text-4xl md:text-5xl font-bold tracking-wide drop-shadow-2xl mb-4">
                {headerData.title}
              </h2>
              <p className="text-white/90 text-lg max-w-2xl drop-shadow-lg">
                {headerData.subtitle}
              </p>
            </div>
          </div>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Header Preview</CardTitle>
                <CardDescription>Tampilan header halaman utama</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button onClick={openDialog} size="sm" className="gap-2">
                  <Edit2 className="w-4 h-4" />
                  Edit
                </Button>
                <Button onClick={handleReset} variant="outline" size="sm" className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm font-semibold text-gray-600">Judul:</p>
              <p className="text-lg font-bold">{headerData.title}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Subtitle:</p>
              <p className="text-gray-700">{headerData.subtitle}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Background Image:</p>
              <p className="text-xs text-gray-500">{headerData.backgroundImage}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Edit Header</CardTitle>
              <button onClick={closeDialog} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Judul (Title)</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="PULAU PEDIA"
                  className="mt-1 text-lg"
                />
              </div>

              <div>
                <Label>Subtitle</Label>
                <Textarea
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Portal Informasi dan Layanan Digital BPS Kepulauan Seribu"
                  className="mt-1 min-h-[100px]"
                />
              </div>

              <div>
                <Label>Upload Background Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">Format: JPG, PNG, GIF, WebP (Max: 5MB)</p>
                {formData.backgroundImage && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-2">{formData.backgroundImage}</p>
                    <div className="relative w-full h-40 rounded overflow-hidden">
                      <img
                        src={`/api/${formData.backgroundImage}`}
                        alt="Background Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSave} disabled={isSaving} className="flex-1 gap-2">
                  <Save className="w-4 h-4" />
                  Simpan Perubahan
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