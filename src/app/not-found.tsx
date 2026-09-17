"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Home, ArrowLeft, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const header = document.getElementById("not-found-top");
    if (!header) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsScrolled(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-1px 0px 0px 0px" }
    );
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div id="not-found-top" className="absolute top-0 h-1 w-full pointer-events-none" />
      <Navbar isScrolled={isScrolled} />

      <main className="flex-1 flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4 py-24">
        <div className="text-center max-w-lg w-full">

          {/* 404 display */}
          <div className="relative mb-6">
            <p className="text-[120px] sm:text-[160px] font-black leading-none text-gray-100 select-none">
              404
            </p>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-[#D83F3F] p-4 rounded-full shadow-lg">
                <Search className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
            </div>
          </div>

          {/* Border aksen */}
          <div className="w-16 h-1 bg-[#D83F3F] mx-auto mb-6 rounded-full" />

          <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] mb-3">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mb-8 leading-relaxed">
            Halaman yang Anda cari tidak tersedia atau mungkin sudah dipindahkan.
            Silakan kembali ke beranda atau gunakan menu navigasi.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#D83F3F] hover:bg-[#c03535] text-white font-semibold px-6 py-3 rounded-lg transition-colors w-full sm:w-auto justify-center"
            >
              <Home className="w-4 h-4" />
              Kembali ke Beranda
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-[#111111] font-semibold px-6 py-3 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
              Halaman Sebelumnya
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
