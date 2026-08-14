"use client";

import { type LucideIcon } from "lucide-react";
import { useState } from "react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    children?: {
      title: string;
      url: string;
      icon?: LucideIcon;
    }[];
  }[];
}) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url;
          const Icon = item.icon;
          const isExpanded = expandedItems.includes(item.title);
          const hasChildren = item.children && item.children.length > 0;

          return (
            <div key={item.title}>
              <SidebarMenuItem>
                <div className="flex items-center">
                  <Link href={item.url} className="flex-1">
                    <SidebarMenuButton isActive={isActive}>
                      {Icon && <Icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                  {hasChildren && (
                    <button
                      onClick={() => toggleExpanded(item.title)}
                      className="p-2 hover:bg-accent rounded-md"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>
              </SidebarMenuItem>
              {hasChildren && isExpanded && (
                <SidebarMenuSub>
                  {item.children.map((child) => {
                    const childIsActive = pathname === child.url;
                    const ChildIcon = child.icon;

                    return (
                      <SidebarMenuSubItem key={child.title}>
                        <Link href={child.url} className="w-full">
                          <SidebarMenuSubButton isActive={childIsActive}>
                            {ChildIcon && <ChildIcon />}
                            <span>{child.title}</span>
                          </SidebarMenuSubButton>
                        </Link>
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              )}
            </div>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
