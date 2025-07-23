import "reflect-metadata";
import { container } from "tsyringe";
import { Socket, Server } from "socket.io";
import { ApiClient } from "../http/ApiClient";

const apiClient = container.resolve(ApiClient);

export function registerChatHandlers(socket: Socket, io: Server): void {
  console.log("Registering chat handlers");

  socket.on("active-chats", (data, callback) => {
    console.log("active-chats", data);
    const userId = data.userId;
    apiClient
      .get(`/users/${userId}/chats`)
      .then((res) => res.data)
      .then((chats) => {
        console.log("active-chats ", chats);
        callback({ chats });
      });
  });

  socket.on("create-chat", (data, callback) => {
    console.log("create-chat", data);
    const chat = data.chat;
    const userId = data.userId;
    if (chat) {
      apiClient
        .post("/chats", chat)
        .then((res) => res.data)
        .then((chat) => {
          console.log(chat);
          callback({ chat });
          io.to(chat.participantsIds.filter((id: string) => id != userId)).emit(
            "notify",
            { title: "New chat", code: "new-chat", data: { chat } }
          );
        });
    }
  });

  socket.on("join-chat", (data, callback) => {
    console.log("join-chat: ", data);
    const chatId = data.chatId;
    const userId = data.userId;
    apiClient
      .put(`/chats/${chatId}/users/${userId}/messages/status`, null)
      .then((res) => {
        console.log("update-messages-status", { chatId, userId });
        io.to(chatId).emit("update-messages-status", { chatId, userId });
      });
    apiClient
      .get(`/chats/${chatId}`)
      .then((res) => res.data)
      .then((chat) => {
        socket.join(chatId);
        callback({ chat });
      });
  });

  socket.on("leave-chat", (data) => {
    console.log("leave-chat: ", data);
    const chatId = data.chatId;
    socket.leave(chatId);
  });
}
