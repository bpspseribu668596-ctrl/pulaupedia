"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, ChevronRight, X } from "lucide-react";
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

interface PortalCard {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
}

const iconMap: { [key: string]: any } = {
  BookOpen,
  Archive,
  FileText,
  Package,
  Laptop,
  DollarSign,
  BarChart3,
  Award,
};

const iconNames = Object.keys(iconMap);

const defaultCards: PortalCard[] = [
  { id: "1", title: "Portal Umum", slug: "portal-umum", description: "Informasi umum dan layanan publik", icon: "BookOpen" },
  { id: "2", title: "Brankas Fungsi", slug: "brankas-fungsi", description: "Dokumen dan arsip fungsi", icon: "Archive" },
  { id: "3", title: "Dokumentasi Kegiatan", slug: "dokumentasi-kegiatan", description: "Rekam jejak kegiatan kantor", icon: "FileText" },
  { id: "4", title: "SE2026 Archive Hub", slug: "se2026-archive-hub", description: "Arsip surat edaran 2026", icon: "Package" },
  { id: "5", title: "Aplikasi Daniel", slug: "aplikasi-daniel", description: "Sistem aplikasi internal", icon: "Laptop" },
  { id: "6", title: "Monev Anggaran", slug: "monev-anggaran", description: "Monitoring evaluasi anggaran", icon: "DollarSign" },
  { id: "7", title: "SAKIP 2026", slug: "sakip-2026", description: "Sistem Akuntabilitas Kinerja", icon: "BarChart3" },
  { id: "8", title: "ZI 2026", slug: "zi-2026", description: "Zona Integritas", icon: "Award" },
];

export default function MainPortalPage() {
  const router = useRouter();
  const [cards, setCards] = useState<PortalCard[]>(defaultCards);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingCard, setEditingCard] = useState<PortalCard | null>(null);
  const [newCard, setNewCard] = useState<Partial<PortalCard>>({ title: "", slug: "", description: "", icon: "BookOpen" });

  const handleAddCard = () => {
    if (newCard.title && newCard.slug && newCard.description) {
      setCards([...cards, { id: Date.now().toString(), ...newCard as PortalCard }]);
      setNewCard({ title: "", slug: "", description: "", icon: "BookOpen" });
      setShowAddDialog(false);
    }
  };

  const handleOpenEditDialog = (card: PortalCard) => {
    setEditingCard({ ...card });
    setShowEditDialog(true);
  };

  const handleUpdateCard = () => {
    if (editingCard && editingCard.title && editingCard.slug && editingCard.description) {
      setCards(cards.map(card => card.id === editingCard.id ? editingCard : card));
      setEditingCard(null);
      setShowEditDialog(false);
    }
  };

  const handleDeleteCard = (id: string) => {
    setCards(cards.filter(card => card.id !== id));
    setEditingCard(null);
    setShowEditDialog(false);
  };

  const handleManageItems = (slug: string) => {
    router.push(`/admin/main-portal/${slug}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Main Portal</h1>
        <p className="text-muted-foreground mt-2">Kelola portal cards yang akan ditampilkan di halaman Portal Pulau Pedia</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const IconComponent = iconMap[card.icon];

          return (
            <Card key={card.id} className="flex flex-col">
              <CardHeader className="space-y-2 flex-1">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{card.title}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">/{card.slug}</p>
                  </div>
                  {IconComponent && <IconComponent className="w-5 h-5 text-muted-foreground shrink-0" />}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-2">{card.description}</p>
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenEditDialog(card)}
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="gap-1"
                    onClick={() => handleManageItems(card.slug)}
                  >
                    Items
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {!showAddDialog && (
          <Card 
            className="border-dashed cursor-pointer hover:bg-muted/50 transition-colors flex flex-col"
            onClick={() => setShowAddDialog(true)}
          >
            <CardContent className="flex flex-col items-center justify-center flex-1 p-6">
              <div className="space-y-4 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <Plus className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Tambah Portal Card Baru</p>
                  <p className="text-xs text-muted-foreground mt-1">Klik untuk menambahkan</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle>Tambah Portal Card Baru</CardTitle>
              <button
                onClick={() => {
                  setShowAddDialog(false);
                  setNewCard({ title: "", slug: "", description: "", icon: "BookOpen" });
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
                  value={newCard.title || ""}
                  onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
                  placeholder="Contoh: Portal Umum"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Slug</Label>
                <Input
                  value={newCard.slug || ""}
                  onChange={(e) => setNewCard({ ...newCard, slug: e.target.value })}
                  placeholder="Contoh: portal-umum"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={newCard.description || ""}
                  onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
                  placeholder="Deskripsi singkat"
                  rows={3}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Icon</Label>
                <select
                  value={newCard.icon || "BookOpen"}
                  onChange={(e) => setNewCard({ ...newCard, icon: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
                >
                  {iconNames.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddCard} className="flex-1">
                  Tambah Card
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddDialog(false);
                    setNewCard({ title: "", slug: "", description: "", icon: "BookOpen" });
                  }}
                >
                  Batal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Dialog */}
      {showEditDialog && editingCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle>Edit Portal Card</CardTitle>
              <button
                onClick={() => {
                  setShowEditDialog(false);
                  setEditingCard(null);
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
                  value={editingCard.title}
                  onChange={(e) => setEditingCard({ ...editingCard, title: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Slug</Label>
                <Input
                  value={editingCard.slug}
                  onChange={(e) => setEditingCard({ ...editingCard, slug: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={editingCard.description}
                  onChange={(e) => setEditingCard({ ...editingCard, description: e.target.value })}
                  rows={3}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Icon</Label>
                <select
                  value={editingCard.icon}
                  onChange={(e) => setEditingCard({ ...editingCard, icon: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
                >
                  {iconNames.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleUpdateCard} className="flex-1">
                  Simpan
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteCard(editingCard.id)}
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