import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class likeSchema {
  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ type: String })
  commentId?: string;

  @Prop({ type: String })
  projectId?: string;

  @Prop({ type: String })
  chapterId?: string;
}
export type LikeDocument = Document & likeSchema;
export const LikeSchema = SchemaFactory.createForClass(likeSchema);
