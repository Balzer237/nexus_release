import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class login {
  _id?: any;

  @Prop({ type: Number, default: 0 })
  password: number;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;
}

export type userDocument = login & Document
export const loginSchema = SchemaFactory.createForClass(login)