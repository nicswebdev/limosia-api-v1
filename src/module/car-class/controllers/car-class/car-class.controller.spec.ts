import { Test, TestingModule } from '@nestjs/testing';
import { CarClassController } from './car-class.controller';

describe('CarClassController', () => {
  let controller: CarClassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarClassController],
    }).compile();

    controller = module.get<CarClassController>(CarClassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
