import { Server } from "socket.io";
import { MessageService } from "../service/messageService";

const messageService = new MessageService();

export function registerSocketHandlers(io: Server) {
    io.on("connection", async (socket) => {
        console.log(`🔌 Client verbunden: ${socket.id}`);

        // Letzte Nachrichten laden (z. B. 50)
        const history = await messageService.getRecentMessages(50);

        // Da nach -1 sortiert, müssen wir umdrehen, damit älteste zuerst stehen
        socket.emit("chatHistory", history.reverse());

        socket.on("chatMessage", async (msg: string) => {
            const savedMessage = await messageService.saveMessage(socket.id, msg);

            io.emit("chatMessage", savedMessage);
        });

        socket.on("disconnect", () => {
            console.log(`❌ Client getrennt: ${socket.id}`);
        });
    });
}
