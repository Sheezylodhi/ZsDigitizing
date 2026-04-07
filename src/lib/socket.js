import { Server } from "socket.io";

let io;

export function initSocket(server) {
  if (!io) {
    io = new Server(server, {
      path: "/api/socket",
      addTrailingSlash: false,
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      socket.on("join", (userId) => {
        socket.join(userId);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  }
  return io;
}

export function getIO() {
  if (!io) throw new Error("Socket not initialized");
  return io;
}