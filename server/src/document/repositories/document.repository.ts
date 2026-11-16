import { Document, DocumentStatus } from "../entities/document.entity.js";

export interface IDocumentRepository{
  create(data:Omit<Document,'id'|'createdAt'|'updatedAt'>):Promise<Document>
  findById(id:string):Promise<Document|null>
  findByUserId(userId:string):Promise<Document[]>
  updateStatus(id:string,status:DocumentStatus):Promise<Document|null>
}

export const DOCUMENT_REPOSITORY=Symbol('DOCUMENT_REPOSITORY')