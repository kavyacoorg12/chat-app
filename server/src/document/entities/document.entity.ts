export enum DocumentStatus {
  UPLOADED = 'uploaded',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface Document {
  id: string;
  originalName: string;
  fileName: string;
  mimeType: string;
  size: number;
  storagePath: string;
  publicId:string,
  userId: string;
  status: DocumentStatus;
  createdAt: Date;
  updatedAt: Date;
}