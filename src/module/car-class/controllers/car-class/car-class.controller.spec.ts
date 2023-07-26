import { Test, TestingModule } from '@nestjs/testing';
import { CarClassController } from './car-class.controller';
import { CarClassService } from '../../services/car-class/car-class.service';
import { CarClass } from '@/db/models';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('CarClassController', () => {
  let controller: CarClassController;
  let service: CarClassService;
  let carClassRepository: Repository<CarClass>;

  const CAR_CLASS_REPOSITORY_TOKEN = getRepositoryToken(CarClass);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarClassController],
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

    controller = module.get<CarClassController>(CarClassController);
    service = module.get<CarClassService>(CarClassService);
    carClassRepository = module.get<Repository<CarClass>>(
      CAR_CLASS_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('CarClassService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('carClassRepository should be defined', () => {
    expect(carClassRepository).toBeDefined();
  });
});
