import { Inject, Injectable } from '@nestjs/common';
import {
  DOCUMENT_REPOSITORY,
  type IDocumentRepository,
} from './repositories/document.repository.js';
import {
  type IStorageService,
  STORAGE_SERVICE,
} from '../common/storage/interface/IStorageService.js';
import { DocumentStatus } from './entities/document.entity.js';

@Injectable()
export class DocumentService {
  constructor(
    @Inject(DOCUMENT_REPOSITORY)
    private readonly documentRepository: IDocumentRepository,
    @Inject(STORAGE_SERVICE) private readonly storageService: IStorageService,
  ) {}
  async uploadDocument(file: Express.Multer.File, userId: string) {
    const uploaded = await this.storageService.upload(file);
    try {
      const fileName = `${crypto.randomUUID()}.pdf`;

      const document = await this.documentRepository.create({
        originalName: file.originalname,
        fileName,
        mimeType: file.mimetype,
        size: file.size,
        storagePath: uploaded.url,
        publicId: uploaded.publicId,
        userId,
        status: DocumentStatus.UPLOADED,
      });
    } catch (error) {
      await this.storageService.delete(uploaded.publicId);
      throw error;
    }
  }
}
