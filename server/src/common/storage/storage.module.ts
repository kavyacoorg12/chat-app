import { Module } from '@nestjs/common';
import { StorageService } from './storage.service.js';
import { STORAGE_SERVICE } from './interface/IStorageService.js';

@Module({
  providers: [
    {
      provide: STORAGE_SERVICE,
      useClass: StorageService,
    },
  ],
  exports: [STORAGE_SERVICE],
})
export class StorageModule {}
