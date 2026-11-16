import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller.js';
import { DocumentService } from './document.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { documentSchema, DocumentSchema } from './schemas/document.schema.js';
import { DOCUMENT_REPOSITORY } from './repositories/document.repository.js';
import { DocumentRepository } from './repositories/mongo-document.repository.js';
import { StorageModule } from '../common/storage/storage.module.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  controllers: [DocumentController],
  imports: [
    MongooseModule.forFeature([
      {
        name: DocumentSchema.name,
        schema: documentSchema,
      },
    ]),
    StorageModule,
    AuthModule,
  ],
  providers: [
    DocumentService,
    {
      provide: DOCUMENT_REPOSITORY,
      useClass: DocumentRepository,
    },
  ],
})
export class DocumentModule {}
