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
  Mail,
  Database,
  FileSpreadsheet,
  Users,
  FolderOpen,
  ChevronDown,
  TrendingUp,
  MapPin,
  Phone,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(0);

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

  const mainMenuItems = [
    {
      name: "Portal Umum",
      icon: BookOpen,
      description: "Informasi umum dan layanan publik",
    },
    {
      name: "Brankas Fungsi",
      icon: Archive,
      description: "Dokumen dan arsip fungsi",
    },
    {
      name: "Dokumentasi Kegiatan",
      icon: FileText,
      description: "Rekam jejak kegiatan kantor",
    },
    {
      name: "SE2026 Archive Hub",
      icon: Package,
      description: "Arsip surat edaran 2026",
    },
    {
      name: "Aplikasi Daniel",
      icon: Laptop,
      description: "Sistem aplikasi internal",
    },
    {
      name: "Monev Anggaran",
      icon: DollarSign,
      description: "Monitoring evaluasi anggaran",
    },
    {
      name: "SAKIP 2026",
      icon: BarChart3,
      description: "Sistem Akuntabilitas Kinerja",
    },
    {
      name: "ZI 2026",
      icon: Award,
      description: "Zona Integritas",
    },
  ];

  const serviceCategories = {
    "Layanan Digital": [
      { name: "WebMail", icon: Mail },
      { name: "SiMAS", icon: Database },
      { name: "SILPA", icon: FileSpreadsheet },
    ],
    "Sistem Kepegawaian": [
      { name: "Siap", icon: Users },
      { name: "SIAP Dev", icon: Users },
      { name: "Manajemen SDM", icon: Users },
    ],
    "Data & Monitoring": [
      { name: "Simiskin", icon: Database },
      { name: "WBS", icon: BarChart3 },
      { name: "SIK", icon: FolderOpen },
    ],
    "Manajemen Kinerja": [
      { name: "SAKIP", icon: BarChart3 },
      { name: "ZI", icon: Award },
      { name: "e-Monev", icon: TrendingUp },
      { name: "SPAK", icon: FileText },
    ],
  };

  const topEmployees = [
    {
      rank: 1,
      name: "Nama Pegawai 1",
      position: "Jabatan 1",
      photo: "/images/employee-1.jpg",
      achievement: "Penghargaan sebagai Pegawai Terbaik Peringkat 1 atas dedikasi dan kontribusi luar biasa dalam meningkatkan kualitas layanan dan pengelolaan data statistik di BPS Kepulauan Seribu.",
      period: "Periode: Agustus 2026",
      score: 95,
      badge: "Juara 1",
      badgeColor: "bg-gradient-to-br from-[#A87932] to-[#8B6914]",
    },
    {
      rank: 2,
      name: "Nama Pegawai 2",
      position: "Jabatan 2",
      photo: "/images/employee-2.jpg",
      achievement: "Penghargaan sebagai Pegawai Terbaik Peringkat 2 atas dedikasi tinggi dalam inovasi sistem dan pengembangan aplikasi internal yang mendukung operasional kantor.",
      period: "Periode: Agustus 2026",
      score: 92,
      badge: "Juara 2",
      badgeColor: "bg-gradient-to-br from-gray-400 to-gray-500",
    },
    {
      rank: 3,
      name: "Nama Pegawai 3",
      position: "Jabatan 3",
      photo: "/images/employee-3.jpg",
      achievement: "Penghargaan sebagai Pegawai Terbaik Peringkat 3 atas kinerja konsisten dalam dokumentasi kegiatan dan pengelolaan arsip fungsi kantor dengan sangat baik.",
      period: "Periode: Agustus 2026",
      score: 90,
      badge: "Juara 3",
      badgeColor: "bg-gradient-to-br from-[#CD7F32] to-[#B87333]",
    },
  ];

  const nextEmployee = () => {
    setCurrentEmployee((prev) => (prev + 1) % topEmployees.length);
  };

  const prevEmployee = () => {
    setCurrentEmployee(
      (prev) => (prev - 1 + topEmployees.length) % topEmployees.length
    );
  };

  const scrollToEmployees = () => {
    const employeeSection = document.getElementById("pegawai-terbaik");
    if (employeeSection) {
      employeeSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const employee = topEmployees[currentEmployee];

  return (
    <div className="min-h-screen flex flex-col">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="bg-[#111111] shadow-lg backdrop-blur-sm border-b-4 border-[#337ab7]">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-center gap-4">
              <Image
                src="/logos/logo-bps.png"
                alt="Logo BPS"
                width={40}
                height={40}
                className="object-contain"
                style={{ width: 'auto', height: '40px' }}
              />
              <span className="text-white font-semibold text-sm md:text-base">
                Badan Pusat Statistik Kabupaten Kepulauan Seribu
              </span>
            </div>
          </div>
        </div>
      </nav>

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
              PULAU PEDIA
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-lg">
              Portal Informasi dan Layanan Digital BPS Kepulauan Seribu
            </p>
          </div>
        </div>
        <button
          onClick={scrollToEmployees}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-transform"
          aria-label="Scroll to Pegawai Terbaik"
        >
          <ChevronDown className="text-white w-8 h-8 drop-shadow-lg" />
        </button>
      </header>

      <section id="pegawai-terbaik" className="bg-gradient-to-b from-white to-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-[#111111] text-3xl md:text-4xl font-bold mb-4">
              Pegawai Terbaik
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Apresiasi untuk pegawai dengan kinerja dan dedikasi terbaik
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className={`relative h-64 md:h-auto ${employee.badgeColor}`}>
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                      <Image
                        src={employee.photo}
                        alt={employee.name}
                        fill
                        className="object-cover"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2 border border-white/30">
                      <Award className="w-4 h-4" />
                      {employee.badge}
                    </div>
                  </div>
                </div>

                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-[#A87932] text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">
                        {employee.rank}
                      </div>
                      <span className="text-sm text-gray-500">
                        Peringkat {employee.rank}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#111111] mb-2">
                      {employee.name}
                    </h3>
                    <p className="text-[#0072BC] font-semibold text-lg mb-1">
                      {employee.position}
                    </p>
                    <p className="text-gray-500 text-sm">{employee.period}</p>
                  </div>

                  <div className="border-l-4 border-[#D83F3F] pl-4 mb-6">
                    <p className="text-gray-700 leading-relaxed">
                      {employee.achievement}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#0072BC]" />
                      <span>Score: {employee.score}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#A87932]" />
                      <span>Dedikasi Tinggi</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={prevEmployee}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white hover:bg-gray-100 rounded-full p-3 shadow-lg transition-all hover:scale-110 border-2 border-gray-200"
              aria-label="Previous employee"
            >
              <ChevronLeft className="w-6 h-6 text-[#0072BC]" />
            </button>

            <button
              onClick={nextEmployee}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white hover:bg-gray-100 rounded-full p-3 shadow-lg transition-all hover:scale-110 border-2 border-gray-200"
              aria-label="Next employee"
            >
              <ChevronRight className="w-6 h-6 text-[#0072BC]" />
            </button>

            <div className="flex items-center justify-center gap-2 mt-6">
              {topEmployees.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentEmployee(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentEmployee
                      ? "w-8 bg-[#0072BC]"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to employee ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#D83F3F] py-16 relative overflow-hidden">
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
                <div
                  key={index}
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
                </div>
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

          <div className="max-w-6xl mx-auto space-y-8">
            {Object.entries(serviceCategories).map(
              ([category, services], idx) => (
                <div key={idx}>
                  <h3 className="text-xl font-bold text-[#0072BC] mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-[#D83F3F] rounded"></div>
                    {category}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {services.map((service, index) => {
                      const Icon = service.icon;
                      return (
                        <div
                          key={index}
                          className="group bg-white hover:bg-[#0072BC] border-2 border-gray-100 hover:border-[#0072BC] rounded-lg p-4 cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="bg-[#0072BC]/10 group-hover:bg-white/20 p-2 rounded-lg transition-all">
                              <Icon className="w-5 h-5 text-[#0072BC] group-hover:text-white transition-colors" />
                            </div>
                            <span className="text-[#111111] group-hover:text-white font-semibold text-sm transition-colors">
                              {service.name}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <footer className="bg-[#111111] py-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A87932] via-[#D83F3F] to-[#A87932]"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#A87932] rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-center mb-8">
            <Image
              src="/logos/logo-bps.png"
              alt="Logo BPS"
              width={80}
              height={80}
              className="object-contain opacity-90"
              style={{ width: 'auto', height: '80px' }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-white max-w-5xl mx-auto mb-8">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
                <MapPin className="w-5 h-5 text-[#A87932]" />
                <h3 className="font-bold text-[#A87932]">Alamat Kantor</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Jl. Pulau Tidung Besar RT 002/RW 003
                <br />
                Kelurahan Pulau Tidung
                <br />
                Kecamatan Kepulauan Seribu Selatan
                <br />
                Kabupaten Administrasi Kepulauan Seribu
                <br />
                DKI Jakarta
              </p>
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
                <Phone className="w-5 h-5 text-[#A87932]" />
                <h3 className="font-bold text-[#A87932]">Kantor Penghubung</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Gedung BPS Provinsi DKI Jakarta
                <br />
                Jl. Salemba Tengah No. 39
                <br />
                Jakarta Pusat 10440
              </p>
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
                <Globe className="w-5 h-5 text-[#A87932]" />
                <h3 className="font-bold text-[#A87932]">Website</h3>
              </div>
              <a
                href="https://kepulauanseribukab.bps.go.id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-300 hover:text-[#A87932] transition-colors"
              >
                kepulauanseribukab.bps.go.id
              </a>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6">
            <p className="text-center text-gray-400 text-sm">
              © 2026 BPS Kabupaten Kepulauan Seribu. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
