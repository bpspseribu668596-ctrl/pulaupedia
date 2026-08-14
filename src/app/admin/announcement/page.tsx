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
      // Simulasi penyimpanan ke database
      await new Promise(resolve => setTimeout(resolve, 1000));
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
        {/* Konten Modal */}
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