"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, ArrowLeft, X } from "lucide-react";

interface PortalItem {
  id: string;
  title: string;
  url: string;
}

interface PortalData {
  [key: string]: PortalItem[];
}

export default function PortalSlugPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const defaultPortalData: PortalData = {
    "portal-umum": [
      { id: "1", title: "BIGRAM", url: "http://localhost:3000/portal-umum/bigram" },
      { id: "2", title: "Profil", url: "http://localhost:3000/portal-umum/profil" },
    ],
    "brankas-fungsi": [],
    "dokumentasi-kegiatan": [],
    "se2026-archive-hub": [],
    "aplikasi-daniel": [],
    "monev-anggaran": [],
    "sakip-2026": [],
    "zi-2026": [],
  };

  const [items, setItems] = useState<PortalItem[]>(defaultPortalData[slug] || []);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<PortalItem | null>(null);
  const [newItem, setNewItem] = useState({ title: "", url: "" });

  const handleAddItem = () => {
    if (newItem.title && newItem.url) {
      setItems([...items, { id: Date.now().toString(), ...newItem }]);
      setNewItem({ title: "", url: "" });
      setShowAddDialog(false);
    }
  };

  const handleOpenEditDialog = (item: PortalItem) => {
    setEditingItem({ ...item });
    setShowEditDialog(true);
  };

  const handleUpdateItem = () => {
    if (editingItem && editingItem.title && editingItem.url) {
      setItems(items.map(item => item.id === editingItem.id ? editingItem : item));
      setEditingItem(null);
      setShowEditDialog(false);
    }
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    setEditingItem(null);
    setShowEditDialog(false);
  };

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
          <h1 className="text-3xl font-bold tracking-tight capitalize">{slug.replace(/-/g, " ")}</h1>
          <p className="text-muted-foreground mt-2">Manage items untuk portal ini</p>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <Card key={item.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground break-all">{item.url}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenEditDialog(item)}
                >
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {items.length === 0 && !showAddDialog && (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">Belum ada items. Tambahkan item baru untuk memulai.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {!showAddDialog && (
        <Button
          onClick={() => setShowAddDialog(true)}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Tambah Item
        </Button>
      )}

      {showAddDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle>Tambah Item Baru</CardTitle>
              <button
                onClick={() => {
                  setShowAddDialog(false);
                  setNewItem({ title: "", url: "" });
                }}
                className="rounded-md hover:bg-muted p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  placeholder="Contoh: BIGRAM"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>URL</Label>
                <Input
                  value={newItem.url}
                  onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                  placeholder="Contoh: http://localhost:3000/portal-umum/bigram"
                  className="mt-1"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddItem} className="flex-1">
                  Tambah
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddDialog(false);
                    setNewItem({ title: "", url: "" });
                  }}
                >
                  Batal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showEditDialog && editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle>Edit Item</CardTitle>
              <button
                onClick={() => {
                  setShowEditDialog(false);
                  setEditingItem(null);
                }}
                className="rounded-md hover:bg-muted p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>URL</Label>
                <Input
                  value={editingItem.url}
                  onChange={(e) => setEditingItem({ ...editingItem, url: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleUpdateItem} className="flex-1">
                  Simpan
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteItem(editingItem.id)}
                >
                  Hapus
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
