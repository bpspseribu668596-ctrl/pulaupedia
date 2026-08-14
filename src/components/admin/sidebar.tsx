"use client";

import * as React from "react";
import {
  Home,
  Settings,
  Package,
  LayoutDashboard,
  Image,
  Bell,
  Grid3x3,
  Layout,
  FileText,
  Archive,
  Calendar,
  Award,
  BarChart3,
  ChevronDown,
} from "lucide-react";

import { NavMain } from "@/components/admin/nav-main";
import { NavUser } from "@/components/admin/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Admin",
    email: "admin@bps.go.id",
    avatar: "/avatars/01.png",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Announcement",
      url: "/admin/announcement",
      icon: Bell,
    },
    {
      title: "Hero/Header",
      url: "/admin/hero",
      icon: Image,
    },
    {
      title: "Navbar",
      url: "/admin/navbar",
      icon: Settings,
    },
    {
      title: "Footer",
      url: "/admin/footer",
      icon: Settings,
    },
    {
      title: "Portal/Section",
      url: "/admin/portal",
      icon: Grid3x3,
    },
    {
      title: "Portal Umum",
      url: "/admin/portal-umum",
      icon: Layout,
    },
    {
      title: "Informasi Umum dan Layanan Publik",
      url: "/admin/portal-umum-sections",
      icon: FileText,
    },
    {
      title: "Brankas Fungsi",
      url: "/admin/brankas-fungsi",
      icon: Archive,
    },
    {
      title: "Dokumentasi Kegiatan",
      url: "/admin/dokumentasi-kegiatan",
      icon: Calendar,
    },
    {
      title: "SE2026 Archive Hub",
      url: "/admin/se-2026-archive",
      icon: Archive,
    },
    {
      title: "Aplikasi Daniel",
      url: "/admin/aplikasi-daniel",
      icon: Package,
    },
    {
      title: "Monev Anggaran",
      url: "/admin/monev-anggaran",
      icon: BarChart3,
    },
    {
      title: "SAKIP 2026",
      url: "/admin/sakip-2026",
      icon: FileText,
    },
    {
      title: "ZI 2026",
      url: "/admin/zi-2026",
      icon: Award,
    },
    {
      title: "Services",
      url: "/admin/services",
      icon: Package,
    },
  ],
};

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[#D83F3F] text-white font-bold">
            PP
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold">Pulau Pedia</span>
            <span className="text-xs text-muted-foreground">Admin</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
