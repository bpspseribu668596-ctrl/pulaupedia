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
      // Simulasi penyimpanan ke database
      await new Promise(resolve => setTimeout(resolve, 1000));
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
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const parent = (e.target as HTMLImageElement).parentElement;
                      if (parent) {
                        const errorMsg = document.createElement('p');
                        errorMsg.className = 'text-muted-foreground';
                        errorMsg.textContent = 'Image not found';
                        parent.appendChild(errorMsg);
                      }
                    }}
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