import { NextRequest, NextResponse } from "next/server";
import { isValidSession } from "@/lib/auth";
import { saveNews } from "@/lib/news";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  if (!isValidSession(cookieStore.get("admin_token")?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const now = new Date().toISOString();
  saveNews({
    ...data,
    gallery: data.gallery || [],
    createdAt: data.createdAt || now,
    updatedAt: now,
  });
  return NextResponse.json({ success: true }, { status: 201 });
}
