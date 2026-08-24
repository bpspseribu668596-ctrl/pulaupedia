"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  BookOpen,
  Archive,
  FileText,
  Package,
  Laptop,
  DollarSign,
  BarChart3,
  Award,
  FileSpreadsheet,
  Megaphone,
  ShoppingCart,
  Users,
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
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);

    const header = document.getElementById("main-header");
    if (!header) {
      clearTimeout(timer);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-1px 0px 0px 0px",
      }
    );

    observer.observe(header);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
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
          const headerData = await headerRes.json();
          setHeaderData(headerData);
        }

        if (!portalsRes.ok) throw new Error('Failed to fetch portals');
        
        const portalsData = await portalsRes.json();
        const currentPortal = portalsData.find((p: Portal) => {
          const hrefSlug = p.href.replace(/^\//, '').toLowerCase();
          return hrefSlug === portalSlug;
        });

        if (!currentPortal) {
          setIsLoading(false);
          return;
        }

        setPortal(currentPortal);

        const itemsRes = await fetch(`/api/portals/${currentPortal.id}/items`);
        if (itemsRes.ok) {
          const itemsData = await itemsRes.json();
          setItems(itemsData);
        }
      } catch (error) {
        console.error('Error fetching portal data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortalData();
  }, [portalSlug]);

  const scrollToContent = () => {
    const contentSection = document.getElementById("content-section");
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getIconComponent = (iconName: string) => {
    type IconMap = Record<string, React.ComponentType<{ className?: string }>>;
    const iconMap: IconMap = {
      FileSpreadsheet,
      DollarSign,
      Package,
      BarChart3,
      Megaphone,
      Award,
      ShoppingCart,
      Users,
      BookOpen,
      Archive,
      FileText,
      Laptop,
    };
    return iconMap[iconName] || FileSpreadsheet;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar isScrolled={isScrolled} />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!portal) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar isScrolled={isScrolled} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 mb-4">Portal tidak ditemukan</p>
            <Link href="/" className="text-blue-600 hover:underline">
              Kembali ke halaman utama
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isScrolled={isScrolled} />

      <header
        id="main-header"
        className="relative h-[30vh] flex items-center border-b-4 border-[#D83F3F] overflow-hidden"
      >
        {headerData?.backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/api/${headerData.backgroundImage}')`,
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#333333]/80 via-[#333333]/70 to-[#333333]/60 halftone-pattern" />
        <div className="container mx-auto px-4 relative z-10 w-full">
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-white text-5xl md:text-7xl font-bold tracking-wide drop-shadow-2xl mb-4">
              {portal.name.toUpperCase()}
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-lg">
              {portal.description}
            </p>
          </div>
        </div>
        <button
          onClick={scrollToContent}
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 animate-bounce cursor-pointer hover:scale-110 transition-transform"
          aria-label="Scroll to Content"
        >
          <ChevronDown className="text-white w-8 h-8 drop-shadow-lg" />
        </button>
      </header>

      <section id="content-section" className="bg-gradient-to-b from-gray-50 to-white py-16 flex-1">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-[#111111] text-3xl md:text-4xl font-bold mb-4">
              {portal.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {portal.description}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {items.map((item) => {
              const Icon = getIconComponent(item.icon);
              return (
                <Link
                  key={item.id}
                  href={item.link}
                  className="group bg-[#D83F3F]/90 hover:bg-[#D83F3F] rounded-xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all hover:scale-105 hover:shadow-2xl border border-[#D83F3F]"
                >
                  <div className="bg-white/20 p-4 rounded-full group-hover:bg-white/30 transition-all">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-white text-base md:text-lg font-bold mb-2">
                      {item.name}
                    </h3>
                    <p className="text-white/80 text-xs leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Link>
              );
            })}
            {items.length === 0 && (
              <p className="col-span-full text-center text-gray-500 py-8">
                Belum ada items untuk portal ini
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
