import { Module } from '@nestjs/common';
import { AirportsController } from './controllers/airports/airports.controller';
import { AirportsService } from './services/airports/airports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airports } from '@/db/models';

@Module({
  imports: [TypeOrmModule.forFeature([Airports])],
  controllers: [AirportsController],
  providers: [AirportsService],
})
export class AirportsModule {}
