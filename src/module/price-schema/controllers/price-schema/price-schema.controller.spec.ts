import { Test, TestingModule } from '@nestjs/testing';
import { PriceSchemaController } from './price-schema.controller';
import { PriceSchema } from '@/db/models';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceSchemaService } from '../../services/price-schema/price-schema.service';

describe('PriceSchemaController', () => {
  let controller: PriceSchemaController;
  let service: PriceSchemaService;
  let priceSchemaRepository: Repository<PriceSchema>;

  const PRICE_SCHEMA_REPOSITORY_TOKEN = getRepositoryToken(PriceSchema);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriceSchemaController],
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

    controller = module.get<PriceSchemaController>(PriceSchemaController);
    service = module.get<PriceSchemaService>(PriceSchemaService);
    priceSchemaRepository = module.get<Repository<PriceSchema>>(
      PRICE_SCHEMA_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('PriceSchemaService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('priceSchemaRepository should be defined', () => {
    expect(priceSchemaRepository).toBeDefined();
  });
});
