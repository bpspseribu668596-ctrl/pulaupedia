"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2, Edit2, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  BookOpen,
  Archive,
  FileText,
  Package,
  Laptop,
  DollarSign,
  BarChart3,
  Award,
  FileSpreadsheet,
  Megaphone,
  ShoppingCart,
  Users,
} from "lucide-react";

interface PortalItem {
  id?: number;
  portalId?: number;
  name: string;
  description: string;
  icon: string;
  link: string;
  sortOrder: number;
  isActive: boolean;
}

interface Portal {
  id: number;
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
  { label: 'FileSpreadsheet', value: 'FileSpreadsheet', Icon: FileSpreadsheet },
  { label: 'Megaphone', value: 'Megaphone', Icon: Megaphone },
  { label: 'ShoppingCart', value: 'ShoppingCart', Icon: ShoppingCart },
  { label: 'Users', value: 'Users', Icon: Users },
];

export default function AdminPortalItemsPage({ params }: { params: { id: string } }) {
  const portalId = parseInt(params.id);
  const [portal, setPortal] = useState<Portal | null>(null);
  const [items, setItems] = useState<PortalItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  
  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<PortalItem>({
    name: "",
    description: "",
    icon: "FileSpreadsheet",
    link: "",
    sortOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [portalRes, itemsRes] = await Promise.all([
        fetch(`/api/portals/${portalId}`),
        fetch(`/api/portals/${portalId}/items?all=true`)
      ]);

      if (portalRes.ok) {
        const portalData = await portalRes.json();
        setPortal(portalData);
      }

      if (itemsRes.ok) {
        const itemsData = await itemsRes.json();
        setItems(itemsData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      icon: "FileSpreadsheet",
      link: "",
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

  const handleSaveItem = async () => {
    if (!formData.name || !formData.description || !formData.link || !formData.icon) {
      setSaveMessage("Error: Semua field harus diisi");
      return;
    }

    setIsSaving(true);
    setSaveMessage("");
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId 
        ? `/api/portals/${portalId}/items/${editingId}` 
        : `/api/portals/${portalId}/items`;
      
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save item');

      setSaveMessage(editingId ? "Item berhasil diperbarui!" : "Item berhasil ditambahkan!");
      closeDialog();
      fetchData();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: Gagal menyimpan item");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteItem = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus item ini?')) return;

    setIsSaving(true);
    try {
      const response = await fetch(`/api/portals/${portalId}/items/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete item');

      setSaveMessage("Item berhasil dihapus!");
      fetchData();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: Gagal menghapus item");
    } finally {
      setIsSaving(false);
    }
  };

  const getIconComponent = (iconName: string) => {
    const option = iconOptions.find(opt => opt.value === iconName);
    return option ? option.Icon : FileSpreadsheet;
  };

  if (isLoading) {
    return <div className="space-y-6"><p className="text-muted-foreground">Loading...</p></div>;
  }

  if (!portal) {
    return <div className="space-y-6"><p className="text-muted-foreground">Portal tidak ditemukan</p></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/portals">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{portal.name} - Items</h1>
          <p className="text-muted-foreground mt-2">Kelola sub-items untuk portal "{portal.name}"</p>
        </div>
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Daftar Items</CardTitle>
              <CardDescription>Total: {items.length} items</CardDescription>
            </div>
            <Button onClick={() => openDialog()} className="gap-2">
              <Plus className="w-4 h-4" />
              Tambah Item
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {items.map((item) => (
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
                      onClick={() => handleDeleteItem(item.id || 0)}
                      disabled={isSaving}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {items.length === 0 && (
                <p className="text-center text-gray-400 py-8">Belum ada items</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>{editingId ? 'Edit Item' : 'Tambah Item Baru'}</CardTitle>
              <button onClick={closeDialog} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Nama Item</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Bigram"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Deskripsi</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Bimbingan dan Pengawasan Umum"
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
                <Label>Link</Label>
                <Input
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="/portal-umum/bigram"
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
                <Button onClick={handleSaveItem} disabled={isSaving} className="flex-1 gap-2">
                  <Save className="w-4 h-4" />
                  {editingId ? 'Simpan Perubahan' : 'Tambah Item'}
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
