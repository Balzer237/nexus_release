import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { stateCollaboration } from 'src/module/domaine/entities/collaboration.entity';
import { CollaboratorRole } from 'src/module/domaine/entities/projectEntity';

@Schema({ timestamps: true })
export class collaborationSchema {
  _id?: any;

  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  projectId: string;

  @Prop({ type: Types.ObjectId, required: true })
  senderId: Types.ObjectId;

  @Prop({
    type: String,
    enum: CollaboratorRole,
    required: true,
    default: CollaboratorRole.READER,
  })
  role: CollaboratorRole;

  @Prop({
    type: String,
    enum: Object.values(stateCollaboration),
    default: stateCollaboration.PENDING,
  })
  status: stateCollaboration;

  @Prop({ type: Types.ObjectId, required: true })
  receiverId: Types.ObjectId;

  @Prop({ required: true, default: new Date() })
  invitedAt: Date;

  @Prop({ default: null })
  respondedAt?: Date;

  @Prop({ default: new Date().setDate(new Date().getDate() + 7) })
  expiredAt?: Date;
}

export type CollaborationDocument = Document & collaborationSchema;
export const CollaborationSchema =
  SchemaFactory.createForClass(collaborationSchema);
