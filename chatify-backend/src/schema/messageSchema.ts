import mongoose, { Schema, Document, Model } from "mongoose";

// Interface für Message-Dokument
export interface IMessage extends Document {
  message: string;
}

// Schema-Definition
const messageSchema: Schema<IMessage> = new Schema({
  message: {
    type: String,
    required: true,
  },
});

// Model erstellen (oder vorhandenes verwenden)
const Message: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", messageSchema);

export default Message;
