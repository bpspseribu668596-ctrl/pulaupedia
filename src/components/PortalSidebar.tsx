"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileSpreadsheet,
  DollarSign,
  Package,
  BarChart3,
  Megaphone,
  Award,
  ShoppingCart,
  Users,
} from "lucide-react";

const menuItems = [
  { name: "Bigram", href: "/portal-umum/bigram", icon: FileSpreadsheet },
  { name: "Keuangan", href: "/portal-umum/keuangan", icon: DollarSign },
  { name: "BMN & Persediaan", href: "/portal-umum/bmn-persediaan", icon: Package },
  { name: "SAKIP", href: "/portal-umum/sakip", icon: BarChart3 },
  { name: "HUMAS", href: "/portal-umum/humas", icon: Megaphone },
  { name: "Zona Integritas", href: "/portal-umum/zona-integritas", icon: Award },
  { name: "Pengadaan Barang & Jasa", href: "/portal-umum/pengadaan", icon: ShoppingCart },
  { name: "Kepegawaian", href: "/portal-umum/kepegawaian", icon: Users },
];

export default function PortalSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 md:sticky md:top-24">
        <Link
          href="/portal-umum"
          className={`flex items-center gap-2 px-2 mb-4 hover:opacity-80 transition-opacity ${
            pathname === "/portal-umum" ? "opacity-100" : ""
          }`}
        >
          <div className="w-1 h-6 bg-[#D83F3F] rounded"></div>
          <h3 className="font-bold text-[#0072BC] uppercase text-sm tracking-wide">
            Portal Umum
          </h3>
        </Link>
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
