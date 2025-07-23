import { io } from "socket.io-client";
import { v4 as uuid } from "uuid";

const socket = io("http://localhost:3100");

const userId = "df4e539f-4ddc-4ac5-8f22-8f93ccf85aa3"; //Carlos

socket.on("connect", () => {
  socket.on("online-users", (data) => {
    console.log("online-users", data);
  });
  socket.on("active-chats", (data) => {
    console.log("active-chats", data);
  });
  //   socket.on("receive-message", (data) => {
  //     console.log("receive-message", data);
  //   });
  //   socket.on("new-chat", (data) => {
  //     console.log("new-chat", data);
  //   });

  socket.on("notify", (data) => {
    console.log("notify", data);
  });

  socket.emit("user-connected", { userId: userId });

  socket.emit(
    "create-chat",
    {
      userId: userId,
      chat: {
        name: "Test chat 5",
        participantsIds: [
          // "fdb70cf2-5d37-4609-85b6-42607da1d405",
          // "83303737-8ee5-4ba2-b6f4-f19c3f596817",
          userId,
          "61d441ea-7688-46cf-9683-84ad156563f6",
        ],
      },
    },
    (res) => {
      console.log("create-chat", res);
      const chat = res.chat;

      //TODO Redirect to /chat/chatId
      //? This goes into chat page, reading id of chat from path
      socket.emit("join-chat", { chatId: chat.id }, (res) => {
        console.log("join-chat", res);
        //? This is executed every message sending
        const message = {
          id: uuid(),
          content: "This is a message from Carlos to Karla",
          type: "TEXT",
          timestamp: new Date(),
          senderId: userId,
          status: "SENT",
          chatId: chat.id,
        };
        socket.emit("send-message", { message }, (res) => {
          console.log("send-message", res);
        });
      });
    }
  );
});

socket.on("disconnect", () => {
  console.log("Disconnected");
});
