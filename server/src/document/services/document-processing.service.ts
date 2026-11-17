import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  DOCUMENT_REPOSITORY,
  type IDocumentRepository,
} from '../repositories/document.repository.js';
import {
  STORAGE_SERVICE,
  type IStorageService,
} from '../../common/storage/interface/IStorageService.js';
import { PdfExtractionService } from './pdf-extraction.service.js';
import { DocumentStatus } from '../entities/document.entity.js';
import { DOCUMENT_MESSAGES } from '../../common/constants/document.message.js';

@Injectable()
export class DocumentProcessingService {
  constructor(
    @Inject(DOCUMENT_REPOSITORY)
    private readonly documentRepository: IDocumentRepository,

    @Inject(STORAGE_SERVICE)
    private readonly storageService: IStorageService,

    private readonly pdfExtractionService: PdfExtractionService,
  ) {}

  async extractDocumentText(
    documentId: string,
    userId: string,
  ): Promise<string> {
    const document = await this.documentRepository.findById(documentId);

    if (!document) {
      throw new NotFoundException(DOCUMENT_MESSAGES.ERROR.NOT_FOUND);
    }

    if (document.userId !== userId) {
      throw new ForbiddenException(DOCUMENT_MESSAGES.ERROR.CANNOT_ACCESS);
    }

    await this.documentRepository.updateStatus(
      documentId,
      DocumentStatus.PROCESSING,
    );

    try {
      const buffer = await this.storageService.download(document.publicId);

      const extractedText = await this.pdfExtractionService.extractText(buffer);

      if (!extractedText) {
        throw new BadRequestException(DOCUMENT_MESSAGES.ERROR.NO_TEXT_FOUND);
      }

      return extractedText;
    } catch (error) {
      await this.documentRepository.updateStatus(
        documentId,
        DocumentStatus.FAILED,
      );

      throw error;
    }
  }
}
