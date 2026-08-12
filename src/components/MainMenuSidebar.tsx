"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Archive,
  FileText,
  Package,
  Laptop,
  DollarSign,
  BarChart3,
  Award,
} from "lucide-react";

const menuItems = [
  { name: "Portal Umum", href: "/portal-umum", icon: BookOpen },
  { name: "Brankas Fungsi", href: "/brankas-fungsi", icon: Archive },
  { name: "Dokumentasi Kegiatan", href: "/dokumentasi-kegiatan", icon: FileText },
  { name: "SE2026 Archive Hub", href: "/se2026-archive-hub", icon: Package },
  { name: "Aplikasi Daniel", href: "/aplikasi-daniel", icon: Laptop },
  { name: "Monev Anggaran", href: "/monev-anggaran", icon: DollarSign },
  { name: "SAKIP 2026", href: "/sakip-2026", icon: BarChart3 },
  { name: "ZI 2026", href: "/zi-2026", icon: Award },
];

export default function MainMenuSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 md:sticky md:top-24">
        <div className="flex items-center gap-2 px-2 mb-4">
          <div className="w-1 h-6 bg-[#D83F3F] rounded"></div>
          <h3 className="font-bold text-[#0072BC] uppercase text-sm tracking-wide">
            Menu Pulau Pedia
          </h3>
        </div>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "bg-[#D83F3F] text-white shadow-md"
                    : "text-[#111111] hover:bg-gray-100 hover:text-[#0072BC]"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
