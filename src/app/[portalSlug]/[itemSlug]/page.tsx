"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ArrowLeft, FileText, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortalSidebar from "@/components/PortalSidebar";
import Link from "next/link";
import { useParams } from "next/navigation";

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
  documents?: Array<{
    title: string;
    link: string;
  }>;
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
  const [currentItem, setCurrentItem] = useState<PortalItem | null>(null);
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
    const fetchItemData = async () => {
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
        const matchedPortal = portalsData.find((p: Portal) => {
          const hrefSlug = p.href.replace(/^\//, '').toLowerCase();
          return hrefSlug === portalSlug;
        });

        if (!matchedPortal) {
          setIsLoading(false);
          return;
        }

        setPortal(matchedPortal);

        const itemsRes = await fetch(`/api/portals/${matchedPortal.id}/items`);
        if (!itemsRes.ok) throw new Error('Failed to fetch items');
        
        const itemsData = await itemsRes.json();
        
        const matchedItem = itemsData.find((item: PortalItem) => {
          const itemLinkSlug = item.link.split('/').pop()?.toLowerCase();
          return itemLinkSlug === itemSlug;
        });

        if (matchedItem) {
          setCurrentItem(matchedItem);
        }
      } catch (error) {
        console.error('Error fetching item data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItemData();
  }, [portalSlug, itemSlug]);

  const scrollToContent = () => {
    const contentSection = document.getElementById("content-section");
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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

  if (!portal || !currentItem) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar isScrolled={isScrolled} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 mb-4">Item tidak ditemukan</p>
            <Link href="/" className="text-blue-600 hover:underline">
              Kembali ke halaman utama
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const portalHref = `/${portalSlug}`;

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
              {currentItem.name.toUpperCase()}
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-lg">
              {currentItem.description}
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
          <div className="flex flex-col md:flex-row gap-8">
            <PortalSidebar />
            <div className="flex-1 min-w-0">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-[#111111] text-3xl md:text-4xl font-bold mb-4">
                    Dokumen {currentItem.name}
                  </h2>
                  <p className="text-gray-600">
                    Pilih dokumen untuk mengakses file yang tersimpan di Google Drive
                  </p>
                </div>

                {currentItem.documents && currentItem.documents.length > 0 ? (
                  <div className="space-y-4">
                    {currentItem.documents.map((doc, index) => (
                      <a
                        key={index}
                        href={doc.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between bg-white border-2 border-gray-200 hover:border-[#0072BC] rounded-lg p-6 transition-all hover:shadow-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="bg-[#0072BC]/10 p-3 rounded-lg group-hover:bg-[#0072BC]/20 transition-all">
                            <FileText className="w-6 h-6 text-[#0072BC]" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#111111] group-hover:text-[#0072BC] transition-colors">
                            {doc.title}
                          </h3>
                        </div>
                        <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-[#0072BC] transition-colors" />
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Belum ada dokumen untuk item ini</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
