"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Home, Folder } from "lucide-react";

interface NavbarProps {
  isScrolled: boolean;
}

interface NavbarConfig {
  id?: number;
  logo: string;
  logoAlt: string;
  brandName: string;
}

export default function Navbar({ isScrolled }: NavbarProps) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [navbarConfig, setNavbarConfig] = useState<NavbarConfig | null>(null);

  useEffect(() => {
    const fetchNavbarConfig = async () => {
      try {
        const response = await fetch('/api/navbar');
        if (response.ok) {
          const data = await response.json();
          setNavbarConfig(data);
        }
      } catch (error) {
        console.error('Error fetching navbar config:', error);
      }
    };

    fetchNavbarConfig();
  }, []);

  const portalMenuItems = [
    { name: "Portal Umum", href: "/portal-umum" },
    { name: "Brankas Fungsi", href: "/brankas-fungsi" },
    { name: "Dokumentasi Kegiatan", href: "/dokumentasi-kegiatan" },
    { name: "SE2026 Archive Hub", href: "/se2026-archive-hub" },
    { name: "Aplikasi Daniel", href: "/aplikasi-daniel" },
    { name: "Monev Anggaran", href: "/monev-anggaran" },
    { name: "SAKIP 2026", href: "/sakip-2026" },
    { name: "ZI 2026", href: "/zi-2026" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
      }`}
    >
      <div className="bg-[#111111] shadow-lg backdrop-blur-sm border-b-4 border-[#337ab7]">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-4">
              {navbarConfig?.logo ? (
                <Image
                  src={`/api/${navbarConfig.logo}`}
                  alt={navbarConfig.logoAlt ?? 'Logo'}
                  width={40}
                  height={40}
                  className="object-contain"
                  style={{ width: "auto", height: "40px" }}
                />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center rounded bg-white/10">
                  <span className="text-white/50 text-xs">Logo</span>
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-white font-semibold text-xs md:text-sm uppercase leading-tight">
                  BADAN PUSAT STATISTIK
                </span>
                <span className="text-white font-semibold text-xs md:text-sm uppercase leading-tight">
                  {navbarConfig?.brandName ?? 'PULAU PEDIA'}
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="flex items-center gap-2 text-white hover:text-[#337ab7] transition-colors font-semibold"
              >
                <Home className="w-4 h-4" />
                <span>Beranda</span>
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown(true)}
                onMouseLeave={() => setOpenDropdown(false)}
              >
                <button className="flex items-center gap-2 text-white hover:text-[#337ab7] transition-colors font-semibold">
                  <Folder className="w-4 h-4" />
                  <span>Portal</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown ? "rotate-180" : ""}`} />
                </button>

                {openDropdown && (
                  <div className="absolute top-full right-0 pt-2 z-50">
                    <div className="w-64 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
                      {portalMenuItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="block px-4 py-3 text-[#111111] hover:bg-[#337ab7] hover:text-white transition-colors duration-200"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
