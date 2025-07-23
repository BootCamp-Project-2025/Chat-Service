import { CorsOptions } from "cors";
import http from "http";
import { Server, ServerOptions } from "socket.io";
import { registerChatHandlers } from "./eventHandlers/chatHandlers";
import { registerMessageHandlers } from "./eventHandlers/messageHandlers";
import { registerUserHandlers } from "./eventHandlers/userHandlers";

export class SocketIOServer {
  private io: Server;

  constructor(httpServer: http.Server, options: ServerOptions) {
    this.io = new Server(httpServer, options);
    this.registerEventHandlers();
  }

  private registerEventHandlers(): void {
    // console.log("Registering event handlers ", this.io);
    this.io.on("connection", (socket) => {
      console.log("New connection: ", socket.id);
      registerChatHandlers(socket, this.io);
      registerMessageHandlers(socket, this.io);
      registerUserHandlers(socket, this.io);
    });
  }
}
