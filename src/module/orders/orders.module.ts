import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders/orders.controller';
import { OrdersService } from './services/orders/orders.service';
import { Order, OrderStatus, PaymentStatus } from '@/db/models';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { OrderStatusesController } from './controllers/order-statuses/order-statuses.controller';
import { OrderStatusesService } from './services/order-statuses/order-statuses.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderStatus, PaymentStatus]),
    UsersModule,
  ],
  controllers: [
    OrdersController,
    OrderStatusesController,
  ],
  providers: [OrdersService, OrderStatusesService],
})
export class OrdersModule {}
