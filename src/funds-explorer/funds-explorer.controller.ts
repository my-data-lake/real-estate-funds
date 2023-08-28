import { Controller, Get, Param } from '@nestjs/common';
import { FundsExplorerService } from './funds-explorer.service';

@Controller('funds-explorer')
export class FundsExplorerController {
  constructor(private fundsExplorerService: FundsExplorerService) {}

  @Get('funds')
  getFundsList() {
    return this.fundsExplorerService.getFundsList();
  }

  @Get('funds/:ticker')
  downloadFundDetails(@Param('ticker') ticker: string) {
    return this.fundsExplorerService.downloadFundDetails(ticker);
  }
}
