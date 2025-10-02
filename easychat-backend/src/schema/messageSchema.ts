import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMessage extends Document {
    userId: string;
    message: string;
    timestamp: Date;
}

const messageSchema: Schema<IMessage> = new Schema({
    userId: {
        type: String,
        required: true,
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
