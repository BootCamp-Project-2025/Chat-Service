import { MessageStatus } from "../../domain/enums/MessageStatus";
import { MessageType } from "../../domain/enums/MessageType";

export default interface MessageDto {
  content: string;
  type: MessageType;
  timestamp: Date;
  senderId: string;
  receiverId?: string[];
  status: MessageStatus;
  chatId: string;
}
