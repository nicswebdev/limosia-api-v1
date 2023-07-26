import { Test, TestingModule } from '@nestjs/testing';
import { AirportsController } from './airports.controller';
import { Airports } from '@/db/models';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AirportsService } from '../../services/airports/airports.service';

describe('AirportsController', () => {
  let controller: AirportsController;
  let service: AirportsService;
  let airportRepository: Repository<Airports>;

  const AIRPORT_REPOSITORY_TOKEN = getRepositoryToken(Airports);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AirportsController],
      providers: [
        AirportsService,
        {
          provide: AIRPORT_REPOSITORY_TOKEN,
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

    controller = module.get<AirportsController>(AirportsController);
    service = module.get<AirportsService>(AirportsService);
    airportRepository = module.get<Repository<Airports>>(
      AIRPORT_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('AirportService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('airportRepository should be defined', () => {
    expect(airportRepository).toBeDefined();
  });
});
