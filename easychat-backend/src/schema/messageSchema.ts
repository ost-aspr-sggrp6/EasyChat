import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMessage extends Document {
  message: string;
}

const messageSchema: Schema<IMessage> = new Schema({
  message: {
    type: String,
    required: true,
  },
});

const Message: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", messageSchema);

export default Message;
