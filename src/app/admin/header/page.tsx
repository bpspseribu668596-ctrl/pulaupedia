"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, RotateCcw, Image as ImageIcon } from "lucide-react";

interface HeaderData {
  title: string;
  subtitle: string;
  backgroundImage: string;
  overlayOpacity: number;
  overlayColor: string;
  animationDuration: number;
  chevronEnabled: boolean;
  headerHeight: string;
}

const defaultData: HeaderData = {
  title: "PULAU PEDIA",
  subtitle: "Portal Informasi dan Layanan Digital BPS Kepulauan Seribu",
  backgroundImage: "/images/Pulau_Yu,_Kepulauan_Seribu,_Provinsi_DKI_Jakarta.jpg",
  overlayOpacity: 0.7,
  overlayColor: "#333333",
  animationDuration: 1,
  chevronEnabled: true,
  headerHeight: "30vh",
};

export default function AdminHeaderPage() {
  const [formData, setFormData] = useState<HeaderData>(defaultData);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const handleInputChange = (field: keyof HeaderData, value: any) => {
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
      setSaveMessage("Header Hero berhasil diperbarui!");
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
        <h1 className="text-3xl font-bold tracking-tight">Header Settings</h1>
        <p className="text-muted-foreground mt-2">Atur tampilan header halaman utama</p>
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
        {/* Text Content */}
        <Card>
          <CardHeader>
            <CardTitle>Konten Teks</CardTitle>
            <CardDescription>Judul dan subtitle yang ditampilkan di header</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Judul (Title)</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="PULAU PEDIA"
                className="mt-2 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Textarea
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => handleInputChange("subtitle", e.target.value)}
                rows={3}
                placeholder="Portal Informasi dan Layanan Digital BPS Kepulauan Seribu"
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Background Image */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Background Image
            </CardTitle>
            <CardDescription>Gambar latar belakang untuk header section</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="bgImage">Background Image URL</Label>
              <Input
                id="bgImage"
                value={formData.backgroundImage}
                onChange={(e) => handleInputChange("backgroundImage", e.target.value)}
                placeholder="/images/hero.jpg"
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">Masukkan URL gambar yang ingin digunakan</p>
            </div>
            {formData.backgroundImage && (
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-3">Preview Gambar:</p>
                <img 
                  src={formData.backgroundImage} 
                  alt="Background Preview" 
                  className="h-40 mx-auto rounded object-cover w-full"
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