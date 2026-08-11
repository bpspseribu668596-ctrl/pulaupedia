"use client";

import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  isScrolled: boolean;
}

export default function Navbar({ isScrolled }: NavbarProps) {
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
          <div className="flex items-center justify-center">
            <Link
              href="/"
              className="flex items-center gap-4"
            >
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
          </div>
        </div>
      </div>
    </nav>
  );
}
