import { Test, TestingModule } from '@nestjs/testing';
import { PriceSchemaController } from './price-schema.controller';

describe('PriceSchemaController', () => {
  let controller: PriceSchemaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriceSchemaController],
    }).compile();

    controller = module.get<PriceSchemaController>(PriceSchemaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
