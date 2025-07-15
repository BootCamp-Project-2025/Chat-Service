import express from "express";
import http from "http";
import { SocketIOServer } from "./infrastructure/SocketIOServer";
import { ServerOptions } from "socket.io";

export class Server {
  private app: Express.Application;
  private httpServer: http.Server;
  private socketServer: SocketIOServer;

  constructor(options: ServerOptions) {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.socketServer = new SocketIOServer(this.httpServer, options);
  }

  public start(port: number): void {
    this.httpServer.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  }
}
