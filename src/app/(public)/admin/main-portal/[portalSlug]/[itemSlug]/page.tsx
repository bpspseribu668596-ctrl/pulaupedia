"use client";

import { useState, useEffect, useCallback, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Save, AlertCircle, CheckCircle2, Loader2,
  BookOpen, Archive, FileText, Package, Laptop, DollarSign, BarChart3,
  Award, FileSpreadsheet, Megaphone, ShoppingCart, Users, ChevronLeft,
  Link2, Plus, X, ExternalLink, Edit2, Check, ChevronDown, Settings,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Portal {
  id: number;
  name: string;
  description: string;
  icon: string;
  href: string;
}

interface Document {
  title: string;
  link: string;
}

interface PortalItem {
  id: number;
  portalId: number;
  name: string;
  description: string;
  icon: string;
  link: string;
  sortOrder: number;
  isActive: boolean;
  documents?: Document[];
}

type FetchStatus = "loading" | "found" | "notfound";

// ─── Constants ────────────────────────────────────────────────────────────────

const iconOptions = [
  { label: "BookOpen",        value: "BookOpen",        Icon: BookOpen },
  { label: "Archive",         value: "Archive",         Icon: Archive },
  { label: "FileText",        value: "FileText",        Icon: FileText },
  { label: "Package",         value: "Package",         Icon: Package },
  { label: "Laptop",          value: "Laptop",          Icon: Laptop },
  { label: "DollarSign",      value: "DollarSign",      Icon: DollarSign },
  { label: "BarChart3",       value: "BarChart3",       Icon: BarChart3 },
  { label: "Award",           value: "Award",           Icon: Award },
  { label: "FileSpreadsheet", value: "FileSpreadsheet", Icon: FileSpreadsheet },
  { label: "Megaphone",       value: "Megaphone",       Icon: Megaphone },
  { label: "ShoppingCart",    value: "ShoppingCart",    Icon: ShoppingCart },
  { label: "Users",           value: "Users",           Icon: Users },
];

const getIcon = (name: string) =>
  iconOptions.find((o) => o.value === name)?.Icon ?? FileSpreadsheet;

const getItemSlug = (link: string) =>
  link.replace(/\?.*$/, "").replace(/\/$/, "").split("/").pop() ?? "";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminEditItemPage({
  params,
}: {
  params: Promise<{ portalSlug: string; itemSlug: string }>;
}) {
  const { portalSlug, itemSlug } = use(params);
  const router = useRouter();

  const [portal, setPortal] = useState<Portal | null>(null);
  const [item, setItem] = useState<PortalItem | null>(null);
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("loading");
  const [isSaving, setIsSaving] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const [form, setForm] = useState<Omit<PortalItem, "id" | "portalId"> & { id?: number }>({
    name: "", description: "", icon: "FileSpreadsheet",
    link: "", sortOrder: 0, isActive: true, documents: [],
  });
  const [docTitle, setDocTitle] = useState("");
  const [docLink, setDocLink] = useState("");

  // Edit inline dokumen
  const [editingDocIndex, setEditingDocIndex] = useState<number | null>(null);
  const [editDocTitle, setEditDocTitle] = useState("");
  const [editDocLink, setEditDocLink] = useState("");

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ── Fetch ─────────────────────────────────────────────────────────────────

  const fetchData = useCallback(async () => {
    setFetchStatus("loading");
    try {
      const portalsRes = await fetch("/api/public/portals?all=true");
      if (!portalsRes.ok) { setFetchStatus("notfound"); return; }

      const portalsData: Portal[] = await portalsRes.json();
      const matchedPortal = portalsData.find((p) =>
        p.href.replace(/^\//, "").toLowerCase() === portalSlug.toLowerCase()
      );
      if (!matchedPortal) { setFetchStatus("notfound"); return; }
      setPortal(matchedPortal);

      const itemsRes = await fetch(`/api/public/portals/${matchedPortal.id}/items?all=true`);
      if (!itemsRes.ok) { setFetchStatus("notfound"); return; }

      const itemsData: PortalItem[] = await itemsRes.json();
      const matchedItem = itemsData.find(
        (i) => getItemSlug(i.link).toLowerCase() === itemSlug.toLowerCase()
      );
      if (!matchedItem) { setFetchStatus("notfound"); return; }

      setItem(matchedItem);
      setForm({
        id: matchedItem.id, name: matchedItem.name,
        description: matchedItem.description, icon: matchedItem.icon,
        link: matchedItem.link, sortOrder: matchedItem.sortOrder,
        isActive: matchedItem.isActive, documents: matchedItem.documents ?? [],
      });
      setFetchStatus("found");
    } catch (e) {
      console.error(e); setFetchStatus("notfound");
    }
  }, [portalSlug, itemSlug]);

  useEffect(() => {
    fetchData();
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, [fetchData]);

  if (fetchStatus === "notfound") notFound();

  // ── Dokumen helpers ───────────────────────────────────────────────────────

  const addDoc = () => {
    if (!docTitle || !docLink) return;
    setForm((f) => ({ ...f, documents: [...(f.documents ?? []), { title: docTitle, link: docLink }] }));
    setDocTitle(""); setDocLink("");
  };

  const removeDoc = (index: number) =>
    setForm((f) => ({ ...f, documents: f.documents?.filter((_, i) => i !== index) }));

  const startEditDoc = (index: number) => {
    const doc = form.documents?.[index];
    if (!doc) return;
    setEditingDocIndex(index); setEditDocTitle(doc.title); setEditDocLink(doc.link);
  };

  const cancelEditDoc = () => {
    setEditingDocIndex(null); setEditDocTitle(""); setEditDocLink("");
  };

  const confirmEditDoc = (index: number) => {
    if (!editDocTitle || !editDocLink) return;
    setForm((f) => ({
      ...f,
      documents: f.documents?.map((doc, i) =>
        i === index ? { title: editDocTitle, link: editDocLink } : doc
      ),
    }));
    cancelEditDoc();
  };

  const scrollToEdit = () =>
    document.getElementById("edit-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });

  // ── Save ──────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    if (!form.name || !form.description || !form.link || !form.icon) {
      showToast("Semua field wajib harus diisi", "error"); return;
    }
    if (!portal || !item) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/public/portals/${portal.id}/items/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      showToast("Item berhasil disimpan", "success");
      setTimeout(() => router.push(`/admin/main-portal/${portalSlug}`), 1000);
    } catch { showToast("Gagal menyimpan item", "error"); }
    finally { setIsSaving(false); }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  const isLoading = fetchStatus === "loading";
  const ItemIcon = getIcon(form.icon);

  return (
    <div className="min-h-screen flex flex-col -m-6 md:-m-8">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-sm font-medium ${
          toast.type === "success"
            ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
            : "bg-red-50 border border-red-200 text-red-800"
        }`}>
          {toast.type === "success" ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          {toast.msg}
        </div>
      )}

      {/* ── Hero Header ─────────────────────────────────────────── */}
      <header className="relative h-[40vh] min-h-[240px] flex items-center border-b-4 border-[#D83F3F] overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-[#333333]" />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }}
        />

        {/* Breadcrumb 3 level */}
        <div className="absolute top-4 left-6 md:left-8 z-20 flex items-center gap-1.5 flex-wrap">
          <Link href="/admin/main-portal" className="text-white/50 hover:text-white text-xs transition-colors">
            Main Portal
          </Link>
          <span className="text-white/30 text-xs">/</span>
          <Link href={`/admin/main-portal/${portalSlug}`} className="text-white/50 hover:text-white text-xs transition-colors truncate max-w-[100px]">
            {isLoading ? "..." : (portal?.name ?? portalSlug)}
          </Link>
          <span className="text-white/30 text-xs">/</span>
          <span className="text-white/80 text-xs font-medium truncate max-w-[120px]">
            {isLoading ? "..." : (item?.name ?? itemSlug)}
          </span>
        </div>

        {/* Admin mode badge */}
        <div className="absolute top-4 right-6 md:right-8 z-20">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#D83F3F] bg-[#D83F3F]/15 border border-[#D83F3F]/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
            <Settings className="w-3 h-3" /> Mode Admin
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-6 md:px-8 pt-12 pb-10">
          <div className={`text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {/* Item icon */}
            {!isLoading && (
              <div className="flex justify-center mb-3">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <ItemIcon className="w-7 h-7 text-white/80" />
                </div>
              </div>
            )}
            <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-bold tracking-wide drop-shadow-2xl mb-3 break-words">
              {isLoading
                ? <span className="inline-block h-12 w-64 bg-white/20 rounded-lg animate-pulse" />
                : item?.name.toUpperCase()
              }
            </h1>
            <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto drop-shadow-lg px-2">
              {isLoading ? "" : item?.description}
            </p>
            {/* Link ke halaman publik */}
            {!isLoading && item && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 text-white/50 hover:text-white/80 text-xs font-mono transition-colors"
              >
                {item.link} <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Scroll down */}
        <button
          onClick={scrollToEdit}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer hover:scale-110 transition-transform"
        >
          <ChevronDown className="text-white w-7 h-7 drop-shadow-lg" />
        </button>
      </header>

      {/* ── Stats Bar ───────────────────────────────────────────── */}
      <div className="bg-white shadow-sm border-b border-gray-100 shrink-0">
        <div className="px-6 md:px-8">
          <div className="grid grid-cols-3 divide-x divide-gray-100">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center justify-center py-4 sm:py-5 px-2 gap-1.5 animate-pulse">
                  <div className="h-6 w-10 bg-gray-200 rounded-md" />
                  <div className="h-3 w-16 bg-gray-100 rounded" />
                </div>
              ))
            ) : (
              [
                { value: form.documents?.length || "—", label: "Dokumen" },
                { value: form.isActive ? "Aktif" : "Non-aktif", label: "Status" },
                { value: portal?.name ?? "—", label: "Portal" },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center justify-center py-4 sm:py-5 px-2">
                  <span className="text-lg sm:text-2xl font-bold text-[#D83F3F] truncate max-w-full text-center">{s.value}</span>
                  <span className="text-[10px] sm:text-xs text-gray-500 mt-0.5 text-center">{s.label}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── Wave Divider ────────────────────────────────────────── */}
      <div className="bg-white overflow-hidden leading-none shrink-0">
        <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" className="block w-full" preserveAspectRatio="none" style={{ height: "48px" }}>
          <path d="M0,0 C360,48 1080,48 1440,0 L1440,48 L0,48 Z" fill="#D83F3F" />
        </svg>
      </div>

      {/* ── Dokumen Section — mirip [itemSlug] publik ─────────────── */}
      <section className="bg-[#D83F3F] py-10 sm:py-14 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        />

        <div className="px-6 md:px-8 relative z-10 max-w-3xl mx-auto">

          {/* Section heading */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-white text-2xl sm:text-3xl font-bold mb-1 break-words">
              Dokumen {item?.name}
            </h2>
            <p className="text-white/60 text-sm">Kelola dokumen yang terlampir pada item ini</p>
          </div>

          {isLoading ? (
            <div className="animate-pulse space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white/10 rounded-2xl h-16" />
              ))}
            </div>
          ) : (
            <>
              {/* Daftar dokumen — mirip tampilan publik + tombol aksi */}
              {(form.documents?.length ?? 0) > 0 ? (
                <div className="space-y-3 sm:space-y-4 mb-6">
                  {form.documents!.map((doc, i) =>
                    editingDocIndex === i ? (
                      /* ── Mode edit inline ── */
                      <div
                        key={i}
                        className="bg-white rounded-2xl p-4 border-2 border-blue-300 space-y-3"
                      >
                        <p className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">
                          Edit Dokumen #{i + 1}
                        </p>
                        <Input
                          value={editDocTitle}
                          onChange={(e) => setEditDocTitle(e.target.value)}
                          placeholder="Judul dokumen"
                          className="h-9 text-sm"
                          autoFocus
                        />
                        <Input
                          value={editDocLink}
                          onChange={(e) => setEditDocLink(e.target.value)}
                          placeholder="https://..."
                          className="h-9 text-sm"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => confirmEditDoc(i)}
                            disabled={!editDocTitle || !editDocLink}
                            className="flex-1 h-8 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40 cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" /> Simpan
                          </button>
                          <button
                            onClick={cancelEditDoc}
                            className="flex-1 h-8 rounded-xl border border-gray-200 bg-white text-xs font-medium text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" /> Batal
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* ── Tampilan normal — mirip publik + overlay aksi ── */
                      <div
                        key={i}
                        className="group flex items-center justify-between bg-white hover:bg-gray-50 rounded-2xl p-4 sm:p-5 transition-all duration-200 hover:shadow-xl border border-white/80 gap-3"
                      >
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                          <div
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-105"
                            style={{ background: "rgba(216,63,63,0.1)" }}
                          >
                            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#D83F3F]" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-sm sm:text-base font-semibold text-[#111111] break-words line-clamp-1">
                              {doc.title}
                            </h3>
                            <a
                              href={doc.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] text-[#D83F3F] hover:underline truncate block"
                            >
                              {doc.link}
                            </a>
                          </div>
                        </div>

                        {/* Aksi — edit + hapus + link */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <a
                            href={doc.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center text-gray-300 hover:text-[#D83F3F] hover:border-[#D83F3F]/30 transition-colors"
                            title="Buka dokumen"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => startEditDoc(i)}
                            className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center text-gray-300 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors cursor-pointer"
                            title="Edit dokumen"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => removeDoc(i)}
                            className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center text-gray-300 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Hapus dokumen"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="text-center py-12 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-white/30" />
                  </div>
                  <p className="text-white/70 font-semibold mb-1">Belum ada dokumen</p>
                  <p className="text-white/40 text-sm">Tambahkan dokumen di bawah</p>
                </div>
              )}

              {/* Form tambah dokumen */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/20 space-y-3">
                <p className="text-white/80 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5" /> Tambah Dokumen
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    value={docTitle}
                    onChange={(e) => setDocTitle(e.target.value)}
                    placeholder="Judul dokumen"
                    className="h-9 text-sm bg-white/90 border-white/30 placeholder:text-gray-400"
                  />
                  <Input
                    value={docLink}
                    onChange={(e) => setDocLink(e.target.value)}
                    placeholder="https://..."
                    className="h-9 text-sm bg-white/90 border-white/30 placeholder:text-gray-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={addDoc}
                  disabled={!docTitle || !docLink}
                  className="w-full h-9 rounded-xl bg-white hover:bg-gray-50 text-[#D83F3F] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40 cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambahkan Dokumen
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Wave Divider tengah ───────────────────────────────────── */}
      <div className="overflow-hidden leading-none shrink-0 bg-gray-50">
        <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" className="block w-full" preserveAspectRatio="none" style={{ height: "48px" }}>
          <path d="M0,48 C360,0 1080,0 1440,48 L1440,0 L0,0 Z" fill="#D83F3F" />
        </svg>
      </div>

      {/* ── Admin Edit Panel ─────────────────────────────────────── */}
      <section id="edit-panel" className="bg-gray-50 py-10 sm:py-14">
        <div className="px-6 md:px-8 max-w-3xl mx-auto space-y-6">

          {/* Panel header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#333333] flex items-center justify-center shrink-0">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Panel Edit</h2>
              <p className="text-xs text-gray-400">Ubah data item dan simpan perubahan</p>
            </div>
          </div>

          {isLoading ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 animate-pulse">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-10 bg-gray-100 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#D83F3F]/10 flex items-center justify-center">
                  <ItemIcon className="w-4 h-4 text-[#D83F3F]" />
                </div>
                <h3 className="text-sm font-semibold text-gray-700">Detail Item</h3>
                {/* Status pill */}
                <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  form.isActive
                    ? "text-emerald-600 bg-emerald-50 border-emerald-200"
                    : "text-amber-600 bg-amber-50 border-amber-200"
                }`}>
                  {form.isActive ? "Aktif" : "Non-aktif"}
                </span>
              </div>

              <div className="px-6 py-6 space-y-5">

                {/* Nama + Link */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Nama Item</Label>
                    <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Bigram" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Link</Label>
                    <Input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="/portal-umum/bigram" />
                  </div>
                </div>

                {/* Deskripsi */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Deskripsi</Label>
                  <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Deskripsi item..." className="min-h-[80px] resize-none" />
                </div>

                {/* Icon picker */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Icon</Label>
                  <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
                    {iconOptions.map(({ value, label, Icon }) => (
                      <button key={value} type="button" onClick={() => setForm({ ...form, icon: value })} title={label}
                        className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer ${
                          form.icon === value ? "border-[#D83F3F] bg-red-50" : "border-gray-100 hover:border-gray-300 bg-white"
                        }`}>
                        <Icon className="w-4 h-4 text-gray-600" />
                        <span className="text-[8px] text-gray-400">{label.slice(0, 6)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort order + Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Sort Order</Label>
                    <Input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Status</Label>
                    <div className="flex gap-2 pt-1">
                      {([true, false] as const).map((val) => (
                        <button key={String(val)} type="button" onClick={() => setForm({ ...form, isActive: val })}
                          className={`flex-1 h-9 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
                            form.isActive === val
                              ? val ? "bg-emerald-500 text-white border-emerald-500" : "bg-amber-500 text-white border-amber-500"
                              : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                          }`}>
                          {val ? "Aktif" : "Non-aktif"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dokumen ringkasan di panel */}
          {!isLoading && (
            <div className="bg-white rounded-2xl border border-gray-100 px-6 py-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Link2 className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Dokumen</p>
                  <p className="text-xs text-gray-400">{form.documents?.length ?? 0} terlampir — kelola di atas</p>
                </div>
              </div>
              <button
                onClick={() => document.getElementById("items-section") ? window.scrollTo({ top: 0, behavior: "smooth" }) : null}
                className="text-xs font-semibold text-[#D83F3F] hover:underline cursor-pointer"
              >
                Ke bagian dokumen ↑
              </button>
            </div>
          )}

          {/* Action buttons */}
          {!isLoading && (
            <div className="flex gap-3 pb-8">
              <Link
                href={`/admin/main-portal/${portalSlug}`}
                className="flex-1 h-11 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-white transition-colors flex items-center justify-center"
              >
                Batal
              </Link>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 h-11 rounded-xl bg-[#D83F3F] hover:bg-[#c03535] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-60 cursor-pointer shadow-md"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
