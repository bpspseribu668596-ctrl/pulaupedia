"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  Users,
  TrendingUp,
  Package,
  BarChart3,
  FileText,
  BookOpen,
  Archive,
  Laptop,
  DollarSign,
  Award,
} from "lucide-react";

interface PortalPage {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  backgroundImage: string;
  image: string;
}

interface PortalItem {
  id: number;
  name: string;
  description: string;
  icon: string;
  link: string;
}

export default function PortalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [page, setPage] = useState<PortalPage | null>(null);
  const [items, setItems] = useState<PortalItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);

    const header = document.getElementById("main-header");
    if (!header) return;

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
  }, []);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await fetch(`/api/portal-pages?all=false`);
        if (response.ok) {
          const data = await response.json();
          const foundPage = data.find((p: PortalPage) => p.slug === slug);
          if (foundPage) {
            setPage(foundPage);
            
            const itemsResponse = await fetch(`/api/portal-items?portalPageId=${foundPage.id}`);
            if (itemsResponse.ok) {
              const itemsData = await itemsResponse.json();
              setItems(itemsData);
            }
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } catch (error) {
        console.error('Error fetching portal page:', error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  const scrollToContent = () => {
    const contentSection = document.getElementById("content-section");
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      Users,
      TrendingUp,
      Package,
      BarChart3,
      FileText,
      BookOpen,
      Archive,
      Laptop,
      DollarSign,
      Award,
    };
    return iconMap[iconName] || BookOpen;
  };

  if (error || !page) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar isScrolled={false} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Halaman Tidak Ditemukan</h1>
            <p className="text-gray-400 mb-4">Maaf, halaman yang Anda cari tidak tersedia.</p>
            <Link href="/" className="text-blue-500 hover:underline">
              Kembali ke Beranda
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
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: page.backgroundImage 
              ? `url('/api/${page.backgroundImage}')`
              : "url('/images/Pulau_Yu,_Kepulauan_Seribu,_Provinsi_DKI_Jakarta.jpg')",
          }}
        />
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
              {page.title.toUpperCase()}
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-lg">
              {page.description}
            </p>
          </div>
        </div>
        {items.length > 0 && (
          <button
            onClick={scrollToContent}
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 animate-bounce cursor-pointer hover:scale-110 transition-transform"
            aria-label="Scroll to Content"
          >
            <ChevronDown className="text-white w-8 h-8 drop-shadow-lg" />
          </button>
        )}
      </header>

      <section id="content-section" className="bg-gradient-to-b from-gray-50 to-white py-16 flex-1">
        <div className="container mx-auto px-4">
          {items.length > 0 && (
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-[#111111] text-3xl md:text-4xl font-bold mb-4">
                  {page.title}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Pilih kategori untuk mengakses dokumen dan informasi yang tersimpan
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {items.map((item) => {
                  const Icon = getIconComponent(item.icon);
                  return (
                    <a
                      key={item.id}
                      href={item.link}
                      target={item.link.startsWith('http') ? "_blank" : undefined}
                      rel={item.link.startsWith('http') ? "noopener noreferrer" : undefined}
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
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {!isLoading && page.content && (
            <div className="max-w-4xl mx-auto">
              {page.image && (
                <div className="mb-8">
                  <img
                    src={`/api/${page.image}`}
                    alt={page.title}
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
              )}
              
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
