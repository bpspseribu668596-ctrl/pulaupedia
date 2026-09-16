"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Home, Folder, Menu, X } from "lucide-react";

interface NavbarProps {
  isScrolled: boolean;
}

interface NavbarConfig {
  id?: number;
  logo: string;
  logoAlt: string;
  brandName: string;
}

interface PortalMenuItem {
  id: number;
  name: string;
  href: string;
  sortOrder: number;
}

function resolveImageUrl(src: string | null | undefined): string | null {
  if (!src) return null;
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  return null;
}

export default function Navbar({ isScrolled }: NavbarProps) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobilePortalOpen, setMobilePortalOpen] = useState(false);
  const [navbarConfig, setNavbarConfig] = useState<NavbarConfig | null>(null);
  const [portalMenuItems, setPortalMenuItems] = useState<PortalMenuItem[]>([]);

  // Tutup mobile menu saat resize ke desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
        setMobilePortalOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll saat mobile menu terbuka
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [navbarRes, portalsRes] = await Promise.all([
          fetch('/api/navbar'),
          fetch('/api/portals'),
        ]);
        if (navbarRes.ok) setNavbarConfig(await navbarRes.json());
        if (portalsRes.ok) setPortalMenuItems(await portalsRes.json());
      } catch (error) {
        console.error('Error fetching navbar data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#111111] shadow-[0_4px_0_0_#337ab7,0_8px_16px_rgba(0,0,0,0.3)]"
            : "bg-gradient-to-b from-black/80 to-black/40"
        }`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo + Brand */}
            <Link href="/" className="flex items-center gap-2 sm:gap-4 min-w-0" onClick={() => setMobileMenuOpen(false)}>
              {resolveImageUrl(navbarConfig?.logo) ? (
                <img
                  src={resolveImageUrl(navbarConfig!.logo)!}
                  alt={navbarConfig?.logoAlt ?? 'Logo'}
                  className="object-contain shrink-0"
                  style={{ height: "36px", width: "auto" }}
                />
              ) : (
                <div className="w-9 h-9 shrink-0 flex items-center justify-center rounded bg-white/10">
                  <span className="text-white/50 text-xs">Logo</span>
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span className="text-white font-semibold text-[10px] sm:text-xs md:text-sm uppercase leading-tight whitespace-nowrap drop-shadow">
                  BADAN PUSAT STATISTIK
                </span>
                <div className="flex justify-between text-white font-semibold text-[10px] sm:text-xs md:text-sm uppercase leading-tight w-full drop-shadow">
                  {"PULAU PEDIA".split("").map((char, i) => (
                    <span key={i}>{char === " " ? "\u00A0" : char}</span>
                  ))}
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="flex items-center gap-2 text-white hover:text-[#337ab7] transition-colors font-semibold drop-shadow"
              >
                <Home className="w-4 h-4" />
                <span>Beranda</span>
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown(true)}
                onMouseLeave={() => setOpenDropdown(false)}
              >
                <button className="flex items-center gap-2 text-white hover:text-[#337ab7] transition-colors font-semibold drop-shadow">
                  <Folder className="w-4 h-4" />
                  <span>Portal</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown ? "rotate-180" : ""}`} />
                </button>

                {openDropdown && (
                  <div className="absolute top-full right-0 pt-2 z-50">
                    <div className="w-64 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
                      {portalMenuItems.length > 0 ? (
                        portalMenuItems.map((item) => (
                          <Link
                            key={item.id}
                            href={item.href}
                            className="block px-4 py-3 text-[#111111] hover:bg-[#337ab7] hover:text-white transition-colors duration-200"
                          >
                            {item.name}
                          </Link>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-[#111111] text-sm">Memuat menu...</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Hamburger Button (mobile) */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 max-w-[85vw] z-50 bg-[#111111] shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Menu navigasi mobile"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <span className="text-white font-bold text-sm uppercase tracking-wider">Menu</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-white hover:bg-white/10 transition-colors"
            aria-label="Tutup menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors font-semibold"
          >
            <Home className="w-5 h-5 shrink-0" />
            <span>Beranda</span>
          </Link>

          {/* Portal Accordion */}
          <div>
            <button
              onClick={() => setMobilePortalOpen((v) => !v)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors font-semibold"
            >
              <div className="flex items-center gap-3">
                <Folder className="w-5 h-5 shrink-0" />
                <span>Portal</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobilePortalOpen ? "rotate-180" : ""}`} />
            </button>

            {mobilePortalOpen && (
              <div className="mt-1 ml-4 border-l border-white/10 pl-3 space-y-1">
                {portalMenuItems.length > 0 ? (
                  portalMenuItems.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  ))
                ) : (
                  <p className="px-3 py-2 text-white/50 text-sm">Memuat menu...</p>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Drawer Footer */}
        <div className="px-5 py-4 border-t border-white/10">
          <p className="text-white/30 text-xs text-center">BPS Kepulauan Seribu</p>
        </div>
      </div>
    </>
  );
}
