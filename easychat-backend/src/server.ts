import * as http from "http";
import app from "./app";
import { Server } from "socket.io";
import { registerSocketHandlers } from "./sockets/socketHandlers";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:4200").split(",");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

registerSocketHandlers(io);

server.listen(PORT, () => {
    console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});