import { Module } from '@nestjs/common';
import { StorageModule } from 'src/storage/storage.module';
import { FundsExplorerController } from './funds-explorer.controller';
import { FundsExplorerService } from './funds-explorer.service';
import { ScraperModule } from './scraper/scraper.module';

@Module({
  controllers: [FundsExplorerController],
  providers: [FundsExplorerService],
  imports: [ScraperModule, StorageModule],
})
export class FundsExplorerModule {}
