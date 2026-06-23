import { NextRequest, NextResponse } from "next/server";
import { isValidSession } from "@/lib/auth";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  if (!isValidSession(cookieStore.get("admin_token")?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const folder = formData.get("folder") as string;
  const filename = formData.get("filename") as string;

  if (!file || !folder || !filename) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const ext = file.name.split(".").pop() || "jpg";
  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const finalName = `${filename}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(uploadDir, finalName), buffer);

  return NextResponse.json({ url: `/uploads/${folder}/${finalName}` });
}
