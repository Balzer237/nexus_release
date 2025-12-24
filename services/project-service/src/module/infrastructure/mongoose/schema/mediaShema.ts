import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class MediaSchema {
  _id?: any;

  @Prop({ type: Types.ObjectId, ref: 'Chapter', required: true })
  chapter: string;

  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  project: string;

  @Prop({ type: Types.ObjectId, required: true })
  uploadedBy: Types.ObjectId;

  @Prop()
  filename: string;

  @Prop({ required: true })
  originalName: string;

  @Prop()
  title?: string;

  @Prop()
  description?: string;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: Object })
  dimention?: { width: number; height: number };

  @Prop({ required: true })
  size: number;

  @Prop({ required: true, default: 'docs/file' })
  storagePath: string;

  @Prop()
  duration?: number;

  @Prop()
  thumbnails: string;

  @Prop()
  format: string;
}

export type MediaDocument = Document & MediaSchema;
export const mediaSchema = SchemaFactory.createForClass(MediaSchema);

mediaSchema.index(
  {
    title: 'text',
    description: 'text',
    filename: 'text',
  },
  { weights: { title: 5, description: 4, filename: 3 } },
);
