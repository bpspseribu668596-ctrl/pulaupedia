"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Calendar, Camera, FileText, Users, Award, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DokumentasiKegiatanPage() {
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

  const kegiatanCards = [
    {
      name: "Kegiatan 2024",
      icon: Calendar,
      description: "Dokumentasi kegiatan tahun 2024",
      link: "https://drive.google.com/drive/folders/kegiatan-2024",
    },
    {
      name: "Kegiatan 2025",
      icon: Calendar,
      description: "Dokumentasi kegiatan tahun 2025",
      link: "https://drive.google.com/drive/folders/kegiatan-2025",
    },
    {
      name: "Kegiatan 2026",
      icon: Calendar,
      description: "Dokumentasi kegiatan tahun 2026",
      link: "https://drive.google.com/drive/folders/kegiatan-2026",
    },
    {
      name: "Foto Kegiatan",
      icon: Camera,
      description: "Galeri foto dokumentasi",
      link: "https://drive.google.com/drive/folders/foto-kegiatan",
    },
    {
      name: "Laporan",
      icon: FileText,
      description: "Laporan kegiatan dan evaluasi",
      link: "https://drive.google.com/drive/folders/laporan",
    },
    {
      name: "Rapat",
      icon: Users,
      description: "Dokumentasi rapat dan pertemuan",
      link: "https://drive.google.com/drive/folders/rapat",
    },
    {
      name: "Penghargaan",
      icon: Award,
      description: "Dokumentasi penghargaan",
      link: "https://drive.google.com/drive/folders/penghargaan",
    },
    {
      name: "Pelatihan",
      icon: BookOpen,
      description: "Dokumentasi pelatihan pegawai",
      link: "https://drive.google.com/drive/folders/pelatihan",
    },
  ];

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
            backgroundImage:
              "url('/images/Pulau_Yu,_Kepulauan_Seribu,_Provinsi_DKI_Jakarta.jpg')",
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
              DOKUMENTASI KEGIATAN
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-lg">
              Rekam Jejak Kegiatan Kantor BPS Kepulauan Seribu
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
              Dokumentasi Kegiatan
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pilih kategori untuk mengakses dokumentasi kegiatan yang tersimpan di Google Drive
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {kegiatanCards.map((kegiatan, index) => {
              const Icon = kegiatan.icon;
              return (
                <a
                  key={index}
                  href={kegiatan.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-[#D83F3F]/90 hover:bg-[#D83F3F] rounded-xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all hover:scale-105 hover:shadow-2xl border border-[#D83F3F]"
                >
                  <div className="bg-white/20 p-4 rounded-full group-hover:bg-white/30 transition-all">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-white text-base md:text-lg font-bold mb-2">
                      {kegiatan.name}
                    </h3>
                    <p className="text-white/80 text-xs leading-relaxed">
                      {kegiatan.description}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
