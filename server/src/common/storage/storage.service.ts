import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

import {
  IStorageService,
  StorageUploadResult,
} from './interface/IStorageService.js';

@Injectable()
export class StorageService implements IStorageService {

  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.getOrThrow(
        'cloudinary.cloudinary_cloud_name',
      ),
      api_key: this.configService.getOrThrow(
        'cloudinary.cloudinary_api_key',
      ),
      api_secret: this.configService.getOrThrow(
        'cloudinary.cloudinary_api_secret',
      ),
    });
  }

  async upload(file: Express.Multer.File): Promise<StorageUploadResult> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          folder: 'rag-documents',
        },
        (error, result) => {
          if (error) return reject(error);

          if (!result) {
            return reject(new Error('Cloudinary upload returned no result'));
          }

          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        },
      );

      uploadStream.end(file.buffer);
    });
  }

  async delete(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: 'raw',
    });
  }
}