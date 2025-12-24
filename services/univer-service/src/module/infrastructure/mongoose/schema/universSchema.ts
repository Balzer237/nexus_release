import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { LevelUser, MediaType } from 'src/lib/type';
import { univerStatus, UniverVisibility } from 'src/module/domaine/entities/universEntiy';

@Schema({ _id: false })
class state {
  @Prop({ type: Number, default: 0 })
  numberOfMember: number;

  @Prop({ type: Number, default: 0 })
  numberOfProject: number;

  @Prop({ type: Number, default: 0 })
  numberOfModerator: number;

  @Prop({ type: Number, default: 0 })
  numberOfExpert: number;

  @Prop({ type: Number, default: 0 })
  mediaCount: number;
}
const stateSchema = SchemaFactory.createForClass(state);

@Schema({ _id: false })
class rule {
  @Prop()
  codeOfConduct: string;

  @Prop({
    type: String,
    enum: Object.values(LevelUser),
    required: true,
    default: LevelUser.NOVICE,
  })
  expertiseLevelREquired: LevelUser;
}
const ruleSchema = SchemaFactory.createForClass(rule);

@Schema({ timestamps: true })
export class universSchema {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Object, default: () => ({}) })
  logo: any;

  @Prop({ type: Object, default: () => ({}) })
  baner: any;

  @Prop({
    type: String,
    enum: Object.values(univerStatus),
    default: univerStatus.ACTIF,
  })
  status: univerStatus;

  @Prop({
    type: String,
    enum: Object.values(UniverVisibility),
    default: UniverVisibility.PUBLIC,
  })
  visibility: UniverVisibility;

  @Prop({ type: Types.ObjectId, required: true })
  createdBy: string;

  @Prop({ type: stateSchema, default: () => ({}) })
  state: state;

  @Prop({ default: new Date() })
  lastActivityAt: Date;

  @Prop({ type: ruleSchema, default: () => ({}) })
  rules: rule;
}

export type UniverDocumen = Document & universSchema;
export const UniversSchema = SchemaFactory.createForClass(universSchema);
UniversSchema.index(
  {
    name: 'text',
    description: 'text',
    'rules.expertiseLevelREquired': 'text',
  },
  {
    weights: { name: 5, description: 3, 'rules.expertiseLevelREquired': 2 },
  },
);
