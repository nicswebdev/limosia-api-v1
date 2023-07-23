import { Test, TestingModule } from '@nestjs/testing';
import { CarClassService } from './car-class.service';

describe('CarClassService', () => {
  let service: CarClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarClassService],
    }).compile();

    service = module.get<CarClassService>(CarClassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
