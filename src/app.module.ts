import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FundsExplorerModule } from './funds-explorer/funds-explorer.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [FundsExplorerModule, StorageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
