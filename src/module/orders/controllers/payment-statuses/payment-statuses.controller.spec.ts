import { Test, TestingModule } from '@nestjs/testing';
import { PaymentStatusesController } from './payment-statuses.controller';

describe('PaymentStatusesController', () => {
  let controller: PaymentStatusesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentStatusesController],
    }).compile();

    controller = module.get<PaymentStatusesController>(PaymentStatusesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
