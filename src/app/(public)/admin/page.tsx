"use client";

import Link from "next/link";
import {
  Bell,
  Image,
  Settings,
  Grid3x3,
  Package,
  Layout,
  ArrowRight,
  FileText,
} from "lucide-react";

const menuItems = [
  {
    title: "Announcement",
    description: "Kelola pengumuman dan berita penting yang ditampilkan di halaman utama.",
    href: "/admin/announcement",
    icon: Bell,
  },
  {
    title: "Header",
    description: "Atur judul, subtitle, dan background image header halaman utama.",
    href: "/admin/header",
    icon: Image,
  },
  {
    title: "Navbar",
    description: "Konfigurasi logo dan nama brand yang muncul di navigation bar.",
    href: "/admin/navbar",
    icon: Layout,
  },
  {
    title: "Footer",
    description: "Atur informasi perusahaan, alamat, kontak, dan tautan di footer.",
    href: "/admin/footer",
    icon: FileText,
  },
  {
    title: "Main Portal",
    description: "Kelola portal utama dan sub-item yang tampil di halaman beranda.",
    href: "/admin/main-portal",
    icon: Grid3x3,
  },
  {
    title: "Services",
    description: "Tambah dan kelola layanan digital BPS yang ditampilkan di beranda.",
    href: "/admin/services",
    icon: Package,
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Selamat datang di Admin CMS Pulau Pedia. Pilih menu untuk mulai mengelola konten.
        </p>
      </div>

      {/* Stats strip — icon kecil dengan brand accent */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.href}
              className="rounded-xl border border-gray-100 bg-white p-4 flex flex-col items-center gap-2"
            >
              <div className="w-9 h-9 rounded-lg bg-[#D83F3F]/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#D83F3F]" />
              </div>
              <span className="text-xs font-semibold text-center leading-tight text-gray-700">
                {item.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Menu grid */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Menu Pengelolaan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4 hover:border-[#D83F3F]/30 hover:shadow-lg transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-[#D83F3F]/10 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                  <Icon className="w-5 h-5 text-[#D83F3F]" />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-[#D83F3F] opacity-0 group-hover:opacity-100 transition-opacity">
                  Kelola
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Info footer */}
      <div className="rounded-xl border border-gray-100 bg-white p-4 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#D83F3F]/10 flex items-center justify-center shrink-0">
          <Settings className="w-4 h-4 text-[#D83F3F]" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">Pulau Pedia Admin CMS</p>
          <p className="text-xs text-gray-500 mt-0.5">
            BPS Kabupaten Kepulauan Seribu — Sistem Manajemen Konten Portal Informasi
          </p>
        </div>
      </div>
    </div>
  );
}
