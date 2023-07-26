import { Test, TestingModule } from '@nestjs/testing';
import { PriceSchemaService } from './price-schema.service';
import { PriceSchema } from '@/db/models';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('PriceSchemaService', () => {
  let service: PriceSchemaService;
  let priceSchemaRepository: Repository<PriceSchema>;

  const PRICE_SCHEMA_REPOSITORY_TOKEN = getRepositoryToken(PriceSchema);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PriceSchemaService,
        {
          provide: PRICE_SCHEMA_REPOSITORY_TOKEN,
          useValue: {
            findAllPaginate: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PriceSchemaService>(PriceSchemaService);
    priceSchemaRepository = module.get<Repository<PriceSchema>>(
      PRICE_SCHEMA_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('priceSchemaRepository should be defined', () => {
    expect(priceSchemaRepository).toBeDefined();
  });
});
