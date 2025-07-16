import { ChatStatus } from "../enums/ChatStatus";
import Message from "./Message";
import User from "./User";

export default interface Chat {
  id?: string;
  name?: string;
  messages: Message[];
  participansIds: string[];
  participants?: User[];
  createdAt?: Date;
  status: ChatStatus;
}
