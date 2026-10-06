import { redirect } from "next/navigation";
import { validateFasihSession } from "@/lib/fasih/auth";
import { FasihLayoutClient } from "@/components/fasih/layout-client";

export default async function FasihAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await validateFasihSession();
  if (!user) {
    redirect("/login?tab=fasih");
  }

  return (
    <FasihLayoutClient
      user={{
        name: user.name,
        username: user.username,
        role: user.role,
      }}
    >
      {children}
    </FasihLayoutClient>
  );
}
