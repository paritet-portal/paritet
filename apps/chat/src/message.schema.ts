import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true, index: true }) // Добавляем index для sender
  sender: string;

  @Prop({ index: true }) // Добавляем index для roomId
  roomId: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
