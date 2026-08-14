"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, ArrowLeft, X } from "lucide-react";

interface SubItem {
  id: string;
  title: string;
  link: string;
}

interface ItemData {
  [key: string]: {
    [key: string]: SubItem[];
  };
}

export default function ItemSlugPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const itemSlug = params.itemSlug as string;

  const defaultItemData: ItemData = {
    "portal-umum": {
      "bigram": [
        { id: "1", title: "KK RPD, Revisi dan Matriks Mitra 2025", link: "http://example.com/kk-rpd" },
      ],
      "profil": [],
    },
    "brankas-fungsi": {},
    "dokumentasi-kegiatan": {},
    "se2026-archive-hub": {},
    "aplikasi-daniel": {},
    "monev-anggaran": {},
    "sakip-2026": {},
    "zi-2026": {},
  };

  const [subItems, setSubItems] = useState<SubItem[]>(
    defaultItemData[slug]?.[itemSlug] || []
  );
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingSubItem, setEditingSubItem] = useState<SubItem | null>(null);
  const [newSubItem, setNewSubItem] = useState({ title: "", link: "" });

  const handleAddSubItem = () => {
    if (newSubItem.title && newSubItem.link) {
      setSubItems([...subItems, { id: Date.now().toString(), ...newSubItem }]);
      setNewSubItem({ title: "", link: "" });
      setShowAddDialog(false);
    }
  };

  const handleOpenEditDialog = (item: SubItem) => {
    setEditingSubItem({ ...item });
    setShowEditDialog(true);
  };

  const handleUpdateSubItem = () => {
    if (editingSubItem && editingSubItem.title && editingSubItem.link) {
      setSubItems(subItems.map(item => item.id === editingSubItem.id ? editingSubItem : item));
      setEditingSubItem(null);
      setShowEditDialog(false);
    }
  };

  const handleDeleteSubItem = (id: string) => {
    setSubItems(subItems.filter(item => item.id !== id));
    setEditingSubItem(null);
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
          <h1 className="text-3xl font-bold tracking-tight capitalize">{itemSlug.replace(/-/g, " ")}</h1>
          <p className="text-muted-foreground mt-2">Manage cards untuk item ini</p>
        </div>
      </div>

      <div className="space-y-4">
        {subItems.map((item) => (
          <Card key={item.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1 flex-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground break-all">{item.link}</p>
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

        {subItems.length === 0 && !showAddDialog && (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">Belum ada cards. Tambahkan card baru untuk memulai.</p>
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
          Tambah Card
        </Button>
      )}

      {showAddDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle>Tambah Card Baru</CardTitle>
              <button
                onClick={() => {
                  setShowAddDialog(false);
                  setNewSubItem({ title: "", link: "" });
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
                  value={newSubItem.title}
                  onChange={(e) => setNewSubItem({ ...newSubItem, title: e.target.value })}
                  placeholder="Contoh: KK RPD, Revisi dan Matriks Mitra 2025"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Link</Label>
                <Input
                  value={newSubItem.link}
                  onChange={(e) => setNewSubItem({ ...newSubItem, link: e.target.value })}
                  placeholder="Contoh: http://example.com/kk-rpd"
                  className="mt-1"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddSubItem} className="flex-1">
                  Tambah
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddDialog(false);
                    setNewSubItem({ title: "", link: "" });
                  }}
                >
                  Batal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showEditDialog && editingSubItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle>Edit Card</CardTitle>
              <button
                onClick={() => {
                  setShowEditDialog(false);
                  setEditingSubItem(null);
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
                  value={editingSubItem.title}
                  onChange={(e) => setEditingSubItem({ ...editingSubItem, title: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Link</Label>
                <Input
                  value={editingSubItem.link}
                  onChange={(e) => setEditingSubItem({ ...editingSubItem, link: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleUpdateSubItem} className="flex-1">
                  Simpan
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteSubItem(editingSubItem.id)}
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
