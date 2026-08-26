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
  logo: 'uploads/navbar/logo.png',
  logoAlt: 'Pulau Pedia Logo',
  brandName: 'PULAU PEDIA',
};

export default function AdminNavbarPage() {
  const [navbarData, setNavbarData] = useState<NavbarConfig>(defaultData);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState<NavbarConfig>(defaultData);

  useEffect(() => {
    fetchNavbarConfig();
  }, []);

  const fetchNavbarConfig = async () => {
    try {
      const response = await fetch('/api/navbar');
      if (response.ok) {
        const data = await response.json();
        setNavbarData(data);
      }
    } catch (error) {
      console.error('Error fetching navbar config:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openDialog = () => {
    setFormData({ ...navbarData });
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
    } catch (error) {
      setSaveMessage("Error: Gagal upload logo");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.brandName || !formData.logoAlt) {
      setSaveMessage("Error: Brand name dan logo alt harus diisi");
      return;
    }

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
      closeDialog();
      fetchNavbarConfig();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: Gagal menyimpan navbar");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirm('Apakah Anda yakin ingin reset ke default?')) return;

    setIsSaving(true);
    setSaveMessage("");
    try {
      const response = await fetch('/api/navbar', {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Reset failed');
      }

      setSaveMessage("Navbar berhasil direset ke default!");
      fetchNavbarConfig();
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
        {/* Navbar Preview Card */}
        <Card className="overflow-hidden">
          <div className="bg-white border-b p-4">
            <div className="container mx-auto flex items-center gap-3">
              <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-[#111111] text-white font-bold">
                <img 
                  src={`/api/${navbarData.logo}`}
                  alt={navbarData.logoAlt}
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
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
              <p className="text-sm font-semibold text-gray-600">Logo Path:</p>
              <p className="text-xs text-gray-500">{navbarData.logo}</p>
            </div>
            {/* <div>
              <p className="text-sm font-semibold text-gray-600">Logo Alt Text:</p>
              <p className="text-sm text-gray-700">{navbarData.logoAlt}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Brand Name:</p>
              <p className="text-lg font-bold">{navbarData.brandName}</p>
            </div> */}
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Edit Navbar</CardTitle>
              <button onClick={closeDialog} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* <div>
                <Label>Logo Brand Name</Label>
                <Input
                  value={formData.brandName}
                  onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                  placeholder="PULAU PEDIA"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Logo Alt Text (untuk aksesibilitas)</Label>
                <Input
                  value={formData.logoAlt}
                  onChange={(e) => setFormData({ ...formData, logoAlt: e.target.value })}
                  placeholder="Pulau Pedia Logo"
                  className="mt-1"
                />
              </div> */}

              <div>
                <Label>Upload Logo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">Format: JPG, PNG, GIF, WebP (Recommended: 40x40px)</p>
                {formData.logo && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-2">{formData.logo}</p>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                      <img
                        src={`/api/${formData.logo}`}
                        alt="Logo Preview"
                        className="h-12 w-12 object-contain"
                      />
                      <span className="text-sm text-gray-600">Preview</span>
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
