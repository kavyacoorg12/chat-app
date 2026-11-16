import { Injectable } from "@nestjs/common";
import { IDocumentRepository } from "./document.repository.js";
import { InjectModel } from "@nestjs/mongoose";
import { DocumentSchema } from "../schemas/document.schema.js";
import { HydratedDocument, Model, Types } from "mongoose";
import { Document, DocumentStatus } from "../entities/document.entity.js";

type DocumentDoc=HydratedDocument<DocumentSchema>

@Injectable()
export class DocumentRepository implements IDocumentRepository{
  constructor(@InjectModel(DocumentSchema.name)
readonly documentModel:Model<DocumentSchema>
){}
  
async create(data: Omit<Document, "id" | "createdAt" | "updatedAt">): Promise<Document> {
  const doc=await this.documentModel.create(data)
  return this.map(doc)
}

async findById(id: string): Promise<Document | null> {
  const doc=await this.documentModel.findById(id)
  return doc?this.map(doc):null
}

async findByUserId(userId: string): Promise<Document[]> {
  const docs=await this.documentModel.find({userId:new Types.ObjectId(userId)})
  return docs.map((doc)=>this.map(doc))
}

async updateStatus(id: string, status: DocumentStatus): Promise<Document | null> {
  const doc=await this.documentModel.findByIdAndUpdate(id,{status},{new:true,runValidators:true})
  return doc?this.map(doc):null
}

private map(doc:DocumentDoc):Document
{
  return{
    id:doc._id.toString(),
    originalName:doc.originalName,
    fileName:doc.fileName,
    mimeType:doc.mimeType,
    size:doc.size,
    storagePath:doc.storagePath,
    userId:doc.userId.toString(),
    status:doc.status,
    createdAt:doc.createdAt,
    updatedAt:doc.updatedAt
  }
}
}