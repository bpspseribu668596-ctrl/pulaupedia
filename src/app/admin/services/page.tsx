"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2 } from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  name: string;
  logo: string;
  link: string;
}

interface ServicesData {
  backgroundColor: string;
  services: ServiceItem[];
}

const defaultData: ServicesData = {
  backgroundColor: "from-gray-50 to-white",
  services: [
    { id: "1", title: "Zona Integritas BPS", name: "ZI APP", logo: "/logos/zi.png", link: "https://penilaianzi.web.bps.go.id/penilaianzi/penilaian" },
    { id: "2", title: "Sistem Informasi Layanan Statistik", name: "SILASTIK", logo: "/logos/silastik.png", link: "https://silastik.bps.go.id/v3/index.php/site/login/" },
    { id: "3", title: "Sistem Informasi Kinerja Organisasi", name: "SINERGI", logo: "/logos/sinergi.png", link: "https://sinergi.web.bps.go.id/" },
    { id: "4", title: "Rekomendasi Kegiatan Statistik Online", name: "ROMANTIK", logo: "/logos/romantik.png", link: "https://romantik.web.bps.go.id/" },
    { id: "5", title: "General Online Job Assistant for Great Service", name: "GOJAGS", logo: "/logos/gojags.png", link: "https://gojags.web.bps.go.id/" },
    { id: "6", title: "Pelayanan Statistik Terpadu", name: "PST", logo: "/logos/pst.png", link: "https://pst.bps.go.id/" },
    { id: "7", title: "Pejabat Pengelola Informasi dan Dokumentasi", name: "PPID", logo: "/logos/ppid.png", link: "https://ppid.bps.go.id/?mfd=3101" },
    { id: "8", title: "Learning Management System", name: "LMS", logo: "/logos/lms.png", link: "https://lms.bps.go.id/" },
    { id: "9", title: "Perpustakaan BPS", name: "PERPUSTAKAAN", logo: "/logos/perpus.png", link: "https://perpustakaan.bps.go.id/apps/" },
  ],
};

export default function AdminServicesPage() {
  const [formData, setFormData] = useState<ServicesData>(defaultData);
  const [isSaving, setIsSaving] = useState(false);
  const [newService, setNewService] = useState({ title: "", name: "", logo: "", link: "" });

  const handleServiceChange = (id: string, field: keyof ServiceItem, value: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map(service =>
        service.id === id ? { ...service, [field]: value } : service
      ),
    }));
  };

  const handleAddService = () => {
    if (newService.title && newService.name && newService.logo && newService.link) {
      const id = Date.now().toString();
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, { id, ...newService }],
      }));
      setNewService({ title: "", name: "", logo: "", link: "" });
    }
  };

  const handleRemoveService = (id: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(service => service.id !== id),
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulasi penyimpanan ke database
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Tidak ada notifikasi
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">BPS Services Settings</h1>
        <p className="text-muted-foreground mt-2">Kelola layanan dan aplikasi web BPS</p>
      </div>

      <div className="grid gap-6">
        {/* Services Section */}
        <Card>
          <CardHeader>
            <CardTitle>BPS Services</CardTitle>
            <CardDescription>Kelola daftar layanan dan aplikasi BPS (responsive hingga 5 kolom)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {formData.services.map((service) => (
                <div key={service.id} className="p-4 border rounded-lg space-y-3 bg-muted/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs">Judul Layanan</Label>
                      <Input
                        value={service.title}
                        onChange={(e) => handleServiceChange(service.id, "title", e.target.value)}
                        className="mt-1 text-sm"
                        placeholder="Zona Integritas BPS"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Nama Aplikasi</Label>
                      <Input
                        value={service.name}
                        onChange={(e) => handleServiceChange(service.id, "name", e.target.value)}
                        className="mt-1 text-sm"
                        placeholder="ZI APP"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs">Logo URL (96px)</Label>
                      <Input
                        value={service.logo}
                        onChange={(e) => handleServiceChange(service.id, "logo", e.target.value)}
                        className="mt-1 text-sm"
                        placeholder="/logos/zi.png"
                      />
                      {service.logo && (
                        <div className="mt-2 p-2 bg-white rounded flex justify-center">
                          <img 
                            src={service.logo} 
                            alt={service.name}
                            className="h-12 w-12 object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <Label className="text-xs">Link Aplikasi</Label>
                      <Input
                        value={service.link}
                        onChange={(e) => handleServiceChange(service.id, "link", e.target.value)}
                        className="mt-1 text-sm"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveService(service.id)}
                    className="w-full"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Hapus Service
                  </Button>
                </div>
              ))}
            </div>

            {formData.services.length < 12 && (
              <div className="p-4 border rounded-lg bg-muted/50 space-y-3">
                <h4 className="font-semibold text-sm">Tambah Service Baru</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs">Judul Layanan</Label>
                    <Input
                      value={newService.title}
                      onChange={(e) => setNewService(prev => ({ ...prev, title: e.target.value }))}
                      className="mt-1 text-sm"
                      placeholder="Judul layanan"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Nama Aplikasi</Label>
                    <Input
                      value={newService.name}
                      onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))}
                      className="mt-1 text-sm"
                      placeholder="Nama aplikasi"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs">Logo URL</Label>
                    <Input
                      value={newService.logo}
                      onChange={(e) => setNewService(prev => ({ ...prev, logo: e.target.value }))}
                      className="mt-1 text-sm"
                      placeholder="/logos/app.png"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Link Aplikasi</Label>
                    <Input
                      value={newService.link}
                      onChange={(e) => setNewService(prev => ({ ...prev, link: e.target.value }))}
                      className="mt-1 text-sm"
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <Button
                  onClick={handleAddService}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Service
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>Pratinjau tampilan services grid</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`bg-gradient-to-b ${formData.backgroundColor} p-8 rounded-lg`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {formData.services.slice(0, 5).map((service) => (
                  <div key={service.id} className="bg-white border-2 border-gray-200 rounded-xl p-6 flex flex-col items-center justify-between min-h-[280px]">
                    <div className="text-center mb-4">
                      <h3 className="text-sm font-bold text-[#111111] leading-tight">
                        {service.title}
                      </h3>
                    </div>
                    <div className="flex-1 flex items-center justify-center mb-4">
                      <img 
                        src={service.logo} 
                        alt={service.name}
                        className="h-24 w-24 object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "/logos/placeholder.png";
                        }}
                      />
                    </div>
                    <div className="w-px h-12 bg-gray-300 mb-4"></div>
                    <div className="w-full">
                      <button className="block bg-white border-2 border-[#0072BC] hover:bg-[#0072BC] rounded-lg py-2 px-4 text-center transition-all group w-full">
                        <span className="text-[#0072BC] group-hover:text-white font-bold text-sm uppercase transition-colors">
                          {service.name}
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end pt-6 border-t">
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