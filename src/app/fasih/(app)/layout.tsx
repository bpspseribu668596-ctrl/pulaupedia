import { redirect } from "next/navigation";
import { validateFasihSession } from "@/lib/fasih-auth";
import { FasihSidebar } from "@/components/fasih/sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default async function FasihAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side session validation — full DB check
  const user = await validateFasihSession();
  if (!user) {
    redirect("/login?tab=fasih");
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <FasihSidebar
        user={{
          name: user.name,
          username: user.username,
          role: user.role,
        }}
      />
      <SidebarInset>
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <span className="text-sm font-medium text-muted-foreground">
            FASIH — Monitoring Status
          </span>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
