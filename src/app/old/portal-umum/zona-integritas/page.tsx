"use client";

import { useEffect, useState } from "react";
import { ChevronDown, FileText, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortalSidebar from "@/components/PortalSidebar";

export default function ZonaIntegritasPage() {
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

  const documents = [
    {
      title: "A.I. Pengungkit - Pemenuhan",
      link: "https://drive.google.com/drive/folders/pengungkit-pemenuhan",
    },
    {
      title: "A.II. Pengungkit - Reform",
      link: "https://drive.google.com/drive/folders/pengungkit-reform",
    },
    {
      title: "B. Hasil",
      link: "https://drive.google.com/drive/folders/hasil",
    },
  ];

  const handleButtonClick = () => {
    window.open("https://www.google.com/url?q=https%3A%2F%2Fheylink.me%2FZI_P1000_2025%2F&sa=D&sntz=1&usg=AOvVaw0VnKixwDwSDnSLGG1GRqNb", "_blank");
  };

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
              ZONA INTEGRITAS
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-lg">
              Dokumen dan Arsip Zona Integritas
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
                Dokumen Zona Integritas
              </h2>
              <p className="text-gray-600">
                Pilih dokumen untuk mengakses file yang tersimpan di Google Drive
              </p>
            </div>

            <div className="space-y-4">
              {documents.map((doc, index) => (
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

            {/* Tombol baru dengan fungsi navigasi */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handleButtonClick}
                className="bg-[#0072BC] hover:bg-[#005a94] text-white font-semibold py-3 px-8 rounded-lg transition-all hover:shadow-lg transform hover:scale-105 cursor-pointer"
              >
                ZI 2024
              </button>
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