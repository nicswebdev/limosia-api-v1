import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PaymentStatus } from '../models';

export default class CreatePaymentStatusesSeeder implements Seeder {
  track = true;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const paymentStatusRepository = dataSource.getRepository(PaymentStatus);

    const payments: Omit<
      PaymentStatus,
      'id' | 'created_at' | 'updated_at' | 'order' | 'delete_row'
    >[] = [
      {
        name: 'Pending',
        description: null,
      },
      {
        name: 'Completed',
        description: null,
      },
      {
        name: 'Refunded',
        description: null,
      },
      {
        name: 'Denied',
        description: null,
      },
    ];

    const newPayments = paymentStatusRepository.create(payments);
    await paymentStatusRepository.save(newPayments);
  }
}
