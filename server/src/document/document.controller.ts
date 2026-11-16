import { Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { DocumentService } from './document.service.js';
import { pdfUploadInterceptor } from './interceptors/pdf.upload.interceptor.js';
import { PdfValidationPipe } from './pipes/pdf-validation.pipe.js';
import { Request } from 'express';
import { DOCUMENT_MESSAGES } from '../common/constants/document.message.js';

@Controller('document')
@UseGuards(JwtAuthGuard)
export class DocumentController {
  constructor(private readonly documentService:DocumentService){}
  @Post('upload')
  @UseInterceptors(pdfUploadInterceptor())
  async uploadDocument(
    @UploadedFile(PdfValidationPipe) file:Express.Multer.File,
    @Req() req:Request &{user:{id:string}}
  ){
   await this.documentService.uploadDocument(file,req.user.id)
   return {messege:DOCUMENT_MESSAGES.SUCCESS.UPLOADED}
  }
}
