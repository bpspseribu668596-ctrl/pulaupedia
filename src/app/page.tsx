"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
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
      observer.disconnect();
    };
  }, []);

  const mainMenuItems = [
    { name: "Portal Umum", icon: "📚" },
    { name: "Brankas Fungsi", icon: "🗄️" },
    { name: "Dokumentasi Kegiatan", icon: "📋" },
    { name: "SE2026 Archive Hub", icon: "📦" },
    { name: "Aplikasi Daniel", icon: "💻" },
    { name: "Monev Anggaran (Chiba Rossa)", icon: "💰" },
    { name: "SAKIP 2026", icon: "📊" },
    { name: "ZI 2026", icon: "🏆" },
  ];

  const services = [
    "WebMail", "SiMAS", "SILPA", "Siap", "SIAP Dev",
    "Manajemen SDM", "Simiskin", "WBS", "SIK", "SAKIP",
    "ZI", "e-Monev", "SPAK"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="bg-[#0072BC] shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-center gap-4">
              <Image
                src="/logos/logo-bps.png"
                alt="Logo BPS"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="text-white font-semibold text-sm md:text-base">
                Badan Pusat Statistik Kabupaten Kepulauan Seribu
              </span>
            </div>
          </div>
        </div>
      </nav>

      <header id="main-header" className="relative py-26 border-b-4 border-[#D83F3F] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/Pulau_Yu,_Kepulauan_Seribu,_Provinsi_DKI_Jakarta.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-[#333333]/70 halftone-pattern" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-white text-4xl md:text-5xl font-bold text-center tracking-wide drop-shadow-lg">
            PULAU PEDIA
          </h1>
        </div>
      </header>

      <section className="bg-[#D83F3F] py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-white text-3xl font-bold text-center mb-8">
            Portal Pulau Pedia
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {mainMenuItems.map((item, index) => (
              <div
                key={index}
                className="bg-white/10 hover:bg-white/20 rounded-lg p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:scale-105"
              >
                <div className="text-4xl">{item.icon}</div>
                <h3 className="text-white text-center text-sm md:text-base font-semibold">
                  {item.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-[#111111] text-3xl font-bold text-center mb-8">
            BPS Services Web-App
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-6 max-w-4xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-100 hover:bg-gray-200 rounded-lg px-6 py-3 cursor-pointer transition-all hover:scale-105"
              >
                <span className="text-[#111111] font-medium text-sm">
                  {service}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#111111] py-8 mt-auto relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A87932] via-[#D83F3F] to-[#A87932]"></div>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 text-white max-w-5xl mx-auto">
            <div>
              <h3 className="font-bold mb-2 text-[#A87932]">Alamat Kantor</h3>
              <p className="text-sm text-gray-300">
                Jl. Pulau Tidung Besar RT 002/RW 003<br />
                Kelurahan Pulau Tidung<br />
                Kecamatan Kepulauan Seribu Selatan<br />
                Kabupaten Administrasi Kepulauan Seribu<br />
                DKI Jakarta
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-[#A87932]">Kantor Penghubung</h3>
              <p className="text-sm text-gray-300">
                Gedung BPS Provinsi DKI Jakarta<br />
                Jl. Salemba Tengah No. 39<br />
                Jakarta Pusat 10440
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-[#A87932]">Website</h3>
              <p className="text-sm text-gray-300">
                kepulauanseribukab.bps.go.id
              </p>
            </div>
          </div>
          <div className="text-center mt-6 text-gray-400 text-sm">
            <p>© 2026 BPS Kabupaten Kepulauan Seribu</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
