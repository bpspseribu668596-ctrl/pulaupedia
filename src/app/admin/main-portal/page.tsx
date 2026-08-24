"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2, Edit2, X } from "lucide-react";
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

interface PortalItem {
  id?: number;
  name: string;
  description: string;
  icon: string;
  href: string;
  sortOrder: number;
  isActive: boolean;
}

const iconOptions = [
  { label: 'BookOpen', value: 'BookOpen', Icon: BookOpen },
  { label: 'Archive', value: 'Archive', Icon: Archive },
  { label: 'FileText', value: 'FileText', Icon: FileText },
  { label: 'Package', value: 'Package', Icon: Package },
  { label: 'Laptop', value: 'Laptop', Icon: Laptop },
  { label: 'DollarSign', value: 'DollarSign', Icon: DollarSign },
  { label: 'BarChart3', value: 'BarChart3', Icon: BarChart3 },
  { label: 'Award', value: 'Award', Icon: Award },
];

export default function AdminMainPortalPage() {
  const [portalItems, setPortalItems] = useState<PortalItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  
  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<PortalItem>({
    name: "",
    description: "",
    icon: "BookOpen",
    href: "",
    sortOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchPortalItems();
  }, []);

  const fetchPortalItems = async () => {
    try {
      const response = await fetch('/api/main-portal?all=true');
      if (response.ok) {
        const data = await response.json();
        setPortalItems(data);
      }
    } catch (error) {
      console.error('Error fetching portal items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      icon: "BookOpen",
      href: "",
      sortOrder: 0,
      isActive: true,
    });
    setEditingId(null);
  };

  const openDialog = (item?: PortalItem) => {
    if (item) {
      setEditingId(item.id || null);
      setFormData(item);
    } else {
      resetForm();
    }
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    resetForm();
  };

  const handleSavePortal = async () => {
    if (!formData.name || !formData.description || !formData.href || !formData.icon) {
      setSaveMessage("Error: Semua field harus diisi");
      return;
    }

    setIsSaving(true);
    setSaveMessage("");
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/main-portal/${editingId}` : '/api/main-portal';
      
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save portal item');

      setSaveMessage(editingId ? "Portal item berhasil diperbarui!" : "Portal item berhasil ditambahkan!");
      closeDialog();
      fetchPortalItems();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: Gagal menyimpan portal item");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePortal = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus portal item ini?')) return;

    setIsSaving(true);
    try {
      const response = await fetch(`/api/main-portal/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete portal item');

      setSaveMessage("Portal item berhasil dihapus!");
      fetchPortalItems();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: Gagal menghapus portal item");
    } finally {
      setIsSaving(false);
    }
  };

  const getIconComponent = (iconName: string) => {
    const option = iconOptions.find(opt => opt.value === iconName);
    return option ? option.Icon : BookOpen;
  };

  if (isLoading) {
    return <div className="space-y-6"><p className="text-muted-foreground">Loading...</p></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Main Portal Settings</h1>
        <p className="text-muted-foreground mt-2">Kelola portal dan aplikasi di halaman utama</p>
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
        {/* Portal Preview Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Portal Pulau Pedia Preview</h2>
              <p className="text-sm text-gray-500">Total: {portalItems.length} portal items</p>
            </div>
            <Button onClick={() => openDialog()} className="gap-2">
              <Plus className="w-4 h-4" />
              Tambah Portal
            </Button>
          </div>
          
          <div className="bg-[#D83F3F] py-12 rounded-lg p-6 mb-6">
            <h2 className="text-white text-2xl md:text-3xl font-bold text-center mb-3">
              Portal Pulau Pedia
            </h2>
            <p className="text-white/90 text-center mb-8 max-w-2xl mx-auto">
              Akses cepat ke berbagai portal dan layanan informasi
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {portalItems.map((item) => {
                const Icon = getIconComponent(item.icon);
                return (
                  <div
                    key={item.id}
                    className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:scale-105 border border-white/20"
                  >
                    <div className="bg-white/20 p-3 rounded-full group-hover:bg-white/30 transition-all">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-white text-sm font-bold mb-1">
                        {item.name}
                      </h3>
                      <p className="text-white/80 text-xs leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Portal Items List */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Portal Items</CardTitle>
            <CardDescription>Total: {portalItems.length} items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {portalItems.map((item) => (
                <div key={item.id} className="p-4 border rounded-lg bg-gray-50 flex items-center justify-between">
                  <div className="flex-1 flex items-center gap-3">
                    {(() => {
                      const Icon = getIconComponent(item.icon);
                      return <Icon className="w-5 h-5 text-gray-400" />;
                    })()}
                    <div>
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openDialog(item)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeletePortal(item.id || 0)}
                      disabled={isSaving}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {portalItems.length === 0 && (
                <p className="text-center text-gray-400 py-8">Belum ada portal items</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialog Popup */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>{editingId ? 'Edit Portal Item' : 'Tambah Portal Item Baru'}</CardTitle>
              <button onClick={closeDialog} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Nama Portal</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Portal Umum"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Deskripsi</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Informasi umum dan layanan publik"
                  className="mt-1 min-h-[80px]"
                />
              </div>

              <div>
                <Label>Icon</Label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {iconOptions.map((option) => {
                    const Icon = option.Icon;
                    return (
                      <button
                        key={option.value}
                        onClick={() => setFormData({ ...formData, icon: option.value })}
                        className={`p-3 rounded border-2 flex items-center justify-center transition-all ${
                          formData.icon === option.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        title={option.label}
                      >
                        <Icon className="w-5 h-5" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <Label>URL/Href</Label>
                <Input
                  value={formData.href}
                  onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                  placeholder="/portal-umum"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Sort Order</Label>
                <Input
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                  className="mt-1"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSavePortal} disabled={isSaving} className="flex-1 gap-2">
                  <Save className="w-4 h-4" />
                  {editingId ? 'Simpan Perubahan' : 'Tambah Portal'}
                </Button>
                <Button variant="outline" onClick={closeDialog} className="flex-1">
                  Batal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
