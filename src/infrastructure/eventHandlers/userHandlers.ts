import "reflect-metadata";
import { container } from "tsyringe";
import { Socket, Server } from "socket.io";
import { ApiClient } from "../http/ApiClient";

const onlineUsers = new Map<string, string>();
const apiClient = container.resolve(ApiClient);

export function registerUserHandlers(socket: Socket, io: Server): void {
  console.log("Registering user handlers");
  socket.on("user-connected", (data) => {
    const userId = data.userId;
    console.log("User connected: ", socket.id, data.userId);
    if (!onlineUsers.has(data.userId)) onlineUsers.set(data.userId, socket.id);
    console.log("Connected users: ", onlineUsers);
    socket.join(userId);
    console.log("User joined to personal room: ", userId);

    const array = Array.from(onlineUsers.keys());
    io.emit("online-users", { onlineUsers: array });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);
    const userId = socket.data.userId;
    for (const [id, sId] of onlineUsers.entries()) {
      if (sId === socket.id) {
        onlineUsers.delete(id);
        break;
      }
    }

    const array = Array.from(onlineUsers.keys());
    io.emit("online-users", { onlineUsers: array });
  });
}
