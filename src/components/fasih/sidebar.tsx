"use client";

import * as React from "react";
import { FasihNavMain } from "@/components/fasih/nav-main";
import { FasihNavUser } from "@/components/fasih/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const navSections = [
  {
    title: "Overview",
    url: "#",
    items: [
      { title: "Dashboard", url: "/fasih/dashboard" },
    ],
  },
  {
    title: "Data",
    url: "#",
    items: [
      { title: "Petugas", url: "/fasih/petugas" },
      { title: "Wilayah", url: "/fasih/wilayah" },
    ],
  },
  {
    title: "Import",
    url: "#",
    items: [
      { title: "Import Data", url: "/fasih/import" },
    ],
  },
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
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<a href="/fasih/dashboard" />}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-xs shrink-0">
                F
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold text-sm">FASIH</span>
                <span className="text-xs text-muted-foreground">
                  Monitoring Status
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <FasihNavMain sections={navSections} />
      </SidebarContent>

      <SidebarFooter>
        <FasihNavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
