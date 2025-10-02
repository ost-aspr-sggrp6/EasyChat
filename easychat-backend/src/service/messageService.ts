import MessageModel from "../schema/messageSchema";

export class MessageService {
    async saveMessage(userId: string, message: string) {
        const chatMessage = new MessageModel({
            userId,
            message,
            timestamp: new Date(),
        });

        return await chatMessage.save();
    }

    async getRecentMessages(limit = 50) {
        return MessageModel.find()
            .sort({timestamp: -1})
            .limit(limit)
            .lean();
    }
}
