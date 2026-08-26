"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, ArrowLeft, X, ChevronRight, Save, Trash2 } from "lucide-react";

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

interface Portal {
  id: number;
  name: string;
  href: string;
}

export default function PortalSlugPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [portal, setPortal] = useState<Portal | null>(null);
  const [items, setItems] = useState<PortalItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  
  const [showDialog, setShowDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<PortalItem | null>(null);
  const [formData, setFormData] = useState<PortalItem>({
    name: "",
    description: "",
    icon: "FileSpreadsheet",
    link: "",
    sortOrder: 0,
    isActive: true,
    documents: [],
  });

  useEffect(() => {
    fetchPortalData();
  }, [slug]);

  const fetchPortalData = async () => {
    try {
      // Fetch all portals to find the one matching slug
      const portalsRes = await fetch('/api/portals?all=true');
      if (portalsRes.ok) {
        const portals = await portalsRes.json();
        const foundPortal = portals.find((p: Portal) => p.href === `/${slug}` || p.href.includes(slug));
        
        if (foundPortal) {
          setPortal(foundPortal);
          
          // Fetch items for this portal
          const itemsRes = await fetch(`/api/portals/${foundPortal.id}/items?all=true`);
          if (itemsRes.ok) {
            const itemsData = await itemsRes.json();
            setItems(itemsData);
          }
        } else {
          setSaveMessage("Portal tidak ditemukan");
        }
      }
    } catch (error) {
      console.error('Error fetching portal data:', error);
      setSaveMessage("Error: Gagal memuat data portal");
    } finally {
      setIsLoading(false);
    }
  };

  const openDialog = (item?: PortalItem) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        name: "",
        description: "",
        icon: "FileSpreadsheet",
        link: "",
        sortOrder: 0,
        isActive: true,
        documents: [],
      });
    }
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setEditingItem(null);
    setFormData({
      name: "",
      description: "",
      icon: "FileSpreadsheet",
      link: "",
      sortOrder: 0,
      isActive: true,
      documents: [],
    });
  };

  const handleSave = async () => {
    if (!formData.name || !formData.description || !formData.link) {
      setSaveMessage("Error: Nama, deskripsi, dan link harus diisi");
      return;
    }

    if (!portal) {
      setSaveMessage("Error: Portal tidak ditemukan");
      return;
    }

    setIsSaving(true);
    setSaveMessage("");
    try {
      const method = editingItem ? 'PUT' : 'POST';
      const url = editingItem 
        ? `/api/portals/${portal.id}/items/${editingItem.id}`
        : `/api/portals/${portal.id}/items`;
      
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save item');

      setSaveMessage(editingItem ? "Item berhasil diperbarui!" : "Item berhasil ditambahkan!");
      closeDialog();
      fetchPortalData();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: Gagal menyimpan item");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (itemId: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus item ini?')) return;

    if (!portal) return;

    setIsSaving(true);
    try {
      const response = await fetch(`/api/portals/${portal.id}/items/${itemId}`, { 
        method: 'DELETE' 
      });
      
      if (!response.ok) throw new Error('Failed to delete item');

      setSaveMessage("Item berhasil dihapus!");
      fetchPortalData();
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error: Gagal menghapus item");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!portal) {
    return (
      <div className="space-y-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <p className="text-red-600">Portal tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{portal.name}</h1>
          <p className="text-muted-foreground mt-2">Manage items untuk portal ini</p>
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

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Items</CardTitle>
            <CardDescription>Total: {items.length} items</CardDescription>
          </div>
          <Button onClick={() => openDialog()} className="gap-2">
            <Plus className="w-4 h-4" />
            Tambah Item
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1 flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <p className="text-xs text-muted-foreground break-all">{item.link}</p>
                      {item.documents && item.documents.length > 0 && (
                        <p className="text-xs text-blue-600">{item.documents.length} dokumen</p>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openDialog(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(item.id || 0)}
                        disabled={isSaving}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {items.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-muted-foreground">Belum ada items. Tambahkan item baru untuk memulai.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>

      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>{editingItem ? 'Edit Item' : 'Tambah Item Baru'}</CardTitle>
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

              <div>
                <Label>Documents</Label>
                <div className="mt-2 space-y-2 p-3 bg-gray-50 rounded-lg max-h-48 overflow-y-auto">
                  {formData.documents && formData.documents.length > 0 ? (
                    formData.documents.map((doc, index) => (
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
                            setFormData({
                              ...formData,
                              documents: formData.documents?.filter((_, i) => i !== index) || [],
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
                        setFormData({
                          ...formData,
                          documents: [
                            ...(formData.documents || []),
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
                <Button onClick={handleSave} disabled={isSaving} className="flex-1 gap-2">
                  <Save className="w-4 h-4" />
                  {editingItem ? 'Simpan Perubahan' : 'Tambah Item'}
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
