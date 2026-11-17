import { Controller, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { DocumentService } from './document.service.js';
import { pdfUploadInterceptor } from './interceptors/pdf.upload.interceptor.js';
import { PdfValidationPipe } from './pipes/pdf-validation.pipe.js';
import { Request } from 'express';
import { DOCUMENT_MESSAGES } from '../common/constants/document.message.js';
import { DocumentProcessingService } from './services/document-processing.service.js';

@Controller('document')
@UseGuards(JwtAuthGuard)
export class DocumentController {
  constructor(private readonly documentService:DocumentService,private readonly documentProcessingService:DocumentProcessingService){}
  @Post('upload')
  @UseInterceptors(pdfUploadInterceptor())
  async uploadDocument(
    @UploadedFile(PdfValidationPipe) file:Express.Multer.File,
    @Req() req:Request &{user:{id:string}}
  ){
   await this.documentService.uploadDocument(file,req.user.id)
   return {messege:DOCUMENT_MESSAGES.SUCCESS.UPLOADED}
  }
  @Post(':documentId/process')
async processDocument(
  @Param('documentId') documentId: string,
  @Req() req: Request & { user: { id: string } },
) {
  const text =
    await this.documentProcessingService.extractDocumentText(
      documentId,
      req.user.id,
    );

  return {
    message: 'PDF text extracted successfully',
    extractedText: text,
  };
}
}
