"use client";

import { useState, useEffect, useCallback, use } from "react";
import Link from "next/link";
import {
  Plus, Trash2, Edit2, X, Save, AlertCircle, CheckCircle2, Loader2,
  BookOpen, Archive, FileText, Package, Laptop, DollarSign, BarChart3,
  Award, FileSpreadsheet, Megaphone, ShoppingCart, Users, ChevronLeft,
  ChevronDown, Link2, ExternalLink, Settings, ChevronRight,
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

const makeSlug = (t: string) =>
  t.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

const getItemSlug = (link: string) =>
  link.replace(/\?.*$/, "").replace(/\/$/, "").split("/").pop() ?? "";

const emptyItem: Omit<PortalItem, "id" | "portalId"> = {
  name: "", description: "", icon: "FileSpreadsheet",
  link: "", sortOrder: 0, isActive: true, documents: [],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminPortalItemsPage({
  params,
}: {
  params: Promise<{ portalSlug: string }>;
}) {
  const { portalSlug } = use(params);

  const [portal, setPortal] = useState<Portal | null>(null);
  const [items, setItems] = useState<PortalItem[]>([]);
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("loading");
  const [isSaving, setIsSaving] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  // Dialog hanya untuk TAMBAH item
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [form, setForm] = useState<Omit<PortalItem, "id" | "portalId">>(emptyItem);
  const [docTitle, setDocTitle] = useState("");
  const [docLink, setDocLink] = useState("");

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
      if (itemsRes.ok) setItems(await itemsRes.json());

      setFetchStatus("found");
    } catch (e) {
      console.error(e); setFetchStatus("notfound");
    }
  }, [portalSlug]);

  useEffect(() => {
    fetchData();
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, [fetchData]);

  if (fetchStatus === "notfound") notFound();

  // ── Dialog helpers ────────────────────────────────────────────────────────

  const closeDialog = () => {
    setShowAddDialog(false); setForm(emptyItem);
    setDocTitle(""); setDocLink("");
  };

  const openAdd = () => {
    setForm(emptyItem); setDocTitle(""); setDocLink("");
    setShowAddDialog(true);
  };

  const addDoc = () => {
    if (!docTitle || !docLink) return;
    setForm((f) => ({ ...f, documents: [...(f.documents ?? []), { title: docTitle, link: docLink }] }));
    setDocTitle(""); setDocLink("");
  };

  const removeDoc = (index: number) =>
    setForm((f) => ({ ...f, documents: f.documents?.filter((_, i) => i !== index) }));

  const suggestedLink = () => {
    if (!form.name || !portal) return "";
    return `/${portal.href.replace(/^\//, "")}/${makeSlug(form.name)}`;
  };

  const scrollToContent = () =>
    document.getElementById("items-section")?.scrollIntoView({ behavior: "smooth", block: "start" });

  // ── CRUD ──────────────────────────────────────────────────────────────────

  const handleAdd = async () => {
    if (!form.name || !form.description || !form.link || !form.icon) {
      showToast("Semua field wajib harus diisi", "error"); return;
    }
    if (!portal) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/public/portals/${portal.id}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      showToast("Item berhasil ditambahkan", "success");
      closeDialog(); await fetchData();
    } catch { showToast("Gagal menambahkan item", "error"); }
    finally { setIsSaving(false); }
  };

  const handleDelete = async (itemId: number) => {
    if (!confirm("Hapus item ini?")) return;
    if (!portal) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/public/portals/${portal.id}/items/${itemId}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      showToast("Item berhasil dihapus", "success"); await fetchData();
    } catch { showToast("Gagal menghapus item", "error"); }
    finally { setIsSaving(false); }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  const isLoading = fetchStatus === "loading";
  const PortalIcon = portal ? getIcon(portal.icon) : BookOpen;

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

        {/* Breadcrumb + admin badge */}
        <div className="absolute top-4 left-6 md:left-8 z-20 flex items-center gap-3">
          <Link
            href="/admin/main-portal"
            className="flex items-center gap-1 text-white/60 hover:text-white text-xs transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Main Portal
          </Link>
          <span className="text-white/30 text-xs">/</span>
          <span className="text-white/80 text-xs font-medium truncate max-w-[140px]">
            {isLoading ? "..." : (portal?.name ?? portalSlug)}
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
            {/* Portal icon */}
            {!isLoading && portal && (
              <div className="flex justify-center mb-3">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <PortalIcon className="w-7 h-7 text-white/80" />
                </div>
              </div>
            )}
            <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-bold tracking-wide drop-shadow-2xl mb-3 break-words">
              {isLoading
                ? <span className="inline-block h-12 w-64 bg-white/20 rounded-lg animate-pulse" />
                : portal?.name.toUpperCase()
              }
            </h1>
            <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto drop-shadow-lg px-2">
              {isLoading ? "" : portal?.description}
            </p>
            {/* Link ke halaman publik */}
            {!isLoading && portal && (
              <a
                href={portal.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 text-white/50 hover:text-white/80 text-xs font-mono transition-colors"
              >
                {portal.href} <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Scroll down arrow */}
        <button
          onClick={scrollToContent}
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
                { value: items.length || "—", label: "Total Item" },
                { value: items.filter((i) => i.isActive).length || "—", label: "Item Aktif" },
                { value: items.reduce((a, i) => a + (i.documents?.length ?? 0), 0) || "—", label: "Total Dokumen" },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center justify-center py-4 sm:py-5 px-2">
                  <span className="text-xl sm:text-2xl font-bold text-[#D83F3F]">{s.value}</span>
                  <span className="text-[10px] sm:text-xs text-gray-500 mt-0.5 text-center">{s.label}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── Wave Divider ────────────────────────────────────────── */}
      <div id="items-section" className="bg-white overflow-hidden leading-none shrink-0">
        <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" className="block w-full" preserveAspectRatio="none" style={{ height: "48px" }}>
          <path d="M0,0 C360,48 1080,48 1440,0 L1440,48 L0,48 Z" fill="#D83F3F" />
        </svg>
      </div>

      {/* ── Items Section ────────────────────────────────────────── */}
      <section className="bg-[#D83F3F] py-10 sm:py-14 relative overflow-hidden flex-1">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        />

        <div className="px-6 md:px-8 relative z-10">

          {/* Section heading + tambah button */}
          <div className="flex items-start justify-between gap-4 mb-8 sm:mb-10">
            <div className="text-center flex-1">
              <h2 className="text-white text-2xl sm:text-3xl font-bold mb-1">
                {portal?.name}
              </h2>
              <p className="text-white/70 text-sm">{portal?.description}</p>
            </div>
          </div>

          {/* Skeleton */}
          {isLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto animate-pulse">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white/10 rounded-2xl p-5 h-40 flex flex-col items-center justify-center gap-3">
                  <div className="bg-white/20 rounded-xl w-12 h-12" />
                  <div className="bg-white/20 rounded h-3 w-20" />
                  <div className="bg-white/10 rounded h-2.5 w-16" />
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && items.length === 0 && (
            <div className="text-center py-16 max-w-5xl mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white/30" />
              </div>
              <p className="text-white/70 font-semibold mb-1">Belum ada item</p>
              <p className="text-white/40 text-sm mb-4">Tambah item pertama untuk portal ini</p>
              <button
                onClick={openAdd}
                className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl bg-white text-[#D83F3F] text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Tambah Item
              </button>
            </div>
          )}

          {/* Item cards grid — mirip publik + overlay CMS */}
          {!isLoading && items.length > 0 && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
                {items.map((item) => {
                  const Icon = getIcon(item.icon);
                  const itemSlug = getItemSlug(item.link);
                  return (
                    <div
                      key={item.id}
                      className="group relative bg-white rounded-2xl p-4 sm:p-5 flex flex-col items-center gap-3 border border-white/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                    >
                      {/* Status badge */}
                      {!item.isActive && (
                        <span className="absolute top-2 left-2 text-[9px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full">
                          Non-aktif
                        </span>
                      )}

                      {/* Dokumen badge */}
                      {(item.documents?.length ?? 0) > 0 && (
                        <span className="absolute top-2 left-2 text-[9px] font-bold text-[#D83F3F] bg-red-50 border border-red-100 px-1.5 py-0.5 rounded-full">
                          {item.documents!.length} dok
                        </span>
                      )}
                      {!item.isActive && (item.documents?.length ?? 0) > 0 && (
                        <span className="absolute top-2 left-16 text-[9px] font-bold text-[#D83F3F] bg-red-50 border border-red-100 px-1.5 py-0.5 rounded-full">
                          {item.documents!.length} dok
                        </span>
                      )}

                      {/* CMS action buttons — muncul saat hover */}
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <Link
                          href={`/admin/main-portal/${portalSlug}/${itemSlug}`}
                          className="w-7 h-7 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors"
                          title="Edit item"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={isSaving}
                          className="w-7 h-7 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-40"
                          title="Hapus item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Icon */}
                      <div
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                        style={{ background: "rgba(216,63,63,0.1)" }}
                      >
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#D83F3F]" />
                      </div>

                      {/* Info */}
                      <div className="text-center min-w-0 w-full">
                        <h3 className="text-[#111111] text-xs sm:text-sm font-bold leading-tight break-words line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed mt-1 hidden sm:block line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      {/* Edit link — selalu visible di bawah */}
                      <Link
                        href={`/admin/main-portal/${portalSlug}/${itemSlug}`}
                        className="w-full flex items-center justify-center gap-1 h-7 rounded-xl border-2 border-dashed border-[#D83F3F]/30 text-[#D83F3F] text-[10px] font-semibold hover:bg-[#D83F3F]/5 hover:border-[#D83F3F]/60 transition-colors"
                      >
                        Edit <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  );
                })}

                {/* Card tambah item */}
                <button
                  onClick={openAdd}
                  disabled={isLoading}
                  className="group bg-white/10 hover:bg-white/20 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-white/30 hover:border-white/60 transition-all duration-200 cursor-pointer min-h-[160px]"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus className="w-6 h-6 text-white/60" />
                  </div>
                  <p className="text-white/70 text-xs font-semibold group-hover:text-white transition-colors">
                    Tambah Item
                  </p>
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Wave Divider (bawah) ─────────────────────────────────── */}
      <div className="overflow-hidden leading-none shrink-0" style={{ background: "rgb(249,250,251)" }}>
        <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" className="block w-full" preserveAspectRatio="none" style={{ height: "48px" }}>
          <path d="M0,48 C360,0 1080,0 1440,48 L1440,0 L0,0 Z" fill="#D83F3F" />
        </svg>
      </div>

      {/* ── Modal Dialog (TAMBAH saja) ────────────────────────────── */}
      {showAddDialog && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeDialog(); }}
        >
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#D83F3F]/10 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-[#D83F3F]" />
                </div>
                <h2 className="text-base font-semibold text-gray-900">Tambah Item</h2>
              </div>
              <button onClick={closeDialog} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Nama Item</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Bigram" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Link</Label>
                  <Input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="/portal-umum/bigram" />
                  {(() => {
                    const s = suggestedLink();
                    return s && s !== form.link ? (
                      <button onClick={() => setForm({ ...form, link: s })} className="text-[10px] text-blue-600 hover:underline cursor-pointer">
                        Gunakan: <span className="font-mono">{s}</span>
                      </button>
                    ) : null;
                  })()}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Deskripsi</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Deskripsi item..." className="min-h-[70px] resize-none" />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Icon</Label>
                <div className="grid grid-cols-6 gap-1.5">
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

              <div className="space-y-2">
                <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-1.5">
                  <Link2 className="w-3.5 h-3.5" /> Dokumen
                </Label>
                {(form.documents?.length ?? 0) > 0 ? (
                  <div className="space-y-1.5 max-h-40 overflow-y-auto">
                    {form.documents!.map((doc, i) => (
                      <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-100">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-800 truncate">{doc.title}</p>
                          <p className="text-[10px] text-gray-400 truncate">{doc.link}</p>
                        </div>
                        <button onClick={() => removeDoc(i)} className="w-6 h-6 rounded-md border border-red-200 text-red-400 hover:bg-red-50 flex items-center justify-center transition-colors shrink-0 cursor-pointer">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 text-center py-3 bg-gray-50 rounded-xl">Belum ada dokumen</p>
                )}
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 space-y-2">
                  <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Tambah Dokumen</p>
                  <Input value={docTitle} onChange={(e) => setDocTitle(e.target.value)} placeholder="Judul dokumen" className="h-9 text-sm bg-white" />
                  <Input value={docLink} onChange={(e) => setDocLink(e.target.value)} placeholder="https://..." className="h-9 text-sm bg-white" />
                  <button type="button" onClick={addDoc} disabled={!docTitle || !docLink}
                    className="w-full h-8 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-white flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40 cursor-pointer">
                    <Plus className="w-3.5 h-3.5" /> Tambah Dokumen
                  </button>
                </div>
              </div>

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

            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 shrink-0">
              <button onClick={closeDialog} className="flex-1 h-10 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">Batal</button>
              <button onClick={handleAdd} disabled={isSaving}
                className="flex-1 h-10 rounded-xl bg-[#D83F3F] hover:bg-[#c03535] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-60 cursor-pointer">
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isSaving ? "Menyimpan..." : "Tambahkan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
