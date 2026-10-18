
"use client";

import Link from "next/link";
import { SidebarStateProvider, useSidebarState } from "@/components/sidebar-context";
import { AdminSidebar } from "@/components/admin/sidebar";
import { SidebarToggle } from "@/components/sidebar-toggle";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { open } = useSidebarState();

  return (
    <div className="min-h-screen bg-gray-50/50">
      <AdminSidebar />

      {/* Main content — offset by sidebar width */}
      <div
        className="flex flex-col min-h-screen transition-all duration-300 ease-in-out"
        style={{ marginLeft: open ? "14rem" : "3.5rem" }}
      >
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-gray-200 bg-white px-4 shadow-sm">
          <SidebarToggle />
          <div className="h-5 w-px bg-gray-200" />

          <span className="text-sm font-medium text-gray-700">
            Admin CMS
          </span>

          {/* Home navigation button — right corner */}
          <div className="ml-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-[#D83F3F] hover:bg-red-50 hover:text-[#D83F3F]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3 10 9-7 9 7" />
                <path d="M9 21V12h6v9" />
                <path d="M5 12v9h14v-9" />
              </svg>
              Halaman Utama
            </Link>
          </div>

          {/* Orange accent strip */}
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{ backgroundColor: "#D83F3F", opacity: 0.6 }}
          />
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarStateProvider defaultOpen={true}>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </SidebarStateProvider>
  );
}
