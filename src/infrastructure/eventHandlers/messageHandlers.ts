import "reflect-metadata";
import { container } from "tsyringe";
import { Socket, Server } from "socket.io";
import { ApiClient } from "../http/ApiClient";
import MessageDto from "../../application/dto/MessageDTO";

const apiClient = container.resolve(ApiClient);

export function registerMessageHandlers(socket: Socket, io: Server): void {
  console.log("Registering message handlers");
  socket.on("send-message", (data, callback) => {
    console.log("send-message ", data);
    const message = data.message;
    apiClient
      .post(`/chats/${message.chatId}/messages`, message)
      .then((res) => res.data)
      .then((message) => {
        callback({ message });
        console.log(`receive-message to room: ${message.chatId}`, message);
        io.to(message.senderId).emit("notify", {
          title: "Saved message",
          code: "saved-message",
          data: { message },
        });
        socket.to(message.chatId).emit("receive-message", { message });
        socket.to(message.receiversIds).emit("notify", {
          title: "New message",
          code: "new-message",
          data: { message },
        });
      });

    console.log(
      `Message sent from: ${message.senderId} to chat: ${message.chatId}`
    );
  });

  socket.on("update-messages-status", (data) => {
    const chatId = data.chatId;
    const userId = data.userId;
    console.log("update-messages-status", data);

    apiClient
      .put(`/chats/${chatId}/users/${userId}/messages/status`, null)
      .then((res) => {
        console.log("update-messages-status", { chatId, userId });
        io.to(chatId).emit("update-messages-status", { chatId, userId });
      });
  });
}
