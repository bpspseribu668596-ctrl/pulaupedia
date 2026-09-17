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

  if (!portal && !isLoading) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isScrolled={isScrolled} />

      {/* Hero Header */}
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

      {/* Content */}
      <section id="content-section" className="bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16 flex-1">
        <div className="container mx-auto px-4">
          {itemsLoading ? (
            <div className="animate-pulse">
              <div className="text-center mb-8 sm:mb-12">
                <div className="h-7 sm:h-8 bg-gray-200 rounded max-w-[160px] sm:max-w-xs mx-auto mb-3 sm:mb-4" />
                <div className="h-3 sm:h-4 bg-gray-100 rounded max-w-[200px] sm:max-w-sm mx-auto" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-[#D83F3F]/20 rounded-xl p-4 sm:p-6 h-32 sm:h-40 flex flex-col items-center justify-center gap-2 sm:gap-3">
                    <div className="bg-[#D83F3F]/30 rounded-full w-12 sm:w-16 h-12 sm:h-16" />
                    <div className="bg-[#D83F3F]/20 rounded h-3 sm:h-4 w-20 sm:w-24" />
                    <div className="bg-[#D83F3F]/10 rounded h-2 sm:h-3 w-16 sm:w-20 hidden sm:block" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-[#111111] text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{portal?.name}</h2>
                <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto px-2">{portal?.description}</p>
              </div>

              {portalError && <ErrorMessage message={portalError} />}
              {itemsError && <ErrorMessage message={itemsError} />}

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
                {items.map((item) => {
                  const Icon = getIconComponent(item.icon);
                  return (
                    <Link
                      key={item.id}
                      href={item.link}
                      className="group bg-[#D83F3F]/90 hover:bg-[#D83F3F] rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center gap-3 sm:gap-4 transition-all hover:scale-105 hover:shadow-2xl border border-[#D83F3F]"
                    >
                      <div className="bg-white/20 p-3 sm:p-4 rounded-full group-hover:bg-white/30 transition-all shrink-0">
                        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <div className="text-center min-w-0 w-full">
                        <h3 className="text-white text-sm sm:text-base md:text-lg font-bold mb-1 sm:mb-2 leading-tight break-words">{item.name}</h3>
                        <p className="text-white/80 text-xs leading-relaxed hidden sm:block line-clamp-2">{item.description}</p>
                      </div>
                    </Link>
                  );
                })}
                {items.length === 0 && (
                  <p className="col-span-2 sm:col-span-3 lg:col-span-4 text-center text-gray-500 py-8 text-sm sm:text-base">
                    Belum ada items untuk portal ini
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
