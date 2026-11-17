export interface IStorageService {
  upload(file: Express.Multer.File): Promise<StorageUploadResult>;
  download(publicId: string): Promise<Buffer>;
  delete(publicId: string): Promise<void>;
}

export interface StorageUploadResult {
  url: string;
  publicId: string;
}
export const STORAGE_SERVICE = Symbol('STORAGE_SERVICE');
