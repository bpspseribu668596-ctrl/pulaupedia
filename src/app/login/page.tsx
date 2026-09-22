"use client";

import { useState, FormEvent, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, AlertCircle, Loader2 } from "lucide-react";

// ── CMS login form ────────────────────────────────────────────────────────────

function CmsLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error ?? "Login gagal");
      }
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        <Label htmlFor="cms-username">Username</Label>
        <Input
          id="cms-username"
          type="text"
          autoComplete="username"
          placeholder="Masukkan username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cms-password">Password</Label>
        <Input
          id="cms-password"
          type="password"
          autoComplete="current-password"
          placeholder="Masukkan password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Memproses...
          </>
        ) : (
          <>
            <LogIn className="mr-2 h-4 w-4" />
            Masuk
          </>
        )}
      </Button>
    </form>
  );
}

// ── FASIH login form ──────────────────────────────────────────────────────────

function FasihLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/fasih/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/fasih/dashboard");
        router.refresh();
      } else {
        setError(data.error ?? "Login gagal");
      }
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        <Label htmlFor="fasih-username">Username</Label>
        <Input
          id="fasih-username"
          type="text"
          autoComplete="username"
          placeholder="Masukkan username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="fasih-password">Password</Label>
        <Input
          id="fasih-password"
          type="password"
          autoComplete="current-password"
          placeholder="Masukkan password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Memproses...
          </>
        ) : (
          <>
            <LogIn className="mr-2 h-4 w-4" />
            Masuk
          </>
        )}
      </Button>
    </form>
  );
}

// ── Main page — reads ?tab= from URL ─────────────────────────────────────────

function LoginContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "fasih" ? "fasih" : "cms";
  const [activeTab, setActiveTab] = useState(initialTab);

  // Sync tab if URL param changes (e.g. navigating back)
  useEffect(() => {
    setActiveTab(searchParams.get("tab") === "fasih" ? "fasih" : "cms");
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-sm space-y-4">
        <div className="text-center space-y-1">
          <h1 className="text-xl font-bold tracking-tight">BPS Kepulauan Seribu</h1>
          <p className="text-sm text-muted-foreground">Sistem Informasi Internal</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cms">Admin Pulau Pedia</TabsTrigger>
            <TabsTrigger value="fasih">FASIH</TabsTrigger>
          </TabsList>

          <TabsContent value="cms" className="mt-0">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Masuk sebagai Admin Pulau Pedia</CardTitle>
                <CardDescription>
                  Gunakan akun admin Pulau Pedia yang telah diberikan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CmsLoginForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fasih" className="mt-0">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Masuk ke FASIH</CardTitle>
                <CardDescription>
                  Gunakan akun FASIH Monitoring yang telah diberikan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FasihLoginForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <p className="text-center text-xs text-muted-foreground">
          BPS Kabupaten Kepulauan Seribu
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
