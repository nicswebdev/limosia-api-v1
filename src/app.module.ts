import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db';
import { UsersModule } from './module/users/users.module';
import { CarClassModule } from './module/car-class/car-class.module';
import { AirportsModule } from './module/airports/airports.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { CurrenciesModule } from './module/currencies/currencies.module';
import { PriceSchemaModule } from './module/price-schema/price-schema.module';
import { AuthModule } from './module/auth/auth.module';
import { MailModule } from './module/mail/mail.module';
import { OrdersModule } from './module/orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    ThrottlerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ttl: configService.getOrThrow('RATE_TTL'),
        limit: configService.getOrThrow('RATE_LIMIT'),
      }),
      inject: [ConfigService],
    }),
    MulterModule.register({ dest: './public/uploads' }),

    AuthModule,
    UsersModule,
    CarClassModule,
    AirportsModule,
    CurrenciesModule,
    PriceSchemaModule,
    MailModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
