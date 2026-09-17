"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronsUpDown, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface FasihNavUserProps {
  user: {
    name: string;
    username: string;
    role: string;
  };
}

export function FasihNavUser({ user }: FasihNavUserProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/fasih/auth/logout", { method: "POST" });
      router.push("/fasih");
      router.refresh();
    } catch {
      // ignore
    } finally {
      setIsLoggingOut(false);
    }
  };

  const initials = user.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          {/* @base-ui/react DropdownMenuTrigger tidak support asChild — render as div wrapper */}
          <DropdownMenuTrigger
            className="w-full"
            render={
              <SidebarMenuButton className="h-auto py-2 w-full">
                {/* Avatar */}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white text-xs font-bold">
                  {initials || <User className="h-4 w-4" />}
                </span>
                <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground capitalize">
                    {user.role}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50" />
              </SidebarMenuButton>
            }
          />

          <DropdownMenuContent align="end" side="bottom" sideOffset={4}>
            {/* User info header */}
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <div className="flex items-center gap-2 px-1 py-1.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white text-xs font-bold">
                    {initials || <User className="h-4 w-4" />}
                  </span>
                  <div className="grid flex-1 text-sm leading-tight min-w-0">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      @{user.username}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>{isLoggingOut ? "Keluar..." : "Logout"}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
