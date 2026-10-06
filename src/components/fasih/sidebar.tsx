"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useSidebarState } from "@/components/sidebar-context";
import {
  LayoutDashboard,
  Users,
  MapPin,
  Upload,
  LogOut,
  ChevronUp,
  User,
} from "lucide-react";

const navSections = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard",   url: "/fasih/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Data",
    items: [
      { title: "Petugas",     url: "/fasih/petugas",   icon: Users },
      { title: "Wilayah",     url: "/fasih/wilayah",   icon: MapPin },
    ],
  },
  {
    title: "Import",
    items: [
      { title: "Import Data", url: "/fasih/import",    icon: Upload },
    ],
  },
];

interface FasihSidebarProps {
  user: {
    name: string;
    username: string;
    role: string;
  };
}

export function FasihSidebar({ user }: FasihSidebarProps) {
  const { open } = useSidebarState();
  const pathname = usePathname();
  const router = useRouter();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const initials = user.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  // Close user menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/fasih/auth/logout", { method: "POST" });
      router.push("/login?tab=fasih");
      router.refresh();
    } catch {
      // ignore
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 z-30 h-screen flex flex-col bg-white border-r border-gray-200
        transition-all duration-300 ease-in-out
        ${open ? "w-56" : "w-14"}
      `}
    >
      {/* Brand */}
      <div
        className={`flex items-center h-14 shrink-0 border-b border-gray-100 ${
          open ? "px-4 gap-3" : "justify-center"
        }`}
      >
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white font-bold text-xs"
          style={{ backgroundColor: "#F9882B" }}
        >
          F
        </div>
        {open && (
          <div className="flex flex-col gap-0 leading-none min-w-0">
            <span className="font-bold text-sm text-gray-900">FASIH</span>
            <span className="text-xs text-gray-400">Monitoring Status</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {navSections.map((section) => (
          <div key={section.title}>
            {open ? (
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 px-2 mb-1 select-none">
                {section.title}
              </p>
            ) : (
              <div className="h-px bg-gray-100 mx-1 mb-1" />
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive =
                  pathname === item.url || pathname.startsWith(item.url + "/");
                const Icon = item.icon;
                return (
                  <Link
                    key={item.url}
                    href={item.url}
                    title={!open ? item.title : undefined}
                    className={`
                      flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-all duration-150
                      ${open ? "" : "justify-center"}
                      ${
                        isActive
                          ? "bg-orange-50 text-[#F9882B]"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }
                    `}
                  >
                    <Icon
                      className={`h-4 w-4 shrink-0 ${
                        isActive ? "text-[#F9882B]" : "text-gray-400"
                      }`}
                    />
                    {open && <span className="truncate">{item.title}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="shrink-0 border-t border-gray-100 p-2" ref={userMenuRef}>
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen((v) => !v)}
            title={!open ? user.name : undefined}
            className={`
              flex items-center gap-2 w-full rounded-lg px-2 py-2 text-sm
              hover:bg-gray-100 transition-colors
              ${open ? "" : "justify-center"}
            `}
          >
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white text-xs font-bold"
              style={{ backgroundColor: "#F9882B" }}
            >
              {initials || <User className="h-4 w-4" />}
            </span>
            {open && (
              <>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate capitalize">
                    {user.role}
                  </p>
                </div>
                <ChevronUp
                  className={`h-4 w-4 text-gray-400 shrink-0 transition-transform ${
                    userMenuOpen ? "" : "rotate-180"
                  }`}
                />
              </>
            )}
          </button>

          {/* User dropdown */}
          {userMenuOpen && (
            <div
              className={`absolute bottom-full mb-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50 ${
                open ? "left-0 right-0" : "left-0 w-48"
              }`}
            >
              <div className="px-3 py-2.5 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-400">@{user.username}</p>
              </div>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                <LogOut className="h-4 w-4" />
                {isLoggingOut ? "Keluar..." : "Logout"}
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
