import Chat from "./Chat";
import Message from "./Message";

export default interface User {
  id?: string;
  socketId?: string;
  sentMessages: Message[];
  receivedMessages: Message[];
  chats: Chat[];
}
