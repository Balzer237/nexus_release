import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { chapterStatus } from 'src/module/domaine/entities/chapter.entity';

@Schema({ _id: false })
export class statistiqueShapter {
  @Prop({ type: Number, default: 0 })
  commentCount: number;

  @Prop({ type: Number, default: 0 })
  likeCount: number;

  @Prop({ type: Number, default: 0 })
  shareCount: number;

  @Prop({ type: Number, default: 0 })
  viewCount: number;
}
export const stateSchema = SchemaFactory.createForClass(statistiqueShapter);

@Schema({ timestamps: true })
export class ChapterSchema {
  _id?: any;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  project: string;

  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ type: Object, default: { order: 0 } })
  organization: { order: number };

  @Prop({ type: Number, default: 0 })
  MediaCount: number;

  @Prop({ type: stateSchema, default: () => ({}) })
  statistique: statistiqueShapter;

  @Prop({ enum: chapterStatus, default: chapterStatus.DRAFT })
  status: chapterStatus;

  @Prop({ type: Date })
  publichedAt?: Date;
}

export type ChapterDocument = Document & ChapterSchema;
export const chapterSchema = SchemaFactory.createForClass(ChapterSchema);

chapterSchema.index(
  { title: 'text', description: 'text' },
  { weights: { title: 5, description: 4 } },
);
