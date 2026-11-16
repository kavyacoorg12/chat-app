import {
  Injectable,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  BadRequestException,
} from '@nestjs/common';
import { DOCUMENT_MESSAGES } from '../../common/constants/document.message.js';

@Injectable()
export class PdfValidationPipe extends ParseFilePipe {
  constructor() {
    super({
      fileIsRequired: true,
      validators: [
        new MaxFileSizeValidator({
          maxSize:  10 * 1024 * 1024,
          message: DOCUMENT_MESSAGES.ERROR.FILE_TOO_LARGE,
        }),
        new FileTypeValidator({
          fileType: 'application/pdf',
        }),
      ],
      exceptionFactory: (error) => {
        if (error.includes('File is required')) {
          return new BadRequestException(DOCUMENT_MESSAGES.ERROR.FILE_REQUIRED);
        }
        if (error.includes('expected type')) {
          return new BadRequestException(DOCUMENT_MESSAGES.ERROR.INVALID_FILE_TYPE);
        }
        return new BadRequestException(error); 
      },
    });
  }
}