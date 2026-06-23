import { NextResponse } from "next/server";
import { isValidSession } from "@/lib/auth";
import { getAllArticles } from "@/lib/articles";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  if (!isValidSession(cookieStore.get("admin_token")?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getAllArticles());
}
