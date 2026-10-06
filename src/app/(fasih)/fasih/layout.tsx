// Root FASIH layout — minimal, hanya untuk halaman login /fasih
// Halaman yang butuh sidebar punya layout sendiri di /fasih/(app)/layout.tsx

export default function FasihRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
