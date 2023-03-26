import { Test, TestingModule } from '@nestjs/testing';
import { CepsController } from './ceps.controller';
import { CepsService } from './ceps.service';

describe('CepsController', () => {
  let controller: CepsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CepsController],
      providers: [CepsService],
    }).compile();

    controller = module.get<CepsController>(CepsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
