import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Order } from '../models';

export default class CreateOrdersSeeder implements Seeder {
  track = true;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const orderRepository = dataSource.getRepository(Order);

    const orders = [
      {
        user_id: 1,
        order_no: 'LIM982147OS',
        f_name: 'Super',
        l_name: 'Admin',
        email: 'super@admin.com',
        phone: 'string',
        dob: '2023-08-15',
        address: 'string',
        city: 'string',
        state: 'string',
        zip_code: 'string',
        pickup_point: 'string',
        destination_point: 'string',
        pickup_date: '2023-08-15',
        pickup_time: '14:26:00',
        flight_number: 'AA7791',
        total_guest: 5,
        total_suitcase: 7,
        car_class_name: 'Sedan',
        airport_name: 'Changi Airport',
        range: 70,
        total_price: 100,
        price_schema_name: 'Platinum',
        order_currency: 'USD',
        payment_status: null,
        order_status: null,
      },
    ];

    const newOrders = orderRepository.create(orders);
    await orderRepository.save(newOrders);
  }
}
