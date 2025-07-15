import { Socket, Server } from "socket.io";

// interface ConnectedUser {
//   userId: string;
//   socketId: string;
//   status: 'online' | 'offline';
// }

// const connectedUsers: ConnectedUser[] = [];

const connectedUsers = new Map<string, string>();

export function registerUserHandlers(socket: Socket, io: Server): void {
  console.log("Registering user handlers");
  socket.on("user-connected", (data) => {
    const userId = data.userId;
    console.log("User connected: ", socket.id, data.userId);
    if (!connectedUsers.has(data.userId))
      connectedUsers.set(data.userId, socket.id);
    console.log("Connected users: ", connectedUsers);
    socket.join(userId);
    console.log("User joined to personal room: ", userId);

    const array = Array.from(connectedUsers.keys());
    io.emit("users-connected", array);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);
    const userId = socket.data.userId;
    for (const [id, sId] of connectedUsers.entries()) {
      if (sId === socket.id) {
        connectedUsers.delete(id);
        break;
      }
    }

    const array = Array.from(connectedUsers.keys());
    io.emit("users-connected", array);
  });
}
