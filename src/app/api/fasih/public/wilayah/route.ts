import { NextRequest, NextResponse } from "next/server";
import { getFasihAssignments, getDistinctIslands, getFasihOfficers, getFasihDashboardStats } from "@/lib/fasih-db";

// ─── GET: public — no auth required ──────────────────────────────────────────
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const page       = parseInt(searchParams.get("page")     ?? "1",  10);
    const pageSize   = parseInt(searchParams.get("pageSize") ?? "20", 10);
    const search     = searchParams.get("search")     ?? "";
    const island     = searchParams.get("island")     ?? "";
    const pencacahId = searchParams.get("pencacahId") ?? "";
    const sortBy     = searchParams.get("sortBy")     ?? "";
    const sortDir    = (searchParams.get("sortDir") ?? "asc") as "asc" | "desc";

    const [{ rows, total, filteredStats }, islands, pencacahList, stats] = await Promise.all([
      getFasihAssignments({
        search,
        island,
        pencacahId,
        page,
        pageSize,
        sortBy,
        sortDir,
      }),
      getDistinctIslands(),
      getFasihOfficers("pencacah"),
      getFasihDashboardStats(),
    ]);

    return NextResponse.json({
      assignments: rows,
      total,
      page,
      pageSize,
      islands,
      pencacahList,
      stats,
      filteredStats,
    });
  } catch (err) {
    console.error("[FASIH] public wilayah error:", err);
    return NextResponse.json(
      { error: "Gagal memuat data" },
      { status: 500 }
    );
  }
}
