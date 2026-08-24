"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FileSpreadsheet,
  DollarSign,
  Package,
  BarChart3,
  Megaphone,
  Award,
  ShoppingCart,
  Users,
  BookOpen,
  Archive,
  FileText,
  Laptop,
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

        if (!currentPortal) {
          setIsLoading(false);
          return;
        }

        setPortal(currentPortal);

        const itemsRes = await fetch(`/api/portals/${currentPortal.id}/items`);
        if (itemsRes.ok) {
          const itemsData = await itemsRes.json();
          const items = itemsData.map((item: any) => ({
            name: item.name,
            href: item.link,
            icon: item.icon,
          }));
          setMenuItems(items);
        }
      } catch (error) {
        console.error('Error fetching portal data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortalAndItems();
  }, [portalSlug]);

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      FileSpreadsheet,
      DollarSign,
      Package,
      BarChart3,
      Megaphone,
      Award,
      ShoppingCart,
      Users,
      BookOpen,
      Archive,
      FileText,
      Laptop,
    };
    return iconMap[iconName] || FileSpreadsheet;
  };

  if (isLoading) {
    return (
      <aside className="w-full md:w-64 shrink-0">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </aside>
    );
  }

  if (!portal) {
    return null;
  }

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 md:sticky md:top-24">
        <Link
          href={`/${portalSlug}`}
          className={`flex items-center gap-2 px-2 mb-4 hover:opacity-80 transition-opacity ${
            pathname === `/${portalSlug}` ? "opacity-100" : ""
          }`}
        >
          <div className="w-1 h-6 bg-[#D83F3F] rounded"></div>
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
