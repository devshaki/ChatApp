export interface MessageDto{
  body: string;
  senderId?: string;
  chatId: string;
  createdAt?:Date;
}
