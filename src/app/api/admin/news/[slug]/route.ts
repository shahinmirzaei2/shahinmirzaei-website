import { NextRequest, NextResponse } from "next/server";
import { isValidSession } from "@/lib/auth";
import { deleteNews, getNewsBySlug } from "@/lib/news";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const cookieStore = await cookies();
  if (!isValidSession(cookieStore.get("admin_token")?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const cookieStore = await cookies();
  if (!isValidSession(cookieStore.get("admin_token")?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (item) {
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "news");
    if (fs.existsSync(uploadsDir)) {
      fs.readdirSync(uploadsDir)
        .filter((f) => f.startsWith(slug))
        .forEach((f) => fs.unlinkSync(path.join(uploadsDir, f)));
    }
  }

  deleteNews(slug);
  return NextResponse.json({ success: true });
}
