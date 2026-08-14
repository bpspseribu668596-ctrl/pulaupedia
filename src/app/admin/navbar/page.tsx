"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Home, Folder, Save, RotateCcw, Plus, Trash2 } from "lucide-react";

interface NavbarMenuItem {
  id: string;
  name: string;
  href: string;
}

interface NavbarData {
  logoUrl: string;
  institutionName: string;
  homeLink: string;
  portalMenuItems: NavbarMenuItem[];
  darkColor: string;
  accentColor: string;
  scrollThreshold: number;
}

const defaultData: NavbarData = {
  logoUrl: "/logos/logo-bps.png",
  institutionName: "BADAN PUSAT STATISTIK\nKABUPATEN KEPULAUAN SERIBU",
  homeLink: "/",
  portalMenuItems: [
    { id: "1", name: "Portal Umum", href: "/portal-umum" },
    { id: "2", name: "Brankas Fungsi", href: "/brankas-fungsi" },
    { id: "3", name: "Dokumentasi Kegiatan", href: "/dokumentasi-kegiatan" },
    { id: "4", name: "SE2026 Archive Hub", href: "/se2026-archive-hub" },
    { id: "5", name: "Aplikasi Daniel", href: "/aplikasi-daniel" },
    { id: "6", name: "Monev Anggaran", href: "/monev-anggaran" },
    { id: "7", name: "SAKIP 2026", href: "/sakip-2026" },
    { id: "8", name: "ZI 2026", href: "/zi-2026" },
  ],
  darkColor: "#111111",
  accentColor: "#337ab7",
  scrollThreshold: 1,
};

export default function AdminNavbarPage() {
  const [formData, setFormData] = useState<NavbarData>(defaultData);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [newMenuItem, setNewMenuItem] = useState({ name: "", href: "" });

  const handleInputChange = (field: keyof NavbarData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMenuItemChange = (id: string, field: "name" | "href", value: string) => {
    setFormData(prev => ({
      ...prev,
      portalMenuItems: prev.portalMenuItems.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleAddMenuItem = () => {
    if (newMenuItem.name && newMenuItem.href) {
      const id = Date.now().toString();
      setFormData(prev => ({
        ...prev,
        portalMenuItems: [...prev.portalMenuItems, { id, ...newMenuItem }],
      }));
      setNewMenuItem({ name: "", href: "" });
    }
  };

  const handleRemoveMenuItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      portalMenuItems: prev.portalMenuItems.filter(item => item.id !== id),
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");
    try {
      setSaveMessage("Navbar berhasil diperbarui!");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setFormData(defaultData);
    setNewMenuItem({ name: "", href: "" });
    setSaveMessage("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Navbar Settings</h1>
        <p className="text-muted-foreground mt-2">Kelola konten dan pengaturan navbar aplikasi</p>
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
        {/* Logo Section */}
        <Card>
          <CardHeader>
            <CardTitle>Logo BPS</CardTitle>
            <CardDescription>URL path untuk logo BPS yang ditampilkan di navbar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="logoUrl">Logo URL Path</Label>
                <Input
                  id="logoUrl"
                  value={formData.logoUrl}
                  onChange={(e) => handleInputChange("logoUrl", e.target.value)}
                  placeholder="/logos/logo-bps.png"
                  className="mt-2"
                />
              </div>
              {formData.logoUrl && (
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                  <img 
                    src={formData.logoUrl} 
                    alt="Logo Preview" 
                    className="h-10 mx-auto"
                    onError={() => <span className="text-muted-foreground">Image not found</span>}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Institution Info Section */}
        <Card>
          <CardHeader>
            <CardTitle>Informasi Institusi</CardTitle>
            <CardDescription>Nama institusi yang ditampilkan di navbar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="institutionName">Nama Institusi</Label>
              <Textarea
                id="institutionName"
                value={formData.institutionName}
                onChange={(e) => handleInputChange("institutionName", e.target.value)}
                rows={3}
                placeholder="BADAN PUSAT STATISTIK&#10;KABUPATEN KEPULAUAN SERIBU"
                className="mt-2 font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">Gunakan Enter untuk baris baru</p>
            </div>
            <div>
              <Label htmlFor="homeLink">Home Link</Label>
              <Input
                id="homeLink"
                value={formData.homeLink}
                onChange={(e) => handleInputChange("homeLink", e.target.value)}
                placeholder="/"
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Portal Menu Items Section */}
        <Card>
          <CardHeader>
            <CardTitle>Portal Menu Items</CardTitle>
            <CardDescription>Kelola item menu dropdown Portal (maksimal 8 item)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {formData.portalMenuItems.map((item) => (
                <div key={item.id} className="p-4 border rounded-lg space-y-3 bg-muted/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs">Nama Menu</Label>
                      <Input
                        value={item.name}
                        onChange={(e) => handleMenuItemChange(item.id, "name", e.target.value)}
                        className="mt-1"
                        placeholder="Portal Umum"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Link/Path</Label>
                      <Input
                        value={item.href}
                        onChange={(e) => handleMenuItemChange(item.id, "href", e.target.value)}
                        className="mt-1"
                        placeholder="/portal-umum"
                      />
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveMenuItem(item.id)}
                    className="w-full"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Hapus
                  </Button>
                </div>
              ))}
            </div>

            {formData.portalMenuItems.length < 8 && (
              <div className="p-4 border rounded-lg bg-muted/50 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs">Nama Menu Baru</Label>
                    <Input
                      value={newMenuItem.name}
                      onChange={(e) => setNewMenuItem(prev => ({ ...prev, name: e.target.value }))}
                      className="mt-1"
                      placeholder="Nama menu"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Link/Path</Label>
                    <Input
                      value={newMenuItem.href}
                      onChange={(e) => setNewMenuItem(prev => ({ ...prev, href: e.target.value }))}
                      className="mt-1"
                      placeholder="/path"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleAddMenuItem}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Menu
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Colors Section */}
        <Card>
          <CardHeader>
            <CardTitle>Warna Navbar</CardTitle>
            <CardDescription>Pilih warna untuk navbar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="darkColor">Warna Background (Dark)</Label>
              <div className="flex items-center gap-4">
                <input
                  id="darkColor"
                  type="color"
                  value={formData.darkColor}
                  onChange={(e) => handleInputChange("darkColor", e.target.value)}
                  className="w-20 h-20 rounded cursor-pointer border-2 border-input"
                />
                <div className="flex-1">
                  <Input
                    value={formData.darkColor}
                    onChange={(e) => handleInputChange("darkColor", e.target.value)}
                    placeholder="#111111"
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Format: #RRGGBB</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="accentColor">Warna Accent/Hover</Label>
              <div className="flex items-center gap-4">
                <input
                  id="accentColor"
                  type="color"
                  value={formData.accentColor}
                  onChange={(e) => handleInputChange("accentColor", e.target.value)}
                  className="w-20 h-20 rounded cursor-pointer border-2 border-input"
                />
                <div className="flex-1">
                  <Input
                    value={formData.accentColor}
                    onChange={(e) => handleInputChange("accentColor", e.target.value)}
                    placeholder="#337ab7"
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Format: #RRGGBB</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted border border-input">
              <p className="text-sm text-muted-foreground mb-3">Preview Navbar:</p>
              <div 
                className="rounded h-16 flex items-center px-4 gap-4"
                style={{ backgroundColor: formData.darkColor }}
              >
                <div className="text-white text-sm font-semibold">Logo</div>
                <div className="text-white text-sm">Beranda</div>
                <div className="text-white text-sm">Portal</div>
                <div 
                  className="ml-auto px-3 py-1 rounded text-white text-xs"
                  style={{ backgroundColor: formData.accentColor }}
                >
                  Hover Color
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scroll Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Pengaturan Scroll</CardTitle>
            <CardDescription>Konfigurasi behavior navbar saat user scroll</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="scrollThreshold">Scroll Threshold (pixel)</Label>
              <Input
                id="scrollThreshold"
                type="number"
                value={formData.scrollThreshold}
                onChange={(e) => handleInputChange("scrollThreshold", parseInt(e.target.value) || 0)}
                className="mt-2"
                min="0"
                max="500"
              />
              <p className="text-xs text-muted-foreground mt-1">Navbar akan tampil setelah user scroll X pixel ke bawah</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end pt-6 border-t">
          <Button
            variant="outline"
            onClick={handleReset}
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
