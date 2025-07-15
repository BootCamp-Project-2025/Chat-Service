import { Socket, Server } from "socket.io";

export function registerChatHandlers(socket: Socket, io: Server): void {
  console.log("Registering chat handlers");
  socket.on("create-chat", (data) => {
    console.log("create-chat");
  });

  socket.on("join-chat", (data) => {
    console.log("join-chat: ", data);
    const chatId = data.chatId;
    socket.join(chatId);
  });

  socket.on("exit-chat", (data) => {
    console.log("exit-chat: ", data);
    const chatId = data.chatId;
    socket.leave(chatId);
  });
}
