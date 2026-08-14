"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, RotateCcw, Plus, Trash2 } from "lucide-react";
import {
  Users,
  TrendingUp,
  Package,
  FileText,
  BarChart3,
} from "lucide-react";

interface FungsiItem {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: string;
}

interface BrankasFungsiData {
  sectionColor: string;
  mobileColumns: number;
  tabletColumns: number;
  desktopColumns: number;
  fungsiItems: FungsiItem[];
}

const iconMap: { [key: string]: any } = {
  Users,
  TrendingUp,
  Package,
  FileText,
  BarChart3,
};

const iconNames = Object.keys(iconMap);

const defaultData: BrankasFungsiData = {
  sectionColor: "#D83F3F",
  mobileColumns: 2,
  tabletColumns: 3,
  desktopColumns: 5,
  fungsiItems: [
    { id: "1", name: "Sosial", description: "Dokumen dan arsip fungsi sosial", href: "/brankas-fungsi/sosial", icon: "Users" },
    { id: "2", name: "Distribusi", description: "Dokumen dan arsip fungsi distribusi", href: "/brankas-fungsi/distribusi", icon: "TrendingUp" },
    { id: "3", name: "Produksi", description: "Dokumen dan arsip fungsi produksi", href: "/brankas-fungsi/produksi", icon: "Package" },
    { id: "4", name: "Nerwilis", description: "Dokumen dan arsip neraca wilayah", href: "/brankas-fungsi/nerwilis", icon: "FileText" },
    { id: "5", name: "IPDS", description: "Dokumen dan arsip IPDS", href: "/brankas-fungsi/ipds", icon: "BarChart3" },
  ],
};

export default function AdminBrankasFungsiPage() {
  const [formData, setFormData] = useState<BrankasFungsiData>(defaultData);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [newFungsi, setNewFungsi] = useState({ name: "", description: "", href: "", icon: "Users" });

  const handleInputChange = (field: keyof BrankasFungsiData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFungsiChange = (id: string, field: keyof FungsiItem, value: string) => {
    setFormData(prev => ({
      ...prev,
      fungsiItems: prev.fungsiItems.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleAddFungsi = () => {
    if (newFungsi.name && newFungsi.description && newFungsi.href) {
      const id = Date.now().toString();
      setFormData(prev => ({
        ...prev,
        fungsiItems: [...prev.fungsiItems, { id, ...newFungsi }],
      }));
      setNewFungsi({ name: "", description: "", href: "", icon: "Users" });
    }
  };

  const handleRemoveFungsi = (id: string) => {
    setFormData(prev => ({
      ...prev,
      fungsiItems: prev.fungsiItems.filter(item => item.id !== id),
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");
    try {
      setSaveMessage("Brankas Fungsi berhasil diperbarui!");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setFormData(defaultData);
    setNewFungsi({ name: "", description: "", href: "", icon: "Users" });
    setSaveMessage("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Brankas Fungsi</h1>
        <p className="text-muted-foreground mt-2">Kelola 5 kategori fungsi Brankas Fungsi</p>
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
            <CardDescription>Pengaturan tampilan section Brankas Fungsi</CardDescription>
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

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="mobileColumns">Mobile Kolom</Label>
                <Input
                  id="mobileColumns"
                  type="number"
                  value={formData.mobileColumns}
                  onChange={(e) => handleInputChange("mobileColumns", parseInt(e.target.value) || 1)}
                  min="1"
                  max="5"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="tabletColumns">Tablet Kolom</Label>
                <Input
                  id="tabletColumns"
                  type="number"
                  value={formData.tabletColumns}
                  onChange={(e) => handleInputChange("tabletColumns", parseInt(e.target.value) || 3)}
                  min="1"
                  max="5"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="desktopColumns">Desktop Kolom</Label>
                <Input
                  id="desktopColumns"
                  type="number"
                  value={formData.desktopColumns}
                  onChange={(e) => handleInputChange("desktopColumns", parseInt(e.target.value) || 5)}
                  min="1"
                  max="8"
                  className="mt-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fungsi Items */}
        <Card>
          <CardHeader>
            <CardTitle>Fungsi Items</CardTitle>
            <CardDescription>Kelola 5 kategori fungsi (Mobile: 2, Tablet: 3, Desktop: 5 kolom)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {formData.fungsiItems.map((item) => {
                const IconComponent = iconMap[item.icon];
                return (
                  <div key={item.id} className="p-4 border rounded-lg space-y-3 bg-muted/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs">Nama Fungsi</Label>
                        <Input
                          value={item.name}
                          onChange={(e) => handleFungsiChange(item.id, "name", e.target.value)}
                          className="mt-1"
                          placeholder="Sosial"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Link/Path</Label>
                        <Input
                          value={item.href}
                          onChange={(e) => handleFungsiChange(item.id, "href", e.target.value)}
                          className="mt-1"
                          placeholder="/brankas-fungsi/sosial"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs">Deskripsi</Label>
                        <Textarea
                          value={item.description}
                          onChange={(e) => handleFungsiChange(item.id, "description", e.target.value)}
                          rows={2}
                          className="mt-1"
                          placeholder="Deskripsi singkat"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Icon</Label>
                        <select
                          value={item.icon}
                          onChange={(e) => handleFungsiChange(item.id, "icon", e.target.value)}
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
                      onClick={() => handleRemoveFungsi(item.id)}
                      className="w-full"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Hapus Fungsi
                    </Button>
                  </div>
                );
              })}
            </div>

            {formData.fungsiItems.length < 8 && (
              <div className="p-4 border rounded-lg bg-muted/50 space-y-3">
                <h4 className="font-semibold text-sm">Tambah Fungsi Baru</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs">Nama Fungsi</Label>
                    <Input
                      value={newFungsi.name}
                      onChange={(e) => setNewFungsi(prev => ({ ...prev, name: e.target.value }))}
                      className="mt-1"
                      placeholder="Nama fungsi"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Link/Path</Label>
                    <Input
                      value={newFungsi.href}
                      onChange={(e) => setNewFungsi(prev => ({ ...prev, href: e.target.value }))}
                      className="mt-1"
                      placeholder="/path"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs">Deskripsi</Label>
                    <Textarea
                      value={newFungsi.description}
                      onChange={(e) => setNewFungsi(prev => ({ ...prev, description: e.target.value }))}
                      rows={2}
                      className="mt-1"
                      placeholder="Deskripsi singkat"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Icon</Label>
                    <select
                      value={newFungsi.icon}
                      onChange={(e) => setNewFungsi(prev => ({ ...prev, icon: e.target.value }))}
                      className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
                    >
                      {iconNames.map((name) => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <Button
                  onClick={handleAddFungsi}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Fungsi
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
            <CardDescription>Pratinjau Brankas Fungsi section (Desktop View)</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ backgroundColor: formData.sectionColor }} className="p-8 rounded-lg">
              <div className="text-center mb-8">
                <h2 className="text-white text-3xl font-bold mb-2">Brankas Fungsi</h2>
                <p className="text-white/90">Pilih fungsi untuk mengakses dokumen dan arsip</p>
              </div>
              
              <div className={`grid gap-6 max-w-6xl mx-auto`} style={{
                gridTemplateColumns: `repeat(${Math.min(formData.desktopColumns, formData.fungsiItems.length)}, minmax(0, 1fr))`
              }}>
                {formData.fungsiItems.slice(0, 5).map((item) => {
                  const IconComponent = iconMap[item.icon];
                  return (
                    <div
                      key={item.id}
                      className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all hover:scale-105 hover:shadow-2xl border border-white/20 min-h-[200px]"
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
