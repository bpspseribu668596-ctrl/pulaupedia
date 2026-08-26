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

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await fetch('/api/header');
        if (response.ok) {
          const data = await response.json();
          setHeaderData(data);
        } else {
          setHeaderError(ERROR_MESSAGES.HEADER_UNAVAILABLE);
        }
      } catch (error) {
        console.error('Error fetching header:', error);
        setHeaderError(ERROR_MESSAGES.DB_CONNECTION);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services?all=true');
        if (response.ok) {
          const data = await response.json();
          const services = data.filter((s: any) => s.type === 'service');
          setServiceCategories(services);
        } else {
          setServicesError(ERROR_MESSAGES.SERVICES_UNAVAILABLE);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        setServicesError(ERROR_MESSAGES.DB_CONNECTION);
      }
    };

    const fetchMainPortal = async () => {
      try {
        const response = await fetch('/api/portals');
        if (response.ok) {
          const data = await response.json();
          setMainMenuItems(data);
        } else {
          setPortalsError(ERROR_MESSAGES.PORTALS_UNAVAILABLE);
        }
      } catch (error) {
        console.error('Error fetching main portal:', error);
        setPortalsError(ERROR_MESSAGES.DB_CONNECTION);
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isScrolled={isScrolled || !!headerError} />

      <header
        id="main-header"
        className="relative h-[30vh] flex items-center border-b-4 border-[#D83F3F] overflow-hidden"
      >
        {headerError ? (
          <div className="absolute inset-0 bg-red-100 flex items-center justify-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700 text-center max-w-md">
              <p className="font-semibold text-lg">{headerError}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="absolute inset-0 bg-[#333333]" />
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
                  {headerData?.title ?? 'Judul tidak tersedia'}
                </h1>
                <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-lg">
                  {headerData?.subtitle ?? 'Subjudul tidak tersedia'}
                </p>
              </div>
            </div>
          </>
        )}
        <button
          onClick={() => {
            const portalSection = document.getElementById("portal-pulau-pedia");
            if (portalSection) {
              portalSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 animate-bounce cursor-pointer hover:scale-110 transition-transform"
          aria-label="Scroll ke Portal Pulau Pedia"
        >
          <ChevronDown className="text-white w-8 h-8 drop-shadow-lg" />
        </button>
      </header>

      <AnnouncementModalComponent />

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

            {portalsError && <ErrorMessage message={portalsError} />}

            {!portalsError && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {mainMenuItems.length > 0 ? (
                  mainMenuItems.map((item, index) => {
                 const iconMap: { [key: string]: any } = {
                   BookOpen,
                   Archive,
                   FileText,
                   Package,
                   Laptop,
                   DollarSign,
                   BarChart3,
                   Award,
                 };
                 const Icon = iconMap[item.icon] || BookOpen;
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
                })
                ) : (
                  <div className="col-span-2 md:col-span-4 text-center py-12">
                    <p className="text-white/80 text-lg">Portal tidak tersedia</p>
                  </div>
                )}
              </div>
            )}
        </div>
      </section>

        {/* bps services web-app */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-[#111111] text-3xl md:text-4xl font-bold mb-4">
                BPS Services Web-App
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Kumpulan layanan dan aplikasi digital untuk mendukung operasional BPS Kepulauan Seribu
              </p>
            </div>

            {servicesError && <ErrorMessage message={servicesError} />}

            {!servicesError && (
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
                           {service.logo ? (
                             <Image
                               src={`/api/${service.logo}`}
                               alt={service.name}
                               fill
                               sizes="96px"
                               className="object-contain"
                               style={{ objectFit: "contain" }}
                             />
                           ) : (
                             <div className="w-24 h-24 flex items-center justify-center rounded-lg bg-gray-100 border border-gray-200">
                               <span className="text-gray-400 text-xs text-center leading-tight">Gambar<br/>tidak tersedia</span>
                             </div>
                           )}
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
        if (response.ok) {
          const data = await response.json();
          setAnnouncements(data);
        }
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  useEffect(() => {
    const modalTimer = setTimeout(() => {
      if (announcements.length > 0) {
        setShowModal(true);
      }
    }, 3000);
    return () => clearTimeout(modalTimer);
  }, [announcements]);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? announcements.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === announcements.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
      if (e.key === "ArrowLeft" && showModal && announcements.length > 0) {
        goToPrevious();
      }
      if (e.key === "ArrowRight" && showModal && announcements.length > 0) {
        goToNext();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showModal, announcements.length]);

  if (!showModal || announcements.length === 0) return null;

  const currentAnnouncement = announcements[currentIndex];
  const totalPages = announcements.length;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={() => setShowModal(false)}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md aspect-[3/4] animate-modal-pop flex flex-col">
        {/* Header */}
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

        {/* Content dengan posisi relatif untuk arrow di dalam card */}
        <div className="flex-1 flex flex-col items-center p-6 text-center bg-gradient-to-b from-gray-50 to-white overflow-y-auto relative">
          
          {/* Image Container dengan posisi relatif untuk arrow overlay */}
          <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden mb-4">
            {currentAnnouncement.image ? (
              <img
                src={`/api/${currentAnnouncement.image}`}
                alt={currentAnnouncement.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <span className="text-gray-400">Tidak ada gambar</span>
              </div>
            )}

            {/* Left Arrow - di dalam card, di samping kiri gambar */}
            {totalPages > 1 && (
              <button
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all hover:scale-110 backdrop-blur-sm"
                aria-label="Halaman sebelumnya"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
            )}

            {/* Right Arrow - di dalam card, di samping kanan gambar */}
            {totalPages > 1 && (
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all hover:scale-110 backdrop-blur-sm"
                aria-label="Halaman berikutnya"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            )}
          </div>

          {/* Konten Teks */}
          <div className="flex-1 flex flex-col justify-center w-full">
            <h3 className="text-base font-bold text-gray-800 mb-2 line-clamp-2">
              {currentAnnouncement.title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed line-clamp-4">
              {currentAnnouncement.content}
            </p>
          </div>

          {/* Dots indicator - di bawah konten */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Pengumuman ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? 'w-5 h-2 bg-sky-600'
                      : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
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