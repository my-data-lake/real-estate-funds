import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BASE_URL } from '../constants/funds-explorer-urls';
import { ScraperService } from './scraper.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: BASE_URL,
    }),
  ],
  providers: [ScraperService],
  exports: [ScraperService],
})
export class ScraperModule {}
