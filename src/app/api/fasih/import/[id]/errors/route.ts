import { NextRequest, NextResponse } from "next/server";
import { validateFasihSession } from "@/lib/fasih-auth";
import { getFasihImportErrors } from "@/lib/fasih-db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await validateFasihSession();
    if (!user) return NextResponse.json({ error: "Tidak terautentikasi" }, { status: 401 });

    const { id } = await params;
    const errors = await getFasihImportErrors(id);
    return NextResponse.json({ errors });
  } catch (err) {
    console.error("[FASIH] import errors GET:", err);
    return NextResponse.json({ error: "Gagal memuat error detail" }, { status: 500 });
  }
}
