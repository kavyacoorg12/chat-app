import { Inject, Injectable } from '@nestjs/common';
import { DOCUMENT_REPOSITORY, type IDocumentRepository } from './repositories/document.repository.js';

@Injectable()
export class DocumentService {
  constructor(@Inject(DOCUMENT_REPOSITORY) private readonly documentRepository:IDocumentRepository){}
}
