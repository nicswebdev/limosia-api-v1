import { Module } from '@nestjs/common';
import { CurrenciesController } from './controllers/currencies/currencies.controller';
import { CurrenciesService } from './services/currencies/currencies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currency } from '@/db/models';

@Module({
  imports: [TypeOrmModule.forFeature([Currency])],
  controllers: [CurrenciesController],
  providers: [CurrenciesService],
})
export class CurrenciesModule {}
