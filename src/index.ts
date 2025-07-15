import { configDotenv } from "dotenv";
configDotenv();

import "reflect-metadata";
import "./config/di-container";

import { Server } from "./server";
import { CorsOptions } from "cors";
import { ServerOptions } from "socket.io";

const SERVER_PORT = Number(process.env.SERVER_PORT) || 3100;
const corsOptions: CorsOptions = {
  origin: "*",
  methods: "*",
};

const serverOptions: ServerOptions = { cors: corsOptions } as ServerOptions;

const server = new Server(serverOptions);

server.start(SERVER_PORT);
