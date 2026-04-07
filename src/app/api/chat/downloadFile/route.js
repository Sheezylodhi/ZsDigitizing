// /src/app/api/chat/downloadFile/route.js
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const fileUrl = searchParams.get("file");

    if (!fileUrl) return new Response("File not specified", { status: 400 });

    // Sirf Cloudinary URL hi allow karen
    try {
      new URL(fileUrl); // valid URL check
    } catch {
      return new Response("Invalid URL", { status: 400 });
    }

    const fileName = fileUrl.split("/").pop();

    // Direct fetch + buffer
    const res = await fetch(fileUrl);
    if (!res.ok) return new Response("File not found", { status: 404 });

    const arrayBuffer = await res.arrayBuffer();

    return new Response(arrayBuffer, {
      headers: {
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Type": "application/octet-stream",
      },
    });
  } catch (err) {
    console.error("Cloudinary Download Error:", err);
    return new Response("Server error", { status: 500 });
  }
}