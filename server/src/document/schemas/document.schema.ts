import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { DocumentStatus } from '../entities/document.entity.js';

@Schema({ timestamps: true })
export class DocumentSchema {
  @Prop({ required: true })
  originalName: string;
  @Prop({ required: true })
  fileName: string;
  @Prop({ required: true })
  mimeType: string;
  @Prop({ required: true })
  size: number;
  @Prop({ required: true })
  storagePath: string;
  @Prop({ required: true })
  publicId: string;
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;
  @Prop({
    required: true,
    enum: DocumentStatus,
    default: DocumentStatus.UPLOADED,
  })
  status: DocumentStatus;
  createdAt!: Date;
  updatedAt!: Date;
}

export const documentSchema = SchemaFactory.createForClass(DocumentSchema);
