import { Module } from '@nestjs/common';
import { GcloudStorageService } from './gcloud-storage.service';
import { StorageService } from './interfaces/storage-service';

const storageProvider = {
  provide: StorageService,
  useClass: GcloudStorageService,
};

@Module({
  exports: [storageProvider],
  providers: [storageProvider],
})
export class StorageModule {}
