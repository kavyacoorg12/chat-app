import { Injectable } from '@nestjs/common';
import { PDFParse } from 'pdf-parse';

@Injectable()
export class PdfExtractionService {
  async extractText(fileBuffer: Buffer): Promise<string> {
    const parser = new PDFParse({
      data: fileBuffer,
    });

    try {
      const result = await parser.getText();

      return result.text.trim();
    } finally {
      await parser.destroy();
    }
  }
}
