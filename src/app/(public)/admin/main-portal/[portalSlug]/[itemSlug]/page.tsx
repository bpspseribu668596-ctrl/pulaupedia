"use client";

import { useState, useEffect, useCallback, use } from "react";
import Link from "next/link";
import {
  AlertCircle, CheckCircle2,
  BookOpen, Archive, FileText, Package, Laptop, DollarSign, BarChart3,
  Award, FileSpreadsheet, Megaphone, ShoppingCart, Users, ChevronLeft,
  Plus, X, ExternalLink, Edit2, Check, ChevronDown, Settings,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Input } from "@/components/ui/input";

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

export default function AdminItemDocumentsPage({
  params,
}: {
  params: Promise<{ portalSlug: string; itemSlug: string }>;
}) {
  const { portalSlug, itemSlug } = use(params);

  const [portal, setPortal] = useState<Portal | null>(null);
  const [item, setItem] = useState<PortalItem | null>(null);
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("loading");
  const [isSaving, setIsSaving] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  // State dokumen — tersimpan di form.documents, di-submit bareng PUT item
  const [documents, setDocuments] = useState<Document[]>([]);
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
      setDocuments(matchedItem.documents ?? []);
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
    setDocuments((d) => [...d, { title: docTitle, link: docLink }]);
    setDocTitle(""); setDocLink("");
  };

  const removeDoc = (index: number) =>
    setDocuments((d) => d.filter((_, i) => i !== index));

  const startEditDoc = (index: number) => {
    const doc = documents[index];
    if (!doc) return;
    setEditingDocIndex(index); setEditDocTitle(doc.title); setEditDocLink(doc.link);
  };

  const cancelEditDoc = () => {
    setEditingDocIndex(null); setEditDocTitle(""); setEditDocLink("");
  };

  const confirmEditDoc = (index: number) => {
    if (!editDocTitle || !editDocLink) return;
    setDocuments((d) => d.map((doc, i) =>
      i === index ? { title: editDocTitle, link: editDocLink } : doc
    ));
    cancelEditDoc();
  };

  // ── Save dokumen (PUT item dengan dokumen yang diperbarui) ────────────────

  const handleSaveDocs = async () => {
    if (!portal || !item) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/public/portals/${portal.id}/items/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, documents }),
      });
      if (!res.ok) throw new Error();
      showToast("Dokumen berhasil disimpan", "success");
      await fetchData();
    } catch { showToast("Gagal menyimpan dokumen", "error"); }
    finally { setIsSaving(false); }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  const isLoading = fetchStatus === "loading";
  const ItemIcon = item ? getIcon(item.icon) : FileSpreadsheet;

  // Apakah ada perubahan dokumen yang belum disimpan
  const hasChanges = JSON.stringify(documents) !== JSON.stringify(item?.documents ?? []);

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

        <button
          onClick={() => document.getElementById("docs-section")?.scrollIntoView({ behavior: "smooth", block: "start" })}
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
                { value: documents.length || "—", label: "Dokumen" },
                { value: item?.isActive ? "Aktif" : "Non-aktif", label: "Status" },
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
      <div id="docs-section" className="bg-white overflow-hidden leading-none shrink-0">
        <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" className="block w-full" preserveAspectRatio="none" style={{ height: "48px" }}>
          <path d="M0,0 C360,48 1080,48 1440,0 L1440,48 L0,48 Z" fill="#D83F3F" />
        </svg>
      </div>

      {/* ── Dokumen Section ──────────────────────────────────────── */}
      <section className="bg-[#D83F3F] py-10 sm:py-14 relative overflow-hidden flex-1">
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
              {/* Daftar dokumen */}
              {documents.length > 0 ? (
                <div className="space-y-3 sm:space-y-4 mb-6">
                  {documents.map((doc, i) =>
                    editingDocIndex === i ? (
                      /* ── Mode edit inline ── */
                      <div key={i} className="bg-white rounded-2xl p-4 border-2 border-blue-300 space-y-3">
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
                      /* ── Tampilan normal ── */
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

                        {/* Aksi */}
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
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/20 space-y-3 mb-6">
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

              {/* Tombol Simpan Dokumen — hanya muncul kalau ada perubahan */}
              {hasChanges && (
                <div className="flex gap-3">
                  <button
                    onClick={() => { setDocuments(item?.documents ?? []); cancelEditDoc(); }}
                    className="flex-1 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" /> Batalkan
                  </button>
                  <button
                    onClick={handleSaveDocs}
                    disabled={isSaving}
                    className="flex-1 h-10 rounded-xl bg-white hover:bg-gray-50 text-[#D83F3F] text-sm font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-60 cursor-pointer shadow-sm"
                  >
                    {isSaving
                      ? <span className="w-4 h-4 border-2 border-[#D83F3F]/30 border-t-[#D83F3F] rounded-full animate-spin" />
                      : <CheckCircle2 className="w-4 h-4" />
                    }
                    {isSaving ? "Menyimpan..." : "Simpan Dokumen"}
                  </button>
                </div>
              )}
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

      {/* ── Footer area kecil dengan link kembali ────────────────── */}
      <div className="bg-gray-50 py-6 shrink-0">
        <div className="px-6 md:px-8 max-w-3xl mx-auto">
          <Link
            href={`/admin/main-portal/${portalSlug}`}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#D83F3F] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Kembali ke {portal?.name ?? portalSlug}
          </Link>
        </div>
      </div>
    </div>
  );
}
