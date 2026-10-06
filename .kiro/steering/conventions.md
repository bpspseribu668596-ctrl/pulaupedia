# Konvensi Kode

Panduan ini harus diikuti saat menambah atau mengubah kode di proyek ini.

## Struktur File

- **Server Components** (default): tidak ada `"use client"`, bisa langsung query DB
- **Client Components**: wajib ada `"use client"` di baris pertama, fetch data via API routes
- **API Routes**: semua di `src/app/api/`, gunakan `NextResponse.json()`
- **Komponen UI reusable**: taruh di `src/components/`, sub-folder per domain (`admin/`, `fasih/`)
- **Komponen shadcn/ui**: taruh di `src/components/ui/`, jangan diedit manual

## Styling

- Gunakan **Tailwind CSS v4** utility classes
- Warna brand:
  - Merah utama: `#D83F3F`
  - Abu gelap (background): `#333333`
  - Orange aksen (FASIH): `#F9882B`
- Gunakan `cn()` dari `@/lib/utils` untuk conditional class merging
- Jangan gunakan inline `style={{}}` kecuali untuk nilai dinamis yang tidak bisa di-cover Tailwind

## Database Access

- Semua query PostgreSQL menggunakan pool dari `@/lib/db`
- Untuk FASIH: gunakan function-function dari `@/lib/fasih-db.ts` — jangan query langsung ke pool di luar sana
- Selalu gunakan **parameterized queries** (`$1, $2, ...`) — jangan string interpolation
- Untuk query FASIH baru, tambahkan type interface di `fasih-db.ts` dan export function-nya di sana

## Auth Pattern

### Admin CMS
- Cookie: `admin-session` (JSON string)
- Validasi di middleware (parse JSON), detail validasi di route handler masing-masing
- Login via `/api/auth` (NextAuth-based)

### FASIH
- Cookie: `fasih-session` (hex token, 24 jam)
- Validasi cookie presence di middleware, validasi DB di server component/route handler
- Gunakan `validateFasihSession()` dari `@/lib/fasih-auth.ts` di server component
- Gunakan `getFasihTokenFromRequest()` untuk middleware
- Activity log: panggil `writeFasihActivityLog()` untuk setiap operasi mutasi penting

## API Route Pattern

```typescript
// GET example
export async function GET(request: NextRequest) {
  // 1. Validasi auth (jika protected)
  const user = await validateFasihSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // 2. Ambil params
  const { searchParams } = new URL(request.url);
  
  // 3. Query DB via fasih-db functions
  const data = await getFasihSomething();
  
  // 4. Return JSON
  return NextResponse.json(data);
}
```

## Komponen Pattern

- Komponen besar (halaman) boleh punya sub-komponen di file yang sama, taruh di bawah export default
- Gunakan `interface` bukan `type` untuk props
- Nama komponen: PascalCase
- Nama file: `page.tsx`, `layout.tsx`, atau PascalCase untuk komponen shared

## Error Handling

- Gunakan pesan error dari `@/lib/error-messages.ts` jika tersedia
- Client components: tampilkan error state yang user-friendly, jangan expose detail internal
- Server/API: log dengan `console.error('[DOMAIN] message:', err)`, return generic message ke client

## Import Aliases

| Alias | Path |
|---|---|
| `@/components` | `src/components` |
| `@/components/ui` | `src/components/ui` |
| `@/lib` | `src/lib` |
| `@/hooks` | `src/hooks` |

## Penamaan

- **Pages**: `page.tsx` (Next.js convention)
- **Layouts**: `layout.tsx`
- **Route groups**: `(nama)` — tidak muncul di URL, digunakan di `fasih/(app)`
- **Dynamic routes**: `[slug]`, `[id]`
