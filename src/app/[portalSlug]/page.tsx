"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ErrorMessage } from "@/components/ErrorMessage";
import { ERROR_MESSAGES } from "@/lib/error-messages";
import Link from "next/link";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import {
  BookOpen, Archive, FileText, Package, Laptop, DollarSign,
  BarChart3, Award, FileSpreadsheet, Megaphone, ShoppingCart, Users,
} from "lucide-react";

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
}

interface HeaderData {
  id?: number;
  title: string;
  subtitle: string;
  backgroundImage: string;
}

export default function DynamicPortalPage() {
  const params = useParams();
  const portalSlug = params.portalSlug as string;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [portal, setPortal] = useState<Portal | null>(null);
  const [items, setItems] = useState<PortalItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);

  const [headerError, setHeaderError] = useState<string | null>(null);
  const [portalError, setPortalError] = useState<string | null>(null);
  const [itemsError, setItemsError] = useState<string | null>(null);

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
  }, [isLoading]);

  useEffect(() => {
    const fetchPortalData = async () => {
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
        setHeaderLoading(false);

        if (!portalsRes.ok) {
          setNotFoundState(true);
          setIsLoading(false);
          setItemsLoading(false);
          return;
        }

        const portalsData = await portalsRes.json();
        const currentPortal = portalsData.find((p: Portal) => {
          const hrefSlug = p.href.replace(/^\//, '').toLowerCase();
          return hrefSlug === portalSlug;
        });

        if (!currentPortal) {
          setNotFoundState(true);
          setIsLoading(false);
          setItemsLoading(false);
          return;
        }

        setPortal(currentPortal);
        setIsLoading(false);

        const itemsRes = await fetch(`/api/portals/${currentPortal.id}/items`);
        if (itemsRes.ok) {
          setItems(await itemsRes.json());
        } else {
          setItemsError(ERROR_MESSAGES.ITEMS_UNAVAILABLE);
        }
        setItemsLoading(false);
      } catch {
        setPortalError(ERROR_MESSAGES.DB_CONNECTION);
        setHeaderLoading(false);
        setItemsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortalData();
  }, [portalSlug]);

  const scrollToContent = () => {
    document.getElementById("content-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  type IconMap = Record<string, React.ComponentType<{ className?: string }>>;
  const iconMap: IconMap = {
    FileSpreadsheet, DollarSign, Package, BarChart3, Megaphone,
    Award, ShoppingCart, Users, BookOpen, Archive, FileText, Laptop,
  };
  const getIconComponent = (iconName: string) => iconMap[iconName] || FileSpreadsheet;

  if (!portal && !isLoading && notFoundState) {
    notFound();
  }

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
                  {portal?.name.toUpperCase()}
                </h1>
                <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-xl md:max-w-2xl mx-auto drop-shadow-lg px-2">
                  {portal?.description}
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
                { value: items.length || "—", label: "Menu Tersedia" },
                { value: portal?.name.split(" ")[0] ?? "—", label: "Portal" },
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
      <div id="content-section" className="bg-white overflow-hidden leading-none">
        <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" className="block w-full" preserveAspectRatio="none" style={{ height: "48px" }}>
          <path d="M0,0 C360,48 1080,48 1440,0 L1440,48 L0,48 Z" fill="#D83F3F" />
        </svg>
      </div>

      {/* ── Portal Items Section ────────────────────────────────── */}
      <section className="bg-[#D83F3F] py-10 sm:py-14 relative overflow-hidden flex-1">
        {/* Subtle dot texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              {portal?.name}
            </h2>
            <p className="text-white/70 text-sm sm:text-base max-w-md mx-auto">
              {portal?.description}
            </p>
          </div>

          {portalError && <ErrorMessage message={portalError} />}
          {itemsError && <ErrorMessage message={itemsError} />}

          {/* Skeleton */}
          {itemsLoading && !itemsError && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto animate-pulse">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white/10 rounded-2xl p-5 h-36 flex flex-col items-center justify-center gap-3">
                  <div className="bg-white/20 rounded-xl w-12 h-12" />
                  <div className="bg-white/20 rounded h-3 w-20" />
                  <div className="bg-white/10 rounded h-2.5 w-16" />
                </div>
              ))}
            </div>
          )}

          {/* Item cards — putih solid, ikon merah (selaras dengan homepage) */}
          {!itemsLoading && !itemsError && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
              {items.length > 0 ? (
                items.map((item) => {
                  const Icon = getIconComponent(item.icon);
                  return (
                    <Link
                      key={item.id}
                      href={item.link}
                      className="group bg-white hover:bg-gray-50 rounded-2xl p-4 sm:p-5 flex flex-col items-center gap-3 transition-all duration-200 hover:shadow-xl hover:-translate-y-1 border border-white/80"
                    >
                      <div
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                        style={{ background: "rgba(216,63,63,0.1)" }}
                      >
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#D83F3F]" />
                      </div>
                      <div className="text-center min-w-0 w-full">
                        <h3 className="text-[#111111] text-xs sm:text-sm font-bold leading-tight break-words line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed mt-1 hidden sm:block line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-white/70 text-sm sm:text-base">
                    Belum ada menu untuk portal ini
                  </p>
                </div>
              )}
            </div>
          )}
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
