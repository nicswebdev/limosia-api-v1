import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesController } from './currencies.controller';
import { Currency } from '@/db/models';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrenciesService } from '../../services/currencies/currencies.service';

describe('CurrenciesController', () => {
  let controller: CurrenciesController;
  let service: CurrenciesService;
  let currencyRepository: Repository<Currency>;

  const CURRENCIES_REPOSITORY_TOKEN = getRepositoryToken(Currency);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrenciesController],
      providers: [
        CurrenciesService,
        {
          provide: CURRENCIES_REPOSITORY_TOKEN,
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

    controller = module.get<CurrenciesController>(CurrenciesController);
    service = module.get<CurrenciesService>(CurrenciesService);
    currencyRepository = module.get<Repository<Currency>>(
      CURRENCIES_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('CurrenciesService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('currencyRepository should be defined', () => {
    expect(currencyRepository).toBeDefined();
  });
});
