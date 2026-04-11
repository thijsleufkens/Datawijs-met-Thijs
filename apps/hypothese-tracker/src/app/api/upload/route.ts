import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "data", "uploads");

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const files = formData.getAll("files") as File[];

  if (files.length === 0) {
    return NextResponse.json({ error: "Geen bestanden ontvangen" }, { status: 400 });
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  const filenames: string[] = [];

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uniqueName = `${Date.now()}-${file.name}`;
    const filepath = path.join(UPLOAD_DIR, uniqueName);
    await writeFile(filepath, buffer);
    filenames.push(uniqueName);
  }

  return NextResponse.json({ filenames });
}
