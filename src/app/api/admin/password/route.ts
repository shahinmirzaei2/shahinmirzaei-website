import { NextRequest, NextResponse } from "next/server";
import { isValidSession, changePassword } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  if (!isValidSession(cookieStore.get("admin_token")?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { oldPassword, newPassword } = await request.json();
  if (!oldPassword || !newPassword || newPassword.length < 6) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  if (!changePassword(oldPassword, newPassword)) {
    return NextResponse.json({ error: "Wrong current password" }, { status: 403 });
  }

  return NextResponse.json({ success: true });
}
