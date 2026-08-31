"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2, Edit2, X, ChevronDown, ChevronUp } from "lucide-react";
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
  
  const [portalFormData, setPortalFormData] = useState<Portal>({
    name: "",
    description: "",
    icon: "BookOpen",
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
      const response = await fetch('/api/portals?all=true');
      if (response.ok) {
        const data = await response.json();
        
        const portalsWithItems = await Promise.all(
          data.map(async (portal: Portal) => {
            try {
              const itemsRes = await fetch(`/api/portals/${portal.id}/items?all=true`);
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
  };

  const openPortalDialog = (portal?: Portal) => {
    setDialogMode('portal');
    if (portal) {
      setEditingId(portal.id || null);
      setPortalFormData(portal);
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

  const handleSavePortal = async () => {
    if (!portalFormData.name || !portalFormData.description || !portalFormData.href || !portalFormData.icon) {
      setSaveMessage("Error: Semua field portal harus diisi");
      return;
    }

    setIsSaving(true);
    setSaveMessage("");
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/portals/${editingId}` : '/api/portals';
      
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(portalFormData),
      });

      if (!response.ok) throw new Error('Failed to save portal');

      setSaveMessage(editingId ? "Portal berhasil diperbarui!" : "Portal berhasil ditambahkan!");
      closeDialog();
      fetchPortals();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
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
        ? `/api/portals/${selectedPortalId}/items/${editingId}`
        : `/api/portals/${selectedPortalId}/items`;
      
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemFormData),
      });

      if (!response.ok) throw new Error('Failed to save item');

      setSaveMessage(editingId ? "Item berhasil diperbarui!" : "Item berhasil ditambahkan!");
      closeDialog();
      fetchPortals();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: Gagal menyimpan item");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePortal = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus portal ini beserta semua itemnya?')) return;

    setIsSaving(true);
    try {
      const response = await fetch(`/api/portals/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete portal');

      setSaveMessage("Portal berhasil dihapus!");
      fetchPortals();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: Gagal menghapus portal");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteItem = async (portalId: number, itemId: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus item ini?')) return;

    setIsSaving(true);
    try {
      const response = await fetch(`/api/portals/${portalId}/items/${itemId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete item');

      setSaveMessage("Item berhasil dihapus!");
      fetchPortals();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: Gagal menghapus item");
    } finally {
      setIsSaving(false);
    }
  };

  const getIconComponent = (iconName: string) => {
    const option = iconOptions.find(opt => opt.value === iconName);
    return option ? option.Icon : BookOpen;
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const generateSuggestedPortalHref = () => {
    if (!portalFormData.name) return '';
    
    const slug = generateSlug(portalFormData.name);
    return `/${slug}`;
  };

  const generateSuggestedLink = () => {
    if (!itemFormData.name || !selectedPortalId) return '';
    
    const portal = portals.find(p => p.id === selectedPortalId);
    if (!portal) return '';
    
    const portalHref = portal.href;
    const itemSlug = generateSlug(itemFormData.name);
    
    return `${portalHref}/${itemSlug}`;
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
                  <div className="p-4 bg-gray-50 flex items-center justify-between hover:bg-gray-100 cursor-pointer"
                    onClick={() => setExpandedPortalId(expandedPortalId === portal.id ? null : (portal.id || null))}>
                    <div className="flex-1 flex items-center gap-3">
                      {(() => {
                        const Icon = getIconComponent(portal.icon);
                        return <Icon className="w-5 h-5 text-gray-400" />;
                      })()}
                      <div>
                        <p className="font-semibold text-sm">{portal.name}</p>
                        <p className="text-xs text-gray-500">{portal.items?.length || 0} items</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          openPortalDialog(portal);
                        }}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePortal(portal.id || 0);
                        }}
                        disabled={isSaving}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      {expandedPortalId === portal.id ? 
                        <ChevronUp className="w-5 h-5" /> : 
                        <ChevronDown className="w-5 h-5" />
                      }
                    </div>
                  </div>

                  {expandedPortalId === portal.id && (
                    <div className="p-4 bg-white border-t space-y-3">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-sm">Items untuk {portal.name}</h4>
                        <Button
                          size="sm"
                          className="gap-2"
                          onClick={() => openItemDialog(portal.id || 0)}
                        >
                          <Plus className="w-3 h-3" />
                          Tambah Item
                        </Button>
                      </div>
                      
                      {portal.items && portal.items.length > 0 ? (
                        <div className="space-y-2">
                          {portal.items.map((item) => (
                            <div key={item.id} className="p-3 bg-gray-50 rounded flex items-center justify-between">
                              <div className="flex-1 flex items-center gap-2">
                                {(() => {
                                  const Icon = getIconComponent(item.icon);
                                  return <Icon className="w-4 h-4 text-gray-400" />;
                                })()}
                                <div>
                                  <p className="text-sm font-medium">{item.name}</p>
                                  <p className="text-xs text-gray-500">{item.link}</p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => openItemDialog(portal.id || 0, item)}
                                >
                                  <Edit2 className="w-3 h-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleDeleteItem(portal.id || 0, item.id || 0)}
                                  disabled={isSaving}
                                >
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

      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>
                {dialogMode === 'portal' 
                  ? (editingId ? 'Edit Portal' : 'Tambah Portal Baru')
                  : (editingId ? 'Edit Item' : 'Tambah Item Baru')
                }
              </CardTitle>
              <button onClick={closeDialog} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              {dialogMode === 'portal' ? (
                <>
                  <div>
                    <Label>Nama Portal</Label>
                    <Input
                      value={portalFormData.name}
                      onChange={(e) => setPortalFormData({ ...portalFormData, name: e.target.value })}
                      placeholder="Portal Umum"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>Deskripsi</Label>
                    <Textarea
                      value={portalFormData.description}
                      onChange={(e) => setPortalFormData({ ...portalFormData, description: e.target.value })}
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
                            onClick={() => setPortalFormData({ ...portalFormData, icon: option.value })}
                            className={`p-3 rounded border-2 flex items-center justify-center transition-all ${
                              portalFormData.icon === option.value
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
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => setPortalFormData({ ...portalFormData, href: generateSuggestedPortalHref() })}
                            className="shrink-0"
                          >
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
                      value={portalFormData.sortOrder}
                      onChange={(e) => setPortalFormData({ ...portalFormData, sortOrder: parseInt(e.target.value) || 0 })}
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
                            onClick={() => setItemFormData({ ...itemFormData, icon: option.value })}
                            className={`p-3 rounded border-2 flex items-center justify-center transition-all ${
                              itemFormData.icon === option.value
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
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => setItemFormData({ ...itemFormData, link: generateSuggestedLink() })}
                            className="shrink-0"
                          >
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
                             <Button
                               type="button"
                               size="sm"
                               variant="destructive"
                               onClick={() => {
                                 setItemFormData({
                                   ...itemFormData,
                                   documents: itemFormData.documents?.filter((_, i) => i !== index) || [],
                                 });
                               }}
                               className="ml-2 shrink-0"
                             >
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
                       <Input
                         placeholder="Judul dokumen"
                         id="doc-title"
                         className="mt-1"
                       />
                       <Input
                         placeholder="Link dokumen (https://...)"
                         id="doc-link"
                         className="mt-1"
                       />
                       <Button
                         type="button"
                         variant="outline"
                         className="w-full gap-2"
                         onClick={() => {
                           const titleInput = document.getElementById('doc-title') as HTMLInputElement;
                           const linkInput = document.getElementById('doc-link') as HTMLInputElement;
                           
                           if (titleInput?.value && linkInput?.value) {
                             setItemFormData({
                               ...itemFormData,
                               documents: [
                                 ...(itemFormData.documents || []),
                                 { title: titleInput.value, link: linkInput.value },
                               ],
                             });
                             titleInput.value = '';
                             linkInput.value = '';
                           }
                         }}
                       >
                         <Plus className="w-4 h-4" />
                         Tambah Dokumen
                       </Button>
                     </div>
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
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
