import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  EDITED_BY_ADMIN_CONSTRAINTS,
  EMAIL_CONSTRAINTS,
  NAME_CONSTRAINTS,
  STATUS_CONSTRAINTS,
  TEXT_CONSTRAINTS,
} from '../constraints';

export type TaskDocument = Task & Document;

@Schema({
  timestamps: true,
})
export class Task {
  @Prop(NAME_CONSTRAINTS)
  name: string;

  @Prop(EMAIL_CONSTRAINTS)
  email: string;

  @Prop(TEXT_CONSTRAINTS)
  text: string;

  @Prop(STATUS_CONSTRAINTS)
  status: string;

  @Prop(EDITED_BY_ADMIN_CONSTRAINTS)
  editedByAdmin: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
