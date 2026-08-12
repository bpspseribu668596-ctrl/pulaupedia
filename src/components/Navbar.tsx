"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Home, Folder } from "lucide-react";

interface NavbarProps {
  isScrolled: boolean;
}

export default function Navbar({ isScrolled }: NavbarProps) {
  const [openDropdown, setOpenDropdown] = useState(false);

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
              <Image
                src="/logos/logo-bps.png"
                alt="Logo BPS"
                width={40}
                height={40}
                className="object-contain"
                style={{ width: "auto", height: "40px" }}
              />
              <div className="flex flex-col">
                <span className="text-white font-semibold text-xs md:text-sm uppercase leading-tight">
                  BADAN PUSAT STATISTIK
                </span>
                <span className="text-white font-semibold text-xs md:text-sm uppercase leading-tight">
                  KABUPATEN KEPULAUAN SERIBU
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

              <div className="relative">
                <button
                  onMouseEnter={() => setOpenDropdown(true)}
                  onMouseLeave={() => setOpenDropdown(false)}
                  className="flex items-center gap-2 text-white hover:text-[#337ab7] transition-colors font-semibold"
                >
                  <Folder className="w-4 h-4" />
                  <span>Portal</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown ? "rotate-180" : ""}`} />
                </button>

                {openDropdown && (
                  <div
                    onMouseEnter={() => setOpenDropdown(true)}
                    onMouseLeave={() => setOpenDropdown(false)}
                    className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-2xl border border-gray-200 py-2 z-50"
                  >
                    {portalMenuItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="block px-4 py-3 text-[#111111] hover:bg-[#337ab7] hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
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
