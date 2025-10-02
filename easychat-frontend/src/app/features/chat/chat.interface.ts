export interface ChatMessage {
  _id?: string;       // kommt von MongoDB
  userId: string;
  message: string;
  timestamp: string;  // als ISO-String von MongoDB
}
