import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { OrderStatus } from '../models';

export default class CreateOrderStatusesSeeder implements Seeder {
  track = true;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const orderStatusRepository = dataSource.getRepository(OrderStatus);

    const orders: Omit<
      OrderStatus,
      'id' | 'created_at' | 'updated_at' | 'order' | 'delete_row'
    >[] = [
      {
        name: 'Payment Pending',
        description: null,
      },
      {
        name: 'Payment Completed',
        description: null,
      },
      {
        name: 'Payment Refunded',
        description: null,
      },
      {
        name: 'Payment Denied',
        description: null,
      },
      {
        name: 'Booking Confirmed',
        description: null,
      },
      {
        name: 'In Progress',
        description: null,
      },
      {
        name: 'Completed',
        description: null,
      },
      {
        name: 'Cancelled',
        description: null,
      },
      {
        name: 'Refunded',
        description: null,
      },
      {
        name: 'Expired',
        description: null,
      },
    ];

    const newOrders = orderStatusRepository.create(orders);
    await orderStatusRepository.save(newOrders);
  }
}
