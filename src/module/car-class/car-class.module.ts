import { Module } from '@nestjs/common';
import { CarClassController } from './controllers/car-class/car-class.controller';
import { CarClassService } from './services/car-class/car-class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarClass } from '@/db/models';

@Module({
  imports: [TypeOrmModule.forFeature([CarClass])],
  controllers: [CarClassController],
  providers: [CarClassService],
})
export class CarClassModule {}
