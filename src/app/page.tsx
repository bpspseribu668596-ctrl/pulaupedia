"use client";

import { useEffect, useState } from "react";
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
import { ErrorMessage } from "@/components/ErrorMessage";
import { ERROR_MESSAGES } from "@/lib/error-messages";
import Link from "next/link";

interface HeaderData {
  id?: number;
  title: string;
  subtitle: string;
  backgroundImage: string;
}

interface MainPortal {
  id: number;
  name: string;
  description: string;
  icon: string;
  iconImage?: string | null;
  href: string;
}

export default function Home() {
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [serviceCategories, setServiceCategories] = useState<any[]>([]);
  const [mainMenuItems, setMainMenuItems] = useState<MainPortal[]>([]);

  const [headerError, setHeaderError] = useState<string | null>(null);
  const [servicesError, setServicesError] = useState<string | null>(null);
  const [portalsError, setPortalsError] = useState<string | null>(null);

  const [headerLoading, setHeaderLoading] = useState(true);
  const [portalsLoading, setPortalsLoading] = useState(true);
  const [servicesLoading, setServicesLoading] = useState(true);

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await fetch('/api/header');
        if (response.ok) {
          setHeaderData(await response.json());
        } else {
          setHeaderError(ERROR_MESSAGES.HEADER_UNAVAILABLE);
        }
      } catch {
        setHeaderError(ERROR_MESSAGES.DB_CONNECTION);
      } finally {
        setHeaderLoading(false);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services?all=true');
        if (response.ok) {
          const data = await response.json();
          setServiceCategories(data.filter((s: any) => s.type === 'service'));
        } else {
          setServicesError(ERROR_MESSAGES.SERVICES_UNAVAILABLE);
        }
      } catch {
        setServicesError(ERROR_MESSAGES.DB_CONNECTION);
      } finally {
        setServicesLoading(false);
      }
    };

    const fetchMainPortal = async () => {
      try {
        const response = await fetch('/api/portals');
        if (response.ok) {
          setMainMenuItems(await response.json());
        } else {
          setPortalsError(ERROR_MESSAGES.PORTALS_UNAVAILABLE);
        }
      } catch {
        setPortalsError(ERROR_MESSAGES.DB_CONNECTION);
      } finally {
        setPortalsLoading(false);
      }
    };

    fetchHeaderData();
    fetchServices();
    fetchMainPortal();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    const header = document.getElementById("main-header");
    if (!header) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsScrolled(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-1px 0px 0px 0px" }
    );
    observer.observe(header);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, []);

  const iconMap: { [key: string]: any } = {
    BookOpen, Archive, FileText, Package, Laptop, DollarSign, BarChart3, Award,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isScrolled={isScrolled || !!headerError} />

      {/* Hero Header */}
      <header
        id="main-header"
        className="relative h-[40vh] min-h-[240px] flex items-center border-b-4 border-[#D83F3F] overflow-hidden"
      >
        {headerError ? (
          <div className="absolute inset-0 bg-red-100 flex items-center justify-center px-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 text-red-700 text-center max-w-md w-full">
              <p className="font-semibold text-base sm:text-lg">{headerError}</p>
            </div>
          </div>
        ) : headerLoading ? (
          <div className="absolute inset-0 bg-[#333333] flex items-center justify-center">
            <div className="text-center w-full px-4 pt-16 pb-10 animate-pulse">
              <div className="h-8 sm:h-12 md:h-16 bg-white/20 rounded-lg max-w-xs sm:max-w-lg mx-auto mb-4" />
              <div className="h-4 sm:h-5 bg-white/10 rounded max-w-[200px] sm:max-w-sm mx-auto mb-2" />
              <div className="h-4 sm:h-5 bg-white/10 rounded max-w-[160px] sm:max-w-xs mx-auto" />
            </div>
          </div>
        ) : (
          <>
            <div className="absolute inset-0 bg-[#333333]" />
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
                  {headerData?.title ?? 'Judul tidak tersedia'}
                </h1>
                <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-xl md:max-w-2xl mx-auto drop-shadow-lg px-2">
                  {headerData?.subtitle ?? 'Subjudul tidak tersedia'}
                </p>
              </div>
            </div>
          </>
        )}
        <button
          onClick={() => {
            document.getElementById("portal-pulau-pedia")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer hover:scale-110 transition-transform"
          aria-label="Scroll ke Portal Pulau Pedia"
        >
          <ChevronDown className="text-white w-7 h-7 sm:w-8 sm:h-8 drop-shadow-lg" />
        </button>
      </header>

      {/* ── Stats Bar ───────────────────────────────────────────── */}
      {!headerError && (
        <div id="stats-bar" className="bg-white border-gray-100 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-3 divide-x divide-gray-100">
              {headerLoading ? (
                // Skeleton
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center justify-center py-4 sm:py-5 px-2 gap-1.5 animate-pulse">
                    <div className="h-6 sm:h-7 w-10 bg-gray-200 rounded-md" />
                    <div className="h-3 w-16 bg-gray-100 rounded" />
                  </div>
                ))
              ) : (
                [
                  { value: mainMenuItems.length || "—", label: "Portal Aktif" },
                  { value: serviceCategories.length || "—", label: "Layanan Digital" },
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
      )}

      <AnnouncementModalComponent />

      {/* ── Wave Divider ────────────────────────────────────────── */}
      <div className="bg-white overflow-hidden leading-none">
        <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" className="block w-full" preserveAspectRatio="none" style={{ height: "48px" }}>
          <path d="M0,0 C360,48 1080,48 1440,0 L1440,48 L0,48 Z" fill="#D83F3F" />
        </svg>
      </div>

      {/* ── Portal Section ──────────────────────────────────────── */}
      <section id="portal-pulau-pedia" className="bg-[#D83F3F] py-10 sm:py-14 relative overflow-hidden">
        {/* Subtle texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              Portal Pulau Pedia
            </h2>
            <p className="text-white/70 text-sm sm:text-base max-w-md mx-auto">
              Akses cepat ke berbagai portal dan layanan informasi
            </p>
          </div>

          {portalsError && <ErrorMessage message={portalsError} />}

          {/* Skeleton */}
          {portalsLoading && !portalsError && (
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

          {/* Portal cards — putih solid */}
          {!portalsLoading && !portalsError && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
              {mainMenuItems.length > 0 ? (
                mainMenuItems.map((item, index) => {
                  const Icon = iconMap[item.icon] || BookOpen;
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      className="group bg-white hover:bg-gray-50 rounded-2xl p-4 sm:p-5 flex flex-col items-center gap-3 transition-all duration-200 hover:shadow-xl hover:-translate-y-1 border border-white/80"
                    >
                      {/* Icon container — background merah muda */}
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                        style={{ background: "rgba(216,63,63,0.1)" }}
                      >
                        {item.iconImage ? (
                          <img src={item.iconImage} alt={item.name} className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
                        ) : (
                          <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#D83F3F]" />
                        )}
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
                  <p className="text-white/70">Portal tidak tersedia</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Wave Divider (bawah portal) ─────────────────────────── */}
      <div className="overflow-hidden leading-none" style={{ background: "rgb(249,250,251)" }}>
        <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" className="block w-full" preserveAspectRatio="none" style={{ height: "48px" }}>
          <path d="M0,48 C360,0 1080,0 1440,48 L1440,0 L0,0 Z" fill="#D83F3F" />
        </svg>
      </div>

      {/* ── BPS Services Section ────────────────────────────────── */}
      <section className="bg-gray-50 py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-[#111111] text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              BPS Services Web-App
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto">
              Kumpulan layanan dan aplikasi digital BPS Kepulauan Seribu
            </p>
          </div>

          {servicesError && <ErrorMessage message={servicesError} />}

          {/* Skeleton */}
          {servicesLoading && !servicesError && (
            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 animate-pulse">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-gray-100">
                  <div className="bg-gray-200 rounded-xl w-14 h-14 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="bg-gray-200 rounded h-3.5 w-3/4" />
                    <div className="bg-gray-100 rounded h-3 w-1/2" />
                  </div>
                  <div className="bg-gray-200 rounded-lg h-8 w-20 shrink-0" />
                </div>
              ))}
            </div>
          )}

          {/* Service cards — horizontal compact */}
          {!servicesLoading && !servicesError && (
            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {serviceCategories.map((service, index) => (
                <a
                  key={index}
                  href={service.link}
                  target={service.link?.startsWith('http') ? '_blank' : '_self'}
                  rel={service.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group bg-white hover:bg-gray-50 rounded-2xl p-4 flex items-center gap-4 border border-gray-100 hover:border-[#0072BC]/30 hover:shadow-md transition-all duration-200"
                >
                  {/* Logo */}
                  <div className="w-12 h-12 shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
                    {service.logo?.startsWith('http') ? (
                      <img src={service.logo} alt={service.name} className="w-full h-full object-contain p-1" />
                    ) : (
                      <span className="text-gray-300 text-[10px] text-center leading-tight px-1">No Logo</span>
                    )}
                  </div>

                  {/* Teks */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#111111] leading-tight line-clamp-2">{service.title}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 font-medium uppercase tracking-wide">{service.name}</p>
                  </div>

                  {/* CTA */}
                  <div className="shrink-0">
                    <span className="inline-flex items-center text-[10px] font-bold text-[#0072BC] group-hover:text-white bg-transparent group-hover:bg-[#0072BC] border border-[#0072BC] rounded-lg px-2.5 py-1.5 transition-all duration-200 whitespace-nowrap">
                      Buka
                    </span>
                  </div>
                </a>
              ))}
              {serviceCategories.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-400">
                  Tidak ada layanan tersedia
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function AnnouncementModalComponent() {
  const [showModal, setShowModal] = useState(false);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('/api/announcements');
        if (response.ok) setAnnouncements(await response.json());
      } catch {
        console.error('Error fetching announcements');
      }
    };
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (announcements.length > 0) setShowModal(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [announcements]);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showModal]);

  const goToPrevious = () =>
    setCurrentIndex((p) => (p === 0 ? announcements.length - 1 : p - 1));
  const goToNext = () =>
    setCurrentIndex((p) => (p === announcements.length - 1 ? 0 : p + 1));

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
      if (e.key === "ArrowLeft" && showModal) goToPrevious();
      if (e.key === "ArrowRight" && showModal) goToNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showModal, announcements.length]);

  if (!showModal || announcements.length === 0) return null;

  const currentAnnouncement = announcements[currentIndex];
  const totalPages = announcements.length;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={() => setShowModal(false)}
      />

      {/* Modal — responsive width, max 90vw on small screens */}
      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-[90vw] sm:max-w-sm md:max-w-md animate-modal-pop flex flex-col"
        style={{ maxHeight: '90dvh' }}
      >
        {/* Modal Header */}
        <div className="bg-[#D83F3F] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-1.5 sm:p-2 rounded-full">
              <Megaphone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <h2 className="text-white font-bold text-base sm:text-lg uppercase tracking-wide">
              Pengumuman
            </h2>
          </div>
          <button
            onClick={() => setShowModal(false)}
            className="bg-white/20 hover:bg-white/30 text-white rounded-full p-1 sm:p-1.5 transition-all"
            aria-label="Tutup pengumuman"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 flex flex-col items-center p-4 sm:p-6 text-center bg-gradient-to-b from-gray-50 to-white overflow-y-auto">
          {/* Image with arrows */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[4/5] rounded-lg overflow-hidden mb-3 sm:mb-4">
            {currentAnnouncement.image?.startsWith('http') ? (
              <img
                src={currentAnnouncement.image}
                alt={currentAnnouncement.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <span className="text-gray-400 text-sm">Tidak ada gambar</span>
              </div>
            )}

            {totalPages > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all backdrop-blur-sm"
                  aria-label="Sebelumnya"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all backdrop-blur-sm"
                  aria-label="Berikutnya"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Teks */}
          <div className="flex-1 flex flex-col justify-center w-full">
            <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-1 sm:mb-2 line-clamp-2">
              {currentAnnouncement.title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 sm:line-clamp-4">
              {currentAnnouncement.content}
            </p>
          </div>

          {/* Dots */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Pengumuman ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'w-5 h-2 bg-sky-600' : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
