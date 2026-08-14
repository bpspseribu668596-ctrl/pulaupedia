"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, RotateCcw, Plus, Trash2 } from "lucide-react";

interface GroupItem {
  id: string;
  name: string;
  link: string;
}

interface ZiGroup {
  id: string;
  title: string;
  items: GroupItem[];
}

interface ZiData {
  pillars: GroupItem[];
  uploadGroups: ZiGroup[];
  contohGroups: ZiGroup[];
  contohCategories: string[];
}

const pillarDefaults = [
  { id: "p1", name: "Pilar 1. MANAJEMEN PERUBAHAN", link: "https://drive.google.com/drive/folders/zi-2026" },
  { id: "p2", name: "Pilar 2. PENATAAN TATALAKSANA", link: "https://drive.google.com/drive/folders/zi-2026" },
  { id: "p3", name: "Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR", link: "https://drive.google.com/drive/folders/zi-2026" },
  { id: "p4", name: "Pilar 4. PENGUATAN AKUNTABILITAS", link: "https://drive.google.com/drive/folders/zi-2026" },
  { id: "p5", name: "Pilar 5. PENGUATAN PENGAWASAN", link: "https://drive.google.com/drive/folders/zi-2026" },
  { id: "p6", name: "Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK", link: "https://drive.google.com/drive/folders/zi-2026" },
];

const defaultData: ZiData = {
  pillars: pillarDefaults,
  uploadGroups: [
    {
      id: "u-0",
      title: "Bukti Dukung ZI 2026 (Pemenuhan)",
      items: pillarDefaults,
    },
    {
      id: "u-1",
      title: "Bukti Dukung ZI 2026 (Reform)",
      items: pillarDefaults,
    },
    {
      id: "u-2",
      title: "LKE ZI 2026",
      items: [
        { id: "u2-1", name: "LKE BPS Kepulauan Seribu 2026", link: "https://drive.google.com/drive/folders/zi-2026" },
      ],
    },
  ],
  contohGroups: [
    {
      id: "c-0",
      title: "Bukti Dukung ZI BPS Kepulauan Seribu 2025 (Pemenuhan)",
      items: pillarDefaults,
    },
    {
      id: "c-1",
      title: "Bukti Dukung ZI BPS Kepulauan Seribu 2025 (Reform)",
      items: pillarDefaults,
    },
    {
      id: "c-2",
      title: "LKE ZI BPS Kepulauan Seribu 2025",
      items: [
        { id: "c2-1", name: "LKE BPS Kepulauan Seribu 2025", link: "https://drive.google.com/drive/folders/zi-2026" },
      ],
    },
    {
      id: "c-3",
      title: "Bukti Dukung ZI BPS Kota Jakarta Timur 2025 (Pemenuhan)",
      items: pillarDefaults,
    },
    {
      id: "c-4",
      title: "Bukti Dukung ZI BPS Kota Jakarta Timur 2025 (Reform)",
      items: pillarDefaults,
    },
    {
      id: "c-5",
      title: "LKE ZI BPS Kota Jakarta Timur 2025",
      items: [
        { id: "c5-1", name: "LKE BPS Kota Jakarta Timur 2025", link: "https://drive.google.com/drive/folders/zi-2026" },
      ],
    },
    {
      id: "c-6",
      title: "Bukti Dukung ZI RB BPS RI 2024 (Pemenuhan)",
      items: pillarDefaults,
    },
    {
      id: "c-7",
      title: "Bukti Dukung ZI RB BPS RI 2024 (Reform)",
      items: pillarDefaults,
    },
    {
      id: "c-8",
      title: "Bukti Dukung ZI BPS DKI Jakarta 2025 (Pemenuhan)",
      items: pillarDefaults,
    },
    {
      id: "c-9",
      title: "Bukti Dukung ZI BPS DKI Jakarta 2025 (Reform)",
      items: pillarDefaults,
    },
    {
      id: "c-10",
      title: "LKE ZI BPS DKI Jakarta 2025",
      items: [
        { id: "c10-1", name: "LKE BPS DKI Jakarta 2025", link: "https://drive.google.com/drive/folders/zi-2026" },
      ],
    },
  ],
  contohCategories: [
    "BPS Kepulauan Seribu 2025",
    "BPS Kota Jakarta Timur 2025",
    "BPS RB RI 2024",
    "BPS DKI Jakarta 2025",
  ],
};

export default function AdminZi2026Page() {
  const [formData, setFormData] = useState<ZiData>(defaultData);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"upload" | "contoh" | "pillars">("upload");

  const handlePillarChange = (id: string, field: keyof GroupItem, value: string) => {
    setFormData(prev => ({
      ...prev,
      pillars: prev.pillars.map(p => p.id === id ? { ...p, [field]: value } : p),
    }));
  };

  const handleAddPillar = () => {
    const id = `p-new-${Date.now()}`;
    setFormData(prev => ({
      ...prev,
      pillars: [...prev.pillars, { id, name: "", link: "" }],
    }));
  };

  const handleRemovePillar = (id: string) => {
    setFormData(prev => ({
      ...prev,
      pillars: prev.pillars.filter(p => p.id !== id),
    }));
  };

  const handleGroupChange = (groupType: "uploadGroups" | "contohGroups", groupId: string, field: keyof ZiGroup, value: any) => {
    setFormData(prev => ({
      ...prev,
      [groupType]: prev[groupType].map(group =>
        group.id === groupId ? { ...group, [field]: value } : group
      ),
    }));
  };

  const handleItemChange = (
    groupType: "uploadGroups" | "contohGroups",
    groupId: string,
    itemId: string,
    field: keyof GroupItem,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [groupType]: prev[groupType].map(group =>
        group.id === groupId ? {
          ...group,
          items: group.items.map(item => item.id === itemId ? { ...item, [field]: value } : item),
        } : group
      ),
    }));
  };

  const handleAddItem = (groupType: "uploadGroups" | "contohGroups", groupId: string) => {
    const newItemId = `${groupId}-new-${Date.now()}`;
    setFormData(prev => ({
      ...prev,
      [groupType]: prev[groupType].map(group =>
        group.id === groupId ? {
          ...group,
          items: [...group.items, { id: newItemId, name: "", link: "" }],
        } : group
      ),
    }));
  };

  const handleRemoveItem = (groupType: "uploadGroups" | "contohGroups", groupId: string, itemId: string) => {
    setFormData(prev => ({
      ...prev,
      [groupType]: prev[groupType].map(group =>
        group.id === groupId ? {
          ...group,
          items: group.items.filter(item => item.id !== itemId),
        } : group
      ),
    }));
  };

  const handleAddGroup = (groupType: "uploadGroups" | "contohGroups") => {
    const newGroupId = `${groupType === "uploadGroups" ? "u" : "c"}-new-${Date.now()}`;
    const newGroup: ZiGroup = { id: newGroupId, title: "", items: [] };
    setFormData(prev => ({
      ...prev,
      [groupType]: [...prev[groupType], newGroup],
    }));
  };

  const handleRemoveGroup = (groupType: "uploadGroups" | "contohGroups", groupId: string) => {
    setFormData(prev => ({
      ...prev,
      [groupType]: prev[groupType].filter(group => group.id !== groupId),
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");
    try {
      setSaveMessage("ZI 2026 berhasil diperbarui!");
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

  const renderGroupItems = (groupType: "uploadGroups" | "contohGroups", group: ZiGroup) => (
    <div key={group.id} className="p-4 border rounded-lg space-y-3 bg-muted/50">
      <div className="flex items-start justify-between gap-2">
        <Label className="text-xs font-semibold">Judul Group</Label>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => handleRemoveGroup(groupType, group.id)}
          className="h-6 text-xs"
        >
          <Trash2 className="w-3 h-3 mr-1" />
          Hapus Group
        </Button>
      </div>
      <Input
        value={group.title}
        onChange={(e) => handleGroupChange(groupType, group.id, "title", e.target.value)}
        placeholder="Judul group"
        className="text-sm"
      />

      <div className="space-y-2 pl-4 border-l-2 border-gray-300">
        <Label className="text-xs font-semibold">Items ({group.items.length}):</Label>
        {group.items.map((item) => (
          <div key={item.id} className="bg-white p-2 rounded space-y-2">
            <div className="flex items-center gap-2">
              <Input
                value={item.name}
                onChange={(e) => handleItemChange(groupType, group.id, item.id, "name", e.target.value)}
                placeholder="Nama item"
                className="text-xs"
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveItem(groupType, group.id, item.id)}
                className="h-6 w-6 p-0 shrink-0"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
            <Input
              value={item.link}
              onChange={(e) => handleItemChange(groupType, group.id, item.id, "link", e.target.value)}
              placeholder="https://..."
              className="text-xs"
            />
          </div>
        ))}
        <Button
          onClick={() => handleAddItem(groupType, group.id)}
          variant="outline"
          size="sm"
          className="w-full text-xs"
        >
          <Plus className="w-3 h-3 mr-1" />
          Tambah Item
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ZI 2026</h1>
        <p className="text-muted-foreground mt-2">Kelola konten Zona Integritas 2026</p>
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

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-2">
        <Button
          variant={activeTab === "upload" ? "default" : "outline"}
          onClick={() => setActiveTab("upload")}
          className="text-xs md:text-sm"
        >
          LINK UPLOAD
        </Button>
        <Button
          variant={activeTab === "contoh" ? "default" : "outline"}
          onClick={() => setActiveTab("contoh")}
          className="text-xs md:text-sm"
        >
          CONTOH BUKTI
        </Button>
        <Button
          variant={activeTab === "pillars" ? "default" : "outline"}
          onClick={() => setActiveTab("pillars")}
          className="text-xs md:text-sm"
        >
          PILAR
        </Button>
      </div>

      <div className="grid gap-6">
        {activeTab === "pillars" && (
          <Card>
            <CardHeader>
              <CardTitle>Pilar ZI</CardTitle>
              <CardDescription>Kelola 6 pilar Zona Integritas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {formData.pillars.map((pillar) => (
                  <div key={pillar.id} className="p-4 border rounded-lg space-y-3 bg-muted/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs">Nama Pilar</Label>
                        <Input
                          value={pillar.name}
                          onChange={(e) => handlePillarChange(pillar.id, "name", e.target.value)}
                          className="mt-1 text-sm"
                          placeholder="Pilar 1. MANAJEMEN PERUBAHAN"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Link</Label>
                        <Input
                          value={pillar.link}
                          onChange={(e) => handlePillarChange(pillar.id, "link", e.target.value)}
                          className="mt-1 text-sm"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemovePillar(pillar.id)}
                      className="w-full text-xs"
                    >
                      <Trash2 className="w-3 h-3 mr-2" />
                      Hapus Pilar
                    </Button>
                  </div>
                ))}
              </div>
              <Button onClick={handleAddPillar} className="w-full text-xs">
                <Plus className="w-3 h-3 mr-2" />
                Tambah Pilar
              </Button>
            </CardContent>
          </Card>
        )}

        {activeTab === "upload" && (
          <Card>
            <CardHeader>
              <CardTitle>LINK UPLOAD</CardTitle>
              <CardDescription>Kelola groups expandable untuk upload bukti dukung ZI 2026</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {formData.uploadGroups.map((group) => renderGroupItems("uploadGroups", group))}
              </div>
              <Button onClick={() => handleAddGroup("uploadGroups")} className="w-full text-xs">
                <Plus className="w-3 h-3 mr-2" />
                Tambah Group Upload
              </Button>
            </CardContent>
          </Card>
        )}

        {activeTab === "contoh" && (
          <Card>
            <CardHeader>
              <CardTitle>LINK CONTOH BUKTI DUKUNG</CardTitle>
              <CardDescription>Kelola 11 groups contoh bukti dukung dari tahun sebelumnya</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-muted rounded-lg">
                <Label className="text-xs font-semibold">Kategori Contoh Bukti:</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.contohCategories.map((cat) => (
                    <span key={cat} className="bg-white border px-2 py-1 rounded text-xs">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {formData.contohGroups.map((group) => renderGroupItems("contohGroups", group))}
              </div>

              <div className="flex gap-2">
                <Button onClick={() => handleAddGroup("contohGroups")} className="flex-1 text-xs">
                  <Plus className="w-3 h-3 mr-2" />
                  Tambah Group Contoh
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Ringkasan</CardTitle>
            <CardDescription>Statistik konten ZI 2026</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-2xl font-bold">{formData.pillars.length}</p>
                <p className="text-xs text-muted-foreground">Pilar ZI</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-2xl font-bold">{formData.uploadGroups.length}</p>
                <p className="text-xs text-muted-foreground">Group Upload</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-2xl font-bold">{formData.contohGroups.length}</p>
                <p className="text-xs text-muted-foreground">Group Contoh</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-2xl font-bold">
                  {formData.uploadGroups.reduce((sum, g) => sum + g.items.length, 0) +
                   formData.contohGroups.reduce((sum, g) => sum + g.items.length, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Total Items</p>
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
