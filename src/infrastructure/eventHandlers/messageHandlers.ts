import { Server, Socket } from "socket.io";
import MessageDto from "../../application/dto/MessageDTO";

export function registerMessageHandlers(socket: Socket, io: Server): void {
  console.log("Registering message handlers");
  socket.on("send-message", (data) => {
    console.log("send-message ", data);
    const message = data.message as MessageDto;
    socket.to(message.chatId).emit("receive-message", message);
    console.log(
      `Message sent from: ${message.senderId} to chat: ${message.chatId}`
    );
  });
}
