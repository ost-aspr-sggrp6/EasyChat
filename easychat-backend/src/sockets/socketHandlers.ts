import { Server } from "socket.io";

export function registerSocketHandlers(io: Server) {
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
}
