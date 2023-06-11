import { Injectable } from '@nestjs/common';
import { ScraperService } from './scraper/scraper.service';
import { PathBuilder } from '../utils/path-builder';
import { StorageService } from 'src/storage/interfaces/storage-service';
import { RAW_ZONE_BUCKET } from 'src/config/env';

@Injectable()
export class FundsExplorerService {
  constructor(
    private scraperService: ScraperService,
    private storageService: StorageService,
  ) {}

  async getFundsList() {
    const pageHtml = await this.scraperService.getFundsListPage();
    const tickers = this.scraperService.parseFundsListPage(pageHtml);
    if (tickers.length === 0) {
      throw new Error('Not found');
    }
    return tickers;
  }

  async downloadFundDetails(ticker: string) {
    const now = new Date();
    const pageHtml = await this.scraperService.getFundDetailsPage(ticker);
    const path = new PathBuilder()
      .add(
        'external',
        'investments',
        'real-estate-funds',
        'funds-explorer',
        'funds-data',
      )
      .addDateDirs(now)
      .add(ticker)
      .add(`${now.getTime()}.html`)
      .getPath();
    await this.storageService.upload(pageHtml, {
      bucket: RAW_ZONE_BUCKET,
      path,
    });
    return path;
  }
}
