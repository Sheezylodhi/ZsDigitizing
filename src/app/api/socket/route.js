import { initSocket } from "@/lib/socket";

export const dynamic = "force-dynamic";

export async function GET(req) {
  if (!global.io) {
    global.io = initSocket(req.socket.server);
  }

  return new Response("Socket running");
}