import { Module } from '@nestjs/common';
import { CarClassController } from './controllers/car-class/car-class.controller';
import { CarClassService } from './services/car-class/car-class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarClass } from '@/db/models';
import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([CarClass]), UsersModule, MailModule],
  controllers: [CarClassController],
  providers: [CarClassService],
})
export class CarClassModule {}
