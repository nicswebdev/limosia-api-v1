import { Module } from '@nestjs/common';
import { PriceSchemaController } from './controllers/price-schema/price-schema.controller';
import { PriceSchemaService } from './services/price-schema/price-schema.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceSchema } from '@/db/models';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([PriceSchema]), UsersModule],
  controllers: [PriceSchemaController],
  providers: [PriceSchemaService],
})
export class PriceSchemaModule {}
