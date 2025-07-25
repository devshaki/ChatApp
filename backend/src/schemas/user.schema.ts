import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: [] })
  contacts: string[];

  @Prop({ default: [] })
  chats: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
