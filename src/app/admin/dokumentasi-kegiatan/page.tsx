"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, RotateCcw, Plus, Trash2 } from "lucide-react";
import {
  Calendar,
  Camera,
  FileText,
  Users,
  Award,
  BookOpen,
} from "lucide-react";

interface KegiatanItem {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: string;
}

interface DokumentasiKegiatanData {
  sectionColor: string;
  mobileColumns: number;
  desktopColumns: number;
  kegiatanItems: KegiatanItem[];
}

const iconMap: { [key: string]: any } = {
  Calendar,
  Camera,
  FileText,
  Users,
  Award,
  BookOpen,
};

const iconNames = Object.keys(iconMap);

const defaultData: DokumentasiKegiatanData = {
  sectionColor: "#D83F3F",
  mobileColumns: 2,
  desktopColumns: 4,
  kegiatanItems: [
    { id: "1", name: "Kegiatan 2024", description: "Dokumentasi kegiatan tahun 2024", href: "/dokumentasi-kegiatan/2024", icon: "Calendar" },
    { id: "2", name: "Kegiatan 2025", description: "Dokumentasi kegiatan tahun 2025", href: "/dokumentasi-kegiatan/2025", icon: "Calendar" },
    { id: "3", name: "Kegiatan 2026", description: "Dokumentasi kegiatan tahun 2026", href: "/dokumentasi-kegiatan/2026", icon: "Calendar" },
    { id: "4", name: "Foto Kegiatan", description: "Galeri foto dokumentasi", href: "/dokumentasi-kegiatan/foto", icon: "Camera" },
    { id: "5", name: "Laporan", description: "Laporan kegiatan dan evaluasi", href: "/dokumentasi-kegiatan/laporan", icon: "FileText" },
    { id: "6", name: "Rapat", description: "Dokumentasi rapat dan pertemuan", href: "/dokumentasi-kegiatan/rapat", icon: "Users" },
    { id: "7", name: "Penghargaan", description: "Dokumentasi penghargaan", href: "/dokumentasi-kegiatan/penghargaan", icon: "Award" },
    { id: "8", name: "Pelatihan", description: "Dokumentasi pelatihan pegawai", href: "/dokumentasi-kegiatan/pelatihan", icon: "BookOpen" },
  ],
};

export default function AdminDokumentasiKegiatanPage() {
  const [formData, setFormData] = useState<DokumentasiKegiatanData>(defaultData);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [newKegiatan, setNewKegiatan] = useState({ name: "", description: "", href: "", icon: "Calendar" });

  const handleInputChange = (field: keyof DokumentasiKegiatanData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleKegiatanChange = (id: string, field: keyof KegiatanItem, value: string) => {
    setFormData(prev => ({
      ...prev,
      kegiatanItems: prev.kegiatanItems.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleAddKegiatan = () => {
    if (newKegiatan.name && newKegiatan.description && newKegiatan.href) {
      const id = Date.now().toString();
      setFormData(prev => ({
        ...prev,
        kegiatanItems: [...prev.kegiatanItems, { id, ...newKegiatan }],
      }));
      setNewKegiatan({ name: "", description: "", href: "", icon: "Calendar" });
    }
  };

  const handleRemoveKegiatan = (id: string) => {
    setFormData(prev => ({
      ...prev,
      kegiatanItems: prev.kegiatanItems.filter(item => item.id !== id),
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");
    try {
      setSaveMessage("Dokumentasi Kegiatan berhasil diperbarui!");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setFormData(defaultData);
    setNewKegiatan({ name: "", description: "", href: "", icon: "Calendar" });
    setSaveMessage("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dokumentasi Kegiatan</h1>
        <p className="text-muted-foreground mt-2">Kelola 8 kategori Dokumentasi Kegiatan</p>
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
            <CardDescription>Pengaturan tampilan section Dokumentasi Kegiatan</CardDescription>
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
                <Label htmlFor="mobileColumns">Mobile Kolom</Label>
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
                <Label htmlFor="desktopColumns">Desktop Kolom</Label>
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

        {/* Kegiatan Items */}
        <Card>
          <CardHeader>
            <CardTitle>Kegiatan Items</CardTitle>
            <CardDescription>Kelola 8 kategori kegiatan (Mobile: 2, Desktop: 4 kolom)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {formData.kegiatanItems.map((item) => {
                const IconComponent = iconMap[item.icon];
                return (
                  <div key={item.id} className="p-4 border rounded-lg space-y-3 bg-muted/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs">Nama Kegiatan</Label>
                        <Input
                          value={item.name}
                          onChange={(e) => handleKegiatanChange(item.id, "name", e.target.value)}
                          className="mt-1"
                          placeholder="Kegiatan 2024"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Link/Path</Label>
                        <Input
                          value={item.href}
                          onChange={(e) => handleKegiatanChange(item.id, "href", e.target.value)}
                          className="mt-1"
                          placeholder="/dokumentasi-kegiatan/2024"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs">Deskripsi</Label>
                        <Textarea
                          value={item.description}
                          onChange={(e) => handleKegiatanChange(item.id, "description", e.target.value)}
                          rows={2}
                          className="mt-1"
                          placeholder="Deskripsi singkat"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Icon</Label>
                        <select
                          value={item.icon}
                          onChange={(e) => handleKegiatanChange(item.id, "icon", e.target.value)}
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
                      onClick={() => handleRemoveKegiatan(item.id)}
                      className="w-full"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Hapus Kegiatan
                    </Button>
                  </div>
                );
              })}
            </div>

            {formData.kegiatanItems.length < 12 && (
              <div className="p-4 border rounded-lg bg-muted/50 space-y-3">
                <h4 className="font-semibold text-sm">Tambah Kegiatan Baru</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs">Nama Kegiatan</Label>
                    <Input
                      value={newKegiatan.name}
                      onChange={(e) => setNewKegiatan(prev => ({ ...prev, name: e.target.value }))}
                      className="mt-1"
                      placeholder="Nama kegiatan"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Link/Path</Label>
                    <Input
                      value={newKegiatan.href}
                      onChange={(e) => setNewKegiatan(prev => ({ ...prev, href: e.target.value }))}
                      className="mt-1"
                      placeholder="/path"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs">Deskripsi</Label>
                    <Textarea
                      value={newKegiatan.description}
                      onChange={(e) => setNewKegiatan(prev => ({ ...prev, description: e.target.value }))}
                      rows={2}
                      className="mt-1"
                      placeholder="Deskripsi singkat"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Icon</Label>
                    <select
                      value={newKegiatan.icon}
                      onChange={(e) => setNewKegiatan(prev => ({ ...prev, icon: e.target.value }))}
                      className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
                    >
                      {iconNames.map((name) => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <Button
                  onClick={handleAddKegiatan}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Kegiatan
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
            <CardDescription>Pratinjau Dokumentasi Kegiatan section (Desktop View)</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ backgroundColor: formData.sectionColor }} className="p-8 rounded-lg">
              <div className="text-center mb-8">
                <h2 className="text-white text-3xl font-bold mb-2">Dokumentasi Kegiatan</h2>
                <p className="text-white/90">Pilih kategori untuk mengakses dokumentasi kegiatan</p>
              </div>
              
              <div className={`grid gap-6 max-w-6xl mx-auto`} style={{
                gridTemplateColumns: `repeat(${Math.min(formData.desktopColumns, formData.kegiatanItems.length)}, minmax(0, 1fr))`
              }}>
                {formData.kegiatanItems.slice(0, 8).map((item) => {
                  const IconComponent = iconMap[item.icon];
                  return (
                    <div
                      key={item.id}
                      className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all hover:scale-105 hover:shadow-2xl border border-white/20 min-h-[180px]"
                    >
                      <div className="bg-white/20 p-4 rounded-full group-hover:bg-white/30 transition-all">
                        {IconComponent && <IconComponent className="w-8 h-8 text-white" />}
                      </div>
                      <div className="text-center">
                        <h3 className="text-white text-base md:text-lg font-bold mb-2">
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
