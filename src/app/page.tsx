"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  BookOpen,
  Archive,
  FileText,
  Package,
  Laptop,
  DollarSign,
  BarChart3,
  Award,
  ChevronDown,
  Megaphone,
  X,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
    const modalTimer = setTimeout(() => setShowModal(true), 3000);
    return () => clearTimeout(modalTimer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const mainMenuItems = [
    {
      name: "Portal Umum",
      icon: BookOpen,
      description: "Informasi umum dan layanan publik",
      href: "/portal-umum",
    },
    {
      name: "Brankas Fungsi",
      icon: Archive,
      description: "Dokumen dan arsip fungsi",
      href: "/brankas-fungsi",
    },
    {
      name: "Dokumentasi Kegiatan",
      icon: FileText,
      description: "Rekam jejak kegiatan kantor",
      href: "/dokumentasi-kegiatan",
    },
    {
      name: "SE2026 Archive Hub",
      icon: Package,
      description: "Arsip surat edaran 2026",
      href: "/se2026-archive-hub",
    },
    {
      name: "Aplikasi Daniel",
      icon: Laptop,
      description: "Sistem aplikasi internal",
      href: "/aplikasi-daniel",
    },
    {
      name: "Monev Anggaran",
      icon: DollarSign,
      description: "Monitoring evaluasi anggaran",
      href: "/monev-anggaran",
    },
    {
      name: "SAKIP 2026",
      icon: BarChart3,
      description: "Sistem Akuntabilitas Kinerja",
      href: "/sakip-2026",
    },
    {
      name: "ZI 2026",
      icon: Award,
      description: "Zona Integritas",
      href: "/zi-2026",
    },
  ];

  const serviceCategories = [
    { title: "Zona Integritas BPS", name: "ZI APP", logo: "/logos/zi.png", link: "https://penilaianzi.web.bps.go.id/penilaianzi/penilaian" },
    { title: "Sistem Informasi Layanan Statistik", name: "SILASTIK", logo: "/logos/silastik.png", link: "https://silastik.bps.go.id/v3/index.php/site/login/" },
    { title: "Sistem Informasi Kinerja Organisasi", name: "SINERGI", logo: "/logos/sinergi.png", link: "https://sinergi.web.bps.go.id/" },
    { title: "Rekomendasi Kegiatan Statistik Online", name: "ROMANTIK", logo: "/logos/romantik.png", link: "https://romantik.web.bps.go.id/" },
    { title: "General Online Job Assistant for Great Service", name: "GOJAGS", logo: "/logos/gojags.png", link: "https://gojags.web.bps.go.id/" },
    { title: "Pelayanan Statistik Terpadu", name: "PST", logo: "/logos/pst.png", link: "https://pst.bps.go.id/" },
    { title: "Pejabat Pengelola Informasi dan Dokumentasi", name: "PPID", logo: "/logos/ppid.png", link: "https://ppid.bps.go.id/?mfd=3101" },
    { title: "Learning Management System", name: "LMS", logo: "/logos/lms.png", link: "https://lms.bps.go.id/" },
    { title: "Perpustakaan BPS", name: "PERPUSTAKAAN", logo: "/logos/perpus.png", link: "https://perpustakaan.bps.go.id/apps/" },
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
              PULAU PEDIA
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-lg">
              Portal Informasi dan Layanan Digital BPS Kepulauan Seribu
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            const portalSection = document.getElementById("portal-pulau-pedia");
            if (portalSection) {
              portalSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-transform"
          aria-label="Scroll ke Portal Pulau Pedia"
        >
          <ChevronDown className="text-white w-8 h-8 drop-shadow-lg" />
        </button>
      </header>

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md aspect-[3/4] animate-modal-pop flex flex-col">
            <div className="bg-[#D83F3F] px-6 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-2 rounded-full">
                  <Megaphone className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-white font-bold text-lg uppercase tracking-wide">
                  Pengumuman
                </h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="bg-white/20 hover:bg-white/30 text-white rounded-full p-1.5 transition-all"
                aria-label="Tutup pengumuman"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-gray-50 to-white">
              <div className="bg-gray-100 rounded-full p-6 mb-4">
                <Megaphone className="w-10 h-10 text-gray-300" />
              </div>
              <p className="text-gray-400 font-medium">
                Belum ada pengumuman
              </p>
            </div>
          </div>
        </div>
      )}

      <section id="portal-pulau-pedia" className="bg-[#D83F3F] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-white text-3xl md:text-4xl font-bold text-center mb-4">
            Portal Pulau Pedia
          </h2>
          <p className="text-white/90 text-center mb-12 max-w-2xl mx-auto">
            Akses cepat ke berbagai portal dan layanan informasi
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {mainMenuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  href={item.href}
                  className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all hover:scale-105 hover:shadow-2xl border border-white/20"
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
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-[#111111] text-3xl md:text-4xl font-bold mb-4">
              BPS Services Web-App
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kumpulan layanan dan aplikasi digital untuk mendukung operasional
              BPS Kepulauan Seribu
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {serviceCategories.map((service, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white border-2 border-gray-200 rounded-xl p-6 flex flex-col items-center justify-between min-h-[280px]"
                  >
                    <div className="text-center mb-4">
                      <h3 className="text-sm font-bold text-[#111111] leading-tight">
                        {service.title}
                      </h3>
                    </div>

                    <div className="flex-1 flex items-center justify-center mb-4">
                      <a href={service.link} className="relative w-24 h-24 cursor-pointer">
                        <Image
                          src={service.logo}
                          alt={service.name}
                          fill
                          sizes="96px"
                          className="object-contain"
                          style={{ objectFit: "contain" }}
                        />
                      </a>
                    </div>

                    <div className="w-px h-12 bg-gray-300 mb-4"></div>

                    <div className="w-full">
                      <a
                        href={service.link}
                        className="block bg-white border-2 border-[#0072BC] hover:bg-[#0072BC] rounded-lg py-2 px-4 text-center transition-all group"
                      >
                        <span className="text-[#0072BC] group-hover:text-white font-bold text-sm uppercase transition-colors">
                          {service.name}
                        </span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
