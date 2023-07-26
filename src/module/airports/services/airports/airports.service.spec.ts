import { Test, TestingModule } from '@nestjs/testing';
import { AirportsService } from './airports.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Airports } from '@/db/models';
import { Repository } from 'typeorm';

describe('AirportsService', () => {
  let service: AirportsService;
  let airportRepository: Repository<Airports>;

  const AIRPORT_REPOSITORY_TOKEN = getRepositoryToken(Airports);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<AirportsService>(AirportsService);
    airportRepository = module.get<Repository<Airports>>(
      AIRPORT_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('airportRepository should be defined', () => {
    expect(airportRepository).toBeDefined();
  });
});
