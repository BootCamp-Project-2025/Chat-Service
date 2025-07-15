import { MessageStatus } from "../enums/MessageStatus";
import { MessageType } from "../enums/MessageType";
import Chat from "./Chat";

export default interface Message {
  id?: string;
  content: string;
  type: MessageType;
  timestamp: Date;
  senderId: string;
  receiverId: string;
  status: MessageStatus;
  chatId: string;
  chat?: Chat;
}
