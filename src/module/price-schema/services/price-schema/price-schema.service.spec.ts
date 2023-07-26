import { Test, TestingModule } from '@nestjs/testing';
import { PriceSchemaService } from './price-schema.service';

describe('PriceSchemaService', () => {
  let service: PriceSchemaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriceSchemaService],
    }).compile();

    service = module.get<PriceSchemaService>(PriceSchemaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
