"use client";

import { SidebarStateProvider, useSidebarState } from "@/components/sidebar-context";
import { FasihSidebar } from "@/components/fasih/sidebar";
import { SidebarToggle } from "@/components/sidebar-toggle";

interface FasihLayoutClientProps {
  user: {
    name: string;
    username: string;
    role: string;
  };
  children: React.ReactNode;
}

function FasihLayoutInner({ user, children }: FasihLayoutClientProps) {
  const { open } = useSidebarState();

  return (
    <div className="min-h-screen bg-gray-50/50">
      <FasihSidebar user={user} />

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
            FASIH — Monitoring Status
          </span>
          {/* Orange accent strip */}
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{ backgroundColor: "#F9882B", opacity: 0.6 }}
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

export function FasihLayoutClient({ user, children }: FasihLayoutClientProps) {
  return (
    <SidebarStateProvider defaultOpen={true}>
      <FasihLayoutInner user={user}>{children}</FasihLayoutInner>
    </SidebarStateProvider>
  );
}
