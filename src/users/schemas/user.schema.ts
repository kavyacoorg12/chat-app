import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps:true})
export class UserSchema{
  @Prop({
    unique:true,
    required:true,
    lowercase:true,
    trim:true
  })
  email:string
  @Prop({
    required:true
  })
  password:string
  createdAt!:Date
  updatedAt!:Date
}

export const userSchema = SchemaFactory.createForClass(UserSchema);