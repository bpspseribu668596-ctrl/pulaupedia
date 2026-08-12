"use client";

import { useEffect, useState } from "react";
import { ChevronDown, FolderOpen, BarChart3, DollarSign, Package, Megaphone, Award, ShoppingCart, Users, FileSpreadsheet } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function PortalUmumPage() {
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

  const scrollToContent = () => {
    const contentSection = document.getElementById("content-section");
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const portalCards = [
    {
      name: "Bigram",
      icon: FileSpreadsheet,
      description: "Bimbingan dan Pengawasan Umum",
      link: "/portal-umum/bigram",
    },
    {
      name: "Keuangan",
      icon: DollarSign,
      description: "Dokumen dan arsip keuangan",
      link: "/portal-umum/keuangan",
    },
    {
      name: "BMN & Persediaan",
      icon: Package,
      description: "Barang Milik Negara dan Persediaan",
      link: "/portal-umum/bmn-persediaan",
    },
    {
      name: "SAKIP",
      icon: BarChart3,
      description: "Sistem Akuntabilitas Kinerja Instansi Pemerintah",
      link: "/portal-umum/sakip",
    },
    {
      name: "HUMAS",
      icon: Megaphone,
      description: "Hubungan Masyarakat dan Komunikasi",
      link: "/portal-umum/humas",
    },
    {
      name: "Zona Integritas",
      icon: Award,
      description: "Dokumen dan arsip Zona Integritas",
      link: "/portal-umum/zona-integritas",
    },
    {
      name: "Pengadaan Barang & Jasa",
      icon: ShoppingCart,
      description: "Dokumen pengadaan barang dan jasa",
      link: "/portal-umum/pengadaan",
    },
    {
      name: "Kepegawaian",
      icon: Users,
      description: "Dokumen dan arsip kepegawaian",
      link: "/portal-umum/kepegawaian",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isScrolled={isScrolled} />

      <header
        id="main-header"
        className="relative py-32 md:py-40 border-b-4 border-[#D83F3F] overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/images/Pulau_Yu,_Kepulauan_Seribu,_Provinsi_DKI_Jakarta.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#333333]/80 via-[#333333]/70 to-[#333333]/60 halftone-pattern" />
        <div className="container mx-auto px-4 relative z-10">
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-white text-5xl md:text-7xl font-bold tracking-wide drop-shadow-2xl mb-4">
              PORTAL UMUM
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-lg">
              Informasi Umum dan Layanan Publik BPS Kepulauan Seribu
            </p>
          </div>
        </div>
        <button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-transform"
          aria-label="Scroll to Content"
        >
          <ChevronDown className="text-white w-8 h-8 drop-shadow-lg" />
        </button>
      </header>

      <section id="content-section" className="bg-gradient-to-b from-gray-50 to-white py-16 flex-1">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-[#111111] text-3xl md:text-4xl font-bold mb-4">
              Portal Umum
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pilih kategori untuk mengakses dokumen dan informasi yang tersimpan di Google Drive
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {portalCards.map((portal, index) => {
              const Icon = portal.icon;
              return (
                <Link
                  key={index}
                  href={portal.link}
                  className="group bg-[#D83F3F]/90 hover:bg-[#D83F3F] rounded-xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all hover:scale-105 hover:shadow-2xl border border-[#D83F3F]"
                >
                  <div className="bg-white/20 p-4 rounded-full group-hover:bg-white/30 transition-all">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-white text-base md:text-lg font-bold mb-2">
                      {portal.name}
                    </h3>
                    <p className="text-white/80 text-xs leading-relaxed">
                      {portal.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-blue-50 border-l-4 border-[#0072BC] rounded-lg p-6">
              <div className="flex items-start gap-3">
                <FolderOpen className="w-6 h-6 text-[#0072BC] mt-1" />
                <div>
                  <h4 className="font-bold text-[#111111] mb-2">Informasi Akses</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Setiap card akan mengarahkan Anda ke folder Google Drive yang berisi dokumen dan informasi sesuai kategori. 
                    Pastikan Anda memiliki akses ke folder tersebut.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
