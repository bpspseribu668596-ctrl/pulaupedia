"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, RotateCcw, Image as ImageIcon } from "lucide-react";

interface HeroData {
  title: string;
  subtitle: string;
  backgroundImage: string;
  overlayOpacity: number;
  overlayColor: string;
  animationDuration: number;
  chevronEnabled: boolean;
  heroHeight: string;
}

const defaultData: HeroData = {
  title: "PULAU PEDIA",
  subtitle: "Portal Informasi dan Layanan Digital BPS Kepulauan Seribu",
  backgroundImage: "/images/Pulau_Yu,_Kepulauan_Seribu,_Provinsi_DKI_Jakarta.jpg",
  overlayOpacity: 0.7,
  overlayColor: "#333333",
  animationDuration: 1,
  chevronEnabled: true,
  heroHeight: "30vh",
};

export default function AdminHeroPage() {
  const [formData, setFormData] = useState<HeroData>(defaultData);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const handleInputChange = (field: keyof HeroData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");
    try {
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
        <h1 className="text-3xl font-bold tracking-tight">Header Hero</h1>
        <p className="text-muted-foreground mt-2">Kelola konten dan pengaturan hero banner</p>
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
            <CardDescription>Judul dan subtitle yang ditampilkan di hero</CardDescription>
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
            <CardDescription>Gambar latar belakang untuk hero section</CardDescription>
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
                <p className="text-sm text-muted-foreground mb-3">Preview:</p>
                <img 
                  src={formData.backgroundImage} 
                  alt="Background Preview" 
                  className="h-40 mx-auto rounded object-cover w-full"
                  onError={() => <span className="text-muted-foreground">Image not found</span>}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Overlay Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Dark Overlay</CardTitle>
            <CardDescription>Pengaturan overlay gelap di atas gambar background</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="overlayOpacity">Opacity: {(formData.overlayOpacity * 100).toFixed(0)}%</Label>
              </div>
              <input
                id="overlayOpacity"
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={formData.overlayOpacity}
                onChange={(e) => handleInputChange("overlayOpacity", parseFloat(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">Kontrol tingkat kegelapan overlay (0 = transparan, 1 = penuh)</p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="overlayColor">Warna Overlay</Label>
              <div className="flex items-center gap-4">
                <input
                  id="overlayColor"
                  type="color"
                  value={formData.overlayColor}
                  onChange={(e) => handleInputChange("overlayColor", e.target.value)}
                  className="w-20 h-20 rounded cursor-pointer border-2 border-input"
                />
                <div className="flex-1">
                  <Input
                    value={formData.overlayColor}
                    onChange={(e) => handleInputChange("overlayColor", e.target.value)}
                    placeholder="#333333"
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Format: #RRGGBB</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border bg-muted overflow-hidden">
              <p className="text-sm text-muted-foreground mb-3">Preview Overlay:</p>
              <div 
                className="h-32 rounded flex items-center justify-center relative overflow-hidden"
                style={{
                  backgroundImage: `url('${formData.backgroundImage}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundColor: formData.overlayColor,
                    opacity: formData.overlayOpacity,
                  }}
                />
                <p className="relative text-white text-sm font-semibold text-center">Sample Text</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Animation Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Animasi</CardTitle>
            <CardDescription>Pengaturan animasi fade-in dan chevron</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="animationDuration">Durasi Fade-in: {formData.animationDuration}s</Label>
              <input
                id="animationDuration"
                type="range"
                min="0.2"
                max="3"
                step="0.1"
                value={formData.animationDuration}
                onChange={(e) => handleInputChange("animationDuration", parseFloat(e.target.value))}
                className="w-full mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">Kecepatan animasi fade-in saat halaman dimuat</p>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
              <Label htmlFor="chevronEnabled" className="flex items-center gap-2 cursor-pointer">
                <input
                  id="chevronEnabled"
                  type="checkbox"
                  checked={formData.chevronEnabled}
                  onChange={(e) => handleInputChange("chevronEnabled", e.target.checked)}
                  className="cursor-pointer"
                />
                Tampilkan Animated Chevron Button
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Hero Height */}
        <Card>
          <CardHeader>
            <CardTitle>Tinggi Hero</CardTitle>
            <CardDescription>Atur tinggi section hero</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={formData.heroHeight === "25vh" ? "default" : "outline"}
                onClick={() => handleInputChange("heroHeight", "25vh")}
                className="text-xs"
              >
                Kecil (25vh)
              </Button>
              <Button
                variant={formData.heroHeight === "30vh" ? "default" : "outline"}
                onClick={() => handleInputChange("heroHeight", "30vh")}
                className="text-xs"
              >
                Normal (30vh)
              </Button>
              <Button
                variant={formData.heroHeight === "40vh" ? "default" : "outline"}
                onClick={() => handleInputChange("heroHeight", "40vh")}
                className="text-xs"
              >
                Besar (40vh)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Live Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
            <CardDescription>Pratinjau hero section</CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              className="relative flex items-center justify-center border-4 border-[#D83F3F] rounded-lg overflow-hidden"
              style={{ height: formData.heroHeight }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${formData.backgroundImage}')`,
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: formData.overlayColor,
                  opacity: formData.overlayOpacity,
                }}
              />
              <div 
                className="relative z-10 text-center transition-all"
                style={{
                  opacity: 1,
                  transform: 'translateY(0)',
                  transitionDuration: `${formData.animationDuration}s`,
                }}
              >
                <h1 className="text-white text-4xl md:text-7xl font-bold tracking-wide drop-shadow-2xl mb-4">
                  {formData.title}
                </h1>
                <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-lg px-4">
                  {formData.subtitle}
                </p>
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
