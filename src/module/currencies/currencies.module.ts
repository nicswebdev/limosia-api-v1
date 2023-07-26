import { Module } from '@nestjs/common';
import { CurrenciesController } from './controllers/currencies/currencies.controller';
import { CurrenciesService } from './services/currencies/currencies.service';

@Module({
  controllers: [CurrenciesController],
  providers: [CurrenciesService]
})
export class CurrenciesModule {}
