import { Test, TestingModule } from '@nestjs/testing';
import { CarClassService } from './car-class.service';
import { CarClass } from '@/db/models';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('CarClassService', () => {
  let service: CarClassService;
  let carClassRepository: Repository<CarClass>;

  const CAR_CLASS_REPOSITORY_TOKEN = getRepositoryToken(CarClass);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarClassService,
        {
          provide: CAR_CLASS_REPOSITORY_TOKEN,
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

    service = module.get<CarClassService>(CarClassService);
    carClassRepository = module.get<Repository<CarClass>>(
      CAR_CLASS_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('carClassRepository should be defined', () => {
    expect(carClassRepository).toBeDefined();
  });
});
