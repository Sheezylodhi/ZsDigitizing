import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req, context) {
  try {
    const { filename } = await context.params;

    if (!filename) {
      return NextResponse.json({ message: "Filename missing" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "uploads", filename);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error("FILE DOWNLOAD ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
