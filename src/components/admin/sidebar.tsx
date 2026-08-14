"use client";

import * as React from "react";
import {
  Home,
  Settings,
  Package,
  LayoutDashboard,
  Image,
  Bell,
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
      isActive: true,
    },
    {
      title: "Home Page",
      url: "/admin/home",
      icon: Home,
    },
    {
      title: "Hero",
      url: "/admin/hero",
      icon: Image,
    },
    {
      title: "Announcement",
      url: "/admin/announcement",
      icon: Bell,
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
