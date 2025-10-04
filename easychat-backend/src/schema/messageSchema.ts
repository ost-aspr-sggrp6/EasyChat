import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMessage extends Document {
    room: string;
    user: {
        id: string;
        username: string;
    };
    message: string;
    timestamp: Date;
}

const messageSchema: Schema<IMessage> = new Schema({
    room: {
        type: String,
        required: true
    },   // 👈 NEW
    user: {
        id: { type: String, required: true },
        username: { type: String, required: true }
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const Message: Model<IMessage> =
    mongoose.models.Message || mongoose.model<IMessage>("Message", messageSchema);

export default Message;
