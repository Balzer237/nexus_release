import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MediaType } from 'src/lib/type/mediaType';
import { LevelUser, StateUser } from 'src/module/user/domaine/entities/userEntity';

@Schema({ timestamps: true })
export class userSchemat {
  _id?: any;

  @Prop({ type: Number, default: 0 })
  univerJointNumber: number;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true, default: 0 })
  followerCount: number;

  @Prop({ required: true, default: 0 })
  followingCount: number;

  @Prop({ required: true, default: 0 })
  likeTotalCount: number;

  @Prop({ required: true, default: 0 })
  wiki_partisipation: number;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: String,
    enum: StateUser,
    default: 'ACTIVE',
  })
  state: string;

  @Prop({ type: Object })
  avatar_url?;

  @Prop()
  bio?: string;

  @Prop({ type: [String], default: [] })
  skills: string[];

  @Prop({ enum: LevelUser, default: LevelUser.NOVICE })
  level: LevelUser;

  @Prop({ default: 0 })
  reputation_score: number;

  @Prop({ default: 0 })
  projects_count: number;

  @Prop({ required: true, default: 0 })
  projectActif_count: number;

  @Prop({ default: 0 })
  help_given_count: number;

  @Prop()
  last_login: Date;
}

export type userDocument = Document & userSchemat;
export const userSchema = SchemaFactory.createForClass(userSchemat);
userSchema.index(
  {
    username: 'text',
    email: 'text',
    bio: 'text',
    skills: 'text',
  },
  { weights: { username: 5, email: 5, bio: 4, skills: 4 } },
);
