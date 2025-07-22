import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop()
  body: string;

  @Prop()
  senderId: string;
  @Prop()
  chatId: string;

  @Prop({ default: Date.now, expires: 10 })
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
