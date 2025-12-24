import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { LevelUser } from 'src/lib/type';
import { ParticipantStatus, ParticipentType } from 'src/module/domaine/entities/participantEntity';

@Schema({ _id: false })
class activitySchema {
  @Prop({ default: 0 })
  postCount: number;
  @Prop({ default: 0 })
  projectCount: number;
  @Prop({ default: 0 })
  chapterCount: number;
  @Prop({ default: 0 })
  wikiEditCount: number;
}
const ActivitySchema = SchemaFactory.createForClass(activitySchema);

@Schema({ timestamps: true })
export class Participant {
  @Prop({ type: Types.ObjectId, required: true })
  univerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({
    type: String,
    enum: ParticipentType,
    required: true,
    default: ParticipentType.MEMBER,
  })
  type: ParticipentType;

  @Prop({
    required: true,
    type: String,
    enum: LevelUser,
    default: LevelUser.NOVICE,
  })
  level: LevelUser;

  @Prop({
    type: String,
    enum: ParticipantStatus,
    default: ParticipantStatus.ACTIF,
    required: true,
  })
  status: ParticipantStatus;

  @Prop({ default: 0 })
  reputationPoint: number;

  @Prop({ default: new Date() })
  lastActivity: Date;

  @Prop({ type: ActivitySchema, default: () => ({}) })
  activity: activitySchema;
}

export type ParticipantDocument = Document & Participant;
export const ParticipantSchema = SchemaFactory.createForClass(Participant);
