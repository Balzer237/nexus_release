import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { stateSchema, statistiqueShapter } from './chapterSchema';
import { MediaType } from 'express';
import { ProjectDifficulty, StatusProject, Visibility } from 'src/module/domaine/entities/projectEntity';

@Schema({ _id: false })
export class UserSchema {
  @Prop({ type: Types.ObjectId })
  user: string;

  @Prop()
  role: string;

  @Prop()
  joinedAt: Date;
}
const uSchema = SchemaFactory.createForClass(UserSchema);

@Schema({ timestamps: true })
export class ProjectSchema {
  _id?: any;

  @Prop({ required: true })
  title: string;

  @Prop({ type: stateSchema, default: () => ({}) })
  statistique: statistiqueShapter;

  @Prop()
  description?: string;

  @Prop({ type: Types.ObjectId, required: true })
  Author: Types.ObjectId; // Partcipant ID

  @Prop({ type: Object, default: () => ({}) })
  baniere: any;

  @Prop({
    type: String,
    enum: Object.values(Visibility),
    default: Visibility.PUBLIC,
  })
  visibility: Visibility;

  @Prop({ type: Types.ObjectId, ref: 'Univers', required: true })
  univer: string; // Univer ID

  @Prop({
    type: String,
    enum: Object.values(ProjectDifficulty),
    default: ProjectDifficulty.BEGINNER,
  })
  dificulty: ProjectDifficulty;

  @Prop({
    type: String,
    enum: Object.values(StatusProject),
    default: StatusProject.IDEA,
  })
  status: StatusProject;

  @Prop({
    type: [
      {
        type: uSchema,
      },
    ],
    default: [],
  })
  collaborators: UserSchema[];

  @Prop({ default: 0 })
  chapterCount: number;

  @Prop({ default: 0 })
  completionRate: number;

  @Prop({ default: 0 })
  gallery: number;

  @Prop()
  completAt?: Date;

  @Prop({ type: Object, default: { allowedCollabararo: 0 } })
  setting: { allowedCollabararo: number };
}

export type ProjectDocument = Document & ProjectSchema;
export const projectSchema = SchemaFactory.createForClass(ProjectSchema);

projectSchema.index(
  { title: 'text', description: 'text' },
  { weights: { title: 5, description: 3 } },
);
