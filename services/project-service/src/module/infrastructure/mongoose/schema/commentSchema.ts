import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CommentType } from 'src/module/domaine/entities/comment.entity';

@Schema({ timestamps: true })
export class CommentSchema {
  _id?: any;

  @Prop()
  type: CommentType;

  @Prop({ required: true })
  content: string;

  @Prop({ type: Boolean, required: true, default: true })
  isVisible: boolean;

  @Prop({ type: Types.ObjectId, required: true })
  author: Types.ObjectId;

  @Prop()
  parentComment?: string;

  @Prop({ type: Types.ObjectId, ref: 'Project' })
  projectId?: string;

  @Prop({ type: Types.ObjectId, ref: 'Chapter' })
  chapterId?: string;

  @Prop({
    type: Object,
    default: { likeCount: 0, replyCount: 0, isSolution: false },
  })
  metric: { likeCount: number; replyCount: number; isSolution: boolean };
}

export type CommentDocument = Document & CommentSchema;
export const commentSchema = SchemaFactory.createForClass(CommentSchema);

commentSchema.index(
  { content: 'text', author: 'text' },
  { weights: { author: 7, content: 5 } },
);
