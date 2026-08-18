"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, RotateCcw, Image as ImageIcon, Upload } from "lucide-react";

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
  const [formData, setFormData] = useState<HeaderData>(defaultData);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [fileInputKey, setFileInputKey] = useState(0);

  useEffect(() => {
    fetchHeaderData();
  }, []);

  const fetchHeaderData = async () => {
    try {
      const response = await fetch('/api/header');
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      }
    } catch (error) {
      console.error('Error fetching header:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof HeaderData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setSaveMessage("Error: Hanya file gambar yang diizinkan");
      return;
    }

    setIsUploading(true);
    setSaveMessage("");
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
      setSaveMessage("Gambar berhasil diupload!");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: Gagal upload gambar");
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
      setFileInputKey(prev => prev + 1);
    }
  };

  const handleSave = async () => {
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
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: " + (error instanceof Error ? error.message : "Gagal menyimpan"));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    setIsSaving(true);
    setSaveMessage("");
    try {
      const response = await fetch('/api/header', {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Reset failed');
      }

      setFormData(defaultData);
      setSaveMessage("Header berhasil direset ke default!");
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
        {/* Text Content */}
        <Card>
          <CardHeader>
            <CardTitle>Konten Teks</CardTitle>
            <CardDescription>Judul dan subtitle yang ditampilkan di header</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Judul (Title)</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="PULAU PEDIA"
                className="mt-2 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Textarea
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => handleInputChange("subtitle", e.target.value)}
                rows={3}
                placeholder="Portal Informasi dan Layanan Digital BPS Kepulauan Seribu"
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Background Image */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Background Image
            </CardTitle>
            <CardDescription>Gambar latar belakang untuk header section</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="bgFile">Upload Gambar Baru</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  key={fileInputKey}
                  id="bgFile"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="flex-1"
                />
                {isUploading && (
                  <span className="text-sm text-muted-foreground pt-2">Uploading...</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Format: JPG, PNG, GIF, WebP (Max recommended: 5MB)</p>
            </div>

            {formData.backgroundImage && (
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">Path Gambar (Otomatis)</Label>
                  <Input
                    value={formData.backgroundImage}
                    readOnly
                    className="mt-1 bg-gray-50 text-sm"
                  />
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-3">Preview Gambar:</p>
                  <img 
                    src={`/api/${formData.backgroundImage}`}
                    alt="Background Preview" 
                    className="h-40 mx-auto rounded object-cover w-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const parent = (e.target as HTMLImageElement).parentElement;
                      if (parent) {
                        const errorMsg = document.createElement('p');
                        errorMsg.className = 'text-muted-foreground';
                        errorMsg.textContent = 'Gambar tidak ditemukan';
                        parent.appendChild(errorMsg);
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end pt-6 border-t">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={isSaving}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Default
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="gap-2"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </div>
    </div>
  );
}