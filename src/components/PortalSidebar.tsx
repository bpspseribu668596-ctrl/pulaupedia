"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  FileSpreadsheet, DollarSign, Package, BarChart3, Megaphone,
  Award, ShoppingCart, Users, BookOpen, Archive, FileText, Laptop,
} from "lucide-react";

interface MenuItem {
  name: string;
  href: string;
  icon: string;
}

interface Portal {
  id: number;
  name: string;
  href: string;
}

export default function PortalSidebar() {
  const pathname = usePathname();
  const params = useParams();
  const portalSlug = params.portalSlug as string;

  const [portal, setPortal] = useState<Portal | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fetchPortalAndItems = async () => {
      try {
        const portalsRes = await fetch('/api/portals?all=true');
        if (!portalsRes.ok) throw new Error('Failed to fetch portals');

        const portalsData = await portalsRes.json();
        const currentPortal = portalsData.find((p: Portal) => {
          const hrefSlug = p.href.replace(/^\//, '').toLowerCase();
          return hrefSlug === portalSlug;
        });

        if (!currentPortal) { setIsLoading(false); return; }

        setPortal(currentPortal);

        const itemsRes = await fetch(`/api/portals/${currentPortal.id}/items`);
        if (itemsRes.ok) {
          const itemsData = await itemsRes.json();
          setMenuItems(itemsData.map((item: any) => ({
            name: item.name,
            href: item.link,
            icon: item.icon,
          })));
        }
      } catch {
        console.error('Error fetching portal sidebar data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortalAndItems();
  }, [portalSlug]);

  const iconMap: Record<string, any> = {
    FileSpreadsheet, DollarSign, Package, BarChart3, Megaphone,
    Award, ShoppingCart, Users, BookOpen, Archive, FileText, Laptop,
  };
  const getIconComponent = (iconName: string) => iconMap[iconName] || FileSpreadsheet;

  if (isLoading) {
    return (
      <aside className="w-full md:w-64 shrink-0">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-9 bg-gray-100 rounded-lg" />
            ))}
          </div>
        </div>
      </aside>
    );
  }

  if (!portal) return null;

  const activeItem = menuItems.find((item) => pathname === item.href);

  return (
    <aside className="w-full md:w-64 shrink-0">
      {/* Mobile: accordion toggle */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="w-full flex items-center justify-between bg-white rounded-xl shadow border border-gray-200 px-4 py-3 text-left"
          aria-expanded={mobileOpen}
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-1 h-5 bg-[#D83F3F] rounded shrink-0" />
            <span className="font-bold text-[#0072BC] uppercase text-sm tracking-wide truncate">
              {activeItem ? activeItem.name : portal.name}
            </span>
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${mobileOpen ? 'rotate-180' : ''}`} />
        </button>

        {mobileOpen && (
          <div className="mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-3">
            <Link
              href={`/${portalSlug}`}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 px-2 mb-3 hover:opacity-80 transition-opacity ${pathname === `/${portalSlug}` ? 'opacity-100' : ''}`}
            >
              <div className="w-1 h-5 bg-[#D83F3F] rounded" />
              <h3 className="font-bold text-[#0072BC] uppercase text-sm tracking-wide">{portal.name}</h3>
            </Link>
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = getIconComponent(item.icon);
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      active ? "bg-[#D83F3F] text-white shadow-md" : "text-[#111111] hover:bg-gray-100 hover:text-[#0072BC]"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      {/* Desktop: sticky sidebar */}
      <div className="hidden md:block bg-white rounded-xl shadow-lg border border-gray-200 p-4 md:sticky md:top-24">
        <Link
          href={`/${portalSlug}`}
          className={`flex items-center gap-2 px-2 mb-4 hover:opacity-80 transition-opacity ${pathname === `/${portalSlug}` ? 'opacity-100' : ''}`}
        >
          <div className="w-1 h-6 bg-[#D83F3F] rounded" />
          <h3 className="font-bold text-[#0072BC] uppercase text-sm tracking-wide">
            {portal.name}
          </h3>
        </Link>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = getIconComponent(item.icon);
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active ? "bg-[#D83F3F] text-white shadow-md" : "text-[#111111] hover:bg-gray-100 hover:text-[#0072BC]"
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
