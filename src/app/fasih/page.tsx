import { redirect } from "next/navigation";

// /fasih sekarang dialihkan ke halaman login terpadu
export default function FasihLegacyLoginPage() {
  redirect("/login?tab=fasih");
}
