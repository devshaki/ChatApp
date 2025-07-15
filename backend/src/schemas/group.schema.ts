import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GroupDocument = HydratedDocument<Group>;

@Schema()
export class Group {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  isDm: boolean;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
