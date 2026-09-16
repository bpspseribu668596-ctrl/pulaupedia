"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Users,
  MapPin,
  Upload,
} from "lucide-react";
import { FasihNavMain } from "@/components/fasih/nav-main";
import { FasihNavUser } from "@/components/fasih/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/fasih/dashboard", icon: LayoutDashboard },
  { title: "Petugas",   url: "/fasih/petugas",   icon: Users },
  { title: "Wilayah",   url: "/fasih/wilayah",   icon: MapPin },
  { title: "Import Data", url: "/fasih/import",  icon: Upload },
];

interface FasihSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: {
    name: string;
    username: string;
    role: string;
  };
}

export function FasihSidebar({ user, ...props }: FasihSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-xs shrink-0">
            F
          </div>
          <div className="flex flex-col gap-0.5 leading-none min-w-0">
            <span className="font-semibold text-sm truncate">FASIH</span>
            <span className="text-xs text-muted-foreground truncate">
              Monitoring Status
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <FasihNavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter>
        <FasihNavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
