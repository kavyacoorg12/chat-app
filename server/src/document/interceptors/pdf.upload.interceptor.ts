import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

export const pdfUploadInterceptor = () => 
  FileInterceptor('file', {
    storage: memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  });

