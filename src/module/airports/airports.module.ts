import { Module } from '@nestjs/common';
import { AirportsController } from './controllers/airports/airports.controller';
import { AirportsService } from './services/airports/airports.service';

@Module({
  controllers: [AirportsController],
  providers: [AirportsService],
})
export class AirportsModule {}
