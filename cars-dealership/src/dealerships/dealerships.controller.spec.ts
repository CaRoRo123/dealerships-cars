import { Test, TestingModule } from '@nestjs/testing';
import { DealershipsController } from './dealerships.controller.js';
import { DealershipsService } from './dealerships.service.js';

describe('DealershipsController', () => {
  let controller: DealershipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DealershipsController],
      providers: [DealershipsService],
    }).compile();

    controller = module.get<DealershipsController>(DealershipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
