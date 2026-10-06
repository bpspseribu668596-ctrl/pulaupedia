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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  LogIn,
  AlertCircle,
  Loader2,
  Home,
} from "lucide-react";

// ── Theme ─────────────────────────────────────────────────────────────────────

const FASIH_COLOR = "#f69139";
const FASIH_HOVER_COLOR = "#df7e2d";

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
      const res = await fetch("/api/public/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
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
        <Label htmlFor="cms-username">
          Username
        </Label>

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
        <Label htmlFor="cms-password">
          Password
        </Label>

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

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
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
        <Label htmlFor="fasih-username">
          Username
        </Label>

        <Input
          id="fasih-username"
          type="text"
          autoComplete="username"
          placeholder="Masukkan username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
          required
          className="focus-visible:ring-[#f69139] focus-visible:border-[#f69139]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fasih-password">
          Password
        </Label>

        <Input
          id="fasih-password"
          type="password"
          autoComplete="current-password"
          placeholder="Masukkan password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
          className="focus-visible:ring-[#f69139] focus-visible:border-[#f69139]"
        />
      </div>

      <Button
        type="submit"
        className="w-full text-white hover:text-white"
        style={{
          backgroundColor: FASIH_COLOR,
        }}
        disabled={isLoading}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor =
            FASIH_HOVER_COLOR;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor =
            FASIH_COLOR;
        }}
      >
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

// ── Main login content ────────────────────────────────────────────────────────

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialTab =
    searchParams.get("tab") === "fasih"
      ? "fasih"
      : "cms";

  const [activeTab, setActiveTab] = useState(initialTab);

  const isFasih = activeTab === "fasih";

  // Sync tab jika URL berubah
  useEffect(() => {
    setActiveTab(
      searchParams.get("tab") === "fasih"
        ? "fasih"
        : "cms"
    );
  }, [searchParams]);

  // Navigasi ke halaman beranda
  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
        isFasih
          ? "bg-[#f69139]/5"
          : "bg-muted/40"
      }`}
    >
      <div className="w-full max-w-sm space-y-4">

        {/* Header */}
        <div className="text-center space-y-1">
          <h1
            className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
              isFasih
                ? "text-[#f69139]"
                : ""
            }`}
          >
            BPS Kepulauan Seribu
          </h1>

          <p className="text-sm text-muted-foreground">
            Sistem Informasi Internal
          </p>
        </div>

        {/* Login Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="cms"
              className={
                activeTab === "cms"
                  ? ""
                  : ""
              }
            >
              Admin Pulau Pedia
            </TabsTrigger>

            <TabsTrigger
              value="fasih"
              className={
                activeTab === "fasih"
                  ? "data-[state=active]:bg-[#f69139] data-[state=active]:text-white"
                  : ""
              }
            >
              FASIH
            </TabsTrigger>
          </TabsList>

          {/* CMS */}
          <TabsContent
            value="cms"
            className="mt-0"
          >
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base">
                  Masuk sebagai Admin Pulau Pedia
                </CardTitle>

                <CardDescription>
                  Gunakan akun admin Pulau Pedia
                  yang telah diberikan
                </CardDescription>
              </CardHeader>

              <CardContent>
                <CmsLoginForm />
              </CardContent>
            </Card>
          </TabsContent>

          {/* FASIH */}
          <TabsContent
            value="fasih"
            className="mt-0"
          >
            <Card
              className="transition-colors duration-300"
              style={{
                borderColor: isFasih
                  ? `${FASIH_COLOR}40`
                  : undefined,
              }}
            >
              <CardHeader className="pb-4">
                <CardTitle
                  className="text-base transition-colors duration-300"
                  style={{
                    color: isFasih
                      ? FASIH_COLOR
                      : undefined,
                  }}
                >
                  Masuk ke FASIH
                </CardTitle>

                <CardDescription>
                  Gunakan akun FASIH Monitoring
                  yang telah diberikan
                </CardDescription>
              </CardHeader>

              <CardContent>
                <FasihLoginForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Kembali ke Beranda */}
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoHome}
        >
          <Home className="mr-2 h-4 w-4" />
          Kembali ke Beranda
        </Button>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          BPS Kabupaten Kepulauan Seribu
        </p>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}