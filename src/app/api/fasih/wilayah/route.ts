import { NextRequest, NextResponse } from "next/server";
import { validateFasihSession } from "@/lib/fasih-auth";
import { getFasihAssignments, getDistinctIslands, getFasihOfficers } from "@/lib/fasih-db";

export async function GET(request: NextRequest) {
  try {
    const user = await validateFasihSession();
    if (!user) {
      return NextResponse.json({ error: "Tidak terautentikasi" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search     = searchParams.get("search")     ?? "";
    const island     = searchParams.get("island")     ?? "";
    const pencacahId = searchParams.get("pencacahId") ?? "";
    const page       = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const pageSize   = parseInt(searchParams.get("pageSize") ?? "10", 10);
    
    // Limit page size — jika > total data, fetch semua
    let finalPageSize = pageSize;
    if (pageSize > 10000) finalPageSize = 999999; // "Semua" — fetch semua data
    else if (pageSize < 1) finalPageSize = 10;
    else if (pageSize > 500) finalPageSize = 500; // Cap at 500 untuk safety
    
    const sortBy     = searchParams.get("sortBy")     ?? "";
    const sortDir    = searchParams.get("sortDir") === "desc" ? "desc" : "asc";

    const [result, islands, pencacahList] = await Promise.all([
      getFasihAssignments({ search, island, pencacahId, page, pageSize, sortBy, sortDir }),
      getDistinctIslands(),
      getFasihOfficers("pencacah"),
    ]);

    return NextResponse.json({
      assignments: result.rows,
      total: result.total,
      page,
      pageSize,
      islands,
      pencacahList,
    });
  } catch (err) {
    console.error("[FASIH] wilayah error:", err);
    return NextResponse.json({ error: "Gagal memuat data wilayah" }, { status: 500 });
  }
}
