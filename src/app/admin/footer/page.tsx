"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Edit2, RotateCcw, X } from "lucide-react";

interface FooterConfig {
  id?: number;
  companyName: string;
  companyAddress: string;
  phone: string;
  email: string;
  logo: string;
}

const defaultData: FooterConfig = {
  companyName: 'BPS Kepulauan Seribu',
  companyAddress: 'Jalan Raya Pulau Panjang, Kepulauan Seribu, DKI Jakarta',
  phone: '+62-21-XXXXXX',
  email: 'info@kepulauanseribu.bps.go.id',
  logo: 'uploads/footer/logo.png',
};

export default function AdminFooterPage() {
  const [footerData, setFooterData] = useState<FooterConfig>(defaultData);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState<FooterConfig>(defaultData);

  useEffect(() => {
    fetchFooterConfig();
  }, []);

  const fetchFooterConfig = async () => {
    try {
      const response = await fetch('/api/footer');
      if (response.ok) {
        const data = await response.json();
        setFooterData(data);
      }
    } catch (error) {
      console.error('Error fetching footer config:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openDialog = () => {
    setFormData({ ...footerData });
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

      const response = await fetch('/api/uploads/footer', {
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
    if (!formData.companyName || !formData.email || !formData.phone) {
      setSaveMessage("Error: Company name, email, dan phone harus diisi");
      return;
    }

    setIsSaving(true);
    setSaveMessage("");
    try {
      const response = await fetch('/api/footer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Save failed');
      }

      setSaveMessage("Footer berhasil diperbarui!");
      closeDialog();
      fetchFooterConfig();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: Gagal menyimpan footer");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirm('Apakah Anda yakin ingin reset ke default?')) return;

    setIsSaving(true);
    setSaveMessage("");
    try {
      const response = await fetch('/api/footer', {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Reset failed');
      }

      setSaveMessage("Footer berhasil direset ke default!");
      fetchFooterConfig();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: Gagal reset footer");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Footer Settings</h1>
          <p className="text-muted-foreground mt-2">Atur tampilan footer</p>
        </div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Footer Settings</h1>
        <p className="text-muted-foreground mt-2">Atur konfigurasi footer dengan informasi perusahaan dan logo</p>
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
        {/* Footer Preview Card */}
        <Card className="overflow-hidden">
          <div className="bg-[#111111] text-white p-6">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                {footerData.logo && (
                  <img 
                    src={`/api/${footerData.logo}`}
                    alt="Footer Logo"
                    className="h-20 mb-3 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                <h3 className="font-bold text-lg mb-2">{footerData.companyName}</h3>
                <p className="text-sm text-gray-400">{footerData.companyAddress}</p>
              </div>
              <div>
                <h4 className="font-bold mb-3">Kontak</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-400">Telepon:</span> {footerData.phone}</p>
                  <p><span className="text-gray-400">Email:</span> {footerData.email}</p>
                </div>
              </div>
              <div className="text-right text-xs text-gray-400">
                <p>© 2026 {footerData.companyName}</p>
                <p className="mt-2">All rights reserved</p>
              </div>
            </div>
          </div>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Footer Preview</CardTitle>
                <CardDescription>Tampilan footer dengan informasi perusahaan</CardDescription>
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
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-600">Nama Perusahaan:</p>
                <p className="text-sm text-gray-700">{footerData.companyName}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Email:</p>
                <p className="text-sm text-gray-700">{footerData.email}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Telepon:</p>
                <p className="text-sm text-gray-700">{footerData.phone}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Logo Path:</p>
                <p className="text-xs text-gray-500">{footerData.logo}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Alamat:</p>
              <p className="text-sm text-gray-700">{footerData.companyAddress}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Edit Footer</CardTitle>
              <button onClick={closeDialog} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Nama Perusahaan</Label>
                <Input
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="BPS Kepulauan Seribu"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Alamat Kantor</Label>
                <Textarea
                  value={formData.companyAddress}
                  onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
                  placeholder="Jalan Raya Pulau Panjang, Kepulauan Seribu, DKI Jakarta"
                  className="mt-1 min-h-[80px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nomor Telepon</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+62-21-XXXXXX"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="info@kepulauanseribu.bps.go.id"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label>Upload Logo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">Format: JPG, PNG, GIF, WebP (Recommended: 80x80px)</p>
                {formData.logo && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-2">{formData.logo}</p>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                      <img
                        src={`/api/${formData.logo}`}
                        alt="Logo Preview"
                        className="h-16 w-16 object-contain"
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
