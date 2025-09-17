import * as http from "http";
import app from "./app";
import { Server } from "socket.io";

const PORT = process.env.PORT || 3000;

// Express in HTTP-Server wrappen
const server = http.createServer(app);

// Socket.IO Server an HTTP binden
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200", // Angular/React/Vue Dev Server
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Verbindung herstellen
io.on("connection", (socket) => {
  console.log(`🔌 Client verbunden: ${socket.id}`);

  // Nachricht vom Client empfangen
  socket.on("chatMessage", (msg) => {
    console.log(`📩 Nachricht erhalten: ${msg}`);

    // Nachricht an alle Clients senden
    io.emit("chatMessage", msg);
  });

  // Bei Disconnect
  socket.on("disconnect", () => {
    console.log(`❌ Client getrennt: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});
