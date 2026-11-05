import { Test, TestingModule } from '@nestjs/testing';
import { DealershipsService } from './dealerships.service.js';

describe('DealershipsService', () => {
  let service: DealershipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealershipsService],
    }).compile();

    service = module.get<DealershipsService>(DealershipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
