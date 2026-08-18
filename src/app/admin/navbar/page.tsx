"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, RotateCcw, Image as ImageIcon } from "lucide-react";

interface NavbarConfig {
  id?: number;
  logo: string;
  logoAlt: string;
  brandName: string;
}

const defaultData: NavbarConfig = {
  logo: 'uploads/navbar/logo.png',
  logoAlt: 'Pulau Pedia Logo',
  brandName: 'PULAU PEDIA',
};

export default function AdminNavbarPage() {
  const [formData, setFormData] = useState<NavbarConfig>(defaultData);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [fileInputKey, setFileInputKey] = useState(0);

  useEffect(() => {
    fetchNavbarConfig();
  }, []);

  const fetchNavbarConfig = async () => {
    try {
      const response = await fetch('/api/navbar');
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      }
    } catch (error) {
      console.error('Error fetching navbar config:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof NavbarConfig, value: string) => {
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

      const response = await fetch('/api/uploads/navbar', {
        method: 'POST',
        body: formDataUpload,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      setFormData(prev => ({
        ...prev,
        logo: result.path,
      }));
      setSaveMessage("Logo berhasil diupload!");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: Gagal upload logo");
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
      const response = await fetch('/api/navbar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Save failed');
      }

      setSaveMessage("Navbar berhasil diperbarui!");
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
      const response = await fetch('/api/navbar', {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Reset failed');
      }

      setFormData(defaultData);
      setSaveMessage("Navbar berhasil direset ke default!");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: Gagal reset navbar");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Navbar Settings</h1>
          <p className="text-muted-foreground mt-2">Atur tampilan navbar</p>
        </div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Navbar Settings</h1>
        <p className="text-muted-foreground mt-2">Atur tampilan navbar dengan logo dan nama brand</p>
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
        {/* Logo Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Logo Navbar
            </CardTitle>
            <CardDescription>Upload logo baru untuk navbar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="logoFile">Upload Logo</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  key={fileInputKey}
                  id="logoFile"
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
              <p className="text-xs text-muted-foreground mt-1">Format: JPG, PNG, GIF, WebP (Recommended: 40x40px)</p>
            </div>

            {formData.logo && (
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">Logo Path (Otomatis)</Label>
                  <Input
                    value={formData.logo}
                    readOnly
                    className="mt-1 bg-gray-50 text-sm"
                  />
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-3">Preview Logo:</p>
                  <img 
                    src={`/api/${formData.logo}`}
                    alt={formData.logoAlt}
                    className="h-12 mx-auto rounded"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const parent = (e.target as HTMLImageElement).parentElement;
                      if (parent) {
                        const errorMsg = document.createElement('p');
                        errorMsg.className = 'text-muted-foreground';
                        errorMsg.textContent = 'Logo tidak ditemukan';
                        parent.appendChild(errorMsg);
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Brand Info Section */}
        <Card>
          <CardHeader>
            <CardTitle>Informasi Brand</CardTitle>
            <CardDescription>Konfigurasi logo alt text dan nama brand</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="logoAlt">Logo Alt Text</Label>
              <Input
                id="logoAlt"
                value={formData.logoAlt}
                onChange={(e) => handleInputChange("logoAlt", e.target.value)}
                placeholder="Pulau Pedia Logo"
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">Teks alternatif untuk logo (untuk aksesibilitas)</p>
            </div>
            <div>
              <Label htmlFor="brandName">Nama Brand</Label>
              <Input
                id="brandName"
                value={formData.brandName}
                onChange={(e) => handleInputChange("brandName", e.target.value)}
                placeholder="PULAU PEDIA"
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">Nama yang ditampilkan di navbar (baris kedua logo)</p>
            </div>
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
