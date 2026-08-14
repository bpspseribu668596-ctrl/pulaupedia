"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, RotateCcw, Plus, Trash2, Megaphone } from "lucide-react";

interface PortalMenuItem {
  id: string;
  name: string;
  description: string;
  href: string;
}

interface HomePageData {
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
  announcementEnabled: boolean;
  announcementText: string;
  announcementDelay: number;
  portalMenuItems: PortalMenuItem[];
  portalSectionColor: string;
}

const defaultData: HomePageData = {
  heroTitle: "PULAU PEDIA",
  heroSubtitle: "Portal Informasi dan Layanan Digital BPS Kepulauan Seribu",
  heroImageUrl: "/images/Pulau_Yu,_Kepulauan_Seribu,_Provinsi_DKI_Jakarta.jpg",
  announcementEnabled: true,
  announcementText: "Belum ada pengumuman",
  announcementDelay: 3,
  portalMenuItems: [
    { id: "1", name: "Portal Umum", description: "Informasi umum dan layanan publik", href: "/portal-umum" },
    { id: "2", name: "Brankas Fungsi", description: "Dokumen dan arsip fungsi", href: "/brankas-fungsi" },
    { id: "3", name: "Dokumentasi Kegiatan", description: "Rekam jejak kegiatan kantor", href: "/dokumentasi-kegiatan" },
    { id: "4", name: "SE2026 Archive Hub", description: "Arsip surat edaran 2026", href: "/se2026-archive-hub" },
    { id: "5", name: "Aplikasi Daniel", description: "Sistem aplikasi internal", href: "/aplikasi-daniel" },
    { id: "6", name: "Monev Anggaran", description: "Monitoring evaluasi anggaran", href: "/monev-anggaran" },
    { id: "7", name: "SAKIP 2026", description: "Sistem Akuntabilitas Kinerja", href: "/sakip-2026" },
    { id: "8", name: "ZI 2026", description: "Zona Integritas", href: "/zi-2026" },
  ],
  portalSectionColor: "#D83F3F",
};

export default function AdminHomePage() {
  const [formData, setFormData] = useState<HomePageData>(defaultData);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [newMenuItem, setNewMenuItem] = useState({ name: "", description: "", href: "" });

  const handleInputChange = (field: keyof HomePageData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMenuItemChange = (id: string, field: keyof PortalMenuItem, value: string) => {
    setFormData(prev => ({
      ...prev,
      portalMenuItems: prev.portalMenuItems.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleAddMenuItem = () => {
    if (newMenuItem.name && newMenuItem.description && newMenuItem.href) {
      const id = Date.now().toString();
      setFormData(prev => ({
        ...prev,
        portalMenuItems: [...prev.portalMenuItems, { id, ...newMenuItem }],
      }));
      setNewMenuItem({ name: "", description: "", href: "" });
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
      setSaveMessage("Home Page berhasil diperbarui!");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setFormData(defaultData);
    setNewMenuItem({ name: "", description: "", href: "" });
    setSaveMessage("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Home Page</h1>
        <p className="text-muted-foreground mt-2">Kelola konten halaman utama aplikasi</p>
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
        {/* Hero Section */}
        <Card>
          <CardHeader>
            <CardTitle>Header Hero</CardTitle>
            <CardDescription>Pengaturan bagian hero/banner halaman utama</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="heroTitle">Judul Hero</Label>
              <Input
                id="heroTitle"
                value={formData.heroTitle}
                onChange={(e) => handleInputChange("heroTitle", e.target.value)}
                placeholder="PULAU PEDIA"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="heroSubtitle">Subtitle Hero</Label>
              <Textarea
                id="heroSubtitle"
                value={formData.heroSubtitle}
                onChange={(e) => handleInputChange("heroSubtitle", e.target.value)}
                rows={3}
                placeholder="Portal Informasi dan Layanan Digital BPS Kepulauan Seribu"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="heroImage">Hero Background Image URL</Label>
              <Input
                id="heroImage"
                value={formData.heroImageUrl}
                onChange={(e) => handleInputChange("heroImageUrl", e.target.value)}
                placeholder="/images/hero.jpg"
                className="mt-2"
              />
              {formData.heroImageUrl && (
                <div className="mt-3 p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                  <img 
                    src={formData.heroImageUrl} 
                    alt="Hero Preview" 
                    className="h-32 mx-auto rounded"
                    onError={() => <span className="text-muted-foreground">Image not found</span>}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Announcement Modal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="w-5 h-5" />
              Announcement Modal
            </CardTitle>
            <CardDescription>Pengaturan modal pengumuman otomatis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="announcementEnabled" className="flex items-center gap-2 cursor-pointer">
                <input
                  id="announcementEnabled"
                  type="checkbox"
                  checked={formData.announcementEnabled}
                  onChange={(e) => handleInputChange("announcementEnabled", e.target.checked)}
                  className="cursor-pointer"
                />
                Aktifkan Modal Pengumuman
              </Label>
            </div>
            
            <div>
              <Label htmlFor="announcementDelay">Delay Tampil (detik)</Label>
              <Input
                id="announcementDelay"
                type="number"
                value={formData.announcementDelay}
                onChange={(e) => handleInputChange("announcementDelay", parseInt(e.target.value) || 0)}
                min="0"
                max="30"
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">Modal akan tampil setelah X detik halaman dimuat</p>
            </div>

            <div>
              <Label htmlFor="announcementText">Teks Pengumuman</Label>
              <Textarea
                id="announcementText"
                value={formData.announcementText}
                onChange={(e) => handleInputChange("announcementText", e.target.value)}
                rows={3}
                placeholder="Belum ada pengumuman"
                className="mt-2"
              />
            </div>

            <div className="p-4 bg-muted rounded-lg border">
              <p className="text-sm font-semibold mb-3">Preview Modal:</p>
              <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden max-w-sm mx-auto">
                <div className="bg-[#D83F3F] px-6 py-4 flex items-center gap-3">
                  <Megaphone className="w-5 h-5 text-white" />
                  <h2 className="text-white font-bold uppercase">Pengumuman</h2>
                </div>
                <div className="p-8 text-center">
                  <p className="text-gray-400 text-sm">{formData.announcementText}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portal Menu Items */}
        <Card>
          <CardHeader>
            <CardTitle>Portal Pulau Pedia Menu</CardTitle>
            <CardDescription>Kelola 8 menu utama di section Portal Pulau Pedia (2 kolom mobile, 4 kolom desktop)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {formData.portalMenuItems.map((item) => (
                <div key={item.id} className="p-4 border rounded-lg space-y-3 bg-muted/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs">Nama Portal</Label>
                      <Input
                        value={item.name}
                        onChange={(e) => handleMenuItemChange(item.id, "name", e.target.value)}
                        className="mt-1"
                        placeholder="Portal Umum"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Path/Link</Label>
                      <Input
                        value={item.href}
                        onChange={(e) => handleMenuItemChange(item.id, "href", e.target.value)}
                        className="mt-1"
                        placeholder="/portal-umum"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs">Deskripsi</Label>
                    <Textarea
                      value={item.description}
                      onChange={(e) => handleMenuItemChange(item.id, "description", e.target.value)}
                      rows={2}
                      className="mt-1"
                      placeholder="Deskripsi singkat portal"
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveMenuItem(item.id)}
                    className="w-full"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Hapus Menu
                  </Button>
                </div>
              ))}
            </div>

            {formData.portalMenuItems.length < 12 && (
              <div className="p-4 border rounded-lg bg-muted/50 space-y-3">
                <h4 className="font-semibold text-sm">Tambah Menu Baru</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs">Nama Portal</Label>
                    <Input
                      value={newMenuItem.name}
                      onChange={(e) => setNewMenuItem(prev => ({ ...prev, name: e.target.value }))}
                      className="mt-1"
                      placeholder="Nama portal"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Path/Link</Label>
                    <Input
                      value={newMenuItem.href}
                      onChange={(e) => setNewMenuItem(prev => ({ ...prev, href: e.target.value }))}
                      className="mt-1"
                      placeholder="/path"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Deskripsi</Label>
                  <Textarea
                    value={newMenuItem.description}
                    onChange={(e) => setNewMenuItem(prev => ({ ...prev, description: e.target.value }))}
                    rows={2}
                    className="mt-1"
                    placeholder="Deskripsi singkat"
                  />
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

        {/* Portal Section Color */}
        <Card>
          <CardHeader>
            <CardTitle>Portal Section Color</CardTitle>
            <CardDescription>Warna background untuk section Portal Pulau Pedia</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={formData.portalSectionColor}
                  onChange={(e) => handleInputChange("portalSectionColor", e.target.value)}
                  className="w-20 h-20 rounded cursor-pointer border-2 border-input"
                />
                <div className="flex-1">
                  <Input
                    value={formData.portalSectionColor}
                    onChange={(e) => handleInputChange("portalSectionColor", e.target.value)}
                    placeholder="#D83F3F"
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Format: #RRGGBB</p>
                </div>
              </div>
              <div className="p-4 rounded-lg border" style={{ backgroundColor: formData.portalSectionColor }}>
                <p className="text-white text-sm font-semibold">Preview: Warna Section</p>
              </div>
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
