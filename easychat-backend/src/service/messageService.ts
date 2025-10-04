import MessageModel from "../schema/messageSchema";

export class MessageService {
    async saveMessage(room: string, user: { id: string; username: string }, message: string) {
        const chatMessage = new MessageModel({
            room,
            user,
            message,
            timestamp: new Date(),
        });

        return await chatMessage.save();
    }

    async getRecentMessagesForRoom(room: string, limit = 50) {
        return MessageModel.find({ room })
            .sort({ timestamp: -1 })
            .limit(limit)
            .lean();
    }
}
