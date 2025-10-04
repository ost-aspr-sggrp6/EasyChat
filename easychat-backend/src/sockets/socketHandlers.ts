import { Server } from "socket.io";
import { MessageService } from "../service/messageService";

const messageService = new MessageService();

export function registerSocketHandlers(io: Server) {
    io.on("connection", async (socket) => {
        console.log(`🔌 Client verbunden: ${socket.id}`);

        // ---------------------
        // Room wechseln
        // ---------------------
        socket.on("joinRoom", async (context) => {
            const { type, targetId } = context;
            const room = getRoomName(type, targetId);

            console.log(`📥 ${socket.id} joined room ${room}`);
            socket.join(room);

            // Einzelne Chat-History für diesen Raum laden
            const history = await messageService.getRecentMessagesForRoom(room, 50);
            socket.emit("chatHistory", history.reverse());
        });

        socket.on("leaveRoom", (context) => {
            const room = getRoomName(context.type, context.targetId);
            console.log(`📤 ${socket.id} left room ${room}`);
            socket.leave(room);
        });

        // ---------------------
        // Receive & broadcast message
        // ---------------------
        socket.on("chatMessage", async ({ message, type, targetId, user }) => {
            const room = getRoomName(type, targetId);

            const savedMessage = await messageService.saveMessage(
                room,
                user ?? { id: socket.id, username: 'anonymous' }, // ✅ Fallback
                message
            );

            io.to(room).emit("chatMessage", savedMessage);
        });

        // ---------------------
        // History auf Anfrage
        // ---------------------
        socket.on("requestHistory", async ({ type, targetId }) => {
            const room = getRoomName(type, targetId);
            const history = await messageService.getRecentMessagesForRoom(room, 50);
            socket.emit("chatHistory", history.reverse());
        });

        socket.on("disconnect", () => {
            console.log(`❌ Client getrennt: ${socket.id}`);
        });
    });
}

// 👇 Hilfsfunktion – ergibt z.B. "room:broadcast", "room:private", "room:dm:123"
function getRoomName(type: string, targetId: string | null) {
    if (type === "dm") return `room:dm:${targetId}`;
    return `room:${type}`;
}