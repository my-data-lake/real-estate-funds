import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { StorageService } from './interfaces/storage-service';

@Injectable()
export class GcloudStorageService implements StorageService {
  private storage: Storage;
  constructor() {
    this.storage = new Storage();
  }

  async upload(
    fileContent: Buffer | string,
    destination: { bucket: string; path: string },
  ): Promise<void> {
    const bucket = this.storage.bucket(destination.bucket);
    const file = bucket.file(destination.path);
    await file.save(fileContent);
  }
}
