import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { load } from 'cheerio';

@Injectable()
export class ScraperService {
  constructor(private http: HttpService) {}

  async getFundsListPage() {
    const response = await firstValueFrom(this.http.get<string>('funds'));
    return response.data;
  }

  async getFundDetailsPage(ticker: string) {
    const response = await firstValueFrom(
      this.http.get<string>(`funds/${ticker}`),
    );
    return response.data;
  }

  parseFundsListPage(html: string) {
    const $ = load(html);
    return $('.tickerFilter__results')
      .find('a.tickerBox__link_ticker')
      .toArray()
      .map((element) => {
        const text = $(element).text();
        return text.trim();
      });
  }
}
