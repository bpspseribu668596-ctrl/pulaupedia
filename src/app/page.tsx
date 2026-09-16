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

      <AnnouncementModalComponent />

      {/* Portal Section */}
      <section id="portal-pulau-pedia" className="bg-[#D83F3F] py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4">
            Portal Pulau Pedia
          </h2>
          <p className="text-white/90 text-sm sm:text-base text-center mb-8 sm:mb-12 max-w-xl mx-auto px-2">
            Akses cepat ke berbagai portal dan layanan informasi
          </p>

          {portalsError && <ErrorMessage message={portalsError} />}

          {portalsLoading && !portalsError && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto animate-pulse">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white/10 rounded-xl p-4 sm:p-6 h-32 sm:h-40 flex flex-col items-center justify-center gap-2 sm:gap-3">
                  <div className="bg-white/20 rounded-full w-12 sm:w-16 h-12 sm:h-16" />
                  <div className="bg-white/20 rounded h-3 sm:h-4 w-20 sm:w-24" />
                  <div className="bg-white/10 rounded h-2 sm:h-3 w-16 sm:w-20" />
                </div>
              ))}
            </div>
          )}

          {!portalsLoading && !portalsError && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {mainMenuItems.length > 0 ? (
                mainMenuItems.map((item, index) => {
                  const Icon = iconMap[item.icon] || BookOpen;
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center gap-3 sm:gap-4 transition-all hover:scale-105 hover:shadow-2xl border border-white/20"
                    >
                      <div className="bg-white/20 p-3 sm:p-4 rounded-full group-hover:bg-white/30 transition-all">
                        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <div className="text-center min-w-0 w-full">
                        <h3 className="text-white text-sm sm:text-base md:text-lg font-bold mb-1 sm:mb-2 leading-tight break-words">
                          {item.name}
                        </h3>
                        <p className="text-white/80 text-xs leading-relaxed hidden sm:block">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="col-span-2 sm:col-span-3 md:col-span-4 text-center py-12">
                  <p className="text-white/80 text-base sm:text-lg">Portal tidak tersedia</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* BPS Services Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-[#111111] text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              BPS Services Web-App
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto px-2">
              Kumpulan layanan dan aplikasi digital untuk mendukung operasional BPS Kepulauan Seribu
            </p>
          </div>

          {servicesError && <ErrorMessage message={servicesError} />}

          {servicesLoading && !servicesError && (
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 animate-pulse">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="bg-white border-2 border-gray-100 rounded-xl p-3 sm:p-4 md:p-6 flex flex-col items-center justify-between min-h-[200px] sm:min-h-[240px] md:min-h-[280px]">
                    <div className="bg-gray-200 rounded h-4 w-24 sm:w-28 mb-4" />
                    <div className="bg-gray-200 rounded-full w-16 sm:w-24 h-16 sm:h-24 mb-4" />
                    <div className="w-px h-10 sm:h-12 bg-gray-200 mb-4" />
                    <div className="bg-gray-200 rounded-lg h-8 sm:h-9 w-full" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {!servicesLoading && !servicesError && (
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                {serviceCategories.map((service, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-gray-200 rounded-xl p-3 sm:p-4 md:p-6 flex flex-col items-center justify-between min-h-[200px] sm:min-h-[240px] md:min-h-[280px]"
                  >
                    <div className="text-center mb-2 sm:mb-3 md:mb-4 w-full min-w-0">
                      <h3 className="text-xs sm:text-sm font-bold text-[#111111] leading-tight break-words line-clamp-2">
                        {service.title}
                      </h3>
                    </div>

                    <div className="flex-1 flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
                      <a href={service.link} className="block w-14 sm:w-16 md:w-24 h-14 sm:h-16 md:h-24 cursor-pointer">
                        {service.logo?.startsWith('http') ? (
                          <img
                            src={service.logo}
                            alt={service.name}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center rounded-lg bg-gray-100 border border-gray-200">
                            <span className="text-gray-400 text-[10px] sm:text-xs text-center leading-tight px-1">Gambar<br />tidak tersedia</span>
                          </div>
                        )}
                      </a>
                    </div>

                    <div className="w-px h-6 sm:h-8 md:h-12 bg-gray-300 mb-2 sm:mb-3 md:mb-4" />

                    <div className="w-full">
                      <a
                        href={service.link}
                        className="block bg-white border-2 border-[#0072BC] hover:bg-[#0072BC] rounded-lg py-1.5 sm:py-2 px-2 sm:px-3 md:px-4 text-center transition-all group"
                      >
                        <span className="text-[#0072BC] group-hover:text-white font-bold text-[10px] sm:text-xs md:text-sm uppercase transition-colors">
                          {service.name}
                        </span>
                      </a>
                    </div>
                  </div>
                ))}
                {serviceCategories.length === 0 && (
                  <div className="col-span-full text-center py-12 text-gray-500">
                    Tidak ada layanan tersedia
                  </div>
                )}
              </div>
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
