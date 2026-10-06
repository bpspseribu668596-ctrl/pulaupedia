"use client";

import { useEffect, useState } from "react";
import { ChevronDown, FileText, ExternalLink, ChevronRight, House } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortalSidebar from "@/components/PortalSidebar";
import { ErrorMessage } from "@/components/ErrorMessage";
import { ERROR_MESSAGES } from "@/lib/error-messages";
import Link from "next/link";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";

interface Portal {
  id: number;
  name: string;
  description: string;
  icon: string;
  href: string;
}

interface PortalItem {
  id: number;
  name: string;
  description: string;
  icon: string;
  link: string;
  documents?: Array<{ title: string; link: string }>;
}

interface HeaderData {
  id?: number;
  title: string;
  subtitle: string;
  backgroundImage: string;
}

export default function ItemDetailPage() {
  const params = useParams();
  const portalSlug = params.portalSlug as string;
  const itemSlug = params.itemSlug as string;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [portal, setPortal] = useState<Portal | null>(null);
  const [allItems, setAllItems] = useState<PortalItem[]>([]);
  const [currentItem, setCurrentItem] = useState<PortalItem | null>(null);
  // "loading" = sedang fetch, "found" = data ada, "notfound" = data tidak ada
  const [fetchStatus, setFetchStatus] = useState<"loading" | "found" | "notfound">("loading");
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);

  const [headerError, setHeaderError] = useState<string | null>(null);
  const [itemError, setItemError] = useState<string | null>(null);

  const [headerLoading, setHeaderLoading] = useState(true);
  const [itemsLoading, setItemsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);

    const attachObserver = () => {
      const header = document.getElementById("main-header");
      if (!header) return;
      const observer = new IntersectionObserver(
        ([entry]) => setIsScrolled(!entry.isIntersecting),
        { threshold: 0, rootMargin: "-1px 0px 0px 0px" }
      );
      observer.observe(header);
      return observer;
    };

    let observer = attachObserver();
    let retryTimer: ReturnType<typeof setTimeout>;
    if (!observer) {
      retryTimer = setTimeout(() => { observer = attachObserver(); }, 300);
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(retryTimer);
      observer?.disconnect();
    };
  }, [fetchStatus]);

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const [portalsRes, headerRes] = await Promise.all([
          fetch('/api/portals?all=true'),
          fetch('/api/header'),
        ]);

        if (headerRes.ok) {
          setHeaderData(await headerRes.json());
        } else {
          setHeaderError(ERROR_MESSAGES.HEADER_UNAVAILABLE);
        }

        if (!portalsRes.ok) {
          setFetchStatus("notfound");
          return;
        }

        const portalsData = await portalsRes.json();
        const matchedPortal = portalsData.find((p: Portal) => {
          const hrefSlug = p.href.replace(/^\//, '').toLowerCase();
          return hrefSlug === portalSlug;
        });

        if (!matchedPortal) {
          setFetchStatus("notfound");
          return;
        }

        setPortal(matchedPortal);

        const itemsRes = await fetch(`/api/portals/${matchedPortal.id}/items`);
        if (!itemsRes.ok) {
          setItemError(ERROR_MESSAGES.ITEMS_UNAVAILABLE);
          setFetchStatus("notfound");
          return;
        }

        const itemsData: PortalItem[] = await itemsRes.json();
        setAllItems(itemsData);

        // Cocokkan itemSlug dengan segment terakhir dari item.link
        // Normalisasi: buang query string dan trailing slash sebelum split
        const matchedItem = itemsData.find((item) => {
          const cleanLink = item.link.replace(/\?.*$/, '').replace(/\/$/, '');
          const lastSegment = cleanLink.split('/').pop()?.toLowerCase() ?? '';
          return lastSegment === itemSlug.toLowerCase();
        });

        if (matchedItem) {
          setCurrentItem(matchedItem);
          setFetchStatus("found");
        } else {
          setFetchStatus("notfound");
          return;
        }
      } catch {
        setItemError(ERROR_MESSAGES.DB_CONNECTION);
        setFetchStatus("notfound");
      } finally {
        setHeaderLoading(false);
        setItemsLoading(false);
      }
    };

    fetchItemData();
  }, [portalSlug, itemSlug]);

  const scrollToContent = () => {
    document.getElementById("content-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Hanya panggil notFound() setelah fetch benar-benar selesai dan status jelas "notfound"
  if (fetchStatus === "notfound") notFound();

  // Masih loading — render skeleton/null, jangan trigger notFound
  if (fetchStatus === "loading") return null;

  const portalHref = `/${portalSlug}`;
  const docCount = currentItem?.documents?.length ?? 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isScrolled={isScrolled} />

      {/* ── Hero Header ─────────────────────────────────────────── */}
      <header
        id="main-header"
        className="relative h-[40vh] min-h-[240px] flex items-center border-b-4 border-[#D83F3F] overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#333333]" />
        {headerLoading ? (
          <div className="absolute inset-0 flex items-center justify-center animate-pulse">
            <div className="text-center w-full px-4 pt-16 pb-10">
              <div className="h-8 sm:h-12 md:h-16 bg-white/20 rounded-lg max-w-xs sm:max-w-lg mx-auto mb-4" />
              <div className="h-4 sm:h-5 bg-white/10 rounded max-w-[200px] sm:max-w-sm mx-auto mb-2" />
              <div className="h-4 sm:h-5 bg-white/10 rounded max-w-[160px] sm:max-w-xs mx-auto" />
            </div>
          </div>
        ) : (
          <>
            {headerData?.backgroundImage?.startsWith('http') && (
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${headerData.backgroundImage}')` }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-[#333333]/80 via-[#333333]/70 to-[#333333]/60 halftone-pattern" />
            <div className="container mx-auto px-4 relative z-10 w-full pt-16 pb-10">
              <div className={`text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <h1 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wide drop-shadow-2xl mb-3 sm:mb-4 break-words">
                  {currentItem?.name.toUpperCase()}
                </h1>
                <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-xl md:max-w-2xl mx-auto drop-shadow-lg px-2">
                  {currentItem?.description}
                </p>
              </div>
            </div>
          </>
        )}
        <button
          onClick={scrollToContent}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer hover:scale-110 transition-transform"
          aria-label="Scroll to Content"
        >
          <ChevronDown className="text-white w-7 h-7 sm:w-8 sm:h-8 drop-shadow-lg" />
        </button>
      </header>

      {/* ── Stats Bar ───────────────────────────────────────────── */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 divide-x divide-gray-100">
            {itemsLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center justify-center py-4 sm:py-5 px-2 gap-1.5 animate-pulse">
                  <div className="h-6 sm:h-7 w-10 bg-gray-200 rounded-md" />
                  <div className="h-3 w-16 bg-gray-100 rounded" />
                </div>
              ))
            ) : (
              [
                { value: docCount || "—", label: "Dokumen" },
                { value: allItems.length || "—", label: "Menu di Portal" },
                { value: "2026", label: "Tahun Aktif" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center py-4 sm:py-5 px-2">
                  <span className="text-xl sm:text-2xl font-bold text-[#D83F3F]">{stat.value}</span>
                  <span className="text-[10px] sm:text-xs text-gray-500 mt-0.5 text-center">{stat.label}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── Wave Divider ────────────────────────────────────────── */}
      <div className="bg-white overflow-hidden leading-none">
        <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" className="block w-full" preserveAspectRatio="none" style={{ height: "48px" }}>
          <path d="M0,0 C360,48 1080,48 1440,0 L1440,48 L0,48 Z" fill="#D83F3F" />
        </svg>
      </div>

      {/* ── Content ─────────────────────────────────────────────── */}
      <section id="content-section" className="bg-[#D83F3F] py-10 sm:py-14 relative overflow-hidden flex-1">
        {/* Dot texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        />

        <div className="container mx-auto px-4 relative z-10">

          {/* Breadcrumb */}
          <nav className="flex items-center flex-wrap gap-x-1.5 gap-y-1 text-xs sm:text-sm mb-6 sm:mb-8 text-white/60">
            <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors shrink-0">
              <House className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Beranda</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/30 shrink-0" />
            <Link href={portalHref} className="hover:text-white transition-colors shrink-0 max-w-[120px] sm:max-w-none truncate">
              {portal?.name ?? portalSlug}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/30 shrink-0" />
            <span className="text-white font-medium truncate max-w-[140px] sm:max-w-[200px]">
              {currentItem?.name ?? itemSlug}
            </span>
          </nav>

          {/* Layout: sidebar kiri, konten kanan */}
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
            <PortalSidebar />

            <div className="flex-1 min-w-0">
              {itemsLoading ? (
                <div className="animate-pulse space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="bg-white/10 rounded-2xl h-16" />
                  ))}
                </div>
              ) : (
                <div>
                  {/* Section heading */}
                  <div className="mb-6 sm:mb-8">
                    <h2 className="text-white text-2xl sm:text-3xl font-bold mb-1 break-words">
                      Dokumen {currentItem?.name}
                    </h2>
                    <p className="text-white/60 text-sm">
                      Pilih dokumen untuk mengakses file yang tersimpan
                    </p>
                  </div>

                  {itemError && <ErrorMessage message={itemError} />}

                  {currentItem?.documents && currentItem.documents.length > 0 ? (
                    <div className="space-y-3 sm:space-y-4">
                      {currentItem.documents.map((doc, index) => (
                        <a
                          key={index}
                          href={doc.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between bg-white hover:bg-gray-50 rounded-2xl p-4 sm:p-5 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 border border-white/80 gap-3"
                        >
                          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                            <div
                              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-110"
                              style={{ background: "rgba(216,63,63,0.1)" }}
                            >
                              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#D83F3F]" />
                            </div>
                            <h3 className="text-sm sm:text-base font-semibold text-[#111111] group-hover:text-[#D83F3F] transition-colors break-words min-w-0 line-clamp-2">
                              {doc.title}
                            </h3>
                          </div>
                          <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-[#D83F3F] transition-colors shrink-0" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                        <FileText className="h-8 w-8 text-white/30" />
                      </div>
                      <p className="text-white/70 font-semibold mb-1">Belum ada dokumen</p>
                      <p className="text-white/40 text-sm">Dokumen untuk item ini belum tersedia</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Wave Divider (bawah) ────────────────────────────────── */}
      <div className="overflow-hidden leading-none" style={{ background: "rgb(249,250,251)" }}>
        <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" className="block w-full" preserveAspectRatio="none" style={{ height: "48px" }}>
          <path d="M0,48 C360,0 1080,0 1440,48 L1440,0 L0,0 Z" fill="#D83F3F" />
        </svg>
      </div>

      <Footer />
    </div>
  );
}
