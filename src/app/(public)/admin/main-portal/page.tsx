"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2, Edit2, X, ChevronDown, ChevronUp, Upload, ImageIcon } from "lucide-react";
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

interface Portal {
  id?: number;
  name: string;
  description: string;
  icon: string;
  iconImage?: string | null;
  href: string;
  sortOrder: number;
  isActive: boolean;
}

interface PortalItem {
  id?: number;
  portalId?: number;
  name: string;
  description: string;
  icon: string;
  link: string;
  sortOrder: number;
  isActive: boolean;
  documents?: Array<{
    title: string;
    link: string;
  }>;
}

interface PortalWithItems extends Portal {
  items?: PortalItem[];
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

export default function AdminMainPortalPage() {
  const [portals, setPortals] = useState<PortalWithItems[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [expandedPortalId, setExpandedPortalId] = useState<number | null>(null);

  const [showDialog, setShowDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'portal' | 'item'>('portal');
  const [selectedPortalId, setSelectedPortalId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Icon mode: 'lucide' atau 'image'
  const [iconMode, setIconMode] = useState<'lucide' | 'image'>('lucide');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [portalFormData, setPortalFormData] = useState<Portal>({
    name: "",
    description: "",
    icon: "BookOpen",
    iconImage: null,
    href: "",
    sortOrder: 0,
    isActive: true,
  });

  const [itemFormData, setItemFormData] = useState<PortalItem>({
    name: "",
    description: "",
    icon: "FileSpreadsheet",
    link: "",
    sortOrder: 0,
    isActive: true,
    documents: [],
  });

  useEffect(() => {
    fetchPortals();
  }, []);

  const fetchPortals = async () => {
    try {
      const response = await fetch('/api/public/portals?all=true');
      if (response.ok) {
        const data = await response.json();
        const portalsWithItems = await Promise.all(
          data.map(async (portal: Portal) => {
            try {
              const itemsRes = await fetch(`/api/public/portals/${portal.id}/items?all=true`);
              const items = itemsRes.ok ? await itemsRes.json() : [];
              return { ...portal, items };
            } catch {
              return { ...portal, items: [] };
            }
          })
        );
        setPortals(portalsWithItems);
      }
    } catch (error) {
      console.error('Error fetching portals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForms = () => {
    setPortalFormData({
      name: "",
      description: "",
      icon: "BookOpen",
      iconImage: null,
      href: "",
      sortOrder: 0,
      isActive: true,
    });
    setItemFormData({
      name: "",
      description: "",
      icon: "FileSpreadsheet",
      link: "",
      sortOrder: 0,
      isActive: true,
      documents: [],
    });
    setEditingId(null);
    setSelectedPortalId(null);
    setIconMode('lucide');
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const openPortalDialog = (portal?: Portal) => {
    setDialogMode('portal');
    if (portal) {
      setEditingId(portal.id || null);
      setPortalFormData(portal);
      // Tentukan mode icon berdasarkan data existing
      if (portal.iconImage) {
        setIconMode('image');
        setPreviewUrl(portal.iconImage);
      } else {
        setIconMode('lucide');
        setPreviewUrl(null);
      }
      setSelectedFile(null);
    } else {
      resetForms();
    }
    setShowDialog(true);
  };

  const openItemDialog = (portalId: number, item?: PortalItem) => {
    setDialogMode('item');
    setSelectedPortalId(portalId);
    if (item) {
      setEditingId(item.id || null);
      setItemFormData(item);
    } else {
      setItemFormData({
        name: "",
        description: "",
        icon: "FileSpreadsheet",
        link: "",
        sortOrder: 0,
        isActive: true,
      });
      setEditingId(null);
    }
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    resetForms();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setSaveMessage("Error: Hanya file gambar yang diizinkan");
      return;
    }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    // Kosongkan iconImage lama saat pilih file baru
    setPortalFormData((prev) => ({ ...prev, iconImage: null }));
  };

  const handleSavePortal = async () => {
    if (!portalFormData.name || !portalFormData.description || !portalFormData.href) {
      setSaveMessage("Error: Nama, deskripsi, dan URL harus diisi");
      return;
    }
    if (iconMode === 'lucide' && !portalFormData.icon) {
      setSaveMessage("Error: Pilih icon");
      return;
    }

    setIsSaving(true);
    setSaveMessage("");

    try {
      let iconImage = portalFormData.iconImage || null;

      // Upload file baru jika ada
      if (iconMode === 'image' && selectedFile) {
        const fd = new FormData();
        fd.append('file', selectedFile);
        const uploadRes = await fetch('/api/public/uploads/portals', { method: 'POST', body: fd });
        if (!uploadRes.ok) throw new Error('Upload gagal');
        const result = await uploadRes.json();
        iconImage = result.url;
      }

      // Kalau mode lucide, hapus iconImage
      if (iconMode === 'lucide') {
        iconImage = null;
      }

      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/public/portals/${editingId}` : '/api/public/portals';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...portalFormData, iconImage }),
      });

      if (!res.ok) throw new Error('Gagal menyimpan');

      setSaveMessage(editingId ? "Portal berhasil diperbarui!" : "Portal berhasil ditambahkan!");
      closeDialog();
      fetchPortals();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch {
      setSaveMessage("Error: Gagal menyimpan portal");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveItem = async () => {
    if (!itemFormData.name || !itemFormData.description || !itemFormData.link || !itemFormData.icon) {
      setSaveMessage("Error: Semua field item harus diisi");
      return;
    }
    if (!selectedPortalId) {
      setSaveMessage("Error: Portal tidak dipilih");
      return;
    }

    setIsSaving(true);
    setSaveMessage("");
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId
        ? `/api/public/portals/${selectedPortalId}/items/${editingId}`
        : `/api/public/portals/${selectedPortalId}/items`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemFormData),
      });

      if (!response.ok) throw new Error('Failed to save item');

      setSaveMessage(editingId ? "Item berhasil diperbarui!" : "Item berhasil ditambahkan!");
      closeDialog();
      fetchPortals();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch {
      setSaveMessage("Error: Gagal menyimpan item");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePortal = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus portal ini beserta semua itemnya?')) return;
    setIsSaving(true);
    try {
      const response = await fetch(`/api/public/portals/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete portal');
      setSaveMessage("Portal berhasil dihapus!");
      fetchPortals();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch {
      setSaveMessage("Error: Gagal menghapus portal");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteItem = async (portalId: number, itemId: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus item ini?')) return;
    setIsSaving(true);
    try {
      const response = await fetch(`/api/public/portals/${portalId}/items/${itemId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete item');
      setSaveMessage("Item berhasil dihapus!");
      fetchPortals();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch {
      setSaveMessage("Error: Gagal menghapus item");
    } finally {
      setIsSaving(false);
    }
  };

  const getIconComponent = (iconName: string) => {
    const option = iconOptions.find(opt => opt.value === iconName);
    return option ? option.Icon : BookOpen;
  };

  const generateSlug = (text: string) =>
    text.toLowerCase().trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

  const generateSuggestedPortalHref = () => {
    if (!portalFormData.name) return '';
    return `/${generateSlug(portalFormData.name)}`;
  };

  const generateSuggestedLink = () => {
    if (!itemFormData.name || !selectedPortalId) return '';
    const portal = portals.find(p => p.id === selectedPortalId);
    if (!portal) return '';
    return `${portal.href}/${generateSlug(itemFormData.name)}`;
  };

  if (isLoading) {
    return <div className="space-y-6"><p className="text-muted-foreground">Loading...</p></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Main Portal Settings</h1>
        <p className="text-muted-foreground mt-2">Kelola portal dan sub-items di halaman utama</p>
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
              <CardTitle>Daftar Portal & Items</CardTitle>
              <CardDescription>Total: {portals.length} portals</CardDescription>
            </div>
            <Button onClick={() => openPortalDialog()} className="gap-2">
              <Plus className="w-4 h-4" />
              Tambah Portal
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {portals.map((portal) => (
                <div key={portal.id} className="border rounded-lg overflow-hidden">
                  <div
                    className="p-4 bg-gray-50 flex items-center justify-between hover:bg-gray-100 cursor-pointer"
                    onClick={() => setExpandedPortalId(expandedPortalId === portal.id ? null : (portal.id || null))}
                  >
                    <div className="flex-1 flex items-center gap-3">
                      {/* Preview icon — gambar atau lucide */}
                      {portal.iconImage ? (
                        <img src={portal.iconImage} alt={portal.name} className="w-6 h-6 object-contain rounded" />
                      ) : (
                        (() => { const Icon = getIconComponent(portal.icon); return <Icon className="w-5 h-5 text-gray-400" />; })()
                      )}
                      <div>
                        <p className="font-semibold text-sm">{portal.name}</p>
                        <p className="text-xs text-gray-500">{portal.items?.length || 0} items</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); openPortalDialog(portal); }}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={(e) => { e.stopPropagation(); handleDeletePortal(portal.id || 0); }} disabled={isSaving}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      {expandedPortalId === portal.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>

                  {expandedPortalId === portal.id && (
                    <div className="p-4 bg-white border-t space-y-3">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-sm">Items untuk {portal.name}</h4>
                        <Button size="sm" className="gap-2" onClick={() => openItemDialog(portal.id || 0)}>
                          <Plus className="w-3 h-3" />
                          Tambah Item
                        </Button>
                      </div>
                      {portal.items && portal.items.length > 0 ? (
                        <div className="space-y-2">
                          {portal.items.map((item) => (
                            <div key={item.id} className="p-3 bg-gray-50 rounded flex items-center justify-between">
                              <div className="flex-1 flex items-center gap-2">
                                {(() => { const Icon = getIconComponent(item.icon); return <Icon className="w-4 h-4 text-gray-400" />; })()}
                                <div>
                                  <p className="text-sm font-medium">{item.name}</p>
                                  <p className="text-xs text-gray-500">{item.link}</p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => openItemDialog(portal.id || 0, item)}>
                                  <Edit2 className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => handleDeleteItem(portal.id || 0, item.id || 0)} disabled={isSaving}>
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 text-center py-4">Belum ada items untuk portal ini</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {portals.length === 0 && (
                <p className="text-center text-gray-400 py-8">Belum ada portals</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Dialog ── */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>
                {dialogMode === 'portal'
                  ? (editingId ? 'Edit Portal' : 'Tambah Portal Baru')
                  : (editingId ? 'Edit Item' : 'Tambah Item Baru')}
              </CardTitle>
              <button onClick={closeDialog} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              {dialogMode === 'portal' ? (
                <>
                  {/* Nama */}
                  <div>
                    <Label>Nama Portal</Label>
                    <Input
                      value={portalFormData.name}
                      onChange={(e) => setPortalFormData({ ...portalFormData, name: e.target.value })}
                      placeholder="Portal Umum"
                      className="mt-1"
                    />
                  </div>

                  {/* Deskripsi */}
                  <div>
                    <Label>Deskripsi</Label>
                    <Textarea
                      value={portalFormData.description}
                      onChange={(e) => setPortalFormData({ ...portalFormData, description: e.target.value })}
                      placeholder="Informasi umum dan layanan publik"
                      className="mt-1 min-h-[80px]"
                    />
                  </div>

                  {/* Icon — toggle lucide vs upload */}
                  <div>
                    <Label>Icon</Label>
                    {/* Toggle tabs */}
                    <div className="flex gap-2 mt-2 mb-3">
                      <button
                        type="button"
                        onClick={() => setIconMode('lucide')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border transition-colors ${
                          iconMode === 'lucide'
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        Pilih Icon
                      </button>
                      <button
                        type="button"
                        onClick={() => setIconMode('image')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border transition-colors ${
                          iconMode === 'image'
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        Upload Gambar
                      </button>
                    </div>

                    {/* Lucide grid */}
                    {iconMode === 'lucide' && (
                      <div className="grid grid-cols-4 gap-2">
                        {iconOptions.map((option) => {
                          const Icon = option.Icon;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setPortalFormData({ ...portalFormData, icon: option.value })}
                              className={`p-3 rounded border-2 flex flex-col items-center gap-1 transition-all ${
                                portalFormData.icon === option.value
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              title={option.label}
                            >
                              <Icon className="w-5 h-5" />
                              <span className="text-[10px] text-gray-500">{option.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Upload gambar */}
                    {iconMode === 'image' && (
                      <div className="space-y-3">
                        <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                          <Upload className="w-6 h-6 text-gray-400 mb-1" />
                          <span className="text-sm text-gray-500">Klik untuk pilih gambar</span>
                          <span className="text-xs text-gray-400">PNG, JPG, SVG, WebP</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileSelect}
                          />
                        </label>

                        {previewUrl && (
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                            <img src={previewUrl} alt="Preview" className="w-12 h-12 object-contain rounded" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-green-700">
                                {selectedFile ? `✓ Siap diupload: ${selectedFile.name}` : '✓ Gambar saat ini'}
                              </p>
                              {!selectedFile && portalFormData.iconImage && (
                                <p className="text-xs text-gray-400 truncate">{portalFormData.iconImage}</p>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedFile(null);
                                setPreviewUrl(null);
                                setPortalFormData((prev) => ({ ...prev, iconImage: null }));
                              }}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}

                        <p className="text-xs text-gray-400">
                          Gambar akan ditampilkan sebagai icon portal di halaman utama. Rekomendasi: ukuran 64×64px atau lebih, format transparan (PNG/SVG).
                        </p>
                      </div>
                    )}
                  </div>

                  {/* URL */}
                  <div>
                    <Label>URL/Href</Label>
                    <div className="space-y-2 mt-1">
                      <Input
                        value={portalFormData.href}
                        onChange={(e) => setPortalFormData({ ...portalFormData, href: e.target.value })}
                        placeholder="/portal-umum"
                      />
                      {portalFormData.name && generateSuggestedPortalHref() !== portalFormData.href && (
                        <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded">
                          <div className="flex-1">
                            <p className="text-xs text-blue-600 font-medium">Saran:</p>
                            <p className="text-sm text-blue-800">{generateSuggestedPortalHref()}</p>
                          </div>
                          <Button type="button" size="sm" variant="outline"
                            onClick={() => setPortalFormData({ ...portalFormData, href: generateSuggestedPortalHref() })}>
                            Gunakan
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sort order */}
                  <div>
                    <Label>Sort Order</Label>
                    <Input
                      type="number"
                      value={portalFormData.sortOrder}
                      onChange={(e) => setPortalFormData({ ...portalFormData, sortOrder: parseInt(e.target.value) || 0 })}
                      className="mt-1"
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSavePortal} disabled={isSaving} className="flex-1 gap-2">
                      <Save className="w-4 h-4" />
                      {isSaving ? 'Menyimpan...' : editingId ? 'Simpan Perubahan' : 'Tambah Portal'}
                    </Button>
                    <Button variant="outline" onClick={closeDialog} className="flex-1">Batal</Button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Label>Nama Item</Label>
                    <Input
                      value={itemFormData.name}
                      onChange={(e) => setItemFormData({ ...itemFormData, name: e.target.value })}
                      placeholder="Bigram"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>Deskripsi</Label>
                    <Textarea
                      value={itemFormData.description}
                      onChange={(e) => setItemFormData({ ...itemFormData, description: e.target.value })}
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
                            type="button"
                            onClick={() => setItemFormData({ ...itemFormData, icon: option.value })}
                            className={`p-3 rounded border-2 flex flex-col items-center gap-1 transition-all ${
                              itemFormData.icon === option.value
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            title={option.label}
                          >
                            <Icon className="w-5 h-5" />
                            <span className="text-[10px] text-gray-500">{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <Label>Link</Label>
                    <div className="space-y-2 mt-1">
                      <Input
                        value={itemFormData.link}
                        onChange={(e) => setItemFormData({ ...itemFormData, link: e.target.value })}
                        placeholder="/portal-umum/bigram"
                      />
                      {itemFormData.name && selectedPortalId && generateSuggestedLink() !== itemFormData.link && (
                        <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded">
                          <div className="flex-1">
                            <p className="text-xs text-blue-600 font-medium">Saran:</p>
                            <p className="text-sm text-blue-800">{generateSuggestedLink()}</p>
                          </div>
                          <Button type="button" size="sm" variant="outline"
                            onClick={() => setItemFormData({ ...itemFormData, link: generateSuggestedLink() })}>
                            Gunakan
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label>Sort Order</Label>
                    <Input
                      type="number"
                      value={itemFormData.sortOrder}
                      onChange={(e) => setItemFormData({ ...itemFormData, sortOrder: parseInt(e.target.value) || 0 })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>Documents</Label>
                    <div className="mt-2 space-y-2 p-3 bg-gray-50 rounded-lg max-h-48 overflow-y-auto">
                      {itemFormData.documents && itemFormData.documents.length > 0 ? (
                        itemFormData.documents.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between bg-white p-2 rounded border border-gray-200">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{doc.title}</p>
                              <p className="text-xs text-gray-500 truncate">{doc.link}</p>
                            </div>
                            <Button type="button" size="sm" variant="destructive"
                              onClick={() => setItemFormData({ ...itemFormData, documents: itemFormData.documents?.filter((_, i) => i !== index) || [] })}
                              className="ml-2 shrink-0">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 text-center py-2">Belum ada dokumen</p>
                      )}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <Label>Tambah Dokumen Baru</Label>
                    <div className="space-y-2 mt-2">
                      <Input placeholder="Judul dokumen" id="doc-title" className="mt-1" />
                      <Input placeholder="Link dokumen (https://...)" id="doc-link" className="mt-1" />
                      <Button type="button" variant="outline" className="w-full gap-2"
                        onClick={() => {
                          const titleInput = document.getElementById('doc-title') as HTMLInputElement;
                          const linkInput = document.getElementById('doc-link') as HTMLInputElement;
                          if (titleInput?.value && linkInput?.value) {
                            setItemFormData({ ...itemFormData, documents: [...(itemFormData.documents || []), { title: titleInput.value, link: linkInput.value }] });
                            titleInput.value = '';
                            linkInput.value = '';
                          }
                        }}>
                        <Plus className="w-4 h-4" />
                        Tambah Dokumen
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSaveItem} disabled={isSaving} className="flex-1 gap-2">
                      <Save className="w-4 h-4" />
                      {isSaving ? 'Menyimpan...' : editingId ? 'Simpan Perubahan' : 'Tambah Item'}
                    </Button>
                    <Button variant="outline" onClick={closeDialog} className="flex-1">Batal</Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
