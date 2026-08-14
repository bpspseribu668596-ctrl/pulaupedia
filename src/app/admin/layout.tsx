"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="flex-1">
        <div className="flex flex-col gap-4 p-4 md:p-8">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}

