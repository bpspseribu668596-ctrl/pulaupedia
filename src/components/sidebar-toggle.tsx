"use client";

import { useSidebarState } from "@/components/sidebar-context";
import { PanelLeft } from "lucide-react";

export function SidebarToggle() {
  const { toggle } = useSidebarState();
  return (
    <button
      onClick={toggle}
      className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
      aria-label="Toggle sidebar"
    >
      <PanelLeft className="h-4 w-4" />
    </button>
  );
}
