"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, RotateCcw, Plus, Trash2 } from "lucide-react";
import {
  BookOpen,
  Archive,
  FileText,
  Package,
  Laptop,
  DollarSign,
  BarChart3,
  Award,
} from "lucide-react";

interface PortalMenuItem {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: string;
}

interface PortalPediaData {
  sectionColor: string;
  mobileColumns: number;
  desktopColumns: number;
  menuItems: PortalMenuItem[];
}

const iconMap: { [key: string]: any } = {
  BookOpen,
  Archive,
  FileText,
  Package,
  Laptop,
  DollarSign,
  BarChart3,
  Award,
};

const iconNames = Object.keys(iconMap);

const defaultData: PortalPediaData = {
  sectionColor: "#D83F3F",
  mobileColumns: 2,
  desktopColumns: 4,
  menuItems: [
    { id: "1", name: "Portal Umum", description: "Informasi umum dan layanan publik", href: "/portal-umum", icon: "BookOpen" },
    { id: "2", name: "Brankas Fungsi", description: "Dokumen dan arsip fungsi", href: "/brankas-fungsi", icon: "Archive" },
    { id: "3", name: "Dokumentasi Kegiatan", description: "Rekam jejak kegiatan kantor", href: "/dokumentasi-kegiatan", icon: "FileText" },
    { id: "4", name: "SE2026 Archive Hub", description: "Arsip surat edaran 2026", href: "/se2026-archive-hub", icon: "Package" },
    { id: "5", name: "Aplikasi Daniel", description: "Sistem aplikasi internal", href: "/aplikasi-daniel", icon: "Laptop" },
    { id: "6", name: "Monev Anggaran", description: "Monitoring evaluasi anggaran", href: "/monev-anggaran", icon: "DollarSign" },
    { id: "7", name: "SAKIP 2026", description: "Sistem Akuntabilitas Kinerja", href: "/sakip-2026", icon: "BarChart3" },
    { id: "8", name: "ZI 2026", description: "Zona Integritas", href: "/zi-2026", icon: "Award" },
  ],
};

export default function AdminPortalPediaPage() {
  const [formData, setFormData] = useState<PortalPediaData>(defaultData);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [newMenuItem, setNewMenuItem] = useState({ name: "", description: "", href: "", icon: "BookOpen" });

  const handleInputChange = (field: keyof PortalPediaData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMenuItemChange = (id: string, field: keyof PortalMenuItem, value: string) => {
    setFormData(prev => ({
      ...prev,
      menuItems: prev.menuItems.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleAddMenuItem = () => {
    if (newMenuItem.name && newMenuItem.description && newMenuItem.href) {
      const id = Date.now().toString();
      setFormData(prev => ({
        ...prev,
        menuItems: [...prev.menuItems, { id, ...newMenuItem }],
      }));
      setNewMenuItem({ name: "", description: "", href: "", icon: "BookOpen" });
    }
  };

  const handleRemoveMenuItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      menuItems: prev.menuItems.filter(item => item.id !== id),
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");
    try {
      setSaveMessage("Portal Pulau Pedia berhasil diperbarui!");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setFormData(defaultData);
    setNewMenuItem({ name: "", description: "", href: "", icon: "BookOpen" });
    setSaveMessage("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Portal Pulau Pedia</h1>
        <p className="text-muted-foreground mt-2">Kelola 8 menu utama Portal Pulau Pedia</p>
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
        {/* Section Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Section Settings</CardTitle>
            <CardDescription>Pengaturan tampilan section Portal Pulau Pedia</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label htmlFor="sectionColor">Warna Section</Label>
              <div className="flex items-center gap-4">
                <input
                  id="sectionColor"
                  type="color"
                  value={formData.sectionColor}
                  onChange={(e) => handleInputChange("sectionColor", e.target.value)}
                  className="w-20 h-20 rounded cursor-pointer border-2 border-input"
                />
                <div className="flex-1">
                  <Input
                    value={formData.sectionColor}
                    onChange={(e) => handleInputChange("sectionColor", e.target.value)}
                    placeholder="#D83F3F"
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Format: #RRGGBB</p>
                </div>
              </div>
              <div 
                className="h-12 rounded"
                style={{ backgroundColor: formData.sectionColor }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mobileColumns">Kolom Mobile</Label>
                <Input
                  id="mobileColumns"
                  type="number"
                  value={formData.mobileColumns}
                  onChange={(e) => handleInputChange("mobileColumns", parseInt(e.target.value) || 1)}
                  min="1"
                  max="4"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="desktopColumns">Kolom Desktop</Label>
                <Input
                  id="desktopColumns"
                  type="number"
                  value={formData.desktopColumns}
                  onChange={(e) => handleInputChange("desktopColumns", parseInt(e.target.value) || 4)}
                  min="1"
                  max="8"
                  className="mt-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <Card>
          <CardHeader>
            <CardTitle>Portal Menu Items</CardTitle>
            <CardDescription>Kelola 8 menu utama Portal Pulau Pedia (Mobile: 2 kolom, Desktop: 4 kolom)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {formData.menuItems.map((item) => {
                const IconComponent = iconMap[item.icon];
                return (
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
                        <Label className="text-xs">Link/Path</Label>
                        <Input
                          value={item.href}
                          onChange={(e) => handleMenuItemChange(item.id, "href", e.target.value)}
                          className="mt-1"
                          placeholder="/portal-umum"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs">Deskripsi</Label>
                        <Textarea
                          value={item.description}
                          onChange={(e) => handleMenuItemChange(item.id, "description", e.target.value)}
                          rows={2}
                          className="mt-1"
                          placeholder="Deskripsi singkat"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Icon</Label>
                        <select
                          value={item.icon}
                          onChange={(e) => handleMenuItemChange(item.id, "icon", e.target.value)}
                          className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
                        >
                          {iconNames.map((name) => (
                            <option key={name} value={name}>{name}</option>
                          ))}
                        </select>
                      </div>
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
                );
              })}
            </div>

            {formData.menuItems.length < 12 && (
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
                    <Label className="text-xs">Link/Path</Label>
                    <Input
                      value={newMenuItem.href}
                      onChange={(e) => setNewMenuItem(prev => ({ ...prev, href: e.target.value }))}
                      className="mt-1"
                      placeholder="/path"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div>
                    <Label className="text-xs">Icon</Label>
                    <select
                      value={newMenuItem.icon}
                      onChange={(e) => setNewMenuItem(prev => ({ ...prev, icon: e.target.value }))}
                      className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
                    >
                      {iconNames.map((name) => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </select>
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

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
            <CardDescription>Pratinjau Portal Pulau Pedia section</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ backgroundColor: formData.sectionColor }} className="p-8 rounded-lg">
              <div className="text-center mb-8">
                <h2 className="text-white text-3xl font-bold mb-2">Portal Pulau Pedia</h2>
                <p className="text-white/90">Akses cepat ke berbagai portal dan layanan informasi</p>
              </div>
              
              <div className={`grid gap-6 max-w-6xl mx-auto`} style={{
                gridTemplateColumns: `repeat(${Math.min(formData.desktopColumns, formData.menuItems.length)}, minmax(0, 1fr))`
              }}>
                {formData.menuItems.slice(0, 8).map((item) => {
                  const IconComponent = iconMap[item.icon];
                  return (
                    <div
                      key={item.id}
                      className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all hover:scale-105 hover:shadow-2xl border border-white/20"
                    >
                      <div className="bg-white/20 p-4 rounded-full group-hover:bg-white/30 transition-all">
                        {IconComponent && <IconComponent className="w-8 h-8 text-white" />}
                      </div>
                      <div className="text-center">
                        <h3 className="text-white text-base font-bold mb-2">
                          {item.name}
                        </h3>
                        <p className="text-white/80 text-xs leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
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
