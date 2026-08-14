"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Globe, Save, RotateCcw } from "lucide-react";

interface FooterData {
  logoUrl: string;
  address1Title: string;
  address1Content: string;
  address2Title: string;
  address2Content: string;
  websiteTitle: string;
  websiteUrl: string;
  websiteText: string;
  copyrightText: string;
  gradientColor1: string;
  gradientColor2: string;
}

const defaultData: FooterData = {
  logoUrl: "/logos/logo-bps.png",
  address1Title: "Alamat Kantor",
  address1Content: "Jl. Ikan Betok Putih Rt. 004 Rw. 05 Pulau Pramuka Kecamatan Kepulauan Seribu Utara 14530",
  address2Title: "Kantor Penghubung",
  address2Content: "Jl. Cempaka Putih Tengah XIV Rt. 008 Rw. 05 No. 10B Kelurahan Cempaka Putih Timur, Kecamatan Cempaka Putih, Jakarta Pusat 10510",
  websiteTitle: "Website",
  websiteUrl: "https://kepulauanseribukab.bps.go.id",
  websiteText: "kepulauanseribukab.bps.go.id",
  copyrightText: "© 2026 BPS Kabupaten Kepulauan Seribu. All rights reserved.",
  gradientColor1: "#A87932",
  gradientColor2: "#D83F3F",
};

export default function AdminFooterPage() {
  const [formData, setFormData] = useState<FooterData>(defaultData);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const handleInputChange = (field: keyof FooterData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");
    try {
      setSaveMessage("Footer berhasil diperbarui!");
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
        <h1 className="text-3xl font-bold tracking-tight">Footer Settings</h1>
        <p className="text-muted-foreground mt-2">Kelola konten dan pengaturan footer aplikasi</p>
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
            <CardDescription>URL path untuk logo BPS yang ditampilkan di footer</CardDescription>
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
                    className="h-20 mx-auto"
                    onError={() => <span className="text-muted-foreground">Image not found</span>}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Address 1 Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Alamat Kantor
            </CardTitle>
            <CardDescription>Informasi alamat kantor utama</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address1Title">Judul</Label>
              <Input
                id="address1Title"
                value={formData.address1Title}
                onChange={(e) => handleInputChange("address1Title", e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="address1Content">Konten Alamat</Label>
              <Textarea
                id="address1Content"
                value={formData.address1Content}
                onChange={(e) => handleInputChange("address1Content", e.target.value)}
                rows={3}
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Address 2 Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Kantor Penghubung
            </CardTitle>
            <CardDescription>Informasi kantor penghubung/cabang</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address2Title">Judul</Label>
              <Input
                id="address2Title"
                value={formData.address2Title}
                onChange={(e) => handleInputChange("address2Title", e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="address2Content">Konten Alamat</Label>
              <Textarea
                id="address2Content"
                value={formData.address2Content}
                onChange={(e) => handleInputChange("address2Content", e.target.value)}
                rows={3}
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Website Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Website
            </CardTitle>
            <CardDescription>Informasi website resmi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="websiteTitle">Judul</Label>
              <Input
                id="websiteTitle"
                value={formData.websiteTitle}
                onChange={(e) => handleInputChange("websiteTitle", e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="websiteUrl">URL Website</Label>
              <Input
                id="websiteUrl"
                value={formData.websiteUrl}
                onChange={(e) => handleInputChange("websiteUrl", e.target.value)}
                placeholder="https://..."
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="websiteText">Text yang Ditampilkan</Label>
              <Input
                id="websiteText"
                value={formData.websiteText}
                onChange={(e) => handleInputChange("websiteText", e.target.value)}
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Copyright Section */}
        <Card>
          <CardHeader>
            <CardTitle>Copyright Text</CardTitle>
            <CardDescription>Teks hak cipta yang ditampilkan di bawah footer</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.copyrightText}
              onChange={(e) => handleInputChange("copyrightText", e.target.value)}
              rows={2}
            />
          </CardContent>
        </Card>

        {/* Gradient Colors Section */}
        <Card>
          <CardHeader>
            <CardTitle>Warna Gradient Border Top</CardTitle>
            <CardDescription>Pilih warna untuk gradient border atas footer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="gradientColor1">Warna Pertama</Label>
              <div className="flex items-center gap-4">
                <input
                  id="gradientColor1"
                  type="color"
                  value={formData.gradientColor1}
                  onChange={(e) => handleInputChange("gradientColor1", e.target.value)}
                  className="w-20 h-20 rounded cursor-pointer border-2 border-input"
                />
                <div className="flex-1">
                  <Input
                    value={formData.gradientColor1}
                    onChange={(e) => handleInputChange("gradientColor1", e.target.value)}
                    placeholder="#A87932"
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Format: #RRGGBB</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="gradientColor2">Warna Kedua</Label>
              <div className="flex items-center gap-4">
                <input
                  id="gradientColor2"
                  type="color"
                  value={formData.gradientColor2}
                  onChange={(e) => handleInputChange("gradientColor2", e.target.value)}
                  className="w-20 h-20 rounded cursor-pointer border-2 border-input"
                />
                <div className="flex-1">
                  <Input
                    value={formData.gradientColor2}
                    onChange={(e) => handleInputChange("gradientColor2", e.target.value)}
                    placeholder="#D83F3F"
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Format: #RRGGBB</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted border border-input">
              <p className="text-sm text-muted-foreground mb-2">Preview Gradient:</p>
              <div 
                className="h-8 rounded w-full"
                style={{
                  background: `linear-gradient(to right, ${formData.gradientColor1}, ${formData.gradientColor2})`
                }}
              ></div>
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

