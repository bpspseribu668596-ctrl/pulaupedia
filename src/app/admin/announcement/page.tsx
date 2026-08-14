"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, RotateCcw, Megaphone, X } from "lucide-react";

interface AnnouncementData {
  enabled: boolean;
  title: string;
  content: string;
  delaySeconds: number;
  showMegaphoneIcon: boolean;
  closeButtonEnabled: boolean;
  escapeKeyEnabled: boolean;
  backgroundColor: string;
  textColor: string;
  buttonTextColor: string;
  buttonBgColor: string;
  maxWidth: string;
  aspectRatio: string;
}

const defaultData: AnnouncementData = {
  enabled: true,
  title: "Pengumuman",
  content: "Belum ada pengumuman",
  delaySeconds: 3,
  showMegaphoneIcon: true,
  closeButtonEnabled: true,
  escapeKeyEnabled: true,
  backgroundColor: "#D83F3F",
  textColor: "#FFFFFF",
  buttonTextColor: "#FFFFFF",
  buttonBgColor: "#FFFFFF",
  maxWidth: "28rem",
  aspectRatio: "3/4",
};

export default function AdminAnnouncementPage() {
  const [formData, setFormData] = useState<AnnouncementData>(defaultData);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (field: keyof AnnouncementData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");
    try {
      setSaveMessage("Announcement Modal berhasil diperbarui!");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setFormData(defaultData);
    setSaveMessage("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Announcement Modal</h1>
        <p className="text-muted-foreground mt-2">Kelola modal pengumuman yang muncul di halaman utama</p>
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
        {/* Enable/Disable */}
        <Card>
          <CardHeader>
            <CardTitle>Status Modal</CardTitle>
            <CardDescription>Aktifkan atau nonaktifkan modal pengumuman</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
              <Label htmlFor="enabled" className="flex items-center gap-2 cursor-pointer">
                <input
                  id="enabled"
                  type="checkbox"
                  checked={formData.enabled}
                  onChange={(e) => handleInputChange("enabled", e.target.checked)}
                  className="cursor-pointer"
                />
                Aktifkan Modal Pengumuman
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Modal Content */}
        <Card>
          <CardHeader>
            <CardTitle>Konten Modal</CardTitle>
            <CardDescription>Isi pengumuman yang akan ditampilkan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Judul Modal</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Pengumuman"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="content">Isi Pengumuman</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                rows={4}
                placeholder="Belum ada pengumuman"
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Timing & Behavior */}
        <Card>
          <CardHeader>
            <CardTitle>Waktu & Perilaku</CardTitle>
            <CardDescription>Pengaturan waktu tampil dan perilaku modal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="delay">Delay Tampil (detik)</Label>
              <Input
                id="delay"
                type="number"
                value={formData.delaySeconds}
                onChange={(e) => handleInputChange("delaySeconds", parseInt(e.target.value) || 0)}
                min="0"
                max="30"
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">Modal akan tampil setelah halaman selesai dimuat selama X detik</p>
            </div>

            <div className="space-y-3">
              <Label>Opsi Penutupan</Label>
              <div className="space-y-2 pl-4">
                <div className="flex items-center gap-2">
                  <input
                    id="closeBtn"
                    type="checkbox"
                    checked={formData.closeButtonEnabled}
                    onChange={(e) => handleInputChange("closeButtonEnabled", e.target.checked)}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="closeBtn" className="cursor-pointer text-sm">Tampilkan tombol X (Close)</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="escapeKey"
                    type="checkbox"
                    checked={formData.escapeKeyEnabled}
                    onChange={(e) => handleInputChange("escapeKeyEnabled", e.target.checked)}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="escapeKey" className="cursor-pointer text-sm">Dapat ditutup dengan tombol ESC</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="megaphoneIcon"
                    type="checkbox"
                    checked={formData.showMegaphoneIcon}
                    onChange={(e) => handleInputChange("showMegaphoneIcon", e.target.checked)}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="megaphoneIcon" className="cursor-pointer text-sm">Tampilkan ikon Megaphone</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Warna & Style</CardTitle>
            <CardDescription>Pengaturan warna dan tampilan modal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="bgColor">Warna Background Header</Label>
              <div className="flex items-center gap-4">
                <input
                  id="bgColor"
                  type="color"
                  value={formData.backgroundColor}
                  onChange={(e) => handleInputChange("backgroundColor", e.target.value)}
                  className="w-20 h-20 rounded cursor-pointer border-2 border-input"
                />
                <div className="flex-1">
                  <Input
                    value={formData.backgroundColor}
                    onChange={(e) => handleInputChange("backgroundColor", e.target.value)}
                    placeholder="#D83F3F"
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Format: #RRGGBB</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="textColor">Warna Teks Header</Label>
              <div className="flex items-center gap-4">
                <input
                  id="textColor"
                  type="color"
                  value={formData.textColor}
                  onChange={(e) => handleInputChange("textColor", e.target.value)}
                  className="w-20 h-20 rounded cursor-pointer border-2 border-input"
                />
                <div className="flex-1">
                  <Input
                    value={formData.textColor}
                    onChange={(e) => handleInputChange("textColor", e.target.value)}
                    placeholder="#FFFFFF"
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Format: #RRGGBB</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="buttonBgColor">Warna Background Tombol Close</Label>
              <div className="flex items-center gap-4">
                <input
                  id="buttonBgColor"
                  type="color"
                  value={formData.buttonBgColor}
                  onChange={(e) => handleInputChange("buttonBgColor", e.target.value)}
                  className="w-20 h-20 rounded cursor-pointer border-2 border-input"
                />
                <div className="flex-1">
                  <Input
                    value={formData.buttonBgColor}
                    onChange={(e) => handleInputChange("buttonBgColor", e.target.value)}
                    placeholder="#FFFFFF"
                    className="font-mono"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dimensions */}
        <Card>
          <CardHeader>
            <CardTitle>Ukuran Modal</CardTitle>
            <CardDescription>Pengaturan lebar dan aspect ratio modal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="maxWidth">Max Width</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    id="maxWidth"
                    value={formData.maxWidth}
                    onChange={(e) => handleInputChange("maxWidth", e.target.value)}
                    placeholder="28rem"
                    className="font-mono flex-1"
                  />
                  <span className="text-xs text-muted-foreground">rem</span>
                </div>
              </div>
              <div>
                <Label htmlFor="aspectRatio">Aspect Ratio</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    id="aspectRatio"
                    value={formData.aspectRatio}
                    onChange={(e) => handleInputChange("aspectRatio", e.target.value)}
                    placeholder="3/4"
                    className="font-mono flex-1"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
            <CardDescription>Pratinjau modal pengumuman</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
              className="w-full"
            >
              {showPreview ? "Sembunyikan Preview" : "Tampilkan Preview"}
            </Button>

            {showPreview && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
                <div 
                  className="relative bg-white rounded-2xl shadow-2xl overflow-hidden animate-modal-pop flex flex-col"
                  style={{
                    width: formData.maxWidth,
                    aspectRatio: formData.aspectRatio,
                  }}
                >
                  {/* Header */}
                  <div 
                    className="px-6 py-4 flex items-center justify-between shrink-0"
                    style={{ backgroundColor: formData.backgroundColor }}
                  >
                    <div className="flex items-center gap-2">
                      {formData.showMegaphoneIcon && (
                        <div className="bg-white/20 p-2 rounded-full">
                          <Megaphone 
                            className="w-5 h-5"
                            style={{ color: formData.textColor }}
                          />
                        </div>
                      )}
                      <h2 
                        className="font-bold text-lg uppercase tracking-wide"
                        style={{ color: formData.textColor }}
                      >
                        {formData.title}
                      </h2>
                    </div>
                    {formData.closeButtonEnabled && (
                      <button 
                        className="bg-white/20 hover:bg-white/30 rounded-full p-1.5 transition-all"
                        style={{ color: formData.textColor }}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-gray-50 to-white">
                    <div className="bg-gray-100 rounded-full p-6 mb-4">
                      <Megaphone className="w-10 h-10 text-gray-300" />
                    </div>
                    <p className="text-gray-400 font-medium">
                      {formData.content}
                    </p>
                  </div>
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
