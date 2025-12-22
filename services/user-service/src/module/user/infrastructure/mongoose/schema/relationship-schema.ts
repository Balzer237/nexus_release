import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class relationship {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  follower: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  following: string;
}

export type RelationshipDocument = Document & relationship;
export const RelationshipSchema = SchemaFactory.createForClass(relationship);
