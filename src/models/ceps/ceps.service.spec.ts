import { Test, TestingModule } from '@nestjs/testing';
import { CepsService } from './ceps.service';

describe('CepsService', () => {
  let service: CepsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CepsService],
    }).compile();

    service = module.get<CepsService>(CepsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
